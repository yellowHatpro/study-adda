import {db} from "../../db/db";
import {users} from "../../db";
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