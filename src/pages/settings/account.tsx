import {Separator} from "@/components/ui/separator.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

export const Account = () => {
    return (
        <section>
            <div>
                <h1 className={"text-xl font-bold"}>
                    Account
                </h1>
                <h1 className={"text-gray-400"}>
                    Update your account settings. Set your preferred language and timezone.
                </h1>
                <Separator className={"my-4"}/>
                <div className={"py-4"}>
                    <h1>Name</h1>
                    <Input id="name" type={"name"} placeholder={`Ashutosh Aswal`}/>
                </div>
            </div>
            <Button className={"my-4"}><h1>Update account</h1></Button>
        </section>
    );
};
