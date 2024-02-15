import { Sheet, SheetContent } from "../ui/sheet";
import ContentExpanded from "./ContentExpanded";
import ContentCollapsed from "./ContentCollapsed";

const Sidebar = () => {
    return (
        <Sheet>
            <ContentCollapsed />

            <SheetContent side="left" className="p-3 w-72">
                <ContentExpanded />
            </SheetContent>
        </Sheet>
    );
};

export default Sidebar;
