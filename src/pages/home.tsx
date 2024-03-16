import {Layout} from "@/components/layout";
import {RoomCard} from "@/components/room-card.tsx";

export const Home = () => {
    return (
        <Layout>
            <div className={"p-4"}>
                <RoomCard/>
            </div>
        </Layout>
    );
};
