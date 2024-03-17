import {db} from "../../db/db";
import {rooms} from "../../db";

export const createRoomController = async (req, res) => {
    try {
        const userId = req.user;
    } catch (e) { }
};
export const getRoomController = async (req, res) => {
    try {
        const { roomId } = req.params;
    } catch (e) { }
};
export const getAllRoomsController = async (req, res) => {
    try {
        const [roomsData] = await db
            .select()
            .from(rooms)
        if (!roomsData){
            return res.status(200).send({
                success: false,
                message: "No room has been created",
                roomsData: []
            })
        } else return res.status(200).send({
            sucess: true,
            roomsData
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            message: "Server error",
        });
    }
}
