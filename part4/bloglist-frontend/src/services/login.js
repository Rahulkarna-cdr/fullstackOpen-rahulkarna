// import axios from 'axios'
const baseUrl = '/api/login'

const login=async (newObj)=>{
    const response = await fetch(baseUrl,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newObj)
    })
    const data = await response.json()
    return data
//    const request=await axios.post(baseUrl,newObject)
//    return request.data
}
export default { login}