$(document).ready(function () {

// tabla de libreta de direcciones

var table_tipes = $('#table-tipes').DataTable(
    {
        "responsive": true,
        //"scrollX": true,
        //"language": idioma,
        "ajax": {
            "headers": {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
            "data":{ "tipo" : 1},
            "url": "/admin/produc/getdataTipes",
            "type": "POST",

        },
        createdRow: function ( row, data, dataIndex, cells ) {
            $($(row).find("td")[4]).addClass('text-white');
            $($(row).find("td")[4]).css("background-color",data.tipeColor);
            $($(row).find("td")[4]).attr('data-color',data.tipeColor);
        },
        "columns":
        [
            { data: 'id', title: 'id',"width": "20px" },
            { data: 'tipeName' ,title: 'Tipo'},
            { data: 'tipehourRange' , title: 'Rango de hora'},
            { data: 'tipeNote',title: 'Notas' },
            { data: null,title: 'tipeColor',
                render: function ( data, type, row ) {
                    retorno = data.tipeName + ' ~ '+ data.tipehourRange
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

    $('#table-tipes tbody').on( 'click', 'a.edit', function () {

        var data = table_tipes.row( $(this).parents("tr") ).data();
        table_tipes.$('tr.table-primary').removeClass('table-primary');
        $('#edit-color').addClass('table-primary');
        $(this).parents("tr").addClass('table-primary');
        $('#tipeAdd').removeClass('btn-info' );
        $('#tipeAdd').addClass('btn-warning ');
        $('#tipeAdd').html('Modificar tipo');

        $('#editar').val(data.id);
        $('#tipeName').val(data.tipeName);
        $('#tipehourRange').val(data.tipehourRange);
        $('#tipeNote').val(data.tipeNote);
        $('#tipeColor').val(data.tipeColor);

    });

// limpia formulario

    function limpiaForm() {
        $('#edit-color').removeClass('table-primary');
        table_tipes.$('tr.table-primary').removeClass('table-primary');
        $('#tipeAdd').addClass('btn-primary' );
        $('#tipeAdd').removeClass('btn-warning ');
        $('#tipeAdd').html('Añadir');
        $("#form-tipe")[0].reset();

    }

// Botón Cancelar
    $('#cancel').on( 'click', function (e) {
        e.preventDefault();
        limpiaForm()

    });

// acción de boton guardar TIPO

    $('#tipeAdd').on('click', function (e) {
        e.preventDefault();
        var editar          = $('#editar').val();
        var tipeName        = $('#tipeName').val();
        var tipehourRange   = $('#tipehourRange').val();
        if (tipeName !='')
        {
            //return false; // si retorna false significa que existe ese tipo
            $.ajax({
                url : '/admin/produc/getexisteTipes',
                headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type : 'POST',
                data: {
                    'editar'            : editar,
                    'tipeName'          : tipeName,
                    'tipehourRange'     : tipehourRange,
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
                            url : '/admin/produc/storeTipes',
                            headers: {
                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            data : {
                                'editar'            : $('#editar').val(),
                                'tipeName'          : $('#tipeName').val(),
                                'tipehourRange'     : $('#tipehourRange').val(),
                                'tipeColor'         : $('#tipeColor').val(),
                                'tipeNote'          : $('#tipeNote').val(),
                            },
                            type : 'POST',
                            dataType : 'json',
                            success : function(data)
                            {
                                if ($('#editar').val() == '' && data.message == true){
                                    var title = 'Nuevo tipo creado satisfactoriamente';
                                    limpiaForm()
                                    $('#table-tipe').DataTable().ajax.reload( null, false );

                                }else{
                                    var title = 'El tipo se ha modificado satisfactoriamente';
                                    limpiaForm()
                                    $('#table-tipe').DataTable().ajax.reload( null, false );

                                }

                                Swal.fire({
                                    icon: 'success',
                                    title: title,
                                    text: 'Los datos se han almacenado correctamente',
                                    footer: 'Tipos'
                                })
                                $('#table-tipes').DataTable().ajax.reload( null, false );
                            }
                        })

                    }
                }
            });

        }else{

            Swal.fire({
                icon: 'error',
                title: 'El campo de Nombre del tipo de ensayo no puede quedar vacio' ,
                text: 'No se han guardado los datos',
                footer: 'Tipos'
            })

        }

    })

// boton de borrar Tipo
    $('#table-tipes tbody').on( 'click', 'a.delete', function (e) {
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
                                title: 'Ha habido un error al eliminar el tipo de ensayo, No se han guardado los datos',
                                text: 'Contacte con el creador del Software',
                                footer: 'tipos'
                            })
                        }
                        $('#table-tipes').DataTable().ajax.reload( null, false );
                    }
                })
                Swal.fire(
                    'Eliminado!'
                )
            }
        })
    })

})
