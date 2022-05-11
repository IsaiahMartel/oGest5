/**  funciones de carga de listas de usuarios integrantes a proyectos **/

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
// funcion para cargar los integrantes en los CARD #droppable-project y #droppable-extra

    function cargaIntegrantes(season_id,event_id,projectLevel,action=false) {

        $.ajax({
            url : '/admin/produc/cargaIntegrantes',
            headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data : {
                'season_id'      : season_id,
                'event_id'       : event_id,
                'projectLevel'   : projectLevel,
            },
            type : 'POST',
            dataType : 'json',
            success : function(data)
            {
                if (data.message == true) {
                    //console.log(data.integrantes[0].addressgroups[0].addressgroupName)
                    $.each(data.integrantes.addresses, function( index, value ) {
                        var id_address = value.id;
                        var order      = value.pivot.order;
                        var grupo_id   = value.pivot.addressgroup_id;
                        var grupo = '';
                        value.addressgroups.forEach(element => {
                            if (element.id == grupo_id) grupo = element.addressgroupName;
                        });
                        //var grupo      = (value.addressgroups[grupo_id] === undefined ) ? '' : value.addressgroups[grupo_id].addressgroupName
                        var nombre     = value.addressfirstName;
                        var apellido   = value.addresslastName;
                        var id_address_project = value.pivot.id;
                        li = montaInterprete (grupo_id,grupo,apellido,nombre,id_address,order,id_address_project,action)
                        $('#droppable-project').append(li);
                    });
                    $.each(data.extras.extras, function( index, value ) {
                        var id_address = value.id;
                        var order      = value.pivot.order;
                        var grupo_id   = value.pivot.addressgroup_id;
                        var grupo = '';
                        value.addressgroups.forEach(element => {
                            if (element.id == grupo_id) grupo = element.addressgroupName;
                        });
                        var nombre     = value.addressfirstName;
                        var apellido   = value.addresslastName;
                        var id_address_project = value.pivot.id;
                        li = montaInterprete (grupo_id,grupo,apellido,nombre,id_address,order,id_address_project,action)
                        $('#droppable-extra').append(li);
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


// Funcion para montar el li de los aistentes
    function montaInterprete(grupo_id,grupo,apellido,nombre,address_id,order,id_address_project,action=false) {

        var inter  = '<li id="'+ address_id +'" data-group_id="'+ grupo_id +'" data-group="'+ grupo + '" data-order= '+ order + ' id_address_project = '+ id_address_project + ' >';
            inter += '   <div class="row">';
            inter += '        <div class="col-10">';
            inter += '          <div class="product-info"> ';
            inter += '              <p class="font-weight-bold text-info d-flex flex-column text-left">'+grupo.toUpperCase() +'</p>';
            inter += '              <span class="pt-2 font-weight-bold">';
            inter += '              <span class="text-muted">'+apellido+' , '+nombre + '</span>';
            inter += '              </span>';
            inter += '          </div>';
            inter += '       </div>';
            inter +='        <div class="col-2">';
            inter +='           <div class="row">'
            inter +='                <p class="d-flex flex-column text-right font-weight-bold">';
            if (action) inter +='                    <a href="#" class="btn btn-tool btn-sm delList"><i class="far fa-trash-alt"></i></a>';
            inter +='                </p>';
            inter +='           </div>'
            inter +='           <div class="row">'
            inter +='                <p class="d-flex flex-column text-right font-weight-bold">';
            inter +='                    <a href="#" class="btn btn-tool btn-sm infoList"><i class="fa fa-eye"></i></a>';
            inter +='                </p>';
            inter += '          </div>';
            inter += '       </div>';
            inter += '  </div>';
            inter += '</li>'

            return inter

    }
// accioni de pulsar el OJITO dentro de las LI de integrantes del proyecto para dar datos  de contacto
    $('.integrantes').on( 'click', 'a.infoList', function (e) {
        e.preventDefault();

        address_id = $(this).parents('li').attr('id') // id del elemento (LI) clicado

        $.ajax({
            url : '/admin/address/getdataContact',
            headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data : {
                'address_id' : address_id
            },
            type : 'POST',
            dataType : 'json',
            success : function(data)
            {
                var addresslastName =data.address.addresslastName
                var addressStreet   = data.address.addressStreet
                var contacto = ''
                var tb = ''
                $.each(data.address.contacts, function (index, contact) {
                    if (contact.contactTipe == null) contact.contactTipe = '6';
                    switch(contact.contactTipe) {
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

                        tb += '  <div style="text-align:left"; ><p class="badge '+color+'"><i class="'+icon+'"></i><span>'+tipo+'</span></p>'
                        tb += '     <span class="text">'+contact["contactNumber"]+'</span>'
                        tb += '     </br> </div>'

                });
                Swal.fire({
                    title: '<strong>'+addresslastName+'</strong>',
                    icon: 'info',
                    html:
                    tb,
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText:
                        '<i class="fa fa-thumbs-up"></i> OK!',
                })
            }
        })
    })


//Funcion para insertar obra a la lista (Plantilla) plantilla, Apellido Compositor, Nombre compositor, nombre obra, duracion, playlist_id ,id de la Obra (work_id),iconos de accion(true/false)
    function creaLi(data,composerLastname,composerFirstname,workName,workDuration,playlist_id,playlist_string,work_id,action=false) {
        //console.log(data)
        if (workName == 'PAUSA')
        {

            pausa ='<li id='+playlist_id+' data-work="PAUSA">';
            pausa +='  <div class="row bg-success">';
            pausa +='      <div class="col-10">';
            pausa +='           <p class="pt-3 text-white d-flex flex-column text-center"> PAUSA </p>';
            pausa +='       </div>';
            pausa +='       <div class="col-2">';
            pausa +='           <p class ="pt-3">';
            pausa +='                 <a href="#" class=" text-white btn btn-tool btn-sm text-right delList"><i class="far fa-trash-alt"></i></a>';
            pausa +='           </p>';
            pausa +='      </div>';
            pausa +='    </div>';
            pausa +='</li>';

            return pausa ;

        }else {
            //console.log (data);
            var li ='<li id='+playlist_id +' data-work='+ work_id+'  class="pb-2" >';
            li +='   <div class="row">';
            li +='        <div class="col-10">';
            li +='            <p class="d-flex flex-column text-left">';
            li +='                <span> <i class="pr-2 far fa-user text-success" ></i>'+ composerLastname +' ~ '+ composerFirstname+ '</span>';
            li +='                <span> <i class="pr-2 pt-2 fas fa-music text-info" ></i>';
            li +='                <span class="pt-2 font-weight-bold">';
            li +='                    <span class="text-muted">'+workName+'</span>';
            li +='                </span>';
            li +='            </p>';
            li +='        </div>';
            li +='        <div class="col-2">';
            li +='            <p class="d-flex flex-column text-right">';
            li +='                <span class=" duracion font-weight-bold">';
            li +='                    <i class="far fa-clock text-success pr-1"> </i> '+workDuration;
            li +='                </span>';
            li +='            <span class="pt-2font-weight-bold text-right">';
            li +='                <span class="cuerda">'+playlist_string.replace(/,/g, '/')+'</span>';
            li +='            </span>';
            li +='            </p>';

            li +='        </div>';
            li +='   </div>';
            li +='   <div class="row">';
            li +='        <div class="col-10">';
            //li +='            <p class="d-flex flex-column text-left">';
            li +='                <span class="plantilla text-muted">'+ pintaPlantilla(data)+'</span>';
            //li +='            </p>';
            li +='        </div>';

            li +='        <div class="col-2">';
            li +='            <p class="text-righ">';
            li +='                <span class="font-weight-bold">';
            if (action){
                li +='                    <a href="#" class="btn btn-tool btn-sm delList"><i class="far fa-trash-alt"></i></a>';
            }
            li +='                    <a href="#" class="btn btn-tool btn-sm edit"><i class="far fa-edit"></i></a>';
            li +='                </span>';
            li +='            </p>';
            li +='        </div>';
            li +='    </div>';
            li +='</li>';
            return li ;
        }
    }
// pinta la plantilla

    function pintaPlantilla(data) {
        if (data === null ) return 'Desconocida'
        var flute       = (data.flute           === undefined ||data.flute        == null                           ) ? '?' :'<b>'+ data.flute + '</b>';
        var fluteExp    = (data.fluteExp        === undefined ||data.fluteExp     == null || data.fluteExp     == '') ? ',' : '['+data.fluteExp + ']';
        var oboe        = (data.oboe            === undefined ||data.oboe         == null                           ) ? '?' : '<b>'+ data.oboe + '</b>';
        var oboeExp     = (data.oboeExp         === undefined ||data.oboeExp      == null || data.oboeExp      == '') ? ',' : '['+data.oboeExp + ']';
        var clarinet    = (data.clarinet        === undefined ||data.clarinet     == null                           ) ? '?' : '<b>'+ data.clarinet+ '</b>';
        var clarinetExp = (data.clarinetExp     === undefined ||data.clarinetExp  == null || data.clarinetExp  == '') ? ',' : '['+data.clarinetExp + ']';
        var bassoon     = (data.bassoon         === undefined ||data.bassoon      == null                           ) ? '?' : '<b>'+ data.bassoon+ '</b>';
        var bassoonExp  = (data.bassoonExp      === undefined ||data.bassoonExp   == null || data.bassoonExp   == '') ? ',' : '['+data.bassoonExp + ']';
        var horn        = (data.horn            === undefined ||data.horn         == null                           ) ? '?' : '<b>'+ data.horn+ '</b>';
        var hornExp     = (data.hornExp         === undefined ||data.hornExp      == null || data.hornExp      == '') ? ',' :  '['+data.hornExp + ']';
        var trumpet     = (data.trumpet         === undefined ||data.trumpet      == null                           ) ? '?' : '<b>'+ data.trumpet+ '</b>';
        var trumpetExp  = (data.trumpetExp      === undefined ||data.trumpetExp   == null || data.trumpetExp   == '') ? ',' :'['+data.trumpetExp + ']';
        var trombone    = (data.trombone        === undefined ||data.trombone     == null                           ) ? '?' : '<b>'+ data.trombone+ '</b>';
        var tromboneExp = (data.tromboneExp     === undefined ||data.tromboneExp  == null || data.tromboneExp  == '') ? ',' : '['+ data.tromboneExp + ']';
        var tuba        = (data.tuba            === undefined ||data.tuba         == null                           ) ? '?' : '<b>'+ data.tuba+ '</b>';
        var tubaExp     = (data.tubaExp         === undefined ||data.tubaExp      == null || data.tubaExp      == '') ? ',' :  '['+data.tubaExp + ']';
        //var timpani = (data.timpani === undefined) ? '' : '<b>'+ data.timpani+ '</b>' +'; ';
        var percussion = (data.percussion === undefined || data.percussion == null || (data.percussion== 0)) ? '' : '<b>'+ data.percussion + '</b>';
        if ((data.timpani === undefined) || (data.timpani== null) || (data.timpani== 0)){
            timpani = '' ;
        }else {
            if (data.timpani == 1) timpani = '<b>-tmp</b>'
            else timpani = '<b>-'+data.timpani+'tmp</b>';

            // percussion =  '<b>+'+ data.percussion + ' </b>';
        }
        //var percussionExp = (data.percussionExp === undefined) ? '' :  data.percussionExp + '</b><span style="color:#18A2B8";> | </span></b>';
        //var timpaniExp = (data.timpaniExp === undefined) ? '' :  data.timpaniExp + '</b><span style="color:#18A2B8";> | </span></b>';
        var harp        = (data.harp        === undefined  || data.harp        == null  || data.harp        == 0) ? '' : '<b>-'+ data.harp+ 'hp</b>';
        var harpExp     = (data.harpExp     === undefined  || data.harpExp     == null  || data.harpExp     == 0) ? '' :  '['+ data.harpExp + ']';
        var keyboard    = (data.keyboard    === undefined  || data.keyboard    == null  || data.keyboard    == 0) ? '' : '<b>-'+ data.keyboard+ '</b>';
        var keyboardExp = (data.keyboardExp === undefined  || data.keyboardExp == null  || data.keyboardExp == 0) ? '' : '['+ data.keyboardExp + ']';
        var extra       = (data.extra       === undefined  || data.extra       == null  || data.extra       == 0) ? '' : '<b>-'+ data.extra+ '</b>';
        var extraExp    = (data.extraExp    === undefined  || data.extraExp    == null  || data.extraExp    == 0) ? '' :  '['+ data.extraExp + ']';
        var str         = (data.stringsExp  === undefined  || data.stringsExp  == null  || data.stringsExp  == 'N') ? '' :  ' ,str';

        var instrumentacion = '<span class= madera>'+ flute +fluteExp  +oboe  +oboeExp +clarinet +clarinetExp +bassoon +bassoonExp +' </span> '+
        '<b> -- </b> <span class= metales>'+
        horn +hornExp +trumpet +trumpetExp +trombone +tromboneExp +tuba +tubaExp +'</span> <span class= otrosinst>' +timpani +percussion +harp +harpExp +keyboard +keyboardExp +extra +extraExp + str+ ' </span>';

        return instrumentacion
    }



    /*
    **
    **

                                    TERMINADOS

    **
    **
    */

    // Esta funcion rellena la tabla SHEDULLE para los proyectos TERMINADOS

    function rellenaSheduleTerminado(selectSeasonId,selectEventId,projectLevel)
    {
        $('.table_sheduleTerminado').DataTable(
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
                    'season_id'   : selectSeasonId,
                    'event_id'    : selectEventId,
                    'projectLevel': projectLevel
                },
                "url": "/admin/projects/getdataShedule",
                "type": "POST",
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
                { data: 'sheduleTipe' , title: 'tipo','orderable': false},
                { data: 'shedulehourRange',title: 'Horario' ,'orderable': false},
                { data: 'sheduleNote' , title: 'Notas','orderable': false},
                { data: 'rooms' , title: 'Sala','orderable': false,
                    render: function ( data, type, row ) {
                        if (data === null ) return ''
                        return data.roomAcronym
                    }
                },
                {data: 'sheduleOrder' , title: 'order',visible: false},
            ],
            order: [[5, 'asc']]

        });
    }

// funcion para cargar los integrantes en los CARD #droppable-project y #droppable-extra en TERMINADOS

    function cargaIntegrantesTerminado(season_id,event_id,projectLevel) {

        $.ajax({
            url : '/admin/produc/cargaIntegrantes',
            headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data : {
                'season_id'      : season_id,
                'event_id'       : event_id,
                'projectLevel'   : projectLevel,
            },
            type : 'POST',
            dataType : 'json',
            success : function(data)
            {
                if (data.message == true) {
                    //console.log(data.integrantes[0].addressgroups[0].addressgroupName)
                    //console.log(data.integrantes)
                    if (data.integrantes != null) {
                        $.each(data.integrantes.addresses, function( index, value ) {
                            var id_address = value.id;
                            var order      = value.pivot.order;
                            var grupo_id   = value.pivot.addressgroup_id;
                            var grupo = '';
                            value.addressgroups.forEach(element => {
                                if (element.id == grupo_id) grupo = element.addressgroupName;
                            });
                            //var grupo      = (value.addressgroups[grupo_id] === undefined ) ? '' : value.addressgroups[grupo_id].addressgroupName
                            var nombre     = value.addressfirstName;
                            var apellido   = value.addresslastName;
                            var id_address_project = value.pivot.id;
                            li = montaInterprete (grupo_id,grupo,apellido,nombre,id_address,order,id_address_project,false)
                            $('.droppable-project').append(li);
                        });
                        $.each(data.extras.extras, function( index, value ) {
                            var id_address = value.id;
                            var order      = value.pivot.order;
                            var grupo_id   = value.pivot.addressgroup_id;
                            var grupo = '';
                            value.addressgroups.forEach(element => {
                                if (element.id == grupo_id) grupo = element.addressgroupName;
                            });
                            var nombre     = value.addressfirstName;
                            var apellido   = value.addresslastName;
                            var id_address_project = value.pivot.id;
                            li = montaInterprete (grupo_id,grupo,apellido,nombre,id_address,order,id_address_project,false)
                            $('.droppable-extra').append(li);
                        });
                    }else {
                        li = '<li>No hay datos</li>'
                        $('.droppable-extra').append(li);
                    }
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

    // funcion para cargar la lista de obras en un LI

    function cargaPlaylistTerminado(season_id,event_id,projectLevel,action=false) {
        $.ajax({
            url : '/admin/archivo/cargaPlaylist',
            headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data : {
                //'season_id'    : season_id, // no es necesario porque se obtiene desde variable de session SESSION_season_id
                'event_id'     : event_id,
                'projectLevel' : projectLevel,
                'action'       : action
            },
            type : 'POST',
            dataType : 'json',
            success : function(data)
            {
                if (data.message == true) {
                    $('#project_id').val(data.project_id);

                    $.each(data.playlists, function( index, value ) {
                        var composerLastname  = (value.works ==null ) ? '' : value.works.composers.composerLastname ;
                        var composerFirstname = (value.works ==null ) ? '' : value.works.composers.composerFirstname ;
                        var workDuration      = (value.workDuration ==null ) ? '' : value.workDuration ;
                        var work_id           = (value.work_id == null ) ? '' : value.work_id ;
                        var workName          = value.workName ;
                        var playlist_id       = value.id;
                        var playlist_string   = value.playlistString;
                        li = creaLi(value,composerLastname,composerFirstname,workName,workDuration,playlist_id,playlist_string,work_id,action,false) // el ultimo false es para no mostrar los iconos de ACTION
                        $('.listComp').append(li); //añado el LI al UL
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

    // funcion para cargar los instrumentos extras (Percusion , teclasdos y voces)

    function cargaInstrumentPlaylistTerminado(season_id,event_id,projectLevel,action=false) {
        $.ajax({
            url : '/admin/archivo/loaddataPlaylistTerminado',
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
                if (data.message == true) {
                    $.each(data.keyboards, function( index, value ) {
                        li = '<li>'+value.instrumentName+'</li>';
                        $('.keyPLay').append(li); //añado el LI al ULç
                    });
                    $.each(data.percussions, function( index, value ) {
                        li = '<li>'+value.instrumentName+'</li>';
                        $('.perPLay').append(li); //añado el LI al ULç
                    });
                    $.each(data.voices, function( index, value ) {
                        li = '<li>'+value.instrumentName+'</li>';
                        $('.voiPLay').append(li); //añado el LI al ULç
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


