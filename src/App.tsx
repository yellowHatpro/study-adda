import {ThemeProvider} from "@/components";
import {Home, Profile, Room, Settings} from "@/pages";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey={"study-adda-ui-theme"}>
        <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/room/:roomId"} element={<Room/>}/>
            <Route path={"/profile"} element={<Profile/>}/>
            <Route path={"/settings"} element={<Settings/>}/>
        </Routes>
    </ThemeProvider>
  )
}

export default App
