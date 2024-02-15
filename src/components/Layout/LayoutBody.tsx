import { FC, ReactElement } from "react";

const LayoutBody: FC<{ children: ReactElement | ReactElement[] }> = ({ children }) => {
    return <section className="flex flex-col gap-8">{children}</section>;
};

export default LayoutBody;
