import axios from "axios";

export const currentUser = async(authtoken)=>{
    return await axios.post("https://modnae-website-bw1x.vercel.app/api/current-user",
        {},
        {
            headers:{
                authtoken,
            }
        }
    )    
}

export const currentAdmin = async(authtoken)=>{
    return await axios.post("https://modnae-website-bw1x.vercel.app/api/current-admin",
        {},
        {
            headers:{
                authtoken,
            }
        }
    )    
}
