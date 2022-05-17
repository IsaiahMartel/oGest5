$(document).ready(function () {

    var data = [
        [
            "Tiger Nixon",
            "System Architect",
            "Edinburgh",
            "5421",
            "2011/04/25",
            "$320,800"
        ],
        [
            "Garrett Winters",
            "Accountant",
            "Tokyo",
            "8422",
            "2011/07/25",
            "$170,750"
        ],
        [
            "Ashton Cox",
            "Junior Technical Author",
            "San Francisco",
            "1562",
            "2009/01/12",
            "$86,000"
        ],
        [
            "Cedric Kelly",
            "Senior Javascript Developer",
            "Edinburgh",
            "6224",
            "2012/03/29",
            "$433,060"
        ],
    ];

    var data2 = [
        [
            "Rhona Davidson",
            "Integration Specialist",
            "Tokyo",
            "6200",
            "2010/10/14",
            "$327,900"
        ],
        [
            "Colleen Hurst",
            "Javascript Developer",
            "San Francisco",
            "2360",
            "2009/09/15",
            "$205,500"
        ],
        [
            "Sonya Frost",
            "Software Engineer",
            "Edinburgh",
            "1667",
            "2008/12/13",
            "$103,600"
        ],
        [
            "Jena Gaines",
            "Office Manager",
            "London",
            "3814",
            "2008/12/19",
            "$90,560"
        ],
    ]

    var table = $('#example').DataTable({
        data: data,
        columnDefs: [
            {
                targets: 0,
                //createdRow : function ( row, data, dataIndex ){
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).parent().addClass('draggable_tr');
                    $(td).attr('data-id',cellData);
                }
            }
        ],
        drawCallback: function () {
            $(".draggable_tr").draggable({
                zIndex        : 1070,
                revert        : true, // vuelve a su sitio de partida
                revertDuration: 0,  //  original position after the drag
                helper: 'clone'

            });
        }
    });

    $("#project").droppable({
        drop: function (event, ui) {
            console.log('drop')
            draggable = ui.draggable;

            console.log(draggable.children().data())


        }
    });


});
