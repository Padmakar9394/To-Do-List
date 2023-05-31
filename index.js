const itemsList = document.querySelector('.items-list');
const addBtn = document.querySelector('.btn');
const inpt = document.querySelector('.todoTitle');
let globalStore = [];

const generateToDo = (todoData) => 
 `<div class="items">
    <h3>${todoData.title}</h3>
    <div class="utility">
       <h4 class="edit" id=${todoData.id}  onclick="editToDo.apply(this, arguments)">edit</h4>
       <button class="delete"><i class="fa-solid fa-trash" id=${todoData.id}  onclick="deleteToDo.apply(this, arguments)"></i></button>
    </div>
 </div>`;

 const loadInitialToDos= () => {
    //localstorage to get tasky card data
  const getToDoData = localStorage.getItem("toDo");

    //covert to normal object
  const {todo} = JSON.parse(getToDoData);

//loop over those array of task obejct to create HTML card , inject it to DOM
    todo.map((todo) => {
    itemsList.insertAdjacentHTML("beforeend", generateToDo(todo));
  
    //update our globalStore
    globalStore.push(todo);
  })
  };

  let editID;

const addToDo = () => {
    const todoData = {
        id: `${Date.now()}`,
        title: document.querySelector('.todoTitle').value,
    };

    if(addBtn.innerHTML === 'Edit') {
        let toDoData = localStorage.getItem("toDo");

        //covert to normal object
        let todos = JSON.parse(toDoData).todo;

        for(let todo of todos) {
            if(todo.id == editID) {
                todo.title = document.querySelector('.todoTitle').value;
            }
        }
        globalStore = todos;
        
        localStorage.setItem('toDo', JSON.stringify({todo: globalStore}));

        document.querySelector('.todoTitle').value = "";
        addBtn.innerHTML = 'Add';
        location.replace(location.href);
    }
    else {
        itemsList.insertAdjacentHTML('beforeend', generateToDo(todoData));

        globalStore.push(todoData);

        localStorage.setItem('toDo', JSON.stringify({todo: globalStore}));

        // console.log(todoData);
        document.querySelector('.todoTitle').value = "";

        generateToDo(todoData);
    }
}

const deleteToDo = () => {
    let e = window.event;
    const targetID = e.target.id;
    const tagname = e.target.tagName;
    console.log(tagname);

    globalStore = globalStore.filter((toDo) => toDo.id !== targetID);
    localStorage.setItem('toDo', JSON.stringify({todo: globalStore}));

    if(tagname === "I") {
        return itemsList.removeChild(e.target.parentNode.parentNode.parentNode);
    }
};

const editToDo = () => {
    let e = window.event;
    const targetID = e.target.id;
    const tagname = e.target.tagName;
    // console.log(e.target.parentNode.parentNode.childNodes[1]);
    document.querySelector('.todoTitle').value = e.target.parentNode.parentNode.childNodes[1].innerHTML;
    addBtn.innerHTML = "Edit";
    editID = targetID;
    inpt.focus();
}
