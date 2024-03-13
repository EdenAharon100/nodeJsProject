import Jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(401).json({ type: "not authhoriked", message: "missing token" })
    try {
        let user = Jwt.verify(token, process.env.SECRET_JWT);
        req.user = user;
        next()
    }
    catch (err) {
        return res.status(401).json({ type: "not authhoriked", message: "invalid token / token expired" })
    }
}

export const authAdmin = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(401).json({ type: "not authhoriked", message: "missing token" })
    try {
        let user = Jwt.verify(token, process.env.SECRET_JWT);
        if (user.role != "ADMIN")
            res.status(403).json({ type: "not allowed", message: "this opration only manager" })
        req.user = user;
        next()
    }
    catch (err) {
        return res.status(401).json({ type: "not authhoriked", message: "invalid token / token expired" })
    }
}

