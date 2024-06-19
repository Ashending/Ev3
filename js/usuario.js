let g_id_usuario ="";


function listarUsuario() {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_usuario').DataTable();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function completarFila(element,index,arr){

  let fechaHoraFormateada = formatearFechaHora(element.fecha_registro);

  arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML +=
  `<tr>
    <td>${element.id_usuario}</td>
    <td>${element.dv}</td>
    <td>${element.nombres} ${element.apellidos}</td>
    <td>${element.email}</td>
    <td>${element.celular}</td>
    <td>${element.username}</td>
    <td>${element.password}</td>
    <td>${fechaHoraFormateada}</td>
    <td>
    <a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning'>Actualizar</a> 
    <a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger'>Eliminar</a> 
    </td>
  </tr>`
}


function agregarUsuario() {
  //Obtenemos el tipo de gestión que ingresa el usuario
  var id_usuario = parseInt(document.getElementById("txt_ID").value);
  let dv_usuario = document.getElementById("txt_DV").value;
  let nombres_usuario = document.getElementById("txt_nombres").value;
  let apellidos_usuario = document.getElementById("txt_apellidos").value;
  let email_usuario = document.getElementById("txt_email").value;
  let celular_usuario = parseInt(document.getElementById("txt_celular").value);
  let username_usuario = document.getElementById("txt_username").value;
  let password_usuario = document.getElementById("txt_password").value;

  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let fechaHoraActual = obtenerFechaHora();
  //Carga util de datos
  const raw = JSON.stringify({
    "id_usuario": id_usuario,
    "dv": dv_usuario,
    "nombres": nombres_usuario,
    "apellidos": apellidos_usuario,
    "email": email_usuario,
    "celular": celular_usuario,
    "username": username_usuario,
    "password": password_usuario,
    "fecha_registro": fechaHoraActual
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  // Request tabla usuario
  fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
    .then((response) => {
      if(response.status == 200) {
        location.href ="listar.html";
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function actualizarUsuario(){
  //Obtenemos el tipo de gestión que ingresa el usuario
  let nombres_usuario = document.getElementById("txt_nombres").value;
  let apellidos_usuario = document.getElementById("txt_apellidos").value;
  let email_usuario = document.getElementById("txt_email").value;
  let celular_usuario = parseInt(document.getElementById("txt_celular").value);
  let username_usuario = document.getElementById("txt_username").value;
  let password_usuario = document.getElementById("txt_password").value;
  
  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  let fechaHoraActual = obtenerFechaHora();
  //Carga útil de datos
  const raw = JSON.stringify({
    "nombres": nombres_usuario,
    "apellidos": apellidos_usuario,
    "email": email_usuario,
    "celular": celular_usuario,
    "username": username_usuario,
    "password": password_usuario,
  });
  
  //Opciones de solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
    .then((response) => {
      if(response.status == 200){
        location.href ="listar.html";
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function obtenerIdActualizar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosActualizar(g_id_usuario);

}


function obtenerDatosActualizar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function completarFormulario(element, index, arr) {

  document.getElementById('txt_nombres').value = element.nombres;
  document.getElementById('txt_apellidos').value = element.apellidos;
  document.getElementById('txt_email').value = element.email;
  document.getElementById('txt_celular').value = element.celular;
  document.getElementById('txt_username').value = element.username;
  document.getElementById('txt_password').value = element.password;
  
}


function eliminarUsuario(){

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //Opciones de solicitud
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
    .then((response) => {
      
      //Cambiar por elementos de bootstrap
      if(response.status == 200){
        location.href ="listar.html";
      }
      if(response.status == 400){
        alert("No es posible eliminar. Registro está siendo utilizado.");
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function obtenerIdEliminar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosEliminar(g_id_usuario);

}


function obtenerDatosEliminar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}


function completarEtiqueta(element,index,arr){
  let nombres_usuario = element.nombres;
  let apellidos_usuario = element.apellidos;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar el usuario? <b>" + nombres_usuario + " "+ apellidos_usuario + "</b>";
}


function formatearFechaHora(fecha_registro){
  let fechaHoraActual = new Date(fecha_registro);
  let fechaHoraFormateada = fechaHoraActual.toLocaleString('es-ES',{
    hour12 :false,
    year :'numeric',
    month :'2-digit',
    day:'2-digit',
    hour : '2-digit',
    minute :'2-digit',
    second : '2-digit',
    timeZone:'UTC'
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
  return fechaHoraFormateada;
}


function obtenerFechaHora() {
  let fechaHoraActual = new Date();

  let fechaHoraFormateada = fechaHoraActual.toLocaleString('es-ES',{
    hour12 :false,
    year :'numeric',
    month :'2-digit',
    day:'2-digit',
    hour : '2-digit',
    minute :'2-digit',
    second : '2-digit'
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');

  return fechaHoraFormateada;
}
