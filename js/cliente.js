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


function agregarCliente(){
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

  // Request tabla resultado
  fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
    .then((response) => {
      if(response.status == 200) {
        location.href ="listar.html";
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
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
