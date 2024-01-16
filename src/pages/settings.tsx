import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable.tsx";
import { Link, Outlet } from "react-router-dom";

export const Settings = () => {
    return (
        <Layout>
            <ResizablePanelGroup direction={"horizontal"}>
                <ResizablePanel
                    className={
                        "bg-neutral-950 flex flex-col p-4"
                    }
                    maxSize={20}
                    defaultSize={10}
                >
                    <Link to={"/settings/profile"}>
                        <Button className={"dark:bg-neutral-800 dark:hover:bg-neutral-600 w-full justify-start dark:text-neutral-300"}> Profile </Button>
                    </Link>
                    <br />
                    <Link to={"/settings/account"}>
                        <Button className={"dark:bg-neutral-800 dark:hover:bg-neutral-600 w-full justify-start dark:text-neutral-300"}> Account </Button>
                    </Link>
                    <br />
                    <Link to={"/settings/appearance"}>
                        <Button className={"dark:bg-neutral-800 dark:hover:bg-neutral-600 w-full justify-start dark:text-neutral-300"}> Appearance </Button>
                    </Link>
                    <br />
                    <Link to={"/settings/notifications"}>
                        <Button className={"dark:bg-neutral-800 dark:hover:bg-neutral-600 w-full justify-start dark:text-neutral-300"}> Notifications </Button>
                    </Link>
                    <br />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>
                    <Outlet/>
                </ResizablePanel>
            </ResizablePanelGroup>
        </Layout>
    );
};
