import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppSelector } from "@/stores";
import ThemeSwitch from './ThemeSwitch';

const FloatingUserInfo = () => {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <div className="absolute top-5 right-5">
            <div className="relative p-2 flex items-center flex-row gap-3 rounded-full bg-red w-full border max-h-[56px]">
                <Avatar className="flex flex-row items-center" style={{ borderRadius: "calc(9999px - 0.5rem)" }}>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                    <h5 className="scroll-m-20 text-md font-semibold tracking-tight">
                        {user?.firstName} {user?.lastName}
                    </h5>
                    <p className="italic text-sm">Age: {user?.age}</p>
                </div>

                <ThemeSwitch />
            </div>
        </div>
    );
};

export default FloatingUserInfo;
