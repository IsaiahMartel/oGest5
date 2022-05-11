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
<h1>Rutas de acceso</h1>
@stop

@section('content')

<!-- Inicio -->
<div class="card">
    <div class="card-header text-white bg-primary mb-3">
       Datos del control de rutas
    </div>
    <div id='edit-color' class="card-body">

        <form role="form" autocomplete="off" action="#" id="form-permission">
            <input id='editar' value="" name='editar' type='hidden'>
            <!--Input oculto para decir si está en modo edición -->
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="name" class="control-label">Ruta del recurso:</label>
                        <input value="" type="text" class="form-control" id="name" name="name" placeholder="Nombre del grupo" required="true">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <!--Notas sobre el rol-->
                        <label for="guard_name" class="control-label">descripción del recurso</label>
                        <input value="" type="text" class="form-control" id="guard_name" name="guard_name" placeholder="descripción">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-4">
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

            </div>
        </form>
        <div class="card-footer bg-transparent border-success">
            <button type="button" id='Cancel' class="btn btn-warning">Salir</button>
            <button type="button" id='Add' class="btn btn-success">Guardar</button>
        </div>
    </div><!-- /.card-body -->
</div>

<div class="card">
    <div class="card-header text-white bg-primary mb-3">
        Rutas de acceso
    </div>
    <div id='edit-color' class="card-body">

            <div class="container-fluid spark-screen">

                <table id="table-permission" class="display table-detail table table-striped" style="width:100%">
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
<script src="/js/user/permission.js"></script>
@stop
