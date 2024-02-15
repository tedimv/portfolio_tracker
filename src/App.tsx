import "./App.css";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";

function App() {
    return (
        <div className="h-full">
            <Sheet>
                <div className="p-3 h-full border-r-2 w-16 bg-red flex flex-col justify-between">
                    <SheetTrigger className="flex flex-col items-center">
                        <GiHamburgerMenu color="white" size="28" />
                    </SheetTrigger>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <SheetContent side="left" className="p-3 w-72">
                    <div className="flex flex-col justify-between h-full items-start">
                        <SheetTrigger className="flex flex-col items-center">
                            <GiHamburgerMenu color="white" size="28" />
                        </SheetTrigger>
                        <div className="p-2 flex flex-row gap-2 rounded-full bg-red w-full border">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            asdasdas
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default App;
