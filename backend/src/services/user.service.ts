import User from "../models/user.entity"
import decodeUser from "../helper/decode.helper";
import { hash, compare } from "bcryptjs";
import { v1 } from "uuid";
import { sign } from "jsonwebtoken";
import { resolve } from "path"
import { config } from "dotenv"
import { mailToForgetPassword } from "../helper/mail.helper";
config({ path: resolve("src/.env") })

class UserService {

    async getUserDetails(token: any) {
        try {
            const data = decodeUser(token)
            console.log(data);
        } catch (error) {
            console.log("Error in Service : ", error);
        }
    }

    async updateUser() {
        try {

        } catch (error) {
            console.log("Error in Service : ", error);
        }
    }

    async deleteUser() {
        try {

        } catch (error) {
            console.log("Error in Service : ", error);
        }
    }

    //! Authentication Service

    async signUpUser(data: any) {
        try {
            const password = data.password;
            const newPassword = await hash(password, 12);
            const id = v1();
            const userToSaved = await User.create({
                userId: id,
                ...data,
                password: newPassword
            })
            return userToSaved;
        } catch (error) {
            console.log("Error in Service : ", error);
        }
    }

    async loginUser(data: any) {
        try {
            const { email, password } = data;
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                const findUser = await User.findOne({
                    where: {
                        email
                    }
                })
                if (email.toLowerCase() === findUser?.dataValues.email.toLowerCase()) {
                    const match: any = await compare(password, findUser?.dataValues.password);
                    if (match) {
                        const token: any = sign(findUser?.dataValues.userId, process.env.JWT_SECRET as string)
                        return token;
                    } else {
                        return 0
                    }
                } else {
                    return 0
                }
            } else {
                const findUser = await User.findOne({
                    where: {
                        userName: email
                    }
                })
                if (email.toLowerCase() === findUser?.dataValues.userName.toLowerCase()) {
                    const match: any = await compare(password, findUser?.dataValues.password);
                    if (match) {
                        const token: any = sign(findUser?.dataValues.userId, process.env.JWT_SECRET as string)
                        return token;
                    } else {
                        return 0
                    }
                } else {
                    return 0
                }
            }
        } catch (error) {
            console.log("Error in Service : ", error);
        }
    }

    async forgetPassword(email: string) {
        try {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                const userDetails = await User.findOne({
                    where: {
                        email
                    }
                })
                if (userDetails) {
                    const token: any = sign(userDetails?.dataValues.userId, process.env.JWT_Secret as string)
                    const message = await mailToForgetPassword(email, userDetails?.dataValues.userName, token)
                    return message;
                } else {
                    return 0
                }
            } else {
                const userDetails = await User.findOne({
                    where: {
                        userName: email
                    }
                })
                if (userDetails) {
                    const token: any = sign(userDetails?.dataValues.userId, process.env.JWT_Secret as string)
                    const message = await mailToForgetPassword(userDetails.dataValues.email, userDetails?.dataValues.userName, token)
                    console.log(message)
                    return message;
                } else {
                    return 0
                }
            }
        } catch (error) {
            console.log("Error in Service : ", error);
        }
    }

    async resetPassword(data: any, token: any) {
        try {
            const decodedVal = decodeUser(token);
            if (decodedVal) {
                const newPassword = await hash(data.password, 12);
                const update = await User.update({
                    password: newPassword
                }, {
                    where: {
                        userId:decodedVal
                    }
                })
                return update;
            } else {
                return 0;
            }
        } catch (error) {
            console.log("Error in Service : ", error);
        }
    }
}

export default UserService