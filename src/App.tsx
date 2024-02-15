import { Routes, Route } from "react-router";

import UserSettings from "./routes/userSettings";
import Investments from "./routes/investments";
import ThemeSwitch from "./components/ThemeSwitch";
import Sidebar from "./components/Sidebar";

function App() {
    return (
        <div className="h-full flex flex-row">
            <Sidebar />

            <Routes>
                <Route path="/" Component={Investments} />
                <Route path="/settings" Component={UserSettings} />
            </Routes>
            <ThemeSwitch />
        </div>
    );
}

export default App;
