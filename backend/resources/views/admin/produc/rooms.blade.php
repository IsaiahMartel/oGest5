@extends('adminlte::page')
@push('css')
<style type="text/css">
    body {
        font-size: 14px !important;
    }
</style>
@endpush

@section('title', 'Salas')

@section('content_header')
<h1>Gestión de Salas</h1>
@stop

@section('content')

<!-- Inicio -->
<div class="card">
    <div class="card-header text-white bg-primary mb-3">
        Datos del Contacto
    </div>
    <div id='edit-color' class="card-body">
        <form role="form" autocomplete="off" action="#" name="form-room" id="form-room">
            <input id='editar' value="" name='editar' type='hidden'>
            <!--Input oculto para decir si está en modo edición -->
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="roomName" class="control-label">Nombre de la sala:</label>
                        <input value="" type="text" class="form-control" id="roomName" name="roomName" placeholder="Nombre de sala" required="true">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="roomAcronym" class="control-label">Acronimo de sala:</label>
                        <input value="" type="text" class="form-control" id="roomAcronym" name="roomAcronym" placeholder="Siglas" required="true">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-1">
                    <div class="form-group">
                        <!--color-->
                        <label for="roomColor" class="form-label">Color</label>
                        <input type="color" class="form-control form-control-color" id="roomColor" name='roomColor' value="#563d7c" title="Cambie el color">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="roomNote" class="control-label">Notas:</label>
                        <input value="" type="text" class="form-control" id="roomNote" name="roomNote" placeholder="pequeña descripción" >
                        <span class="help-block" id="error"></span>
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col">
                    <button id='roomAdd' type="" class="btn btn-success">Añadir</button>
                    <button id='cancel' type="" class="btn btn-danger">Cancelar</button>
                </div>
            </div>
        </form>
    </div><!-- /.card-body -->
</div>

<div class="card">
    <div class="card-header text-white bg-primary mb-3">
        Salas
    </div>
    <div id='edit-color' class="card-body">

            <div class="container-fluid spark-screen">

                <table id="table-rooms" class="table-detail table table-striped" style="width:100%">
                    <thead class="table-success">
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
    </div>
</div>
@stop

@section('css')
    <link rel="stylesheet" href="/css/tipe.css">
@stop

@section('js')

    <script src="/js/produc/rooms.js"></script>
@stop
