import { useDispatch } from "react-redux";

import { incremented, useAppSelector } from "@/store";
import Button from "./ui/button";

const Counter = () => {
    const count = useAppSelector((state) => state.count);
    const dispatch = useDispatch();

    return (
        <Button variant="link" className="bg-primary/50" onClick={() => dispatch(incremented())}>
            count is {count}
        </Button>
    );
};

export default Counter;
