<div class="p-3">
    <h4>
        <span class="brand-text font-weight-light">Temporada de trabajo</span>
    </h4>

      <!-- Sidebar -->
    <div class="sidebar">
        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
                <!-- Add icons to the links using the .nav-icon class
                    with font-awesome or any other icon font library -->
                <li class="nav-item">
                    <div class='container'>
                        <p>
                            <i class="nav-icon fas fa-th"></i>
                        Seleccione Temporada
                        </p>
                        <select id="selectSeasonName" class="form-control select2"></label>
                        @if ($seasons->count())
                            @foreach ($seasons as $season)
                                <option value="{{ $season->id }}" {{ $season_id == $season->id ? 'selected="selected"' : '' }} >{{ $season->seasonName }}</option>
                            @endforeach
                        @endif
                        </select>
                    </div>
                </li>
            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
</div>
