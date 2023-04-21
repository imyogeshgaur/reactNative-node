import { Response, Request } from "express";
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
            const user = await this.service.getUserDetails(token);
            if (user === null) {
                return this.res.status(200).send({ message: "No User Found !!!" });
            } else {
                return this.res.status(200).send({ user });
            }
        } catch (error) {
            console.log("Error in Controller : ", error);
            return this.res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }
    async updateUser() {
        try {
            const token: any = this.req.headers.authorization;
            const data = this.req.body;
            const update: any = await this.service.updateUser(data, token);
            if (update === 0) {
                return this.res.status(200).send({ message: "Details not Updated !!!" })
            } else {
                return this.res.status(200).send({ message: "Details Updated !!!" })
            }
        } catch (error) {
            console.log("Error in Controller : ", error);
            return this.res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }

    async deleteUser() {
        try {
            const token: any = this.req.headers.authorization;
            const deleted: any = await this.service.deleteUser(token);
            if (deleted === 0) {
                return this.res.status(200).send({ message: "User not Deleted !!!" })
            } else {
                return this.res.status(200).send({ message: "User Deleted !!!" })
            }
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
                return this.res.status(200).send({ message: "Password do not Updated !!!" })
            } else {
                return this.res.status(200).send({ message: "Password Updated !!!" })
            }
        } catch (error) {
            console.log("Error in Controller : ", error)
        }
    }
}

export default UserController;