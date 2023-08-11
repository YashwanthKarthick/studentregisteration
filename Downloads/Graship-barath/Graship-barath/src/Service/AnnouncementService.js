import axios from "axios";

const ANNOUNCEMENT_ALL="http://localhost:8900/announce/all/desc"
const ADD_ANNOUNCE="http://localhost:8900/announce/add"

class AnnounceService{

    getAllAnnounce(){
        return axios.get(ANNOUNCEMENT_ALL);
    }
    createAnnounce(Announce){
        return axios.post(ADD_ANNOUNCE,Announce);
    }
    updateAnnounce(id,announce){
        return axios.put("http://localhost:8900/announce/"+id,announce)
    }

    deleteAnnounce(id) {
        return axios.delete("http://localhost:8900/announce/"+id);
    }
}

export default new AnnounceService();