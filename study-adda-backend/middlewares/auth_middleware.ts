import JWT from "jsonwebtoken";

//Protected Route token based
export const requireSignIn = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) return res.status(401).send({
            success: false,
            message: "Token not found"
        });
        JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).send({
                success: false,
                message: "Error verifying using JWT"
            });
            req.user = user;
            next();
        });

    } catch (e) {
        console.log("Auth Middleware error", e);
    }
}
