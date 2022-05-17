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
        Formulario de Temporadas
    </div>
    <div id='edit-color' class="card-body">

        <form role="form" autocomplete="off" action="#" id="form-season">
            <input id='editar' value="" name='editar' type='hidden'>
            <!--Input oculto para decir si está en modo edición -->
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="seasonName" class="control-label">Nombre de temporada:</label>
                        <input value="" type="text" class="form-control" id="seasonName" name="seasonName" placeholder="Use la nomenclatura: 2018-2019" required="true">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <!--Notas sobre el rol-->
                        <label for="seasonNote" class="control-label">Notas sobre la temporada</label>
                        <input value="" type="text" class="form-control" id="seasonNote" name="seasonNote" placeholder="Notas sobre la temporada">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="daterange" class="control-label">Fecha Inicio y Fin de la temporada:</label>
                        <div class="input-group">
                            <input value="" type="text" class="form-control" id="daterange" name='daterange'>
                        </div>
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="projectNote">Cuerda Completa</label>
                        <input placeholder="ej: 14/12/10/8/6" type="text"
                            name='configCompleta' id="configCompleta" class="form-control" value="14/12/10/8/6" required>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="projectNote">Cuerda Reducida</label>
                        <input placeholder="ej: 10/8/6/4/2" type="text"
                            name='configReducida' id="configReducida" class="form-control" value="10/8/6/4/2" required>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="projectNote">Por determinar</label>
                        <input placeholder="ej: 0/0/0/0/0" type="text"
                            name='configPd' id="configPd" class="form-control" value="0/0/0/0/0" required>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="projectNote">Sin cuerda</label>
                        <input placeholder="ej: 0/0/0/0/0" type="text"
                            name='configSin' id="configSin" class="form-control" value="0/0/0/0/0" required>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="projectNote">Director Titular</label>
                        <input placeholder="Nombre para imprimir" type="text"
                            name='configTitular' id="configTitular" class="form-control" value="" required>
                    </div>
                </div>
            </div>

            <div class="col-6 float-right">

                <button id='botonAd' type="submit" class="btn float-right btn-success">Añadir Temporada</button>
                <button id='Cancel' type="button" class="btn float-right btn-danger">Cancelar</button>
            </div>
        </form>
    </div><!-- /.card-body -->
</div>

<div class="mt-4 container">
    <div class="container-fluid spark-screen">

        <table id="table-season" class=" table table-striped table-bordered" style="width:100%">
            <thead class="table-success">
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>
@stop

@section('css')
<link rel="stylesheet" href="/css/season.css" -->
@stop

@section('js')
<script src="/js/jquery.validate.min.js"></script>
<script src="/js/season/season.js"></script>
@stop
