import JWT from "jsonwebtoken";

//Protected Route token based
export const requireSignIn = async (req, res, next) => {
    try {
        req.user = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        next();
    } catch (e) {
        console.log(e);
    }
};
