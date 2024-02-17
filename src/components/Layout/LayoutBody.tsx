import { cn } from "@/lib/utils";
import { FC, ReactElement } from "react";

const LayoutBody: FC<{ children: ReactElement | ReactElement[]; className?: string }> = ({ children, className }) => {
    return <section className={cn("flex flex-col gap-8", className)}>{children}</section>;
};

export default LayoutBody;
