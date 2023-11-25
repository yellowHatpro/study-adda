import {ThemeProvider} from "@/components";
import {Home, Room} from "@/pages";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey={"qna-ui-theme"}>
        <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/room/:roomId"} element={<Room/>}/>
        </Routes>
    </ThemeProvider>
  )
}

export default App
