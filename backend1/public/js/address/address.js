
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
    $('#selectaddressGroup').select2({
        multiple : true,
        //theme: "bootstrap4"
    });

// Contenido de las filas de row child
    function contenidoFila ( d ) {

        var tabla ='<div class="object-container">';
        tabla    +='<table class="table" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
        if (d.length<=0){tabla+='<tr><td>No hay usuarios asociados a este departamento<td></tr></table>'}
        else {
            var contacto = '';

            $.each(d.contacts, function (index, contact) {
                //console.log(contact.contactTipe)
                switch(contact.contactTipe) {
                    case '1' :
                      contactTipe = 'Teléfono';
                    break;
                    case '2' :
                        contactTipe = 'Otros';
                    break;
                    case '3' :
                        contactTipe = 'Email';
                    break;
                    case '4' :
                        contactTipe = 'Web';
                    break;
                    case '5' :
                        contactTipe = 'Móvil';
                    break;
                    default:
                        contactTipe = '';
                      // code block
                }
                contacto += contactTipe +' - '+ contact.contactNumber + ' <br\>'
            });

            var contenido = '';

            contenido += '<div class="">';
            contenido += '    <div class="row">'
            contenido += '        <div class="col-sm">';
            contenido += '        <p> Dirección: <span class="negrita">'+ d.addressStreet+'</span></p>';
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        <p> Lugar: <span class="negrita">'+d.addressPlace+'</span></p></td>'
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        <p> Numero: <span class="negrita">'+d.addressNumber+'</span></p></td>'
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        <p> Codigo Zip: <span class="negrita">'+d.addresszipCode+'</span></p></td>'
            contenido += '        </div>'
            contenido += '    </div>'

            contenido += '    <div class="row">'
            contenido += '        <div class="col-sm">';
            contenido += '        <p> Notas: <span class="negrita">'+d.addressNotes+'</span></p>';
            contenido += '        </div>'
            contenido += '        <div class="col-sm">';
            contenido += '        <p> Formas de contacto: <span class="negrita">'+contacto+'</span></p>';
            contenido += '        </div>'
            contenido += '    </div>'

            contenido += '</div>'
        }

        return contenido;
    }
