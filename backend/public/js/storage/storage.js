$(document).ready(function()
{
    //Accion de pulsar el boton sobre una de las carpetas
    $('body').on('click','a.partitura',function(e){
        e.preventDefault();
        var url     = $(this).data('url')
        var carpeta = $(this).data('target')

        $.ajax({
            url : '/admin/store/getdirectorios',
            headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type : 'POST',
            data: {
                'url' : url,
            },
            dataType : 'json',
            success: function (response) {
                $(carpeta).append().html(response.plantilla)
            }
        });


    })

})
