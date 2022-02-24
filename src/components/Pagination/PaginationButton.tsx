import React from "react";
import { memoComponent } from "../../utils/memoComponent";

interface Props {
  id: string;
  alt: string;
  icon: string;
  testId?: string;
  className: string;
  callback: () => void;
}

function PaginationButton(props: Props) {
  const { id, alt, icon, className, callback, testId } = props;
  return (
    <div id={id} className={`button ${className}`} onClick={callback} data-testid={testId}>
      <div className="btn-img">
        <img src={icon} alt={alt} />
      </div>
    </div>
  );
}

export default memoComponent(PaginationButton);
