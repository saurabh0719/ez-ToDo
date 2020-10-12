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
}





