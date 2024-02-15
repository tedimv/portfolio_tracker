import { FC, ReactElement } from "react";

import { cn } from "@/lib/utils";

const IconContainer: FC<{ children: ReactElement | ReactElement[]; className?: string }> = ({
    children,
    className,
}) => {
    return (
        <div
            className={cn(
                "min-w-[54px] py-2 flex flex-row justify-center cursor-pointer hover:bg-primary-foreground rounded-sm",
                className
            )}
        >
            {children}
        </div>
    );
};

export default IconContainer;
