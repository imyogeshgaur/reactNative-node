import { Request, Response, NextFunction } from "express"
import {verify} from "jsonwebtoken";

const authentication = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: any = req.headers.authorization;
        const verifyUser = verify(token, process.env.JWT_SECRET as string);
        if (verifyUser) {
            next();
        } else {
            res.status(400).send({ message: "Not Authorized !!!" })
        }
    } catch (error) {
        console.log("Authentication Error : ", error)
        return res.status(500).send({ message: "Internal Server Error !!!" })
    }
}

export default authentication;