import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {GithubIcon} from "lucide-react";
import {Link} from "react-router-dom";

export function LoginPage() {
    return (
        <section className={"w-full flex flex-col items-center justify-center h-screen text-center"}>
            <h1 className={"font-bold text-2xl"}>Login</h1>
            <div className={"flex flex-col items-center child:m-2"}>
                <Input id="name" type={"email"} placeholder="Enter youer email"/>
                <Input id="password" type={"password"} placeholder="Enter your password"/>
                <Button className={"w-full m-4"}>
                    <h1>Login using email</h1>
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
            </div>
            <div className={"text-gray-400 text-sm"}>
                <h1>Don't have an account?</h1>
                <Link to={"/auth"}>
                    <h1 className={"underline"}>Sign in</h1>
                </Link>
            </div>
        </section>
    )
}
