class Account {

    constructor(id, balance) {
        this._id = id
        this._balance = balance;
    };

    getId () {
        return this._id;
    };

    getBalance () {
        return this._balance;
    };

    deposit (amount) {
        this._balance += amount;
    };

    withdraw (amount) {
        this._balance -= amount;
    };
};

module.exports = Account;