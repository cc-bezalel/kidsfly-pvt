import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || "none";
  const secret = process.env.JWT_SECRET || "secret";

  try {
    if (token === "none" || token === "null") {
      throw Error("Token required to access protected route");
    }
    const decoded = jwt.verify(token, secret);
    req.token = decoded;
    next();
  } catch (e) {
    return res.status(404).json({ msg: "401: Unathorized, provide your token" });
  }
};

export const createToken = payload => {
  const secret = process.env.JWT_SECRET || "secret";
  const token = jwt.sign(payload, secret);
  return token;
};

export default verifyToken;
