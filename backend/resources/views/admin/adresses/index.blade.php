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

        <form role="form" autocomplete="off" action="#" id="form-address">
            <input id='editar' value="" name='editar' type='hidden'>
            <!--Input oculto para decir si está en modo edición -->
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="addresslastName" class="control-label">Apellidos o Nombre principal:</label>
                        <input value="" type="text" class="form-control" id="addresslastName" name="addresslastName" placeholder="Apellido o  Nombre de la empresa" required="true">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <!--Notas sobre el rol-->
                        <label for="addressfirstName" class="control-label">Nombre o Pseudonimo</label>
                        <input value="" type="text" class="form-control" id="addressfirstName" name="addressfirstName" placeholder="Nombre/Pseudonimo del artista">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="addressStreet" class="control-label">Dirección:</label>
                        <input value="" type="text" class="form-control" id="addressStreet" name="addressStreet" placeholder="" >
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="addressNumber" class="control-label">Numero:</label>
                        <input value="" type="text" class="form-control" id="addressNumber" name="addressNumber" placeholder="" >
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="addresszipCode" class="control-label">Codigo ZIP:</label>
                        <input value="" type="text" class="form-control" id="addresszipCode" name="addresszipCode" placeholder="" >
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="addressNotes" class="control-label">Notas:</label>
                        <input value="" type="text" class="form-control" id="addressNotes" name="addressNotes" placeholder="">
                        <span class="help-block" id="error"></span>
                    </div>
                </div>
                <div class="col-md-4">
                    <label>Grupo/s al que pertenece</label>
                    <select id="selectaddressGroup" name="selectaddressGroup" class="form-control select2">
                        @if ($addressgroups->count())
                            @foreach ($addressgroups as $addressgroup)
                                <option value="{{ $addressgroup->id }}"> {{ $addressgroup->addressgroupName }}
                                </option>
                            @endforeach
                        @endif
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-7">
                    <div class='row'>
                        <div class="col-4">
                            <label>Tipo</label>
                            <select id="contactTipe" class="form-control select2"></label>
                                <option value="0">Escoja modelo de contacto</opction>
                                <option value="Móvil">Movil</opction>
                                <option value="Teléfono">Teléfono</opction>
                                <option value="Email">Email</opction>
                                <option value="Web">Web</opction>
                                <option value="Otros">Otros/Fax</opction>
                            </select>
                        </div>
                        <div class="col-8">
                            <label>Teléfono/Email</label>
                            <div class="input-group">
                                <input id='inputContact' type="text" class="form-control">
                                <span class="input-group-append">
                                    <button id='ContactInsert' type="button" class="btn btn-info"><i class="fas fa-angle-double-right"></i></button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-5">
                    <div class="card border-success mb-1">
                        <ul id='contactList' class="todo-list" data-widget="todo-list">
                        </ul>
                    </div>
                </div>
            </div>
        </form>
        <div class="card-footer bg-transparent border-success">
            <button type="button" id='Cancel' class="btn btn-warning">Salir</button>
            <button type="button" id='addressAdd' class="btn btn-success">Guardar</button>
        </div>
    </div><!-- /.card-body -->
</div>

<div class="card">
    <div class="card-header text-white bg-primary mb-3">
        Libreta de direcciones
    </div>
    <div id='edit-color' class="card-body">

            <div class="container-fluid spark-screen">

                <table id="table-address" class="display table-detail table table-striped" style="width:100%">
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
<script src="/js/jquery.validate.min.js"></script>
<script src="/js/address/address.js"></script>
@stop
