
class VisiterCounter {
    constructor () {
        // this.canadianDollar  =  canadianDollar;
        this.count = 0;
    }

    increment () {
        this.count++;
    }

    GetCount () {
        return this.count;
    }

    Reset () {
        this.count = 0;
    }

    GetName () {
        return 'VisiterCounter';
    }
}

 module.exports = { VisiterCounter };
