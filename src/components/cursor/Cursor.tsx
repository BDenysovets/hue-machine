import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Cursor.scss";
import {useLocation} from "react-router-dom";

export interface IStyles {
  [element: string]: React.CSSProperties;
}

interface Props {
  children: JSX.Element;
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
}: Props) {
  const { pathname } = useLocation()
  const { x, y } = useFollowCursor();
  const cursorWrapperElement = useRef<HTMLDivElement>(null);
  const cursorBorderElement = useRef<HTMLDivElement>(null);
  const styles: IStyles = useMemo(() => ({ cursorBorder: { top: y, left: x } }), [x, y]);

  useEffect(() => {
    !IsDevice?.any() ? document.body.classList.add("cursor-none") : document.body.classList.add("initial-body");
  }, []);

  useEffect(() => {
    const hoverableElements = document.querySelectorAll('.cursorLink')

    cursorWrapperElement.current?.classList.remove('cursorHoveredLink');

    const mouseMoveHandler = () => {
      hoverableElements.forEach(el => {
        el.addEventListener("mouseover", () => {
          cursorWrapperElement.current?.classList.add('cursorHoveredLink');
        });

        el.addEventListener("mouseout", () => {
          cursorWrapperElement.current?.classList.remove('cursorHoveredLink');
        });
      })
    }

    window.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [pathname]);

  if (IsDevice?.any())
    return <React.Fragment>{children}</React.Fragment>;

  return (
    <div
      ref={cursorWrapperElement}
      className="cursor-wrapper"
      data-testid="cursor">
      <div
        className="cursor-border"
        style={styles.cursorBorder}
        ref={cursorBorderElement}
      />
      {children}
    </div>
  );
}

export default Cursor;
