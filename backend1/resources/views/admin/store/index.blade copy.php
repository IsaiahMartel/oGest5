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

@foreach($tree_array as $year => $months)
    <ul>
        <li>
            {{$year}}
            @foreach($months as $month => $files)
                <ul>
                    <li>
                        {{$month}}
                        @foreach($files as $file)
                            <ul>
                                <li>
                                    <a href="{{$file['url']}}">{{$file['filename']}}</a>
                                </li>
                            </ul>
                        @endforeach
                    </li>
                </ul>
            @endforeach
        </li>
    </ul>
@endforeach

@stop

@section('css')

@stop

@section('js')

@stop
