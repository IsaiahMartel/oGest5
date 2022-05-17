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

// tabla que muestra los season  -

var table_event = $('#table-event').DataTable(
    {
        "responsive": true,
        "language": idioma,
        "ajax": {
            "headers": {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
            "data":{ "tipo" : 1},
            "url": "/admin/events/getdaEvent",
            "type": "POST",

        },

        "columns":
        [
            { data: 'id', title: 'id' },
            { data: 'eventName' , title: 'Nombre de eventos'},
            { data: 'eventNote',title: 'Descripción' },
            { data: 'eventGroup',title: 'Grupo'},
            { data: null,title : 'Acciones',  orderable: false, defaultContent: 'action',render:

                function(data,type,row){

                    var action = "<div class='btn-group'>" ;
                    action += "<a href='#' id-delete=" + data.id + " class='delete btn btn-danger' role='button'><i class='fa fa-trash'></i></a> ";
                    action += "<a href='#' class='edit btn btn-primary'><i class='fa fa-edit'></i></a>";
                    action += "</div>" ;
                    return  action ;
                },
            },
        ],
            order: [[1, 'asc']]


    });

    // Da funcianalidad al boton de ELIMINAR EVENTO

    // botón para eliminar elemento de la lista

    $('#table-event').on( 'click', 'a.delete', function (e) {
        e.preventDefault();
        //playlist_id= $(this).parents('li').attr('id') // id del elemento (LI) clicado
        //alert(table_event.row( this ).data('id'));
        var rowData = table_event.row( $(this).parents("tr") ).data();
        event_id = rowData['id']
        Swal.fire({
            title: 'Estas seguro?',
            text: "Esta operación no tiene vuelta atras!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '/admin/events/deleteEvent',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data: {
                        'event_id': event_id
                    },
                    type: 'POST',
                    dataType: 'json',
                    success: function (data) {
                        if (data.message == true) {
                            Swal.fire({
                                icon: 'success',
                                title: data.texto,
                                text: data.text2,
                                footer: 'Archivo'
                            })

                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: data.texto,
                                text: data.texto2,
                                footer: 'Archivo'
                            })
                        }

                    }
                })
                table_event.ajax.reload(null,false);
            }
        })

    })

    // da funcionalidad al boton cancelar

    $('#Cancel').on('click',function(){
        $('#eventName').val('');
        $('#eventNote').val('');
        $('#eventGroup').val('');
        $('#editar').val('');
        $('#botonAd').removeClass('btn-warning');
        $('#botonAd').addClass('btn-success');
        $('.form-control').removeClass('is-valid');
        $('#edit-color').removeClass('table-primary');
        $('#botonAd').html('Añadir Evento');
        table_event.$('tr.table-primary').removeClass('table-primary');


    })

    // añade la funcionalidad de edición del seasson

    $('#table-event tbody').on( 'click', 'a.edit', function () {

        var data = table_event.row( $(this).parents("tr") ).data();

        //$(this).parents("tr").toggleClass('table-primary');


        table_event.$('tr.table-primary').removeClass('table-primary');
        $('#edit-color').addClass('table-primary');
        $(this).parents("tr").addClass('table-primary');

        $('#eventName').val(data.eventName);
        $('#eventNote').val(data.eventNote);
        $('#eventGroup').val(data.eventGroup);
        $('#editar').val(data.id);
        $('#botonAd').removeClass('btn-info' );
        $('#botonAd').addClass('btn-warning ');
        $('.box').addClass('box-solid ');
        $('#botonAd').html('Modificar evento');

    });


    // validate para comprobar que no existe el event
    $.validator.addMethod("cExiste", function( value, element){

        var editar = $('#editar').val();
        var eventName = $('#eventName').val();

        //return false; // si retorna true la validacion es buena y continua sin alerta
        $.ajax({
            url : '/admin/events/getexisteEvent',
            headers: {
                     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type : 'POST',
            data: {
                editar: editar,
                eventName: eventName
            },
            async: false,
            dataType : 'json',
            success : function(json) {

                if (json['message'] == 'existe') resultado = false;
                if (json['message'] == 'noExiste') resultado = true;
            }
        });
        return resultado;

    });

    // plugin validate para validar el formulario de añadir event
    $('#form-event').validate({
        rules: {
                //validacionCompleja : "#campo1",
                eventName:     { cExiste: true   },
                eventNote:     { required: false },
                eventGroup:    { required: true  },

            },
        messages: {

            eventName:     "Este campo es obligatorio y no puede estar repetido",
            eventGroup:    "Este campo es obligatorio, no puede quedar vacio"

        },

        errorPlacement : function(error, element) {
            $(element).closest('.form-group').find('.help-block').html(error.html());
            $(element).closest('.form-group').find('.help-block').addClass('text-danger');
        },
        highlight : function(element) {
            //$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            $(element).addClass('is-invalid');
            $(element).find('.form-control').css('display', 'initial');
         },
        unhighlight: function(element, errorClass, validClass) {
            //$(element).closest('.form-group').removeClass('has-error').addClass('has-success');
            //$(element).closest('.form-group').find('.help-block').html('');
            $(element).removeClass('is-invalid');
            $(element).addClass('is-valid');
            $(element).closest('.form-group').find('.help-block').html('');
         },
        submitHandler: function(form) {
            $.ajax({
                url : '/admin/events/storeEvent',
                headers: {
                         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data : {
                    'eventName' : $('#eventName').val(),
                    'eventNote' : $('#eventNote').val(),
                    'eventGroup': $('#eventGroup').val(),
                    'editar'    : $('#editar').val()
                },
                type : 'POST',
                dataType : 'json',
                success : function(data) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Registro de la temporada completado!',
                        text: 'Los datos se han almacenado correctamente',
                        footer: 'Temporadas'
                    })
                    table_event.ajax.reload(null,false);
                    $('#eventName').val('');
                    $('#eventNote').val('');
                    $('#daterange').val('');
                    $('#editar').val('');
                    $('#botonAd').removeClass('btn-warning');
                    $('#botonAd').addClass('btn-success');
                    $('.creation').removeClass('is-invalid box-solid');
                    $('.creation').addClass('box-success');
                    $('.form-control').removeClass('is-valid');
                    $('#edit-color').removeClass('table-primary');
                    $('#botonAd').html('Añadir Temporada');

                }
            })

        }

    });



});
