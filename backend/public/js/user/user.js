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

    // tabla que muestra los Usuarios  -

    var table_user = $('#table-user').DataTable({

        "scrollX": true,
        "language": idioma,
        "ajax": {
            "headers": {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
            "data":{ "tipo" : 1},
            "url": "/admin/users/getdataUser",
            "type": "POST",

        },

        "columns":
		[

            { data: 'id', title: 'id' },
            { data: 'name' , title: 'Nombre Completo'},
            { data: 'email' , title: 'Correo_e'},

            { data: null,title : 'Acciones',  orderable: false, defaultContent: 'action',render:

                function(data,type,row){

                    var action = "<div class='btn-group'>" ;
                    action += "<a href='#' id-delete=" + data.id + " class='delete btn btn-danger' role='button'><i class='fa fa-trash'></i></a> ";
                    action += "<a href='#' class='edit btn btn-success'><i class='fa fa-edit'></i></a>";
                    action += "</div>" ;
                    return  action ;
                },

            },

        ],
            order: [[1, 'asc']]
    });


    // añade la funcionalidad de edición del usuario

    $('#table-user tbody').on( 'click', 'a.edit', function () {

        var data = table_user.row( $(this).parents("tr") ).data();
        $('#edit-color').addClass('table-primary');
        table_user.$('tr.table-primary').removeClass('table-primary');
        $('#edit-color').addClass('table-primary');
        $(this).parents("tr").addClass('table-primary');


        $('#userName').val(data.name);
        $('#userEmail').val(data.email);
        $('#password').val('');
        $("input:checkbox").prop('checked',false)
        $.each(data.roles, function (index, value) {
            $('#radio-'+value.name).prop("checked",true)
        })
        $('#editar').val(data.id);
        $('#botonAdd').removeClass('btn-info' );
        $('#botonAdd').addClass('btn-warning ');
        $('#botonAdd').html('Modificar usuario');



    });


        // da funcionalidad al boton cancelar

        $('#Cancel').on('click',function(){
            $("input:checkbox").prop('checked',false)
            $('#userName').val('');
            $('#userEmail').val('');
            $('#password').val('');
            $('#editar').val('');
            $('#botonAdd').removeClass('btn-warning');
            $('#botonAdd').addClass('btn-success');
            $('.form-control').removeClass('is-valid');
            $('#edit-color').removeClass('table-primary');
            $('#botonAdd').html('Añadir Usuario');
            table_user.$('tr.table-primary').removeClass('table-primary');


        })
        // validate para comprobar que no existe el email
    $.validator.addMethod("cExiste", function( value, element){

        var editar      = $('#editar').val();
        var userEmail   = $('#userEmail').val();
        if (userEmail=='') return false;
        //return false; // si retorna true la validacion es buena y continua sin alerta
        $.ajax({
            url : '/admin/users/getexisteEmail',
            headers: {
                     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type : 'POST',
            data: {
                editar: editar,
                userEmail: userEmail
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
    $.validator.addMethod("cPassword", function( value, element){

        var editar      = $('#editar').val();
        var password    = $('#password').val();

        // si retorna true la validacion es buena y continua sin alerta

        if (editar ==''){ // si está en modo NUEVO USER
            if (password =='') return false;
            else return true
        }
        else return true; // si esta en modo EDICION

    });


         // plugin validate para validar el formulario de añadir season
    $('#form-user').validate({
        rules: {

                userEmail:     {cExiste: true },
                //userName :     {require: true },
                password :     {cPassword: true}

            },
        messages: {

            userEmail:  "Este campo es obligatorio y no puede estar repetido",
            userName :  "Este campo es obligatorio",
            password :  "Este campo es obligatorio para un nuevo usuario"
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
            var roles = [] ;
            // con esto detecto los checkbox que están seleccionados
            $('input[type=checkbox]').each(function() {
                if (this.checked) {
                    roles.push($(this).attr('id').substr(6)); //extraigo el nombre del role que esta almacenado en el id "role-xxxxxxxx"
                }

            });


            $.ajax({
                url : '/admin/users/storeUser',
                headers: {
                         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data : {
                    'editar'   :$('#editar').val(),
                    'userName' :$('#userName').val(),
                    'userEmail':$('#userEmail').val(),
                    'password' : $('#password').val(),
                    'roles'    : JSON.stringify(roles)
                },
                type : 'POST',
                dataType : 'json',
                success : function(data) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Registro de usuario completado!',
                        text: 'Los datos se han almacenado correctamente',
                        footer: 'Usuarios'
                    })
                    table_user.ajax.reload(null,false);
                    $('#userName').val('');
                    $('#userEmail').val('');
                    $('#password').val('');
                    $('#editar').val('');
                    $('#botonAdd').removeClass('btn-warning');
                    $('#botonAdd').addClass('btn-success');
                    $('.form-control').removeClass('is-valid');
                    $('#edit-color').removeClass('table-primary');
                    $('#botonAd').html('Añadir Usuario');
                    $("input:checkbox").prop('checked',false)

                }
            })

        }

    });


});
