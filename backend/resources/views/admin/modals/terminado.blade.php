<div id='terminado' class = 'container mb-5' style="display: none">
    <div class='container'>
        <div class='row mb-5 bg-danger p-3'>
            <div class="col-md-12 ">
                <button type="" class="btn btn-warning changeState mr-2">Cambiar estado</button>
                <span text-secondary >Pulsa este botón si quieres cambiar el estado del proyecto a "EN PROCESO"</span>
            </div>
        </div>
        </div>
        <div class = "row">
            <div class="col bg-lightblue border border-secondary rounded-top-left-1 border-right-0"><ul class="todo-list listComp m-2" data-widget="todo-list"></ul></div>
            <div class="col border border-secondary rounded-top-right-1">
                <div class="row ml-3">
                    <div class="col">
                        <p class='text-center'> Percusión </p>
                        <ul class="instrument-list perPLay" data-widget="todo-list"></ul>
                    </div>
                    <div class="col">
                        <p class='text-center'> Teclados </p>
                        <ul class="instrument-list keyPLay" data-widget="todo-list"></ul>
                    </div>
                    <div class="col">
                        <p class='text-center'> Voces </p>
                        <ul class="instrument-list voiPLay" data-widget="todo-list"></ul>
                    </div>
                </div>
            </div>
        </div>
        <div class = "row">
            <div class="col bg-warning text-dark border border-secondary rounded-bottom-left-1 border-top-0 border-right-0"> <table class="table table-bordered table-hover table_sheduleTerminado" style="width:100%"></table> </div>
            <div class="col bg-lightblue border border-secondary rounded-bottom-right-1 border-top-0">
                <div class="row">
                    <div class="col">
                    <p class='text-center'> Projecto </p>
                        <ul class="todo-list droppable-project" data-widget="todo-list"></ul>
                    </div>
                    <div class="col">
                    <p class='text-center'> Extras </p>
                       <ul class="todo-list droppable-extra" data-widget="todo-list"></ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
