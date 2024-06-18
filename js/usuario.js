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
    // <a href='#' class='btn btn-warning'>Actualizar</a> 
    // <a href='#' class='btn btn-danger'>Eliminar</a> 
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