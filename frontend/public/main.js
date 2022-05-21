(self["webpackChunkOFGC"] = self["webpackChunkOFGC"] || []).push([["main"],{

/***/ 8255:
/*!*******************************************************!*\
  !*** ./$_lazy_route_resources/ lazy namespace object ***!
  \*******************************************************/
/***/ ((module) => {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 8255;
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 9895);



const routes = [
    {
        path: '',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_views_home_home_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./views/home/home.module */ 842)).then(m => m.HomePageModule)
    },
    {
        path: 'tabs',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_views_projects_project-tabs_tabs_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./views/projects/project-tabs/tabs.module */ 6602)).then(m => m.TabsPageModule)
    },
    {
        path: 'login',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_views_login_login_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./views/login/login.module */ 265)).then(m => m.LoginPageModule)
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forRoot(routes, { preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_2__.PreloadAllModules })
        ],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
    })
], AppRoutingModule);



/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./app.component.html */ 1106);
/* harmony import */ var _app_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component.scss */ 3069);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var laravel_echo_ionic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! laravel-echo-ionic */ 2012);
/* harmony import */ var _services_modal_connection_modal_connection_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/modal-connection/modal-connection.service */ 1367);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 9122);
/* harmony import */ var _services_projects_projects_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/projects/projects.service */ 1048);
/* harmony import */ var _services_playlists_playlists_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/playlists/playlists.service */ 8871);
/* harmony import */ var _services_shedule_shedule_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/shedule/shedule.service */ 5068);
/* harmony import */ var _services_address_address_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/address/address.service */ 7172);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/storage */ 8605);













let AppComponent = class AppComponent {
    constructor(modalConnectionService, alertController, projectsService, sheduleService, playlistService, addressServivce, storage, toastController) {
        this.modalConnectionService = modalConnectionService;
        this.alertController = alertController;
        this.projectsService = projectsService;
        this.sheduleService = sheduleService;
        this.playlistService = playlistService;
        this.addressServivce = addressServivce;
        this.storage = storage;
        this.toastController = toastController;
    }
    ngAfterViewInit() {
        this.updateData();
        this.backendDownAlert();
        this.clientOfflineAlert();
        this.doConnectionWebSocket();
    }
    backendDownAlert() {
        this.modalConnectionService.requestIntercepted.subscribe(backendDown => {
            if (backendDown) {
                this.presentToastWithOptions("¡Oops!", "Server caído", "danger", "information-circle");
                this.isOnline = false;
                this.dismissToast = false;
            }
            else {
                if (this.isOnline == false) {
                    this.dismissToast = true;
                    this.presentToastWithOptions("¡Solucionado!", "Conexión resuelta", "success", "checkmark-outline");
                }
            }
        });
    }
    clientOfflineAlert() {
        this.modalConnectionService.appIsOnline$.subscribe(online => {
            if (!online) {
                this.presentToastWithOptions("Atencion!", "No tienes conexion", "warning", "warning-outline");
                this.isOnline = false;
                this.dismissToast = false;
            }
            else {
                if (this.isOnline == false) {
                    this.dismissToast = true;
                    this.presentToastWithOptions("Hurra!", "Vuelves a tener conexion", "success", "warning-outline");
                }
            }
        });
    }
    doConnectionWebSocket() {
        const echo = new laravel_echo_ionic__WEBPACK_IMPORTED_MODULE_2__.Echo({
            broadcaster: 'pusher',
            key: 'local',
            wsHost: 'localhost',
            wsPort: 6001,
            forceTLS: false,
            disableStats: true
        });
        // Muestra una alerta y actualiza los datos
        const channel = echo.channel('channel');
        channel.listen('Alert', (data) => {
            this.notification(data);
            this.updateData();
        });
    }
    notification(message) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Se han realizado cambios',
                message: message,
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
    updateData() {
        this.projectsService.getProjects().subscribe((p) => {
            this.storage.set("projects", JSON.stringify(p));
        });
        this.addressServivce.getAddresses().subscribe((p) => {
            this.storage.set("address", JSON.stringify(p));
        });
        this.playlistService.getPlaylists().subscribe((p) => {
            this.storage.set("playlist", JSON.stringify(p));
        });
        this.sheduleService.getShedules().subscribe((p) => {
            this.storage.set("shedule", JSON.stringify(p));
        });
    }
    // Creación de los mensajes cuando backend caído o no hay conexión
    presentToastWithOptions(header, message, color, icon) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            // Elimina el mensaje anterior si lo hubiera
            try {
                this.toast.dismiss();
            }
            catch (e) { }
            this.toast = yield this.toastController.create({
                header: header,
                message: message,
                color: color,
                icon: icon,
                position: 'bottom',
            });
            yield this.toast.present();
            // El mensaje se mantiene unos segundos cuando vuelve a haber conexión
            if (this.dismissToast == true) {
                setTimeout(() => {
                    this.toast.dismiss();
                    this.isOnline = true;
                }, 8000);
            }
        });
    }
};
AppComponent.ctorParameters = () => [
    { type: _services_modal_connection_modal_connection_service__WEBPACK_IMPORTED_MODULE_3__.ModalConnectionService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.AlertController },
    { type: _services_projects_projects_service__WEBPACK_IMPORTED_MODULE_4__.ProjectsService },
    { type: _services_shedule_shedule_service__WEBPACK_IMPORTED_MODULE_6__.SheduleService },
    { type: _services_playlists_playlists_service__WEBPACK_IMPORTED_MODULE_5__.PlaylistsService },
    { type: _services_address_address_service__WEBPACK_IMPORTED_MODULE_7__.AddressService },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_10__.Storage },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ToastController }
];
AppComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Component)({
        selector: 'app-root',
        template: _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_app_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], AppComponent);



