import { FC, memo } from "react";

export const memoComponent = <P>(Component: FC<P>) => memo(Component);
