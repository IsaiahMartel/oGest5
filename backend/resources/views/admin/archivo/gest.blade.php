@extends('adminlte::page')
@push('css')
<style type="text/css">
    body {
        font-size: 14px !important;
    }
</style>
@endpush
@section('title', 'Obras')

@section('content_header')
<h1>Gestión Obras</h1>
@stop

@section('content')
<!-- Inicio -->
<div id='proceso'>
    <div class="row">
        <div class="col-md-8">
            <div class="card card-primary">
                <!-- empieza card -->
                <div class="card-header">
                    <h3 class="card-title">Proyecto</h3>
                    <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div id='projects' class="card-body">
                    <div class='row'>
                        <div class="col-4">
                            <div class="form-group">
                            <label>Temporada</label>
                            <h4 class ='text-center'>{{$seasonSelected}}</h4>
                                {{-- <select id="selectSeasonName" name="selectseasonName" class="form-control select2" style="width: 100%;">
                                    @if ($seasons->count())
                                        <option value="0" selected disabled>Escoja Temporada </option>
                                        @foreach ($seasons as $season)
                                            <option value="{{ $season->id }}"> {{ $season->seasonName }}
                                            </option>
                                        @endforeach
                                    @endif
                                </select> --}}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                            <label>Nombre del evento</label>
                                <select id="selectEventName" name="selectEventName" class="form-control select2" style="width: 100%;">
                                    <option value="0" selected disabled>Escoja nombre del evento </option>
                                    @if ($events->count())
                                        @foreach ($events as $event)
                                            <option value="{{ $event['id'] }}"> {{ $event['eventName'] }}</option>
                                        @endforeach
                                    @endif
                                </select>
                            </div>
                        </div>
                        <div class="col-2 ">
                            <div class="form-group">
                                <label for="projectLevel">Nivel</label>
                                <input placeholder="" type="number" max=3 min=1 name='projectLevel'
                                    id="projectLevel" class="form-control" value="1">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div  class="">
                                {{-- <a id='printWord' class="btn btn-primary" href="" role="button">Word href</a>
                                <form id="form" action="{{route('printProject')}}" method="POST">
                                    <input type="hidden" name="project_id" id ="project_id" value="">
                                    {!! csrf_field() !!}
                                <a id='buttonPrints' class="btn btn-info" role="button" href="javascript:void(0)" onclick="$('#form').submit()">Word</a>
                                </form> --}}
                                <button type="button" id='projectPrintWord' class="btn btn-info">Word</button>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="float-right">
                                <button type="" class="btn btn-warning changeState">Cambiar estado</button>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="float-right">
                                <button id='Cancel' type="" class="btn btn-primary">Cancelar</button>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="float-right">
                                <button type="" class="btn btn-danger sendAlert">Enviar alerta</button>
                            </div>
                        </div>
                    </div>
                </div> <!-- /termina card-body -->
            </div> <!-- termina card -->
        </div>
        <div class="col-md-4">
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
                                    <ul class="todo-list integrantes droppable-project" data-widget="todo-list"></ul>
                                </div>
                                <div class="tab-pane fade" id="tabs-extra-content" role="tabpanel" aria-labelledby="custom-tabs-two-profile-tab">
                                    <ul class="todo-list integrantes droppable-extra" data-widget="todo-list"></ul>
                                </div>
                            </div>
                        </div>
                        <!-- /.card -->
                    </div>

                    {{--terminan pestañas --}}
                    </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <div class="card card-info"> <!-- empieza card -->

                <div class="card-header">
                    <h3 class="card-title">Obras</h3>
                    <div class="card-tools">
                    {{--  <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                            <i class="fas fa-minus"></i>
                        </button> --}}
                    </div>
                </div>
                <div id='obras' class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">

                                <label>Compositores</label>
                                <select id="selectComposer" name="selectComposer" class="form-control select2" style="width: 100%;">
                                    @if ($composers->count())
                                    @foreach($composers as $composer)
                                    <option value=""> </option>
                                        <option value="{{ $composer->id }}"> {{ $composer->composerFirstname }} ~ {{$composer->composerLastname}}</option>
                                    @endforeach
                                    @endif
                                </select>
                                <span class="help-block" id="error"></span>

                            </div>
                        </div>
                    </div>
                    <div class='row'>
                        <div class="col-md-12">
                            <h5 class="box-title">Listado de Obras</h3>
                            <table id="table-works" class="display table-detail table table-striped " style="width:100%"></table>
                        </div>
                    </div>

                </div> <!-- /termina card-body -->


            </div> <!-- termina card -->
        </div>
        <div class="col-md-6">
            <div class="card card-info">
                <!-- empieza card -->
                <div class="card-header">
                    <h3 id='card-project' class="card-title">Composicion</h3>
                    <div class="card-tools">
                        {{--<button type="button" class="btn btn-tool" data-card-widget="collapse"
                            title="Collapse">
                            <i class="fas fa-minus"></i>
                        </button> --}}
                    </div>
                </div>
                <div id='composicion' class="card-body bg-obras"><!-- /.card-header -->

                    <div class="row">
                        <div class="pb-2 col-md-12">
                            <div class="float-right">
                                <button id='pausa' type="" class="btn btn-success">Insertar pausa</button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="pb-2 col-md-12">
                            <ul id='listComp'  class="todo-list" data-widget="todo-list"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <!-- Empieza table-->
        <div class="col-md-12">
            <div class="card card-warning">
                <div class="card-header text-white">
                    <h3 id='card-shedules' class="card-title">Tabla de programa</h3>
                    <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    {{-- <table id="table-shedule" class="table table-bordered table-hover" style="width:100%"></table> --}}
                    <table class="table table-bordered table-hover table_sheduleTerminado" style="width:100%"></table>
                </div>
            </div>

        </div> <!-- termina la CARD del table -->
    </div>
</div>
@include('admin/archivo/modalworkplaylist')
@include('admin/archivo/modalinstrument')
@include('admin/modals/terminado')


@stop

@section('right-sidebar')
    @include('admin/sidebar/right-sidebar-archivo')
@stop

@section('css')
    <link rel="stylesheet" href="/css/archivoWork.css">
    <link rel="stylesheet" href="/css/terminado.css">
@stop

@section('js')
    <script src="/js/plugins/tableToJson/jquery.tabletojson.min.js"></script>
    <script src="/js/archivo/archivoGest.js"></script>
    <script src="/js/plugins/fileDownload/jquery.fileDownload.js"></script>
    <script src="/js/resource.js"></script>
@stop
