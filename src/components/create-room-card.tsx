import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {URL} from "@/lib/utils.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {PlusIcon} from "lucide-react";
import {useState} from "react";
import Loading from "@/components/loading.tsx";
import {Category} from "@/types/category.ts";
import {useNavigate} from "react-router-dom";


type CreateCategoryProps = {
    categoryName: string
}

type CreateRoomProps = {
    name: string
}

export const CreateRoomCard = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    //Input states
    const [roomName, setRoomName] = useState('')
    const [createdCategoryName, setCreatedCategoryName] = useState('')

    // Categories Query
    const {isPending: getCategoryIsPending, isError: getCategoryIsError, error: getCategoryError, data: roomCategories} = useQuery({
        queryKey: ['getAllRoomsCategories'],
        queryFn: async () => {
            return await fetch(`${URL}/api/v1/room/get-all-room-categories`)
                .then((res) => res.json())
                .then((res) => res['categories'] as Category[])
        }
    })

    if (getCategoryIsError) {
        toast({
            title: "Something went wrong",
            description: getCategoryError.message,
        })
    }
    //Add category mutation
    const mutation = useMutation({
        mutationFn: (payload: CreateCategoryProps) => {
            return fetch(`${URL}/api/v1/room/create-room-category`, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    payload
                )
            })
        },
        onSuccess: async () => {
            return await queryClient.invalidateQueries({queryKey: ['getAllRoomsCategories']})

        },
        onError: (error) => {
            toast({
                title: "Something went wrong",
                description: error.message,
            })
        }
    })

    //Create Room mutation
    const createRoomMutation = useMutation({
        mutationFn: (payload: CreateRoomProps) => {
            return fetch(`${URL}/api/v1/room/create`, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    payload
                )
            })
        },
        onSuccess: async  (data) => {
            const room = await data?.json().then((res)=>res.room)
            navigate(`/room/${room.id}`)
        }
    })

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Create Room</CardTitle>
                <CardDescription>Create room for cool discussions</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name"
                                   value={roomName}
                                   onChange={(e)=>setRoomName(e.target.value)}
                                   placeholder="Name of your room"/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Category</Label>
                            <Select>
                                <SelectTrigger id="framework">
                                    <SelectValue placeholder="Select"/>
                                </SelectTrigger>
                                {getCategoryIsPending ? <Loading/> : <SelectContent position="popper">
                                    {roomCategories?.length==0 ?
                                        <h1 className={"text-sm p-2"}>No category available, create some :)</h1> :
                                        // Once we have categories available
                                        roomCategories?.map((category, index) => <SelectItem
                                        value={category.name} key={index}>{category.name}</SelectItem>)}
                                </SelectContent>}
                            </Select>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">
                                        <PlusIcon className={"h-2/3"}/>
                                        <h1 className={"text-sm"}>Create new category</h1>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="grid gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name"
                                                   value={createdCategoryName}
                                                   onChange={(e) => setCreatedCategoryName(e.target.value)}
                                                   placeholder="Category"/>
                                        </div>
                                        <Button
                                            onClick={() => {
                                                return mutation.mutate({categoryName: createdCategoryName})
                                            }}
                                        >
                                            <h1>Create Category</h1>
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={()=>{
                    setRoomName('')
                    setCreatedCategoryName('')
                }}>Clear</Button>
                <Button
                    onClick={()=>{
                        return createRoomMutation.mutate({name: roomName})
                    }}
                >Create</Button>
            </CardFooter>
        </Card>
    );
};