// tabla que muestra los contactos  -

    var table_address = $('#table-address').DataTable(
        {
            //"responsive": false,

            "scrollX": true,
            "language": idioma,
            "ajax": {
                "headers": {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                "data":{ "tipo" : 1},
                "url": "/admin/address/getdataAddress",
                "type": "POST",

            },

            "columns":
            [

                {
                    "className":      'dt-control',
                    "orderable":      false,
                    "data":           null,
                    "defaultContent": '',
                    "width": "10px"
                },
                { data: 'id', title: 'id',"width": "20px" },
                { data: null ,title: 'Grupo',
                    render: function ( data, type, row ) {
                    var group = '';
                    if (data.addressgroups[0] === undefined) group = ''
                    else {
                        $.each(data.addressgroups, function (index, value) {

                            group += index+1 +' - '+ data.addressgroups[index].addressgroupName + ' <br\>'
                        });

                    }
                        return group;
                    },
                    visible: true
                },
                { data: 'addresslastName' , title: 'Nombre principal'},
                { data: 'addressfirstName',title: 'Nombre Secundario' },

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

// Añade el evento que escucha el CLICK sobre el boton details-control

    $('#table-address tbody').on('click', 'td.dt-control', function () {

        var tr = $(this).closest('tr');
        var row = table_address.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row

            row.child( contenidoFila(row.data()) ).show();
            tr.addClass('shown');
        }

    } );

    // acción de boton guardar dirección

    $('#addressAdd').on('click', function (e) {
        e.preventDefault();

        var editar = $('#editar').val();
        var addresslastName = $('#addresslastName').val();
        var addressfirstName = $('#addressfirstName').val();
        var contactArray = new Object();
        $('#contactList li').each(function (indice, elemento) {
            contacto = $(elemento).text().trim()
            key = contacto.split('     ')[0];
            valor = contacto.split('     ')[1];
            contactArray[key]=valor ;
        });
        const contactJson = JSON.stringify(Object.assign({}, contactArray))
        if (addresslastName !='')
        {
            //return false; // si retorna false significa que existe ese contacto
            $.ajax({
                url : '/admin/address/getexisteAddress',
                headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type : 'POST',
                data: {
                    'editar'            : $('#editar').val(),
                    'addresslastName'   : $('#addresslastName').val(),
                    'addressfirstName'  : $('#addressfirstName').val(),
                    'jsonaddressGroup'  :JSON.stringify($("#selectaddressGroup").val()),
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
                            url : '/admin/address/storeAddress',
                            headers: {
                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            data : {
                                'editar'            : $('#editar').val(),
                                'addresslastName'   : $('#addresslastName').val(),
                                'addressfirstName'  : $('#addressfirstName').val(),
                                'addressStreet'     : $('#addressStreet').val(),
                                'addressNumber'     : $('#addressNumber').val(),
                                'addressPlace'      : $('#addressPlace').val(),
                                'addresszipCode'    : $('#addresszipCode').val(),
                                'addressNotes'      : $('#addressNotes').val(),
                                'selectaddressGroup': JSON.stringify($("#selectaddressGroup").val()), // para enviarlo como un array-json
                                'contactJson'       : contactJson
                            },
                            type : 'POST',
                            dataType : 'json',
                            success : function(data)
                            {
                                limpiaForm()
                                Swal.fire({
                                    icon: 'success',
                                    title: data.message,
                                    text: 'Los datos se han almacenado correctamente',
                                    footer: 'Libreta de direcciones'
                                })
                                $('#table-address').DataTable().ajax.reload( null, false );
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

    $('#table-address tbody').on( 'click', 'a.edit', function () {
        limpiaForm()
        var addressgroup_id = [];
        var data = table_address.row( $(this).parents("tr") ).data();
        table_address.$('tr.table-primary').removeClass('table-primary');
        $('#edit-color').addClass('table-primary');
        $(this).parents("tr").addClass('table-primary');
        $('#addressAdd').removeClass('btn-info' );
        $('#addressAdd').addClass('btn-warning ');
        $('#addressAdd').html('Modificar contacto');

        $('#editar').val(data.id);
        $('#addresslastName').val(data.addresslastName);
        $('#addressfirstName').val(data.addressfirstName);
        $('#addressStreet').val(data.addressStreet);
        $('#addressNumber').val(data.addressNumber);
        $('#addressPlace').val(data.addressPlace);
        $('#addresszipCode').val(data.addresszipCode);
        $('#addressNotes').val(data.addressNotes);

        $.each(data.addressgroups, function (index, value) {
            addressgroup_id[index] = value.id ;
        })
        $("#selectaddressGroup").val(addressgroup_id).trigger('change.select2');

        $.each(data.contacts, function (index, contact) {
            //console.log(data.contacts)
            switch (contact['contactTipe']) {
                case '5':
                    tipo  = 'Móvil'
                    color = 'badge-danger';
                    icon  = "fa fa-mobile";
                break;
                case '1':
                    tipo  = 'Teléfono'
                    color = 'badge-info';
                    icon = 'fas fa-phone-volume';
                break;
                case '3':
                    tipo = 'Email';
                    color = 'badge-warning';
                    icon = "fa fa-envelope";
                break;
                case '4':
                    tipo  = 'Web';
                    color = 'badge-success';
                    icon = "fa fa-globe";
                break;
                case '2':
                    tipo  = 'Otros'
                    color = 'badge-danger';
                    icon = "fa fa-globe";
                break;
                default:
                    tipo  = 'Otros'
                    color = 'badge-danger';
                    icon = "fa fa-globe";
                break;
            }

            var li = ''
            li += '<li>'
            li += '     <span class="handle">'
            li += '      <i class="fas fa-ellipsis-v"></i>'
            li += '         <i class="fas fa-ellipsis-v"></i>'
            li += '     </span>'
            li += '     <small class="badge '+color+'"><i class="'+icon+'"></i><span class="key">  '+tipo+'</span></small>'
            li += '     <span class="text valor">'+contact["contactNumber"]+'</span>'
            li += '     <div class="tools ">'
            li += '         <a href="#" class=" delUl"><i class="fas fa-trash" style="color: red;"></i></a>'
            li += '     </div>'
            li += '</li>'
            $('#contactList').append(li) ;

        })


    });

    function limpiaForm() {
        $('#edit-color').removeClass('table-primary');
        table_address.$('tr.table-primary').removeClass('table-primary');
        //$(this).parents("tr").removeClass('table-primary');
        $('#addressAdd').addClass('btn-primary' );
        $('#addressAdd').removeClass('btn-warning ');
        $('#addressAdd').html('Añadir');
        $("#form-address")[0].reset();
        $("#selectaddressGroup").select2();
        $("#contactTipe").select2();
        $("#inputContact").val('');
        $('#contactList').empty();

    }
    // boton de borrar contacto
    $('#table-address tbody').on( 'click', 'a.delete', function (e) {
        e.preventDefault();
        var rowData = table_address.row( $(this).parents("tr") ).data();
        address_id  = rowData['id']

        Swal.fire({
            title: 'Estas seguro que quieres eliminar este contacto',
            text: "Esta acción no tiene marcha atras, se perderan todos los datos de este contacto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'SI, quiero borrar el contacto !'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url : '/admin/address/deleteAddress',
                    headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    type : 'POST',
                    data: {
                        'address_id': address_id,
                    },
                    dataType : 'json',
                    success : function(json) {
                        table_address.ajax.reload(null,false);
                        if (json.message == true){
                            limpiaForm()
                            Swal.fire({
                                icon: 'success',
                                title: 'Contacto Eliminado!',
                                text: 'Todos los datos de '+ json.address_name + ' han sido eliminados.',
                                footer: 'Address'
                            })
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'contacto NO Eliminado!',
                                text: json.address_name,
                                footer: 'Address'
                            })
                        }
                    }
                });
            }
        })
    });


    // Botón Cancelar
    $('#Cancel').on( 'click', function () {
        limpiaForm()

    });

    // botón para insertar contact al LI

    $('#ContactInsert').on( 'click', function (e) {
        e.preventDefault;
        var contact = $('#inputContact').val();
        var tipo    = $('#contactTipe').val();
        console.log (tipo)
        if (tipo != '' && contact != '' ) {
            switch (tipo) {
                case 'Móvil':
                    color = 'badge-danger';
                    icon = "fa fa-mobile";
                break;
                case 'Teléfono':
                    color = 'badge-info';
                    icon = 'fas fa-phone-volume';
                break;
                case 'Email':
                    color = 'badge-warning';
                    icon = "fa fa-envelope";
                break;
                case 'Web':
                    color = 'badge-success';
                    icon = "fa fa-globe";
                break;
                case 'Otros':
                    color = 'badge-danger';
                    icon = "fa fa-globe";
                break;

                default:
                    break;
            }

            var li = ''
            li += '<li>'
            li += '     <span class="handle">'
            li += '      <i class="fas fa-ellipsis-v"></i>'
            li += '         <i class="fas fa-ellipsis-v"></i>'
            li += '     </span>'
            li += '     <small class="badge '+color+'"><i class="'+icon+'"></i><span class="key">  '+tipo+'</span></small>'
            li += '     <span class="text valor">'+contact+'</span>'
            li += '     <div class="tools ">'
            li += '         <a href="#" class=" delUl"><i class="fas fa-trash" style="color: red;"></i></a>'
            li += '     </div>'
            li += '</li>'

            $('#contactList').append(li) ;
            $('#inputContact').val('')
        }
    });

    // boton para eliminar contacto del LI

    $('#contactList').on( 'click', 'a.delUl', function (e) {
        e.preventDefault();
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
                Swal.fire(
                    'Eliminado!'
                )
            }
        })
    })

});
