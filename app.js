const form = document.getElementById('registroFormulario');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const tablaBody = document.getElementById('tablaBody');
let data = JSON.parse(localStorage.getItem('formData')) || [];



form.addEventListener('submit', function(event) {

     event.preventDefault(); 

    const name = nombreInput.value;
    const email = emailInput.value;

    if(name && email){
        const newData = {name, email};
        data.push(newData);
        saveDataToLocalStorage();
        renderTabla();
        form.reset(); 
    }else{
        alert('Todos los datos son obligatorios');
    }
})

function saveDataToLocalStorage() {
    localStorage.setItem('FormData', JSON.stringify(data));
}

function renderTabla() {
    
    tablaBody.innerHTML = '';

    data.forEach(function (item, index) {
        const row = document.createElement('tr'); // tr = table row
        const nameCell = document.createElement('td'); // td = tabla celda
        const emailCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        nameCell.textContent = item.name;
        emailCell.textContent = item.email;
        editButton.textContent = 'Editar';
        deleteButton.textContent = 'Borrar';

        editButton.classList.add("button", "button--secondary");
        deleteButton.classList.add("button", "button--tertiary");

        editButton.addEventListener('click',function(){
            editData(index);
        })
        deleteButton.addEventListener('click',function(){
            deleteData(index);
        })

        actionCell.appendChild(editButton); // agregar los botones a las celdas de acciones
        actionCell.appendChild(deleteButton);


        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(actionCell);

        tablaBody.appendChild(row);

    })
}

function editData(index){
    const item = data[index];
    nombreInput.value = item.name;
    emailInput.value = item.email;
    data.splice(index,1);
    saveDataToLocalStorage();
    renderTabla();
}

function deleteData(index){
    data.splice(index,1);
    saveDataToLocalStorage();
    renderTabla();
}

renderTabla();