import { CreateRoomCard } from "@/components";
import { Layout } from "@/components/layout";

export const Home = () => {
    return (
        <Layout>
            <div className={"p-4"}>
                <CreateRoomCard />
            </div>
        </Layout>
    );
};
