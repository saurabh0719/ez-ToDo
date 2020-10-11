'use strict'

const { ipcRenderer } = require('electron')

function deleteTodo(e) {
  ipcRenderer.send('delete-todo', e.target.textContent)
}

document.addEventListener('DOMContentLoaded', function () {
  const checkbox = document.querySelector('input[type="checkbox"]');
  const themeStylesheet = document.getElementById('theme');
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      themeStylesheet.href = 'dark-theme.css';
      console.log('Checked');
    } else {
      themeStylesheet.href = 'light-theme.css';
      console.log('Not checked');
    }
  });
});

/*document.addEventListener('DOMContentLoaded', () => {

  const themeStylesheet = document.getElementById('theme');
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
      // if it's light -> go dark
      if(themeStylesheet.href.includes('light')){
          themeStylesheet.href = 'dark-theme.css';
          themeToggle.innerText = 'Join the Light side';
      } else {
          // if it's dark -> go light
          themeStylesheet.href = 'light-theme.css';
          themeToggle.innerText = 'Join the Dark side';

      }
  })
})*/

document.getElementById('todoForm').addEventListener('submit', (evt) => {
  
  evt.preventDefault()
  const input = evt.target[0]
  ipcRenderer.send('add-todo', input.value)
  input.value = ''

})

// create add github window button
document.getElementById('showGithub').addEventListener('click', () => {
  ipcRenderer.send('github-window')
})

ipcRenderer.on('todos', (event, todos) => {
  
  const todoList = document.getElementById('todoList')

  // create html string
  const todoItems = todos.reduce((html, todo) => {
    html += `<li class="todo-item list-group-item" data-toggle="tooltip" data-placement="bottom" title="Click to delete task">${todo}</li>`

    return html
  }, '')

  todoList.innerHTML = todoItems
  todoList.querySelectorAll('.todo-item').forEach(item => {
    item.addEventListener('click', deleteTodo)
  })

})

ipcRenderer.on('todays-date', (event, todays_date) => {
  
  const today_date = document.getElementById('date_heading')
  today_date.innerHTML = `<i class="fa fa-calendar" aria-hidden="true"></i>  ` + todays_date

})

ipcRenderer.on('User-intro', (event, introduction) => {
  
  console.log(introduction)
  document.getElementById('introduction').innerHTML = introduction

})