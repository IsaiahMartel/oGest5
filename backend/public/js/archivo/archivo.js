
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
    // tabla que muestra las obras  -

        function contenidoFila ( d ) {

            //console.log(d.libraries)
            // `d` is the original data object for the row

            var flute           = (d.flute           === undefined || d.flute          == null) ? '' : d.flute ;
            var fluteExp        = (d.fluteExp        === undefined || d.fluteExp       == null) ? '' : d.fluteExp;
            var oboe            = (d.oboe            === undefined || d.oboe           == null) ? '' : d.oboe;
            var oboeExp         = (d.oboeExp         === undefined || d.oboeExp        == null) ? '' : d.oboeExp;
            var clarinet        = (d.clarinet        === undefined || d.clarinet       == null) ? '' : d.clarinet;
            var clarinetExp     = (d.clarinetExp     === undefined || d.clarinetExp    == null) ? '' : d.clarinetExp;
            var bassoon         = (d.bassoon         === undefined || d.bassoon        == null) ? '' : d.bassoon;
            var bassoonExp      = (d.bassoonExp      === undefined || d.bassoonExp     == null) ? '' : d.bassoonExp;
            var horn            = (d.horn            === undefined || d.horn           == null) ? '' : d.horn;
            var hornExp         = (d.hornExp         === undefined || d.hornExp        == null) ? '' : d.hornExp;
            var trumpet         = (d.trumpet         === undefined || d.trumpet        == null) ? '' : d.trumpet;
            var trumpetExp      = (d.trumpetExp      === undefined || d.trumpetExp     == null) ? '' : d.trumpetExp;
            var trombone        = (d.trombone        === undefined || d.trombone       == null) ? '' : d.trombone;
            var tromboneExp     = (d.tromboneExp     === undefined || d.tromboneExp    == null) ? '' : d.tromboneExp;
            var tuba            = (d.tuba            === undefined || d.tuba           == null) ? '' : d.tuba;
            var tubaExp         = (d.tubaExp         === undefined || d.tubaExp        == null) ? '' : d.tubaExp;
            var timpani         = (d.timpani         === undefined || d.timpani        == null) ? '' : d.timpani;
            var timpaniExp      = (d.timpaniExp      === undefined || d.timpaniExp     == null) ? '' : d.timpaniExp;
            var harp            = (d.harp            === undefined || d.harp           == null) ? '' : d.harp;
            var harpExp         = (d.harpExp         === undefined || d.harpExp        == null) ? '' : d.harpExp;
            var percussion      = (d.percussion      === undefined || d.percussion     == null) ? '' : d.percussion;
            var percussionExp   = (d.percussionExp   === undefined || d.percussionEx   == null) ? '' : d.percussionExp;
            var keyboard        = (d.keyboard        === undefined || d.keyboard       == null) ? '' : d.keyboard;
            var keyboardExp     = (d.keyboardExp     === undefined || d.keyboardExp    == null) ? '' : d.keyboardExp;
            var extra           = (d.extra           === undefined || d.extra          == null) ? '' : d.extra;
            var extraExp        = (d.extraExp        === undefined || d.extraExp       == null) ? '' : d.extraExp ;
            var vocals          = (d.vocals          === undefined || d.vocals         == null) ? '-' :d.vocals;
            var violin1         = (d.violin1         === undefined || d.violin1        == null) ? '-' :d.violin1;
            var violin2         = (d.violin2         === undefined || d.violin2        == null) ? '-' :d.violin2;
            var viola           = (d.violin1         === undefined || d.violin1        == null) ? '-' :d.violin1;
            var cello           = (d.violin1         === undefined || d.violin1        == null) ? '-' :d.violin1;
            var bass            = (d.violin1         === undefined || d.violin1        == null) ? '-' :d.violin1;
            var stringsExp      = (d.stringsExp      === undefined || d.stringsExp     == null) ? '' : d.stringsExp;
            var workArrangement = (d.workArrangement === undefined || d.workArrangement== null) ? '' : d.workArrangement ;
            var workCompyear    = (d.workCompyear    === undefined || d.workCompyear   == null) ? '' : d.workCompyear;
            var workCatalog     = (d.workCatalog     === undefined || d.workCatalog    == null) ? '' : d.workCatalog;
            var workDetail      = (d.workDetail      === undefined || d.workDetail     == null) ? '' : d.workDetail;
            var workNotes       = (d.workNotes       === undefined || d.workNotes      == null) ? '' : d.workNotes;

            var libraryCatalog          = (d.libraries == null) ? '' : d.libraries.libraryCatalog;
            var libraryInstrumentation  = (d.libraries == null) ? '' : d.libraries.libraryInstrumentation;
            var libraryParts            = (d.libraries == null) ? 0  : d.libraries.libraryParts;
            var libraryWwdouble         = (d.libraries == null) ? 0  : d.libraries.libraryWwdouble;
            var librarystringMasters    = (d.libraries == null) ? 0  : d.libraries.librarystringMasters;
            var libraryPermanent        = (d.libraries == null) ? 0  : d.libraries.libraryPermanent;

            var libraryCompra           = (d.libraries == null) ? 0  : d.libraries.libraryCompra;
            var libraryAlquiler         = (d.libraries == null) ? 0  : d.libraries.libraryAlquiler;

            var libraryMaterial         = (d.libraries == null) ? '' : d.libraries.libraryMaterial;
            var libraryStrings          = (d.libraries == null) ? '' : d.libraries.libraryStrings;
            var libraryNotes            = (d.libraries == null) ? '' : d.libraries.libraryNote;

            var libraryAddress            = (d.libraries == null) ? '' : (d.libraries.addresses == null )? '' : d.libraries.addresses.addresslastName ;


            libraryParts            = (libraryParts         == 0) ? '<i class="far fa-thumbs-down fa-2x"></i>' : '<i class="far fa-thumbs-up fa-2x text-success"></i>';
            libraryWwdouble         = (libraryWwdouble      == 0) ? '<i class="far fa-thumbs-down fa-2x"></i>' : '<i class="far fa-thumbs-up fa-2x text-success"></i>';
            librarystringMasters    = (librarystringMasters == 0) ? '<i class="far fa-thumbs-down fa-2x"></i>' : '<i class="far fa-thumbs-up fa-2x text-success"></i>';
            libraryPermanent        = (libraryPermanent     == 0) ? '<i class="far fa-thumbs-down fa-2x"></i>' : '<i class="far fa-thumbs-up fa-2x text-success"></i>';
            libraryCompra           = (libraryCompra        == 0) ? '<i class="far fa-thumbs-down fa-2x"></i>' : '<i class="far fa-thumbs-up fa-2x text-success"></i>';
            libraryAlquiler         = (libraryAlquiler      == 0) ? '<i class="far fa-thumbs-down fa-2x"></i>' : '<i class="far fa-thumbs-up fa-2x text-success"></i>';

            //var percussion = (d.instruments == null) ? '' :d.instruments.instrumentName +' ~ '+ d.instruments.instrumentName2;
            //percussion = '' ;

            //var Keyboard = (d.instruments == null) ? '' :d.instruments.instrumentName +' ~ '+ d.instruments.instrumentName2;

            var contenido = '';

            contenido += '<div class="">';
            contenido += '<p class="negrita">Instrumentación</p>';
            contenido += '    <div class="row">'
            contenido += '        <div class="col-sm">';
            contenido += '        <p> Flauta: <span class="negrita">'+ flute+'</span> ~ <span class="descripcion-instrumento">'+fluteExp +'</span></p>';
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        <p> Trompa: <span class="negrita">'+ horn+'</span> ~ <span class="descripcion-instrumento">'+hornExp +'</span></p></td>'
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        <p> Timpani: <span class="negrita">'+ timpani+'</span> ~ <span class="descripcion-instrumento">'+timpaniExp +'</span></p></td>'
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        <p> Arpa: <span class="negrita">'+ harp+'</span> ~ <span class="descripcion-instrumento">'+harpExp +'</span></p></td>'
            contenido += '        </div>'
            contenido += '    </div>'

            contenido += '    <div class="row">'
            contenido += '        <div class="col-sm">'
            contenido += '        <p> Oboe: <span class="negrita">'+ oboe+'</span> ~ <span class="descripcion-instrumento">'+oboeExp +'</span></p>';
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        <p> Trompeta: <span class="negrita">'+ trumpet+'</span> ~ <span class="descripcion-instrumento">'+trumpetExp +'</span></p></td>'
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        <p> Percusión: <span class="negrita">'+percussion+'</span> ~ <span class="descripcion-instrumento">'+percussionExp +'</span></p></td>'
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        <p> Teclado: <span class="negrita">'+ keyboard+'</span> ~ <span class="descripcion-instrumento">'+keyboardExp +'</span></p></td>'
            contenido += '        </div>'
            contenido += '    </div>'

            contenido += '    <div class="row">'
            contenido += '        <div class="col-sm">'
            contenido += '        <p> Clarinete: <span class="negrita">'+ clarinet+'</span> ~ <span class="descripcion-instrumento">'+clarinetExp +'</span></p>';
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        <p> Trombon: <span class="negrita">'+ trombone+'</span> ~ <span class="descripcion-instrumento">'+tromboneExp +'</span></p></td>'
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        <p> Extras: <span class="negrita">'+ extra+'</span> ~ <span class="descripcion-instrumento">'+extraExp +'</span></p></td>'
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        </div>'
            contenido += '    </div>'

            contenido += '    <div class="row">'
            contenido += '        <div class="col-sm">'
            contenido += '        <p> Fagot: <span class="negrita">'+ bassoon+'</span> ~ <span class="descripcion-instrumento">'+bassoonExp +'</span></p>';
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        <p> Tuba: <span class="negrita">'+ tuba+'</span> ~ <span class="descripcion-instrumento">'+tubaExp +'</span></p></td>'
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        <p> Voces: <span class="negrita">'+ vocals+'</span> ~ <span class="descripcion-instrumento">'+vocals +'</span></p></td>'
            contenido += '        </div>'
            contenido += '    </div>'
            contenido += ' <hr/>';


            contenido += '    <div class="row">'
            contenido += '        <div class="col-sm">'
            contenido += '          <p><span class="negrita">Arreglo: </span>'+ workArrangement + '</p>';
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '          <p><span class="negrita">Año de Composición: </span>'+ workCompyear + '</p>';
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '          <p><span class="negrita">Catalogo General: </span>'+ workCatalog + '</p>';
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        <p><span class="negrita">Cuerda: </span>'+ violin1+'/'+violin2+'/'+viola+'/'+cello+'/'+bass+ '</p>';
            contenido += '        </div>'
            contenido += '        <div class="col-sm">'
            contenido += '        <p><span class="negrita">Notas Cuerda: </span>'+ stringsExp +'</p>';
            contenido += '        </div>'
            contenido += '    </div>'
            contenido += ' <hr/>';

            contenido += '    <div class="row">'
            contenido += '        <div class="col-sm-6">'
            contenido += '          <p><span class="negrita">Detalles: </span>'+ workDetail + '</p>';
            contenido += '        </div>'
            contenido += '        <div class="col-sm-6">'
            contenido += '        <p><span class="negrita">Notas Generales: </span>'+ workNotes + '</p>';
            contenido += '        </div>'
            contenido += '    </div>'
            contenido += ' <hr/>';
            contenido += '</div>';

            contenidoLibrary = '';
            contenidoLibrary += '<div class="">';
            contenidoLibrary += '    <div class="row">'
            contenidoLibrary += '        <div class="col-1">'
            contenidoLibrary += '           <p> Partes: <br> <span class="negrita">'+ libraryParts+'</span> </p></td>'
            contenidoLibrary += '        </div>'
            contenidoLibrary += '        <div class="col-1">'
            contenidoLibrary += '           <p> String Masters: <br> <span class="negrita">'+ librarystringMasters+'</span> </p></td>'
            contenidoLibrary += '        </div>'
            contenidoLibrary += '        <div class="col-1">'
            contenidoLibrary += '           <p> Comprada: <br> <span class="negrita">'+ libraryCompra+'</span> </p></td>'
            contenidoLibrary += '        </div>'
            contenidoLibrary += '        <div class="col-2">';
            contenidoLibrary += '        <p> Catalogo: <span class="negrita">'+ libraryCatalog+'</span> </p>';
            contenidoLibrary += '        </div>'
            contenidoLibrary += '        <div class="col-3">';
            contenidoLibrary += '        <p> Representante: <span class="negrita">'+ libraryAddress+'</span> </p>';
            contenidoLibrary += '        </div>'
            contenidoLibrary += '        <div class="col-4">'
            contenidoLibrary += '        <p> Instrumentación: <span class="negrita">'+ libraryInstrumentation+'</span> </p></td>'
            contenidoLibrary += '        </div>'
            contenidoLibrary += '    </div>'

            contenidoLibrary += '    <div class="row">'
            contenidoLibrary += '        <div class="col-1">'
            contenidoLibrary += '           <p> Double: <br><span class="negrita">'+ libraryWwdouble+'</span> </p></td>'
            contenidoLibrary += '        </div>'
            contenidoLibrary += '        <div class="col-1">'
            contenidoLibrary += '           <p> Permanent : <br><span class="negrita">'+ libraryPermanent+'</span> </p></td>'
            contenidoLibrary += '        </div>'
            contenidoLibrary += '        <div class="col-1">'
            contenidoLibrary += '           <p> Alquilada: <br> <span class="negrita">'+ libraryAlquiler+'</span> </p></td>'
            contenidoLibrary += '        </div>'
            contenidoLibrary += '        <div class="col-2">'
            contenidoLibrary += '        <p> Material: <span class="negrita">'+libraryMaterial+'</span></p></td>'
            contenidoLibrary += '        </div>'
            contenidoLibrary += '        <div class="col-3">'
            contenidoLibrary += '        <p> Cuerda: <span class="negrita">'+libraryStrings+'</span></p></td>'
            contenidoLibrary += '        </div>'
            contenidoLibrary += '        <div class="col-4">'
            contenidoLibrary += '        <p> Notas: <span class="negrita">'+libraryNotes+'</span></p></td>'
            contenidoLibrary += '        </div>'
            contenidoLibrary += '    </div>'
            contenidoLibrary += '</div>'

            contenidoExtra = ''
            contenidoExtra += '<div class="">'
            contenidoExtra += '    <div class="row">'
            contenidoExtra += '        <div class="col-4">'
            contenidoExtra += '        <p><span class="negrita">Percusión: </span></p>'

            contenidoExtra +='<div class="card-body p-0">';
            contenidoExtra +='  <table class="table table-sm"';
            contenidoExtra +='      <tbody>';
            $.each(d.percussions, function (index, percussion) {
                contenidoExtra +='          <tr>';
                contenidoExtra +='              <td>'+percussion.instrumentName +' ~ '+ percussion.instrumentName2+'</td>';
                contenidoExtra +='          </tr>';
            });
            contenidoExtra +='      </tbody>';
            contenidoExtra +='  </table>';
            contenidoExtra +='</div>';

            contenidoExtra += '</td>'
            contenidoExtra += '        </div>'
            contenidoExtra += '        <div class="col-4">'
            contenidoExtra += '        <p class="negrita"> Teclado: </p></td>'

            contenidoExtra +='<div class="card-body p-0">';
            contenidoExtra +='  <table class="table table-sm"';
            contenidoExtra +='      <tbody>';
            $.each(d.keyboards, function (index, keyboard) {
                contenidoExtra +='          <tr>';
                contenidoExtra +='              <td>'+keyboard.instrumentName +' ~ '+ keyboard.instrumentName2+'</td>';
                contenidoExtra +='          </tr>';
            });
            contenidoExtra +='      </tbody>';
            contenidoExtra +='  </table>';
            contenidoExtra +='</div>';

            contenidoExtra += '        </div>'
            contenidoExtra += '        <div class="col-4">'
            contenidoExtra += '        <p class="negrita"> Voces: </p></td>'


            contenidoExtra +='<div class="card-body p-0">';
            contenidoExtra +='  <table class="table table-sm"';
            contenidoExtra +='      <tbody>';
            $.each(d.voices, function (index, voice) {
                contenidoExtra +='          <tr>';
                contenidoExtra +='              <td>'+voice.instrumentName +' ~ '+ voice.instrumentName2+'</td>';
                contenidoExtra +='          </tr>';
            });
            contenidoExtra +='      </tbody>';
            contenidoExtra +='  </table>';
            contenidoExtra +='</div>';


            contenidoExtra += '        </div>'
            contenidoExtra += '    </div>'
            contenidoExtra += '</div>'


            contenidoTotal  = ''
            contenidoTotal += '<div class="card card-primary card-tabs">'
            contenidoTotal += '  <div class="card-header p-0 pt-1">'
            contenidoTotal += '    <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">'
            contenidoTotal += '      <li class="nav-item">'
            contenidoTotal += '        <a class="nav-link active" id="custom-tabs-home-tab-'+d.id+'" data-toggle="pill" href="#custom-tabs-work-'+d.id+'" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">Obras</a>'
            contenidoTotal += '      </li>'
            contenidoTotal += '      <li class="nav-item">'
            contenidoTotal += '        <a class="nav-link" id="custom-tabs-profile-tab-'+d.id+'" data-toggle="pill" href="#custom-tabs-library-'+d.id+'" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false">Archivo</a>'
            contenidoTotal += '      </li>'
            contenidoTotal += '      <li class="nav-item">'
            contenidoTotal += '        <a class="nav-link" id="custom-tabs-messages-tab-'+d.id+'" data-toggle="pill" href="#custom-tabs-extra-'+d.id+'" role="tab" aria-controls="custom-tabs-one-messages" aria-selected="false">Extras</a>'
            contenidoTotal += '      </li>'
            contenidoTotal += '    </ul>'
            contenidoTotal += '  </div>'
            contenidoTotal += '  <div class="card-body">'
            contenidoTotal += '    <div class="tab-content" id="custom-tabs-tabContent">'
            contenidoTotal += '      <div class="tab-pane fade show active" id="custom-tabs-work-'+d.id+'" role="tabpanel" aria-labelledby="custom-tabs-home-tab">'
            contenidoTotal +=           contenido
            contenidoTotal += '      </div>'
            contenidoTotal += '      <div class="tab-pane fade" id="custom-tabs-library-'+d.id+'" role="tabpanel" aria-labelledby="custom-tabs-profile-tab">'
            contenidoTotal +=           contenidoLibrary
            contenidoTotal += '      </div>'
            contenidoTotal += '      <div class="tab-pane fade" id="custom-tabs-extra-'+d.id+'" role="tabpanel" aria-labelledby="custom-tabs-messages-tab">'
            contenidoTotal +=           contenidoExtra
            contenidoTotal += '      </div>'
            contenidoTotal += '    </div>'
            contenidoTotal += '  </div>'

            contenidoTotal += '</div>'

            return contenidoTotal
        }



        var table_works = $('#table-works').DataTable(
        {
            //"responsive": false,
            "autoWidth": true,
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
                {
                    "className":      'dt-control',
                    "orderable":      false,
                    "data":           null,
                    "defaultContent": '',
                    "width": "10px"
                },
                { data: 'id', title: 'id',"width": "20px" },
                { data: 'workName' , title: 'Nombre de Obra'},
                { data: 'workName2',title: 'Nombre 2',"width": "100px" },
                { data: null,title: 'Catalogo Ar.',"width": "75px",
                    render: function ( data, type, row )
                    {
                        var libray =''
                       //if ((data.libraries == null)) library ='';
                        var library = (data.libraries == null) ? '' : data.libraries.libraryCatalog ;
                        return library;

                    }
                },
                { data: null , title: 'Instrumentación','orderable':false,
                    render: function ( data, type, row )
                    {
                        return pintaPlantilla(data);
                    }
                },
                { data: 'workDuration',title: 'Duración',"width": "75px"},
                { data: null,title : 'Acciones',  orderable: false, "width": "auto", defaultContent: 'action',render:
                    function(data,type,row){
                        console.log(data)
                        var action = "<div class='btn-group'>" ;
                        if (data.permission == true) {
                            action += "<a href='#' id-delete=" + data.id + " class='delete btn btn-danger' role='button'><i class='fa fa-trash'></i></a> ";
                            action += "<a target='_blank' href='archivo/workEdit/" + data.id + "' class='btn btn-success'><i class='fa fa-edit'></i></a>";
                             if (data.libraries != null && data.libraries != undefined){
                                 if (data.libraries.libraryUrl !='' && data.libraries.libraryUrl != null && data.libraries.libraryUrl != undefined){
                                     action += "<a target='_blank' href='store/?url=" + data.libraries.libraryUrl + "' class='btn btn-primary'><i class='fa fa-book'></i></a>";
                                 }
                             }
                        }
                            action += "</div>" ;
                        return  action ;
                    },
                },
            ],
                order: [[1, 'asc']]
        }).draw();


