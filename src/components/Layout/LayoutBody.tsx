import { FC, ReactElement } from "react";

const LayoutBody: FC<{ children: ReactElement }> = ({ children }) => {
    return <section>{children}</section>;
};

export default LayoutBody;
