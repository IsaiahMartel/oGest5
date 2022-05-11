@extends('adminlte::page')
@push('css')
<style type="text/css">
    body {
        font-size: 14px !important;
    }
</style>
@endpush

@section('title', 'Temporadas')

@section('content_header')
<h1>Gestión de Temporadas</h1>
@stop

@section('content')

<!-- Inicio -->
<div class="card">
    <div class="card-header text-white bg-primary mb-3">
        Datos del Contacto
    </div>
    <div id='edit-color' class="card-body">
        <form role="form" autocomplete="off" action="#" name="form-composer" id="form-composer">
            <input id='editar' value="" name='editar' type='hidden'>
            <!--Input oculto para decir si está en modo edición -->
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="addresslastName" class="control-label">Apellidos:</label>
                        <input value="" type="text" class="form-control" id="composerLastname" name="composerLastname" placeholder="Apellidos del compositor" required="true">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <!--Notas sobre el rol-->
                        <label for="addressfirstName" class="control-label">Nombre</label>
                        <input value="" type="text" class="form-control" id="composerFirstname" name="composerFirstname" placeholder="Nombre/Pseudonimo del compositor">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="addressStreet" class="control-label">Año de Nacimiento:</label>
                        <input value="" type="text" class="form-control" id="composerBirthYear" name="composerBirthYear" placeholder="Solo el año YYYY" >
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="addressNumber" class="control-label">Año de defunción:</label>
                        <input value="" type="text" class="form-control" id="composerDeathyear" name="composerDeathyear" placeholder="Solo el año YYYY" >
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button id='composerAdd' type="" class="btn btn-success">Añadir</button>
                    <button id='cancel' type="" class="btn btn-danger">Cancelar</button>
                </div>
            </div>
        </form>
    </div><!-- /.card-body -->
</div>

<div class="card">
    <div class="card-header text-white bg-primary mb-3">
        Libreta de direcciones
    </div>
    <div id='edit-color' class="card-body">

            <div class="container-fluid spark-screen">

                <table id="table-composer" class="table-detail table table-striped" style="width:100%">
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
    <link rel="stylesheet" href="/css/archivo.css">
@stop

@section('js')

    <script src="/js/archivo/composer.js"></script>
@stop
