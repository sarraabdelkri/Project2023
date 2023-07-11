import API from "./api";

const contractService = {
    getAllJobs: () => {
        return API.get("/job/getalljobs");
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


    deleteContract: (id) => {
        return API.delete(`/contract/contracts/${id}`);
    },
    // addContract: (startDate, endDate, type, user, job) => {
    //     const userId = user ? user.id : null;
    //     const jobId = job ? job.id : null;
    //     if (userId === null || jobId === null) {
    //       return Promise.reject(new Error('User or job is undefined or missing an ID property'));
    //     }
    //     return API.post(`/contract/contracts/${userId}/${jobId}`, {
    //         startDate,
    //         endDate,
    //         type,
    //         user,
    //         job
    //     });
    //   },
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
        return API.put(`/contract/contracts/${id}/status`,{
            contractstatus  
        });
    },
   
}

export default contractService;