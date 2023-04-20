import { createTransport } from "nodemailer"
import { resolve } from "path"
import { config } from "dotenv"
config({ path: resolve("src/.env") })

const myTransport: any = createTransport({
    host: process.env.MAIL_SERVICE,
    port: 587,
    auth: {
        user: process.env.SERVICE_MAIL,
        pass: process.env.SERVICE_MAIL_PASSWORD
    }
})


const mailToForgetPassword = async (email: string, firstName: string, token: any) => {
    try {
        const info = await myTransport.sendMail({
            from: process.env.SERVICE_MAIL,
            to: email,
            subject: "Password Reset Link",
            html: `
            <html>
            <head>
            </head>
            <body>
                <p> Dear ${firstName}, </p>   
                <p>There was a request to change your password!
                <br>
                If you did not make this request then please ignore this email.
                <br>
                Otherwise, <a href="http://localhost:5173/resetPassword/${token}">
                Click Here</a> to Login !!!</p>
                Thanks and Regards
                <br>
                Team Yogesh Gaur
            </body>
            </html>
        `
        })
        console.log("Mail Send Successfully !!!")
        if (info.messageId) {
            return "Check Mail For Login !!!";
        } else {
            return "Mail Not Send Successfully  !!!";
        }
    } catch (error) {
        console.log("Error in Helper : ", error);
    }
}

export { mailToForgetPassword }