import { Routes, Route } from "react-router";

import UserSettings from "./routes/userSettings";
import Investments from "./routes/investments";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";
import { store } from "./stores";

import { Toaster } from "./components/ui/sonner";
import {
    fetchCryptoInvestments,
    fetchGoldInvestments,
    fetchPropertiesInvestments,
    fetchStocksInvestments,
} from "./stores/investments/thunks";
import FloatingUserInfo from "./components/FloatingUserInfo";

function App() {
    useEffect(() => {
        store.dispatch(fetchCryptoInvestments());
        store.dispatch(fetchStocksInvestments());
        store.dispatch(fetchGoldInvestments());
        store.dispatch(fetchPropertiesInvestments());
    }, []);

    return (
        <div className="h-full flex flex-row">
            <Sidebar />

            <Routes>
                <Route path="/" Component={Investments} />
                <Route path="/settings" Component={UserSettings} />
            </Routes>

            <FloatingUserInfo />
            <Toaster />
        </div>
    );
}

export default App;
