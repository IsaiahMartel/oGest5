<!-- Modal -->
<div class="modal" id="modal-instrument"  aria-labelledby="modal-instrumentLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id='modal-cabeceraSelect' class="modal-title"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <section class="content">
                {{-- form id='form-instrument' name='form-instrument' --}}
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Instrumento</label>
                                <select id="selectInstrument" name="selectInstrument" class="form-control select2" style="width: 100%;">

                                </select>
                                <span class="help-block" id="error"></span>
                            </div>
                        </div>
                    </div>
                {{-- /form --}}
                </section>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Salir</button>
                <button id='instrumentInsert' type="button" class="btn btn-primary">Insertar Instrumento</button>
            </div>
        </div>
    </div>
</div>
