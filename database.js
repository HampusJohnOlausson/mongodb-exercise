const mongodb = require('mongodb');

async function connect(exercise) {
    try {
        const url = "mongodb://localhost:27017/excercise";
        const options = { useUnifiedTopology: true };
        console.log('connection to database has been established');
        const client = await mongodb.connect(url, options);
        await client.db(exercise);
        console.log( 'database has been selected');
        return db;
    } catch (error) {
        console.error(error);
    }
}

function createCollection(collection){

}

//beginning of our program
async function run(){
    const db = connectToDatabase();
}

connect();