import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {SkeletonCard} from "@/components/ui/skeleton-card.tsx";

export const Appearance = () => {
    return (
        <section>
            <div>
                <h1 className={"text-xl font-bold"}>
                    Appearance
                </h1>
                <h1 className={"text-gray-400"}>
                    Customize the appearance of the app. Automatically switch between day and night themes.
                </h1>
                <Separator className={"my-4"}/>
                <div className={"py-4"}>
                    <h1>Theme</h1>
                    <div className={"py-2"}>
                        <SkeletonCard/>
                    </div>
                </div>
            </div>
            <Button className={"my-4"}><h1>Update preferences</h1></Button>
        </section>
    );
};
