import * as Mongoose from 'mongoose';
import * as Glob from 'glob';


class DatabaseManager {

    private conn;
    private models: Array<Object>;
    private Schema;
    constructor(private uri: string){
        Mongoose.Promise = global.Promise;
        Mongoose.connect(uri);

        this.Schema = Mongoose.Schema;
        this.conn = Mongoose.connection;

        this.conn.on('error', console.error.bind(console, 'Connection Error: '));

        this.conn.once('open', () => {
            console.log('Database Connected');
        });
    }

    /**
     * loadModels
     */
    public loadModels() {
        Glob('models/**.ts', {}, (err, files) => {
            if(err) return Promise.reject(err);

            files.forEach(file => {
                let modelClass = require(file);
                
                let modelObj = new modelClass(this.Schema, Mongoose);                
                //Sync model into database
                this.models.push(modelObj);
            });

            return Promise.resolve();
        })
    }
}

module.exports = DatabaseManager;