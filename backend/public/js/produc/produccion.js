$(document).ready(function () {

// Inicializando Select2
    $('.select2').select2();

// hace que la lista de asistentes sea ordenable (para ordenar muro el data-order)
    $("#droppable-project").sortable({
        placeholder: "ui-state-highlight",
        update: function( event, ui )
        {
            //var ids_order = $(this).sortable('toArray', { attribute: 'id' });
            var id_address_project  = $(this).sortable('toArray', { attribute: 'id_address_project' });
            var groups_name         = $(this).sortable('toArray', { attribute: 'data-group' });
            var groups_id           = $(this).sortable('toArray', { attribute: 'data-group_id' });
            var address_id          = $(this).sortable('toArray', { attribute: 'id' });
            var listado             = $(this).attr('id') // indica el id del UL  #droppable-project o #droppable-extra

            $.ajax ({
                url : '/admin/produc/storeOrder',
                headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data : {
                    //'season_id'         : $('#selectSeasonName').val(),
                    'event_id'          : $('#selectEventName').val(),
                    'projectLevel'      : $('#projectLevel').val(),
                    'id_address_project': JSON.stringify(id_address_project),
                    'groups_name'       : JSON.stringify(groups_name),
                    'groups_id'         : JSON.stringify(groups_id),
                    'address_id'        : JSON.stringify(address_id),
                    'listado'           : listado

                },
                type : 'POST',
                dataType : 'json',
                success : function(data)
                {
                    if (data.message == true) {

                    }else{
                        Swal.fire({
                        icon: 'success',
                            title: 'Ha habido un error al intertar ordenar el interprete, No se han guardado los datos',
                            text: 'Contacte con el creador del Software',
                            footer: 'producción'
                        })
                    }

                }
            })
            //alert("New position: " + ui.item.index());
            //console.log(idsInOrder);
        }
    })

    $("#droppable-extra").sortable({})

// inicializo campos y card cerrados
    //$('#selectEventName').prop('disabled','disabled');
    $('.changeState').prop('disabled','disabled');
    $('#projectLevel').prop('disabled','disabled');
    $('#selectStatus').prop('disabled','disabled');
    $('#card-libreta').CardWidget('collapse') ;
    $('#card-obras').CardWidget('collapse') ;
    $('#card-shedule').CardWidget('collapse');
    $('#buttonPrints').addClass('disabled');
    $('#Cancel').prop('disabled','disabled')

// detecta cambio de temporada

    // $("#selectSeasonName").change(function(){
    //     $('#selectEventName').prop('disabled','');
    //     $('#selectSeasonName').prop('disabled','disabled');
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
    //                 'projectLevel'   : $('#projectLevel').val()

    //             },
    //             type: "POST",
    //             dataType: 'json',
    //             processResults: function (data) {
    //                 //$('#printWord').attr('href',"/admin/print/printProject/"+data.projects[0].id);
    //                 //$('#buttonPrints').append("<a class='btn btn-primary' href='/admin/print/printProject/"+data.projects[0].id+")' role='button'>Word hrefNew</a>")
    //                 //$('#project_id').val(data.projects[0].id);
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

    $("#selectEventName").change(function(){
        $('#selectEventName').prop('disabled','disabled');
        $('.changeState').prop('disabled','');
        $('#Cancel').prop('disabled','')
        $('#card-libreta').CardWidget('expand') ;
        $('#buttonPrints').removeClass('disabled');

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
                    if (data.projectArtistico == 'Terminado'){
                        //cargaPlaylistTerminado(Temporada,evento,level,botones de accion)
                        cargaPlaylistTerminado('',$('#selectEventName').val(),$('#projectLevel').val(),false);
                        rellenaSheduleTerminado('',$('#selectEventName').val(),$('#projectLevel').val());
                        cargaIntegrantesTerminado('',$('#selectEventName').val(),$('#projectLevel').val());
                        cargaInstrumentPlaylistTerminado('',$('#selectEventName').val(),$('#projectLevel').val()) // pone los instrument percusion , keyboard y voices en TERMINADOS.blade
                        $('#proceso').hide( "drop", { direction: "left" }, "slow" );
                        setTimeout(function() {
                            $('#terminado').show( "drop", { direction: "left" }, "slow" );
                        },800);
                    }else{
                        cargaPlaylistTerminado('',$('#selectEventName').val(),$('#projectLevel').val(),false); // carga las obras que se van a atocar
                        cargaIntegrantes('',$('#selectEventName').val(),$('#projectLevel').val(),true);
                        rellenaSheduleTerminado('',$('#selectEventName').val(),$('#projectLevel').val());
                        $('#buttonPrints').removeClass('disabled');
                        //$('.btn-group').remove() // quito los botones de guardar y cancelar de la tabla shedule
                        //$('#table-shedule').DataTable().column( 5 ).visible(false); // oculto la columna de las acciones (botones)
                    }
                }
            })
        }
    })

