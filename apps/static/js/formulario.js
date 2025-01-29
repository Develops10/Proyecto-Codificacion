$(document).ready(function() {
    $('#departamentoSelect').on('change', function() {
        var codigoDpto = $(this).val(); // Obtener el valor seleccionado del departamento

        $.ajax({
            type: 'POST',
            url: 'http://10.21.5.99:8080/code/grupos',
            contentType: 'application/json',
            data: JSON.stringify({ 'codigo': codigoDpto }),
            success: function(response) {
                $('#grupoSelect').empty().append('<option value="">Seleccione un grupo</option>');
                $.each(response, function(index, item) {
                    $('#grupoSelect').append('<option value="' + item.c_CODIGO + '">' + item.C_DESCRIPCIO + '</option>');
                });
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    });

    $('#grupoSelect').on('change', function() {
        var grupo = $(this).val(); // Obtener el valor seleccionado del grupo
        var dpto = $('#departamentoSelect').val(); // Obtener el valor seleccionado del departamento

        $.ajax({
            type: 'POST',
            url: 'http://10.21.5.99:8080/code/r',
            contentType: 'application/json',
            data: JSON.stringify({ 'grupo': grupo, 'dpto': dpto }),
            success: function(response) {
                // Vaciar y agregar nuevas opciones al select 'form_id'
                var $formIdSelect = $('#form_id').empty().append('<option value="">Seleccione un Subgrupo</option>');
                $.each(response, function(index, item) {
                    $formIdSelect.append('<option value="' + item.c_CODIGO + '">' + item.c_DESCRIPCIO + '</option>');
                });

                // Mostrar en consola la descripción de cada item recibido
                
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    });
});
$(document).ready(function() {
$('#departamentoSelect').change(function() {
    var selectedDepartamento = $(this).val();
    $('#codigo-departamento').val(selectedDepartamento);
    $('#descripcion-departamento').val($('#departamentoSelect option:selected').text());
});

$('#grupoSelect').change(function() {
    var selectedGrupo = $(this).val();
    $('#codigo-grupo').val(selectedGrupo);
    $('#descripcion-grupo').val($('#grupoSelect option:selected').text());
});

$('#form_id').change(function() {
    var selectedSubgrupo = $(this).val();
    $('#codigo-subgrupo').val(selectedSubgrupo);
    $('#descripcion-subgrupo').val($('#form_id option:selected').text());
});
});


document.getElementById('showModal').addEventListener('click',function(){
let c_departamento_input = document.getElementById('codigo-departamento').value
let c_grupo_input = document.getElementById('codigo-grupo').value
let c_subgrupo_input = document.getElementById('codigo-subgrupo').value

$.ajax({
            type: 'POST',
            url: 'http://10.21.5.99:8080/code/ucodigo',
            contentType: 'application/json',
            data: JSON.stringify({ 'c_departamento': c_departamento_input, 'c_grupo': c_grupo_input,'subgrupo': c_subgrupo_input}),
            success: function(response) {
                // Vaciar y agregar nuevas opciones al select 'form_id'
           
                let codigo_nuevo = response[0].nuevo_codigo
                document.getElementById('codigo_tio').value = codigo_nuevo
                document.getElementById('codigo_tio2').value = codigo_nuevo
                document.getElementById('codigo_maestro').value = codigo_nuevo
                document.getElementById('codigo_alterno2').value = localStorage.getItem('codigoArticulo')
                // Mostrar en consola la descripción de cada item recibido
                
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
        const modalBase = Swal.mixin({
            customClass: {
                popup: 'swal2-custom-modal', // Clase personalizada (opcional)
            },
            allowOutsideClick: false, // Evita que se cierren al hacer clic fuera del modal
            backdrop: true, // Mostrar el fondo sombreado
        });
        modalBase.fire({
            title: 'Formulario de Registro'  ,
            showCancelButton: true,
            html: `
                    <!-- Subtítulo -->
            <p style="font-size: 16px; color: gray; margin: 0; text-align: center;">
                Trabajando bajo el proveedor: <strong>${localStorage.getItem('codigoProveedor')}
            </p>

                <div style="display: flex; justify-content: space-between;">
                    <!-- Primera sección -->
                    <div style="width: 48%;">
                        <label for="codigo_tio">Código Tío</label>
                        <input type="text" id="codigo_tio" disabled class="swal2-input" placeholder="Código Tío" required>

                        <label for="descripcion">Descripción</label>
                        <input type="text" id="descripcion" class="swal2-input" placeholder="Descripción" required>

                        <label for="modelo">Modelo</label>
                        <input type="text" id="modelo" class="swal2-input" placeholder="Modelo" required>

                        <label for="modelo">Marca Descriptiva</label>
                        <input type="text" id="marca" class="swal2-input" placeholder="Modelo" required>

                        <label for="descripcion_corta">Descripción Corta</label>
                        <input type="text" id="descripcion_corta" class="swal2-input" placeholder="Descripción Corta" required>

                        <label for="moneda" style="margin-top: 25px;">Moneda</label>
                        <select id="moneda" class="swal2-input" required>
                            <option value="">Seleccione una opción</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="MXN">MXN</option>
                        </select>
                    </div>

                    <!-- Segunda sección -->
                    <div style="width: 48%;">
                        <label for="codigo_maestro">Codigo Tío</label>
                        <input type="text" id="codigo_tio2" disabled class="swal2-input" placeholder="Código Tío" required>

                        <label for="codigo_maestro">Código Maestro</label>
                        <input type="text" id="codigo_maestro" disabled class="swal2-input" placeholder="Código Maestro" required>

                        <label for="descripcion2">Descripción</label>
                        <input disabled value="CODIGO MAESTRO" type="text" id="descripcion2" class="swal2-input" placeholder="Descripción" required>

                        <label for="provedorcod">Proveedor</label><button class="btn btn-primary" id="btn-modal-provedores" style="margin-left: 25px;">Verificar proveedor</button>
                        <input disabled  type="text" id="provedorcod" class="swal2-input" placeholder="Descripción" required>

     
                        <label for="codigo_alterno2">Código Alterno</label>
                        <input disabled type="text" id="codigo_alterno2" class="swal2-input" placeholder="Código Alterno" required>

                        <label for="descripcionAlterana">Descripción Alterna</label>
                        <input  value = "CODIGO ALTERNO" disabled type="text" id="descripcionAlterana" class="swal2-input" placeholder="Descripción" required>
                        
                        

                        
                    </div>
                </div>
                
            `,
            didOpen: () => {
                    // Obtener el checkbox y el input
                    const checkbox = document.getElementById('enable_codigo_alterno');
                    const inputCodigoAlterno = document.getElementById('codigo_alterno2');
                    const inputDescricionAlterno = document.getElementById('descripcionAlterana')

                    document.getElementById('btn-modal-provedores').addEventListener('click', ()=>{
                        
                       
                        let valor = localStorage.getItem('codigoProveedor')
                        console.log(valor);
                        $.ajax({
                            type: 'POST',
                            url: 'http://10.21.5.99:8080/code/provedorxprt',
                            contentType: 'application/json',
                            data: JSON.stringify({c_codproveed:valor}),
                                success: function(response) {
                                    let descripcion_provedor = response;

                                    // Si no hay datos o el arreglo está vacío, asigna un valor predeterminado
                                    if (!Array.isArray(descripcion_provedor) || descripcion_provedor.length === 0) {
                                      descripcion_provedor = [
                                        {
                                          "c_codproveed": "0",
                                          "c_descripcio": "Provedor no existente",
                                          "c_rif": "0"
                                        }
                                      ];
                                      document.getElementById('provedorcod').value = descripcion_provedor[0]['c_descripcio'];
                                    } else {
                                      console.log(descripcion_provedor);
                                    
                                      // Verifica que el primer elemento tiene la propiedad 'c_descripcio'
                                      if (descripcion_provedor[0] && descripcion_provedor[0].c_descripcio) {
                                        document.getElementById('provedorcod').value = descripcion_provedor[0]['c_descripcio'];
                                      } else {
                                        console.error("El objeto en el índice 0 no tiene la propiedad 'c_descripcio'.");
                                      }
                                    }
                                    
                                }})
                        

                    })
                    
                    // Agregar listener para cambios en el checkbox
                    
                },
            confirmButtonText: 'Guardar',
            focusConfirm: false,
            preConfirm: () => {
                const campos = [
                    'descripcion',
                    'modelo',
                    'marca',
                    'descripcion_corta',
                    'moneda',
                    'codigo_alterno2',
                    'descripcionAlterana'
                ];
                for (const campo of campos) {
                const elemento = document.getElementById(campo);
                if (elemento && !elemento.disabled && elemento.value.trim() === '') {
                    Swal.showValidationMessage(`Por favor, completa el campo: ${campo}`);
                    return false;
                }
            }

                // Aquí puedes recuperar los valores de los inputs para procesarlos
                return {
                    codigo_tio: document.getElementById('codigo_tio').value,
                    descripcion: document.getElementById('descripcion').value,
                    marca: document.getElementById('marca').value,
                    modelo: document.getElementById('modelo').value,
                    descripcion_corta: document.getElementById('descripcion_corta').value,
                    moneda: document.getElementById('moneda').value,
                    codigo_departamento : document.getElementById('codigo-departamento').value,
                    codigo_grupo : document.getElementById('codigo-grupo').value,   
                    codigo_subgrupo :document.getElementById('codigo-subgrupo').value,

                    codigo_maestro: document.getElementById('codigo_maestro').value,
                    descripcion2: document.getElementById('descripcion2').value,
                    codigo_alterno2: document.getElementById('codigo_alterno2').value,
                    descripcion_alterna: document.getElementById('descripcionAlterana').value,
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const datos = result.value;
                // Aquí tienes los datos de los inputs
                $.ajax({

                        type: 'POST',
                        url: 'http://10.21.5.99:8080/code/inser_codigo',
                        contentType: 'application/json',
                        data: JSON.stringify({ c_CodNasa: datos.codigo_tio,
                                            c_Codigo: datos.codigo_maestro,
                                            c_Descripcion: datos.descripcion2,
                                            n_Cantidad: '1',
                                            nu_Intercambio: '1',
                                            nu_TipoPrecio: '1'
                            }),
                            success: function(response) {
                               
                        
                                console.log(response)
                                // Mostrar en consola la descripción de cada item recibido
                                
                            },
                            error: function(error) {
                                console.error('Error:', error);
                            }
                        });
                        $.ajax({
                            type: 'POST',
                            url: 'http://10.21.5.99:8080/code/inser_codigo_alterno',
                            contentType: 'application/json',
                            data: JSON.stringify({ 
                                c_CodNasa: datos.codigo_tio,
                                c_Codigo: datos.codigo_alterno2,
                                c_Descripcion: datos.descripcion_alterna,
                                n_Cantidad: '1',
                                nu_Intercambio: '1',
                                nu_TipoPrecio: '1'
                            }),
                            success: function(response) {
                                console.log(response);
                                // Mostrar en consola la descripción de cada item recibido
                            },
                            error: function(error) {
                                console.error('Error:', error);
                            }
                        });
                $.ajax({
                        type: 'POST',
                        url: 'http://10.21.5.99:8080/code/inserProve',
                        contentType: 'application/json',
                        data: JSON.stringify({ 
                                        c_codigo: datos.codigo_tio,
                                        c_codprovee: localStorage.getItem('codigoProveedor')
                        }),
                        success: function(response) {
                                        console.log(response);
                                        // Mostrar en consola la descripción de cada item recibido
                                    },
                        error: function(error) {
                                        console.error('Error:', error);
                                    }
                        });
                $.ajax({
                        type: 'POST',
                        url: 'http://10.21.5.99:8080/code/inser_producto',
                        contentType: 'application/json',
                        data: JSON.stringify({c_Codigo: datos.codigo_tio,
                                                c_Descri: datos.descripcion,
                                                c_Departamento: datos.codigo_departamento,
                                                c_Grupo: datos.codigo_grupo,
                                                c_SubGrupo: datos.codigo_subgrupo,
                                                c_Marca: datos.marca,
                                                c_Modelo: datos.modelo,
                                                c_CodMoneda: datos.moneda,
                                                cu_Descripcion_Corta: datos.descripcion_corta}),
                            success: function(response) {
                        
                                console.log(response)
                                Swal.fire('¡Éxito!', 'Producto y código guardados correctamente.', 'success');
                                Swal.fire({
                                    title: '¡Éxito!',
                                    allowOutsideClick: false,
                                    text: 'Producto y código guardados correctamente.',
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                       /*BLOQUE PARA IMPRIMIR ETIQUETA*/
                                       /* hacer la peticion para impresion de etiqueta */
                                       $.ajax({
                                        type: 'POST',
                                        url: 'http://10.21.5.99:8080/izebra/impresion',
                                        contentType: 'application/json',
                                        data: JSON.stringify({ 
                                            cantidad: localStorage.getItem('cantidad_articulo'),
                                            codigotio:datos.codigo_tio,
                                            description:datos.descripcion,
                                            provedor:localStorage.getItem('cod_provedor'),
                                            nombre: 'DEIKER',
                                            cantidad_eti:1
                                        }),
                                        success: function(response) {
                                                        console.log(response);
                                                         window.location.href = "http://10.21.5.99:8080/"
                                                    },
                                        error: function(error) {
                                                        console.error('Error:', error);
                                                    }
                                        });

                                           
                                    }
                                });
                                
                            },
                            error: function(error) {
                                console.error('Error al insertar el código:', error);
                                Swal.fire('Error', 'No se pudo guardar el código.', 'error');
                            }
                        });
                


            }
        });

})







/*
let btnProvedor = document.getElementById('btn-proveedor');



btnProvedor.addEventListener('click', () => {
    Swal.fire({
        title: 'Cambio de proveedor',
        html: `
          <p>Proveedor actual seleccionado: <strong>${localStorage.getItem('codigoProveedor')}</strong></p>
        `,
        input: 'text',
        inputLabel: 'Cambiar codigo de Proveedor',       
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        preConfirm: (host) => {
          if (!host) {
            Swal.showValidationMessage('El host es obligatorio');
          }
          return host;

        },
        customClass: {
          popup: 'swal-popup' // Clase personalizada para el popup
        },
        willOpen: () => {
          // Establecer el tamaño del modal aquí
          const popup = document.querySelector('.swal-popup');
          popup.style.width = '400px'; // Ancho específico
          popup.style.maxWidth = '90%'; // Ancho máximo, adaptativo
        }
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(result.value);
          localStorage.setItem('codigoProveedor', result.value)
        }
      });
      
})*/