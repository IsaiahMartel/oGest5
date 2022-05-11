
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
// tabla que muestra los compositores  -

    var table_composer = $('#table-composer').DataTable(
        {
            "responsive": false,
            "scrollX": true,
            "language": idioma,
            "ajax": {
                "headers": {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                "data":{ "tipo" : 1},
                "url": "/admin/archivo/getdataComposer",
                "type": "POST",

            },

            "columns":
            [
                { data: 'id', title: 'id',"width": "20px" },
                { data: 'composerLastname' , title: 'Apellidos'},
                { data: 'composerFirstname',title: 'Nombre Secundario' },
                { data: 'composerBirthYear',title: 'Año Nacimiento' },
                { data: 'composerDeathyear',title: 'Año Defunción' },
                { data: null,title : 'Acciones',  orderable: false, defaultContent: 'action',render:
                    function(data,type,row){
                        var action = "<div class='btn-group'>" ;
                        //action += "<a href='#' id-delete=" + data.id + " class='delete btn btn-danger' role='button'><i class='fa fa-trash'></i></a> ";
                        action += "<a href='#' class='edit btn btn-success'><i class='fa fa-edit'></i></a>";
                        action += "</div>" ;
                        return  action ;
                    },
                },
            ],
                order: [[1, 'asc']]


        }).draw();

    // acción de boton guardar Compositor

    $('#composerAdd').on('click', function (e) {
        e.preventDefault();
        var editar = $('#editar').val();
        var composerLastname  = $('#composerLastname').val();
        var composerFirstname = $('#composerFirstname').val();
        if (composerLastname !='')
        {
            //return false; // si retorna false significa que existe SOLAPE de fechas
            $.ajax({
                url : '/admin/archivo/getexisteComposer',
                headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type : 'POST',
                data: {
                    'editar'            : $('#editar').val(),
                    'composerLastname'  : $('#composerLastname').val(),
                    'composerFirstname' : $('#composerFirstname').val(),
                    'composerBirthYear' : $('#composerBirthYear').val(),
                    'composerDeathyear' : $('#composerDeathyear').val(),
                },
                dataType : 'json',
                success : function(json) {

                    if (json['message'] == 'existe'){
                        Swal.fire({
                            icon: 'error',
                            title:  json.tittle  ,
                            text: json.text,
                            footer: 'Agenda de compositores'
                        })

                    } else{
                        $.ajax({
                            url : '/admin/archivo/storeComposer',
                            headers: {
                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            data : {
                                'editar'            : $('#editar').val(),
                                'composerLastname'  : $('#composerLastname').val(),
                                'composerFirstname' : $('#composerFirstname').val(),
                                'composerBirthYear' : $('#composerBirthYear').val(),
                                'composerDeathyear' : $('#composerDeathyear').val(),
                            },
                            type : 'POST',
                            dataType : 'json',
                            success : function(data)
                            {
                                if ($('#editar').val() == '' && data.message == true){
                                    var title = 'Compositor creado satisfactoriamente';
                                    limpiaForm()
                                    $('#table-composer').DataTable().ajax.reload( null, false );

                                }else{
                                    var title = 'El compositor se ha modificado satisfactoriamente';
                                    limpiaForm()
                                    $('#table-composer').DataTable().ajax.reload( null, false );

                                }

                                Swal.fire({
                                    icon: 'success',
                                    title: title,
                                    text: 'Los datos se han almacenado correctamente',
                                    footer: 'Agenda de compositores'
                                })

                            }
                        })

                    }
                }
            });

        }else{

            Swal.fire({
                icon: 'error',
                title: 'El campo de Nombre principal (Apellido) no puede quedar vacio' ,
                text: 'No se han guardado los datos',
                footer: 'Agenda de compositores'
            })

        }

    })

// añade la funcionalidad de edición del coompositor

    $('#table-composer tbody').on( 'click', 'a.edit', function () {

        var data = table_composer.row( $(this).parents("tr") ).data();
        table_composer.$('tr.table-primary').removeClass('table-primary');
        $('#edit-color').addClass('table-primary');
        $(this).parents("tr").addClass('table-primary');
        $('#composerAdd').removeClass('btn-info' );
        $('#composerAdd').addClass('btn-warning ');
        $('#composerAdd').html('Modificar compositor');

        $('#editar').val(data.id);
        $('#composerLastname').val(data.composerLastname);
        $('#composerFirstname').val(data.composerFirstname);
        $('#composerBirthYear').val(data.composerBirthYear);
        $('#composerDeathyear').val(data.composerDeathyear);

    });

    function limpiaForm() {
        $('#edit-color').removeClass('table-primary');
        table_composer.$('tr.table-primary').removeClass('table-primary');
        //$(this).parents("tr").removeClass('table-primary');
        $('#composerAdd').addClass('btn-primary' );
        $('#composerAdd').removeClass('btn-warning ');
        $('#composerAdd').html('Añadir');
        $("#form-composer")[0].reset();

    }
// boton de borrar Compositor
    $('#table-composer tbody').on( 'click', 'a.delete', function (e) {
        e.preventDefault();

});


// Botón Cancelar
    $('#cancel').on( 'click', function (e) {
        e.preventDefault();
        limpiaForm()

    });

});
