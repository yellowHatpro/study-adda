import {User} from "../../types/user";
import {db} from "../../db/db";
import {eq} from "drizzle-orm";
import {accounts, users} from "../../db";
import {comparePassword, hashPassword} from "../../helpers/auth_helper";
import * as process from "process";
import JWT from "jsonwebtoken";

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
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Invalid username or password"
            })
        }
        //check user
        const user = await db.query.users.findFirst({
            where: eq(users.email, email)
        })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered, Please Sign in instead"
            })
        }
        const {password: userPasswordInAccount} = await db.query.accounts.findFirst({
            where: eq(accounts.userId, user.id),
            columns: {
                password: true
            }
        })
        const match = await comparePassword(password, userPasswordInAccount)
        if (!match){
            return res.status(401).send({
                success: false,
                message: "Wrong password"
            })
        }
        // JWT Token
        const token = JWT.sign({id: user.id}, process.env.JWT_SECRET, {
            expiresIn: "3d"
        })
        res.status(200).send({
            success: true,
            message: "Login Successful",
            user,
            token
        })
    } catch (e) {
        console.log("Error in login",e)
        res.status(500).send({
            success: false,
            message: "Login Error",
            e
        })
    }

}
export const forgotPasswordController = async (req,res) => {
//TODO: Once things get done, come back here. Will add SEND MAIL functionality
}