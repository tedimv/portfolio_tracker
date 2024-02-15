import "./App.css";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";

function App() {
    return (
        <div className="h-full">
            <Sheet>
                <div className="p-3 h-full border-r-2 w-20 bg-red flex flex-col justify-between">
                    <SheetTrigger className="flex flex-col items-center">
                        <GiHamburgerMenu color="white" size="28" />
                    </SheetTrigger>
                    <div className="p-1 h-[56px]">
                        <Avatar style={{ borderRadius: "calc(9999px - 0.5rem)" }}>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <SheetContent side="left" className="p-3 w-72">
                    <div className="flex flex-col justify-between h-full items-start">
                        <SheetTrigger className="flex flex-col items-center">
                            <GiHamburgerMenu color="white" size="28" />
                        </SheetTrigger>
                        <div className="p-2 flex items-center flex-row gap-3 rounded-full bg-red w-full border max-h-[56px]">
                            <Avatar className="flex flex-row items-center" style={{ borderRadius: "calc(9999px - 0.5rem)" }}>
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
        </div>
    );
}

export default App;
