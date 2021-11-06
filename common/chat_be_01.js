const { IDB_My } = require('./IMongo');

function MyChat () {
    // const url = 'mongodb://127.0.0.1:27017';
    // const opt = { useUnifiedTopology: true };
    const db = new IDB_My('chat_db');
    const collUser = 'users';
    const collMsg = 'msgs';
    const loginUsers = [];

    function resOut (statusIn = 'Ok', dataIn = []) {
        return { status: statusIn, data: dataIn };
    }

    function msgDb (userId, msg) {
        return { userId: userId, msg: msg };// в _id будет время
    }

    function userDb (login, pass) {
        return { login: login, pass: pass };// в _id будет время и userId
    }

    function checkLogin (str) {
        return str.search(/^[а-яА-Яa-zA-Z0-9]{3,10}$/);
    }
    function checkPassw (str) {
        return str.search(/^[a-zA-Z0-9]{3,10}$/);
    }

    function getMsgsCollName () {
        const date = new Date();
        return collMsg + '_' + date.getMonth() + '_' + date.getFullYear();
    }

    // _id: fromDB, +idSess: xxx,  +lastPost: currtime
    function addLoggedUser (usr) {
        usr.idSess = uuidv4();
        usr.lastPost = Date.now();
        loginUsers.push(usr);
        return usr.idSess;
    }

    function uuidv4 () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function isLogin (idSession) { // возвр элемент массива или undefined
        return loginUsers.find((element, index, array) => element.idSession === idSession);
    };

    this.UserReg = async function (params) {
        const out = resOut();
        // if (checkLogin(params[0]) !== 0) throw ('Bad login');
        // if (checkPassw(params[1]) !== 0) throw ('Bad password');
        if (checkLogin(params[0]) !== 0) { out.status = 'Bad login'; return out; };
        if (checkPassw(params[1]) !== 0) { out.status = 'Bad password'; return out; }
        if (params[1] !== params[2]) { out.status = 'Bad confirm password'; return out; }

        const usr = userDb(params[0], params[1]);
        const find = await db.isExist(collUser, { login: { $eq: usr.login } });

        // console.log(`isExist? ${find}`);

        if (find !== null) { out.status = 'User existing'; return out; }

        const res = await db.create(collUser, usr);
        if (!res) out.status = 'Error while adding user';
        // else out.data.push(usr.login);
        // console.log(out.data[0]);
        return out;
    }

    this.UserLogin = async function (params) {
        // console.log('UserLogin start');

        const out = resOut();
        if (checkLogin(params[0]) !== 0) { out.status = 'Bad login'; return out; };
        if (checkPassw(params[1]) !== 0) { out.status = 'Bad password'; return out; }

        const usr = userDb(params[0], params[1]);
        const arrUsrs = await db.find(collUser, { login: { $eq: usr.login } });
        // console.log(`isExist? ${find}`);
        if (arrUsrs.length === 0) {
            out.status = 'User not find'; return out;
        } else {
            if (arrUsrs[0].pass !== usr.pass) {
                out.status = 'Bad password'; return out;
            }
        }
        const usrIdSess = addLoggedUser(usr);
        out.data.push(usrIdSess);

        return out; // []
    }

    this.AddMsg = async function (params) { // [0]sessId, [1]msg
        console.log('MyChat.AddMsg: ' + params);

        const out = resOut();
        const logUsr = isLogin(params[0]);
        if (logUsr !== undefined) {
            const mdb = msgDb(logUsr._id, params[1]);
            const collMsg = getMsgsCollName();
            const res = await db.create(collMsg, mdb);
            out.data.push(res);
        } else {
            out.status = 'Need login';
        }
        return out;
    }

    this.GetMsg = function (date, range, res) {
        const collName = getMsgsCollName();
        const arrData = db.find();
        return arrData;

        // const collName = 'msgData_' + date.getMonth();
        // MongoClient.connect(url, opt,
        //     function (err, gDB) {
        //         if (err) throw err;
        //         const dbo = gDB.db('MsgDb' + date.getFullYear());
        //         dbo.collection(collName, function (err, items) {
        //             if (err) throw err;
        //             // items.find({ _id: { $gte: date } }, { limit: (range * 24) + 1, sort: { _id: 1 } },
        //             items.find({ date: { $lt: date } }, { limit: range * 24, sort: { date: 1 } },
        //                 function (err, cursor) {
        //                     if (err) throw err;
        //                     cursor.toArray(function (err, itemArr) {
        //                         if (err) throw err;
        //                         // console.log('finding data: %d', itemArr.length);
        //                         res.json(itemArr);
        //                         gDB.close();
        //                     });
        //                     // displayWords("Words starting with a, b or c: ", cursor);
        //                 }
        //             );
        //         });
        //         // TODO: ????
        //         // setTimeout(function () {
        //         //     gDB.close();
        //         //     // console.log('db close');
        //         // }, 3000);
        //     });
    }
}

module.exports = MyChat;
