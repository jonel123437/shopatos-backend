import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      console.warn("AuthMiddleware: No token found in cookies");
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      console.warn("AuthMiddleware: Token decoded but no user ID found");
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("AuthMiddleware: JWT verification failed ->", err.message);
    return res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
  }
};
