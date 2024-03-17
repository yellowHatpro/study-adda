import {LoaderIcon} from "lucide-react";

export default function Loading() {
    return (
        <div className={"flex justify-center items-center"}>
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin"/>
            Please wait
        </div>
    )
}
