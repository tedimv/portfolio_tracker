import { Link } from "react-router-dom";
import { GiCash, GiHamburgerMenu } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";

import { SheetTrigger } from "../ui/sheet";
import IconContainer from "./IconContainer";

const ContentCollapsed = () => {
    return (
        <div className="p-3 h-full border-r-2 w-20 bg-red flex flex-col gap-4">
            <SheetTrigger>
                <IconContainer className="flex flex-col items-center">
                    <GiHamburgerMenu color="input" size="28" />
                </IconContainer>
            </SheetTrigger>

            <Link to="/">
                <IconContainer>
                    <GiCash color="input" size="28" />
                </IconContainer>
            </Link>

            <Link to="/settings" className="mt-auto">
                <IconContainer>
                    <IoSettings color="input" size="28" />
                </IconContainer>
            </Link>
        </div>
    );
};

export default ContentCollapsed;
