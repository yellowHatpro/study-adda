import {Layout} from "@/components/layout";
import {CreateRoomCard} from "@/components";

const CreateRoomPage = () => {
    return (
        <Layout>
            <div className={"flex justify-center h-full items-center"}>
                <CreateRoomCard/>
            </div>
        </Layout>
    )
}

export default CreateRoomPage

