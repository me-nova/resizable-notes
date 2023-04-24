import React, { FC, useRef, useEffect, MutableRefObject } from "react";

interface IClickOutsideAction {
  action: () => void;
  children: JSX.Element;
}

function useClickOutside(ref: MutableRefObject<HTMLElement | null>, action:  () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        action();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, action]);
}

const ClickOutsideAction: FC<IClickOutsideAction> = ({ action, children }) => {
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, action);

  return <div ref={wrapperRef}>{children}</div>;
};

export default ClickOutsideAction;
