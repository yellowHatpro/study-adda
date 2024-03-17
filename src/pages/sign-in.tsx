import authStore from "@/store/authStore.ts";
import {Navigate, useNavigate} from "react-router-dom";
import {AuthState, UserState} from "@/types/auth.ts";
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {LOCAL_STORAGE_ACCESS_TOKEN, URL} from "@/lib/utils.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {useEffect} from "react";

type SignInProps = {
    email: string,
    name: string,
    password: string
    title: string,
}

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string()
        .min(1, {
        message: "This field has to be filled."
    })
        .email("This is not a valid email."),
    title: z.string()
        .min(3, {
            message: "title must be at least 3 character"
        }),
    password: z.string().min(6, {
        message: "Password must be at least 5 character"
    })
})

export function SignInPage() {
    const emailState =  authStore.getState()?.user?.email ?? ""
    const userState = authStore.getState()?.userState
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN))
            navigate("/")

    }, [navigate]);

    const mutation = useMutation({
        mutationFn: (payload: SignInProps) => {
            return fetch(`${URL}/api/v1/auth/sign-in`, {
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
            const {user, accesstoken} = await data.json()
            if (data.status==200){
                localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, accesstoken)
                const authState: AuthState = {
                    isAuthenticated: true,
                    user: user,
                    userState: UserState.LOGGED_IN
                }
                authStore.setState(authState)
                navigate("/")
                return
            }
        },
        onError: (error) => {
            toast({
                title: "Something went wrong",
                description: error.message,
            })
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email:emailState
        },
    })

    if (!userState || userState == UserState.LOGGED_OUT) {
        return <Navigate to={"/auth"}/>
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate(values)
    }

    return (
        <section className={"flex h-screen justify-around items-center flex-col"}>
            <h1 className={"text-2xl font-bold text-center"}>Complete your profile</h1>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <>
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input className={"w-full min-w-[300px]"} placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <>
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <>
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder={"Cool genz name"} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <>
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type={"password"} placeholder={"Enter password"} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                </>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </section>
    );
}
