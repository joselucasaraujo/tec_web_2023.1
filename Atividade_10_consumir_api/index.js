
let users

async function getUsers() {
    await fetch("https://reqres.in/api/users")
        .then(async (res) => {
            const retorno = await res.json();
            users = retorno.data
            renderizarTabela();
        })
        .catch((err) => {
            console.error("Erro na requisição", err);
        })
}
async function postUser(newUser) {
    await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    })        
    .then(async (res) => {
        const newUserApi = await res.json();        
        users.push(newUserApi);
        console.log("User Added:", newUserApi);
        renderizarTabela();
        $('#modalAdiciona').modal('hide');
        
        const row = document.getElementById('aviso');
        row.innerHTML = `
        <div class="alert alert-success alert-dismissible mt-2 fade show" role="alert">
            <strong>Usuário adicionado com sucesso</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">X</button>
        </div>
        `;
    })
    .catch((err) => {
        console.error("Erro na requisição", err);
    })
}

async function editUser(data, id) {
    await fetch(`https://reqres.in/api/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(async (res) => {
        const userUpdatedApi = await res.json();
        
        console.log("User Updated:", userUpdatedApi);
        const user = users.find(item => item.id === id);

        if (user) {
            user.first_name = userUpdatedApi.first_name;
            user.last_name = userUpdatedApi.last_name;
            user.email = userUpdatedApi.email;
            renderizarTabela();
            $('#modalEdicao').modal('hide');
        }
        const row = document.getElementById('aviso');
        row.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Usuário editado com sucesso!</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">X</button>
        </div>
        `;

        tabela.appendChild(row);
    })
    .catch((err) => {
        console.error("Erro na requisição", err);
    })
}

async function deleteUser(id) {
    await fetch(`https://reqres.in/api/users/${id}`)
        .then(async (res) => {
            const retorno = res.status
            if (!retorno === 204) {
                console.error("Erro ao deletar:", err);
            }

            const index = users.findIndex(item => item.id === id);

            if (index !== -1) {
                users.splice(index, 1);
                renderizarTabela();
            }
        })
        .catch((err) => {
            console.error("Erro na requisição: ", err);
        })
}

function renderizarTabela() {
    const tabela = document.getElementById('tabela');
    tabela.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.email}</td>
            <td><img src="${user.avatar}"></td>
            <td>
                <button class="btn btn-sm btn-info" onclick="editaUsuario(${user.id})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deletaUsuario(${user.id})">Deletar</button>
            </td>
        `;

        tabela.appendChild(row);
    });
}

function adicionaUsuario() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');

    const first_name = firstNameInput.value.trim();
    const last_name = lastNameInput.value.trim();
    const email = emailInput.value.trim();

    if (first_name && last_name && email) {

        const id = getMaxValue() + 1;
        const newUser = {id, first_name, last_name, email};
        
        postUser(newUser)
        
        firstNameInput.value = '';
        lastNameInput.value = '';
        emailInput.value = '';

    }
}

function editaUsuario(id) {
    const user = users.find(item => item.id === id);

    if (user) {
        const editIdInput = document.getElementById('editId');
        const editFirstNameInput = document.getElementById('editFirstName');
        const editLastNameInput = document.getElementById('editLastName');
        const editEmailInput = document.getElementById('editEmail');

        editIdInput.value = user.id;
        editFirstNameInput.value = user.first_name;
        editLastNameInput.value = user.last_name;
        editEmailInput.value = user.email;

        $('#modalEdicao').modal('show');
    }
}

function salvarAlteracoes() {
    const editIdInput = document.getElementById('editId');
    const editFirstNameInput = document.getElementById('editFirstName');
    const editLastNameInput = document.getElementById('editLastName');
    const editEmailInput = document.getElementById('editEmail');

    const id = parseInt(editIdInput.value);
    const first_name = editFirstNameInput.value.trim();
    const last_name = editLastNameInput.value.trim();
    const email = editEmailInput.value.trim();

    if (first_name && last_name && email) {
        
        const dataUser = {first_name, last_name, email};

        editUser(dataUser, id)
        
        editFirstNameInput.value = '';
        editLastNameInput.value = '';
        editEmailInput.value = '';
    }
}

function getMaxValue() {
    let maxValue = -1;
  
    for (let i = 0; i < users.length; i++) {
      const value = users[i]["id"];
  
      if (value > maxValue) {
        maxValue = value;
      }
    }
  
    return maxValue;
  }

function deletaUsuario(id) {
    deleteUser(id)
}

getUsers()

document.getElementById('formAdiciona').addEventListener('submit', function (e) {
    e.preventDefault();
    adicionaUsuario();
});

document.getElementById('formEdicao').addEventListener('submit', function (e) {
    e.preventDefault();
    salvarAlteracoes();
});
