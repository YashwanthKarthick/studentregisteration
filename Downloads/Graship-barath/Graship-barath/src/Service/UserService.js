import axios from "axios";

const USER_URL="http://localhost:8900/user/add";
const ADD_USER_URL="http://localhost:8900/user/all"
const DELETE_URL=`http://localhost:8900/user`
const UPDATE_URL=`http://localhost:8900/user`

class UserService {

    createUser(user) {
      return axios.post(USER_URL, user);
    }

    getAllUsers(){
      return axios.get(ADD_USER_URL);
    }
    updateUser(user,id){
      return axios.put(UPDATE_URL + "/" + id,user)
    }
    deleteUser(id){
      return axios.delete(DELETE_URL+"/"+id);
    }
  
  }
  

export default new UserService;