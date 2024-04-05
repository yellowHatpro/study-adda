import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useMutation} from "@tanstack/react-query";
import {LOCAL_STORAGE_ACCESS_TOKEN, URL} from "@/lib/utils.ts";
import {AuthState, UserState} from "@/types/auth.ts";
import authStore from "@/store/authStore.ts";
import {toast} from "@/components/ui/use-toast.ts";



export const CreateRoomCard = () => {
    //
    // const mutation = useMutation({
    //     mutationFn: (payload: SignInProps) => {
    //         return fetch(`${URL}/api/v1/auth/sign-in`, {
    //             method: "POST",
    //             mode: "cors",
    //             cache: "no-cache",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(
    //                 payload
    //             )
    //         })
    //     },
    //     onSuccess: async (data) => {
    //         const {user, accesstoken} = await data.json()
    //         if (data.status==200){
    //             localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, accesstoken)
    //             const authState: AuthState = {
    //                 isAuthenticated: true,
    //                 user: user,
    //                 userState: UserState.LOGGED_IN
    //             }
    //             authStore.setState(authState)
    //             navigate("/")
    //             return
    //         }
    //     },
    //     onError: (error) => {
    //         toast({
    //             title: "Something went wrong",
    //             description: error.message,
    //         })
    //     }
    // })

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Create Room</CardTitle>
                <CardDescription>Create room for tech discussion</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Name of your room"/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Category</Label>
                            <Select>
                                <SelectTrigger id="framework">
                                    <SelectValue placeholder="Select"/>
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="next">Data Structures and Algorithms</SelectItem>
                                    <SelectItem value="sveltekit">Competitive Programming</SelectItem>
                                    <SelectItem value="astro">Web Development</SelectItem>
                                    <SelectItem value="nuxt">Mobile Development</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Clear</Button>
                <Button>Create</Button>
            </CardFooter>
        </Card>
    );
};
