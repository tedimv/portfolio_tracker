import { FC } from "react";

const LayoutHeader: FC<{ title: string }> = ({ title }) => {
    return <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{title}</h1>;
};

export default LayoutHeader;
