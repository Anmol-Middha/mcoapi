//execution file of the server
const app = require('../server.js')

app.listen(process.env.PORT || 8080, (err)=>{
    if(err) throw err;
    console.log("running on port 8080");
});