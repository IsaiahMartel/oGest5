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

// tabla que muestra las ZONAS  -

    var table_permission = $('#table-permission').DataTable(
        {
            "scrollX": true,
            "language": idioma,
            "ajax": {
                "headers": {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                "data":{ "tipo" : 1},
                "url": "/admin/users/getdataPermission",
                "type": "POST",
            },
            "columns":
            [
                { data: 'id', title: 'id',"width": "20px" },
                { data: 'name' ,title: 'Ruta'},
                { data: 'guard_name' , title: 'descripción'},
                { data: null ,title: 'Roles',
                    render: function ( data, type, row ) {
                    var roles =''
                    $.each(data.roles, function (index, value) {
                        roles += value.name + ' <br\>'
                    });
                        return roles;
                    },
                    visible: true
                },
                { data: null , title : 'Acciones' ,"width": "100px",  orderable: false, defaultContent: 'action',render:
                    function(data,type,row){

                        var action = "<div class='btn-group'>" ;
                        action += "<a href='#' id-delete=" + data.id + " class='delete btn btn-danger' role='button'><i class='fa fa-trash'></i></a> ";
                        action += "<a href='#' class='edit btn btn-success'><i class='fa fa-edit'></i></a>";
                        action += "</div>" ;
                        return  action ;
                    },
                },
            ],
                order: [[1, 'asc']]
        }).draw();

    function limpiaForm() {
        $('#edit-color').removeClass('table-primary');
        table_permission.$('tr.table-primary').removeClass('table-primary');
        $('#Add').addClass('btn-primary' );
        $('#Add').removeClass('btn-warning ');
        $('#Add').html('Añadir');
        $("#form-permission")[0].reset();

    }
    // Botón BORRAR
    $('#table-groupsAddress tbody').on( 'click', 'a.delete', function () {

    });

    // boton de Cancelar
    $('#Cancel').on( 'click', function () {
        limpiaForm()
    });



    // acción de boton guardar Permiso con Role

    $('#Add').on('click', function (e) {
        e.preventDefault();

        var editar = $('#editar').val();
        var name = $('#name').val();
        var guard_name = $('#guard_name').val();
        var roles = [] ;
        // con esto detecto los checkbox que están seleccionados
        $('input[type=checkbox]').each(function() {
            if (this.checked) {
                roles.push($(this).attr('id').substr(6)); //extraigo el nombre del role que esta almacenado en el id "role-xxxxxxxx"
            }

        });
        if (name !='' && guard_name != '')
        {
            //return false; // si retorna false significa que existe esa ruta
            $.ajax({
                url : '/admin/users/getexistePermission',
                headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type : 'POST',
                data: {
                    'editar'      : $('#editar').val(),
                    'name'        : $('#name').val(),
                    'guard_name'  : $('#guard_name').val(),

                },
                dataType : 'json',
                success : function(json) {
                    if (json['message'] == 'existe'){
                        Swal.fire({
                            icon: 'error',
                            title:  json.tittle  ,
                            text: json.text,
                            footer: 'Libreta de direcciones'
                        })
                    } else{
                        $.ajax({
                            url : '/admin/users/storePermission',
                            headers: {
                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            data : {
                                'editar'      : $('#editar').val(),
                                'name'        : $('#name').val(),
                                'guard_name'  : $('#guard_name').val(),
                                'roles'       : JSON.stringify(roles), // para enviarlo como un array-json
                            },
                            type : 'POST',
                            dataType : 'json',
                            success : function(data)
                            {
                                limpiaForm()
                                Swal.fire({
                                    icon: 'success',
                                    title: data.tittle,
                                    text: 'Todo ha ido bien',
                                    footer: 'Libreta de direcciones'
                                })
                                $('#table-permission').DataTable().ajax.reload( null, false );
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
                footer: 'Libreta de direcciónes'
            })

        }

    })


    // añade la funcionalidad de edición del Permission

    $('#table-permission tbody').on( 'click', 'a.edit', function () {
        limpiaForm()
        var data = table_permission.row( $(this).parents("tr") ).data();
        table_permission.$('tr.table-primary').removeClass('table-primary');
        $('#edit-color').addClass('table-primary');
        $(this).parents("tr").addClass('table-primary');
        $('#Add').removeClass('btn-info' );
        $('#Add').addClass('btn-warning ');
        $('#Add').html('Modificar Permiso');
        $("input:checkbox").prop('checked',false)
        $.each(data.roles, function (index, value) {
            $('#radio-'+value.name).prop("checked",true)
        })

        $('#editar').val(data.id);
        $('#name').val(data.name);
        $('#guard_name').val(data.guard_name);
    });

    function limpiaForm() {
        $('#edit-color').removeClass('table-primary');
        table_permission.$('tr.table-primary').removeClass('table-primary');
        $('#Add').addClass('btn-primary' );
        $('#Add').removeClass('btn-warning ');
        $('#Add').html('Añadir');
        $("#form-permission")[0].reset();

    }
    // Botón BORRAR
    $('#table-permission tbody').on( 'click', 'a.delete', function () {

    });




});
