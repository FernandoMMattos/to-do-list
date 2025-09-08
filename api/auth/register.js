import { register } from "../../../backend/controllers/authController";

export default async function handler(req, res) {
  if (req.method === "POST") {
    return register(req, res);
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
