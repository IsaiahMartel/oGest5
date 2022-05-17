<!-- Modal -->
<div class="modal fade" id="modal-workplaylist" style="overflow-y: scroll;" aria-labelledby="modal-workplaylist" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <section class="content">
                <form id='form-playlist' name='form-playlist'>
                    <input id='editar' value="" name='editar' type='hidden'>
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
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="playlistString">cuerda</label>
                                        <input id="playlistString" name="playlistString" type="text" class="form-control" placeholder="cuerda separada por /">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="workDuration">Duración</label>
                                        <input id="workDuration" name="workDuration" type="time" class="form-control" placeholder="">
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
                                            <table id='table-percussion-plus' class="table-instruments table table-striped table-valign-middle">
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

                                </div> <!-- .card percusion -->
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
                                            <table id='table-keyboard-plus' class="table-instruments table table-striped table-valign-middle">
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
                                            <table id='table-voice-plus' class="table-instruments table table-striped table-valign-middle">
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
                        </div>
                    </div>
                </form>
                <!-- /form -->
                </section>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Salir</button>
                <button id='guardarPlaylist' type="button" class="btn btn-primary">Guardar cambios</button>
            </div>
        </div>
    </div>
</div>
