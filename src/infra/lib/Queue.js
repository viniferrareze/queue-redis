import redisConfig from "../config/redis";
import RegistrationMail from '../jobs/RegistrationMail'
import Bull from "bull";
import AccountLogs from "../jobs/AccountLogs";

const jobs = [RegistrationMail, AccountLogs];

export default class Queue {
   constructor(){
      this.queues = {};

      this.init();
   }

   init(){
      jobs.forEach(({key, handle}) => {
         this.queues[key] = {
            bull: new Bull(key, redisConfig),
            name: key,
            handle,
          };
      });
   }

   add(name, data) { 
      return this.queues[name].bull?.add(data);
   }
  

   process() {
      jobs.forEach(job => {
         const { bull, handle } = this.queues[job.key];

         bull.on('fail', this.handleFailure).process(handle);
      });
   }

   handleFailure(name, error) {
      console.log(`Queue Job ${name}: FAILED `, error);
   }
}

export default new Queue();