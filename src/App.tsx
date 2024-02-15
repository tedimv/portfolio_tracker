import { FC, ReactElement } from "react";
import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

import "./App.css";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";
import Dashboard from "./routes/dashboard";
import UserSettings from "./routes/userSettings";
import { GiCash } from "react-icons/gi";
import { cn } from "./lib/utils";
import Investments from "./routes/investments";

const Container: FC<{ children: ReactElement | ReactElement[]; className?: string }> = ({ children, className }) => {
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

function App() {
    return (
        <div className="h-full flex flex-row">
            <Sheet>
                <div className="p-3 h-full border-r-2 w-20 bg-red flex flex-col gap-4">
                    <SheetTrigger>
                        <Container className="flex flex-col items-center">
                            <GiHamburgerMenu color="white" size="28" />
                        </Container>
                    </SheetTrigger>

                    <Link to="/">
                        <Container>
                            <ImHome color="white" size="28" />
                        </Container>
                    </Link>

                    <Link to="/settings">
                        <Container>
                            <IoSettings color="white" size="28" />
                        </Container>
                    </Link>

                    <Link to="/investments">
                        <Container>
                            <GiCash color="white" size="28" />
                        </Container>
                    </Link>

                    <div className="p-1 h-[56px] mt-auto">
                        <Avatar style={{ borderRadius: "calc(9999px - 0.5rem)" }}>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <SheetContent side="left" className="p-3 w-72">
                    <div className="flex flex-col h-full items-stretch">
                        <Container className="max-w-[56px] flex justify-center">
                                <SheetTrigger className="flex flex-col items-center">
                                    <GiHamburgerMenu color="white" size="28" />
                                </SheetTrigger>
                        </Container>

                        <Link to="/">
                            <Container className="w-full justify-start">
                                <Container>
                                    <ImHome color="white" size="28" />
                                </Container>

                                <h2 className="scroll-m-20 pt-1 text-3xl font-semibold tracking-tight first:mt-0">
                                    Home
                                </h2>
                            </Container>
                        </Link>

                        <Link to="/settings">
                            <Container className="w-full justify-start">
                                <Container>
                                    <IoSettings color="white" size="28" />
                                </Container>

                                <h2 className="scroll-m-20 pt-1 text-3xl font-semibold tracking-tight first:mt-0">
                                    Settings
                                </h2>
                            </Container>
                        </Link>

                        <Link to="/investments">
                            <Container className="w-full justify-start">
                                <Container>
                                    <GiCash color="white" size="28" />
                                </Container>

                                <h2 className="scroll-m-20 pt-1 text-3xl font-semibold tracking-tight first:mt-0">
                                    Investments
                                </h2>
                            </Container>
                        </Link>

                        <div className="p-2 mt-auto flex items-center flex-row gap-3 rounded-full bg-red w-full border max-h-[56px]">
                            <Avatar
                                className="flex flex-row items-center"
                                style={{ borderRadius: "calc(9999px - 0.5rem)" }}
                            >
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col">
                                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">Teodor Dimitrov</h4>
                                <p className="italic text-md">tdim@protonmail.com</p>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <Routes>
                <Route path="/" Component={Dashboard} />
                <Route path="/settings" Component={UserSettings} />
                <Route path="/investments" Component={Investments} />
            </Routes>
        </div>
    );
}

export default App;
