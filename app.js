// make sure that all the DOM elements are loaded
document.addEventListener('DOMContentLoaded', onDOMLoaded)

// declare handlers for DOM elements
let content;
let todos;
let input;

function onDOMLoaded() {

  // assign elements from the DOM to variables
  content = document.getElementById('todos')
  input = document.getElementById('input')

  // an array to keep track of our todos
  todos = []


  loadDB()

  // add a new todo to the database every time the user hits enter
  input.addEventListener('keyup', (event)=>{
    if (event.key === 'Enter') {
      todos.push({
        text: input.value,
        status: 'UNCHECKED'
      })

      localStorage.setItem('db', JSON.stringify(todos))



      // always update the UI with new data
      updateUI(todos)
    }
  })

  // always render something to the user
  updateUI(todos);

}


function loadDB() {
  todos = JSON.parse(localStorage.getItem('db'))
}

// remove an element then update the UI
function removeItem(list, id) {
  list.splice(id, 1)
  localStorage.setItem('db', JSON.stringify(list))
  updateUI(list)
}



function updateUI(todos) {
  // loop through all items in the database
  // map every item with the template
  // flat the generated array of html into one big html string
  let html = todos.map((todo, i) => {
    return `
    <div class="todo">
      <div class="text ${todo.status === 'CHECKED' ? 'checked' : 'unchecked'}">${todo.text}</div>
      <button id="${i}" class="remove">
        <img width="20px" src="${require('./assets/remove.svg')}" alt="">
      </button>
    </div>
  `
  }).join('\n')

  content.innerHTML = html;


  // select all the buttons with class name of REMOVE
  let buttons = document.getElementsByClassName('remove')

  // loop through all buttons and add click event to it
  for (let index = 0; index < buttons.length; index++) {

    buttons[index].addEventListener('click', (event)=>{
      removeItem(todos, event.target.id)
    })    

  }



}



