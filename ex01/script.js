const lista = document.getElementById("lista");
const inputDescricao = document.getElementById("inputDescricao");
const btAdicionar = document.getElementById("btAdicionar");

const taskUrl = "https://parseapi.back4app.com/classes/Task";
const headers = {
    "X-Parse-Application-Id": "ILMMPuMqcPdoANVdIwOpwYPzTzV4k2QyDgQSXTd1",
    "X-Parse-REST-API-Key": "7Hhhe1QlLBF45qwPfhRxnW5gjfLOdiSHH0SgSVdO",
};

const renderLista = (lista, tarefas) => {
    lista.innerHTML = "";
    tarefas.forEach((tarefa) => {
        const itemText = document.createTextNode(
            `${tarefa.description}`
        );

        const btnUpdate = document.createElement("input");
        btnUpdate.type = "checkbox";
        btnUpdate.checked = tarefa.done;
        btnUpdate.onclick = () => updateTask(tarefa);

        const btnDelete = document.createElement("button");
        btnDelete.innerHTML = "X";
        btnDelete.onclick = () => deleteTask(tarefa.objectId);

        const listItem = document.createElement("li");
        
        if (tarefa.done) {
            listItem.classList.add("done");
        }

        listItem.appendChild(btnUpdate);
        listItem.appendChild(itemText);
        listItem.appendChild(btnDelete);
        lista.appendChild(listItem);
    });
};

const getTasks = () => {
    fetch(taskUrl, { headers: headers })
    .then((res) => res.json())
    .then((data) => {
        renderLista(lista, data.results);
});
};

const handlebtAdicionarClick = () => {
    const description = inputDescricao.value;
    if (!description) {
        alert("Insira uma descrição");
        return;
    }

    fetch(taskUrl, { 
        method: "POST",
        headers: {...headers,
        "Content-Type": "application/json",
    },
        body: JSON.stringify({description: description})
    })
    .then((res) => res.json())
    .then((data) => {
        getTasks();
        inputDescricao.value = "";
        console.log('data', data)
})
    .catch((err) => console.log(err));
};

const deleteTask = (id) => {
    fetch(`${taskUrl}/${id}`, { 
        method: "DELETE",
        headers: headers,
    })
    .then((res) => res.json())
    .then((data) => {
        getTasks();
        console.log('data', data)
})
    .catch((err) => console.log(err));
}

const updateTask = (task) => {
    fetch(`${taskUrl}/${task.objectId}`, {
        method: "PUT",
        headers: {...headers,
        "Content-Type": "application/json",
    },
        body: JSON.stringify({done: !task.done})
    })
    .then((res) => res.json())
    .then((data) => {
        getTasks();
        console.log('data', data)
})
}

getTasks();

btAdicionar.onclick = handlebtAdicionarClick;