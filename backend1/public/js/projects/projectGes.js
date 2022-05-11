$(document).ready(function() {

    // Inicializando Select2
        $('#selectSeasonName').select2();
        $('#selectEventName').select2();

    // inicializo campos
    limpiaFormProjects();
    // Funcion para limpiar formulario card proyectos

    function limpiaFormProjects() {

        $('#selectEventName').select2("val", "0");
        //$('#selectSeasonName').select2("val", "0");
        //$('#selectSeasonName').prop('disabled','');
        $('#selectEventName').prop('disabled','');
        $('#editar').val('');
        $('#daterange').val('');
        $('#projectNote').val('');
        $('#projectLevel').prop('disabled','disabled');
        $('#selectStatus').prop('disabled','disabled');
        $('#projectNote').prop('disabled','disabled');
        $('#daterange').prop('disabled','disabled');
        $('#projectAdd').prop('disabled','disabled');
        $('#newSeason').prop('disabled','disabled');
        $('#newEvent').prop('disabled','disabled');
        $('#Cancel').prop('disabled','disabled');


    }
    /* initialize the external events
     -----------------------------------------------------------------*/
      /* initialize the calendar
     -----------------------------------------------------------------*/
      //Date for the calendar events (dummy data)
      var date = new Date()
      var d    = date.getDate(),
          m    = date.getMonth(),
          y    = date.getFullYear()

      var Calendar = FullCalendar.Calendar;
      var calendarEl = document.getElementById('calendar');


    // Funcion para pintar el calendario

    // calendario de proyectos
    var calendar = new Calendar(calendarEl,
        {
            locale: 'es',
            height: 650,
            headerToolbar: {
                left  : 'prev,next today',
                center: 'title',
                right : 'dayGridMonth'
            },
            themeSystem: 'bootstrap',
            events: function (fetchInfo, successCallback, failureCallback)
            {
                let start = moment(fetchInfo.start.valueOf()).format('YYYY-MM-DD');
                let end = moment(fetchInfo.end.valueOf()).format('YYYY-MM-DD');
                $.ajax({
                    url: "/admin/getdataCalendary",
                    type: "POST",
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data: {
                        //start : start,
                        //end   : end,
                        projectLevel : 1
                    },
                    success: function (data) {
                        successCallback(data.projects);
                    },
                });
            },
            editable  : true,
            eventDurationEditable : false,
            droppable : true,
            eventDrop: function(info) {
                Swal.fire({
                    title: 'Estas seguro que querer mover el proyecto </br>'+ info.event.title +' ?',
                    text:  'se desplazará a:'+moment(info.event.start).format('DD/MM/YYYY'),
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Muevelo!'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            url : '/admin/projects/storeProject',
                            headers: {
                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            data : {
                                'selectSeasonId'    : $('#selectSeasonName').val(),
                                'selectEventId'     : info.event.extendedProps.event_id,
                                'projectNote'       : info.event.extendedProps.projectNote,
                                'projectLevel'      : $('#projectLevel').val(),
                                'projectArtistico'  : info.event.extendedProps.projectArtistico,
                                'daterange'         : moment(info.event.start).format('DD/MM/YYYY') + ' - ' +  moment(info.event.end).subtract(1, 'days').format('DD/MM/YYYY'),
                                'editar'            : info.event.id // id del proyecto (union de season + event)
                            },
                            type : 'POST',
                            dataType : 'json',
                            success : function(data)
                            {
                                if (data.message){
                                    Swal.fire({
                                        icon:   'success',
                                        title:  'Gestión del proyecto satisfactoria',
                                        text:   'Los datos se han almacenado correctamente',
                                        footer: 'Proyectos'
                                    })
                                    //selectSeasonId= $('#selectSeasonName').val();
                                    //selectEventId = $('#selectEventName').val() ;
                                    //$("#selectEventName option[value="+$('#selectEventName').val()+"]").prop('disabled', true).select2();
                                    limpiaFormProjects();
                                    calendar.refetchEvents()
                                }else{
                                    Swal.fire({
                                        icon:   'warning',
                                        title:  'No se ha creado el proyecto',
                                        text:   'Las fechas están fuera del rango de la temporada',
                                        footer: 'Proyectos'
                                    })
                                }

                            }
                        })
                    }else info.revert()
                })
            }
        });
        calendar.render();


    // fin de calendario

    // $.ajax({
    //     url : '/admin/getdataCalendary',
    //     headers: {
    //                 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //     },
    //     data : {
    //         //'season_id'      : selectSeasonId,
    //         'projectLevel'   : 1,
    //     },
    //     type : 'POST',
    //     dataType : 'json',
    //     success : function(data)
    //     {
    //         $('#project_count').text(data.projects_count)
    //         if (data.message == true)
    //         {
    //             var calendar = new Calendar(calendarEl,
    //             {
    //                 timeZone: 'UTC',
    //                 locale: 'es',
    //                 height: 500,
    //                 headerToolbar: {
    //                     left  : 'prev,next today',
    //                     center: 'title',
    //                     right : 'dayGridMonth'
    //                 },
    //                 themeSystem: 'bootstrap',
    //                 events: data.projects,
    //                 editable  : true,
    //                 eventDurationEditable : false,
    //                 droppable : true,
    //                 eventDrop: function(info) {

    //                     Swal.fire({
    //                         title: 'Estas seguro que querer mover el proyecto </br>'+ info.event.title +' ?',
    //                         text:  'se desplazará a:'+moment(info.event.start).format('DD/MM/YYYY'),
    //                         icon: 'warning',
    //                         showCancelButton: true,
    //                         confirmButtonColor: '#3085d6',
    //                         cancelButtonColor: '#d33',
    //                         confirmButtonText: 'Si, Muevelo!'
    //                         }).then((result) => {
    //                         if (result.isConfirmed) {
    //                             $.ajax({
    //                                 url : '/admin/projects/storeProject',
    //                                 headers: {
    //                                             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //                                 },
    //                                 data : {
    //                                     'selectSeasonId'    : $('#selectSeasonName').val(),
    //                                     'selectEventId'     : info.event.extendedProps.event_id,
    //                                     'projectNote'       : info.event.extendedProps.projectNote,
    //                                     'projectLevel'      : $('#projectLevel').val(),
    //                                     'projectArtistico'  : info.event.extendedProps.projectArtistico,
    //                                     'daterange'         : moment(info.event.start).format('DD/MM/YYYY') + ' - ' +  moment(info.event.end).subtract(1, 'days').format('DD/MM/YYYY'),
    //                                     'editar'            : info.event.id // id del proyecto (union de season + event)
    //                                 },
    //                                 type : 'POST',
    //                                 dataType : 'json',
    //                                 success : function(data)
    //                                 {
    //                                     Swal.fire({
    //                                         icon:   'success',
    //                                         title:  'Gestión del proyecto satisfactoria',
    //                                         text:   'Los datos se han almacenado correctamente',
    //                                         footer: 'Proyectos'
    //                                     })
    //                                     //selectSeasonId= $('#selectSeasonName').val();
    //                                     //selectEventId = $('#selectEventName').val() ;
    //                                     //$("#selectEventName option[value="+$('#selectEventName').val()+"]").prop('disabled', true).select2();
    //                                     limpiaFormProjects();
    //                                     //$('#selectSeasonName').select2().trigger('change');
    //                                 }
    //                             })
    //                         }else info.revert()
    //                     })
    //                 }
    //             });

    //             calendar.render();

    //         }else{
    //             Swal.fire({
    //             icon: 'success',
    //                 title: 'Ha habido un error al intertar recuperar los datos de esa temporada',
    //                 text: 'Contacte con el creador del Software',
    //                 footer: 'Archivo'
    //             })
    //         }

    //     }
    // })

    // cargo los datos de la temporada
    //pintaCalendario(1);
    $.ajax({
        url : '/admin/projects/getdataEventNoCreado',
        headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data : {
            //selectSeasonId : selectSeasonId ,
            projectLevel   : $('#projectLevel').val()
        },
        type : 'POST',
        dataType : 'json',
        success : function(data)
        {
            $.each(data.eventsInProjects, function (Index, value) {
                $("#selectEventName option[value="+value.id+"]").prop('disabled', true).select2();
            });
            $('#selectEventName').prop('disabled','');
            $('#Cancel').prop('disabled','');
        }
    })

