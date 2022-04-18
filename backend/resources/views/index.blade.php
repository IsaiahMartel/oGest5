@extends('adminlte::page')
@push('css')
<style type="text/css">
    body {
        font-size: 14px !important;
    }
</style>
@endpush

@section('title', 'Publicaciones')

@section('content_header')
<h1>Gestión de Publicaciones</h1>
@stop

@section('content')

<!-- Inicio -->
<div class='row'>
    <div class="col-12">
    <h2 class='text-center pb-2'>{{$seasonSelected}}</h2>
        {{-- <div class="card">
            <div class="card-header text-white bg-primary mb-3">
                Temporada con la que trabajar
            </div>
            <div id='edit-color' class="card-body">
                <input id='editar' value="" name='editar' type='hidden'>
                <!--Input oculto para decir si está en modo edición -->
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> --}}
    </div>
</div>
<div class='row'>
    <div class="col-4">
        <div class="card">
            <div class="card-header text-white bg-primary">
                Listado de proyectos
            </div>
            <div id='edit-color' class="card-body">
                <div class='row'>
                    <div class="col-8 mb-2">
                        <button type="button" id='projectPrintWord' class="btn btn-info">Word</button>
                    </div>
                    <div class="col-4 mb-2">
                        <button type="button" id='buttonPublication' class="btn btn-success float-right">Publicar</button>
                    </div>
                </div>
                <hr/>
                <div class='row'>
                    <div class="col-12">
                        <div class="container-fluid spark-screen">
                            <table id="table-projects" class="table-detail table table-striped" style="width:100%">
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="card ">
            <div class="card-header text-white bg-success">
                Listado de publicados
            </div>
            <div id='edit-color' class="card-body">
                <div class='row'>
                    <div class="col-8 mb-2">
                        <button type="button" id='publichedPrintWord' class="btn btn-info">Word</button>
                    </div>
                    <div class="col-4 mb-2">
                        <button type="button" id='buttonDesPublication' class="btn btn-danger float-right">Despublicar</button>
                    </div>
                </div>
                <hr/>
                <div class='row'>
                    <div class="col-12">
                        <div class="container-fluid spark-screen">
                            <table id="table-published" class="table-detail table table-striped" style="width:100%">
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <div class="col-4">
        <div class="card ">
            <div class="card-header text-white bg-danger">
                Listado de NO publicacados
            </div>
            <div id='edit-color' class="card-body">
                <div class='row'>
                    <div class="col-12">
                        <div class="container-fluid spark-screen">
                            <table id="table-noPublished" class="table-detail table table-striped" style="width:100%">
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@stop

@section('css')
    {{-- < link rel="stylesheet" href="/css/archivo.css" > --}}
@stop

@section('js')
    <script src="/js/publication/publication.js"></script>
    <script src="/js/plugins/fileDownload/jquery.fileDownload.js"></script>
@stop


