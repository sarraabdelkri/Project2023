

import API from "./api";

const atelierService = {
getAllAtelier: () => {
    return API.get("/atelier/getallarticle");
},
}
export default atelierService;