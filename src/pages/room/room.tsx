import { useParams } from "react-router-dom";
import { Layout, SidebarNav } from "@/components/layout";
import { Separator } from "@/components/ui/separator.tsx";
import { Editor } from "@monaco-editor/react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import React, { useState } from "react";
import {Excalidraw} from "@excalidraw/excalidraw";

export const Room = () => {
    const { roomId } = useParams();
    const [isIDE, setIsIDE] = useState<boolean>(true);
    return (
        <Layout navbarElements={<IDE_Draw_Switch setIDE={setIsIDE} />}>
            <section className={"container flex items-start gap-1"}>
                <aside
                    className={"fixed top-14 z-30 hidden shrink-0 md:sticky md:block"}
                >
                    <text>Room {roomId}</text>
                    <SidebarNav />
                </aside>
                <Separator className={"flex"} orientation="vertical" />
                <div className={"grow h-full"}>
                    <div className={"flex flex-col h-full"}>
                        {isIDE && (
                            <Editor
                                className={"fixed grow h-[85vh]"}
                                defaultLanguage={"javascript"}
                                theme={"vs-dark"}
                                defaultValue={"lesgo"}
                                onValidate={(markers) => {
                                    markers.forEach((marker) =>
                                        console.log("onValidate: ", marker.message),
                                    );
                                }}
                            />
                        )}
                        {!isIDE && (
                            <div style={{height: "92vh"}}>
                                <Excalidraw/>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

type Props = {
    setIDE: React.Dispatch<React.SetStateAction<boolean>>;
};

const IDE_Draw_Switch = ({ setIDE }: Props) => {
    return (
        <Tabs defaultValue={"ide"} className={"w-[120px]"}>
            <TabsList className={"grid w-full grid-cols-2"}>
                <TabsTrigger
                    onClick={() => {
                        setIDE(true);
                    }}
                    value={"ide"}
                >
                    IDE
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => {
                        setIDE(false);
                    }}
                    value={"draw"}
                >
                    Draw
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
};
