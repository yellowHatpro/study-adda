import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {Separator} from "@/components/ui/separator.tsx";
import {useState} from "react";
import {Link, Outlet} from "react-router-dom";

export const Settings = () => {
    const sections = ["Profile", "Account", "Appearance", "Notifications"]
    const [selectedSection, setSelectedSection] = useState(0)
    return (
        <Layout>
            <section className={"p-8"}>
                <div>
                    <h1 className={"text-2xl font-bold"}>
                        Settings
                    </h1>
                    <h1 className={"text-gray-400"}>
                        Manage your account settings and set e-mail preferences.
                    </h1>
                    <Separator className={"bg-gray-400 my-4"}/>
                </div>
                <div className={"flex-row sm:hidden lg:flex xs:hidden"}>
                    <div className={"flex flex-col h-full child:m-1"}>
                        {sections.map((section, idx) => {
                            return (
                                <Link to={`/settings/${section.toLowerCase()}`}>
                                    <Button
                                        className={`${idx == selectedSection ? "bg-neutral-700" : ""} h-1/2 max-w-[200px] min-w-[200px]`}
                                        variant={null}
                                        onClick={() => setSelectedSection(idx)}>
                                        <h1 className={"text-start w-full"}>{section}</h1>
                                    </Button>
                                </Link>
                            )
                        })}
                    </div>
                    <div className={"border-2 w-full rounded-md p-4 mx-2"}>
                        <Outlet/>
                    </div>
                </div>
                <div className={"sm:flex flex-col lg:hidden xs:flex"}>
                    <div className={"flex flex-row h-full child:m-1"}>
                        {sections.map((section, idx) => {
                            return (
                                <Link to={`/settings/${section.toLowerCase()}`}>
                                    <Button
                                        className={`${idx == selectedSection ? "bg-neutral-700" : ""}`}
                                        variant={null}
                                        onClick={() => setSelectedSection(idx)}>
                                        <h1 className={"text-start w-full"}>{section}</h1>
                                    </Button>
                                </Link>
                            )
                        })}
                    </div>
                    <div className={"border-2 w-full h-full rounded-md p-4 my-4"}>
                        <Outlet/>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
