import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

export const Sidepage = () => {
    return (
        <div className={"flex flex-col items-start text-neutral-100"}>
            <Avatar className={"h-60 w-60"}>
                <AvatarImage src={""}/>
                <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <text className={"text-2xl font-bold "}>Ashutosh Aswal</text>
            <text className={"text-xl font-light text-neutral-400"}>yellowhatpro</text>
        </div>
    );
};
