import {Button} from "@/components/ui/button.tsx";
import {GithubIcon} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {LOCAL_STORAGE_ACCESS_TOKEN, URL} from "@/lib/utils.ts";
import {useEffect, useState} from "react";
import authStore from "@/store/authStore.ts";
import {AuthState, UserState} from "@/types/auth.ts";

type RegisterProps = {
   email: string
}

export const AuthPage = () => {
    const navigate = useNavigate()
    const [emailState, setEmailState] = useState('')
    const mutation = useMutation({
        mutationFn: ({email}: RegisterProps) => {
            return fetch(`${URL}/api/v1/auth/register`, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        email: email
                    }
                )
            })
        },
        onSuccess: async (data) => {
            const {user} = await data.json()
            if (data.status==200){
                // Registered user, coming back to this page, should go to sign-in
                if (!user.title || user.title.length==0){
                    const authState : AuthState = {
                        isAuthenticated: false,
                        user: user,
                        userState: UserState.CREATED
                    }
                    authStore.setState(authState)
                    navigate("/sign-in")
                    return
                }
                else {
                    // existing user, redirect to log in
                    const authState : AuthState = {
                        isAuthenticated: false,
                        user: user,
                        userState: UserState.REGISTERED
                    }
                    authStore.setState(authState)
                    navigate("/login")
                    return
                }

            } else if (data.status==201){
                // new user, redirect to complete sign in

                const authState : AuthState = {
                    isAuthenticated: false,
                    user: user,
                    userState: UserState.CREATED
                }
                authStore.setState(authState)
                navigate("/sign-in")
            }
        }
    })

    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN))
            navigate("/")

    }, [navigate]);

    return (
        <section className={"h-screen w-full"}>
            <nav className={"w-full flex justify-end"}>
                <Link to={"/login"}>
                    <Button className={"m-4"} variant={"ghost"}> Login </Button>
                </Link>
            </nav>
            <section className={"w-full h-[80vh] text-center flex items-center justify-center"}>
                <div className={"flex flex-col items-center child:my-1"}>
                    <h1 className={"font-bold text-2xl"}>Create an account</h1>
                    <p className={"text-sm m-2 text-gray-400"}>Enter your email to create your account</p>
                    <Input
                        id="email"
                        placeholder="Email"
                        value={emailState}
                        onChange={(e)=>setEmailState(e.target.value)}/>
                    <Button
                        onClick={()=>{
                            mutation.mutate({email: emailState})
                        }}
                        className={"w-full m-4"}>
                        <h1>Register with email</h1>
                    </Button>
                    <div className={"flex flex-row m-2 text-sm text-center items-center justify-center text-gray-300"}>
                        <Separator className={"w-20 mr-2 bg-gray-400"}/>
                        <p>OR CONTINUE WITH</p>
                        <Separator className={"ml-2 w-20 bg-gray-400"}/>
                    </div>
                    <Button
                        onClick={()=> {
                        }}
                        variant={"outline"} className={"w-full"}>
                        <GithubIcon/>
                        <h1>Github</h1>
                    </Button>
                    <p className={"w-20 font-light text-sm m-4 text-gray-400"}>By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
            </section>
        </section>
    );
}
