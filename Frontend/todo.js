const todoInput = document.querySelector('#todoInput');
const todoform = document.querySelector('#todoform');
const todoList = document.querySelector('#todoList');

todoform.addEventListener("submit", submitTodo);

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await axios.get('http://localhost:3000/todo/get-todo');
        console.log('res = ' + JSON.stringify(res));
        for (let i = 0; i < res.data.allData.length; i++) {
            printData(res.data.allData[i]);
        }
    } catch (err) {
        console.error('Error:', err);
    }
});

function deleteAll() {
    console.log("inside deleteAll");

    const checkboxes = document.querySelectorAll('#todoList input[type="checkbox"]:checked');
    console.log("checkboxes = " + JSON.stringify(checkboxes));
    if (checkboxes.length == 0) {
        alert("No items selected to delete.");
        return
    }
    const value = confirm('Do you want to delete the selected items?');
    if (!value) return;

    checkboxes.forEach(async (checkbox) => {
        const id = checkbox.id;
        console.log(" id = " + id);

        try {
            let res = await axios.delete(`http://localhost:3000/todo/delete-todo/${id}`);
            console.log("re = " + JSON.stringify(res));
            console.log('message = ' + res.data.message);

            // Remove the parent <li> element from the DOM
            let parentEle = checkbox.parentElement;
            todoList.removeChild(parentEle);
        }
        catch (err) {
            console.log(err);
        }
    });

}

function printData(data) {
    console.log("inside printData");
    console.log(" id = " + data.id);

    //add it to the list 
    let li = document.createElement('li');
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.id = `${data.id}`;
    li.appendChild(checkbox);

    li.appendChild(document.createTextNode(`${data.name}`));
    //to delete the records
    let delbtn = document.createElement('input');
    delbtn.setAttribute('type', 'button');
    delbtn.setAttribute('value', 'Delete Todo');
    delbtn.id = data.id;
    delbtn.addEventListener("click", () => deleteTodo(data.id));
    li.appendChild(delbtn);

    //to edit data
    const editBtn = document.createElement('input');
    editBtn.setAttribute('type', 'button');
    editBtn.setAttribute('value', 'Edit Todo');
    editBtn.id = data.id;
    editBtn.addEventListener("click", () => editTodo(data.id));
    li.appendChild(editBtn);

    todoList.appendChild(li);
}

async function submitTodo(e) {
    e.preventDefault();
    console.log("todo = " + todoInput.value);
    if (todoInput.value === "" || todoInput.value == undefined) {
        console.log("no input from user");
    } else {
        try {
            let obj = {
                todoname: todoInput.value,
            };
            const res = await axios.post(`http://localhost:3000/todo/add-todo`, obj);
            // console.log('res = ' + JSON.stringify(res));
            console.log('todo name = ' + res.data.newTodoData.name);

            let li = document.createElement('li');
            //checkbox 
            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.id = `${res.data.newTodoData.id}`;
            li.appendChild(checkbox);
            //add it to the list 
            li.appendChild(document.createTextNode(`${res.data.newTodoData.name}`));
            //to delete the records
            let delbtn = document.createElement('input');
            delbtn.setAttribute('type', 'button');
            delbtn.setAttribute('value', 'Delete Todo');
            delbtn.id = res.data.newTodoData.id;
            delbtn.addEventListener("click", () => deleteTodo(res.data.newTodoData.id));
            li.appendChild(delbtn);
            //to edit data
            const editBtn = document.createElement('input');
            editBtn.setAttribute('type', 'button');
            editBtn.setAttribute('value', 'Edit Todo');
            editBtn.id = res.data.newTodoData.id;
            editBtn.addEventListener("click", () => editTodo(res.data.newTodoData.id));
            li.appendChild(editBtn);
            todoList.appendChild(li);
        }
        catch (err) {
            console.log(err);
        }
    }
    todoInput.value = "";
}

async function deleteTodo(id) {
    console.log("inside deleteTod = " + id)
    try {
        if (id != null || id != "") {
            const value = confirm('Do you want to delete item ?');
            if (value) {
                let res = await axios.delete(`http://localhost:3000/todo/delete-todo/${id}`);
                console.log('message = ' + res.data.message);
                let parentEle = document.getElementById(id).parentElement;
                todoList.removeChild(parentEle);
            }
        }
    } catch (err) {
        console.log(err);
    }
}//deleteTodo


async function editTodo(id) {
    console.log("inside editTodo = " + id);
    try {
        const res = await axios.get(`http://localhost:3000/todo/get-todo/${id}`);
        // console.log('res  = ' + JSON.stringify(res));
        console.log('res name = ' + res.data.particularTodoData.name);
        let oldTodoName = res.data.particularTodoData.name;

        if (!oldTodoName) {
            console.log("oldTodoName is is epmty");
        } else {
            todoInput.value = oldTodoName;
            //remove from the frontend
            let parentEle = document.getElementById(id).parentElement;
            todoList.removeChild(parentEle);
        }

    }
    catch (err) {
        console.log(err);
    }
}//editTodo