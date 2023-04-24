import React, { FC, useRef, useEffect } from "react";
import useDraggable from "../../utils/hooks/useDraggable";

import "./resizableWrapper.scss";

interface IProps {
  children: JSX.Element;
  id: string;
}

const ResizableWrapper: FC<IProps> = ({ children}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const refLeft = useRef<HTMLDivElement | null>(null);
  const refTop = useRef<HTMLDivElement | null>(null);
  const refRight = useRef<HTMLDivElement | null>(null);
  const refBottom = useRef<HTMLDivElement | null>(null);

  useDraggable(ref);

  useEffect(() => {
    const resizeableElement = ref.current;
    const styles = resizeableElement && window.getComputedStyle(resizeableElement);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;

    resizeableElement.style.bottom = "50px";
    resizeableElement.style.left = "50px";

    // Right resize
    const onMouseMoveRightResize = (event: MouseEvent) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      resizeableElement.style.width = `${width}px`;
    };

    const onMouseUpRightResize = (event: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event: MouseEvent) => {
      x = event.clientX;
      resizeableElement.style.left = styles.left;
      resizeableElement.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    // Top resize
    const onMouseMoveTopResize = (event: MouseEvent) => {
      const dy = event.clientY - y;
      height = height - dy;
      y = event.clientY;
      resizeableElement.style.height = `${height}px`;
    };

    const onMouseUpTopResize = (event: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (event: MouseEvent) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.bottom = styles.bottom;
      resizeableElement.style.top = null;
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };

    // Bottom resize
    const onMouseMoveBottomResize = (event: MouseEvent) => {
      const dy = event.clientY - y;
      height = height + dy;
      y = event.clientY;
      resizeableElement.style.height = `${height}px`;
    };

    const onMouseUpBottomResize = (event: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event: MouseEvent) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.top = styles.top;
      resizeableElement.style.bottom = null;
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };

    // Left resize
    const onMouseMoveLeftResize = (event: MouseEvent) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width - dx;
      resizeableElement.style.width = `${width}px`;
    };

    const onMouseUpLeftResize = (event: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (event: MouseEvent) => {
      x = event.clientX;
      resizeableElement.style.right = styles.right;
      resizeableElement.style.left = null;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };

    // Add mouse down event listener
    const resizerRight = refRight.current;
    resizerRight.addEventListener("mousedown", onMouseDownRightResize);
    const resizerTop = refTop.current;
    resizerTop.addEventListener("mousedown", onMouseDownTopResize);
    const resizerBottom = refBottom.current;
    resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);
    const resizerLeft = refLeft.current;
    resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);

    return () => {
      resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
      resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
      resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
      resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
    };
  }, []);

  return (
      <div ref={ref} className="resizable">
        <div data-is-draggable="none-draggable" ref={refLeft} className="resizable__resizer left"></div>
        <div data-is-draggable="none-draggable" ref={refTop} className="resizable__resizer top"></div>
        <div data-is-draggable="none-draggable" ref={refRight} className="resizable__resizer right"></div>
        <div data-is-draggable="none-draggable" ref={refBottom} className="resizable__resizer bottom"></div>
        <div className="resizable__content">
          {children}
        </div>
      </div>
  );
}

export default ResizableWrapper;