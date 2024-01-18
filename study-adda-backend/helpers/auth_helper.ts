import bcrypt from "bcrypt"

export const hashPassword = async (password: string) => {
    try{
        const saltRounds = 10
        return await bcrypt.hash(password, saltRounds)
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async (password: string, hashedPassword: string) => bcrypt.compare(password,hashedPassword)
