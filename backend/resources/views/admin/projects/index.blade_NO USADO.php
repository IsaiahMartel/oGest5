@extends('adminlte::page')
@push('css')
<style type="text/css">
    body {
        font-size: 14px !important;
    }
</style>
@endpush

@section('title', 'Proyectos')

@section('content_header')
    <h1>Gestión de Proyectos</h1>
@stop

@section('content')
    <!-- Main content -->

    <section class="content">
        <div class="container-fluid">
            <form id='form-projects' name='form-projects'>
                <input id='editar' value="" name='editar' type='hidden'>
                <div class="row">
                    <div class="col-md-4">
                        <div class="card card-primary">
                            <!-- empieza card -->
                            <div class="card-header">
                                <h3 id='card-project' class="card-title">Proyecto</h3>
                                <div class="card-tools">
                                    <button type="button" class="btn btn-tool" data-card-widget="collapse"
                                        title="Collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div id='projects' class="card-body">
                                <!-- / empieza card-body -->
                                <div class="form-group">
                                    <label>Temporada</label>
                                    <div class="row">
                                        <div class="col-md-10">
                                            <select id="selectSeasonName" name="selectseasonName" class="form-control select2" style="width: 100%;">
                                                @if ($seasons->count())
                                                    <option value="0" selected disabled>Escoja Temporada </option>
                                                    @foreach ($seasons as $season)
                                                        <option value="{{ $season->id }}"> {{ $season->seasonName }}
                                                        </option>
                                                    @endforeach
                                                @endif
                                            </select>
                                        </div>
                                        <div class="col-md-2">
                                            <button id='newSeason' type="" class="btn float-right btn-success"><i
                                                    class='fa fa-edit'></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Nombre del evento</label>
                                    <div class="row">
                                        <div class="col-md-10">
                                            <select id="selectEventName" name="selectEventName" class="form-control select2"
                                                style="width: 100%;">
                                                @if ($events->count())
                                                    <option value="0" selected disabled>Escoja nombre del evento </option>
                                                    @foreach ($events as $event)
                                                        <option value="{{ $event->id }}"> {{ $event->eventName }}
                                                        </option>
                                                    @endforeach
                                                @endif
                                            </select>
                                        </div>
                                        <div class="col-md-2">
                                            <button id='newEvent' type="" class="btn float-right btn-success"><i
                                                    class='fa fa-edit'></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="projectNote">Descripción o nombre del proyecto</label>
                                            <input placeholder="Minima descripción del proyecto" type="text"
                                                name='projectNote' id="projectNote" class="form-control" value="">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="daterange" class="control-label">Fecha Inicio y Fin del projecto:</label>
                                            <div class="input-group">
                                                <span class="input-group-text">
                                                    <i class="far fa-calendar-alt"></i>
                                                </span>
                                                <input value="" type="text" class="form-control" id="daterange" name='daterange' autocomplete="off">
                                            </div>
                                            <span class="help-block" id="error"></span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="row">
                                        <div class="col-md-8 ">
                                            <div class="form-group">
                                                <label for="selectStatus">Estado Seccion Artística</label>
                                                <select id="selectStatus" name='selectStatus'
                                                    class="form-control custom-select">
                                                    <option disabled>Estado del proyecto</option>
                                                    <option value='Proceso' selected>En proceso</option>
                                                    <option value='Terminado'>Terminado</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4 ">
                                            <div class="form-group">
                                                <label for="projectLevel">Nivel</label>
                                                <input placeholder="" type="number" max=3 min=1 name='projectLevel'
                                                    id="projectLevel" class="form-control" value="1">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="float-left">
                                            <button id='projectDel' type="" class="btn btn-danger">Eliminar</button>
                                            <button id='projectEdit' type="" class="btn btn-warning">Editar</button>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="float-right">
                                            <button id='projectAdd' type="" class="btn  btn-success">Nuevo</button>
                                            <button id='Cancel' type="" class="btn btn-primary">Cancelar</button>
                                        </div>
                                    </div>

                                </div>
                            </div> <!-- /termina card-body -->
                        </div> <!-- termina card -->
                    </div>
                    <div class="col-md-3">
        <div class="card card-success">
            <!-- empieza card -->
            <div class="card-header">
                <h3 id='card-integrantes' class="card-title">Integrantes</h3>
                <div class="card-tools">
                    <button type="button" class="btn btn-tool" data-card-widget="collapse"
                        title="Collapse">
                        <i class="fas fa-minus"></i>
                    </button>
                </div>
            </div>
            <div id='integrantes' class="card-body">
            {{-- empieza pestañas --}}

                <div class="card card-success card-outline card-outline-tabs">
                    <div class="card-header p-0 border-bottom-0">
                        <ul class="nav nav-tabs" id="custom-tabs-two-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="tabs-project" data-toggle="pill" href="#tabs-project-content" role="tab" aria-controls="custom-tabs-two-home" aria-selected="true">En proyecto</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="tabs-extra" data-toggle="pill" href="#tabs-extra-content" role="tab" aria-controls="custom-tabs-two-profile" aria-selected="false">Extras</a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="custom-tabs-two-tabContent">
                            <div class="tab-pane fade show active" id="tabs-project-content" role="tabpanel" aria-labelledby="custom-tabs-two-home-tab">
                                <ul id='droppable-project'  class="todo-list integrantes" data-widget="todo-list"></ul>
                            </div>
                            <div class="tab-pane fade" id="tabs-extra-content" role="tabpanel" aria-labelledby="custom-tabs-two-profile-tab">
                                <ul id='droppable-extra'  class="todo-list integrantes" data-widget="todo-list"></ul>
                            </div>
                        </div>
                    </div>
                    <!-- /.card -->
                </div>

            {{--terminan pestañas --}}
            </div>
        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="card card-info">
                            <!-- empieza card -->
                            <div class="card-header">
                                <h3 id='card-composicion' class="card-title">Composicion</h3>
                                <div class="card-tools">
                                    <button type="button" class="btn btn-tool" data-card-widget="collapse"
                                        title="Collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div id='composicion' class="card-body"><!-- /.card-header -->
                                <div class="row">
                                    <div class="pb-2 col-md-12">
                                        <ul id='listComp'  class="todo-list" data-widget="todo-list"></ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class='row'>
                <!-- fin Izdo -->

                <div class="col-md-3">
                    <div class="sticky-top mb-3">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Crear Tipo</h3>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>

                                </div>
                            </div>
                            <div id='crearTipes' class="card-body">
                                <div class="btn-group" style="width: 100%; margin-bottom: 10px;">
                                    <ul class="fc-color-picker" id="color-chooser">
                                        <li><a class="text-primary" href="#"><i class="fas fa-square"></i></a></li>
                                        <li><a class="text-warning" href="#"><i class="fas fa-square"></i></a></li>
                                        <li><a class="text-success" href="#"><i class="fas fa-square"></i></a></li>
                                        <li><a class="text-danger" href="#"><i class="fas fa-square"></i></a></li>
                                        <li><a class="text-muted" href="#"><i class="fas fa-square"></i></a></li>
                                    </ul>
                                </div>
                                <!-- /btn-group -->
                                <div class="input-group">
                                    <input id="new-tipe" type="text" class="form-control" placeholder="TIPO ~ HORAS">

                                    <div class="input-group-append">
                                        <button id="add-new-tipe" type="button" class="btn btn-primary">Add</button>
                                    </div>
                                    <!-- /btn-group -->
                                </div>
                                <!-- /input-group -->
                            </div>
                        </div>


                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Tipos</h4>

                                <div class="card-tools">
                                    <button type="button" class="btn btn-tool" data-card-widget="collapse"
                                        title="Collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>

                            </div>
                            <div id='tipes' class="card-body">
                                <!-- Los TIPOS -->
                                <nav aria-label="Page navigation example">
                                    <div id="external-tipes" class='list-group'>
                                        @foreach ($tipes as $tipe)
                                            <div data-color={{ $tipe->tipeColor }} data-tipe= {{$tipe->tipeName}}
                                                class="list-group-item ui-widget-content external-tipe" style="background-color: {{ $tipe->tipeColor }};">
                                                {{ $tipe->tipeName }} ~ {{$tipe->tipehourRange}}</div>
                                        @endforeach
                                    </div>
                                <div id='Ptipes' class="holder"></div>

                            </div>
                            <!-- /.card-body -->
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Salas</h4>

                                <div class="card-tools">
                                    <button type="button" class="btn btn-tool" data-card-widget="collapse"
                                        title="Collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>

                            </div>
                            <div id='rooms' class="card-body">
                                <!-- Los TIPOS -->
                                <nav aria-label="Page">
                                    <div id="external-rooms" class='list-group'>
                                        @foreach ($rooms as $room)
                                            <div data-color={{ $room->roomColor }} data-id= {{$room->id}}
                                                class="list-group-item ui-widget-content external-room" style="background-color: {{ $room->roomColor }};">
                                                {{ $room->roomName }} ~ {{ $room->roomAcronym }}</div>
                                        @endforeach
                                    </div>
                                </nav>


                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </div>
                </div>

                <!-- Empieza table-->
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header text-white bg-info mb-3">
                            <h3 id='card-shedulle' class="card-title">Tabla de programa</h3>
                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class='row'>
                                <div class="col-6 mb-2">
                                    <button type="button" id='sheduleCancel' class="btn btn-warning">Salir</button>
                                    <button type="button" id='sheduleAdd' class="btn btn-success">Guardar</button>
                                </div>
                                <div class="col-6">
                                    <div  class="float-right">
                                        <button type="button" id='projectPrintWord' class="btn btn-info">Word</button>
                                        {{-- <a id='printWord' class="btn btn-primary" href="" role="button">Word href</a>
                                        <form id="form" action="{{route('printProject')}}" method="POST">
                                            <input type="hidden" name="project_id" id ="project_id" value="">
                                            {!! csrf_field() !!}
                                        <a id='buttonPrints' class="btn btn-info" role="button" href="javascript:void(0)" onclick="$('#form').submit()">Word</a>
                                        </form> --}}
                                    </div>
                                </div>
                            </div>
                            <div class='row'>
                                <div class="col-12">
                                    <table id="table-shedule" class="table table-bordered table-hover" style="width:100%"></table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div> <!-- termina la CARD del table -->

            </div>

        </div>

    </section>
    @include('admin/modals/modaledit')

@stop



@section('css')
    <link rel="stylesheet" href="/js/plugins/jPages/jPages.css">
    <link rel="stylesheet" href="/css/project.css">


@stop

@section('js')

    <!-- script src="/js/plugins/jquery-ui-touch-punch-master/jquery.ui.touch-punch.min.js"></script -->

    <script src="/js/plugins/jPages/jPages.min.js"></script>
    <script src="/js/jquery.validate.min.js"></script>
    <script src="/js/resource.js"></script>
    <script src="/js/projects/project.js"></script>

    <script src="/js/plugins/tableToJson/jquery.tabletojson.min.js"></script>
    <script src="/js/plugins/fileDownload/jquery.fileDownload.js"></script>

@stop



