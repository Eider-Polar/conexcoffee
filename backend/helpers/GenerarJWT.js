import jwt from "jsonwebtoken";
const generarJWT = (id, role = 'usuario') => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}
export default generarJWT;