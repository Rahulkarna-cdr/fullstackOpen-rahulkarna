const baseUrl = '/api/login'

const login=async (newObj)=>{
    const response = await fetch(baseUrl,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newObj)
    })
    if(!response.ok){
        throw new Error("invalid user")
    }
    const data = await response.json()
    return data

}
export default { login}