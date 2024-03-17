import { ThemeProvider } from "@/components";
import { Home, Profile, UserProfile, Room, Settings, Account, Appearance, Notifications } from "@/pages";
import {Navigate, Route, Routes } from "react-router-dom";
import {AuthPage} from "@/pages/auth.tsx";
import {LoginPage} from "@/pages/login.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SignInPage} from "@/pages/sign-in.tsx";
import RoomsPage from "@/pages/room/rooms.tsx";
import CreateRoomPage from "@/pages/room/create-room.tsx";

function App() {
    const queryClient = new QueryClient()
    return (
        <ThemeProvider defaultTheme="dark" storageKey={"study-adda-ui-theme"}>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/auth"} element={<AuthPage/>}/>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"/sign-in"} element={<SignInPage/>}/>
                    <Route path={"/profile"} element={<Profile/>}/>
                    <Route path={"/room"}>
                        <Route index element={<RoomsPage/>}/>
                        <Route path={":roomId"} element={<Room/>}/>
                        <Route path={"create-room"} element={<CreateRoomPage/>} />
                    </Route>
                    <Route path={"/settings"} element={<Settings/>}>
                        <Route index element={<Navigate to={"profile"}/>}/>
                        <Route path={"profile"} index={true} element={<UserProfile/>}/>
                        <Route path={"account"} element={<Account/>}/>
                        <Route path={"appearance"} element={<Appearance/>}/>
                        <Route path={"notifications"} element={<Notifications/>}/>
                    </Route>
                </Routes>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
