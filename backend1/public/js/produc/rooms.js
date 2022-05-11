$(document).ready(function () {

// tabla de libreta de direcciones

var table_rooms = $('#table-rooms').DataTable(
    {
        "responsive": true,
        //"scrollX": true,
        //"language": idioma,
        "ajax": {
            "headers": {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
            "data":{ "tipo" : 1},
            "url": "/admin/produc/getdataRooms",
            "type": "POST",

        },
        createdRow: function ( row, data, dataIndex, cells ) {
            $($(row).find("td")[4]).addClass('text-white');
            $($(row).find("td")[4]).css("background-color",data.roomColor);
            $($(row).find("td")[4]).attr('data-color',data.roomColor);
        },
        "columns":
        [
            { data: 'id', title: 'id',"width": "20px" },
            { data: 'roomName' ,title: 'Nombre de Sala'},
            { data: 'roomNote' , title: 'Notas sobre la sala'},
            { data: 'roomAcronym',title: 'Acronimo de la sala' },
            { data: null,title: 'roomColor',
                render: function ( data, type, row ) {
                    retorno = data.roomName + ' ~ '+ data.roomAcronym
                    return retorno;
                },
            },
            { data: null,title : 'Acciones',  orderable: false, defaultContent: 'action', width: "10px" ,
                render:
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

    });

// añade la funcionalidad de edición del coompositor

    $('#table-rooms tbody').on( 'click', 'a.edit', function () {

        var data = table_rooms.row( $(this).parents("tr") ).data();
        table_rooms.$('tr.table-primary').removeClass('table-primary');
        $('#edit-color').addClass('table-primary');
        $(this).parents("tr").addClass('table-primary');
        $('#roomAdd').removeClass('btn-info' );
        $('#roomAdd').addClass('btn-warning ');
        $('#roomAdd').html('Modificar Sala');

        $('#editar').val(data.id);
        $('#roomName').val(data.roomName);
        $('#roomAcronym').val(data.roomAcronym);
        $('#roomNote').val(data.roomNote);
        $('#roomColor').val(data.roomColor);

    });

// limpia formulario

    function limpiaForm() {
        $('#edit-color').removeClass('table-primary');
        table_rooms.$('tr.table-primary').removeClass('table-primary');
        $('#roomAdd').addClass('btn-primary' );
        $('#roomAdd').removeClass('btn-warning ');
        $('#roomAdd').html('Añadir');
        $("#form-room")[0].reset();

    }

// Botón Cancelar
    $('#cancel').on( 'click', function (e) {
        e.preventDefault();
        limpiaForm()

    });

// acción de boton guardar ROOM

    $('#roomAdd').on('click', function (e) {
        e.preventDefault();
        var editar = $('#editar').val();
        var roomName  = $('#roomName').val();
        var roomAcronym = $('#roomAcronym').val();
        if (roomName !='' && roomAcronym != '')
        {
            //return false; // si retorna false significa que existe ese tipo
            $.ajax({
                url : '/admin/produc/getexisteRooms',
                headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type : 'POST',
                data: {
                    'editar'            : editar,
                    'roomName'          : roomName,
                    'roomAcronym'     : roomAcronym,
                },
                dataType : 'json',
                success : function(json) {

                    if (json['message'] == 'existe'){
                        Swal.fire({
                            icon: 'error',
                            title:  json.tittle  ,
                            text: json.text,
                            footer: 'Tipos'
                        })

                    } else{
                        $.ajax({
                            url : '/admin/produc/storeRoom',
                            headers: {
                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            data : {
                                'editar'            : $('#editar').val(),
                                'roomName'          : $('#roomName').val(),
                                'roomAcronym'       : $('#roomAcronym').val(),
                                'roomColor'         : $('#roomColor').val(),
                                'roomNote'          : $('#roomNote').val(),
                            },
                            type : 'POST',
                            dataType : 'json',
                            success : function(data)
                            {
                                if ($('#editar').val() == '' && data.message == true){
                                    var title = 'Nuevo sala creada satisfactoriamente';
                                    limpiaForm()
                                    $('#table-room').DataTable().ajax.reload( null, false );

                                }else{
                                    var title = 'La sala se ha modificado satisfactoriamente';
                                    limpiaForm()
                                    $('#table-room').DataTable().ajax.reload( null, false );

                                }

                                Swal.fire({
                                    icon: 'success',
                                    title: title,
                                    text: 'Los datos se han almacenado correctamente',
                                    footer: 'Tipos'
                                })
                                $('#table-rooms').DataTable().ajax.reload( null, false );
                            }
                        })

                    }
                }
            });

        }else{

            Swal.fire({
                icon: 'error',
                title: 'Los campos de Nombre de sala ni Acronimo de sala pueden quedar vacio' ,
                text: 'No se han guardado los datos',
                footer: 'Tipos'
            })

        }

    })

// boton de borrar Tipo
    $('#table-rooms tbody').on( 'click', 'a.delete', function (e) {
        e.preventDefault();
        var tipe_id = $(this).attr('id-delete');
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
                $(this).closest('li').remove();
                $.ajax({
                    url: '/admin/produc/deleteTipe',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data: {
                        'tipe_id': tipe_id
                    },
                    type: 'POST',
                    dataType: 'json',
                    success: function (data) {
                        if (data.message == true) {

                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: 'Ha habido un error al eliminar la sala, No se han guardado los datos',
                                text: 'Contacte con el creador del Software',
                                footer: 'tipos'
                            })
                        }
                        $('#table-rooms').DataTable().ajax.reload( null, false );
                    }
                })
                Swal.fire(
                    'Eliminado!'
                )
            }
        })
    })

})
