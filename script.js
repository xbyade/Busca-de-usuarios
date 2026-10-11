const botao = document.querySelector("#botao");
const usuarios = document.querySelector("#usuarios");
const inputNome = document.querySelector("#nome");
const buscar = document.querySelector("#buscar");
const erro = document.querySelector("#erro");

botao.addEventListener("click", requisicao);
buscar.addEventListener("click", buscarUsuario);

let saveUsuarios;

function buscarUsuario() {
    usuarios.textContent = "";

    if(saveUsuarios === undefined){
        erro.textContent = "Os usuários precisam ser carregados primeiro!";
        return;
    }

        if(inputNome.value === ""){
        erro.textContent = "Para fazer uma buscar, digite um nome!";
        return;
    }

    const usuariosEncontrados = saveUsuarios.filter(nome => nome.name.toLowerCase().includes(inputNome.value.toLowerCase()));

    if(usuariosEncontrados.length > 0){
         erro.textContent = "";
        // usuarios.textContent = `Usuário encontrado: ${bUsuario.name} | Username: ${bUsuario.username} | Email: ${bUsuario.email}`;
        usuariosEncontrados.forEach(e =>{
            const itemUsuario = document.createElement("p");
            itemUsuario.textContent = `${e.name} | ${e.username}| ${e.email}` ;

            usuarios.appendChild(itemUsuario);
        });
    }else{
        
        erro.textContent = "Usuário inexistente!";
        inputNome.value = "";
        inputNome.focus();
        return;
    }
}

async function requisicao() {
    try{
        usuarios.textContent = "";
        erro.textContent = "";
        if (!localStorage.getItem("usuarios")) {
    
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            // const response = await fetch("https://jsonplaceholder.typicode.com/usuarios-invalidos");
            
            if(!response.ok){
                throw new Error("Falha na requisição");
            }
                
                const users = await response.json();
        
                localStorage.setItem("usuarios", JSON.stringify(users));
        
                saveUsuarios = users;
    
        } else {
    
            saveUsuarios = JSON.parse(localStorage.getItem("usuarios"));
        }
    
        // const pegarNomes = saveUsuarios.map(pessoa => pessoa.name);
    
        usuarios.textContent = "";
    
        saveUsuarios.forEach(e => {
            const itemUsuario = document.createElement("p");
    
            itemUsuario.textContent = e.name;
            usuarios.appendChild(itemUsuario);
        });
    }catch(err){
        console.log(err);
        erro.textContent = "Não foi possível carregar os usuários. Verifique sua conexão e tente novamente.";
    }
}







// setItem → cria/salva os produtos inicialmente.
// getItem + JSON.parse → recupera o array.
// index === -1  → NÃO encontrou
// index !== -1  → ENCONTROU

// SOMA          → geralmente começa com 0
// MULTIPLICAÇÃO → geralmente começa com 1
// OBJETO        → geralmente começa com {}
// ARRAY         → geralmente começa com []
// SEM valor inicial → primeiro elemento vira o acumulador

// fetch("https://jsonplaceholder.typicode.com/users")
//     .then(response => response.json())
//     .then(usuarios => {
//         localStorage.setItem("usuarios", JSON.stringify(usuarios));
//         const salvar = JSON.parse(localStorage.getItem("usuarios"));

//         const dados = usuarios.filter(p => p.id > 5);

//         console.log(dados);
//     });