// // detecta cambio en SELECT Temporada para paasr a seleccionar evento

//     $("#selectSeasonName").change(function(){
//         selectSeasonId = $('#selectSeasonName').val();
//         if (selectSeasonId > 0) {
//             pintaCalendario(selectSeasonId);
//             table_project.ajax.reload();
//             $.ajax({
//                 url : '/admin/projects/getdataEventNoCreado',
//                 headers: {
//                             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//                 },
//                 data : {
//                     selectSeasonId : selectSeasonId ,
//                     projectLevel   : $('#projectLevel').val()
//                 },
//                 type : 'POST',
//                 dataType : 'json',
//                 success : function(data)
//                 {
//                     $.each(data.eventsInProjects, function (Index, value) {
//                         $("#selectEventName option[value="+value.id+"]").prop('disabled', true).select2();
//                     });
//                     $('#selectEventName').prop('disabled','');
//                     $('#selectSeasonName').prop('disabled','disabled');
//                     $('#Cancel').prop('disabled','');
//                 }
//             })
//         }

//     });
// detecta cambio en Select Evento

    $('#selectEventName').change(function(){

        $('#selectStatus').prop('disabled','disabled');
        $('#daterange').prop('disabled','');
        $('#projectNote').prop('disabled','');
        $('#newEvent').prop('disabled','');
        $('#projectAdd').prop('disabled','');

    })

