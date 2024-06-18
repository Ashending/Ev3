function listarClientes() {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_cliente').DataTable();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function completarFila(element,index,arr){

  let fechaHoraFormateada = formatearFechaHora(element.fecha_registro);

  arr[index] = document.querySelector("#tbl_cliente tbody").innerHTML +=
  `<tr>
    <td>${element.id_cliente}</td>
    <td>${element.dv}</td>
    <td>${element.nombres} ${element.apellidos}</td>
    <td>${element.email}</td>
    <td>${element.celular}</td>
    <td>${fechaHoraFormateada}</td>
    <td>
    <a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning'>Actualizar</a> 
    <a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger'>Eliminar</a> 
    </td>
  </tr>`
}


function agregarCliente() {
  //Obtenemos el tipo de gestión que ingresa el usuario
  let dv_cliente = document.getElementById("txt_DV").value;
  let nombres_cliente = document.getElementById("txt_nombres").value;
  let apellidos_cliente = document.getElementById("txt_apellidos").value;
  let email_cliente = document.getElementById("txt_email").value;
  let celular_cliente = parseInt(document.getElementById("txt_celular").value);

  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let fechaHoraActual = obtenerFechaHora();
  //Carga util de datos
  const raw = JSON.stringify({
    "id_cliente": 100002,
    "dv": dv_cliente,
    "nombres": nombres_cliente,
    "apellidos": apellidos_cliente,
    "email": email_cliente,
    "celular": celular_cliente,
    "fecha_registro": fechaHoraActual
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  // Request tabla cliente
  fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
    .then((response) => {
      if(response.status == 200) {
        location.href ="listar.html";
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function actualizarCliente(){
  //Obtenemos el tipo de gestión que ingresa el usuario
  let dv_cliente = document.getElementById("txt_DV").value;
  let nombres_cliente = document.getElementById("txt_nombres").value;
  let apellidos_cliente = document.getElementById("txt_apellidos").value;
  let email_cliente = document.getElementById("txt_email").value;
  let celular_cliente = parseInt(document.getElementById("txt_celular").value);
  
  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  let fechaHoraActual = obtenerFechaHora();
  //Carga útil de datos
  const raw = JSON.stringify({
    "dv": dv_cliente,
    "nombres": nombres_cliente,
    "apellidos": apellidos_cliente,
    "email": email_cliente,
    "celular": celular_cliente,
    "fecha_registro": fechaHoraActual
  });
  
  //Opciones de solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/cliente/"+ g_id_cliente, requestOptions)
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
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosActualizar(g_id_cliente);

}


function obtenerDatosActualizar(p_id_cliente){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function completarFormulario(element, index, arr) {
  // let dv_cliente = element.dv_cliente;
  // let nombres_cliente = element.nombres_cliente;
  // let apellidos_cliente = element.apellidos_cliente;
  // let email_cliente = element.email_cliente;
  // let celular_cliente = element.celular_cliente;

  document.getElementById('txt_DV').value = element.dv_cliente;
  document.getElementById('txt_nombres').value = element.nombres_cliente;
  document.getElementById('txt_apellidos').value = element.apellidos_cliente;
  document.getElementById('txt_email').value = element.email_cliente;
  document.getElementById('txt_celular').value = parseInt(element.celular_cliente);
  
}


function eliminarCliente(){

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //Opciones de solicitud
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/cliente/"+ g_id_cliente, requestOptions)
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
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosEliminar(g_id_cliente);

}


function obtenerDatosEliminar(p_id_cliente){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}


function completarEtiqueta(element,index,arr){
  let nombres_cliente = element.nombre_cliente;
  let apellidos_cliente = element.apellidos_cliente;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar el cliente? <b>" + nombres_cliente + apellidos_cliente + "</b>";
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
