@extends('adminlte::page')
@push('css')
<style type="text/css">
    body {
        font-size: 14px !important;
    }
</style>
@endpush

@section('title', 'Usuarios')

@section('content_header')
    <h1>Gestión de Usuarios</h1>
@stop

@section('content')
<form name='form-user' id ='form-user'>
<input id='editar' value="" name='editar' type='hidden'>
    <div class="card">
        <div class="card-header text-white bg-info mb-3">
            Formulario de Usuario
        </div>
        <div id='edit-color' class="card-body">
            <div class='row'>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="email" class="control-label">Correo electrónico</label>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">@</span>
                            <input type="email" id="userEmail" name="userEmail" class="form-control" placeholder="Nombre de usuario" aria-label="Nombre de usuario" aria-describedby="basic-addon1">
                        </div>
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <!---->
                        <label for="userName" class="control-label">Nombre completo del usuario</label>
                        <input value="" type="text" class="form-control" id="userName" name="userName"
                            placeholder="Nombre y apellidos" required="true">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <!---->
                        <label for="password" class="control-label">Password</label>
                        <input value="" type="text" class="form-control" id="password" name="password"
                            placeholder="Password">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <!---->
                        <label for="role" class="control-label">Roles del usuario</label>

                        <div class='row'>
                            @php ($key=0)
                            @php ($longitudRoles=count($roles))
                            @for ($a =1; $a <= round($longitudRoles/2); $a++)
                                <div class='col'>
                                    @for ($i =1; $i <= 2; $i++)
                                        @if($key < $longitudRoles)
                                            <div class="form-group">
                                                <div class="custom-control custom-switch">
                                                    <input type="checkbox" class="custom-control-input" id="radio-{{$roles[$key]->name}}">

                                                    <label class="custom-control-label" for="radio-{{$roles[$key]->name}}">{{$roles[$key]->name}}</label>

                                                </div>
                                            </div>
                                            @php ($key++)
                                        @endif
                                    @endfor
                                </div>
                            @endfor
                        </div>
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
</form>
                <button type="submit" id='botonAdd' class="btn btn-primary">Añadir nuevo usuario</a>
                <button id='Cancel' type="button" class="btn float-right btn-danger">Cancelar</button>
            </div>
        </div>
    </div>

    <!-- Para la tabla -->
    <div class="card">
        <div class="card-header text-white bg-info mb-3">
            Tabla de usuarios
        </div>
        <div class="card-body">

            <table id="table-user" class="table table-striped table-bordered" style="width:100%">
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
    <script src="/js/plugins/bs-custom-file-input/bs-custom-file-input.min.js"></script>
    <script src="/js/jquery.validate.min.js"></script>
    <script src="/js/user/user.js"></script>
@stop