//Inicialización de daterange para ponerlo en español
    $('#daterange').daterangepicker({
        'autoUpdateInput': true,
        "showDropdowns": true,
        "showWeekNumbers": true,
        "showISOWeekNumbers": true,
        "locale": {
            "format": "DD/MM/YYYY",
            "separator": " - ",
            "applyLabel": "Apply",
            "cancelLabel": "Cancel",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "weekLabel": "W",
            "daysOfWeek": [
                "Do",
                "Lu",
                "Ma",
                "Mi",
                "Ju",
                "Vi",
                "Sa",
            ],
            "monthNames": [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ],
            "firstDay": 1
        },
        "alwaysShowCalendars": true,
        //"startDate": "01/09/"+ year,
        //"endDate": "31/07/"+ newyear,
        "drops": "auto"
    });

// Acción de dar al boton añadir proyecto

    $('#projectAdd').on('click', function (e) {
        e.preventDefault();
        var editar = $('#editar').val();
        //var season_id = $('#selectSeasonName').val();
        var daterange = $('#daterange').val();
        var projectLevel = $('#projectLevel').val();
        if (daterange !='')
        {
        //return false; // si retorna false significa que existe SOLAPE de fechas
            $.ajax({
                url : '/admin/projects/getsolapeProject',
                headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type : 'POST',
                data: {
                    'editar'        : editar,
                    'daterange'     : daterange,
                    //'season'        : season_id,
                    'projectLevel'  : projectLevel
                },
                dataType : 'json',
                success : function(json) {
                    if (json['message'] == 'solapa'){
                        Swal.fire({
                            icon: 'error',
                            title: 'Las fechas que ha puesto, coinciden con el proyecto '+ json.project.events.eventName ,
                            text: 'No se han guardado los datos',
                            footer: 'Proyectos'
                        })

                    } else{ // entra aqui si no hay SOLAPE de fechas

                        $.ajax({
                            url : '/admin/projects/storeProject',
                            headers: {
                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            },
                            data : {
                                //'selectSeasonId'    : $('#selectSeasonName').val(), lo toma por variable de sesion en controlador
                                'selectEventId'     : $('#selectEventName').val(),
                                'projectNote'       : $('#projectNote').val(),
                                'projectLevel'      : $('#projectLevel').val(),
                                'projectArtistico'  : $('#selectStatus').val(),
                                'daterange'         : $('#daterange').val(),
                                'editar'            : $('#editar').val() // id del proyecto (union de season + event)
                            },
                            type : 'POST',
                            dataType : 'json',
                            success : function(data)
                            {
                                if(data.message == 'true'){
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Proyecto creado satisfactoriamente',
                                        text: 'Los datos se han almacenado correctamente',
                                        footer: 'Proyectos'
                                    })
                                    selectEventId = $('#selectEventName').val() ;
                                    $("#selectEventName option[value="+$('#selectEventName').val()+"]").prop('disabled', true).select2();
                                    limpiaFormProjects();
                                    calendar.refetchEvents();
                                    table_project.ajax.reload()
                                }else{
                                    Swal.fire({
                                        icon:   'warning',
                                        title:  'No se ha creado el proyecto',
                                        text:   'Las fechas están fuera del rango de la temporada',
                                        footer: 'Proyectos'
                                    })
                                }
                            }
                        })
                    }
                }
            });

        }else{

            Swal.fire({
                icon: 'success',
                title: 'El rago de fechas del proyecto no puede quedar vacio' ,
                text: 'No se han guardatos datos',
                footer: 'Proyectos'
            })

        }

    })

