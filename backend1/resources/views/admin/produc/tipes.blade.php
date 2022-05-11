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
        <form role="form" autocomplete="off" action="#" name="form-tipe" id="form-tipe">
            <input id='editar' value="" name='editar' type='hidden'>
            <!--Input oculto para decir si está en modo edición -->
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="tipeName" class="control-label">Nombre del tipo de ensayo:</label>
                        <input value="" type="text" class="form-control" id="tipeName" name="tipeName" placeholder="ENSAYO AM" required="true">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="tipehourRange" class="control-label">Rango horario:</label>
                        <input value="" type="text" class="form-control" id="tipehourRange" name="tipehourRange" placeholder="10:00 - 15:00" >
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-1">
                    <div class="form-group">
                        <!--color-->
                        <label for="tipeColor" class="form-label">Color</label>
                        <input type="color" class="form-control form-control-color" id="tipeColor" name='tipeColor' value="#563d7c" title="Cambie el color">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="tipeNote" class="control-label">Notas:</label>
                        <input value="" type="text" class="form-control" id="tipeNote" name="tipeNote" placeholder="pequeña descripción" >
                        <span class="help-block" id="error"></span>
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col">
                    <button id='tipeAdd' type="" class="btn btn-success">Añadir</button>
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

                <table id="table-tipes" class="table-detail table table-striped" style="width:100%">
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

    <script src="/js/produc/tipes.js"></script>
@stop
