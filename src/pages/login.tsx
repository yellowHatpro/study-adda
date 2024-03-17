import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {GithubIcon} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {LOCAL_STORAGE_ACCESS_TOKEN, URL} from "@/lib/utils.ts";
import {AuthState, UserState} from "@/types/auth.ts";
import authStore from "@/store/authStore.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {useEffect, useState} from "react";

type LogInProps = {
    email: string,
    password: string
}
export function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const mutation = useMutation({
        mutationFn: (payload: LogInProps) => {
            return fetch(`${URL}/api/v1/auth/login`, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    payload
                )
            })
        },
        onSuccess: async (data) => {
            const {user, accessToken} = await data.json()
            if (data.status == 200) {
                localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, accessToken)
                const authState: AuthState = {
                    isAuthenticated: true,
                    user: user,
                    userState: UserState.LOGGED_IN
                }
                authStore.setState(authState)
                toast({
                    title: "Login Successful ✅"
                })
                navigate("/")
                return
            }
            if (data.status == 404) {
                toast({
                    title: "Please check email address again"
                })
            }
        },
        onError: (error) => {
            toast({
                title: "Something went wrong",
                description: error.message,
            })
        }
    })

    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN))
            navigate("/")

    }, [navigate]);

    return (
        <section className={"w-full flex flex-col items-center justify-center h-screen text-center"}>
            <h1 className={"font-bold text-2xl"}>Login</h1>
            <div className={"flex flex-col items-center child:m-2"}>
                <Input
                    id="name"
                    type={"email"}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                <Input
                    id="password"
                    type={"password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <Button
                    onClick={() => mutation.mutate({email: email, password: password})}
                    className={"w-full m-4"}>
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
