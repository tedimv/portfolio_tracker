import { GiCash, GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { IoSettings } from "react-icons/io5";

import { SheetTrigger } from "../ui/sheet";
import IconContainer from "./IconContainer";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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

            <Link to="/settings">
                <IconContainer className="w-full justify-start">
                    <IconContainer>
                        <IoSettings color="input" size="28" />
                    </IconContainer>

                    <h5 className="scroll-m-20 pt-1 text-2xl font-semibold tracking-tight first:mt-0">Settings</h5>
                </IconContainer>
            </Link>

            <div className="p-2 mt-auto flex items-center flex-row gap-3 rounded-full bg-red w-full border max-h-[56px]">
                <Avatar className="flex flex-row items-center" style={{ borderRadius: "calc(9999px - 0.5rem)" }}>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                    <h5 className="scroll-m-20 text-md font-semibold tracking-tight">Teodor Dimitrov</h5>
                    <p className="italic text-md">tdim@protonmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default ContentExpanded;
