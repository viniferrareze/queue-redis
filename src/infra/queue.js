import "dotenv/config";
import "./database";
import Queue from "./lib/Queue";
//import RegistrationMail from "./jobs/RegistrationMail";

Queue.process();
// Queue.process(RegistrationMail.handle);
console.log('Server Queue running...');