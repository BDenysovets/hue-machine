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
  hoverClasses?: hoverStyle[];
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
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number; }>({ x: -100, y: -100 });

  useEffect(() => {
    const mouseMove = (mouseEvent: any) => {
      setMousePosition({ x: mouseEvent.clientX, y: mouseEvent.clientY });
    }

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return mousePosition;
}

function Cursor({
  children,
  borderClassName,
  hoverClasses = [],
}: Props) {
  useEffect(() => {
    !IsDevice?.any() ? document.body.classList.add("cursor-none") : document.body.classList.add("initial-body");
  }, []);

  const [classes, setClasses] = useState<
    {
      elements: NodeListOf<Element>;
      className: string;
      cursorChildren: CursorChildrenType;
    }[]
    >([]);

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
  }, [hoverClasses]);

  const { x, y } = useFollowCursor();
  const styles: IStyles = useMemo(() => ({ cursorBorder: { top: y, left: x } }), [x, y]);

  const mouseDownHandler = useCallback(() => {
    if (cursorBorderElement.current && cursorBorderElement.current.classList)
      cursorBorderElement.current.classList.add("smaller-cursor-border");
  }, []);

  const mouseUpHandler = useCallback(() => {
    if (cursorBorderElement.current && cursorBorderElement.current.classList)
      cursorBorderElement.current.classList.remove("smaller-cursor-border");
  }, []);

  const mouseOverHandler = useCallback(() => {
    if (classes.length) {
      classes.forEach(className => {
        for (let i = 0; i < className.elements.length; i++) {
          className.elements[i].addEventListener("mouseover", () => {
            cursorWrapperElement.current?.classList.add(className.className);

            if (className?.cursorChildren) {
              cursorDotElement.current?.classList.add("transition-none");
            }
          });
        }
      });
    }
  }, [classes]);

  const mouseOutHandler = useCallback(() => {
    if (classes.length)
      classes.forEach(className => {
        for (let i = 0; i < className.elements.length; i++) {
          className.elements[i].addEventListener("mouseout", () => {
            cursorWrapperElement.current?.classList.remove(className.className);

            if (className.cursorChildren) {
              cursorDotElement.current?.classList.remove("transition-none");
            }
          });
        }
      });
  }, [classes]);

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
  }, [mouseDownHandler, mouseOutHandler, mouseOverHandler, mouseUpHandler]);

  if (IsDevice?.any())
    return <React.Fragment>{children}</React.Fragment>;

  return (
    <div
      ref={cursorWrapperElement}
      className="cursor-wrapper"
      data-testid="cursor">
      <div
        className={`cursor-border ${borderClassName}`}
        style={styles.cursorBorder}
        ref={cursorBorderElement}
      />
      {children}
    </div>
  );
}

Cursor.propTypes = {
  children: PropTypes.element.isRequired,
  borderClassName: PropTypes.string,
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
