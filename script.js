const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
let editTodo = null;

//function to add todo
const addtodo = () => {
  let inputText = inputBox.value.trim();
  
  if(inputText.length <= 0){
    alert("you must write something in your todo")
    
    return false;
  }
  if(addBtn.value === "Edit"){
    editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
     editTodo.target.previousElementSibling.innerHTML = inputText;
    addBtn.value = "Add"
    inputBox.value = "";
  }
  else{
    //creating p tag
    const p = document.createElement('p');
   const li = document.createElement('li');
   p.innerHTML = inputText;
   li.appendChild(p);
   //creating editBtn tag
   const editBtn = document.createElement('button');
   editBtn.innerText = "Edit";
   editBtn.classList.add('btn','editBtn')
   li.appendChild(editBtn);
   //creating deleteBtn tag
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = "Remove";
   deleteBtn.classList.add('btn','deleteBtn')
   li.appendChild(deleteBtn);
   
   todoList.appendChild(li);
   inputBox.value = "";
  saveLocalTodos(inputText);
  }
};
 
 //function to update todo
 const updateTodo = (e) => {
   if(e.target.innerHTML === "Remove"){
     todoList.removeChild(e.target.parentElement);
     deleteLocalTodos(e.target.parentElement)
   }
   if(e.target.innerHTML === "Edit"){
     inputBox.value = e.target.previousElementSibling.innerHTML;
     inputBox.focus();
     addBtn.value = "Edit"
     editTodo = e;
   }
 };
 
 //function to saveLocalTodos
 const saveLocalTodos = (todo) => {
   let todos;
   if(localStorage.getItem("todos") === null){
     todos = []
   }
   else{
    todos = JSON.parse(localStorage.getItem("todos"))
   }
   todos.push(todo)
   localStorage.setItem("todos",JSON.stringify(todos))
 }
 //function to getlocaltodo
 const getlocaltodo = () => {
    let todos;
   if(localStorage.getItem("todos") === null){
     todos = []
   }
   else{
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach(todo => {
          //creating p tag
    const p = document.createElement('p');
   const li = document.createElement('li');
    p.innerHTML = todo;
   li.appendChild(p);
   //creating editBtn tag
   const editBtn = document.createElement('button');
   editBtn.innerText = "Edit";
   editBtn.classList.add('btn','editBtn');
   li.appendChild(editBtn);
   //creating deleteBtn tag
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = "Remove";
   deleteBtn.classList.add('btn','deleteBtn')
   li.appendChild(deleteBtn);
   todoList.appendChild(li);
    });
   }
 }
//function to deleteLocalTodos
const deleteLocalTodos = (todo) => {
  let todos;
   if(localStorage.getItem("todos") === null){
     todos = []
   }
   else{
    todos = JSON.parse(localStorage.getItem("todos"))
   }
   let todoText = todo.children[0].innerHTML;
   let todoIndex = todos.indexOf(todoText);
   todos.splice(todoIndex, 1);
   localStorage.setItem("todos", JSON.stringify(todos))
   console.log(todoIndex);
} 
const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}
addBtn.addEventListener('click',addtodo);
todoList.addEventListener('click',updateTodo)
document.addEventListener('DOMContentLoaded',getlocaltodo)