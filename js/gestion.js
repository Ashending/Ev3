let g_id_gestion = 0;

// ######### LISTAR #########
function listarGestion(){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
    "query": "select ges.id_gestion as id_gestion,cli.id_cliente, ges.comentarios as comentarios,CONCAT(cli.nombres, ' ',cli.apellidos) as nombre_cliente,CONCAT(usu.nombres,' ' ,usu.apellidos) as nombre_usuario,tge.nombre_tipo_gestion as nombre_tipo_gestion,res.nombre_resultado as nombre_resultado,ges.fecha_registro as fecha_registro from gestion ges,usuario usu,cliente cli,tipo_gestion tge,resultado res where ges.id_usuario = usu.id_usuario and ges.id_cliente = cli.id_cliente and ges.id_tipo_gestion = tge.id_tipo_gestion and ges.id_resultado = res.id_resultado "});
    let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    fetch("http://144.126.210.74:8080/dynamic", requestOptions)
    .then(response => response.json())
    .then((json) => {
        json.forEach(completarFila);
        $('#tbl_gestion').DataTable();
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


function completarFila(element,index,arr){
  arr[index] = document.querySelector("#tbl_gestion tbody").innerHTML +=
  `<tr>
    <td>${element.id_gestion}</td>
    <td>${element.nombre_usuario}</td>
    <td>${element.nombre_cliente}</td>
    <td>${element.nombre_tipo_gestion}</td>
    <td>${element.nombre_resultado}</td>
    <td>${element.comentarios}</td>
    <td>${element.fecha_registro}</td>
    <td>
    <a href='actualizar.html?id=${element.id_gestion}' class='btn btn-warning'>Actualizar</a> 
    <a href='eliminar.html?id=${element.id_gestion}' class='btn btn-danger'>Eliminar</a> 
    </td>
  </tr>`
}


// ######### CREAR #########
function agregarGestion() {

  let id_usuario      = document.getElementById("sel_id_usuario").value;
  let id_cliente      = document.getElementById("sel_id_cliente").value;
  let id_tipo_gestion = document.getElementById("sel_id_tipo_gestion").value;
  let id_resultado    = document.getElementById("sel_id_resultado").value;
  let comentarios     = document.getElementById("txt_comentarios").value;

  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let horaRegistro = obtenerFechaHora();

  //Carga útil de datos
  const raw = JSON.stringify({
    "id_usuario": id_usuario,
    "id_cliente": id_cliente,
    "id_tipo_gestion": id_tipo_gestion,
    "id_resultado": id_resultado,
    "comentarios": comentarios,
    "fecha_registro": horaRegistro
  });

  //Opciones de solicitud
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/gestion", requestOptions)
    .then((response) => {
        //Por hacer: Usar componentes de bootstrap para gestionar éxito o error
      if(response.status == 200) {
        location.href ="listar.html";
      }
      if(response.status == 400) {
      
        alert("Error al crear la gestión");
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


// ######### ACTUALLIZAR #########
function actualizarGestion(){
  obtenerIdActualizar();

  let id_usuario      = document.getElementById("sel_id_usuario").value;
  let id_cliente      = document.getElementById("sel_id_cliente").value;
  let id_tipo_gestion = document.getElementById("sel_id_tipo_gestion").value;
  let id_resultado    = document.getElementById("sel_id_resultado").value;
  let comentarios     = document.getElementById("txt_comentarios").value;

  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //Carga útil de datos
  const raw = JSON.stringify({
    "id_usuario": id_usuario,
    "id_cliente": id_cliente,
    "id_tipo_gestion": id_tipo_gestion,
    "id_resultado": id_resultado,
    "comentarios": comentarios,
  });

  //Opciones de solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/gestion/" + g_id_gestion, requestOptions)
    .then((response) => {
        //Por hacer: Usar componentes de bootstrap para gestionar éxito o error
      if(response.status == 200) {
        location.href ="listar.html";
      }
      if(response.status == 400) {
      
        alert("Error al crear la gestión");
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
  const p_id_gestion = parametros.get('id');
  g_id_gestion = p_id_gestion;
}


function eliminarGestion(){

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //Opciones de solicitud
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/gestion/"+ g_id_gestion, requestOptions)
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
  const p_id_gestion = parametros.get('id');
  g_id_gestion = p_id_gestion;
  completarEtiqueta(g_id_gestion);

}


function completarEtiqueta(id_eliminar){
  document.getElementById('lbl_eliminar').innerHTML =
    "¿Desea eliminar el gestion? <b> ID: " + id_eliminar + "</b>";
}


// ######### LISTAS DESPLEGABLES ######### 
function cargarListasDesplegables(){
  cargarSelectResultado();
  cargarSelectCliente();
  cargarSelectUsuario();
  cargarSelectTipoGestion();
}

  
function cargarSelectResultado(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarOptionResultado);
    
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function completarOptionResultado(element,index,arr){
  arr[index] = document.querySelector("#sel_id_resultado").innerHTML +=
    `<option value='${element.id_resultado}'> ${element.nombre_resultado} </option>`
}


function cargarSelectCliente(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarOptionCliente);
    
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function completarOptionCliente(element,index,arr){
  arr[index] = document.querySelector("#sel_id_cliente").innerHTML +=
    `<option value='${element.id_cliente}'> ${element.apellidos} ${element.nombres} </option>`
}


function cargarSelectUsuario(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarOptionUsuario);
    
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function completarOptionUsuario(element,index,arr){
  arr[index] = document.querySelector("#sel_id_usuario").innerHTML +=
    `<option value='${element.id_usuario}'> ${element.apellidos} ${element.nombres} </option>`
}


function cargarSelectTipoGestion(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarOptionTipoGestion);
    
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function completarOptionTipoGestion(element,index,arr){
  arr[index] = document.querySelector("#sel_id_tipo_gestion").innerHTML +=
    `<option value='${element.id_tipo_gestion}'> ${element.nombre_tipo_gestion} </option>`
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
