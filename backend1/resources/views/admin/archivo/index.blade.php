@extends('adminlte::page')
@push('css')
<style type="text/css">
    body {
        font-size: 14px !important;
    }
</style>
@endpush
@section('title', 'Obras')

@section('content_header')
<h1>Gestión Obras</h1>
@stop

@section('content')

<!-- Inicio -->
<div class="card">
    <div class="card-header text-white bg-info mb-3">
    Obras
    </div>
    <div id='edit-color' class="card-body">
        <form role="form" autocomplete="off" action="#" id="form-event" name='form-event'>
            <input id='editar' value="" name='editar' type='hidden'>
            <!--Input oculto para decir si está en modo edición -->

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">

                            <label>Compositores</label>
                            <select id="selectComposer" name="selectComposer" class="form-control select2" style="width: 100%;">
                                @if ($composers->count())
                                @foreach($composers as $composer)
                                 <option value=""> </option>
                                    <option value="{{ $composer->id }}"> {{ $composer->composerFirstname }} ~ {{$composer->composerLastname}}</option>
                                @endforeach
                                @endif
                            </select>
                            <span class="help-block" id="error"></span>

                    </div>
                </div>
            </div>
            <hr/>
            <div class='row'>
            	<div class="container-fluid spark-screen">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title">Listado de Obras</h3>
                        </div>

                        <div class="box-body">

                            <table id="table-works" class="display table-detail table table-striped table-bordered" style="width:100%">
                                <thead>
                                </thead>
                                <tbody>
                                </tbody>
                                <tfoot>
                                </tfoot>
                            </table>

                        </div><!-- /.box-body -->

                    </div><!-- /.box -->
                    <div id="iframe_dialog"></div>
                    <div class="time_line"></div>
                </div>
            </div>
            <hr/>
            <div class="col-md-6 float-right">
                <button id='botonAd' type="submit" class="btn float-right btn-success">Añadir Obra</button>
                <button id='Cancel' type="button" class="btn float-right btn-danger">Cancelar</button>
            </div>

        </form>
    </div><!-- /card-body -->
</div>


@stop

@section('css')
<link rel="stylesheet" href="/css/archivo.css">
@stop

@section('js')
<script src="/js/jquery.validate.min.js"></script>
<script src="/js/archivo/archivo.js"></script>
@stop
