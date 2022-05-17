@extends('adminlte::page')
@push('css')
<style type="text/css">
    body {
        font-size: 14px !important;
    }
</style>
@endpush
@section('title', 'Producción')

@section('content_header')
<h1>Gestión de integrantes</h1>
@stop

@section('content')

<!-- Inicio -->
<div id='proceso'>
    <div class="row">
        <div class="col-md-6">
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
                        <!-- / empieza card-body -->
                        <div class="col-4">
                        <h4 class = 'text-center'>{{$seasonSelected}}</h4>
                            {{--  <div class="form-group">
                            <label>Temporada</label>
                                <select id="selectSeasonName" name="selectseasonName" class="form-control select2" style="width: 100%;">
                                    @if ($seasons->count())
                                        <option value="0" selected disabled>Escoja Temporada </option>
                                        @foreach ($seasons as $season)
                                            <option value="{{ $season->id }}"> {{ $season->seasonName }}
                                            </option>
                                        @endforeach
                                    @endif
                                </select>
                            </div>  --}}
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
                        {{--<div class="col-2">
                            <div class="form-group">
                            <label>Estado</label>
                                <select id="selectStatus" name="selectStatus" class="form-control select2" style="width: 100%;">
                                    @if ($events->count())
                                        <option value="0" selected disabled>Estado</option>
                                        <option value='Proceso' selected>En proceso</option>
                                        <option value='Terminado'>Terminado</option>
                                    @endif
                                </select>
                            </div>
                        </div> --}}
                        <div class="col-2">
                            <div class="form-group">
                                <label for="projectLevel">Nivel</label>
                                <input placeholder="" type="number" max=3 min=1 name='projectLevel'
                                    id="projectLevel" class="form-control" value="1">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div  class="">
                                <button type="button" id='projectPrintWord' class="btn btn-info">Word</button>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="float-right">
                                <button type="" class="btn btn-warning changeState">Cambiar estado</button>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="float-right">
                            <button id='Cancel' type="" class="btn btn-primary">Salir</button>
                            </div>
                        </div>
                    </div>
                </div> <!-- /termina card-body -->
            </div> <!-- termina card -->
        </div>
        <div class="col-md-6">
            <div class="card card-success">
                <!-- empieza card -->
                <div class="card-header">
                    <h3 id='card-obras' class="card-title">Obras</h3>
                    <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse"
                            title="Collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div id='obras' class="card-body"><!-- /.card-header -->
                    <div class="row">
                        <div class="pb-2 col-md-12">
                            <ul class="todo-list listComp" data-widget="todo-list"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <div  class="card card-info"> <!-- empieza card -->
                <div class="card-header">
                    <h3 id="card-libreta" class="card-title">Libreta de direcciones</h3>
                    <div class="card-tools">
                        {{--<button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                            <i class="fas fa-minus"></i>
                        </button> --}}
                    </div>
                </div>
                <div id='libreta' class="card-body"><!-- /.card-header -->
                    <div class="container-fluid spark-screen">
                        <table id="table-address" class="tablegrid display nowrap" style="width:100%">
                            <thead class="table-success">
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> <!-- termina card -->
        </div>
        <div class="col-md-3">
            <div class="card card-info drag">
                <!-- empieza card -->
                <div class="card-header">
                    <h3 id='card-project' class="card-title">Componentes de proyecto</h3>
                    <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse"
                            title="Collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div id='project' class="card-body"><!-- /.card-header -->
                <p></p>
                    <div class="row">
                        <div class="pb-2 col-md-12">
                            <ul id='droppable-project'  class="todo-list integrantes" data-widget="todo-list"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="drag card card-warning">
                <!-- empieza card -->
                <div class="card-header">
                    <h3 id='card-extra' class="card-title">Componentes extras</h3>
                    <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse"
                            title="Collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div id='extra' class="card-body"><!-- /.card-header -->
                <p></p>
                    <div class="row">
                        <div class="pb-2 col-md-12">
                            <ul id='droppable-extra'  class="todo-list integrantes" data-widget="todo-list"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <!-- Empieza table-->
        <div class="col-md-12">
            <div id='card-shedule' class="card card-warning">
                <div class="card-header text-white">
                    <h3 class="card-title">Tabla de programa</h3>
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
@include('admin/modals/terminado')
@stop

@section('css')
    <link rel="stylesheet" href="/css/produccion.css">
    <link rel="stylesheet" href="/css/terminado.css">
@stop

@section('js')
    <script src="/js/plugins/tableToJson/jquery.tabletojson.min.js"></script>
    <script src="/js/resource.js"></script>
    <script src="/js/produc/produccion.js"></script>
    <script src="/js/plugins/fileDownload/jquery.fileDownload.js"></script>

@stop
