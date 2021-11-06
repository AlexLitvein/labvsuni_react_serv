const { MongoClient, ObjectID } = require('mongodb');

function IDB_My (dbName) {
    const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
    client.connect();
    const db = client.db(dbName);

    // this.create = async function (collName, data) {
    //     let out  = 0;
    //     try {
    //         // const coll = db.collection(collName);
    //         // const prom = await coll.insertOne(data);
    //         const prom = await db.collection(collName).insertOne(data);

    //         // console.log('IDB_My.create ' + prom);
    //         out = prom.insertedCount;
    //         console.log('IDB_My.create out: ' + out);
    //         // const time1 = new ObjectID(res.insertedId).getTimestamp();
    //     }
    //     catch (e) { // ????? попробывать во внешнем блоке
    //         // throw(e); // ?????
    //         console.log(e);
    //     }
    //     return out;  //
    // }

    this.create = async function (collName, data) {
        const prom = await db.collection(collName).insertOne(data);
        return prom.insertedCount;
    }

    this.isExist = async function (collName, req) {
            const p0 = await db.collection(collName).findOne(req, { returnKey: true }); // method returns the matched document, not a cursor
        return p0;
    }

    // this.isExist = async function (collName, req) { // opt - returnKey
    //     let out = false;
    //     try {
    //         const coll = db.collection(collName);
    //         const p0 = await coll.findOne(req, { returnKey: true }); // method returns the matched document, not a cursor
    //         p0.then(res => { if (res) out = true; });
    //     } catch (e) {
    //         console.log(e);
    //     }
    //     return out;
    // }

    this.find = async function (collName, req, opt) {
        try {
            const coll = db.collection(collName);
            const curs = await coll.find(req, opt);
            return curs.toArray();
        } catch (e) {
            console.log(e);
        }
    }
    // this.getLastNItems = async function (req, n) {

    //     db.students.find( { _id: { $lt: startValue } } )
    //                .sort( { _id: -1 } )
    //                .limit( n );
    //             //    .forEach( student => {
    //             //      print( student.name );
    //             //      endValue = student._id;
    //             //    } );

    //     return ;
    //   }

    this.delete = async function (collName, _id) {
        try {
            if (typeof _id !== 'object') _id = ObjectID(_id);
            return db.collection(collName).deleteOne({ _id }, { w: 1 });
        } catch (e) {
            console.log(e);
        }
    }

    this.close = function () {
        try {
            client.close();
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = { IDB_My };
// module.exports =  IDB_My;