// Añade el evento que escucha el CLICK sobre el boton details-control

    $('#table-works tbody').on('click', 'td.dt-control', function () {

        var tr = $(this).closest('tr');
        var row = table_works.row( tr );

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
    //rellenaWorks();
    // detecta cambio en SELECT de compositor

    $("#selectComposer").change(function(){

        table_works.ajax.reload();

    });

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
        var harp        = (data.harp        === undefined  || data.harpExp     == null  || data.harpExp     == 0) ? '' : '<b>-'+ data.harp+ 'hp</b>';
        var harpExp     = (data.harpExp     === undefined  || data.harpExp     == null  || data.harpExp     == 0) ? '' :  '['+ data.harpExp + ']';
        var keyboard    = (data.keyboard    === undefined  || data.keyboard    == null  || data.keyboard    == 0) ? '' : '<b>-'+ data.keyboard+ '</b>';
        var keyboardExp = (data.keyboardExp === undefined  || data.keyboardExp == null  || data.keyboardExp == 0) ? '' : '['+ data.keyboardExp + ']';
        var extra       = (data.extra       === undefined  || data.extra       == null  || data.extra       == 0) ? '' : '<b>-'+ data.extra+ '</b>';
        var extraExp    = (data.extraExp    === undefined  || data.extraExp    == null  || data.extraExp    == 0) ? '' :  '['+ data.extraExp + ']';
        var str         = (data.stringsExp  === undefined  || data.stringsExp  == null  || data.stringsExp  == 'N') ? '' :  ' ,str';

        var instrumentacion = '<span class= madera>'+ flute +fluteExp  +oboe  +oboeExp +clarinet +clarinetExp +bassoon +bassoonExp +' </span> '+
        '<b> -- </b> <span class= metales>'+
        horn +hornExp +trumpet +trumpetExp +trombone +tromboneExp +tuba +tubaExp +'</span>  </span> <span class= otrosinst>' +timpani +percussion +harp +harpExp +keyboard +keyboardExp +extra +extraExp + str+ ' </span>';

        return instrumentacion

    }

    // detecta Botón ELIMINAR obra

    $("#table-works").on('click','a.delete',function(e){
        e.preventDefault();
        var rowData = table_works.row( $(this).parents("tr") ).data();
        work_id  = rowData['id']

        Swal.fire({
            title: '¿ Estas seguro que quieres eliminar esta obra ?',
            text: "Esta acción no tiene marcha atras, se perderan todos los datos almacenados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'SI, quiero borrar la obra !'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url : '/admin/archivo/deleteWork',
                    headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    type : 'POST',
                    data: {
                        'work_id': work_id,
                    },
                    dataType : 'json',
                    success : function(json) {
                        table_works.ajax.reload(null,false);
                        if (json.message == true){
                            Swal.fire({
                                icon: 'success',
                                title: 'Obra Eliminada!',
                                text: 'Todos los datos relacionados a esta obra se han.',
                                footer: 'Archivo'
                            })
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Obra NO Eliminada!',
                                text: json.text,
                                footer: 'Archivo'
                            })
                        }
                    }
                });
            }
        })
    });

});
