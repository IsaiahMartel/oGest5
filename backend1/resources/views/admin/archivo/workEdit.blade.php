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
<h1>Editar Obra del sistema</h1>
@stop

@section('content')

    <!-- Main content -->

    <section class="content">
        <div class="container-fluid">
            <form id='form-work' name='form-work'>
            <input id='editar' value="{{$work->id}}" name='editar' type='hidden'>
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

                                                    <option value="{{ $composer->id }}" {{ $selectedComposer == $composer->id ? 'selected="selected"' : '' }}>{{$composer->composerLastname}} ~ {{ $composer->composerFirstname }}</option>
                                                    @endforeach
                                                @endif
                                            </select>
                                            <span class="help-block" id="error"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label for="workName">Nombre de Obra</label>
                                            <input value="{{$work->workName}}" id="workName" name="workName" type="text" class="form-control" placeholder="Nombre de Obra (este nombre será mostrado en los proyectos)" required="true" >
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="workName2">Nombre 2 de la Obra</label>
                                            <input value="{{$work->workName2}}" id="workName2" name="workName2" type="text" class="form-control" placeholder="Nombre 2 de Obra (este nombre NO será mostrado en ningun informe)">
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="workArrangement">Arreglo</label>
                                            <input value="{{$work->workArrangement}}" id="workArrangement" name="workArrangement" type="text" class="form-control" placeholder="arreglo o Arreglista">
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="workCatalog">Catalogo G.</label>
                                            <input value="{{$work->workCatalog}}" id="workCatalog" name="workCatalog" type="text" class="form-control" placeholder="Catalogo General de la Obra">
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
                                                <input value="{{$work->workCompyear}}" type="text" class="form-control datetimepicker-input" id="workCompyear" name="workCompyear" data-target="#datetimepicker1">
                                            </div>
                                        </div>

                                    </div>


                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="workDuration">Duración</label>
                                            <input value="{{$work->workDuration}}" id="workDuration" name="workDuration" type="time" class="form-control" placeholder="">
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
                                            <input value="{{$work->$instrument}}" id='{{$instrument}}' maxlength='2' name='{{$instrument}}' type='number' class='form-control'>
                                        </div>
                                    </div>
                                    @php
                                        $instrumentDinamico = $instrument.'Exp';
                                    @endphp

                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label><br></label>
                                            <input value="{{$work->$instrumentDinamico}}" id="{{$instrument.'Exp'}}" name="{{$instrument.'Exp'}}" type='text' class='form-control'>
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
                                            <input value="{{$work->violin1}}" id="violin1" name="violin1" type="number" class="form-control" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label for="violin2">Violín 2º</label>
                                            <input value="{{$work->violin2}}"  id="violin2" name="violin2" type="number" class="form-control" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label for="viola">Viola</label>
                                            <input value="{{$work->viola}}"  id="viola" name="viola" type="number" class="form-control" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label for="cello">Cello</label>
                                            <input value="{{$work->cello}}"  id="cello" name="cello" type="number" class="form-control" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label for="bass">Ctb</label>
                                            <input value="{{$work-> bass}}"  id="bass" name="bass" type="number" class="form-control" placeholder="">
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <div class="form-group">
                                            <label for="stringsExp">Tiene cuerda</label>
                                            <input value="{{$work->stringsExp }}"  id="stringsExp" name="stringsExp" type="text" class="form-control" placeholder="Poner Y si tiene cuerda">
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
                                                        @foreach ($work->percussions as $percussion)
                                                            <tr>
                                                                <td class='d-none'>{{$percussion->id}}</td>
                                                                <td>{{$percussion->instrumentCode}}</td>
                                                                <td>{{$percussion->instrumentName}}</td>
                                                                <td><a id='{{$percussion->id}}' href="#" class="btn btn-tool btn-sm del"><i class="far fa-trash-alt"></i></a> </td>
                                                            </tr>
                                                        @endforeach
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
                                                        @foreach ($work->keyboards as $keyboard)
                                                        <tr>
                                                            <td class='d-none'>{{$keyboard->id}}</td>
                                                            <td>{{$keyboard->instrumentCode}}</td>
                                                            <td>{{$keyboard->instrumentName}}</td>
                                                            <td><a id='{{$keyboard->id}}' href="#" class="btn btn-tool btn-sm del"><i class="far fa-trash-alt"></i></a> </td>
                                                        </tr>
                                                    @endforeach
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div> <!-- .card keyboard -->
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
                                                        @foreach ($work->voices as $voice)
                                                            <tr>
                                                                <td class='d-none'>{{$voice->id}}</td>
                                                                <td>{{$voice->instrumentCode}}</td>
                                                                <td>{{$voice->instrumentName}}</td>
                                                                <td><a id='{{$voice->id}}' href="#" class="btn btn-tool btn-sm del"><i class="far fa-trash-alt"></i></a> </td>
                                                            </tr>
                                                        @endforeach
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div> <!-- .card voces -->

                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="float-right">
                                            <button id='workAdd' type="" class="btn  btn-success">Guardar Cambios</button>
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
                                            @if ($work->libraries)
                                                <input value="{{$work->libraries->libraryStrings}}" id='libraryStrings' name='libraryStrings' type='text' class='form-control'>
                                            @else
                                                <input value="" id='libraryStrings' name='libraryStrings' type='text' class='form-control'>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Instrumentación</label>
                                            @if ($work->libraries)
                                                <input value="{{$work->libraries->libraryInstrumentation}}" id='libraryInstrumentation' name='libraryInstrumentation' type='text' class='form-control'>
                                            @else
                                                <input value="" id='libraryInstrumentation' name='libraryInstrumentation' type='text' class='form-control'>
                                            @endif

                                        </div>

                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                           <label>Catalogo</label>
                                           @if ($work->libraries)
                                               <input value="{{$work->libraries->libraryCatalog}}" id='libraryCatalog' name='libraryCatalog' type='text' class='form-control'>
                                            @else
                                                <input value="" id='libraryCatalog' name='libraryCatalog' type='text' class='form-control'>
                                            @endif
                                          </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Material</label>
                                            @if ($work->libraries)
                                                <input value="{{$work->libraries->libraryMaterial}}" id='libraryMaterial' name='libraryMaterial' type='text' class='form-control'>
                                            @else
                                                <input value="" id='libraryMaterial' name='libraryMaterial' type='text' class='form-control'>
                                                @endif
                                            </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label >Compra</label>
                                            <div class="icheck-primary form-group icheck-info">
                                                @if ($work->libraries)
                                                    <input type="checkbox" id="libraryCompra" name="libraryCompra"  @if($work->libraries->libraryCompra == 1) checked @endif>
                                                @else
                                                    <input type="checkbox" id="libraryCompra" name="libraryCompra" >
                                                @endif
                                                    <label for="libraryCompra"></label>
                                            </div>
                                    </div>
                                    <div class="col">
                                        <label>Alquiler</label>
                                            <div class="icheck-primary form-group icheck-info">
                                                @if ($work->libraries)
                                                    <input type="checkbox" id="libraryAlquiler" name="libraryAlquiler"  @if($work->libraries->libraryAlquiler == 1) checked @endif>
                                                @else
                                                    <input type="checkbox" id="libraryAlquiler" name="libraryAlquiler" >
                                                @endif
                                                    <label for="libraryAlquiler"></label>
                                            </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Representante</label>
                                            <select id="libraryaddress_id" name="libraryaddress_id" class="form-control select2" style="width: 100%;">

                                                @if ($addresses->count())
                                                    @if ($selectedAddress == null)
                                                        <option value="" disabled selected> Seleccione el representante </option>
                                                    @endif
                                                        @foreach ($addresses as $address)
                                                        <option value="{{ $address->id }}"  {{ $selectedAddress == $address->id ? 'selected="selected"' : '' }}> {{ $address->addresslastName }} </option>
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
                                        @if ($work->libraries)
                                            <input value="{{$work->libraries->libraryUrl}}" id='libraryUrl' name='libraryUrl' type='text' class='form-control'>
                                        @else
                                            <input value="" id='libraryUrl' name='libraryUrl' type='text' class='form-control'>
                                        @endif
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Notas</label>
                                            <textarea id="libraryNote" name ='libraryNote'>{{ ($work->libraries == NULL)? '': $work->libraries->libraryNote }}</textarea>
                                            <!-- input id='libraryNote' name='libraryNote' type='text' class='form-control'  -->
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label >Partes</label>
                                            <div class="icheck-primary form-group icheck-info">
                                            @if ($work->libraries)
                                                <input type="checkbox" id="libraryParts" name="libraryParts"  @if($work->libraries->libraryParts == 1) checked @endif>
                                            @else
                                                <input type="checkbox" id="libraryParts" name="libraryParts" >
                                            @endif
                                                <label for="libraryParts"></label>
                                            </div>
                                    </div>
                                    <div class="col">
                                        <label>P. Director</label>
                                        <div class="icheck-primary form-group icheck-success">
                                        @if ($work->libraries)
                                            <input type="checkbox" id="librarystringMasters" name="librarystringMasters"  @if($work->libraries->librarystringMasters == 1) checked @endif >
                                        @else
                                            <input type="checkbox" id="librarystringMasters" name="librarystringMasters">
                                        @endif
                                            <label for="librarystringMasters" ></label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <label>W-Doble</label>
                                        <div class="icheck-primary form-group icheck-default">
                                        @if ($work->libraries)
                                            <input type="checkbox" id="libraryWwdouble" name="libraryWwdouble" @if($work->libraries->libraryWwdouble == 1) checked @endif  >
                                        @else
                                            <input type="checkbox" id="libraryWwdouble" name="libraryWwdouble">
                                        @endif
                                            <label for="libraryWwdouble"></label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <label>Permanent</label>
                                        <div class="icheck-primary form-group icheck-warning">
                                        @if ($work->libraries)
                                            <input type="checkbox" id="libraryPermanent" name="libraryPermanent"  @if($work->libraries->libraryPermanent == 1) checked @endif  >
                                        @else
                                            <input type="checkbox" id="libraryPermanent" name="libraryPermanent">
                                        @endif
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
<script src="/js/archivo/archivoAdd.js"></script>
@stop
