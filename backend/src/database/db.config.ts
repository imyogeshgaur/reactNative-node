import { Sequelize } from "sequelize"
import { resolve } from "path"
import { config } from "dotenv"
config({ path: resolve("src/.env") })


const sequelize = new Sequelize(process.env.CONNECTION_URI as string)

const connectWithDB = async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.log("Error in DB Connection : ", error)
    }
}

export default connectWithDB;