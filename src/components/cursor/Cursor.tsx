import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Cursor.scss";
import PropTypes from "prop-types";
import './Cursor.scss'

export interface IStyles {
  [element: string]: React.CSSProperties;
}

export type CursorChildrenType = JSX.Element | string | undefined | number;

export interface hoverStyle {
  classNameOfTargetElement: string;
  classNameOfStyle: string;
  cursorChildren?: CursorChildrenType;
}

interface Props {
  children: JSX.Element;
  borderClassName?: string;
  dotClassName?: string;
  hoverClasses?: hoverStyle[];
  turnOffOnPhone?: boolean;
}


const IsDevice = (() => {
  if (typeof navigator == "undefined") return;

  let ua = navigator.userAgent;

  return {
    info: ua,

    Android() {
      return ua.match(/Android/i);
    },
    BlackBerry() {
      return ua.match(/BlackBerry/i);
    },
    IEMobile() {
      return ua.match(/IEMobile/i);
    },
    iOS() {
      return ua.match(/iPhone|iPad|iPod/i);
    },
    OperaMini() {
      return ua.match(/Opera Mini/i);
    },

    any() {
      if (IsDevice)
        return (
          IsDevice.Android() ||
          IsDevice.BlackBerry() ||
          IsDevice.iOS() ||
          IsDevice.OperaMini() ||
          IsDevice.IEMobile()
        );
    },
  };
})();

function useFollowCursor() {
  const [mousePosition, setMousePosition] = useState<{
    mouseX: number;
    mouseY: number;
  }>({ mouseX: -100, mouseY: -100 });

  useEffect(() => {
    window.addEventListener("mousemove", mouseEvent => {
      let mouseX = mouseEvent.clientX;
      let mouseY = mouseEvent.clientY;

      setMousePosition({
        mouseX,
        mouseY,
      });
    });

    return () => {
      window.removeEventListener("mousedown", () => {});
    };
  }, []);

  return mousePosition;
}

function Cursor({
                  children,
                  borderClassName,
                  dotClassName,
                  hoverClasses = [],
                  turnOffOnPhone = true,
                }: Props) {
  const [dotChild, setDotChild] = useState<
    string | null | number | JSX.Element
    >(null);

  useEffect(() => {
    if (!turnOffOnPhone || !IsDevice?.any()) {
      document.body.classList.add("cursor-none");
    } else {
      document.body.classList.add("initial-body");
    }
  }, [turnOffOnPhone]);

  const [classes, setClasses] = useState<
    {
      elements: NodeListOf<Element>;
      className: string;
      cursorChildren: CursorChildrenType;
    }[]
    >([]);

  // get The cursor wrapper also cursorDotElement
  const cursorWrapperElement = useRef<HTMLDivElement>(null);
  const cursorDotElement = useRef<HTMLDivElement>(null);
  const cursorBorderElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hoverClasses.length) {
      hoverClasses.forEach(hoverClass => {
        const elements = document.querySelectorAll(
          `.${hoverClass.classNameOfTargetElement}`
        );
        setClasses(current => {
          const cl = {
            elements,
            className: hoverClass.classNameOfStyle,
            cursorChildren: hoverClass.cursorChildren,
          };

          return [...current, cl];
        });
      });
    }
    // redo on changing hoverClasses
  }, [hoverClasses]);

  // get mouse x and y coordinate
  const { mouseX, mouseY } = useFollowCursor();

  // styles
  const styles: IStyles = useMemo(
    () => ({
      cursorBorder: {
        top: mouseY,
        left: mouseX,
      },
      innerDot: {
        top: mouseY,
        left: mouseX,
      },
    }),
    [mouseX, mouseY]
  );

  // mousedown handler
  const mouseDownHandler = useCallback(() => {
    if (cursorBorderElement.current && cursorBorderElement.current.classList)
      cursorBorderElement.current.classList.add("smaller-cursor-border");
  }, []);

  //mouseup handler

  const mouseUpHandler = useCallback(() => {
    if (cursorBorderElement.current && cursorBorderElement.current.classList)
      cursorBorderElement.current.classList.remove("smaller-cursor-border");
  }, []);

  // mouseup handler
  const mouseOverHandler = useCallback(() => {
    if (classes.length) {
      classes.forEach(className => {
        for (let i = 0; i < className.elements.length; i++) {
          className.elements[i].addEventListener("mouseover", () => {
            cursorWrapperElement.current?.classList.add(className.className);

            if (className?.cursorChildren) {
              cursorDotElement.current?.classList.add("transition-none");
              setDotChild(className?.cursorChildren);
            }
          });
        }
      });
    }
  }, [classes]);

  // mouse out handler
  const mouseOutHandler = useCallback(() => {
    if (classes.length)
      classes.forEach(className => {
        for (let i = 0; i < className.elements.length; i++) {
          className.elements[i].addEventListener("mouseout", () => {
            cursorWrapperElement.current?.classList.remove(className.className);

            if (className.cursorChildren) {
              cursorDotElement.current?.classList.remove("transition-none");
              setDotChild(null);
            }
          });
        }
      });
  }, [classes]);

  // add event listeners
  useEffect(() => {
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("mouseover", mouseOverHandler);
    window.addEventListener("mouseout", mouseOutHandler);
    return () => {
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("mouseover", mouseOverHandler);
      window.removeEventListener("mouseout", mouseOutHandler);
    };

    // function again only when hoverClasses has changed
  }, [mouseDownHandler, mouseOutHandler, mouseOverHandler, mouseUpHandler]);

  // if device is phone and turnOffOnPhone is true return only children
  if (IsDevice?.any() && turnOffOnPhone)
    return <React.Fragment>{children}</React.Fragment>;

  return (
    <div
      ref={cursorWrapperElement}
      className="cursor-wrapper"
      data-testid="cursor">
      {/* cursor outer border element */}
      <div
        className={`cursor-border ${borderClassName}`}
        style={styles.cursorBorder}
        ref={cursorBorderElement}></div>

      {/* cursor inner dot */}
      <div
        style={styles.innerDot}
        ref={cursorDotElement}
        className={`cursor-dot ${dotClassName}`}>
        {dotChild}
      </div>

      {/* rest of your app that will get the cursor shape */}
      {children}
    </div>
  );
}

Cursor.propTypes = {
  children: PropTypes.element.isRequired,
  borderClassName: PropTypes.string,
  dotClassName: PropTypes.string,
  hoverClasses: PropTypes.arrayOf(
    PropTypes.shape({
      classNameOfTargetElement: PropTypes.string.isRequired,
      classNameOfStyle: PropTypes.string.isRequired,
      cursorChildren: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.element,
      ]),
    })
  ),
  turnOffOnPhone: PropTypes.bool,
};

export default Cursor;