// tabla de libreta de direcciones

    var table_address = $('#table-address').DataTable(
        {
            "responsive": true,
            //"scrollX": true,
            //"language": idioma,
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
                    targets: 0,
                    //createdRow : function ( row, data, dataIndex ){
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).parent().addClass('draggable_tr');
                    }
                }
            ],
            drawCallback: function () {
                $(".draggable_tr").draggable({
                    zIndex        : 1070,
                    revert        : true, // vuelve a su sitio de partida
                    revertDuration: 0,  //  original position after the drag
                    helper: 'clone',
                    cursor: "move",
                    cursorAt: { top: 5, left: 50 }
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

                            group +=data.addressgroups[index].addressgroupName + '<br\>'
                        });
                    }
                        return group;
                    },
                },
                { data: 'addresslastName' , title: 'Apellido'},
                { data: 'addressfirstName',title: 'Nombre' },
            ],
                order: [[1, 'asc']]
        });

// hece que el "car" sea un objeto droppable para los integrantes visibles del proyecto y guarda en la base de datos PIVOT

    $("#project, #extra").droppable({
        accept: ".draggable_tr",
        classes: {
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function (event, ui) {
            datos    = ui.helper;
            //$(this).css('background', 'black');
           listado = $(this).attr('id') // indica el id del UL que ha entrado #droppable-project o #droppable-extra
            //console.log(listado)
            //console.log(datos)
            var id_address = datos.find("td").eq(0).html(); // id del usuario de la address
            var grupo_name = datos.find("td").eq(1).html();
            var nombre     = datos.find("td").eq(2).html();
            var apellido   = datos.find("td").eq(3).html();
            arrayGrupo     = grupo_name.split('<br\>');

            if (arrayGrupo.length >2) {
                var grupoAsoc=[];
                arrayGrupo.forEach(element => {
                    grupoAsoc[element]=element;
                });
                jsonGrupo = Object.assign({}, grupoAsoc);
                Swal.fire({
                    title: 'He detectado que este integrante, tiene mas de un grupo asociado',
                    text: "Actuará en calidad de:",
                    input: 'select',
                    inputOptions: jsonGrupo ,
                    inputPlaceholder: 'Escoja titulo',
                    showCancelButton: true,
                }).then(function (result) {
                    grupo = result.value;
                    storeIntegrante(grupo,apellido,nombre,id_address,listado)
                })
            }else {
                grupo = grupo_name;
                storeIntegrante(grupo,apellido,nombre,id_address,listado)
            }
        }
    });

// funcion para almacenar los datos en la taba de PIVOT address_project
    function storeIntegrante (grupo,apellido,nombre,address_id,listado)  {

        // funcion para almacenar los datos en la taba de PIVOT address_project
        $.ajax({
            url : '/admin/produc/storeIntegrante',
            headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data : {
                //'season_id'     : $('#selectSeasonName').val(),
                'event_id'      : $('#selectEventName').val(),
                'projectLevel'  : $('#projectLevel').val(),
                'address_id'    : address_id,
                'grupo_name'    : grupo,
                'address_name'  : nombre,
                'apellido'      : apellido,
                'listado'       : listado // indica si va a extra o a integrante visible en el proyecto
            },
            type : 'POST',
            dataType : 'json',
            success : function(data)
            {
                if (data.message == true) {
                    //alert(listado)
                    //grupo_id,grupo,apellido,nombre,address_id,order,id_address_project
                    li = montaInterprete (data.group_id,grupo,apellido,nombre,address_id,data.order,data.id_address_project,true)
                    if (listado == 'project') $('#droppable-project').append(li);
                    else $('#droppable-extra').append(li);
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

// botón para eliminar elemento de la lista

    $('#droppable-project, #droppable-extra').on( 'click', 'a.delList', function (e) {
        e.preventDefault();

        address_id = $(this).parents('li').attr('id') // id del elemento (LI) clicado
        listado    = $(this).parents('li').parent('ul').attr('id') // indica el id del UL que quiere ser borrado #droppable-project o #droppable-extra

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
                    url: '/admin/produc/deleteInterprete',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data: {
                        'season_id' : $('#selectSeasonName').val(),
                        'event_id'  : $('#selectEventName').val(),
                        'projectLevel'  : $('#projectLevel').val(),
                        'address_id': address_id,
                        'listado'   : listado
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

    // boton cancelar del card PROYECTO
    $('#Cancel').on('click',function (e) {
        //$("#selectSeasonName").select2("val", "0");
        //$('#selectSeasonName').prop('disabled','');

        $("#selectEventName").select2("val", "0");
        $('#selectEventName').prop('disabled','');
        $('#projectLevel').prop('disabled','disabled');
        $('#selectStatus').prop('disabled','disabled');
        $('#droppable-extra').empty();
        $('#droppable-project').empty();
        $('#obras').CardWidget('collapse') ;
        $('#libreta').CardWidget('collapse') ;
        $('#composicion').CardWidget('collapse') ;
        $('.table_sheduleTerminado').DataTable().clear().draw();
        $('.table_sheduleTerminado').DataTable().destroy();
        $('.listComp').empty()
        $('.changeState').prop('disabled','disabled');
        $('#Cancel').prop('disabled','disabled')

    })

    //Accion de pulsar el boton "ImprimirMultiple en WORD",
    $('#projectPrintWord').on('click', function(e){
        //http://jqueryfiledownload.apphb.com/
        e.preventDefault();
        //season_id    = $('#selectSeasonName').val()
        event_id     = $('#selectEventName').val()
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

    // Abre el modal para editar instrumentos SOLO LA CUERDA

    $('.listComp').on( 'click', 'a.edit', function (e) {
        e.preventDefault();
        playlist_id= $(this).parents('li').attr('id') // id del elemento (LI) clicado
        //alert (playlist_id)
        Swal.fire({
            title: "Cambio de cuerda",
            text: "Añade nueva cuerda",
            input: 'text',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url : '/admin/archivo/guardaCuerda',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data : {
                        //'season_id'      : $('#selectSeasonName').val(),
                        'event_id'       : $('#selectEventName').val(),
                        'playlist_id'    : playlist_id,
                        'projectLevel'   : 1,
                        'cuerda'         : result.value
                    },
                    type : 'POST',
                    dataType : 'json',
                    success : function(data)
                    {
                        $('#'+ playlist_id).find('.cuerda').html(data.cuerda)
                    }
                })
            }
        });
        // $('#editar').prop('playlist_id',playlist_id)
        // $('#modal-cabecera').text('Instrumenación')
        // $('#modal-workplaylist').modal('toggle');
        // $(".table-instruments > tbody").empty();
        // loaddataPlaylist(playlist_id);
    })


    /*                     TERMINADO                       */

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
                    url : '/admin/projects/changeState',
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
                        if (data.projectArtistico == 'Proceso') // entra aqui porque estaba en Terminado y cambió a Proceso
                        {
                            limpiaCuadrosTerminado();
                            $('#terminado').hide( "drop", { direction: "left" }, "slow" );
                            setTimeout(function() {
                                $('#proceso').show( "drop", { direction: "left" }, "slow" );
                            },800);
                        }
                        limpiaCuadrosTerminado();
                        $("#selectEventName").trigger('change')
                    }
                })
            }
        });


    })

    // limpia las cajas de TERMINADO y la tabla de Shedule que está en proceso

    function limpiaCuadrosTerminado()
    {

        //$('#listComp').children('li').remove(); // vacia LI de Obras solo para Archivo
        $('.listComp').children('li').remove(); // vacia LI de Obras
        $('.instrument-list').children('li').remove();   // vacia instrumentos Key, per, voi
        $('.droppable-project').children('li').remove(); // vacia LI de Obras en TERMINADOS
        $('.droppable-extra').children('li').remove();   // vacia LI de Obras en TERMINADOS
        $('#droppable-project').children('li').remove(); // vacia LI de integrantes SOLO PARA PRODUCCION (Artistico)
        $('#droppable-extra').children('li').remove();   // vacia LI de integrantes SOLO PARA PRODUCCION (Artistico)
        $('.table_sheduleTerminado').DataTable().clear().draw(); //VAcia tabla de Shedule en TERMINADOS
        $('.table_sheduleTerminado').DataTable().destroy();      //VAcia tabla de Shedule en TERMINADOS
    }


});
