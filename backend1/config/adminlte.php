<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Title
    |--------------------------------------------------------------------------
    |
    | Here you can change the default title of your admin panel.
    |
    | For detailed instructions you can look the title section here:
    | https://github.com/jeroennoten/Laravel-AdminLTE/wiki/Basic-Configuration
    |
    */

    'title' => '',
    'title_prefix' => 'oGest4 | ',
    'title_postfix' => '',

    /*
    |--------------------------------------------------------------------------
    | Favicon
    |--------------------------------------------------------------------------
    |
    | Here you can activate the favicon.
    |
    | For detailed instructions you can look the favicon section here:
    | https://github.com/jeroennoten/Laravel-AdminLTE/wiki/Basic-Configuration
    |
    */

    'use_ico_only' => true,
    'use_full_favicon' => false,

    /*
    |--------------------------------------------------------------------------
    | Logo
    |--------------------------------------------------------------------------
    |
    | Here you can change the logo of your admin panel.
    |
    | For detailed instructions you can look the logo section here:
    | https://github.com/jeroennoten/Laravel-AdminLTE/wiki/Basic-Configuration
    |
    */

    'logo' => '<b>oGest4</b><small> - v1.2</small>',
    //'logo_img' => 'vendor/adminlte/dist/img/AdminLTELogo.png', favicon.ico
    'logo_img' => 'img/logooGest4.png',
    'logo_img_class' => 'brand-image img-circle elevation-3',
    'logo_img_xl' => null,
    'logo_img_xl_class' => 'brand-image-xs',
    'logo_img_alt' => 'oGest4',

    /*
    |--------------------------------------------------------------------------
    | User Menu
    |--------------------------------------------------------------------------
    |
    | Here you can activate and change the user menu.
    |
    | For detailed instructions you can look the user menu section here:
    | https://github.com/jeroennoten/Laravel-AdminLTE/wiki/Basic-Configuration
    |
    */

    'usermenu_enabled' => true,
    'usermenu_header' => true,
    'usermenu_header_class' => 'bg-primary',
    'usermenu_image' => true,
    'usermenu_desc' => true,
    'usermenu_profile_url' => false,

    /*
    |--------------------------------------------------------------------------
    | Layout
    |--------------------------------------------------------------------------
    |
    | Here we change the layout of your admin panel.
    |
    | For detailed instructions you can look the layout section here:
    | https://github.com/jeroennoten/Laravel-AdminLTE/wiki/Layout-and-Styling-Configuration
    |
    */

    'layout_topnav' => null,
    'layout_boxed' => null,
    'layout_fixed_sidebar' => true,
    'layout_fixed_navbar' => true,
    'layout_fixed_footer' => null,
    'layout_dark_mode' => null,

    /*
    |--------------------------------------------------------------------------
    | Authentication Views Classes
    |--------------------------------------------------------------------------
    |
    | Here you can change the look and behavior of the authentication views.
    |
    | For detailed instructions you can look the auth classes section here:
    | https://github.com/jeroennoten/Laravel-AdminLTE/wiki/Layout-and-Styling-Configuration
    |
    */

    'classes_auth_card' => 'card-outline card-primary',
    'classes_auth_header' => '',
    'classes_auth_body' => '',
    'classes_auth_footer' => '',
    'classes_auth_icon' => '',
    'classes_auth_btn' => 'btn-flat btn-primary',

    /*
    |--------------------------------------------------------------------------
    | Admin Panel Classes
    |--------------------------------------------------------------------------
    |
    | Here you can change the look and behavior of the admin panel.
    |
    | For detailed instructions you can look the admin panel classes here:
    | https://github.com/jeroennoten/Laravel-AdminLTE/wiki/Layout-and-Styling-Configuration
    |
    */

    'classes_body' => '',
    'classes_brand' => '',
    'classes_brand_text' => '',
    'classes_content_wrapper' => '',
    'classes_content_header' => '',
    'classes_content' => '',
    'classes_sidebar' => 'sidebar-dark-primary elevation-4',
    'classes_sidebar_nav' => '',
    'classes_topnav' => 'navbar-white navbar-light',
    'classes_topnav_nav' => 'navbar-expand',
    'classes_topnav_container' => 'container',

    /*
    |--------------------------------------------------------------------------
    | Sidebar
    |--------------------------------------------------------------------------
    |
    | Here we can modify the sidebar of the admin panel.
    |
    | For detailed instructions you can look the sidebar section here:
    | https://github.com/jeroennoten/Laravel-AdminLTE/wiki/Layout-and-Styling-Configuration
    |
    */

    'sidebar_mini' => 'lg',
    'sidebar_collapse' => false,
    'sidebar_collapse_auto_size' => false,
    'sidebar_collapse_remember' => false,
    'sidebar_collapse_remember_no_transition' => true,
    'sidebar_scrollbar_theme' => 'os-theme-light',
    'sidebar_scrollbar_auto_hide' => 'l',
    'sidebar_nav_accordion' => true,
    'sidebar_nav_animation_speed' => 300,

    /*
    |--------------------------------------------------------------------------
    | Control Sidebar (Right Sidebar)
    |--------------------------------------------------------------------------
    |
    | Here we can modify the right sidebar aka control sidebar of the admin panel.
    |
    | For detailed instructions you can look the right sidebar section here:
    | https://github.com/jeroennoten/Laravel-AdminLTE/wiki/Layout-and-Styling-Configuration
    |
    */

    'right_sidebar' => true,
    'right_sidebar_icon' => 'fas fa-cogs',
    'right_sidebar_theme' => 'dark',
    'right_sidebar_slide' => true,
    'right_sidebar_push' => false,
    'right_sidebar_scrollbar_theme' => 'os-theme-light',
    'right_sidebar_scrollbar_auto_hide' => 'l',

    /*
    |--------------------------------------------------------------------------
    | URLs
    |--------------------------------------------------------------------------
    |
    | Here we can modify the url settings of the admin panel.
    |
    | For detailed instructions you can look the urls section here:
    | https://github.com/jeroennoten/Laravel-AdminLTE/wiki/Basic-Configuration
    |
    */

    'use_route_url' => false,
    'dashboard_url' => 'admin',
    'logout_url' => 'logout',
    'login_url' => 'login',
    'register_url' => 'register',
    'password_reset_url' => 'password/reset',
    'password_email_url' => 'password/email',
    'profile_url' => false,

    /*
    |--------------------------------------------------------------------------
    | Laravel Mix
    |--------------------------------------------------------------------------
    |
    | Here we can enable the Laravel Mix option for the admin panel.
    |
    | For detailed instructions you can look the laravel mix section here:
    | https://github.com/jeroennoten/Laravel-AdminLTE/wiki/Other-Configuration
    |
    */

    'enabled_laravel_mix' => false,
    'laravel_mix_css_path' => 'css/app.css',
    'laravel_mix_js_path' => 'js/app.js',

    /*
    |--------------------------------------------------------------------------
    | Menu Items
    |--------------------------------------------------------------------------
    |
    | Here we can modify the sidebar/top navigation of the admin panel.
    |
    | For detailed instructions you can look here:
    | https://github.com/jeroennoten/Laravel-AdminLTE/wiki/Menu-Configuration
    |
    */

    'menu' => [
        // Navbar items:
        /*[
            'type'         => 'navbar-search',
            'text'         => 'search',
            'topnav_right' => true,
        ],*/
        [
            'type'         => 'fullscreen-widget',
            'topnav_right' => true,
        ],

        // Sidebar items:
        [
            'type' => 'sidebar-menu-search',
            'text' => 'search',
        ],
        [
            'text' => 'blog',
            'url'  => 'admin/blog',
            'can'  => 'manage-blog',
        ],
        [
            'text' => 'Dashboard',
            'url'  => 'admin',
            'icon' => 'fab fa-audible'
        ],
        ['header' => 'ADMINISTRACIÓN',
         'can'    => 'admin/users'],
         [
            'text'        => 'Usuarios Movil',
            'icon_color'  => 'red',
            'url'         => 'admin/mobile',
            'icon'        => 'fas fa-mobile-alt',
            'can'         => 'admin/users'
        ],
        [
            'text'        => 'Usuarios',
            'icon_color'  => 'blue',
            'url'         => 'admin/users',
            'icon'        => 'fas fa-users',
            'can'         => 'admin/users'
        ],
        [
            'text'        => 'Zonas de acceso',
            'icon_color'  => 'blue',
            'url'         => 'admin/users/permission',
            'icon'        => 'fas fa-lock-open',
            'can'         => 'admin/users/permission',
        ],
        ['header' => 'GENERAL'],
        [
            'text' => 'Libreta direcciones',
            'icon_color' => 'green',
            'url'  => 'admin/address',
            'icon' => 'far fa-address-book'

        ],
        [
            'text' => 'Grupos de contacto',
            'icon_color' => 'green',
            'url'  => 'admin/address/groupsAddress',
            'icon' => 'fas fa-users-cog'
        ],
        ['header' => 'ARTISTICO',
        'can'  => 'admin/seasons',],

            [
                'text'       => 'Crear/Gestionar Temporadas',
                'icon_color' => 'green',
                'url'        => 'admin/seasons',
                'icon'       => 'far fa-object-group',
                'can'        => 'admin/seasons',
            ],
            [
                'text' => 'Crear/Gestionar Eventos',
                'icon_color' => 'green',
                'url'  => 'admin/events',
                'icon' => 'far fa-object-group',
                'can'  => 'admin/events',
            ],
            [
                'text' => 'Crear/Gestionar projectos',
                'icon_color' => 'yellow',
                'url'  => 'admin/projects/projectGes',
                'icon' => 'far fa-plus-square',
                'can'  => 'admin/projects/projectGes',
            ],
            /*[
                'text' => 'Gestionar/crea Proyecto_(OLD)',
                'icon_color' => 'yellow',
                'url'  => 'admin/projects',
                'icon' => 'far fa-plus-square'
            ],*/
            [
                'text' => 'Gestionar Pulicaciones',
                'icon_color' => 'red',
                'url'  => 'admin/publication',
                'icon' => 'far fa-plus-square',
                'can'  => 'admin/publication',
            ],
            [
                'text' => 'Integrantes del Proyecto',
                'icon_color' => 'yellow',
                'url'  => 'admin/produc',
                'icon' => 'far fa-edit',
                'can'  => 'admin/produc',
            ],


        ['header' => 'ARCHIVO',
        'can'  => 'admin/archivo',],
            [
                'text' => 'Crear Compositor',
                'icon_color' => 'info',
                'url'  => 'admin/archivo/composer',
                'icon' => 'fas fa-users',
                'can'  => 'admin/archivo/composer',
            ],
            [
                'text' => 'Crear Obra',
                'icon_color' => 'info',
                'url'  => 'admin/archivo/workAdd',
                'icon' => 'far fa-calendar-plus',
                'can'  => 'admin/archivo/workAdd',
            ],
            [
                'text' => 'Consultar/Actualizar obra',
                'icon_color' => 'info',
                'url'  => 'admin/archivo',
                'icon' => 'far fa-calendar',
                'can'  => 'admin/archivo',
            ],
            [
                'text' => 'Actualizar obras en Proyecto',
                'icon_color' => 'yellow',
                'url'  => 'admin/archivo/gestArchivo',
                'icon' => 'far fa-edit',
                'can'  => 'admin/archivo/gestArchivo',
            ],
        ['header' => 'PRODUCCIÓN',
        'can'  => 'admin/produc/tipes'],
            [
                'text' => 'Crear/editar Tipos de ensayo',
                'icon_color' => 'blue',
                'url'  => 'admin/produc/tipes',
                'icon' => 'far fa-plus-square',
                'can'  => 'admin/produc/tipes',
            ],
            [
                'text' => 'Crear/editar salas',
                'icon_color' => 'blue',
                'url'  => 'admin/produc/rooms',
                'icon' => 'far fa-plus-square',
                'can'  => 'admin/produc/rooms',
            ],
            [
                'text' => 'Gestionar Ensayos de Proyecto',
                'icon_color' => 'yellow',
                'url'  => 'admin/produc/shedule',
                'icon' => 'far fa-edit',
                'can'  => 'admin/produc/shedule',
            ],
            ['header' => 'IMPRESIONES'],
            [
                'text' => 'Plan de ensayo',
                'icon_color' => 'green',
                'url'  => 'admin/print/',
                'icon' => 'far fa-plus-square'
            ],


    ],

    /*
    |--------------------------------------------------------------------------
    | Menu Filters
    |--------------------------------------------------------------------------
    |
    | Here we can modify the menu filters of the admin panel.
    |
    | For detailed instructions you can look the menu filters section here:
    | https://github.com/jeroennoten/Laravel-AdminLTE/wiki/Menu-Configuration
    |
    */

    'filters' => [
        JeroenNoten\LaravelAdminLte\Menu\Filters\GateFilter::class,
        JeroenNoten\LaravelAdminLte\Menu\Filters\HrefFilter::class,
        JeroenNoten\LaravelAdminLte\Menu\Filters\SearchFilter::class,
        JeroenNoten\LaravelAdminLte\Menu\Filters\ActiveFilter::class,
        JeroenNoten\LaravelAdminLte\Menu\Filters\ClassesFilter::class,
        JeroenNoten\LaravelAdminLte\Menu\Filters\LangFilter::class,
        JeroenNoten\LaravelAdminLte\Menu\Filters\DataFilter::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Plugins Initialization
    |--------------------------------------------------------------------------
    |
    | Here we can modify the plugins used inside the admin panel.
    |
    | For detailed instructions you can look the plugins section here:
    | https://github.com/jeroennoten/Laravel-AdminLTE/wiki/Plugins-Configuration
    |

*/

    'plugins' => [
        'DateRangePicker' => [
            'active' => true,
            'files' => [
                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => 'vendor/moment/moment.min.js',
                ],
                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => 'vendor/daterangepicker/daterangepicker.js',
                    //'location' => 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-daterangepicker/3.0.5/daterangepicker.min.js'
                ],
                [
                    'type' => 'css',
                    'asset' => true,
                    'location' => 'vendor/daterangepicker/daterangepicker.css',
                    //'location' => 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-daterangepicker/3.0.5/daterangepicker.css'
                ],
            ],
        ],
        'jquery-ui' => [
            'active' => true,
            'files' => [
                [
                    'type' => 'js',
                    'asset' => true,
                    //'location' => '//cdn.jsdelivr.net/npm/sweetalert2@8',
                    'location' => 'vendor/jquery-ui/jquery-ui.min.js'
                ],
                [
                    'type' => 'css',
                    'asset' => true,
                    //'location' => '//cdn.jsdelivr.net/npm/sweetalert2@8',
                    'location' => 'vendor/jquery-ui/jquery-ui.min.css'
                ],
                [
                    'type' => 'js',
                    'asset' => true,
                    //'location' => '//cdn.jsdelivr.net/npm/sweetalert2@8',
                    'location' => '/js/plugins/jquery-ui-touch-punch-master/jquery.ui.touch-punch.min.js'
                ],

            ],
        ],
        'Datatables' => [
            'active' => true,
            'files' => [
               /* [
                    'type' => 'js',
                    'asset' => false,
                    'location' => '/vendor/datatables/js/dataTables.bootstrap4.min.js',

                ],*/
                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => '/vendor/datatables/js/jquery.dataTables.min.js',
                    //'location' => 'vendor/datatables/js/dataTables.bootstrap4.min.js'
                ],
                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => '/vendor/datatables-plugins/responsive/js/dataTables.responsive.min.js',
                    //'location' => 'vendor/datatables/js/dataTables.bootstrap4.min.js'
                ],
                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => '/vendor/datatables-plugins/responsive/js/responsive.bootstrap4.min.js',
                    //'location' => 'vendor/datatables/js/dataTables.bootstrap4.min.js'
                ],
                /*[
                    'type' => 'css',
                    'asset' => true,
                    'location' => '/vendor/datatables/css/dataTables.bootstrap4.min.css',
                    //'location' => 'vendor/datatables/css/jquery.dataTables.min.css',
                ],*/
                [
                    'type' => 'css',
                    'asset' => true,
                    'location' => '/vendor/datatables/css/jquery.dataTables.min.css',
                    //'location' => 'vendor/datatables/css/jquery.dataTables.min.css',
                ],
                [
                    'type' => 'css',
                    'asset' => true,
                    'location' => '/vendor/datatables-plugins/responsive/css/responsive.bootstrap4.min.css',
                    //'location' => 'vendor/datatables/js/dataTables.bootstrap4.min.js'
                ],

                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => '/vendor/datatables-plugins/buttons/js/dataTables.buttons.js',
                    //'location' => 'vendor/datatables/js/dataTables.bootstrap4.min.js'
                ],
                [
                    'type' => 'css',
                    'asset' => true,
                    'location' => '/vendor/datatables-plugins/buttons/css/buttons.bootstrap4.min.css',
                    //'location' => 'vendor/datatables/css/jquery.dataTables.min.css',
                ],
                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => '/vendor/datatables-plugins/buttons/js/buttons.bootstrap4.min.js',
                    //'location' => 'vendor/datatables/js/dataTables.bootstrap4.min.js'
                ]

            ],
        ],
        'Select2' => [
            'active' => true,
            'files' => [
                [
                    'type' => 'js',
                    'asset' => true,
                    //'location' => '//cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js',
                    //'location' => 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js',
                    'location' => '/vendor/select2/js/select2.min.js',

                ],
                [
                    'type' => 'css',
                    'asset' => true,
                    //'location' => '//cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.css',
                    //'location' => 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css'
                    'location' => '/vendor/select2/css/select2.min.css',
                    //'location' => '/vendor/select2-bootstrap4-theme/select2-bootstrap4.min.css',
                ],
            ],
        ],
        'bootstrap-datepicker' => [
            'active' => true,
            'files' => [
                [
                    'type' => 'js',
                    'asset' => false,
                    'location' => '//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/js/bootstrap-datepicker.min.js',
                ],
                [
                    'type' => 'css',
                    'asset' => false,
                    'location' => '//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker.css',
                ],
            ],
        ],
        'Sweetalert2' => [
            'active' => true,
            'files' => [
                [
                    'type' => 'js',
                    'asset' => true,
                    //'location' => '//cdn.jsdelivr.net/npm/sweetalert2@8',
                    'location' => 'vendor/sweetalert2/sweetalert2.all.min.js'
                ],
                [
                    'type' => 'css',
                    'asset' => true,
                    //'location' => '//cdn.jsdelivr.net/npm/sweetalert2@8',
                    'location' => 'vendor/sweetalert2/sweetalert2.min.css'
                ],
            ],
        ],
        'Pace' => [
            'active' => false,
            'files' => [
                [
                    'type' => 'css',
                    'asset' => false,
                    'location' => '//cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/themes/blue/pace-theme-center-radar.min.css',
                ],
                [
                    'type' => 'js',
                    'asset' => false,
                    'location' => '//cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/pace.min.js',
                ],
            ],
        ],
        'bootstrap-switch' => [
            'active' => true,
            'files' => [
                [
                    'type' => 'css',
                    'asset' => true,
                    'location' => 'vendor/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css',
                ],
                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => 'vendor/bootstrap-switch/js/bootstrap-switch.min.js',
                ],
            ],
        ],
        'fullcalendar' => [
            'active' => true,
            'files' => [
                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => 'vendor/moment/moment.min.js',
                ],
                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => 'vendor/moment/locale/es.js',
                ],
                [
                    'type' => 'css',
                    'asset' => true,
                    'location' => 'vendor/fullcalendar/main.css',
                ],
                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => 'vendor/fullcalendar/main.min.js',
                ],
                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => 'vendor/fullcalendar/locales/es.js',
                ],
            ],
        ],
        'moment' => [
            'active' => true,
            'files' => [
                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => 'vendor/moment/moment.min.js',
                ],
                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => 'vendor/moment/locale/es.js',
                ],
            ],
        ],
        'jsgrid' => [
            'active' => false,
            'files' => [
                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => 'vendor/jsgrid/jsgrid.min.js',
                ],
                [
                    'type' => 'css',
                    'asset' => true,
                    'location' => 'vendor/jsgrid/jsgrid-theme.css',
                ],
            ],
        ],
        'summernote' => [
            'active' => true,
            'files' => [
                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => 'vendor/summernote/summernote-bs4.js'
                ],
                [
                    'type' => 'js',
                    'asset' => true,
                    'location' => 'vendor/summernote/lang/summernote-es-ES.js'
                ],
                [
                    'type' => 'css',
                    'asset' => true,
                    'location' => 'vendor/summernote/summernote-bs4.css'
                ],
            ],
        ],
        'icheck-bootstrap' => [
            'active' => true,
            'files' => [
                [
                    'type' => 'css',
                    'asset' => true,
                    'location' => 'vendor/icheck-bootstrap/icheck-bootstrap.min.css'
                ],
            ],
        ],


    ],

    /*
    |--------------------------------------------------------------------------
    | IFrame
    |--------------------------------------------------------------------------
    |
    | Here we change the IFrame mode configuration. Note these changes will
    | only apply to the view that extends and enable the IFrame mode.
    |
    | For detailed instructions you can look the iframe mode section here:
    | https://github.com/jeroennoten/Laravel-AdminLTE/wiki/IFrame-Mode-Configuration
    |
    */

    'iframe' => [
        'default_tab' => [
            'url' => null,
            'title' => null,
        ],
        'buttons' => [
            'close' => true,
            'close_all' => true,
            'close_all_other' => true,
            'scroll_left' => true,
            'scroll_right' => true,
            'fullscreen' => true,
        ],
        'options' => [
            'loading_screen' => 1000,
            'auto_show_new_tab' => true,
            'use_navbar_items' => true,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Livewire
    |--------------------------------------------------------------------------
    |
    | Here we can enable the Livewire support.
    |
    | For detailed instructions you can look the livewire here:
    | https://github.com/jeroennoten/Laravel-AdminLTE/wiki/Other-Configuration
    |
    */

    'livewire' => false,
];
