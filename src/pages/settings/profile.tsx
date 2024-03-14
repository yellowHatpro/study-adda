import {Separator} from "@/components/ui/separator.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";

export const UserProfile = () => {
  return <section>
    <div>
      <h1 className={"text-xl font-bold"}>
        Profile
      </h1>
      <h1 className={"text-gray-400"}>
        This is how others will see you on the site.
      </h1>
      <Separator className={"my-4"}/>
      <div className={"py-4"}>
        <h1>Username</h1>
        <Input id="name" type={"name"} placeholder={`yellowhatpro`}/>
      </div>
      <div>
        <h1>Bio</h1>
        <Textarea placeholder={`I code stuff.`}/>
      </div>
    </div>
    <Button className={"my-4"}><h1>Update Profile</h1></Button>
  </section>
}
