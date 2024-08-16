import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const verifyToken = (req, res, next) => {
    
    console.log("Incoming Request:");
    console.log("URL:", req.url);
    console.log("Method:", req.method);
    console.log("Cookies:", req.cookies);
    console.log("jwt tokens",process.env.TZ)

    const token=req.cookies.token;

    if (!token)
        return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Error in verifyToken", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
