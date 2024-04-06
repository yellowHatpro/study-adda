import {db} from "../../db/db";
import {roomCategories, rooms, roomsToRoomCategories} from "../../db";
import {eq} from "drizzle-orm";

export const createRoomController = async (req, res) => {
    try {
        const {name} = req.body;
        console.log(name)
        const [room] =  await db
            .insert(rooms)
            .values({name: name})
            .returning()
        res.status(201)
            .send({
                success: true,
                room
            })
    } catch (e) {
        console.log(e)
        res.status(500).send({
            success: false,
            message: "Server error"
        })
    }
};
export const getRoomController = async (req, res) => {
    try {
        const { roomId } = req.params;
    } catch (e) { }
};
export const getAllRoomsController = async (req, res) => {
    try {
        const roomsData = await db
            .select()
            .from(rooms)
        if (!roomsData){
            return res.status(200).send({
                success: false,
                message: "No room has been created",
                roomsData: []
            })
        } else return res.status(200).send({
            success: true,
            roomsData
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            message: "Server error",
        });
    }
}

export const getAllRoomCategoriesController = async (req, res) => {
    try {
        const categories = await db
            .select({
                name: roomCategories.name
            })
            .from(roomCategories)
            return res.status(200).send({
                success: true,
                categories
            })

    } catch (e) {
        res.status(500).send({
            success: false,
            message: "Server error",
        });
    }
}

export const getRoomCategoriesByRoomIdController = async (req, res) => {
    try {
        const {roomId} = req.params;
        //Fetch all category ids based on roomId
        const categories = await db
            .select({
                category_id: roomsToRoomCategories.categoryId
            })
            .from(roomsToRoomCategories)
            .where(eq(roomsToRoomCategories.roomId, roomId));
        //Then, fetch all categories based on category ids
        let categoriesList = []
        for (let category_id in categories) {
            const [{name}] = await db
                .select({
                    name: roomCategories.name
                })
                .from(roomCategories)
                .where(eq(roomCategories.id, Number(category_id) + 1));
            categoriesList.push(name);
        }
        res.status(200).send({
            success: true,
            message: categoriesList
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            message: "Server error",
        });
    }
}

export const createRoomCategoryController = async (req, res) => {
    try {
        const {categoryName} = req.body
        console.log(categoryName)
        const [category] = await db
            .insert(roomCategories)
            .values({
                name: categoryName
            }).returning()
        res.status(201).send({
            success: true,
            message: category
        })

    } catch (e) {
        res.status(500).send({
            success: false,
            message: "Server error",
        });
    }
}
