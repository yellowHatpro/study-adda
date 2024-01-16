import { ThemeProvider } from "@/components";
import { Home, Profile, UserProfile, Room, Settings, Account, Appearance, Notifications } from "@/pages";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey={"study-adda-ui-theme"}>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/room/:roomId"} element={<Room />} />
                <Route path={"/profile"} element={<Profile />} />
                <Route path={"/settings"} element={<Settings />}>
                    <Route path={"profile"} element={<UserProfile />} />
                    <Route path={"account"} element={<Account />} />
                    <Route path={"appearance"} element={<Appearance />} />
                    <Route path={"notifications"} element={<Notifications />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
