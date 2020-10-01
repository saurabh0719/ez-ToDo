'use strict'

const path = require('path')
const { app, ipcMain } = require('electron')
const { BrowserWindow } = require('electron')
const Window = require('./Window')
const DataStore = require('./DataStore')

const os = require ('os');

const username = os.userInfo ().username;

// create a new todo store name "Todos Main"
const todosData = new DataStore({ name: 'Todos Main' })

function main () {
  // todo list window
  let mainWindow = new Window({
    file: path.join('renderer', 'index.html')
  })

  // add todo window
  //let addTodoWin

  var todays_date = new Date(Date.now()).toLocaleDateString(
    'en-gb',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  )

  function getIntroduction()
  {
    var username = os.userInfo ().username
    //console.log(username)
    var todo_len = todosData.sumTodos
    //console.log(todo_len)
    var result = "Hi " + username + ", you have " + todo_len + " tasks listed"
    //console.log(introduction)
    return result
  }
  // TODO: put these events into their own file

  // initialize with todos
  mainWindow.once('show', () => {
    mainWindow.webContents.send('todos', todosData.todos)
    mainWindow.webContents.send('todays-date', todays_date)
    var introduction = getIntroduction()
    mainWindow.webContents.send('User-intro', introduction)
  })
/*
  let githubwin

  ipcMain.on('github-window', () => {
    // if githubwin does not already exist
    if (!githubwin) {
      // create a new add todo window
      githubwin = new Window({
        file: path.join('renderer', 'https://github.com/saurabh0719/ez-ToDo'),
        width: 400,
        height: 400,
        // close with the main window
        parent: mainWindow
      })

      githubwin.maximize()

      // cleanup
      githubwin.on('closed', () => {
        githubwin = null
      })
    }
  })

 */ 

 let githubwin

ipcMain.on('github-window', () => {
  // if githubwin does not already exist
  if (!githubwin) {
    // create a new add todo window
    githubwin = new BrowserWindow({ width: 800, height: 1500 })
    githubwin.loadURL('https://github.com/saurabh0719/ez-ToDo')
    githubwin.maximize()

    // cleanup
    githubwin.on('closed', () => {
      githubwin = null
    })
  }
})





  // add-todo from add todo window
  ipcMain.on('add-todo', (event, todo) => {

    const updatedTodos = todosData.addTodo(todo).todos
    mainWindow.send('todos', updatedTodos)
    mainWindow.webContents.send('todays-date', todays_date)
    var introduction = getIntroduction()
    mainWindow.webContents.send('User-intro', introduction)

  })

  // delete-todo from todo list window
  ipcMain.on('delete-todo', (event, todo) => {

    const updatedTodos = todosData.deleteTodo(todo).todos
    mainWindow.send('todos', updatedTodos)
    mainWindow.webContents.send('todays-date', todays_date)
    var introduction = getIntroduction()
    mainWindow.webContents.send('User-intro', introduction)

  })

}

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})