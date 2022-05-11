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
<h1>Gestión de grupos</h1>
@stop

@section('content')

<!-- Inicio -->
<div class="card">
    <div class="card-header text-white bg-primary mb-3">
        Datos del grupo
    </div>
    <div id='edit-color' class="card-body">

        <form role="form" autocomplete="off" action="#" id="form-address">
            <input id='editar' value="" name='editar' type='hidden'>
            <!--Input oculto para decir si está en modo edición -->
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="addressgroupName" class="control-label">Nombre del Grupo:</label>
                        <input value="" type="text" class="form-control" id="addressgroupName" name="addressgroupName" placeholder="Nombre del grupo" required="true">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <!--Notas sobre el rol-->
                        <label for="addressgroupCode" class="control-label">Acrónimo</label>
                        <input value="" type="text" class="form-control" id="addressgroupCode" name="addressgroupCode" placeholder="Código del grupo">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
            </div>
        </form>
        <div class="card-footer bg-transparent border-success">
            <button type="button" id='Cancelgroup' class="btn btn-warning">Salir</button>
            <button type="button" id='groupaddressAdd' class="btn btn-success">Guardar</button>
        </div>
    </div><!-- /.card-body -->
</div>

<div class="card">
    <div class="card-header text-white bg-primary mb-3">
        Libreta de direcciones
    </div>
    <div id='edit-color' class="card-body">

            <div class="container-fluid spark-screen">

                <table id="table-groupsAddress" class="display table-detail table table-striped" style="width:100%">
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
<script src="/js/address/groupAddress.js"></script>
@stop
