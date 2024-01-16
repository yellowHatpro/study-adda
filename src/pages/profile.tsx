import { Layout } from "@/components/layout";
import {Sidepage} from "@/pages/profile/sidepage.tsx";
import {Mainpage} from "@/pages/profile/mainpage.tsx";

export const Profile = () => {
  return <Layout>
    <div className={"flex flex-row p-4 h-full"}>
      <Sidepage/>
      <Mainpage/>
    </div>
  </Layout>;
};
