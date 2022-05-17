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

    //inicializo el movimiento de <LI> y detecto el movimiento de elementos

    $("#listComp").sortable({
        placeholder: "ui-state-highlight",
        update: function( event, ui )
        {
            var ids_order = $(this).sortable('toArray', { attribute: 'id' });
            $.ajax ({
                url : '/admin/archivo/storeOrder',
                headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data : {

                    'ids_order' : JSON.stringify(ids_order)

                },
                type : 'POST',
                dataType : 'json',
                success : function(data)
                {
                    if (data.message == true) {

                    }else{
                        Swal.fire({
                        icon: 'success',
                            title: 'Ha habido un error al intertar la obra, No se han guardado los datos',
                            text: 'Contacte con el creador del Software',
                            footer: 'Archivo'
                        })
                    }

                }
            })
            //alert("New position: " + ui.item.index());
            //console.log(idsInOrder);
        }
     });

    // inicializo campos y card cerrados
    //$('#selectEventName').prop('disabled','disabled');
    //$('#selectStatus').prop('disabled','disabled');

    $('#projectLevel').prop('disabled','disabled');
    $('.changeState').prop('disabled','disabled');
    $('.sendAlert').prop('disabled','disabled');
    $('#Cancel').prop('disabled','disabled');
    $('#obras').CardWidget('collapse') ;
    $('#integrantes').CardWidget('collapse') ;
    $('#composicion').CardWidget('collapse') ;
    $('#card-shedule').CardWidget('collapse') ;
    $('#buttonPrints').addClass('disabled');

    // detecta cambio de temporada

    // $("#selectSeasonName").change(function(){
    //     $('#selectEventName').prop('disabled','');
    //     //$('#selectSeasonName').prop('disabled','disabled');
    //     //$('#selectStatus').prop('disabled','');

    //     $("#selectEventName").select2({
    //         placeholder: "seleccione un evento",
    //         ajax: {
    //             headers: {
    //                     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //                 },
    //             url: "/admin/archivo/getdataEvent",
    //             data: {
    //                 'selectSeasonId' : $('#selectSeasonName').val(),
    //                 'projectLevel'   : $('#projectLevel').val()
    //             },
    //             type: "POST",
    //             dataType: 'json',
    //             processResults: function (data) {
    //                 return {
    //                     results: $.map(data.projects, function (item) {
    //                         return {
    //                             text: item.events.eventName ,
    //                             id: item.event_id
    //                         }
    //                     })
    //                 };
    //             },
    //         }
    //     });
    // });



    // boton para cambiar de estado el proyecto (sustitulle al SELECT2)
    $('.changeState').on('click',function (e) {
        e.preventDefault();
        Swal.fire({
            title: "Cambio de estado",
            text: "Añade motivo por el que has cambiado de estado",
            input: 'text',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url : '/admin/archivo/changeState',
                    headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data : {
                        'season_id'      : $('#selectSeasonName').val(),
                        'event_id'       : $('#selectEventName').val(),
                        'notes'          : result.value,
                        'projectLevel'   : 1,
                    },
                    type : 'POST',
                    dataType : 'json',
                    success : function(data)
                    {
                        if (data.projectArchivo == 'Proceso') // entra aqui porque estaba en Terminado y cambió a Proceso
                        {
                            limpiaCuadrosTerminado();
                            $('#terminado').hide( "drop", { direction: "left" }, "slow" );
                            setTimeout(function() {
                                $('#proceso').show( "drop", { direction: "left" }, "slow" );
                            },800);
                            $("#selectEventName").trigger('change')
                        }else {
                            limpiaCuadrosTerminado();
                            $("#selectEventName").trigger('change')
                        }


                    }
                })
            }
        });



    })
    // limpia las cajas de TERMINADO y la tabla de Shedule que está en proceso

    function limpiaCuadrosTerminado()
    {
        $('#listComp').children('li').remove(); // vacia LI de Obras SOLO PARA ARCHIVO
        $('.listComp').children('li').remove(); // vacia LI de Obras
        $('.instrument-list').children('li').remove();   // vacia instrumentos Key, per, voi
        $('.droppable-project').children('li').remove(); // vacia LI de Obras en TERMINADOS
        $('.droppable-extra').children('li').remove();   // vacia LI de Obras en TERMINADOS
        $('.table_sheduleTerminado').DataTable().clear().draw(); //VAcia tabla de Shedule en TERMINADOS
        $('.table_sheduleTerminado').DataTable().destroy();      //VAcia tabla de Shedule en TERMINADOS
    }

    //detecta cambio de evento
    $("#selectEventName").change(function(){
        $('#selectEventName').prop('disabled','disabled');
        $('.changeState').prop('disabled','');
        $('.sendAlert').prop('disabled','');
        $('#Cancel').prop('disabled','');
        $('#projects').CardWidget('expand') ;
        //$('#integrantes').CardWidget('expand') ;
        $('#composicion').CardWidget('expand') ;
        $('#obras').CardWidget('expand') ;
        if ($('#selectEventName').val() > 0) {
            // busca el estado en que está el projecto para ocultar/mostrar el div
            $.ajax({
                url : '/admin/archivo/cargaEstado',
                headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data : {
                    //'season_id'      : $('#selectSeasonName').val(),
                    'event_id'       : $('#selectEventName').val(),
                    'projectLevel'   : 1,
                },
                type : 'POST',
                dataType : 'json',
                success : function(data)
                {
                    if (data.projectArchivo == 'Terminado'){
                        cargaPlaylistTerminado( $('#selectSeasonName').val(),$('#selectEventName').val(),$('#projectLevel').val(),false);
                        rellenaSheduleTerminado($('#selectSeasonName').val(),$('#selectEventName').val(),$('#projectLevel').val());
                        cargaIntegrantesTerminado($('#selectSeasonName').val(),$('#selectEventName').val(),$('#projectLevel').val());
                        cargaInstrumentPlaylistTerminado($('#selectSeasonName').val(),$('#selectEventName').val(),$('#projectLevel').val()) // pone los instrument percusion , keyboard y voices en TERMINADOS.blade
                        $('#proceso').hide( "drop", { direction: "left" }, "slow" );
                        setTimeout(function() {
                            $('#terminado').show( "drop", { direction: "left" }, "slow" );
                        },800);
                    }else{
                        rellenaSheduleTerminado($('#selectSeasonName').val(),$('#selectEventName').val(),$('#projectLevel').val());
                        cargaPlaylist( $('#selectSeasonName').val(),$('#selectEventName').val(),$('#projectLevel').val(),true); // carga las obras que se van a tocar
                        cargaIntegrantesTerminado($('#selectSeasonName').val(),$('#selectEventName').val(),$('#projectLevel').val());

                        $('#buttonPrints').removeClass('disabled');
                        //$('.btn-group').remove() // quito los botones de guardar y cancelar de la tabla shedule
                        //$('#table-shedule').DataTable().column( 5 ).visible(false); // oculto la columna de las acciones (botones)
                    }
                }
            })
        }
    })

    /**  funciones de carga de obras que integran el proyecto **/
    // funcion para cargar la lista de obras en un LI

    function cargaPlaylist(season_id,event_id,projectLevel,action=false) {

        $.ajax({
            url : '/admin/archivo/cargaPlaylist',
            headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data : {
                //'season_id'      : $('#selectSeasonName').val(),
                //'event_id'       : $('#selectEventName').val(),
                'season_id'    : season_id,
                'event_id'     : event_id,
                'projectLevel' : projectLevel,
                'action'       : action
            },
            type : 'POST',
            dataType : 'json',
            success : function(data)
            {
                //alert(action)
                if (data.message == true) {
                    $('#project_id').val(data.project_id);
                /*  Swal.fire({
                        icon: 'success',
                        title: 'datos del proyecto cargado',
                        text:  $('#selectSeasonName :selected').text() +' - '+ $('#selectEventName :selected').text(),
                        footer: 'Proyecto'
                    })*/
                    $.each(data.playlists, function( index, value ) {
                        var composerLastname  = (value.works ==null ) ? '' : value.works.composers.composerLastname ;
                        var composerFirstname = (value.works ==null ) ? '' : value.works.composers.composerFirstname ;
                        var workDuration      = (value.workDuration ==null ) ? '' : value.workDuration ;
                        var work_id           = (value.work_id == null ) ? '' : value.work_id ;
                        var workName          = value.workName ;
                        var playlist_id       = value.id;
                        var playlist_string   = value.playlistString;
                        li = creaLi(value,composerLastname,composerFirstname,workName,workDuration,playlist_id,playlist_string,work_id,true)
                        $('#listComp').append(li); //añado el LI al UL
                        //$('#listCompTerminado').append(li); //añado el LI al UL
                        //console.log (li)
                    });
                }else{
                    Swal.fire({
                    icon: 'success',
                        title: 'Ha habido un error al intertar acceder al proyecto',
                        text: 'Contacte con el creador del Software',
                        footer: 'Proyecto'
                    })
                }

            }
        })
    }


    // detecta cambio en SELECT de compositor

    $("#selectComposer").change(function(){
        table_works.ajax.reload();
    });

    // rellena la tabla de Obras
    var table_works = $('#table-works').DataTable(
    {
        //"responsive": false,
        //"autoWidth": false,
        "language": idioma,
        "ajax": {
            "headers": {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
            "data": function ( d ) {
                d.selectIdComposer = $('#selectComposer').val() ,
                d.selectIdCatalog = $('#selectCatalog').val()
            },
            "url": "/admin/archivo/getdataWork",
            "type": "POST",

        },

        "columns":
        [

            { data: 'id', title: 'id',visible: false},
            { data: 'workName' , title: 'Nombre de Obra'},
            { data: null , title: 'Instrumentación','orderable':false,
                render: function ( data, type, row )
                {
                    return pintaPlantilla(data);
                }
            },
            { data: null,title : '',  orderable: false, "width": "25px", defaultContent: 'action',
                render:
                function(data,type,row){
                    var action = "<div class='btn-group'>" ;
                    action += "<a href='#' class='add'><i class='far fa-arrow-alt-circle-right'></i></a>";
                    action += "</div>" ;
                    return  action ;
                },
            },
        ],
        order: [[1, 'asc']]


    }).draw();

    // Acción de añadir elemento (Obra a la Lista) Boton de flechita a la derecha

    $('#table-works tbody').on( 'click', 'a.add', function (e) {
        e.preventDefault();
        var obra = table_works.row( $(this).parents("tr") ).data();
        console.log (obra)
        // guardo la obra en la base de datos
        $.ajax({
            url : '/admin/archivo/storePlaylist',
            headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data : {
                'season_id'      : $('#selectSeasonName').val(),
                'event_id'       : $('#selectEventName').val(),
                'projectLevel'   : $('#projectLevel').val(),
                'datosSerialize' : JSON.stringify(obra),

            },
            type : 'POST',
            dataType : 'json',
            success : function(data)
            {
                if (data.message == true) {
                    /*Swal.fire({
                        icon: 'success',
                        title: 'La obra se ha registrado en el proyecto correctamente',
                        text: 'Actualizado el proyecto',
                        footer: 'Proyecto'
                    })*/
                    //console.log(data)
                    var composerLastname  = obra.composers.composerLastname;
                    var composerFirstname = obra.composers.composerFirstname;
                    var workName          = obra.workName;
                    var workDuration      = (obra.workDuration == null)  ? '??:??' : obra.workDuration;
                    var work_id           = data.id;
                    var playlist_id       = data.playlist_id;
                    //var playlist_string   = obra.violin1+','+obra.violin2+','+obra.viola+','+obra.cello+','+obra.bass ;
                    if ((obra.violin1 == null) && (obra.violin2 == null) && (obra.viola == null) && (obra.cell == null) && (obra.bass == null))  playlist_string ='por determinar'
                    else playlist_string   = obra.violin1+'/'+obra.violin2+'/'+obra.viola+'/'+obra.cello+'/'+obra.bass ;
                    //var playlist_string   = (obra.violin1 == null) ? '' : obra.violin1 +','+ (obra.violin2 == null) ? ' ' : obra.violin2 +','+(obra.viola == null) ? ' ' : obra.viola +','+(obra.cell == null) ? ' ' : obra.cell +','+(obra.bass == null) ? ' ' : obra.bass ;
                    li = creaLi(obra,composerLastname,composerFirstname,workName,workDuration,playlist_id,playlist_string,work_id,true)

                    $('#listComp').append(li); //añado el LI al UL

                }else{
                    Swal.fire({
                    icon: 'success',
                        title: 'Ha habido un error al intertar la obra, No se han guardado los datos',
                        text: 'Contacte con el creador del Software',
                        footer: 'Archivo'
                    })
                }

            }
        })
    })

    // botón para añadir PAUSA a la lista de Obras

    $('#pausa').on('click',function (e) {
        e.preventDefault();
        var obra = '{"id":"1","workName": "PAUSA", "composers": {"composerLastname": "", "composerFirstname": ""}}';
        $.ajax({
            url : '/admin/archivo/storePlaylist',
            headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data : {
                'season_id'      : $('#selectSeasonName').val(),
                'event_id'       : $('#selectEventName').val(),
                'projectLevel'   : $('#projectLevel').val(),
                'datosSerialize' : obra,
            },
            type : 'POST',
            dataType : 'json',
            success : function(data)
            {
                if (data.message == true) {

                    var composerLastname  = '';
                    var composerFirstname = '';
                    var workName          = 'PAUSA';
                    var workDuration      = '';
                    var work_id           = '';
                    var playlist_id       = data.playlist_id;
                    var playlist_string   = '' ;
                    li = creaLi(obra,composerLastname,composerFirstname,workName,workDuration,playlist_id,playlist_string,work_id)
                    $('#listComp').append(li); //añado el LI al UL

                }else{
                    Swal.fire({
                    icon: 'success',
                        title: 'Ha habido un error al intertar la obra, No se han guardado los datos',
                        text: 'Contacte con el creador del Software',
                        footer: 'Archivo'
                    })
                }

            }
        })

    })

    // botón para eliminar elemento de la lista de Obras

    $('#listComp').on( 'click', 'a.delList', function (e) {
        e.preventDefault();
        playlist_id= $(this).parents('li').attr('id') // id del elemento (LI) clicado
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
                    url: '/admin/archivo/deletePlaylist',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data: {
                        'playlist_id': playlist_id
                    },
                    type: 'POST',
                    dataType: 'json',
                    success: function (data) {
                        if (data.message == true) {

                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: 'Ha habido un error al eliminar la obra del proyecto, No se han guardado los datos',
                                text: 'Contacte con el creador del Software',
                                footer: 'Archivo'
                            })
                        }

                    }
                })

                Swal.fire(
                    'Eliminado!'
                )
            }
        })

    })

    // Abre el modal para editar instrumentos

    $('#listComp').on( 'click', 'a.edit', function (e) {
        e.preventDefault();
        playlist_id= $(this).parents('li').attr('id') // id del elemento (LI) clicado
        $('#editar').prop('playlist_id',playlist_id)
        $('#modal-cabecera').text('Instrumenación')
        $('#modal-workplaylist').modal('toggle');
        $(".table-instruments > tbody").empty();
        loaddataPlaylist(playlist_id);
    })

    function loaddataPlaylist(playlist_id) {

        $.ajax({
            url : '/admin/archivo/loaddataPlaylist',
            headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data : {
                'playlist_id' : playlist_id
            },
            type : 'POST',
            dataType : 'json',
            success : function(data)
            {
                //console.log (data)
                if (data.message == true) {
                    //relleno todos los campos de instrumentos
                    $('#editar').val(data.work_id);
                    $.each(data.playlist, function (campo, value) {
                        $('#'+campo).val(value);
                    });
                    //rellenando percussion
                    $.each(data.playlist.perplaylists, function (index, value) {
                        fila  = '<tr>';
                        fila += '    <td class="d-none">';
                        fila += '         <p>'+value.id +'</p>';
                        fila += '    </td>';
                        fila += '    <td>';
                        fila += '         <p>'+value.instrumentCode +'</p>';
                        fila += '    </td>';
                        fila += '    <td>';
                        fila += '         <p>'+value.instrumentName +'</p>';
                        fila += '    </td>';
                        fila += '    <td>';
                        fila += '        <a id='+value.id+' href="#" class="btn btn-tool btn-sm del">';
                        fila += '            <i class="far fa-trash-alt"></i>';
                        fila += '        </a>';
                        fila += '    </td>';
                        fila += '</tr>';
                        $('#table-percussion-plus>tbody').append(fila)
                    });
                    //rellenando keyboard
                    $.each(data.playlist.keyplaylists, function (index, value) {
                        fila  = '<tr>';
                        fila += '    <td class="d-none">';
                        fila += '         <p>'+value.id +'</p>';
                        fila += '    </td>';
                        fila += '    <td>';
                        fila += '         <p>'+value.instrumentCode +'</p>';
                        fila += '    </td>';
                        fila += '    <td>';
                        fila += '         <p>'+value.instrumentName +'</p>';
                        fila += '    </td>';
                        fila += '    <td>';
                        fila += '        <a id='+value.id+' href="#" class="btn btn-tool btn-sm del">';
                        fila += '            <i class="far fa-trash-alt"></i>';
                        fila += '        </a>';
                        fila += '    </td>';
                        fila += '</tr>';
                        $('#table-keyboard-plus').append(fila)
                    });
                    //rellenando voices
                    $.each(data.playlist.voiplaylists, function (index, value) {
                        fila  = '<tr>';
                        fila += '    <td class="d-none">';
                        fila += '         <p>'+value.id +'</p>';
                        fila += '    </td>';
                        fila += '    <td>';
                        fila += '         <p>'+value.instrumentCode +'</p>';
                        fila += '    </td>';
                        fila += '    <td>';
                        fila += '         <p>'+value.instrumentName +'</p>';
                        fila += '    </td>';
                        fila += '    <td>';
                        fila += '        <a id='+value.id+' href="#" class="btn btn-tool btn-sm del">';
                        fila += '            <i class="far fa-trash-alt"></i>';
                        fila += '        </a>';
                        fila += '    </td>';
                        fila += '</tr>';
                        $('#table-voice-plus').append(fila)
                        //$('#table-keyboard-plus').append(fila)
                    });


                }else{
                    Swal.fire({
                    icon: 'success',
                        title: 'Ha habido un error al cargar la obra , No se han guardado ningun datos',
                        text: 'Contacte con el creador del Software',
                        footer: 'Archivo'
                    })
                }

            }
        })

    }
    // boton cancelar del card PROYECTO
    $('#Cancel').on('click',function (e) {
        //$("#selectSeasonName").select2("val", "0");
        //$('#selectSeasonName').prop('disabled','');
        //$('#selectStatus').prop('disabled','disabled');
        $("#selectEventName").select2("val", "0");
        $('#selectEventName').prop('disabled','');
        $('.changeState').prop('disabled','disabled');
        $('.sendAlert').prop('disabled','disabled');
        $('#projectLevel').prop('disabled','disabled');
        $ (".droppable-extra , .droppable-project, #listComp").empty()
        $('#obras').CardWidget('collapse') ;
        $('#integrantes').CardWidget('collapse') ;
        $('#composicion').CardWidget('collapse') ;
        $('.table_sheduleTerminado').DataTable().clear().draw(); //VAcia tabla de Shedule en TERMINADOS
        $('.table_sheduleTerminado').DataTable().destroy();      //VAcia tabla de Shedule en TERMINADOS
        $('#buttonPrints').addClass('disabled');
        $('#Cancel').prop('disabled','disabled');
    })

    //boton para eliminar instrumentos del modal
    $('.table').on('click', '.del', function (event) {
        event.preventDefault();
        $(this).closest('tr').remove();
    });

    // boton guardar del modal playlist

    $('#guardarPlaylist').on('click',function (e) {
        e.preventDefault();
        //compruebo si hay datos en WOKS, si no hay datos pregunto para guardar en WORKS y PLAYLIST (ACTUALIZADO)
        // siempre se hará la pregunta si modificamos los datos de WORK, - por petición de archivo -
        $.ajax({
            url : '/admin/archivo/existeDatosEnWork',
            headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data : {
                work_id : $('#editar').val()
            },
            type : 'POST',
            dataType : 'json',
            success : function(data)
            {
                //responde true si tiene datos la obra de work
                // si data.message es TRUE, significa que en WORK ya hay datos y seran sobreescritos, si es FALSE, está vacia y se relleraran por primera vez
                if (data.message) {
                    $title = '!!! CUIDADO ¡¡¡, la obra ya tiene una instrumentacion predefinida';
                    $text  = '¿ Estas seguro que quieres sobreescribir los datos a la instrumentación ya establecida ? ';
                }else {
                    $title = 'La obra no tiene una instrumentacion predefinida';
                    $text  = '¿ Quieres clonar los datos a la instrumentación a la base de datos ? ';
                }
                //{
                    Swal.fire({
                        title: $title ,
                        text: $text,
                        icon: 'warning',
                        showCancelButton: true,
                        showDenyButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, Copialo!',
                        denyButtonText: `Solo Guardar en el proyecto`,
                    }).then((result) =>
                    {
                        if (result.isConfirmed) {
                            workEdit();
                            editPlayList();
                        }else if (result.isDenied) {
                            //Swal.fire('Los cambios no se guardaran en la base de datos general', '', 'Archivo');
                            editPlayList();
                        }

                    })
                //}else editPlayList();
            }
        });
    })


    // Abre el modal para insertar Instrumentos pulsando sobre el PLUS (abre un MODAL)
    $('.instrumentAdd').on('click',function (e) {

        e.preventDefault();

        var instrument = $(this).attr('id');
        if (instrument == 'percussion-plus') $('#modal-cabeceraSelect').text('Instrumentos de Percusión')
        if (instrument == 'keyboard-plus') $('#modal-cabeceraSelect').text('Instrumentos de Teclado')
        if (instrument == 'voice-plus') $('#modal-cabeceraSelect').text('Voces')

        $('#instrumentInsert').prop('data-instrument',instrument)
        $('#modal-instrument').modal('toggle'); // abro la ventana modal para selecccinoar instrumentos
        LoadInstrument();

    })

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
        //alert (fila)
        $('#table-'+instrument+' tbody').append(fila);
        $('#modal-instrument').effect( 'shake', {}, 500, caches );

    })

    function workEdit()
    {
        var percussion  = $('#table-percussion-plus').tableToJSON(); // Convert the table into a javascript object
        var keyboard    = $('#table-keyboard-plus').tableToJSON(); // Convert the table into a javascript object
        var voice       = $('#table-voice-plus').tableToJSON(); // Convert the table into a javascript object
        //console.log(JSON.stringify(percussion));

        $.ajax({
            url : '/admin/archivo/storeWork',
            headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data : {
                'datosSerialize' : $('#form-playlist').serialize(),
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
                        title: 'la clonación de la instrumentacion se ha almacenado correctamente en la base de datos Work',
                        text: 'base de datos actualizada',
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

    // funcion que guarda los datos en la tabla de PlayList
    function editPlayList() {

        var percussion  = $('#table-percussion-plus').tableToJSON(); // Convert the table into a javascript object
        var keyboard    = $('#table-keyboard-plus').tableToJSON(); // Convert the table into a javascript object
        var voice       = $('#table-voice-plus').tableToJSON(); // Convert the table into a javascript object

        //Serialize       = $('#form-playlist').serialize();

         // MODIFICO la instrumentacion de la obra en la base de datos playlist
         $.ajax({
            url : '/admin/archivo/editPlaylist',
            headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data : {
                'datosSerialize' : $('#form-playlist').serialize(),
                'playlist_id'    : $('#editar').prop('playlist_id'),
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
                        title: 'La instrumentación se ha modificado en el proyecto correctamente',
                        text: 'Actualizado el proyecto',
                        footer: 'Proyecto'
                    })
                    //$('#'+data.playlist_id).closest('li').remove();
                    cambiaUnPlaylist (data.playlist_id)

                    //console.log(data)

                }else{
                    Swal.fire({
                    icon: 'success',
                        title: 'Ha habido un error al intertar la obra, No se han guardado los datos',
                        text: 'Contacte con el creador del Software',
                        footer: 'Archivo'
                    })
                }

            }
        })
    }

    // Funcion para actualizar el LI de obras cuando se hace un cambio en la obra del PLAYLIST
    function cambiaUnPlaylist(playlist_id) {

        $.ajax({
            url : '/admin/archivo/cargaPlaylist',
            headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data : {
                'season_id'      : $('#selectSeasonName').val(),
                'event_id'       : $('#selectEventName').val(),
                'projectLevel'   : $('#projectLevel').val(),
                'playlist_id'    : playlist_id
            },
            type : 'POST',
            dataType : 'json',
            success : function(data)
            {
                if (data.message == true) {
                    value = data.playlists
                    //console.log (value)
                    $('li#'+playlist_id + ' .plantilla').html(pintaPlantilla(value))
                    $('li#'+playlist_id + ' .duracion').html(value.workDuration)
                    $('li#'+playlist_id + ' .cuerda').html(value.playlistString)
                }else{
                    Swal.fire({
                    icon: 'success',
                        title: 'Ha habido un error al intertar acceder al proyecto',
                        text: 'Contacte con el creador del Software',
                        footer: 'Proyecto'
                    })
                }
            }
        })
    }

    //Accion de pulsar el boton "ImprimirMultiple en WORD",
    $('#projectPrintWord').on('click', function(e){
        //http://jqueryfiledownload.apphb.com/
        e.preventDefault();
        event_id  = $('#selectEventName').val()
        season_id = $('#selectSeasonName').val()
        projectLevel = $('#projectLevel').val()

        if ($('#selectEventName').val() > 0) {
            Swal.fire('La descarga se iniciará pronto, tu fichero se almacenará en la carpeta de descargas');

            $.fileDownload('/admin/print/printprojectMultiple', {
                httpMethod: "POST",
                data:{
                    "_token":  $('meta[name="csrf-token"]').attr('content'),
                    'event_id' : event_id,
                    'season_id': season_id,
                    'projectLevel': projectLevel
                },
                successCallback: function (responseHtml,url) {

                },
                failCallback: function (responseHtml, url) {
                    Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'ERROR, avisa al creador del Software',
                    })
                }
            });
        }else
        return false; //this is critical to stop the click event which will trigger a normal file download!


    })

    // botón para enviar Alerta manual desde BOTON "enviar alerta"
    $('.sendAlert').on('click',function (e) {
        e.preventDefault();
        Swal.fire({
            title: "Envio de alerta",
            text: "añade corta descripción del motivo de la alerta",
            input: 'text',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url : '/admin/alerts/sendAlert',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data : {
                        'event_id'       : $('#selectEventName').val(),
                        'projectLevel'   : 1,
                        'notes'         : result.value
                    },
                    type : 'POST',
                    dataType : 'json',
                    success : function(data)
                    {

                    }
                })

            }
        });
    })

});
