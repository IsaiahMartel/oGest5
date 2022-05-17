@extends('adminlte::page')
@push('css')
    <style type="text/css">
        body {
            font-size: 14px !important;
        }

    </style>
@endpush

@section('title', 'Store')

@section('content_header')
    <h1>Gestión de Store</h1>
@stop

@section('content')
    <!-- PRODUCT LIST -->
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Ficheros</h3>

            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                </button>
                <button type="button" class="btn btn-tool" data-card-widget="remove">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        <!-- /.card-header -->
        <div class="card-body p-0">
            <ul class="products-list product-list-in-card pl-2 pr-2">
                @foreach ($fichero as $fileKey => $file)
                    <li class="item">
                        <i class="fas fa-file-pdf fa-2x text-danger float-left mr-3"></i>
                        <div class="">
                            <a target='_blank' href="{{asset($file['urlFile']) }}" class="product-title ">{{$file['nombreFile']}}
                                <span class="badge badge-warning float-right">PDF</span></a>
                            <span class="product-description">
                                {{ $file['nombreFile'] }}
                            </span>
                        </div>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
    <div class="accordion" id="partituras">

    @foreach ($nombreCarpetas2 as $key => $carpeta2)
        <div class="card">
            <div class="card-header" id="cabecera{{ $carpeta2['carpeta'] }}">
                <h2 class="mb-0">

                     <a data-url="{{$carpeta2['url']}}" class="btn btn-link btn-block text-left collapsed partitura" type="button" data-toggle="collapse"
                        data-target="#{{ $carpeta2['carpeta'] }}" aria-expanded="false" aria-controls="{{ $carpeta2['carpeta'] }}">
                        <i class="fas fa-folder-open fa-2x mr-2 text-warning"></i><span>{{ $carpeta2['carpeta'] }}</span>
                        </a>

                </h2>
            </div>
            <div id="{{ $carpeta2['carpeta'] }}" class="collapse" aria-labelledby="cabecera{{ $carpeta2['carpeta'] }}" data-parent="#partituras">
                <div id = "contenido-"{{$carpeta2['carpeta']}}>
                    <div class="text-center" >
                        <strong>Cargando, espere...</strong>
                        <div class="spinner-border m-5" role="status">
                            <span class="sr-only">Cargando...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endforeach
</div>


@stop

@section('css')

@stop

@section('js')
    <script src="/js/storage/storage.js"></script>
@stop
