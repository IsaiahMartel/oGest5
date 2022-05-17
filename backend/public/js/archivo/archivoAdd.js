
// idioma para la datatable
var idioma =

    {
        "decimal": ",",
        "thousands": ".",
        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":     "Último",
            "sNext":     "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        },
        "buttons": {
            "copyTitle": 'Información copiada',
            "copyKeys": 'Use your keyboard or menu to select the copy command',
            "copySuccess": {
                "_": '%d filas copiadas al portapapeles',
                "1": '1 fila copiada al portapapeles'
            },

            "pageLength": {
            "_": "Mostrar %d filas",
            "-1": "Mostrar Todo"
            }
        }
    };


$(document).ready(function()
{
// Inicializando Select2
    $('.select2').select2();

// Funcion para rellenar el select de Instrumentos

    function LoadInstrument()
    {

        $.ajax ({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url: "/admin/archivo/getdataInstrument",
                type: "POST",
                dataType: "json",
                data: {},
                success: function (data) {
                    if (data == null) {
                        //alert('Disculpe, No hay Instrumentos que mostrar.');
                        return
                    } else {
                        $.each(data.instruments, function (index, instrument) {
                            $("#selectInstrument").append("<option value=" + instrument.id + ">"+ instrument.instrumentCode + ' ~ ' + instrument.instrumentName + "</option>");
                        });

                    }
                },
                error: function (jqXHR, status, error) {
                    alert('Disculpe, existió un problema método de carga');
                }
        });

    }

// inicializo el editor de notas
    $('#libraryNote').summernote({
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['height', ['height']]
        ],
        tooltip: false,
        height: 100,
		tabsize: 2,
        lang: "es-ES"
    })
// inicializo el datepiker para mostrar solo años


    $('#workCompyear').datepicker({
        autoclose: true,
        orientation: "bottom right",
        format: 'yyyy',
        viewMode: "years",
        minViewMode: "years"
      });

// Boton de Guardar

    $('#workAdd').on('click', function (e) {
        e.preventDefault();
        var editar      = $('#editar').val();
        var composer_id = $('#composer_id').val();
        var workName    = $('#workName').val();
        // var percussion  = $('#table-percussion').tableToJSON(); // Convert the table into a javascript object
        // var keyboard    = $('#table-keyboard').tableToJSON(); // Convert the table into a javascript object
        // var voice       = $('#table-voice').tableToJSON(); // Convert the table into a javascript object

        var percussion  = $('#table-percussion-plus').tableToJSON(); // Convert the table into a javascript object
        var keyboard    = $('#table-keyboard-plus').tableToJSON(); // Convert the table into a javascript object
        var voice       = $('#table-voice-plus').tableToJSON(); // Convert the table into a javascript object
        console.log(percussion);

        if (composer_id !='')
        {
            //compruebo que no esiste en la base de datos esa obra con ese autor
            $.ajax({
                url : '/admin/archivo/getexisteWork',
                headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type : 'POST',
                data: {
                    'editar'        : $('#editar').val(),
                    'composer_id'   : $('#composer_id').val(),
                    'workName'      : $('#workName').val(),
                },
                dataType : 'json',
                success : function(json) {

                    if (json['message'] == 'existe'){
                        Swal.fire({
                            icon: 'error',
                            title:  json.tittle  ,
                            text: json.text,
                            footer: 'Archivo'
                        })

                    } else{

                        $.ajax({
                            url : '/admin/archivo/storeWork',
                            headers: {
                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            data : {
                                'datosSerialize' :$('#form-work').serialize(),
                                'JsonPercussions': JSON.stringify(percussion),
                                'JsonKeyboards'  : JSON.stringify(keyboard),
                                'JsonVoices'     : JSON.stringify(voice)
                            },
                            type : 'POST',
                            dataType : 'json',
                            success : function(data)
                            {
                                if (data.message == true) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'La obra se ha registrado en el sistema correctamente',
                                        text: data.text,
                                        footer: 'Archivo'
                                    })
                                    $('#editar').val(data.editar);
                                }else{
                                    Swal.fire({
                                    icon: 'success',
                                        title: 'Ha habido un error al intertar almacenar la obra, No se han guardado los datos',
                                        text: 'Contacte con el creador del Software',
                                        footer: 'Archivo'
                                    })
                                }
                            }
                        })
                    }
                }
            });

        }else{
            Swal.fire({
                icon: 'error',
                title: 'El campo de COMPOSITOR no puede quedar vacio' ,
                text: 'No se han guardado los datos',
                footer: 'Archivo'
            })
        }


    });

// Abre el modal para insertar Instrumentos pulsando sobre el PLUS (abdre un MODAL)

    $('.instrumentAdd').on('click',function (e) {
        e.preventDefault();

        var instrument = $(this).attr('id');
        if (instrument == 'percussion-plus') $('#modal-cabeceraSelect').text('Instrumentos de Percusión')
        if (instrument == 'keyboard-plus') $('#modal-cabeceraSelect').text('Instrumentos de Teclado')
        if (instrument == 'voice-plus') $('#modal-cabeceraSelect').text('Voces')

        //$('#modal-cabeceraSelect').text(instrument)
        $('#instrumentInsert').prop('data-instrument',instrument)
        $('#modal-instrument').modal('toggle'); // abro la ventana modal para selecccinoar instrumentos

        LoadInstrument();
    })


// Boton dentro del modal para añadir el instrumento al card

    $('#instrumentInsert').on('click',function (e) {
        e.preventDefault();

        fila  = '<tr>';
        fila += '    <td class="d-none">';
        fila +=          $("#selectInstrument :selected").val();
        fila += '    </td>';
        fila += '    <td>';
        fila +=          $('#selectInstrument :selected').text().split("~")[0];
        fila += '    </td>';
        fila += '    <td>';
        fila +=          $('#selectInstrument :selected').text().split("~")[1];
        fila += '    </td>';
        fila += '    <td>';
        fila += '        <a id='+$("#selectInstrument :selected").val()+' href="#" class="btn btn-tool btn-sm del">';
        fila += '            <i class="far fa-trash-alt"></i>';
        fila += '        </a>';
        fila += '    </td>';
        fila += '</tr>';
        var instrument = $('#instrumentInsert').prop('data-instrument')

        $('#table-'+instrument+' tbody').append(fila);
        $('#modal-instrument').effect( 'shake', {}, 500, caches );

    })
//botones pequeños de instrumentos para eliminarlos de la tabla
    $(document).on('click', '.del', function (event) {
        event.preventDefault();
        $(this).closest('tr').remove();
    });



});
