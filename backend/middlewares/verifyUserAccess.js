export default function verifyUserAccess(req, res) {
  const { userId } = req.query;
  if (String(req.userId) !== String(userId)) {
    throw new Error("Access denied");
  }
}
