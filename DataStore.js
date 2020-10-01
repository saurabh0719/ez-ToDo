const store = require('electron-store')

class DataStore extends store{
    constructor(settings){
        super(settings)
        this.todos = this.get('todos') || []
    }
    saveTodos(){
        this.set('todos', this.todos)
        return this
    }
    getTodos(){
        this.todos = this.get('todos') || []
        return this
    }
    addTodo(todo){
        this.todos = [...this.todos, todo]
        return this.saveTodos()
    }
    deleteTodo(todo){
        this.todos = this.todos.filter(t => t !== todo)
        return this.saveTodos()
    }
    get sumTodos(){
        this.todos = this.get('todos') || []
        return this.todos.length
    }
}

module.exports = DataStore