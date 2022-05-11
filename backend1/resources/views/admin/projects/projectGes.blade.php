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
                            <div  id='edit-color' class="card-body">
                                <!-- / empieza card-body -->
                                <div class="form-group">
                                    <label>Temporada</label>
                                    <div class="row">
                                        <div class="col-md-10">
                                            {{-- <select id="selectSeasonName" name="selectseasonName" class="form-control select2" style="width: 100%;">
                                                @if ($seasons->count())
                                                    <option value="0" selected disabled>Escoja Temporada </option>
                                                    @foreach ($seasons as $season)
                                                        <option value="{{ $season->id }}"> {{ $season->seasonName }}
                                                        </option>
                                                    @endforeach
                                                @endif
                                            </select> --}}
                                            <h4 id='seasonH4' class='text-center'>{{$season_selected}}</h4>
                                        </div>
                                        <div class="col-md-2">
                                            <button id='newSeason' type="" class="btn float-right btn-success"><i class='fa fa-edit'></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Nombre del evento</label>
                                    <div class="row">
                                        <div class="col-md-10">
                                            <select id="selectEventName" name="selectEventName" class="form-control select2" style="width: 100%;">
                                                @if ($events->count())
                                                    <option value="0" selected disabled>Escoja Evento </option>
                                                    @foreach ($events as $event)
                                                        <option value="{{ $event->id }}"> {{ $event->eventName }}
                                                        </option>
                                                    @endforeach
                                                @endif
                                            </select>
                                        </div>
                                        <div class="col-md-2">
                                            <button id='newEvent' type="" class="btn float-right btn-success"><i class='fa fa-edit'></i></button>
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
                                    <div class="col-md-12">
                                        <div class="float-right">
                                            <button id='projectAdd' type="" class="btn  btn-success">Crear</button>
                                            <button id='Cancel' type="" class="btn btn-primary">Cancelar</button>
                                        </div>
                                    </div>

                                </div>
                            </div> <!-- /termina card-body -->
                        </div> <!-- termina card -->
                    </div>

                    <div class="col-md-8">
                        <div class="card card-primary">
                            <div class="card-body">
                                <div id="calendar"></div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class='row'>
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header text-white bg-primary mb-3">
                                Listado de proyectos creados
                            </div>
                            <div class="card-body">

                                    <div class="container-fluid spark-screen">

                                        <table id="table-project" class="table-detail table table-striped" style="width:100%">
                                            <thead class="table-success">
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>

                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>


@stop



@section('css')
    <link rel="stylesheet" href="/css/project.css">
@stop

@section('js')
    <script src="/js/jquery.validate.min.js"></script>
    <script src="/js/projects/projectGes.js"></script>
    <script src="/js/resource.js"></script>

@stop



