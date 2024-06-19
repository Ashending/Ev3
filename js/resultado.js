let g_id_resultado ="";


function listarResultado() {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/resultado", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_resultado').DataTable();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function completarFila(element,index,arr){

  let fechaHoraFormateada = formatearFechaHora(element.fecha_registro);

  arr[index] = document.querySelector("#tbl_resultado tbody").innerHTML +=
  `<tr>
    <td>${element.id_resultado}</td>
    <td>${element.nombre_resultado}</td>
    <td>${fechaHoraFormateada}</td>
    <td>
    <a href='actualizar.html?id=${element.id_resultado}' class='btn btn-warning'>Actualizar</a> 
    <a href='eliminar.html?id=${element.id_resultado}' class='btn btn-danger'>Eliminar</a> 
    </td>
  </tr>`
    // <a href='#' class='btn btn-warning'>Actualizar</a> 
    // <a href='#' class='btn btn-danger'>Eliminar</a> 
}


function agregarResultado(){
  //Obtenemos el tipo de gestión que ingresa el usuario
  let nombre_resultado = document.getElementById("txt_nombre").value;

  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let fechaHoraActual = obtenerFechaHora();
  //Carga util de datos
  const raw = JSON.stringify({
    "nombre_resultado": nombre_resultado,
    "fecha_registro": fechaHoraActual
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  // Request tabla resultado
  fetch("http://144.126.210.74:8080/api/resultado", requestOptions)
    .then((response) => {
      if(response.status == 200) {
        location.href ="listar.html";
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function actualizarResultado(){
  //Obtenemos el tipo de gestión que ingresa el usuario
  let nombre_resultado = document.getElementById("txt_nombre").value;
  
  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  //Carga útil de datos
  const raw = JSON.stringify({
    "nombre_resultado": nombre_resultado
  });
  
  //Opciones de solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/resultado/"+ g_id_resultado, requestOptions)
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
  const p_id_resultado = parametros.get('id');
  g_id_resultado = p_id_resultado;
  obtenerDatosActualizar(g_id_resultado);

}


function obtenerDatosActualizar(p_id_resultado){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado/"+p_id_resultado, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function completarFormulario(element, index, arr) {
  let nombre_resultado = element.nombre_resultado;
  document.getElementById('txt_nombre').value = nombre_resultado;
}


function eliminarResultado(){

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //Opciones de solicitud
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/resultado/"+ g_id_resultado, requestOptions)
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
  const p_id_resultado = parametros.get('id');
  g_id_resultado = p_id_resultado;
  obtenerDatosEliminar(g_id_resultado);

}


function obtenerDatosEliminar(p_id_resultado){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado/"+p_id_resultado, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}


function completarEtiqueta(element,index,arr){
  var nombre_resultado = element.nombre_resultado;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar el resultado? <b>" + nombre_resultado + "</b>";


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
