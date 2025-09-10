import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_PASSWORD;

export default function verifyToken(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error("No token provided");

  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("Invalid token");

  const decoded = jwt.verify(token, JWT_SECRET);
  req.userId = decoded.userId;
}