/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 9075);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 9122);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 1841);
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! angularx-social-login */ 2707);
/* harmony import */ var _interceptors_interceptor_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interceptors/interceptor.service */ 2309);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/storage */ 8605);
/* harmony import */ var _services_modal_connection_modal_connection_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/modal-connection/modal-connection.service */ 1367);












let AppModule = class AppModule {
};
AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent],
        entryComponents: [],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.HammerModule,
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule.forRoot(),
            _ionic_storage__WEBPACK_IMPORTED_MODULE_8__.IonicStorageModule.forRoot(),
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule,
            angularx_social_login__WEBPACK_IMPORTED_MODULE_10__.SocialLoginModule,
        ],
        providers: [{
                provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HTTP_INTERCEPTORS,
                useClass: _interceptors_interceptor_service__WEBPACK_IMPORTED_MODULE_2__.InterceptorService,
                multi: true,
                deps: [_ionic_storage__WEBPACK_IMPORTED_MODULE_8__.Storage, _services_modal_connection_modal_connection_service__WEBPACK_IMPORTED_MODULE_3__.ModalConnectionService, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ToastController]
            }, { provide: _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouteReuseStrategy, useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicRouteStrategy }, {
                provide: 'SocialAuthServiceConfig',
                useValue: {
                    autoLogin: false,
                    providers: [
                        {
                            id: angularx_social_login__WEBPACK_IMPORTED_MODULE_10__.GoogleLoginProvider.PROVIDER_ID,
                            provider: new angularx_social_login__WEBPACK_IMPORTED_MODULE_10__.GoogleLoginProvider('496549363577-goftinjkirl8qe42j4g27dv2287qmh14.apps.googleusercontent.com')
                        },
                    ]
                },
            },
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent],
    })
], AppModule);



/***/ }),

/***/ 2309:
/*!*****************************************************!*\
  !*** ./src/app/interceptors/interceptor.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InterceptorService": () => (/* binding */ InterceptorService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 1841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 9765);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 9412);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 205);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/storage */ 8605);
/* harmony import */ var rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/internal/operators/switchMap */ 2479);
/* harmony import */ var rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 8002);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 5304);
/* harmony import */ var _services_modal_connection_modal_connection_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/modal-connection/modal-connection.service */ 1367);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 9122);









