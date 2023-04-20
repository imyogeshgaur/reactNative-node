import { Response, Request } from "express";
import { mailToForgetPassword } from "../helper/mail.helper";
import UserService from "../services/user.service";

class UserController {
    private req: Request;
    private res: Response;
    private service: UserService
    constructor(request: Request, response: Response) {
        this.req = request;
        this.res = response;
        this.service = new UserService();
    }

    async getUserDetails() {
        try {
            const token: any = this.req.headers.authorization;
            const user = this.service.getUserDetails(token);
            return this.res.status(200).send(user);
        } catch (error) {
            console.log("Error in Controller : ", error);
            return this.res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }
    async updateUser() {
        try {
            const update = this.service.updateUser();
            console.log(update);
        } catch (error) {
            console.log("Error in Controller : ", error);
            return this.res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }

    async deleteUser() {
        try {
            const deleted = this.service.deleteUser();
            console.log(deleted);
        } catch (error) {
            console.log("Error in Controller : ", error);
            return this.res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }

    //! Authentication Controller 

    async signUpUser() {
        try {
            const data = this.req.body;
            const user = await this.service.signUpUser(data);
            return this.res.status(200).send({ message: "User Created Successfully !!!", user });
        } catch (error) {
            console.log("Error in Controller : ", error);
            return this.res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }

    async loginUser() {
        try {
            const data = this.req.body;
            const token: any = await this.service.loginUser(data)
            if (token === 0) {
                return this.res.status(200).send({ message: "Invalid Credentials !!!" });
            } else {
                return this.res.status(200).send({ token });
            }
        } catch (error) {
            console.log("Error in Controller : ", error);
            return this.res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }

    async forgetPassword() {
        try {
            const email = this.req.body.email;
            const message = await this.service.forgetPassword(email);
            if (message === 0) {
                return this.res.status(200).send({ message: "Invalid Credentials !!!" })
            } else {
                return this.res.status(200).send({ message })
            }
        } catch (error) {
            console.log("Error in Controller : ", error)
        }
    }

    async resetPassword() {
        try {
            const data = this.req.body;
            const token: any = this.req.params.token;
            const message = await this.service.resetPassword(data, token);
            if (message === 0) {
                return this.res.status(200).send({ message: "Password do not updated !!!" })
            } else {
                return this.res.status(200).send({ message: "Password Updated !!!" })
            }
        } catch (error) {
            console.log("Error in Controller : ", error)
        }
    }
}

export default UserController;