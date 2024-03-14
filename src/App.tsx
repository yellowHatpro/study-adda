import { ThemeProvider } from "@/components";
import { Home, Profile, UserProfile, Room, Settings, Account, Appearance, Notifications } from "@/pages";
import {Navigate, Route, Routes } from "react-router-dom";
import {AuthPage} from "@/pages/auth.tsx";
import {LoginPage} from "@/pages/login.tsx";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey={"study-adda-ui-theme"}>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/auth"} element={<AuthPage />} />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/room/:roomId"} element={<Room />} />
                <Route path={"/profile"} element={<Profile />} />
                <Route path={"/settings"} element={<Settings />}>
                    <Route index element={<Navigate to={"profile"}/>}/>
                    <Route path={"profile"} index={true} element={<UserProfile />} />
                    <Route path={"account"} element={<Account />} />
                    <Route path={"appearance"} element={<Appearance />} />
                    <Route path={"notifications"} element={<Notifications />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
