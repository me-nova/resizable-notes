import { useState, useEffect, MutableRefObject } from "react";

const noneDraggableElem = "none-draggable";

export default function useDraggable(el: MutableRefObject<HTMLDivElement | null>) {
  const [{ dx, dy }, setOffset] = useState({ dx: 0, dy: 0 });

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target  as HTMLDivElement;
      const isNonDraggable = target && target.getAttribute("data-is-draggable");
      if (isNonDraggable && isNonDraggable === noneDraggableElem) return;
      const startX = event.pageX - dx;
      const startY = event.pageY - dy;

      const handleMouseMove = (event: MouseEvent) => {
        const newDx = event.pageX - startX;
        const newDy = event.pageY - startY;
        setOffset({ dx: newDx, dy: newDy });
      };

      document.addEventListener("mousemove", handleMouseMove);

      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", handleMouseMove);
        },
        { once: true }
      );
    };

   if (el.current) {
     el.current.addEventListener("mousedown", handleMouseDown);
   }

    return () => {
      el.current?.removeEventListener("mousedown", handleMouseDown);
    };
  }, [el, dx, dy]);

  useEffect(() => {
    if (el.current) {
      el.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    }
  }, [dx, dy, el]);
}