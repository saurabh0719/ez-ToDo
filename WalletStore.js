const store = require('electron-store')


class WalletStore extends store{
    constructor(settings){
        super(settings)
        this.transactions = this.get('transactions') || []
    }
    saveTransactions(){
        this.set('transactions', this.transactions)
        return this
    }
    getTransactions(){
        this.transactions = this.get('transactions') || []
        return this
    }
    addTransaction(transaction){
        this.transactions = [...this.transactions, transaction]
        return this.saveTransactions()
    }
    deleteTransaction(transaction){
        this.transactions = this.transactions.filter(t => t !== transaction)
        return this.saveTransactions()
    }
    get numberOfTransactions(){
        this.transactions = this.get('transactions') || []
        return this.transactions.length
    }

    
    get sortOrder(transactions,sortBy,sortingOrder,){
        if(sortingOrder){
        transactions.sort(function(a,b)
        {
            let x = a[sortBy];
            let y = b[sortBy];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)
        });
    }
    else
    {
        transactions.sort(function(a,b)
        {
            let x = a[sortBy];
            let y = b[sortBy];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0)
        });
    }

        
    }

}





