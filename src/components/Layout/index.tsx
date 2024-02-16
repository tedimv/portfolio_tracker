import { FC, ReactElement } from "react";
import ThemeSwitch from './ThemeSwitch';

const Layout: FC<{ children: ReactElement[] }> = ({ children }) => {
    return (
        <section className="w-full h-full p-6 flex flex-col gap-16 overflow-x-hidden">
            {children}
            <ThemeSwitch />
        </section>
    );
};

export default Layout;
