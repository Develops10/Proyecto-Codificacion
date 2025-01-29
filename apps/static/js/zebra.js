let valorLoqe = localStorage.getItem('codigoTio')
   
    
        btnCodigo = document.getElementById('ultimoCodigo')
        btnCodigo.addEventListener('click', () =>{
            document.getElementById('codigo-input').value = valorLoqe
        } )
 document.getElementById('set-host-btn').addEventListener('click', () => {
  // Hacer una solicitud para obtener el host actual desde el backend
  $.ajax({
    url: 'http://10.21.5.99:8080/izebra', // Asegúrate de que este endpoint exista
    type: 'GET',
    success: (response) => {
      const currentHost = response.host || 'No asignado'; // Mostrar un mensaje si no hay host guardado

      Swal.fire({
        title: 'Configurar IP de Zebra',
        html: `
          <p>IP actual: <strong>${host}</strong></p>
        `, // Mostrar el host actual justo arriba del campo de entrada
        input: 'text',
        inputLabel: 'Dirección IP de la Zebra',
        inputPlaceholder: 'Ejemplo: 10.21.5.100',
        inputValue: currentHost !== 'No asignado' ? currentHost : '', // Si hay un host, se muestra como valor inicial
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        preConfirm: (host) => {
          if (!host) {
            Swal.showValidationMessage('El host es obligatorio');
          }
          return host;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const host = result.value;
          // Enviar el valor del host al backend
          $.ajax({
            url: 'http://10.21.5.99:8080/izebra/set_host',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ host: host }),
            success: (response) => {
              Swal.fire('Éxito', response.message, 'success');
            },
            error: (xhr) => {
              Swal.fire('Error', xhr.responseJSON.error, 'error');
            }
          });
        }
      });
    },
    error: (xhr) => {
      Swal.fire('Error', 'No se pudo obtener el host actual.', 'error');
    }
  });
});

$(document).ready(function() {
        // Evento al hacer clic en el botón "Buscar"
        $('#buscar-btn').on('click', function() {
            // Obtener el código desde el campo de entrada
            const codigo = $('#codigo-input').val();

            // Validar que el código no esté vacío
            if (!codigo) {
                Swal.fire({
                icon: 'warning',
                title: 'Código vacío',
                text: 'Por favor, ingresa un código antes de buscar.',
            });
                return;
            }

            // Petición AJAX
            $.ajax({
                url: 'http://10.21.5.99:8080/izebra/codigos', // Endpoint del backend
                type: 'POST', // Método HTTP
                contentType: 'application/json', // Tipo de datos enviados
                data: JSON.stringify({ c_Codigo: codigo }), // Datos enviados
                success: function(response) {

                    // Limpiar la tabla
                    $('#tabla-resultados tbody').empty();

                    // Verificar si hay datos
                    if (response.length > 0) {
                        response.forEach(item => {
                            $('#tabla-resultados tbody').append(`
                                <tr class="fila-producto" data-codigo="${item.c_Codigo}" data-descripcion="${item.c_Descri}">
                                    <td>${item.c_Codigo}</td>
                                    <td>${item.c_Descri}</td>
                                    <td>${item.c_Marca}</td>
                                    <td>${item.c_Modelo}</td>
                                    
                                </tr>
                            `);
                        });
                    }  else {
                    // Mostrar alerta si no hay productos
                    Swal.fire({
                        icon: 'info',
                        title: 'Sin resultados',
                        text: `No se encontraron productos con el código "${codigo}".`,
                    });

                    // Añadir fila en la tabla indicando que no hay datos
                    $('#tabla-resultados tbody').append(`
                        <tr>
                            <td colspan="4" class="text-center">No se encontraron resultados</td>
                        </tr>
                    `);
                }
            },
            error: function (error) {
                // Manejar errores
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al realizar la consulta. Intenta nuevamente.',
                });
            }
        });
    });
});
$(document).ready(function () {
    // Evento para capturar clic en las filas de la tabla
    $('#tabla-resultados tbody').on('click', '.fila-producto', function () {
        // Obtener los datos de la fila
        const codigo = $(this).data('codigo');
        const descripcion = $(this).data('descripcion');

        // Mostrar modal de SweetAlert con los datos
        Swal.fire({
            title: 'Información del Producto',
            allowOutsideClick: false,
            html: `
                <form id="producto-form">
                    <label for="codigo_tio">Código Tío</label>
                    <input value="${codigo}" type="text" name="codigo_tio" id="codigo_tio" disabled class="swal2-input">

                    <label for="descripcion">Descripcion</label>
                    <input value="${descripcion}" name="descripcion" type="text" id="descripcion" disabled class="swal2-input">

                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" class="swal2-input">

                    <label for="cantidad">Cantidad Unidades</label>
                    <input type="text" id="cantidad" name="cantidad" class="swal2-input">

                    <label for="CodigoProv">Codigo Provedor</label>
                    <input type="text" id="CodigoProv" name="CodigoProv" class="swal2-input">

                    <label for="CantidadImpresion">Cantidad Etiqueta</label>
                    <input type="text" id="CantidadImpresion" name="CantidadImpresion" class="swal2-input">

                </form>
            `,
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            preConfirm: () => {
                // Capturar los valores del formulario
                const datosFormulario = {
                cantidad: document.getElementById('cantidad').value,
                codigotio: document.getElementById('codigo_tio').value,
                description: document.getElementById('descripcion').value,
                provedor: document.getElementById('CodigoProv').value,
                nombre: document.getElementById('nombre').value,
                cantidad_eti: document.getElementById('CantidadImpresion').value
                    };

                // Validar los campos
                if (!nombre || !cantidad || !CodigoProv) {
                    Swal.showValidationMessage('Por favor, complete todos los campos');
                    return false;
                }

                // Retornar los valores para el envío
                return  datosFormulario ;
            },
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                // Enviar datos al backend usando fetch
                fetch('http://10.21.5.99:8080/izebra/impresion', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(result.value),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al enviar los datos');
                    }
                    return response.json();
                })
                .then(data => {
                    Swal.fire('¡Éxito!', 'Los datos fueron enviados correctamente', 'success');
                    localStorage.removeItem('codigoTio')
                    
                })
                .catch(error => {
                    Swal.fire('Error', 'Hubo un problema al enviar los datos', 'error');
                });
            }
        });
    });
});