const TOKEN_KEY = 'access_token';
let InterceptorService = class InterceptorService {
    constructor(storage, modalConnectionService, toastController) {
        this.storage = storage;
        this.modalConnectionService = modalConnectionService;
        this.toastController = toastController;
        this.backendStatusChange = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    }
    intercept(req, next) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storage.ready().then(() => this.storage.get('access_token'))}`
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.from)(this.storage.get(TOKEN_KEY))
            .pipe((0,rxjs_internal_operators_switchMap__WEBPACK_IMPORTED_MODULE_4__.switchMap)(token => {
            if (token) {
                req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
            }
            if (!req.headers.has('Content-Type')) {
                req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
            }
            return next.handle(req).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((event) => {
                if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse) {
                }
                if (this.isOnline == false) {
                    this.dismissToast = true;
                    this.presentToastWithOptions("¡Solucionado!", "Conexión resuelta", "success", "checkmark-outline");
                    // this.modalConnectionService.getInterceptedSource().next(false);
                }
                return event;
            }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.catchError)(this.manageError.bind(this)));
        }));
    }
    manageError(error) {
        let errorJSON = error.error;
        let errorMessage = "";
        Object.values(errorJSON).forEach(element => errorMessage += element + "\n");
        // console.log(errorMessage, errorJSON);
        if (errorMessage == "true\n") {
            // this.modalConnectionService.getInterceptedSource().next(true);
            this.presentToastWithOptions("¡Oops!", "Server caído", "danger", "information-circle");
            this.isOnline = false;
            this.dismissToast = false;
        }
        else {
            this.presentToastWithOptions("¡Oops!", errorMessage, "danger", "information-circle");
        }
        console.log(errorMessage);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.throwError)("Error " + errorMessage + "\n" + errorJSON);
    }
    // Creación de los mensajes cuando backend caído o no hay conexión
    presentToastWithOptions(header, message, color, icon) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            // Elimina el mensaje anterior si lo hubiera
            try {
                this.toast.dismiss();
            }
            catch (e) { }
            this.toast = yield this.toastController.create({
                header: header,
                message: message,
                color: color,
                icon: icon,
                position: 'bottom',
            });
            yield this.toast.present();
            // El mensaje se mantiene unos segundos cuando vuelve a haber conexión
            if (this.dismissToast == true) {
                setTimeout(() => {
                    this.toast.dismiss();
                    // this.isOnline = true;
                }, 8000);
            }
        });
    }
};
InterceptorService.ctorParameters = () => [
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_9__.Storage },
    { type: _services_modal_connection_modal_connection_service__WEBPACK_IMPORTED_MODULE_0__.ModalConnectionService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ToastController }
];
InterceptorService = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Injectable)({
        providedIn: 'root'
    })
], InterceptorService);



/***/ }),

/***/ 7172:
/*!*****************************************************!*\
  !*** ./src/app/services/address/address.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddressService": () => (/* binding */ AddressService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ 1841);



let AddressService = class AddressService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.endpoint = "http://localhost:8000/api/mobile/getAddress";
    }
    getAddresses() {
        return this.httpClient.get(this.endpoint);
    }
};
AddressService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient }
];
AddressService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({
        providedIn: 'root'
    })
], AddressService);



/***/ }),

/***/ 7635:
/*!*****************************************************************!*\
  !*** ./src/app/services/local-storage/local-storage.service.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalStorageService": () => (/* binding */ LocalStorageService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/storage */ 8605);



let LocalStorageService = class LocalStorageService {
    constructor(storage) {
        this.storage = storage;
        this.token = null;
        this.httpOptions = null;
    }
    getToken() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            this.token = yield this.storage.get("access_token");
            return this.token;
        });
    }
    setToken(token) {
        return this.token = token;
    }
};
LocalStorageService.ctorParameters = () => [
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_1__.Storage }
];
LocalStorageService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({
        providedIn: 'root'
    })
], LocalStorageService);



/***/ }),

/***/ 1367:
/*!***********************************************************************!*\
  !*** ./src/app/services/modal-connection/modal-connection.service.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalConnectionService": () => (/* binding */ ModalConnectionService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 1841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 9765);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 6682);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 5917);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 2759);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 8002);
/* harmony import */ var _projects_projects_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../projects/projects.service */ 1048);






let ModalConnectionService = class ModalConnectionService {
    constructor(httpClient, projectsService) {
        this.httpClient = httpClient;
        this.projectsService = projectsService;
        this.string = "xd";
        this.requestInterceptedSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
        this.requestIntercepted = this.requestInterceptedSource.asObservable();
        // backendDownObs: Subject<boolean> = new Subject<boolean>();
        this.endpoint = "http://localhost:8000/api/mobile/checkBackendStatus";
        this.initConnectivityMonitoring();
        this.backendStatus();
    }
    initConnectivityMonitoring() {
        if (!window || !navigator || !('onLine' in navigator))
            return;
        this.appIsOnline$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.merge)((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(null), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.fromEvent)(window, 'online'), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.fromEvent)(window, 'offline')).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(() => navigator.onLine));
    }
    backendStatus() {
        var that = this;
        // return this.httpClient.get(this.endpoint);
        setInterval(function () {
            that.httpClient.get(that.endpoint).subscribe();
        }, 10000);
    }
    getInterceptedSource() {
        return this.requestInterceptedSource;
    }
};
ModalConnectionService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient },
    { type: _projects_projects_service__WEBPACK_IMPORTED_MODULE_0__.ProjectsService }
];
ModalConnectionService = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Injectable)({
        providedIn: 'root'
    })
], ModalConnectionService);



/***/ }),

/***/ 8871:
/*!*********************************************************!*\
  !*** ./src/app/services/playlists/playlists.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaylistsService": () => (/* binding */ PlaylistsService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ 1841);



let PlaylistsService = class PlaylistsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.endpoint = "http://localhost:8000/api/mobile/getPlaylist";
    }
    getPlaylists() {
        return this.httpClient.get(this.endpoint);
    }
};
PlaylistsService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient }
];
PlaylistsService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({
        providedIn: 'root'
    })
], PlaylistsService);



/***/ }),

/***/ 1048:
/*!*******************************************************!*\
  !*** ./src/app/services/projects/projects.service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectsService": () => (/* binding */ ProjectsService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 1841);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 5917);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ 8605);
/* harmony import */ var _local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../local-storage/local-storage.service */ 7635);






let ProjectsService = class ProjectsService {
    constructor(httpClient, storage, localStorageService) {
        this.httpClient = httpClient;
        this.storage = storage;
        this.localStorageService = localStorageService;
        this.endpoint = "http://localhost:8000/api/mobile/getProjects";
    }
    getProjects() {
        return this.httpClient.get(this.endpoint);
    }
    handleError(operation = 'operation', result) {
        return (error) => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(result);
        };
    }
};
ProjectsService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_3__.Storage },
    { type: _local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_0__.LocalStorageService }
];
ProjectsService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], ProjectsService);



/***/ }),

/***/ 5068:
/*!*****************************************************!*\
  !*** ./src/app/services/shedule/shedule.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SheduleService": () => (/* binding */ SheduleService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ 1841);



let SheduleService = class SheduleService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.endpoint = "http://localhost:8000/api/mobile/getShedule";
    }
    getShedules() {
        return this.httpClient.get(this.endpoint);
    }
};
SheduleService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient }
];
SheduleService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({
        providedIn: 'root'
    })
], SheduleService);



/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ 4608);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hammerjs */ 1524);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_2__);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.enableProdMode)();
}
(0,_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_4__.platformBrowserDynamic)().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.log(err));


/***/ }),

/***/ 863:
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ion-accordion_2.entry.js": [
		8359,
		"common",
		"node_modules_ionic_core_dist_esm_ion-accordion_2_entry_js"
	],
	"./ion-action-sheet.entry.js": [
		7321,
		"common",
		"node_modules_ionic_core_dist_esm_ion-action-sheet_entry_js"
	],
	"./ion-alert.entry.js": [
		6108,
		"common",
		"node_modules_ionic_core_dist_esm_ion-alert_entry_js"
	],
	"./ion-app_8.entry.js": [
		1489,
		"common",
		"node_modules_ionic_core_dist_esm_ion-app_8_entry_js"
	],
	"./ion-avatar_3.entry.js": [
		305,
		"common",
		"node_modules_ionic_core_dist_esm_ion-avatar_3_entry_js"
	],
	"./ion-back-button.entry.js": [
		5830,
		"common",
		"node_modules_ionic_core_dist_esm_ion-back-button_entry_js"
	],
	"./ion-backdrop.entry.js": [
		7757,
		"node_modules_ionic_core_dist_esm_ion-backdrop_entry_js"
	],
	"./ion-breadcrumb_2.entry.js": [
		4355,
		"common",
		"node_modules_ionic_core_dist_esm_ion-breadcrumb_2_entry_js"
	],
	"./ion-button_2.entry.js": [
		392,
		"common",
		"node_modules_ionic_core_dist_esm_ion-button_2_entry_js"
	],
	"./ion-card_5.entry.js": [
		6911,
		"common",
		"node_modules_ionic_core_dist_esm_ion-card_5_entry_js"
	],
	"./ion-checkbox.entry.js": [
		937,
		"common",
		"node_modules_ionic_core_dist_esm_ion-checkbox_entry_js"
	],
	"./ion-chip.entry.js": [
		8695,
		"common",
		"node_modules_ionic_core_dist_esm_ion-chip_entry_js"
	],
	"./ion-col_3.entry.js": [
		6034,
		"node_modules_ionic_core_dist_esm_ion-col_3_entry_js"
	],
	"./ion-datetime_3.entry.js": [
		8837,
		"common",
		"node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js"
	],
	"./ion-fab_3.entry.js": [
		4195,
		"common",
		"node_modules_ionic_core_dist_esm_ion-fab_3_entry_js"
	],
	"./ion-img.entry.js": [
		1709,
		"node_modules_ionic_core_dist_esm_ion-img_entry_js"
	],
	"./ion-infinite-scroll_2.entry.js": [
		3087,
		"node_modules_ionic_core_dist_esm_ion-infinite-scroll_2_entry_js"
	],
	"./ion-input.entry.js": [
		4513,
		"common",
		"node_modules_ionic_core_dist_esm_ion-input_entry_js"
	],
	"./ion-item-option_3.entry.js": [
		8056,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item-option_3_entry_js"
	],
	"./ion-item_8.entry.js": [
		862,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item_8_entry_js"
	],
	"./ion-loading.entry.js": [
		7509,
		"common",
		"node_modules_ionic_core_dist_esm_ion-loading_entry_js"
	],
	"./ion-menu_3.entry.js": [
		6272,
		"common",
		"node_modules_ionic_core_dist_esm_ion-menu_3_entry_js"
	],
	"./ion-modal.entry.js": [
		1855,
		"common",
		"node_modules_ionic_core_dist_esm_ion-modal_entry_js"
	],
	"./ion-nav_2.entry.js": [
		8708,
		"common",
		"node_modules_ionic_core_dist_esm_ion-nav_2_entry_js"
	],
	"./ion-picker-column-internal.entry.js": [
		1349,
		"common",
		"node_modules_ionic_core_dist_esm_ion-picker-column-internal_entry_js"
	],
	"./ion-picker-internal.entry.js": [
		7915,
		"node_modules_ionic_core_dist_esm_ion-picker-internal_entry_js"
	],
	"./ion-popover.entry.js": [
		3527,
		"common",
		"node_modules_ionic_core_dist_esm_ion-popover_entry_js"
	],
	"./ion-progress-bar.entry.js": [
		4694,
		"common",
		"node_modules_ionic_core_dist_esm_ion-progress-bar_entry_js"
	],
	"./ion-radio_2.entry.js": [
		9222,
		"common",
		"node_modules_ionic_core_dist_esm_ion-radio_2_entry_js"
	],
	"./ion-range.entry.js": [
		5277,
		"common",
		"node_modules_ionic_core_dist_esm_ion-range_entry_js"
	],
	"./ion-refresher_2.entry.js": [
		9921,
		"common",
		"node_modules_ionic_core_dist_esm_ion-refresher_2_entry_js"
	],
	"./ion-reorder_2.entry.js": [
		3122,
		"common",
		"node_modules_ionic_core_dist_esm_ion-reorder_2_entry_js"
	],
	"./ion-ripple-effect.entry.js": [
		1602,
		"node_modules_ionic_core_dist_esm_ion-ripple-effect_entry_js"
	],
	"./ion-route_4.entry.js": [
		5174,
		"common",
		"node_modules_ionic_core_dist_esm_ion-route_4_entry_js"
	],
	"./ion-searchbar.entry.js": [
		7895,
		"common",
		"node_modules_ionic_core_dist_esm_ion-searchbar_entry_js"
	],
	"./ion-segment_2.entry.js": [
		6164,
		"common",
		"node_modules_ionic_core_dist_esm_ion-segment_2_entry_js"
	],
	"./ion-select_3.entry.js": [
		592,
		"common",
		"node_modules_ionic_core_dist_esm_ion-select_3_entry_js"
	],
	"./ion-slide_2.entry.js": [
		7162,
		"node_modules_ionic_core_dist_esm_ion-slide_2_entry_js"
	],
	"./ion-spinner.entry.js": [
		1374,
		"common",
		"node_modules_ionic_core_dist_esm_ion-spinner_entry_js"
	],
	"./ion-split-pane.entry.js": [
		7896,
		"node_modules_ionic_core_dist_esm_ion-split-pane_entry_js"
	],
	"./ion-tab-bar_2.entry.js": [
		5043,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab-bar_2_entry_js"
	],
	"./ion-tab_2.entry.js": [
		7802,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab_2_entry_js"
	],
	"./ion-text.entry.js": [
		9072,
		"common",
		"node_modules_ionic_core_dist_esm_ion-text_entry_js"
	],
	"./ion-textarea.entry.js": [
		2191,
		"common",
		"node_modules_ionic_core_dist_esm_ion-textarea_entry_js"
	],
	"./ion-toast.entry.js": [
		801,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toast_entry_js"
	],
	"./ion-toggle.entry.js": [
		7110,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toggle_entry_js"
	],
	"./ion-virtual-scroll.entry.js": [
		431,
		"node_modules_ionic_core_dist_esm_ion-virtual-scroll_entry_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 863;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 3069:
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("ion-content {\n  --overflow: hidden;\n}\n\nion-item {\n  float: left;\n  width: 100%;\n}\n\nion-item h2 {\n  margin-left: 10px;\n  font-family: \"Outfit\", sans-serif;\n  font-weight: 500;\n  font-size: 1.8em;\n}\n\n#home-icon {\n  font-size: 3em;\n  margin-left: 5px;\n  margin-top: 5px;\n}\n\n#projects-icon {\n  font-size: 3em;\n  margin-left: 5px;\n  margin-top: 5px;\n}\n\n#login-icon {\n  font-size: 2.6em;\n  margin-left: 9px;\n  margin-top: 5px;\n}\n\n#support-icon {\n  font-size: 2.6em;\n  margin-left: 9px;\n  margin-top: 5px;\n}\n\n#configuration-icon {\n  font-size: 2.6em;\n  margin-left: 9px;\n  margin-top: 5px;\n}\n\n#connection-alert {\n  position: fixed;\n  bottom: 0;\n  font-size: 1.2em;\n  width: 100%;\n  text-align: center;\n  color: white;\n  height: 70px;\n  vertical-align: middle;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0FBQ0o7O0FBRUE7RUFDSSxXQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUFJO0VBQ0ksaUJBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFFUjs7QUFFQTtFQUNJLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFDSjs7QUFFQTtFQUNJLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFDSjs7QUFFQTtFQUNJLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBQ0o7O0FBRUE7RUFDSSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQUNKOztBQUVBO0VBQ0ksZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFDSjs7QUFFQTtFQUNJLGVBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLHNCQUFBO0FBQ0oiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnQge1xyXG4gICAgLS1vdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG5pb24taXRlbSB7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaDIge1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG4gICAgICAgIGZvbnQtZmFtaWx5OiAnT3V0Zml0Jywgc2Fucy1zZXJpZjtcclxuICAgICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMS44ZW07XHJcbiAgICB9XHJcbn1cclxuXHJcbiNob21lLWljb24ge1xyXG4gICAgZm9udC1zaXplOiAzZW07XHJcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gICAgbWFyZ2luLXRvcDogNXB4O1xyXG59XHJcblxyXG4jcHJvamVjdHMtaWNvbiB7XHJcbiAgICBmb250LXNpemU6IDNlbTtcclxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgICBtYXJnaW4tdG9wOiA1cHg7XHJcbn1cclxuXHJcbiNsb2dpbi1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMi42ZW07XHJcbiAgICBtYXJnaW4tbGVmdDogOXB4O1xyXG4gICAgbWFyZ2luLXRvcDogNXB4O1xyXG59XHJcblxyXG4jc3VwcG9ydC1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMi42ZW07XHJcbiAgICBtYXJnaW4tbGVmdDogOXB4O1xyXG4gICAgbWFyZ2luLXRvcDogNXB4O1xyXG59XHJcblxyXG4jY29uZmlndXJhdGlvbi1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMi42ZW07XHJcbiAgICBtYXJnaW4tbGVmdDogOXB4O1xyXG4gICAgbWFyZ2luLXRvcDogNXB4O1xyXG59XHJcblxyXG4jY29ubmVjdGlvbi1hbGVydCB7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICBmb250LXNpemU6IDEuMmVtO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBoZWlnaHQ6IDcwcHg7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG59Il19 */");

/***/ }),

/***/ 1106:
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-app>\r\n\r\n    <ion-router-outlet id=\"main\"></ion-router-outlet>\r\n</ion-app>");

/***/ }),

/***/ 7020:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map