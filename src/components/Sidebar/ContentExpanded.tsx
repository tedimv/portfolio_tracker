import { GiCash, GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { IoSettings } from "react-icons/io5";

import { SheetTrigger } from "../ui/sheet";
import IconContainer from "./IconContainer";



const ContentExpanded = () => {
    return (
        <div className="flex flex-col h-full items-stretch">
            <IconContainer className="max-w-[56px] flex justify-center">
                <SheetTrigger className="flex flex-col items-center">
                    <GiHamburgerMenu color="input" size="28" />
                </SheetTrigger>
            </IconContainer>

            <Link to="/">
                <IconContainer className="w-full justify-start">
                    <IconContainer>
                        <GiCash color="input" size="28" />
                    </IconContainer>

                    <h5 className="scroll-m-20 pt-1 text-2xl font-semibold tracking-tight first:mt-0">Investments</h5>
                </IconContainer>
            </Link>

            <Link to="/settings" className="mt-auto">
                <IconContainer className="w-full justify-start">
                    <IconContainer>
                        <IoSettings color="input" size="28" />
                    </IconContainer>

                    <h5 className="scroll-m-20 pt-1 text-2xl font-semibold tracking-tight first:mt-0">Settings</h5>
                </IconContainer>
            </Link>
        </div>
    );
};

export default ContentExpanded;
