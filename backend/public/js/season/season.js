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

var fecha = new Date();
var year = fecha.getFullYear();
var newyear = year+1;
var postyear = newyear+1

$(document).ready(function()
{

    //Inicialización de daterange para ponerlo en español
    $('#daterange').daterangepicker({
        'autoUpdateInput': true,
        "showDropdowns": true,
        "showWeekNumbers": true,
        "showISOWeekNumbers": true,
        "ranges": {
            'Actual': ["01/09/"+ year, "01/08/"+ newyear],
            'Proxima': ["01/09/"+ newyear, "01/08/"+postyear]
        },
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
        "startDate": "01/09/"+ year,
        "endDate": "31/07/"+ newyear,
        "drops": "auto"
    });

    $('#daterange').val('');


    // tabla que muestra los season  -

    var table_season = $('#table-season').DataTable(
    {
        "responsive": true,
        "language": idioma,
        "ajax": {
            "headers": {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
            "data":{ "tipo" : 1},
            "url": "/admin/seasons/getdaSeason",
            "type": "POST",

        },

        "columns":
        [

            { data: 'id', title: 'id' },
            { data: null,title : 'Acciones',  orderable: false, defaultContent: 'action',render:

            function(data,type,row){

                var action = "<div class='btn-group'>" ;
                //action += "<a href='#' id-delete=" + data.id + " class='delete btn btn-danger' role='button'><i class='fa fa-trash'></i></a> ";
                action += "<a href='#' class='edit btn btn-primary'><i class='fa fa-edit'></i></a>";
                action += "</div>" ;
                return  action ;
                },

            },
            { data: 'seasonName' , title: 'Nombre de temporada'},
            { data: 'seasonNote',title: 'Descripción' },
            { data: 'seasonDateIni',
                title: 'Inicio de temporada',
                name: 'seasonIni',
                render: function ( data, type, row ) {
                    return moment(data).format('DD-MM-YYYY')
                },
                visible: true
            },
            { data: 'seasonDateEnd',
                title: 'Fin de temporada',
                name: 'seasonEnd',
                render: function ( data, type, row ) {
                    return moment(data).format('DD-MM-YYYY')
                },
                visible: true
            },
            { data: null,
                title: 'C. completa',
                name: 'seasonEnd',
                render: function ( data, type, row ) {
                    return data.configs.configCompleta
                },
                visible: true
            },
            { data: null,
                title: 'C. reducida',
                name: 'seasonEnd',
                render: function ( data, type, row ) {
                    return data.configs.configReducida
                },
                visible: true
            },
            { data: null,
                title: 'Sin cuerda',
                name: 'seasonEnd',
                render: function ( data, type, row ) {
                    return data.configs.configSin
                },
                visible: true
            },
            { data: null,
                title: 'Por determinar',
                name: 'seasonEnd',
                render: function ( data, type, row ) {
                    return data.configs.configPd
                },
                visible: true
            },
            { data: null,
                title: 'D. Titular',
                name: 'seasonEnd',
                render: function ( data, type, row ) {
                    return data.configs.configTitular
                },
                visible: true
            },


        ],
            order: [[1, 'asc']]


    });

    // da funcionalidad al boton cancelar

    $('#Cancel').on('click',function(){
        $('#seasonName').val('');
        $('#seasonNote').val('');
        $('#daterange').val('');
        $('#editar').val('');
        $('#configTitular').val('');
        $('#botonAd').removeClass('btn-warning');
        $('#botonAd').addClass('btn-success');
        $('.creation').removeClass('is-invalid box-solid');
        $('.creation').addClass('box-success');
        $('.form-control').removeClass('is-valid');
        $('#edit-color').removeClass('table-primary');
        $('#botonAd').html('Añadir Temporada');
        table_season.$('tr.table-primary').removeClass('table-primary');


    })

    // añade la funcionalidad de edición del seasson

    $('#table-season tbody').on( 'click', 'a.edit', function () {

        var data = table_season.row( $(this).parents("tr") ).data();

        //$(this).parents("tr").toggleClass('table-primary');

        console.log(data)
        table_season.$('tr.table-primary').removeClass('table-primary');
        $('#edit-color').addClass('table-primary');
        $(this).parents("tr").addClass('table-primary');

        $('#seasonName').val(data.seasonName);
        $('#seasonNote').val(data.seasonNote);
        $('#configCompleta').val(data.configs.configCompleta);
        $('#configReducida').val(data.configs.configReducida);
        $('#configSin').val(data.configs.configSin);
        $('#configPd').val(data.configs.configPd);
        $('#configTitular').val(data.configs.configTitular);
        $('#daterange').val(moment(data.seasonDateIni).format('DD/MM/YYYY') + ' - ' + moment(data.seasonDateEnd).format('DD/MM/YYYY'))
        $('#editar').val(data.id);
        $('#botonAd').removeClass('btn-info' );
        $('#botonAd').addClass('btn-warning ');
        $('.box').addClass('box-solid ');
        $('#botonAd').html('Modificar temporada');

    });

    // validate para comprobar que no solapa fechas en temporada
    $.validator.addMethod("cSolape", function( value, element){
        var editar = $('#editar').val();
        var daterange = $('#daterange').val();
        //alert (daterange)
        //return false; // si retorna true la validacion es buena y continua sin alerta
        $.ajax({
            url : '/admin/seasons/getsolapeSeason',
            headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type : 'POST',
            data: {
                editar: editar,
                daterange: daterange
            },
            async: false,
            dataType : 'json',
            success : function(json) {

                if (json['message'] == 'solapa')   resultado = false;
                if (json['message'] == 'noSolapa') resultado = true;
            }
        });
        return resultado;

    });

    // validate para comprobar que no existe el season
    $.validator.addMethod("cExiste", function( value, element){

        var editar = $('#editar').val();
        var seasonName = $('#seasonName').val();

        //return false; // si retorna true la validacion es buena y continua sin alerta
        $.ajax({
            url : '/admin/seasons/getexisteSeason',
            headers: {
                     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type : 'POST',
            data: {
                editar: editar,
                seasonName: seasonName
            },
            async: false,
            dataType : 'json',
            success : function(json) {
                if (json['message'] == 'existe') resultado = false;
                if (json['message'] == 'noExiste') resultado = true;
            }
        });
        return resultado;
    });
    // plugin validate para validar el formulario de añadir season
    $('#form-season').validate({
        rules: {
                //validacionCompleja : "#campo1",
                seasonName:     { cExiste: true  },
                daterange:      { cSolape: true  },
                configCompleta: { required: true },
                configReducida: { required: true },
                configSin:      { required: true },
                configPd:       { required: true },
                configTitular:  { required: true },
            },
        messages: {
            seasonName:     "Este campo es obligatorio y no puede estar repetido",
            daterange:      "El rango de fechas está ya en uso o ha dejado el campo vacio",
            configCompleta: "Este campo es obligatorio",
            configReducida: "Este campo es obligatorio",
            configSin:      "Este campo es obligatorio",
            configPd:       "Este campo es obligatorio",
            configTitular:  "Este campo es obligatorio",
        },
        errorPlacement : function(error, element) {
            $(element).closest('.form-group').find('.help-block').html(error.html());
            $(element).closest('.form-group').find('.help-block').addClass('text-danger');
        },
        highlight : function(element) {
            //$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            $(element).addClass('is-invalid');
            $(element).find('.form-control').css('display', 'initial');
         },
        unhighlight: function(element, errorClass, validClass) {
            //$(element).closest('.form-group').removeClass('has-error').addClass('has-success');
            //$(element).closest('.form-group').find('.help-block').html('');
            $(element).removeClass('is-invalid');
            $(element).addClass('is-valid');
            $(element).closest('.form-group').find('.help-block').html('');
         },
        submitHandler: function(form) {
            var datos = $('#form-season').serialize();
            $.ajax({
                url : '/admin/seasons/storeSeason',
                headers: {
                         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data : datos,
                type : 'POST',
                dataType : 'json',
                success : function(data) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro de la temporada completado!',
                        text: 'Los datos se han almacenado correctamente',
                        footer: 'Temporadas'
                    })
                    table_season.ajax.reload(null,false);
                    $('#seasonName').val('');
                    $('#seasonNote').val('');
                    $('#daterange').val('');
                    $('#configTitular').val('');
                    $('#editar').val('');
                    $('#botonAd').removeClass('btn-warning');
                    $('#botonAd').addClass('btn-success');
                    $('.creation').removeClass('is-invalid box-solid');
                    $('.creation').addClass('box-success');
                    $('.form-control').removeClass('is-valid');
                    $('#edit-color').removeClass('table-primary');
                    $('#botonAd').html('Añadir Temporada');

                }
            })
        }
    });



});
