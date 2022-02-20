import React from "react";
import { memoComponent } from "../memo-component";

interface Props {
  id: string;
  alt: string;
  icon: string;
  className: string;
  callback: () => void;
}

function PaginationButton(props: Props) {
  const { id, alt, icon, className, callback } = props;
  return (
    <div id={id} className={`button ${className}`} onClick={callback}>
      <div className="btn-img">
        <img src={icon} alt={alt} />
      </div>
    </div>
  );
};

export default memoComponent(PaginationButton);
