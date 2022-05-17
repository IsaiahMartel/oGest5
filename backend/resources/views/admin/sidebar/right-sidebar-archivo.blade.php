<div class="p-3">
    <h4>
        <span class="brand-text font-weight-light">Configuración</span>
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
                            Configuracion cuerda
                        </p>
                    </div>
                </li>
                <li class="nav-item">
                    <div class='container'>
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="addresslastName" class="control-label">Cuerda Completa:</label>
                        <input disabled value="{{ $configString->configCompleta }}" type="text" class="form-control" id="configCompleta" name="configCompleta" placeholder="Ej: 10,8,6,4" required="true">
                        <span class="help-block" id="error"></span>
                    </div>
                    </div>
                </li>
                <li class="nav-item">
                    <div class='container'>
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="addresslastName" class="control-label">Cuerda Reducida:</label>
                        <input disabled value="{{ $configString->configReducida }}" type="text" class="form-control" id="configReducida" name="configReducida" placeholder="Ej: 10,8,6,4" required="true">
                        <span class="help-block" id="error"></span>
                    </div>
                    </div>
                </li>
                <li class="nav-item">
                    <div class='container'>
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="addresslastName" class="control-label">Sin cuerda:</label>
                        <input disabled value="{{ $configString->configSin }}" type="text" class="form-control" id="configSin" name="configSin" placeholder="Ej: 10,8,6,4" required="true">
                        <span class="help-block" id="error"></span>
                    </div>
                    </div>
                </li>
                <li class="nav-item">
                    <div class='container'>
                    <div class="form-group">
                        <!-- Nombre del Rol-->
                        <label for="addresslastName" class="control-label">Por determinar:</label>
                        <input disabled value="{{ $configString->configPd }}" type="text" class="form-control" id="configPd" name="configPd" placeholder="Ej: 10,8,6,4" required="true">
                        <span class="help-block" id="error"></span>
                    </div>
                    </div>
                </li>
            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
</div>


