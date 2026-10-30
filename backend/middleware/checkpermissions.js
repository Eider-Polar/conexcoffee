import jwt from "jsonwebtoken"
import {ErrorControlado} from "../utils/ErrorControlado.js"
import UsuarioRepository from "../modules/usuarios/repository/UsuarioRepository.js"

const usuarioRepository = new UsuarioRepository()


// Funcion que verificara que permisos tienen el usuario y para evitar que haga cosas que no le conmpeten 

const checkPermiss = async (req, res, next) => {
    let token = req.headers.authorization || req.headers['Bearer']//
    try {
        if (!token) {
            throw new ErrorControlado("No hay token", 401)
        }
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await usuarioRepository.findById(decoded.id)
            if (!user) {
                throw new ErrorControlado("Usuario no existe", 401)
            }
            req.user = user
        
            next()
        }

    } catch (error) {

        if (error instanceof ErrorControlado) {
            return res.status(error.status).json({ msg: error.message })
        }
    }

}
export default checkPermiss