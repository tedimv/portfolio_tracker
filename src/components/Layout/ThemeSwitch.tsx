import { useDispatch } from "react-redux";
import { BiSolidMoon } from "react-icons/bi";
import { FaSun } from "react-icons/fa6";

import { useAppSelector } from "@/stores";
import { toggleTheme } from "@/stores/theme";
import { Switch } from "../ui/switch";

const ThemeSwitch = () => {
    const theme = useAppSelector((state) => state.theme.value);
    const dispatch = useDispatch();
    const isLight = theme === "light";
    
    return (
        <div className="absolute top-8 right-10">
            <div className="relative" style={{ cursor: "pointer !important" }} onClick={() => dispatch(toggleTheme())}>
                <Switch checked={theme === "light"} />
                
                {!isLight && (
                    <div className="absolute top-[6px] left-[6px] cursor-pointer">
                        <BiSolidMoon size={12} enableBackground="yellow" />
                    </div>
                )}

                {isLight && (
                    <div className="absolute top-[6px] right-[6px] cursor-pointer">
                        <div>
                            <FaSun size={12} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThemeSwitch;
