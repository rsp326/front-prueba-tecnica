

const $cuerpoTabla = document.querySelector("#cuerpoTabla");


function obtenerClientes(){
    $cuerpoTabla.innerHTML='';
    fetch("http://localhost:5000/api/cliente")
    .then(response => response.json())
    .then(clientes => {
      // Recorrer todos los clientes
      clientes.forEach(cliente=>{
           // Crear un <tr>
          const $tr = document.createElement("tr");
          // Creamos el <td> de NumDoc y lo adjuntamos a tr
          let $tdNumDoc = document.createElement("td");
          $tdNumDoc.textContent = cliente.numero_documento; // el textContent del td es el NumeroDoc
          $tr.appendChild($tdNumDoc);

          let $tdTipoDocumento = document.createElement("td");
          $tdTipoDocumento.textContent = cliente.tipo_documento;
          $tr.appendChild($tdTipoDocumento);
  
          let $tdNombre = document.createElement("td");
          $tdNombre.textContent = cliente.nombre_cliente;
          $tr.appendChild($tdNombre);
  
          let $tdTelefono = document.createElement("td");
          $tdTelefono.textContent = cliente.telefono;
          $tr.appendChild($tdTelefono);
  
          let $tdDireccion = document.createElement("td");
          $tdDireccion.textContent = cliente.direccion;
          $tr.appendChild($tdDireccion);
  
          let $tdEmail = document.createElement("td");
          $tdEmail.textContent = cliente.email;
          $tr.appendChild($tdEmail);

          let $tdEstado = document.createElement("td");
          $tdEstado.textContent = cliente.estado;
          $tr.appendChild($tdEstado);

          let $tdFechaNacimiento = document.createElement("td");
          $tdFechaNacimiento.textContent = cliente.fecha_nacimiento;
          $tr.appendChild($tdFechaNacimiento);

          let $tdUsuarioEncargado = document.createElement("td");
          $tdUsuarioEncargado.textContent = cliente.usuario_id;
          $tr.appendChild($tdUsuarioEncargado);

          let $tdProyectoInteres = document.createElement("td");
          $tdProyectoInteres.textContent = cliente.proyecto_id;
          $tr.appendChild($tdProyectoInteres);


          $tdBorrado = document.createElement("td");
          let $btnBorrado = document.createElement("button");
          $btnBorrado.className = "btn btn-danger btn-sm";
          $btnBorrado.textContent = "Eliminar";
          $btnBorrado.id = cliente.id;
          $btnBorrado.value = cliente.id;
         // $btnBorrado.(onclick="eliminarCliente('"+cliente.id+"')");
          $tdBorrado.appendChild($btnBorrado);
          $tr.appendChild($tdBorrado);
          $cuerpoTabla.appendChild($tr);
      });
  });
}


//Evitamos que al enviar el formulario recargue la pagina
document.getElementById("btnCrearCliente").addEventListener("click", function(event){
  event.preventDefault();
  crearCliente();
});

let formulario = document.getElementById('formulario');

function crearCliente(){
  const documento=document.getElementById('documentoForm').value;
  const nombre=document.getElementById('nombreForm').value;
  const telefono=document.getElementById('telefonoForm').value;
  const direccion=document.getElementById('direccionForm').value;
  const email=document.getElementById('emailForm').value;
  const fechaNacimiento=document.getElementById('fechaNacimientoForm').value;
  const estado = true;
  if(documento=='' || nombre =='' || telefono=='' || direccion=='' || fechaNacimiento==''){
    console.log("campos incompletos");
    swal({
      title: 'Error!',
      text: 'Por Favor complete los campos obligatorios',
      icon: 'error',
    });
    return null;
  }

  fetch('http://localhost:5000/api/cliente', {
    method: 'POST',
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      numero_documento: parseInt(documento),
      nombre_cliente: nombre,
      telefono:telefono,
      direccion: direccion,
      email: email,
      fecha_nacimiento:fechaNacimiento,
      estado:estado,
      tipo_documento: "cedula",
      proyecto_id: 1,
      usuario_id:1
    })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      formulario.reset();
      $('#exampleModal').modal('hide');
      $(".modal-backdrop").remove();
      obtenerClientes();
    })
  .catch(error => console.error('Error:', error)); 
}

function eliminarCliente(id){
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify()
  };
  fetch('https://reqres.in/api/articles/'+id, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data) );
}


