import axios from 'axios';
 
const service = axios.create({
  baseURL: '/api'
  
});
 
const errorHandler = err => {
  
  throw err;
};
 
export default {
  service,
 
  handleUpload(theFile) {
    
    return service
      .post('/upload', theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },
 
  saveNewThing(newThing) {
    
    return service
      .post('/things/create', newThing)
      .then(res => res.data)
      .catch(errorHandler);
  }
};