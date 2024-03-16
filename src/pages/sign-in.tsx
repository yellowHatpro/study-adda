import authStore from "@/store/authStore.ts";
import {Navigate} from "react-router-dom";
import {UserState} from "@/types/auth.ts";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


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
    role: z.number()
        .int(),
    password: z.string().min(6, {
        message: "Password must be at least 5 character"
    })
})

export function SignInPage() {
    const emailState =  authStore.getState()?.user?.email ?? ""
    const userState = authStore.getState()?.userState
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
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
