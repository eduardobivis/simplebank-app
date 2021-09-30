const Account = require('./Account')
const accounts = [];

exports.createAccount = function (id, deposit) {
    const account = new Account(id, deposit);
    accounts.push(account);
    return account;
};

exports.getAccountById = function (id) {
    return accounts.find( account => {
        return account.getId() === id;
    });
};

exports.reset = function () {
    accounts.length = 0;
}
