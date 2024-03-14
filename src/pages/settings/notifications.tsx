import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";

export const Notifications = () => {
    const FormSchema = z.object({
        type: z.enum(["all", "mentions", "none"], {
            required_error: "You need to select a notification type.",
        }),
    })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    </pre>
            ),
        })
    }

    return (
        <section>
            <div>
                <h1 className={"text-xl font-bold"}>
                    Notifications
                </h1>
                <h1 className={"text-gray-400"}>
                    Configure how you receive notifications.
                </h1>
                <Separator className={"my-4"}/>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({field}) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Notify me about...</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="all"/>
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        All new messages
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="mentions"/>
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Direct messages and mentions
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="none"/>
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Nothing</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
            </div>
            <Button className={"my-4"}><h1>Update notifications</h1></Button>
        </section>
    );
}
