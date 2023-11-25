import {Navbar} from "@/components/navbar.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey={"qna-ui-theme"}>
        <div className={""}>
            <Navbar/>
        </div>
    </ThemeProvider>
  )
}

export default App
