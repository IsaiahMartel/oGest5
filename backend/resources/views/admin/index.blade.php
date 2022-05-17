@extends('adminlte::page')
@push('css')
<style type="text/css">
    body {
        font-size: 14px !important;
    }
</style>
@endpush
@section('title', 'Index')
@section('content_header')
<h1>oGest V.4</h1>
@stop

@section('content')
<div class="row">
    <div class="col-lg-3 col-6">
        <!-- small card -->
        <div class="small-box bg-info">
            <div class="inner">
                <h3 id='level1_count'>0</h3>
                <p>Proyectos Creados</p>
            </div>
            <div class="icon">
                <i class="far fa-address-book"></i>
            </div>
            <a id='level1' href="#" class="small-box-footer">
                Mas Información <i class="fas fa-arrow-circle-down"></i>
            </a>
        </div>
    </div>
    <div class="col-lg-3 col-6">
        <!-- small card -->
        <div class="small-box bg-success">
            <div class="inner">
                <h3 id='level0_count'>0</sup></h3>
                <p>Proyectos Publicados</p>
            </div>
            <div class="icon">
                <i class="fab fa-angellist"></i>
            </div>
            <a id='level0' href="#" class="small-box-footer">
                Mas Información <i class="fas fa-arrow-circle-down"></i>
            </a>
        </div>
    </div>
    <div class="col-lg-3 col-6">
        <!-- small card -->
        <div class="small-box bg-danger">
            <div class="inner">
                <h3 id='noPublicados'>0</h3>
                <p>Proyectos no Publicados</p>
            </div>
            <div class="icon">
                <i class="far fa-angry"></i>
            </div>
            <a id='level10' href="#" class="small-box-footer">
                Mas Información <i class="fas fa-arrow-circle-down"></i>
            </a>
        </div>
    </div>
    <div class="col-lg-3 col-6">
        <!-- small card -->
        <div class="small-box bg-warning">
            <div class="inner">
                <h3 id='seasonName' >{{$seasonName}}</h3>
                <p>Temporada</p>
            </div>
            <div class="icon">
                <i class="fab fa-audible"></i>
            </div>
        </div>
    </div>

</div> <!-- fin de cajas de información -->
<div class='row'>
    <div class="col-md-6">
        <div id='card-calendary' class="card calendaryLevel1">
            <div class="card-body front">
                <div data-level='' id="calendar" class=''></div>
            </div>
            <div class="card-body back">
                <div class="row mb-2">
                    <div class="col"><h5 class='text-black-50'>Artistico </h5></div>
                    <div class="col align-middle" id="artistico"></div>
                    <div class="col"><h5 class='text-black-50'>Producción </h5></div>
                    <div class="col align-middle" id="produccion"></div>
                    <div class="col"><h5 class='text-black-50'>Archivo </h5></div>
                    <div class="col align-middle" id="archivo"></div>
                </div>
                <ul class="todo-list listComp " data-widget="todo-list"></ul>
                <div class="row">
                    <div class="col">
                        <ul class="todo-list droppable-project" data-widget="todo-list"></ul>
                    </div>
                </div>
                <div class="row">

                    <div class="col">
                        <div class="row"  style="background-color:#F1F1F1">
                            <div class="col">
                                <h6 class='text-center'> Percusión </h6>
                                <ul class="instrument-list perPLay" data-widget="todo-list"></ul>
                            </div>
                            <div class="col">
                                <h6 class='text-center'> Teclados </h6>
                                <ul class="instrument-list keyPLay" data-widget="todo-list"></ul>
                            </div>
                            <div class="col">
                                <h6 class='text-center'> Voces </h6>
                                <ul class="instrument-list voiPLay" data-widget="todo-list"></ul>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <a href='#' id='volver' class='btn btn-warning  mt-3' role='button'><i class="fas fa-undo"></i></a>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
              <h3 class="card-title">Información extra</h3>
              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                    <i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <!-- /.card-header -->

            <div class="card-body front-right">
                <div class="row ">
                    <div class="col-12 alertsCard">
                        <div id='time_line' class="timeline" >
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body back-right">
                <div class="row ">
                    <div class="col">
                        <div class="card-body">
                            <table class="table table-bordered table-hover table_sheduleTerminado" style="width:100%"></table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@stop

@section('right-sidebar')
    @include('admin/sidebar/right-sidebar')
@stop

@section('css')
<link rel="stylesheet" href="/css/dashboard.css">
<link rel="stylesheet" href="/css/terminado.css">

@stop

@section('js')
    <script src="/js/dashboard.js"></script>
    <script src="/js/resource.js"></script>
@stop
