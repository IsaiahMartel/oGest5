// idioma para la datatable
var idioma =

    {
        "decimal": ",",
        "thousands": ".",
        "sProcessing": "Procesando...",
        "sLengthMenu": "Mostrar _MENU_ registros",
        "sZeroRecords": "No se encontraron resultados",
        "sEmptyTable": "Ningún dato disponible en esta tabla",
        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix": "",
        "sSearch": "Buscar:",
        "sUrl": "",
        "sInfoThousands": ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst": "Primero",
            "sLast": "Último",
            "sNext": "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
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


$(document).ready(function() {

    // Inicializando Select2
    $('#selectSeasonName').select2();

    // detecta cambio en SELECT de Temporada

    $("#selectSeasonName").change(function() {
        table_projects.ajax.reload();
        table_published.ajax.reload();
        table_noPublished.ajax.reload();
    });


    // tabla que muestra los proyectos  -

    var table_projects = $('#table-projects').DataTable({
        "scrollX": true,
        "language": idioma,
        "ajax": {
            "headers": {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            "data": function(d) {
                //d.selectSeasonName = $('#selectSeasonName').val(),
                d.projectLevel = 1
            },
            "url": "/admin/publication/getdataProjects",
            "type": "POST",
        },
        'columnDefs': [{
            'targets': 0,
            'searchable': false,
            'orderable': false,
            'className': 'dt-body-center',
            'render': function(data, type, full, meta) {
                return '<input type="checkbox" name="id[]" class="projects" value="' +
                    $('<div/>').text(data).html() + '">';
            }
        }],
        "columns": [

            { data: 'id', title: '<input name="select_all" value="1" id="table-projects-select-all" type="checkbox" />' },
            { data: 'projectDateIni', title: 'projectDateIni', visible: false },
            { data: 'id', title: 'id' },
            { data: 'events.eventName', title: 'Proyecto' },
            {
                data: 'updated_at',
                title: 'Fecha actualización',
                render: function(data, type, row) {
                    return moment(data).format('DD/MM/YYYY')
                },
            },
            {
                data: 'created_at',
                title: 'Fecha creación',
                render: function(data, type, row) {
                    return moment(data).format('DD/MM/YYYY')
                },
            },

        ],

        order: [
            [1, 'asc']
        ]
    }).draw();

    // tabla que muestra los Publicados  -

    var table_published = $('#table-published').DataTable({
        "scrollX": true,
        "language": idioma,

        "ajax": {
            "headers": {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            "data": function(d) {
                //d.selectSeasonName = $('#selectSeasonName').val(),
                d.projectLevel = 0

            },
            "url": "/admin/publication/getdataPublished",
            "type": "POST",

        },
        'columnDefs': [{
            'targets': 0,
            'searchable': false,
            'orderable': false,
            'className': 'dt-body-center',
            'render': function(data, type, full, meta) {
                return '<input type="checkbox" name="id[]" class="published" value="' +
                    $('<div/>').text(data).html() + '">';
            }
        }],
        "columns": [
            { data: 'id', title: '<input name="select_all" value="1" id="table-published-select-all" type="checkbox" />' },
            { data: 'projectDateIni', title: 'projectDateIni', visible: false },
            { data: 'id', title: 'id', visible: false },
            { data: 'events.eventName', title: 'Proyecto' },
            { data: 'projectRevision', title: 'Versión' },
            {
                data: 'updated_at',
                title: 'Fecha actualización',
                render: function(data, type, row) {
                    return moment(data).format('DD/MM/YYYY')
                },
            },
        ],
        order: [
            [1, 'asc']
        ]
    }).draw();

    // tabla que muestra los NO Publicados  -

    var table_noPublished = $('#table-noPublished').DataTable({
        "scrollX": true,
        "language": idioma,

        "ajax": {
            "headers": {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            "data": function(d) {
                //d.selectSeasonName = $('#selectSeasonName').val()

            },
            "url": "/admin/publication/getdatanoPublished",
            "type": "POST",

        },
        /*
        'columnDefs': [{
            'targets': 0,
            'searchable':false,
            'orderable':false,
            'className': 'dt-body-center',
            'render': function (data, type, full, meta){
                return '<input type="checkbox" name="id[]" class="noPublished" value="'
                   + $('<div/>').text(data).html() + '">';
            }
         }],
        */
        "columns": [
            { data: 'projectDateIni', title: 'projectDateIni', visible: false },
            { data: 'id', title: 'id', visible: true },
            { data: 'events.eventName', title: 'Proyecto' },
            {
                data: 'updated_at',
                title: 'Fecha actualización',
                render: function(data, type, row) {
                    return moment(data).format('DD/MM/YYYY')
                },
            },
        ],
        order: [
            [1, 'asc']
        ]
    }).draw();

    // Boton para activar todos los check de la tabla projects
    $('#table-projects-select-all').on('click', function() {
        var rows = table_projects.rows({ 'search': 'applied' }).nodes();
        $('input[type="checkbox"].projects', rows).prop('checked', this.checked);
    });

    // Boton para activar todos los check de la tabla published
    $('#table-published-select-all').on('click', function() {
        var rows = table_published.rows({ 'search': 'applied' }).nodes();
        $('input[type="checkbox"].published', rows).prop('checked', this.checked);
    });

    // Para poner en indeterminado si se marca todos y despues quitas alguno
    $('#table_projects tbody').on('change', 'input[type="checkbox"]', function() {
        if (!this.checked) {
            var el = $('#select-all').get(0);
            if (el && el.checked && ('indeterminate' in el)) {
                el.indeterminate = true;
            }
        }
    });

    //Accion de pulsar el boton "publicar", recorre los checkbox
    $('#buttonPublication').on('click', function(e) {
        e.preventDefault();
        marcados = [];
        table_projects.$('input[type="checkbox"].projects').each(function() {
            if (this.checked) {
                marcados.push(this.value)
            }
        });
        if (marcados.length > 0) {
            $.ajax({
                url: '/admin/publication/publicate',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: {
                    'project_ids': JSON.stringify(marcados),
                },
                type: 'POST',
                dataType: 'json',
                success: function(data) {
                    if (data.message == true) {
                        table_projects.ajax.reload();
                        table_published.ajax.reload();
                        table_noPublished.ajax.reload();
                        Swal.fire({
                            icon: 'success',
                            title: data.texto,
                            text: data.text2,
                            footer: 'Archivo'
                        });

                        // llamo a la funcion para generar evento en los móviles
                        $.ajax({
                                url: '/api/push',
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                },
                                data: {
                                    'projects': data.proyectos,
                                },
                                type: 'GET',
                                dataType: 'json',
                                success: function(data) {
                                    alert(data)
                                }
                            })
                            // fin de la llamada por ajax a la funcion enviar evento a los móviles
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
        }
    });


    //Accion de pulsar el boton "publicar".
    $('#buttonDesPublication').on('click', function(e) {
        e.preventDefault();
        marcados = [];
        table_published.$('input[type="checkbox"].published').each(function() {
            if (this.checked) {
                marcados.push(this.value)
            }

        });

        if (marcados.length > 0) {
            Swal.fire({
                title: 'Estas seguro?',
                text: "Si despublicas este proyecto se elimiará dicha revisión !",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Despublicar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: '/admin/publication/desPublicate',
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        data: {
                            'project_ids': JSON.stringify(marcados),
                        },
                        type: 'POST',
                        dataType: 'json',
                        success: function(data) {
                            if (data.message == true) {
                                table_published.ajax.reload();
                                table_noPublished.ajax.reload();
                                Swal.fire({
                                    icon: 'success',
                                    title: data.texto,
                                    text: data.text2,
                                    footer: 'Publicaciones'
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: data.texto,
                                    text: data.texto2,
                                    footer: 'Publicaciones'
                                })
                            }
                        }
                    })
                }
            })
        }
    });

    function imprime(ids, projectLevel) {
        if (ids.length > 0) {
            Swal.fire({
                title: 'La descarga se iniciará pronto, tu fichero se almacenará en la carpeta de descargas',
                text: 'Esta ventana se cerrará automaticamente cuando el proceso haya concluido, sea paciente',
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                },
            });

            // plugin para enviar fichero solicitado por ajax
            $.fileDownload('/admin/print/printprojectMultiple', {
                httpMethod: "POST",
                data: {
                    "_token": $('meta[name="csrf-token"]').attr('content'),
                    'project_id': JSON.stringify(ids),
                    'projectLevel': projectLevel
                },

                successCallback: function(url) {
                    //$("div#loading").hide();
                    //alert('ok');
                    //response.setHeader("Set-Cookie", "fileDownload=false; path=/");
                    swal.close()
                    Swal.fire({
                        icon: 'success',
                        title: 'Fichero descargado',
                        text: 'Ya puede visualizar el fichro en la carperta de descarga',
                    })
                },

                failCallback: function(responseHtml, url) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ERROR, avisa al creador del Software',
                    })
                }
            })
        } else
            return false; //this is critical to stop the click event which will trigger a normal file download!
    }

    //Accion de pulsar el boton "ImprimirMultiple en WORD", recorre los checkbox PROJECTS LEVEL 1
    $('#projectPrintWord').on('click', function() {
        marcados = [];
        table_projects.$('input[type="checkbox"].projects').each(function() {
            if (this.checked) {
                marcados.push(this.value)
            }
        });
        imprime(marcados, 1)

    })

    //Accion de pulsar el boton "ImprimirMultiple en WORD", recorre los checkbox PUBLICADOS LEVEL 0
    $('#publichedPrintWord').on('click', function(e) {
        marcados = [];
        table_published.$('input[type="checkbox"].published').each(function() {
            if (this.checked) {
                marcados.push(this.value)
            }
        });
        alert('published')
        imprime(marcados, 0)
    })

})