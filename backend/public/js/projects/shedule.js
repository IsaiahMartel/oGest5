
$(document).ready(function() {

    // inicializo el editor de notas
    $('#summernote').summernote({
        tooltip: false,
        height: 300,
        tabsize: 2,
        lang: "es-ES",
        fontName: ['Verdana'],
        fontSize: '10'

    })

    // Inicializando Select2
    //$('#selectSeasonName').select2();
    $('#selectEventName').select2();

    limpiaFormProjects();

    // Funcion para limpiar formulario card proyectos

    function limpiaFormProjects() {

        //$('#selectSeasonName').prop('disabled','');
        $('.changeState').prop('disabled','disabled');
        $('#card-project').CardWidget('expand') ;
        $('#selectEventName').prop('disabled','');
        $('.listComp').children('li').remove();
        $('#projectNote').val('');
        $('#card-composicion').CardWidget('collapse') ;
        $('#card-integrantes').CardWidget('collapse') ;
        $('#card-shedulle').CardWidget('collapse') ;
        $('#tipes').CardWidget('collapse') ;
        $('#rooms').CardWidget('collapse') ;
        $('#crearTipes').CardWidget('collapse') ;
        $('#projectLevel').prop('disabled','disabled');
        $('#selectStatus').prop('disabled','disabled');
        $('#projectNote').prop('disabled','disabled');
        $('#Cancel').prop('disabled','disabled');
        $(".droppable-extra , .droppable-project").empty();
        $('#buttonPrints').addClass('disabled');
        $('#sheduleAdd').prop('disabled','disabled');
    }

    function habilitaFormProjects() {
        //$('#selectSeasonName').prop('disabled','disabled');
        $('.changeState').prop('disabled','');
        $('#selectEventName').prop('disabled','disabled');
        $('#Cancel').prop('disabled','');
        $('#projectNote').prop('disabled','');
        //$('#selectStatus').prop('disabled','');
        $('#projects').CardWidget('collapse') ;
        $('#card-shedulle').CardWidget('expand') ;
        $('#card-integrantes').CardWidget('collapse') ;
        $('#card-composicion').CardWidget('collapse') ;
        $('#tipes').CardWidget('expand') ;
        $('#rooms').CardWidget('expand') ;
        $('#sheduleAdd').prop('disabled','');
        $('#buttonPrints').removeClass('disabled');
    }

    // detecta Botón Cancelar
    $("#Cancel").on('click',function(){

        //$("#selectSeasonName").select2("val", "0");
        $('#selectEventName').select2("val", "0");;
        $('#card-project').text( 'Proyecto ');
        $('#table-shedule').DataTable().clear().draw();
        $('#table-shedule').DataTable().destroy();
        limpiaFormProjects();
    });

    // detecta cambio de temporada
    // $("#selectSeasonName").change(function(){
    //     $('#selectEventName').prop('disabled','');
    //     $('#selectSeasonName').prop('disabled','disabled');
    //     $('#selectStatus').prop('disabled','');
    //     $("#printWord").prop('href','');

    //     $("#selectEventName").select2({
    //         placeholder: "seleccione un evento",
    //         ajax: {
    //             headers: {
    //                     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //                 },
    //             url: "/admin/archivo/getdataEvent",
    //             data: {
    //                 'selectSeasonId' : $('#selectSeasonName').val(),
    //                 'projectLevel' : $('#projectLevel').val()

    //             },
    //             type: "POST",
    //             dataType: 'json',
    //             processResults: function (data) {
    //                 return {
    //                     results: $.map(data.projects, function (item) {
    //                         return {
    //                             text: item.events.eventName,
    //                             id: item.event_id
    //                         }
    //                     })
    //                 };
    //             },
    //         }
    //     });
    // });

    //detecta cambio de evento
    $('#selectEventName').change(function(){
        //$('#selectEventName').prop('disabled','disabled');
        $('#card-libreta').CardWidget('expand') ;
        $('#buttonPrints').removeClass('disabled');
        habilitaFormProjects()
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
                    if (data.projectProduccion == 'Terminado'){
                        cargaPlaylistTerminado( '',$('#selectEventName').val(),$('#projectLevel').val(),false);
                        rellenaSheduleTerminado('',$('#selectEventName').val(),$('#projectLevel').val());
                        cargaIntegrantesTerminado('',$('#selectEventName').val(),$('#projectLevel').val());
                        cargaInstrumentPlaylistTerminado('',$('#selectEventName').val(),$('#projectLevel').val()) // pone los instrument percusion , keyboard y voices en TERMINADOS.blade
                        $('#proceso').hide( "drop", { direction: "left" }, "slow" );
                        setTimeout(function() {
                            $('#terminado').show( "drop", { direction: "left" }, "slow" );
                        },800);
                    }else{
                        cargaPlaylistTerminado( '',$('#selectEventName').val(),$('#projectLevel').val(),false); // carga las obras que se van a atocar
                        cargaIntegrantesTerminado('',$('#selectEventName').val(),$('#projectLevel').val(),true);
                        rellenaShedule('',$('#selectEventName').val(),$('#projectLevel').val());
                        $('#buttonPrints').removeClass('disabled');
                        //$('.btn-group').remove() // quito los botones de guardar y cancelar de la tabla shedule
                        //$('#table-shedule').DataTable().column( 5 ).visible(false); // oculto la columna de las acciones (botones)
                    }
                }
            })
        }
    })
     // para SHEDULLE

    // Esta funcion rellena la tabla SHEDULLE

    function rellenaShedule(selectSeasonId,selectEventId,projectLevel)
    {
        var table_shedule = $('#table-shedule').DataTable(
        {
            //"responsive": false,
            "language": idioma,
            "paging": false,
            "searching": false,
            "ordering":  true,
            "ajax": {
                "headers": {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                "data":{
                    //'season_id'   : selectSeasonId,
                    'event_id'    : selectEventId,
                    'projectLevel': projectLevel
                },
                "url": "/admin/projects/getdataShedule",
                "type": "POST",
            },
            'columnDefs': [ {
                targets: '_all',

                // Hacemos que las celdas sean Draggables  (arrastrables)
                    createdCell: function (td, cellData, rowData, row, col) {
                    if (col==1) $(td).addClass('droppable-tipe');
                    if (col==2) $(td).addClass('cell-hora');
                    if (col==3) $(td).addClass('cell-note');
                    if (col==4) $(td).addClass('droppable-room');
                    },
                },
                { orderable: false, targets: '_all' }
            ],
                'drawCallback': function () {

                $( ".droppable-room" ).droppable({
                    activeClass: "ui-state-default",
                    hoverClass: "ui-state-hover",
                    accept: ".external-room",

                    drop: function( event, ui ) { // para la sala

                        var draggable = ui.draggable;
                        //console.log(ui.draggable.data('color'))
                        var color = draggable.data('color')
                        var id    = draggable.data('id')
                        filaIndex = table_shedule.row( this ).index()

                        room = {
                            id : id,
                            roomName : $.trim(ui.draggable.text().split('~')[0]),
                            roomAcronym : $.trim(ui.draggable.text().split('~')[1])
                        };

                        console.log(room)
                        $("#table-shedule").DataTable().cell(filaIndex,4).data(room)
                        $(this).css('background-color', color)
                        $(this).addClass('cell-tipe')
                        /* hago el elemento dragable
                        $(this).draggable({
                            zIndex        : 1070,
                            revert        : true, // vuelve a su sitio de partida
                            revertDuration: 0,  //  original position after the drag

                        })
                        */
                    }
                })

                $( ".droppable-tipe" ).droppable({ // para el tipo y la hora
                    activeClass: "ui-state-default",
                    hoverClass: "ui-state-hover",
                    accept: ".external-tipe",

                    drop: function( event, ui ) {

                        var draggable = ui.draggable;
                        var color = draggable.data('color')
                        color = (color === undefined) ? '#FFB233' : color;
                        filaIndex = table_shedule.row( this ).index()

                        tipo = $.trim(ui.draggable.text().split('~')[0]);
                        hora = $.trim(ui.draggable.text().split('~')[1]);
                        $("#table-shedule").DataTable().cell(filaIndex,1).data(tipo);
                        $("#table-shedule").DataTable().cell(filaIndex,2).data(hora);
                        $(this).css('background-color', color)
                        $(this).addClass('cell-tipe')

                        $(this).parent().find('.cell-hora').css('background-color', color)
                        $(this).parent().find('.cell-hora').addClass('cell-tipe')

                        // hago el elemento dragable

                        // detecto si es dia libre paa poner la sala en blanco
                        if (tipo == 'DIA LIBRE') {
                            room = {
                                id : '',
                                roomName : '',
                                roomAcronym : ''
                            };
                            $("#table-shedule").DataTable().cell(filaIndex,4).data(room)
                        }
                    }
                })
            },
            "columns":
            [

                { data: 'sheduleDate' , title: 'Fecha', name: 'sheduleDate','orderable': false,
                    render: function ( data, type, row ) {
                        moment.locale('es');
                        var diadeSemana =  moment(data).format('dddd');
                        var resultado = '<b>'+ diadeSemana +'</b> </br> '+ moment(data).format('DD-MM-YYYY')
                        return resultado
                    }
                },
                { data: 'sheduleTipe' , title: 'tipo'},
                { data: 'shedulehourRange',title: 'Horario' },
                { data: 'sheduleNote' , title: 'Notas'},
                { data: 'rooms' , title: 'Sala',
                    render: function ( data, type, row ) {
                        if (data === null ) return ''
                        return data.roomAcronym
                    }
                },
                { data: null,title : 'Acciones', orderable: false, defaultContent: 'action',render:

                    function(data,type,row){

                        var action = "<div class=''>" ;
                        action += "<a href='#' class='delete btn btn-sm btn-danger'><i class='fa fa-trash'></i></a> ";
                        action += "<a href='#' class='plus btn btn-sm btn-primary '><i class='fa fa-plus'></i></a>";
                        action += "<a href='#' class='edit btn btn-sm btn-success'><i class='fa fa-edit'></i></a>";
                        action += "</div>" ;
                        return  action ;
                    },
                },
                {data: 'sheduleOrder' , title: 'order',visible: false},
            ],
            order: [[6, 'asc']]
        }).draw(false);
    }

    //boton (+) PLUS para añadir fila
    $('#table-shedule').on( 'click', 'a.plus', function (e) {
        e.preventDefault()
        room = {
            roomName : '',
            roomAcronym : ''
        };

        dia = $('#table-shedule').DataTable().row($(this).closest("tr").get(0)).data().sheduleDate
        id = $('#table-shedule').DataTable().row($(this).closest("tr").get(0)).data().sheduleOrder

        nuevoId= parseInt (id)+1;
        count = 0 ;

        //table_shedule.draw();
        $('#table-shedule').DataTable().rows().every(function (i) {
            // indexRow = $('#table-shedule').DataTable().row( this ).index() Indice de la fila, lo mismo que "i"
            // "i" es el indice de los datos (numero de fila sin ordenar)
            count++;
            //console.log('indexRow: '+ indexRow+' indice:'+i +' orden:'+count)
            if (count == id)
            {
                var rowNode = $('#table-shedule').DataTable().row.add( {
                    'sheduleDate' : dia,
                    'sheduleTipe':'',
                    'shedulehourRange':'',
                    'sheduleNote':'',
                    'rooms':room,
                    'Acciones':'',
                    'sheduleOrder' : nuevoId
                } ).draw().node();
                $( rowNode ).addClass( 'Highlight_inUse' )
                count++
            }else {
                $('#table-shedule').DataTable().cell(i, 6 ).data(count);
            }
        });
        $('#table-shedule').DataTable().draw();

    });

    // Boton para borrar fila

    $('#table-shedule').on('click','a.delete',function(e){
        e.preventDefault()
        //fecha = $('#table-shedule').DataTable().row($(this).closest("tr").get(0)).data().sheduleDate; // obtengo datos de columbna fecha la fila clicada
        fecha = $(this).closest('tr').find('td:first').text()
        var contador = 0;
        var count = 0;
        id = $('#table-shedule').DataTable().row($(this).closest("tr").get(0)).data().id // ID del Shedulle

        $('#table-shedule tbody tr').each(function (index2) {
            var celda = $(this).find("td").eq(0).text();
            if (celda == fecha) contador++;
        });
        if (contador > 1) {
            Swal.fire({
                title: 'Estas seguro?',
                text: "Este proceso no tiene vuelta atras",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borralo!'
                }).then((result) => {
                if (result.isConfirmed) {
                    //table_shedule.row($(this).closest("tr").get(0)).remove().draw();
                    if (id){
                    //-- borro en la base de datos el registro (shedules)
                        $.ajax({
                            url : '/admin/projects/deleteUnShedule',
                            headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            data : {
                                'shedule_id' :id,
                            },
                            type : 'POST',
                            dataType : 'json',
                            success : function(data)
                            {
                                if (data.message == true) {

                                }else{

                                }
                            }
                        })
                    }

                    // -----

                    $('#table-shedule').DataTable().row($(this).closest("tr").get(0)).remove().draw(); // elimino fila
                    // reordeno numero de filas
                    $('#table-shedule').DataTable().rows().every(function (i) {
                        count++;
                        $('#table-shedule').DataTable().cell(i, 6 ).data(count);
                    });
                    $('#table-shedule').DataTable().draw()
                    Swal.fire({
                        icon: 'error',
                        title:'Eliminado!',
                        text:'Este dia ha sido eliminado del proyecto',
                        footer:'Proyectos'
                    })
                }
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'No puedo borrar ese dia de la semana',
                text: 'Nos dejarias con un dia menos de vida',
                footer: 'Fechas'
            })
        }
    })

    // Abre el modal para NOTAS pulsando sobre la celda sheduleNote (abdre un MODAL)
    $('#table-shedule').on('click', 'tbody td.cell-note', function(e) {
        e.preventDefault()
        filaIndex = $('#table-shedule').DataTable().row( this ).index()
        noteIndex = $('#table-shedule').DataTable().cell(filaIndex,3).data()
        $(this).css('background-color', '#DAF7A6')
        $('#modalEdit').attr('data-fila',filaIndex)
        $("#modalEdit").modal('toggle');
        $('#summernote').summernote('code',noteIndex);
    })

    // Boton para el campo NOTE (abdre un MODAL)
    $('#table-shedule').on( 'click', 'a.edit', function (e) {
        e.preventDefault();
        $("#modalEdit").modal('toggle');
        filaIndex = $('#table-shedule').DataTable().row( $(this).closest("tr").get(0) ).index()
        noteIndex = $('#table-shedule').DataTable().cell(filaIndex,3).data()
        $(this).closest("tr").find('td:eq(3)').css('background-color', '#DAF7A6')
        $('#summernote').summernote('code',noteIndex);
        $('#modalEdit').attr('data-fila',filaIndex)
    });

//Boton para copiar las obras desde los LI a SUMERNOTE

    $('#btCopiaObra').click(function (e){
        e.preventDefault();
        var i=0
        var obras = '';
        $("#playlist li").each(function(){
            obras += $('#playlist li').eq(i).text() + '<br>';
            i++
        });
        $('#summernote').summernote('pasteHTML',obras);
    })

//boton par guardar el summernote

    $('#btGuardar').click(function (e){
        e.preventDefault();
        //$('#selectStatus').prop('disabled','disabled');
        //$('#CancelProgram').prop('disabled','enabled');
        $('#Cancel').prop('disabled','disabled');
        $('#projectLevel').prop('disabled','disabled');
        $('#selectEventName').prop('disabled','');
        $('#projectNote').prop('disabled','disabled');
        $('#daterange').prop('disabled','disabled');
        $('#projectAdd').prop('disabled','disabled');
        $('#newSeason').prop('disabled','disabled');
        $('#newEvent').prop('disabled','disabled');
        $('#projectDel').prop('disabled','');
        $('#projectEdit').prop('disabled','');

        var textareaValue = $('#summernote').summernote('code');
        filaIndex = $('#modalEdit').attr('data-fila');
        //console.log('Fila: '+fila+' Contenido : ', this.textContent)
        $("#table-shedule").DataTable().cell(filaIndex,3).data(textareaValue)
        $("#modalEdit").modal('toggle');

    })

    // Botón para guardar los datos de la tabla Shedule

    $('#sheduleAdd').on('click', function (e) {
        e.preventDefault();
        //selectSeasonId  = $('#selectSeasonName').val();
        selectEventId   = $('#selectEventName').val();
        selectProjectId = '';
        projectLevel    = $('#projectLevel').val();
        addShedule('',selectEventId,selectProjectId,projectLevel)
    })

    // funcion para añadir todos los registros de la tabla Shedule referente a un proyecto

    function addShedule (selectSeasonId,selectEventId,selectProjectId,projectLevel) {

        var error = 0
        $("#table-shedule").DataTable().rows().every(function (i) {
            tipo =  $('#table-shedule').DataTable().cell(i,1).data()
            if (tipo=='') error++
        });
        if (error > 0) {
            Swal.fire({
                icon: 'error',
                title: 'No puedes guardar cambios sin asignar el tipo de ensayo',
                text: 'No se ha guardado ningun cambio',
                footer: 'Proyectos'
            })
        }
        else {

            tableJSON = JSON.stringify($("#table-shedule").DataTable().rows().data().toArray());
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type: "POST",
                url: "/admin/projects/addShedule",
                data:
                {
                    //'season_id'   : selectSeasonId,
                    'event_id'    : selectEventId,
                    'project_id'  : selectProjectId,
                    'projectLevel': projectLevel,
                    'table'       : tableJSON
                },
                dataType: "JSON",
                success: function (response) {
                    $("#table-shedule").DataTable().ajax.reload();
                    Swal.fire({
                        icon: 'success',
                        title: 'El programa se ha actualizado con exito',
                        text: 'Todos los datos se han procesado correctamente',
                        footer: 'Proyectos'
                    })
                }
            });
        }
    }

    // tabla para cargar los tipos y hacer que los tipos sean draggables

    var table_tipes = $('#table-tipes').DataTable(
    {
        "responsive": true,
        "lengthMenu": [5],
        "dom": '<"toolbar">frtip',
        "scrollX": false,
        "language": idioma,
        "ajax": {
            "headers": {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
            "data":{ "tipo" : 1},
            "url": "/admin/produc/getdataTipes",
            "type": "POST",
        },
        'columnDefs': [
        {
            targets: '_all',
            createdCell: function (td, cellData, rowData, row, col) {
                if (col==0){
                    $(td).addClass('external-tipe');

                }
            },
        },
            { orderable: false, targets: '_all' }
        ],
        createdRow: function ( row, data, dataIndex, cells ) {
            $(row).addClass('text-white');
            $($(row).find("td")[0]).css("background-color",data.tipeColor);
            $($(row).find("td")[0]).attr('data-color',data.tipeColor);
        },
        drawCallback: function () {
            $('.external-tipe').draggable({
                scroll        : false,
                zIndex        : 1070,
                cursor        : "clone",
                revert        : true, // vuelve a su sitio de partida
                revertDuration: 0 , //  original position after the drag
                opacity: 0.7,
                cursorAt: { top: 15, left: 100 },
            })
        },
        "columns":
        [
            { data: null ,title: 'tipeName',
                render: function ( data, type, row ) {
                    var resultado = data.tipeName + ' ~ '+ data.tipehourRange
                    return resultado
                }
            }

        ],


    }).draw();

// Tabla para las SALAS

    var table_tipes = $('#table-rooms').DataTable(
    {
        "responsive": false,
        "dom": '<"toolbar">frtip',
        "lengthMenu": [5],
        "scrollX": false,
        "language": idioma,
        "ajax": {
            "headers": {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
            "data":{ "tipo" : 1},
            "url": "/admin/produc/getdataRooms",
            "type": "POST",

        },
        'columnDefs': [
        {
            targets: '_all',
            createdCell: function (td, cellData, rowData, row, col) {
            if (col==0) $(td).addClass('external-room');

            },
        },
            { orderable: false, targets: '_all' }
        ],
        createdRow: function ( row, data, dataIndex, cells ) {
            $(row).addClass('text-white');
            $($(row).find("td")[0]).attr('data-id',data.id)
            $($(row).find("td")[0]).css("background-color",data.roomColor);
            $($(row).find("td")[0]).attr('data-color',data.roomColor);
        },

        drawCallback: function () {

            $('.external-room').draggable({
                scroll        : false,
                zIndex        : 1070,
                cursor        : "clone",
                revert        : true, // vuelve a su sitio de partida
                revertDuration: 0 , //  original position after the drag
                opacity: 0.7,
                cursorAt: { top: 15, left: 100 },
            })

        },
        "columns":
        [
            { data: null ,title: 'roomName',
                render: function ( data, type, row ) {
                    var resultado = data.roomName + ' ~ '+ data.roomAcronym
                    return resultado
                }
            }

        ],


    }).draw();

    var currColor = '#3c8dbc' //Color Rojo por defecto

// Botón para cambiar el color

    $('#color-chooser > li > a').click(function (e) {
        e.preventDefault()
        // Guarda el color
        currColor = $(this).css('color')
        //console.log(currColor)
        // Add color effect to button
        $('#add-new-tipe').css({
            'background-color': currColor,
            'border-color': currColor
        })
    })


// Boton para añadir elemento a la tabla TIPOS (no se guardan en la base de datos, solo son temporales)

    $('#add-new-tipe').click(function (e) {
        e.preventDefault()

        // me aseguro que no esté vacio
        var val = $('#new-tipe').val()
        if (val.length == 0) {
            return
        }
        roomName = val.split('/')[0]
        roomAcronym = val.split('/')[1]

        var table_tipes = $('#table-tipes').DataTable()
        //cadena = cadena.toLowerCase();
        var rowNode = table_tipes.row.add( {
            "tipeName":  roomName.toUpperCase(),
            "tipehourRange": roomAcronym
        } ).draw().node();

        $( rowNode ).css("background-color",currColor);

    })


    //Accion de pulsar el boton "ImprimirMultiple en WORD",
    $('#projectPrintWord').on('click', function(e){
        //http://jqueryfiledownload.apphb.com/
        e.preventDefault();
        //season_id = $('#selectSeasonName').val()
        event_id  = $('#selectEventName').val()
        projectLevel = $('#projectLevel').val()

        if ($('#selectEventName').val() > 0) {
            Swal.fire('La descarga se iniciará pronto, tu fichero se almacenará en la carpeta de descargas');

            $.fileDownload('/admin/print/printprojectMultiple', {
                httpMethod: "POST",
                data:{
                    "_token"        :  $('meta[name="csrf-token"]').attr('content'),
                    'event_id'      : event_id,
                    //'season_id'     : season_id,
                    'projectLevel'  : projectLevel,
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

//      TERMINADOS


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
                    url : '/admin/produc/changeState',
                    headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data : {
                        //'season_id'      : $('#selectSeasonName').val(),
                        'event_id'       : $('#selectEventName').val(),
                        'projectLevel'   : 1,
                        'notes'          : result.value
                    },
                    type : 'POST',
                    dataType : 'json',
                    success : function(data)
                    {
                        if (data.projectProduccion == 'Proceso') // entra aqui porque estaba en Terminado y cambió a Proceso
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

        if ( $.fn.DataTable.isDataTable( '#table-shedule' ) )  $('#table-shedule').DataTable().clear().destroy();
        if ( $.fn.DataTable.isDataTable( '.table_sheduleTerminado' ) ) $('.table_sheduleTerminado').DataTable().clear().destroy(); //VAcia tabla de Shedule en TERMINADOS
        //$('#listComp').children('li').remove();        // vacia LI de Obras solo para Archivo
        $('.listComp').children('li').remove();          // vacia LI de Obras
        $('.instrument-list').children('li').remove();   // vacia instrumentos Key, per, voi
        $('.droppable-project').children('li').remove(); // vacia LI de Obras en TERMINADOS
        $('.droppable-extra').children('li').remove();   // vacia LI de Obras en TERMINADOS
    }



})

