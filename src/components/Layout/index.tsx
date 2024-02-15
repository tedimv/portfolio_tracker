import { FC, ReactElement } from "react";

import LayoutHeader from "./LayoutHeader";

const Layout: FC<{ children: ReactElement[] }> = ({ children }) => {
    return <section className="w-full h-full p-6 flex flex-col gap-16">{children}</section>;
};

export default Layout;
