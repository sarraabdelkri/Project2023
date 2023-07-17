import API from "./api";

const contractService = {
    getAllJobs: () => {
        return API.get("/job/getalljobs");
    },
    getallapplications: () => {
        return API.get("/application/getAll");
    },
    getAllContracts: () => {
        return API.get("/contract/getAllContracts");
    },
    
    getuserbyid: (id) => {
        return API.get(`/user/getUser/${id}`);
    },
    getjobbyid: (id) => {
        return API.get(`/job/${id}`);
    },
getContractByidemployer: (employerId) => {
        return API.get(`/contract/employer/${employerId}`);
    
    },

    deleteContract: (id) => {
        return API.delete(`/contract/contracts/${id}`);
    },
  
     addContract : async (startDate, endDate, type, userId, jobId) => {
        try {
            const user = await API.get(`/user/getUser/${userId}`);
            const job = await API.get(`/job/${jobId}`);
         
          const newContract = {
            startDate: startDate,
            endDate: endDate,
            type: type, 
            user: user.data,
            job: job.data
          };
          console.log("userrrrrrr",user);
        console.log("jbosssss",job);
          const savedContract = await API.post(`/contracts/${userId}/${jobId}`, newContract);
          return savedContract.data;
        } catch (error) {
          throw new Error(error.message,"eeeeeeeeeee");
        }   
        },
      
      
    updateContract:(id,contractstatus)=>{
        return API.put(`/contract/contracts/${id}`,{
            contractstatus  
        });
    },
    getcontractById: (id) => {
        return API.get(`/contract/${id}`);
      },
   
}

export default contractService;