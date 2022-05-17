@extends('adminlte::page')
@push('css')
<style type="text/css">
    body {
        font-size: 14px !important;
    }
</style>
@endpush

@section('title', 'Impresiones')

@section('content_header')
<h1>Gestor de impresiones</h1>
@stop

@section('content')

<!-- Inicio -->
<div class='row'>
    <div class="col-12">
        <h2 class='text-center pb-2'>{{$seasonSelected}}</h2>
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


