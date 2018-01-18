const Mongoose = require('mongoose');
const Glob = require('glob');
const config = require('./config.json');

// Initializer
module.exports = function() {
  Mongoose.connect(config.database.uri, config.database.options)
  
  this.db = Mongoose.connection
  this.db.once('open', () => {
    
  })
}


// class DatabaseManager {

//     private conn;
//     private models: Array<Object>;
//     private Schema;
//     constructor(private uri: string){
//         Mongoose.Promise = global.Promise;
//         Mongoose.connect(uri);

//         this.Schema = Mongoose.Schema;
//         this.conn = Mongoose.connection;

//         this.conn.on('error', console.error.bind(console, 'Connection Error: '));

//         this.conn.once('open', () => {
//             console.log('Database Connected');
//         });
//     }

//     /**
//      * loadModels
//      */
//     public loadModels() {
//         Glob('models/**.ts', {}, (err, files) => {
//             if(err) return Promise.reject(err);

//             files.forEach(file => {
//                 let modelClass = require(file);
                
//                 let modelObj = new modelClass(this.Schema, Mongoose);                
//                 //Sync model into database
//                 this.models.push(modelObj);
//             });

//             return Promise.resolve();
//         })
//     }
// }

// module.exports = DatabaseManager;