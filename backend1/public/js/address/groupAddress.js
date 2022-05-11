
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

// tabla que muestra los contactos  -

    var table_groupsAddress = $('#table-groupsAddress').DataTable(
        {
            "scrollX": true,
            "language": idioma,
            "ajax": {
                "headers": {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                "data":{ "tipo" : 1},
                "url": "/admin/address/getdatagroupsAddress",
                "type": "POST",
            },
            "columns":
            [
                { data: 'id', title: 'id',"width": "20px" },
                { data: 'addressgroupName' ,title: 'Nombre'},
                { data: 'addressgroupCode' , title: 'Codigo'},
                { data: null,title : 'Acciones' ,"width": "100px",  orderable: false, defaultContent: 'action',render:
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

    // acción de boton guardar grupo

    $('#groupaddressAdd').on('click', function (e) {
        e.preventDefault();

        var editar = $('#editar').val();
        var addressgroupName = $('#addressgroupName').val();
        var addressgroupCode = $('#addressgroupCode').val();
        if (addressgroupName !='' && addressgroupCode != '')
        {
            //return false; // si retorna false significa que existe ese contacto
            $.ajax({
                url : '/admin/address/getexistegroupsAddress',
                headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type : 'POST',
                data: {
                    'editar'            : $('#editar').val(),
                    'addressgroupName'  :$('#addressgroupName').val(),
                    'addressgroupCode'  : $('#addressgroupCode').val(),

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
                            url : '/admin/address/storegroupsAddress',
                            headers: {
                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            data : {
                                'editar'            : $('#editar').val(),
                                'addressgroupName'  : $('#addressgroupName').val(),
                                'addressgroupCode'  : $('#addressgroupCode').val(),
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
                                $('#table-groupsAddress').DataTable().ajax.reload( null, false );
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

// añade la funcionalidad de edición del address

    $('#table-groupsAddress tbody').on( 'click', 'a.edit', function () {
        limpiaForm()
        var data = table_groupsAddress.row( $(this).parents("tr") ).data();
        table_groupsAddress.$('tr.table-primary').removeClass('table-primary');
        $('#edit-color').addClass('table-primary');
        $(this).parents("tr").addClass('table-primary');
        $('#groupaddressAdd').removeClass('btn-info' );
        $('#groupaddressAdd').addClass('btn-warning ');
        $('#groupaddressAdd').html('Modificar contacto');

        $('#editar').val(data.id);
        $('#addressgroupName').val(data.addressgroupName);
        $('#addressgroupCode').val(data.addressgroupCode);
    });

    function limpiaForm() {
        $('#edit-color').removeClass('table-primary');
        table_groupsAddress.$('tr.table-primary').removeClass('table-primary');
        $('#groupaddressAdd').addClass('btn-primary' );
        $('#groupaddressAdd').removeClass('btn-warning ');
        $('#groupaddressAdd').html('Añadir');
        $("#form-address")[0].reset();

    }
// Botón BORRAR
    $('#table-groupsAddress tbody').on( 'click', 'a.delete', function () {

});

// boton de Cancelar
    $('#Cancelgroup').on( 'click', function () {
        limpiaForm()
    });

});
