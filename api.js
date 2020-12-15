var mongoose = require('mongoose'); 
var express = require('express');  
var router = express.Router(); 
var TaskModel = require('./taskschema'); 
const env = require('node-env-file'); // .env file
env(__dirname + '/.env');
  
// Connecting to database 
var query = 'mongodb+srv://'+process.env.DBMONGOUSER+':'+process.env.DBMONGOPASS+'@'+process.env.DBMONGOSERV+'/'+process.env.DBMONGO+'?retryWrites=true&w=majority'
console.log(query);
const db = (query); 
mongoose.Promise = global.Promise; 
  
mongoose.connect(db, { useNewUrlParser : true,  
useUnifiedTopology: true }, function(error) { 
    if (error) { 
        console.log("Error!" + error); 
    } 
}); 

router.get('/getTasks', function(req, res){
    TaskModel.find(function (err, data){
        if (err){
            console.log(err);
        }
        else{
            res.send(data);
            console.log(data);
        }
    });
});

router.get('/getTask', function(req, res){
    TaskModel.findOne({TaskId:req.body.Taskid},function (err, data){
        if (err){
            console.log(err);
        }
        else{
            console.log(data);
        }
    });
});

router.post('/CreateTask', function(req, res) {
    let task = {
    TaskId: req.body.TaskId, 
    Name: req.body.Name, 
    Deadline: req.body.Deadline
    };

    var newTask = new TaskModel(task);

    newTask.save(function(err, data) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Inserted");
        }
    });
});

router.post('/update', function(req, res) {
    TaskModel.findOneAndUpdate({TaskId: req.body.Taskid},{
    Name: req.body.nombre,
    DeadLine: req.body.fecha_limite
    }, function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            console.log("Updated");
        }
    });
});

router.delete('/delete', function(req, res) {
    TaskModel.deleteOne({TaskId:req.body.Taskid},
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            console.log("Deleted");
        }
    });
});
  
module.exports = router;