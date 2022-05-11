

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




// tabla que muestra los contactos  -

var table_address = $('#table-address').DataTable(
    {
        //"responsive": false,

        //"scrollX": true,
        "language": idioma,
        "ajax": {
            "headers": {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
            "data":{ "tipo" : 1},
            "url": "/admin/address/getdataAddress",
            "type": "POST",

        },
        columnDefs: [
            {
                targets: '_all',
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).addClass('draggable_td');
                }
            }
        ],
        drawCallback: function () {
            $("#table-address .draggable_td").draggable({
                zIndex        : 1070,
                revert        : true, // vuelve a su sitio de partida
                revertDuration: 0,  //  original position after the drag
                //helper: 'clone'
                helper: function () {
                    console.log('drag')
                    var selected = $('td.selectedCell');
                    if (selected.length === 0) {
                        selected = $(this).addClass('selectedCell');
                    }
                    var container = $('<div/>').attr('id', 'draggingContainer');
                    container.append(selected.clone().removeClass("selectedCell"));
                    return container;
                }
            });
        },
        "columns":
        [
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

        ],
            order: [[1, 'asc']]

    });

    $("#project").droppable({
        drop: function (event, ui) {
            console.log('drop', ui)
            var draggable = ui.draggable;

            var draggableId = ui.draggable.attr("value");
            var droppableId = $(this).attr("value");
            //var draggableId = ui.draggable.attr("id");
            console.log (draggableId +' - '+droppableId);
            $('#droppable-visibles').append('<li>' + ui.helper.children().html() + '</li>');
            //$('#droppable-visibles').append('<li>' + ui.helper.children().html() + '</li>');
            //$('.tablegrid td').removeClass("selectedCell");
        }
    });


})

