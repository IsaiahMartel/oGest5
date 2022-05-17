@extends('adminlte::page')
@push('css')
<style type="text/css">
    body {
        font-size: 14px !important;
    }
</style>
@endpush

@section('title', 'Usuarios Móviles')

@section('content_header')
    <h1>Gestión de Usuarios Móviles</h1>
@stop

@section('content')
<form name='form-mobile' id ='form-mobile'>
    <input id='editar' value="" name='editar' type='hidden'>
    <div class="card">
        <div class="card-header text-white bg-info mb-3">
            Formulario para Usuario APP móvil
        </div>
        <div id='edit-color' class="card-body">
            <div class='row'>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="mobileEmail" class="control-label">Correo electrónico</label>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">@</span>
                            <input type="email" id="mobileEmail" name="mobileEmail" class="form-control" placeholder="Nombre de usuario" aria-label="Nombre de usuario" aria-describedby="basic-addon1">
                        </div>
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <!---->
                        <label for="mobileName" class="control-label">Nombre completo del usuario</label>
                        <input value="" type="text" class="form-control" id="mobileName" name="mobileName"
                            placeholder="Nombre y apellidos" required="true">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <!---->
                        <label for="password" class="control-label">Password</label>
                        <input value="" type="text" class="form-control" id="password" name="password"
                            placeholder="Password">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 div btn-group ml-auto" role="group" >
                    <button type="submit" id='botonAdd' class="btn btn-primary">Añadir nuevo usuario</a>
                    <button id='Cancel' type="button" class="btn btn-danger">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</form>
    <!-- Para la tabla -->
    <div class="card">
        <div class="card-header text-white bg-info mb-3">
            Tabla de usuarios de dispositivos móviles
        </div>
        <div class="card-body">

            <table id="table-movil" class="table table-striped table-bordered" style="width:100%">
                <thead>
                </thead>
                <tbody>
                </tbody>
                </tfoot>
            </table>
        </div>
    </div>

@stop

@section('css')
    <!-- link rel="stylesheet" href="/css/season.css" -->
@stop

@section('js')
    <!-- bs-custom-file-input -->
    <script src="/js/jquery.validate.min.js"></script>
    <script src="/js/mobile/mobile.js"></script>
@stop
