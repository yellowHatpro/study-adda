import { User } from "../../types/user";
import { db } from "../../db/db";
import { eq } from "drizzle-orm";
import { accounts, users } from "../../db";
import { comparePassword, hashPassword } from "../../helpers/auth_helper";
import * as process from "process";
import JWT from "jsonwebtoken";

export const signInController = async (req, res) => {
    try {
        const { name, title, email, password }: User = req.body;
        if (!name) return res.send({ message: "Name is required" });
        if (!email) return res.send({ message: "Email is required" });
        if (!title) return res.send({ message: "Title is required" });
        // check if name is allowed
        const [existing_username] = await db
            .selectDistinct()
            .from(users)
            .where(eq(users.title, title));
        if (existing_username) {
            return res.status(422).send({
                success: false,
                message: "Username exists, please retry",
            });
        }
        // check existing username
        const [user] = await db
            .selectDistinct()
            .from(users)
            .where(eq(users.email, email));
        if (user) {
            const accessToken = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "3d",
            });
            await db.update(users)
                .set({name: name, title: title})
                .where(eq(users.email, email))

            //Register User
            const hashedPassword = await hashPassword(password);
            await db
                .insert(accounts)
                .values({ userId: user.id, password: hashedPassword });

            return res.status(200).send({
                success: true,
                user: user,
                accessToken: accessToken
            });
        }
    } catch (e) {
        res.status(500).send({
            success: false,
            message: "Server error",
        });
    }
};

export const registerController = async (req,res) => {
    try {
        const {email} = req.body
        if (!email) return res.status(401).send({
            success: false,
            message: "Invalid username",
        });
        const [prev_user] = await db
            .selectDistinct()
            .from(users)
            .where(eq(users.email, email));
        if (prev_user){
            return res.status(200).send({
                success: true,
                user: prev_user
            })
        }
        const [user] = await db
            .insert(users)
            .values({
                email: email
            })
            .returning()
        res.status(201).send({
            success: true,
            user: user
        })

    } catch (e) {
        res.status(500).send({
            success: false,
            message: "Server error",
        });
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Invalid username or password",
            });
        }
        //check user
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered, Please Sign in instead",
            });
        }
        const { password: userPasswordInAccount } =
            await db.query.accounts.findFirst({
                where: eq(accounts.userId, user.id),
                columns: {
                    password: true,
                },
            });
        const match = await comparePassword(password, userPasswordInAccount);
        if (!match) {
            return res.status(401).send({
                success: false,
                message: "Wrong password",
            });
        }
        //Assuming user has been verified
        // Access Token
        const accessToken = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        const refreshToken = JWT.sign({ id: user.id }, process.env.REFRESH_SECRET);
        res.status(200).send({
            success: true,
            message: "Login Successful",
            user,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    } catch (e) {
        console.log("Error in login", e);
        res.status(500).send({
            success: false,
            message: "Login Error",
            e,
        });
    }
};

export const refreshTokenController = async (req, res) => {
    const refreshToken = req.body.token;
};

export const githubController = async (req, res) => {
    //TODO: GitHub oAuth. Should I use Passport js or manually setup this?
};
export const forgotPasswordController = async (req, res) => {
    //TODO: Once things get done, come back here. Will add SEND MAIL functionality
};
