import { Request, Response, Router } from "express";
import UserController from "../controller/user.controller";
import authentication from "../middleware/authentication.middleware";

const userRouter = Router();

userRouter.get("/details",authentication,( req:Request, res:Response) => {
    try {
        const userController = new UserController(req,res);
        userController.getUserDetails();
    } catch (error) {
        console.log("Global Error !!!", error)
    }
})

userRouter.put("/update",authentication,( req:Request, res:Response) => {
    try {
        const userController = new UserController(req,res);
        userController.updateUser();
    } catch (error) {
        console.log("Global Error !!!", error)
    }
})

userRouter.delete("/delete",authentication,( req:Request, res:Response) => {
    try {
        const userController = new UserController(req,res);
        userController.deleteUser();
    } catch (error) {
        console.log("Global Error !!!", error)
    }
})

//! Authentication Routes 

userRouter.post("/signup", ( req:Request, res:Response) => {
    try {
        const userController = new UserController(req,res);
        userController.signUpUser();
    } catch (error) {
        console.log("Global Error !!!", error)
    }
})

userRouter.post("/login", ( req:Request, res:Response) => {
    try {
        const userController = new UserController(req,res);
        userController.loginUser();
    } catch (error) {
        console.log("Global Error !!!", error)
    }
})

userRouter.post("/forgetPass", ( req:Request, res:Response) => {
    try {
        const userController = new UserController(req,res);
        userController.forgetPassword();
    } catch (error) {
        console.log("Global Error !!!", error)
    }
})

userRouter.post("/resetPass/:token", ( req:Request, res:Response) => {
    try {
        const userController = new UserController(req,res);
        userController.resetPassword();
    } catch (error) {
        console.log("Global Error !!!", error)
    }
})

export default userRouter;