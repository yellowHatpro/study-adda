import {db} from "../../db/db";
import {users, usersToRooms} from "../../db";
import {eq} from "drizzle-orm";

export const userController = async (req, res) => {
    try {
        const {id : userId} = req.user
        const [user] = await db
            .selectDistinct()
            .from(users)
            .where(eq(users.id, userId))
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User does not exist, consider signing in"
            })
        } else return res.status(200).send({
            success: true,
            user
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            message: "Server error",
        });
    }
}

export const getUserJoinedRoomsController = async (req, res) => {
    try {
        const {id : userId} = req.user
        const [roomIds] = await db
            .select()
            .from(usersToRooms)
            .where(eq(userId, usersToRooms.user_id))
        if (!roomIds){
            return res.status(404).send({
                success:false,
                message: "User has no rooms!",
            })
        }

        return res.status(200).send({
            success: true,
            roomIds: roomIds
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            message: "Server error",
        });
    }
}