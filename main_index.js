// 1. Obtener el token de alumno y guardarlo
makeRequest('http://127.0.0.1:3000/','GET',null,null,
    (value)=>{
        console.log('Ok funco');
        console.log(value);
    }, (err)=>{
        console.log('Error');
        console.log(err);
    });
/*makeRequest('https://app-users-dasw.herokuapp.com/api/tokenDASW', 'GET', null, {'x-expediente': '721750'}, 
    (value) => {
        console.log('Ok');
        console.log(value);
        localStorage.tokenAuth = value.token;
    }, (err) => {
        console.log('Error');
        console.log(err);
    });
//Manda a llamar a Checar cada vez que hay cambios o click
window.onload = function () {
    document.getElementById("ModalRegistro").onclick = checkRegistro;
    document.getElementById("NombreReg").oninput = checkRegistro;
    document.getElementById("ApellidosReg").oninput = checkRegistro;
    document.getElementById("EmailReg").oninput=checkRegistro;
    document.getElementById("passwordReg").oninput = checkRegistro;
    document.getElementById("password2Reg").oninput = checkRegistro;
}
//Funcion para checar
function checkRegistro(){
    let modal = document.getElementById("ModalRegistro")
    let invalidos = modal.querySelectorAll("input:invalid")
    var cansubmit = true;
    if (invalidos.length>=1){
        document.getElementById('BtnReg').disabled = "disabled";
    }else {
        document.getElementById('BtnReg').removeAttribute('disabled');
    }
}
//Escucha el click de BtnReg y obtiene los datos del usuario
document.getElementById("BtnReg").addEventListener("click", function(event){
    event.preventDefault();
    let sexo="";
    if (document.getElementById("SexoMReg").checked){
        sexo="M";
    }else sexo="H";
    let newUser = {
        "nombre": document.getElementById("NombreReg").value,
        "apellido": document.getElementById("ApellidosReg").value,
        "correo": document.getElementById("EmailReg").value,
        "password" : document.getElementById("passwordReg").value,
        "url" : document.getElementById("URLReg").value,
        "sexo": sexo,
        "fecha" : document.getElementById("FechaReg").value
    };
    RegistrarUsuario(newUser);
    document.getElementById("BtnCancelarReg").click();
  });
  
//Registra el usuario mediante un req
function RegistrarUsuario(Usuario){
    makeRequest('https://app-users-dasw.herokuapp.com/api/users', 'POST',Usuario, {'x-auth': localStorage.tokenAuth},
    (Ok) => {
        alert("Usuario Registrado");
    }, (err) => {
        alert("Error al Registrar el usuario");
    });
}
//Escucha cuando BtnLog da click y guarda los datos
document.getElementById("BtnLog").addEventListener("click",function(event){
    event.preventDefault();
    let newUser = {
        "correo": document.getElementById("formGroupCorreoInput").value,
        "password": document.getElementById("formGroupPasswordInput").value
    };
    obtenerTokenUsuario(newUser);
});
//Obtiene el token usuario (Login)
function obtenerTokenUsuario(newUser) {
    makeRequest('https://app-users-dasw.herokuapp.com/api/login', 'POST', newUser, {'x-auth': localStorage.tokenAuth}, 
    (value) => {
        console.log('Ok');
        console.log(value);
        localStorage.tokenUser = value.token;
        window.location.href='Consultas.html'
    }, (err) => {
        console.log('Error');
        console.log(err);
    });
}
*/