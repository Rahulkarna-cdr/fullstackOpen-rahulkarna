import axios from "axios";
const baseUrl = "/api/blogs";
const baseUrlLogin = "/api/login";


//extracting token to authenticate user
const loggedUserJSON = localStorage.getItem("loggedUser");
let token = null;

if (loggedUserJSON) {
  const user = JSON.parse(loggedUserJSON);
  token = user.token; 
}

const getAll = async () => {
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    if(response.ok){
    const data = await response.json();
    return data;
    }
    else{
      console.log("server returned some errors", response.status)
    }
  } catch (error) {
    console.error("error fetching data");
  }
};

// const login = async (newObject) => {
//   const request = await axios.post(baseUrlLogin, newObject);
//   return request.data;
// };
export default { getAll };
