@extends('adminlte::page')
@push('css')
<style type="text/css">
    body {
        font-size: 14px !important;
    }
</style>
@endpush

@section('title', 'Eventos')

@section('content_header')
<h1>Gestión de Eventos</h1>
@stop

@section('content')

<!-- Inicio -->
<div class="card">
    <div class="card-header text-white bg-info mb-3">
        Formulario de Usuario
    </div>
    <div id='edit-color' class="card-body">
        <form role="form" autocomplete="off" action="#" id="form-event" name='form-event'>
            <input id='editar' value="" name='editar' type='hidden'>
            <!--Input oculto para decir si está en modo edición -->

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="eventName" class="control-label">Nombre del evento:</label>
                        <input value="" type="text" class="form-control" id="eventName" name="eventName" placeholder="Utiliza Mayusculas: ABONO 01" required="true">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <!--Notas sobre el rol-->
                        <label for="eventNote" class="control-label">Notas sobre el evento</label>
                        <input value="" type="text" class="form-control" id="eventNote" name="eventNote" placeholder="Notas sobre el Evento">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
            </div>
            <div class="row  bottom-aligned ">
                <div class="col-md-6 ">
                    <div class="form-group">
                        <!--Grupo sobre el rol-->
                        <label for="eventGroup" class="control-label">Grupo</label>
                        <input value="" type="text" class="form-control" id="eventGroup" name="eventGroup" placeholder="Grupo de eventos">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-6 float-right">

                    <button id='botonAd' type="submit" class="btn float-right btn-success">Añadir Evento</button>
                    <button id='Cancel' type="button" class="btn float-right btn-danger">Cancelar</button>
                </div>
            </div>
        </form>
    </div><!-- /card-body -->
</div>

<div class="mt-4 container">
    <div class="container-fluid spark-screen">

        <!-- Default box -->
        <div class="box box-primary">

            <div class="box-body">
                <div class="form-group">
                    <table id="table-event" class=" table table-striped table-bordered" style="width:100%">
                        <thead class="table-success">
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div><!-- /.box-body -->

        </div><!-- /.box -->
    </div>
</div>
@stop

@section('css')
<link rel="stylesheet" href="/css/season.css" -->
@stop

@section('js')
<script src="/js/jquery.validate.min.js"></script>
<script src="/js/event/event.js"></script>
@stop
