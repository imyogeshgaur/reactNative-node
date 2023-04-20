import { decode } from "jsonwebtoken"


const decodeUser = (token:any)=>{
    try {
        const decodedUser = decode(token,{complete:true})
        return decodedUser?.payload;
    } catch (error) {
        console.log("Decoding Error : ",error);
    }
}

export default decodeUser;