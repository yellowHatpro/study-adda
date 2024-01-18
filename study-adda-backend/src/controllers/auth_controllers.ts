import {User} from "../../types/user";
import {db} from "../../db/db";
import {eq} from "drizzle-orm";
import {accounts, users} from "../../db";
import {hashPassword} from "../../helpers/auth_helper";

export const registerController = async (req, res) => {
    try {
        const {name, title, email, dob, password} : User = req.body
        if (!name) return res.send({message: "Name is required"})
        if (!email) return res.send({message: "Email is required"})
        if (!title) return res.send({message: "Title is required"})
        if (!dob) return res.send({message: "DOB is required"})
        // check if name is allowed
        const [existing_username] = await db.selectDistinct().from(users).where(eq(users.name, name))
        if (existing_username){
            return res.status(422).send({
                success: false,
                message: "Username exists, please retry"
            })
        }
        // check existing username
        const [existing_user] = await db.selectDistinct().from(users).where(eq(users.email, email))
        if (existing_user){
            return res.status(409).send({
                success: false,
                message: "User exists, consider logging in"
            })
        }
        //Register User
        const hashedPassword = await hashPassword(password)
        const [user] = await db.insert(users).values({name: name, email: email, dob: dob, title: title, role: "user" }).returning()
        res.status(201).send({
            success: true,
            message: "User created",
            user
        })
        await db.insert(accounts).values({userId: user.id, password: hashedPassword})
    } catch (e) {
        res.status(500).send({
            success: false,
            message: "Server error"
        })
    }
}
export const loginController = async (req, res) => {

}
export const forgotPasswordController = async (req,res) => {

}