// tabla que muestra los proyectos  -

    var table_project = $('#table-project').DataTable(
        {
            //"responsive": false,

            "scrollX": true,
            "language": idioma,

            "ajax": {
                "headers": {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                "data": function ( d ) {
                    //d.selectSeasonName = $('#selectSeasonName').val(),
                    d.projectLevel     = $('#projectLevel').val()

                },
                "url": "/admin/publication/getdataProjects",
                "type": "POST",

            },
            "columns":
            [
                { data: 'id',title:'id' },
                { data: 'events.eventName' ,title: 'Proyecto'},
                { data: 'projectDateIni',title: 'Inicio Proyecto',
                    render: function ( data, type, row ) {
                        return moment(data).format('DD/MM/YYYY')
                    },
                },
                { data: 'projectDateEnd',title: 'Fin Proyecto',
                    render: function ( data, type, row ) {
                        return moment(data).format('DD/MM/YYYY')
                    },
                },
                { data: 'updated_at',title: 'Fecha actualización',
                    render: function ( data, type, row ) {
                        return moment(data).format('DD/MM/YYYY')
                    },
                },
                { data: 'created_at', title: 'Fecha creación',
                    render: function ( data, type, row ) {
                        return moment(data).format('DD/MM/YYYY')
                    },
                },
                { data: null,title : 'Acciones',  orderable: false, "width": "75px", defaultContent: 'action',render:

                function(data,type,row){
                    var action = "<div class='btn-group'>" ;
                    action += "<a href='#' data-delete=" + data.id + " class='delete btn btn-danger' role='button'><i class='fa fa-trash'></i></a> ";
                    action += "<a href='#' data-edita=" + data.id + " class='edit btn btn-success' role='button'><i class='fa fa-edit'></i></a> ";
                    action += "</div>" ;
                    return  action ;
                },
            },

            ],
                order: [[1, 'asc']]
        }).draw();

// añade la funcionalidad de edición del proyecto

    $('#table-project tbody').on( 'click', 'a.edit', function () {

        var data = table_project.row( $(this).parents("tr") ).data();
        table_project.$('tr.table-primary').removeClass('table-primary');
        $('#edit-color').addClass('table-primary');
        $(this).parents("tr").addClass('table-primary');
        $('#projectAdd').removeClass('btn-info');
        $('#projectAdd').addClass('btn-warning');
        $('#projectAdd').html('Modificar proyecto');
        $('#Cancel').prop('disabled','');
        $('#editar').val(data.id);
        console.log(data)
        $('#daterange').val(moment(data.projectDateIni).format('DD-MM-YYYY') + ' - ' + moment(data.projectDateEnd).format('DD-MM-YYYY'));
        $("#selectEventName option[value="+data.event_id+"]").prop('disabled', false).select2();
        $('#selectEventName').val(data.event_id).trigger('change');
        $('#projectNote').val(data.projectNote);

    });


    $('#Cancel').on('click', function (e) {
        e.preventDefault();
        $('#selectEventName').prop('disabled','');
        $('#selectEventName').select2("val", "0");
        //$("#selectSeasonName").select2("val", "0");
        //$('#selectSeasonName').prop('disabled','');

        $('#editar').val('');
        $('#daterange').val('');
        $('#projectNote').val('');
        $('#projectLevel').prop('disabled','disabled');
        $('#selectStatus').prop('disabled','disabled');
        $('#projectNote').prop('disabled','disabled');
        $('#daterange').prop('disabled','disabled');
        $('#projectAdd').prop('disabled','disabled');
        $('#newSeason').prop('disabled','disabled');
        $('#newEvent').prop('disabled','disabled');
        $('#Cancel').prop('disabled','disabled');
        $('#projectAdd').removeClass('btn-warning');
        $('#projectAdd').addClass('btn-success');
        $('#edit-color').removeClass('table-primary');
        $('#projectAdd').html('Crear');
        table_project.$('tr.table-primary').removeClass('table-primary');

        limpiaFormProjects();
    })
// detecta Botón ELIMINAR proyecto

    $("#table-project").on('click','a.delete',function(e){
        e.preventDefault();
        var rowData = table_project.row( $(this).parents("tr") ).data();
        project_id  = rowData['id']
        event_id    = rowData['event_id ']

        Swal.fire({
            title: 'Estas seguro que quieres eliminar este proyecto',
            text: "Esta acción no tiene marcha atras, se perderan todos los datos almacenados en el proyecto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'SI, quiero borrar el proyecto !'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url : '/admin/projects/deleteProject',
                    headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    type : 'POST',
                    data: {
                        'project_id': project_id,
                    },
                    dataType : 'json',
                    success : function(json) {
                        table_project.ajax.reload(null,false);
                        //pintaCalendario(selectSeasonId);
                        // cargo nuevamente el select
                        $("#selectEventName option[value='"+json.event_id+"']").prop('disabled', false).select2();
                        $('#selectEventName').select2().trigger('change');
                        if (json.message == 'true'){
                            calendar.refetchEvents()
                            limpiaFormProjects()
                            Swal.fire({
                                icon: 'success',
                                title: 'Proyecto Eliminado!',
                                text: 'Todos los datos relacionados al proyecto han sido eliminados.',
                                footer: 'Proyectos'
                            })
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Proyecto NO Eliminado!',
                                text: 'No se ha podido eliminar el proyecto, contacte con el creador del software',
                                footer: 'Proyectos'
                            })
                        }
                    }
                });
            }
        })
    });
})


