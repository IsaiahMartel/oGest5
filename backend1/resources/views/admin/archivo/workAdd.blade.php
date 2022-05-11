@extends('adminlte::page')

@push('css')
<style type="text/css">
    body {
        font-size: 14px !important;
    }
</style>
@endpush

@section('title', 'Añadir Obra')

@section('content_header')
<h1>Añadir Obra al sistema</h1>
@stop

@section('content')

    <!-- Main content -->

    <section class="content">
        <div class="container-fluid">
            <form id='form-work' name='form-work'>
            <input id='editar' value="" name='editar' type='hidden'>
            <!--Input oculto para decir si está en modo edición -->
                <div class="row">
                    <!-- Card para el nombre de nueva obra -->
                    <div class="col-md-12">
                        <div class="card card-primary">
                            <!-- empieza card -->
                            <div class="card-header">
                                <h3 id='card-obra' class="card-title">Nueva Obra</h3>
                                <div class="card-tools">
                                    <button type="button" class="btn btn-tool" data-card-widget="collapse"
                                        title="Collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <!-- / empieza card-body -->
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Compositor</label>
                                            <select id="composer_id" name="composer_id" class="form-control select2" style="width: 100%;">
                                                <option value="">seleccione compositor </option>
                                                @if ($composers->count())
                                                    @foreach($composers as $composer)
                                                    <option value="{{ $composer->id }}">{{$composer->composerLastname}} ~ {{ $composer->composerFirstname }}</option>
                                                    @endforeach
                                                @endif
                                            </select>
                                            <span class="help-block" id="error"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label for="workName">Nombre de Obra</label>
                                            <input id="workName" name="workName" type="text" class="form-control" placeholder="Nombre de Obra (este nombre será mostrado en los proyectos)" required="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="workName2">Nombre 2 de la Obra</label>
                                            <input id="workName2" name="workName2" type="text" class="form-control" placeholder="Nombre 2 de Obra (este nombre NO será mostrado en ningun informe)">
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="workArrangement">Arreglo</label>
                                            <input id="workArrangement" name="workArrangement" type="text" class="form-control" placeholder="arreglo o Arreglista">
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="workCatalog">Catalogo G.</label>
                                            <input id="workCatalog" name="workCatalog" type="text" class="form-control" placeholder="Catalogo General de la Obra">
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label>Año de composición:</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="far fa-calendar-alt"></i>
                                                    </span>
                                                </div>
                                                <input type="text" class="form-control datetimepicker-input" id="workCompyear" name="workCompyear" data-target="#datetimepicker1">
                                            </div>
                                        </div>

                                    </div>


                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="workDuration">Duración</label>
                                            <input id="workDuration" name="workDuration" type="time" class="form-control" placeholder="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Row para la Plantilla y el Catalogo -->

                <div class="row">

                    <div class="col-md-8">

                        <div class="card card-info">
                            <!-- empieza card -->
                            <div class="card-header">
                                <h3 class="card-title">Instrumentación</h3>
                                <div class="card-tools">
                                    <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <!-- / empieza card-body -->
                                @php
                                    $i = 0;
                                @endphp
                                @foreach ( $instruments as $instrument)

                                    @if ($instrument=='flute' OR $instrument=='oboe' OR $instrument=='clarinet' OR $instrument=='bassoon')
                                        <div class="row">
                                    @endif
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label>{{$instrumentos[$i]}}</label>
                                            <input id='{{$instrument}}' maxlength='2' name='{{$instrument}}' type='number' class='form-control'>
                                        </div>
                                    </div>

                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label><br></label>
                                            <input id={{$instrument.'Exp'}} name={{$instrument.'Exp'}} type='text' class='form-control'>
                                        </div>
                                    </div>
                                    @if ($instrument=='harp' OR $instrument=='keyboard' OR $instrument=='vocals' OR $instrument=='tuba')
                                        </div>
                                    @endif
                                    @php
                                        $i++;
                                    @endphp

                                @endforeach
                                <hr/>

                                <div class="row">
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label for="violin1">Violín 1º</label>
                                            <input id="violin1" name="violin1" type="number" class="form-control" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label for="violin2">Violín 2º</label>
                                            <input id="violin2" name="violin2" type="number" class="form-control" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label for="viola">Viola</label>
                                            <input id="viola" name="viola" type="number" class="form-control" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label for="cello">Cello</label>
                                            <input id="cello" name="cello" type="number" class="form-control" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label for="bass">Ctb</label>
                                            <input id="bass" name="bass" type="number" class="form-control" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <div class="form-group">
                                            <label for="stringsExp">Tiene cuerda</label>
                                            <input id="stringsExp" name="stringsExp" type="text" class="form-control" placeholder="Poner Y si tiene cuerda">
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div class="row">
                                    <div class="col-md-4"> <!-- card percusión -->

                                        <div class="card">
                                            <div class="card-header border-0">
                                                <h3 class="card-title">Percusión</h3>
                                                <div class="card-tools">
                                                    <a id='percussion-plus' href="#" class="btn btn-tool btn-sm instrumentAdd">
                                                        <i class="fas fa-plus"></i>
                                                    </a>
                                                </div>
                                            </div>

                                            <div class="card-body table-responsive p-0">
                                                <table id='table-percussion-plus' class="table table-striped table-valign-middle">
                                                    <thead>
                                                        <tr>
                                                            <th class='d-none'>id</th>
                                                            <th>Code</th>
                                                            <th>Instrumento</th>
                                                            <th>More</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div> <!-- .card keyboard -->
                                    <div class="col-md-4"> <!-- card keyboard -->

                                        <div class="card">
                                            <div class="card-header border-0">
                                                <h3 class="card-title">Teclado</h3>
                                                <div class="card-tools">
                                                    <a id='keyboard-plus' href="#" class="btn btn-tool btn-sm instrumentAdd">
                                                        <i class="fas fa-plus"></i>
                                                    </a>
                                                </div>
                                            </div>

                                            <div class="card-body table-responsive p-0">
                                                <table id='table-keyboard-plus' class="table table-striped table-valign-middle">
                                                    <thead>
                                                        <tr>
                                                            <th class='d-none'>id</th>
                                                            <th>Code</th>
                                                            <th>Instrumento</th>
                                                            <th>More</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div> <!-- .card voces -->
                                    <div class="col-md-4"> <!-- card voces -->

                                        <div class="card">
                                            <div class="card-header border-0">
                                                <h3 class="card-title">Voces</h3>
                                                <div class="card-tools">
                                                    <a id='voice-plus' href="#" class="btn btn-tool btn-sm instrumentAdd">
                                                        <i class="fas fa-plus"></i>
                                                    </a>
                                                </div>
                                            </div>

                                            <div class="card-body table-responsive p-0">
                                                <table id='table-voice-plus' class="table table-striped table-valign-middle">
                                                    <thead>
                                                        <tr>
                                                            <th class='d-none'>id</th>
                                                            <th>Code</th>
                                                            <th>Instrumento</th>
                                                            <th>More</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div> <!-- .card voces -->

                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="float-right">
                                            <button id='workAdd' type="" class="btn  btn-success">Guardar Obra</button>
                                            <button id='Cancel' type="" class="btn btn-primary">Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="col-md-4">
                        <div class="card card-purple">
                            <!-- empieza card -->
                            <div class="card-header">
                                <h3 class="card-title">Archivo</h3>
                                <div class="card-tools">
                                    <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <!-- / empieza card-body -->
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Cuerda</label>
                                            <input id='libraryStrings' name='libraryStrings' type='text' class='form-control'>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Instrumentación</label>
                                            <input id='libraryInstrumentation' name='libraryInstrumentation' type='text' class='form-control'>
                                        </div>

                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Catalogo</label>
                                            <input id='libraryCatalog' name='libraryCatalog' type='text' class='form-control'>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Material</label>
                                            <input id='libraryMaterial' name='libraryMaterial' type='text' class='form-control'>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label >Compra</label>
                                            <div class="icheck-primary form-group icheck-info">
                                                <input type="checkbox" id="libraryCompra" name="libraryCompra">
                                                <label for="libraryCompra"></label>
                                            </div>
                                    </div>
                                    <div class="col">
                                        <label>Alquiler</label>
                                        <div class="icheck-primary form-group icheck-success">
                                            <input type="checkbox" id="libraryAlquiler" name="libraryAlquiler">
                                            <label for="libraryAlquiler" ></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Representante</label>
                                            <select id="libraryaddress_id" name="libraryaddress_id" class="form-control select2" style="width: 100%;">
                                             <option value="" selected disabled> Seleccione el representante </option>
                                                @if ($addresses->count())
                                                    @foreach ($addresses as $address)
                                                        <option value="{{ $address->id }}"> {{ $address->addresslastName }} </option>
                                                    @endforeach
                                                @endif
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                        <label>Url partes</label>
                                            <input value="" id='libraryUrl' name='libraryUrl' type='text' class='form-control'>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Notas</label>
                                            <textarea id="libraryNote" name ='libraryNote'></textarea>
                                            <!-- input id='libraryNote' name='libraryNote' type='text' class='form-control'  -->
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label >Partes</label>
                                            <div class="icheck-primary form-group icheck-info">
                                                <input type="checkbox" id="libraryParts" name="libraryParts">
                                                <label for="libraryParts"></label>
                                            </div>
                                    </div>
                                    <div class="col">
                                        <label>P. Director</label>
                                        <div class="icheck-primary form-group icheck-success">
                                            <input type="checkbox" id="librarystringMasters" name="librarystringMasters">
                                            <label for="librarystringMasters" ></label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <label>W-Doble</label>
                                        <div class="icheck-primary form-group icheck-default">
                                            <input type="checkbox" id="libraryWwdouble" name="libraryWwdouble"/>
                                            <label for="libraryWwdouble"></label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <label>Permanent</label>
                                        <div class="icheck-primary form-group icheck-warning">
                                            <input type="checkbox" id="libraryPermanent" name="libraryPermanent"/>
                                            <label for="libraryPermanent"></label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <!-- FIN DEL Row para la Plantilla y el Catalogo -->

            </form>
        </div>
    </section>
    @include('admin/archivo/modalinstrument')


@stop

@section('css')
<link rel="stylesheet" href="/css/archivoWork.css">
@stop

@section('js')
<script src="/js/plugins/tableToJson/jquery.tabletojson.min.js"></script>
<script src="/js/jquery.validate.min.js"></script>
<script src="/js/archivo/archivoAdd.js"></script>
@stop
