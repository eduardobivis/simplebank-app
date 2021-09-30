const model = require('./model')

exports.reset = function (res) {
    model.reset();
    res.status(200).send('OK');
}

exports.balance = function (req, res) {
    const account = model.getAccountById(req.query.account_id);
    if (account) {
        return res.status(200).json({
            destination: { 
                id: account.getId(), 
                balance: account.getBalance() 
            }
        });
    }
    else {
        return res.status(404).json(0); 
    };
};

exports.event = function (req,res) {

    const event_type = req.body.type;
    let account, amount, origin, destination;
    const returnData = [];

    switch (event_type) {

        case 'deposit':
            ({ destination, amount } = req.body);
            account = deposit(destination, amount);
            returnData['content'] = { 
                destination: { 
                    id: account.getId(), 
                    balance: account.getBalance() 
                }
            };
            break;

        case 'withdraw':
            ({ origin, amount } = req.body);
            account = withdraw(origin, amount);

            if (account) {
                returnData['content'] = {
                    destination: { 
                        id: account.getId(), 
                        balance: account.getBalance() 
                    }
                };
            };
            break;

        case 'transfer':
            ({ origin, destination, amount } = req.body);
            let accounts = transfer(origin, destination, amount);

            if (accounts) {
                let [ accountOrigin, accountDestination ] = accounts;

                returnData['content'] = {
                    origin: { 
                        id: accountOrigin.getId(), 
                        balance: accountOrigin.getBalance() 
                    },
                    destination: { 
                        id: accountDestination.getId(), 
                        balance: accountDestination.getBalance() 
                    }
                };
            };
            break;   
    }
    if( returnData['content'] ) {
        return res.status(201).json( returnData['content'] );
    }
    else{
        return res.status(404).json(0); 
    }
};

function deposit( id, balance ){

    let account = model.getAccountById(id);

    if(!account) {
        account = model.createAccount(id, balance);
    }
    else { 
        account.deposit(balance);
    }

    return account;
};

function withdraw( id, balance ){

    let account = model.getAccountById(id);

    if( !account ) return false;

    account.withdraw(balance);
    return account;
};

function transfer(origin_id, destination_id, balance) {

    let accountOrigin = model.getAccountById(origin_id);

    if( !accountOrigin ) return false;

    withdraw( origin_id, balance );
    let accountDestination = deposit(destination_id, balance);
    return [ accountOrigin, accountDestination ];
};