$(document).ready(function()
{
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
    // oculto los playlist
    $('.back').hide()

    // muestro TIMELINE
    timeLineDraw();

    // Inicializando Select2
    $('.select2').select2();

    // muestro cajas superiores
    datosDeCajas('1');

    // iniciamos con Nivel 1 y si quiere que cambie el usuario
    $('#calendar').data('level',1);

    // detecta el cambio del select del sidebar-right
    $("#selectSeasonName").change(function(){
        $.ajax({
            url : '/admin/setSession',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            method: 'POST',
            data : {
                'season_id' : $('#selectSeasonName').val(),
            },
            type : 'POST',
            dataType : 'json',
            success : function(data)
            {
                Swal.fire('Ha cambiado la temporada de trabajo en esta sesión')
                $('#seasonName').html( $('#selectSeasonName option:selected').text())
                datosDeCajas('1');
                $('#calendar').data('level',1);
                calendar.refetchEvents()
            }

        })
    });

    // funcion para poner los datos de las cajas superiores
    function datosDeCajas (level)
    {
        $.ajax({
            url : '/admin/getdataCalendary',
            headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data : {
                //'season_id'      : season_id,
                'projectLevel'   : level,
            },
            type : 'POST',
            dataType : 'json',
            success : function(data)
            {
                $('#level0_count').text(data.level0_count)
                $('#level1_count').text(data.level1_count)
                $('#noPublicados').text(data.noPublicados)
            }
        })
    }

    //detecto click en las cajas de informacion de los LEVEL 1 TODOS
    $('#level1').on('click',function(e){
        e.preventDefault() ;
        $('#volver').click()
        $('#card-calendary').removeClass('calendaryLevel0');
        $('#card-calendary').addClass('calendaryLevel1');
        datosDeCajas('1')
        $('#calendar').data('level',1);
        calendar.refetchEvents()

    })

    //detecto click en las cajas de informacion de los LEVEL 0 PUBLICADOS
    $('#level0').on('click',function(e){
        e.preventDefault()
        $('#volver').click()
        $('#card-calendary').removeClass( 'calendaryLevel1' );
        $('#card-calendary').addClass( 'calendaryLevel0' );
        datosDeCajas('0')
        $('#calendar').data('level',0);
        calendar.refetchEvents()

    })



    //detecto click en las cajas de informacion de los NO PUBLICADOS
    $('#level10').on('click',function(e){
        e.preventDefault() ;
        $('#volver').click()
        $('#card-calendary').removeClass('calendaryLevel0');
        $('#card-calendary').removeClass('calendaryLevel1');
        $('#card-calendary').addClass('calendaryLevel10');
        datosDeCajas('10')
        $('#calendar').data('level',10);
        //calendar.render()
        calendar.refetchEvents()


    })

    //necesario para que el controlador acepte la peticion POST
    // $.ajaxSetup({
    //     headers: {
    //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //     }
    // });

    // // calendario de proyectos
    // var calendar = new Calendar(calendarEl,
    // {
    //     locale: 'es',
    //     height: 650,
    //     headerToolbar: {
    //         left  : 'prev,next today',
    //         center: 'title',
    //         right : 'dayGridMonth'
    //     },
    //     themeSystem: 'bootstrap',
    //     events: function (fetchInfo, successCallback, failureCallback)
    //     {
    //         $.ajax({
    //             url: "/admin/getdataCalendary",
    //             type: "POST",
    //             data: {
    //             projectLevel : $( '#calendar' ).data( 'level')
    //             },
    //             success: function (data) {
    //             var events = [];
    //             $.each(data.projects, function( index, value ) {
    //                 events.push({
    //                 title           : value.title,
    //                 start           : value.start,
    //                 end             : value.end,
    //                 backgroundColor : value.backgroundColor,
    //                 borderColor     : value.borderColor,
    //                 allDay          : value.allDay,
    //                 groupId         : value.groupId,
    //                 event_id        : value.extendedProps.event_id

    //                 });
    //             });
    //             successCallback(events);
    //             },
    //         });
    //     },
    //     eventClick: function(info) {
    //         $ (".listComp").empty()
    //         cargaPlaylistTerminado('',info.event.extendedProps.event_id,$('#calendar').data('level'),false);
    //     },
    //     editable  : false,
    //     droppable : false,
    // });
    // calendar.render();

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
                    //end : end,
                    projectLevel : $('#calendar').data('level')
                },
                success: function (data) {
                    successCallback(data.projects);
                },
            });
        },
        eventClick: function(info) {
            $(".listComp").empty()
            $(".keyPLay").empty()
            $(".perPLay").empty()
            $(".voiPLay").empty()

            if ( $.fn.DataTable.isDataTable( '#table-shedule' ) )  $('#table-shedule').DataTable().clear().destroy();
            if ( $.fn.DataTable.isDataTable( '.table_sheduleTerminado' ) ) $('.table_sheduleTerminado').DataTable().clear().destroy(); //VAcia tabla de Shedule en TERMINADOS

            cargaPlaylistTerminado('',info.event.extendedProps.event_id,$('#calendar').data('level'),false);
            rellenaSheduleTerminado('',info.event.extendedProps.event_id,($('#calendar').data('level') == 10 ) ? 1 : $('#calendar').data('level'),false);

            $('.droppable-project').children('li').remove(); // vacia LI de integrantes SOLO PARA PRODUCCION (Artistico)
            cargaInstrumentPlaylistTerminado('',info.event.extendedProps.event_id,($('#calendar').data('level') == 10 ) ? 1 : $('#calendar').data('level'),false) // pone los instrumentos extras (percusion, voces, teclados)
            //$('#droppable-extra').children('li').remove();   // vacia LI de integrantes SOLO PARA PRODUCCION (Artistico)
            cargaIntegrantesTerminado('',info.event.extendedProps.event_id,$('#calendar').data('level'));
            $('#artistico').html((info.event.extendedProps.projectArtistico    == 'Terminado')? '<i class="text-success far fa-thumbs-up fa-2x"></i>' : '<i class="text-danger far fa-thumbs-down fa-2x"></i>' )
            $('#produccion').html( (info.event.extendedProps.projectProduccion == 'Terminado')? '<i class="text-success far fa-thumbs-up fa-2x"></i>' : '<i class="text-danger far fa-thumbs-down fa-2x"></i>' )
            $('#archivo').html( (info.event.extendedProps.projectArchivo       == 'Terminado')? '<i class="text-success far fa-thumbs-up fa-2x"></i>' : '<i class="text-danger far fa-thumbs-down fa-2x"></i>' )
            $( ".front" ).hide( "drop", {direction: "left"}, 500 );
            $( ".front-right" ).hide( "drop", {direction: "right"}, 500 );
            setTimeout(function() {
                $('.back').show(500 );
                $('.back-right').show(500 );
            },300);
        },
        editable  : false,
        droppable : false,
    });
    calendar.render();

    $('#volver').on('click', function(){

        $ (".listComp").empty()

        $( ".back" ).hide( "drop", {direction: "left"}, 500 );
        $( ".back-right" ).hide( "drop", {direction: "right"}, 500 );
        setTimeout(function() {
            $('.front').show(500 );
            $('.front-right').show(500 );
            calendar.render()
        },300);
        //calendar.render();

    })
    // funcion para generar un color aleatoriamente para la caja de fechas del timeline

    function generarNumero(numero){
        return (Math.random()*numero).toFixed(0);
    }

    function colorRGB(){
        var coolor = "("+generarNumero(255)+"," + generarNumero(255) + "," + generarNumero(255) +")";
        return "rgb" + coolor;
    }
       // funcion para pintar el TIMELINE
    function timeLineDraw ()
    {
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url : '/admin/alerts/getdataAlerts',
            dataType: 'JSON',
            //data : {  },
            type : 'post',
            //dataType : 'json',
            success : function(datos) {
                  // Paso los datos al Template

                    var plantilla = '';
                    $.each( datos.alerts, function( index, valueTop ){
                        //console.log(valueTop)
                        plantilla += '<div class="time-label text-white">';
                        plantilla += '    <span style="background-color:'+ colorRGB() +';">';
                        plantilla +=  moment(valueTop[0].created_at).format('DD/MM/YYYY')      ;
                        plantilla += '    </span>';
                        plantilla += '</div>';
                        $.each( datos.alerts[index], function( index, value ){
                            var iconoFa ='';
                            var stateName = '';
                            switch(value.alertLevel)
                            {
                                case 1:  // Crear Project
                                    iconoFa   = 'fab fa-audible bg-info';
                                    stateName = 'Proyecto <b>'+value.alertEventName+'</b> creado ';
                                    break;
                                case 2: // borrado
                                    iconoFa ='fa fa-trash bg-red';
                                    stateName = 'Proyecto <b>'+value.alertEventName+'</b> eliminado ';
                                    break;
                                case 3:  // publicacion
                                    iconoFa ='fab fa-galactic-republic bg-info';
                                    stateName = 'Proyecto/s publicado/s, mas datos en el pie del TimeLine ';
                                    break;
                                case 4: // Despublicado
                                    iconoFa ='fab fa-old-republic bg-red';
                                    stateName = 'Proyecto/s despublicado/s, mas datos en el pie del TimeLine ';
                                    break;
                                case 5: // Terminado
                                    iconoFa ='fas fa-step-forward bg-yellow';
                                    stateName = 'Proyecto <b>'+value.alertEventName+'</b> terminado ';
                                    break;
                                case 6: // Proceso
                                    iconoFa ='fas fa-play bg-green';
                                    stateName = 'Proyecto <b>'+value.alertEventName+'</b> se ha vuelto a poner en estado de <b> proceso </b> ';
                                    break;
                                case 7: // Modificado
                                    iconoFa ='fas fa-edit bg-warning';
                                    stateName = 'Proyecto <b>'+value.alertEventName+'</b> ha sufrido cambios ';
                                    break;
                                default : // Resto de levels
                                    iconoFa = 'fa-flag-o bg-yellow';
                                    stateName = 'Este estado no está definido, contacte con Juan Monche para repararlo';
                            }
                                plantilla += '<div>';
                                plantilla += '     <i class="'+ iconoFa +'"></i>';
                                plantilla += '     <div class="timeline-item">';
                                plantilla += '          <span class="time"><i class="fas fa-clock"></i> '+ moment(value.created_at).format('hh:mm:ss')+'</span>';
                                plantilla += '          <h3 class="timeline-header">'+stateName +' por <a href="#">'+value.users.name+'</a></h3>';
                                plantilla += '          <div class="timeline-body">'
                                if (!value.alertNote) value.alertNote = '';
                                plantilla += 'Módulo: <b>'+ value.alertModule+'</b> '
                                plantilla += '              <p>Notas adicionales: <span class="text-green">'+value.alertNote+'</span></p>';
                                plantilla += '           </div>';
                                // plantilla += '           <div class="timeline-footer">';
                                // plantilla += '               <a class="btn btn-primary btn-sm">Read more</a>';
                                // plantilla += '           </div>';
                                plantilla += '      </div>';
                                plantilla += '</div>';
                        });
                    });

                  // Coloco el HTML compkado a la pagina
                  $('#time_line').html(plantilla);
            },
            error : function(xhr, status) {
                alert('no hay ninguna alerta que mostrar');
            },
            complete : function(xhr, status) {

            }
        });
    }


})
