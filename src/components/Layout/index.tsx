import { FC, ReactElement } from "react";

const Layout: FC<{ children: ReactElement[] }> = ({ children }) => {
    return <section className="w-full h-full p-6 flex flex-col gap-16 overflow-x-hidden">{children}</section>;
};

export default Layout;
