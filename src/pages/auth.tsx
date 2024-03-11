import {Button} from "@/components/ui/button.tsx";
import {GithubIcon} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";

export const AuthPage = () => {
    return (
        <section className={"h-screen w-full"}>
            <nav className={"w-full flex justify-end"}>
                <Button className={"m-4"} variant={"ghost"}> Login </Button>
            </nav>
            <section className={"w-full h-[80vh] text-center flex items-center justify-center"}>
                <div className={"flex flex-col items-center "}>
                    <h1 className={"font-bold text-2xl"}>Create an account</h1>
                    <p className={"text-sm m-2 text-gray-400"}>Enter your account to create your account</p>
                    <Input id="name" placeholder="name@example.com"/>
                    <Button className={"w-full m-4"}>
                        <h1>Sign in with email</h1>
                    </Button>
                    <div className={"flex flex-row m-2 text-sm text-center items-center justify-center text-gray-300"}>
                        <Separator className={"w-20 mr-2 bg-gray-400"}/>
                        <p>OR CONTINUE WITH</p>
                        <Separator className={"ml-2 w-20 bg-gray-400"}/>
                    </div>
                    <Button variant={"outline"} className={"w-full"}>
                        <GithubIcon/>
                        <h1>Github</h1>
                    </Button>
                    <p className={"w-20 font-light text-sm m-4 text-gray-400"}>By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
            </section>
        </section>
    );
}
