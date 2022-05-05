(self["webpackChunkOFGC"] = self["webpackChunkOFGC"] || []).push([["src_app_views_projects_project-tabs_instruments_instruments_module_ts"],{

/***/ 3127:
/*!***************************************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/instruments/instruments-routing.module.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InstrumentsPageRoutingModule": () => (/* binding */ InstrumentsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _instruments_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instruments.page */ 8602);




const routes = [
    {
        path: '',
        component: _instruments_page__WEBPACK_IMPORTED_MODULE_0__.InstrumentsPage
    }
];
let InstrumentsPageRoutingModule = class InstrumentsPageRoutingModule {
};
InstrumentsPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], InstrumentsPageRoutingModule);



/***/ }),

/***/ 3944:
/*!*******************************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/instruments/instruments.module.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InstrumentsPageModule": () => (/* binding */ InstrumentsPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 9122);
/* harmony import */ var _instruments_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instruments-routing.module */ 3127);
/* harmony import */ var _instruments_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instruments.page */ 8602);







let InstrumentsPageModule = class InstrumentsPageModule {
};
InstrumentsPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _instruments_routing_module__WEBPACK_IMPORTED_MODULE_0__.InstrumentsPageRoutingModule
        ],
        declarations: [_instruments_page__WEBPACK_IMPORTED_MODULE_1__.InstrumentsPage]
    })
], InstrumentsPageModule);



/***/ }),

/***/ 8602:
/*!*****************************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/instruments/instruments.page.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InstrumentsPage": () => (/* binding */ InstrumentsPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_instruments_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./instruments.page.html */ 91);
/* harmony import */ var _instruments_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instruments.page.scss */ 5362);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 9122);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ 8605);
/* harmony import */ var laravel_echo_ionic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! laravel-echo-ionic */ 2012);
/* harmony import */ var src_app_services_playlists_playlists_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/playlists/playlists.service */ 8871);









let InstrumentsPage = class InstrumentsPage {
    constructor(playlistService, activatedRoute, alertController, storage) {
        this.playlistService = playlistService;
        this.activatedRoute = activatedRoute;
        this.alertController = alertController;
        this.storage = storage;
        this.playlistArray = [];
        this.project_id = this.activatedRoute.snapshot.paramMap.get('id');
        this.showPercussion = false;
        this.showVoice = false;
        this.showKeyboard = false;
        this.noPercussion = true;
        this.noVoice = true;
        this.noKeyboard = true;
        this.perArray = [];
        this.keyArray = [];
        this.voiArray = [];
    }
    ngOnInit() {
        this.loadInfo();
    }
    loadInfo() {
        this.storage.get("playlist").then(data => {
            if (data) {
                var array = JSON.parse(data);
                array.filter((playlist) => {
                    if (playlist.project_id == this.project_id) {
                        if (playlist.perplaylists != null || playlist.voiplaylists != null || playlist.keyplaylists != null) {
                            this.playlistArray.push(playlist);
                        }
                    }
                    ;
                });
                for (let playlist of this.playlistArray) {
                    for (let perplaylist in playlist.perplaylists) {
                        if (playlist.perplaylists[perplaylist].instrumentName != null || playlist.perplaylists[perplaylist].instrumentName2 != null) {
                            this.noPercussion = false;
                            if (!this.perArray.includes(playlist.perplaylists[perplaylist].instrumentName) || !this.perArray.includes(playlist.perplaylists[perplaylist].instrumentName2)) {
                                this.perArray.push(playlist.perplaylists[perplaylist]);
                            }
                        }
                    }
                    for (let keyplaylist in playlist.keyplaylists) {
                        if (playlist.keyplaylists[keyplaylist].instrumentName != null || playlist.keyplaylists[keyplaylist].instrumentName2 != null) {
                            this.noKeyboard = false;
                            if (!this.perArray.includes(playlist.keyplaylists[keyplaylist].instrumentName) || !this.perArray.includes(playlist.keyplaylists[keyplaylist].instrumentName2)) {
                                this.keyArray.push(playlist.keyplaylists[keyplaylist]);
                                console.log(playlist.keyplaylists[keyplaylist]);
                            }
                        }
                    }
                    for (let voiplaylist in playlist.voiplaylists) {
                        if (playlist.voiplaylists[voiplaylist].instrumentName != null || playlist.voiplaylists[voiplaylist].instrumentName2 != null) {
                            this.noVoice = false;
                            if (!this.voiArray.includes(playlist.voiplaylists[voiplaylist].instrumentName) || !this.voiArray.includes(playlist.voiplaylists[voiplaylist].instrumentName2)) {
                                this.voiArray.push(playlist.voiplaylists[voiplaylist]);
                            }
                        }
                    }
                }
            }
            else {
                this.updateData();
            }
        });
    }
    doConnection() {
        const echo = new laravel_echo_ionic__WEBPACK_IMPORTED_MODULE_2__.Echo({
            broadcaster: 'pusher',
            key: 'local',
            wsHost: 'localhost',
            wsPort: 6001,
            forceTLS: false,
            disableStats: true
        });
        const channel = echo.channel('channel');
        channel.listen('Alert', (data) => {
            console.log(JSON.stringify(data));
            this.notification(data);
            this.updateData();
        });
    }
    updateData() {
        this.playlistService.getPlaylists().subscribe((p) => {
            this.storage.set("playlist", JSON.stringify(p));
        });
    }
    notification(message) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Se han realizado cambios',
                message: message,
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
};
InstrumentsPage.ctorParameters = () => [
    { type: src_app_services_playlists_playlists_service__WEBPACK_IMPORTED_MODULE_3__.PlaylistsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.AlertController },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_7__.Storage }
];
InstrumentsPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-instruments',
        template: _raw_loader_instruments_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_instruments_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], InstrumentsPage);



/***/ }),

/***/ 5362:
/*!*******************************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/instruments/instruments.page.scss ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("ion-content {\n  --offset-bottom: auto!important;\n  --overflow: hidden;\n  overflow: auto;\n}\nion-content::-webkit-scrollbar {\n  display: none;\n}\nion-card {\n  border-radius: 0px;\n  background-color: #ffffff;\n  border: 1px solid #006aab;\n  text-align: center;\n}\n#separation-title {\n  background-color: #006aab;\n}\n#dropdown-button {\n  border-top: 1px solid #c9c8c8;\n  text-align: center;\n  font-size: 2em;\n  background-color: #ececec;\n}\n.border {\n  border: 1px solid black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc3RydW1lbnRzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLCtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBQ0o7QUFBSTtFQUNJLGFBQUE7QUFFUjtBQUVBO0VBQ0ksa0JBQUE7RUFDQSx5QkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7QUFDSjtBQUVBO0VBQ0kseUJBQUE7QUFDSjtBQUVBO0VBQ0ksNkJBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBQUNKO0FBRUE7RUFDSSx1QkFBQTtBQUNKIiwiZmlsZSI6Imluc3RydW1lbnRzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jb250ZW50IHtcclxuICAgIC0tb2Zmc2V0LWJvdHRvbTogYXV0byFpbXBvcnRhbnQ7XHJcbiAgICAtLW92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgfVxyXG59XHJcblxyXG5pb24tY2FyZCB7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwNmFhYjtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuI3NlcGFyYXRpb24tdGl0bGUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwNmFhYjtcclxufVxyXG5cclxuI2Ryb3Bkb3duLWJ1dHRvbiB7XHJcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiKDIwMSwgMjAwLCAyMDApO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC1zaXplOiAyZW07XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjM2LCAyMzYsIDIzNik7XHJcbn1cclxuXHJcbi5ib3JkZXIge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XHJcbn0iXX0= */");

/***/ }),

/***/ 91:
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/projects/project-tabs/instruments/instruments.page.html ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content has-header>\r\n\r\n\r\n\r\n\r\n    <div *ngIf=\"noPercussion==false\" class=\"ion-text-center border ion-margin-top\">\r\n        <h2 (click)=\"showPercussion = false\">PERCUSIÓN</h2>\r\n\r\n        <div id=\"dropdown-button\" (click)=\"showPercussion=true\">\r\n            <ion-icon *ngIf=\" showPercussion==false \" name=\"caret-down-outline\"></ion-icon>\r\n        </div>\r\n    </div>\r\n    <div id=\"container\" *ngFor=\"let perplaylist of perArray\">\r\n\r\n        <ion-card *ngIf=\"showPercussion==true \">\r\n            <ion-card-header>\r\n                <h2>{{perplaylist.instrumentName}}</h2>\r\n                <h2>{{perplaylist.instrumentName2}}</h2>\r\n\r\n            </ion-card-header>\r\n\r\n\r\n        </ion-card>\r\n\r\n\r\n\r\n    </div>\r\n    <div id=\"dropdown-button\" (click)=\"showPercussion=false\">\r\n        <ion-icon *ngIf=\"showPercussion==true \" name=\"caret-up-outline\"></ion-icon>\r\n    </div>\r\n\r\n    <div *ngIf=\"noKeyboard==false\" class=\"ion-text-center border ion-margin-top\">\r\n        <h2 (click)=\"showKeyboard=false\">TECLADO</h2>\r\n\r\n        <div id=\"dropdown-button\" (click)=\"showKeyboard=true\">\r\n            <ion-icon *ngIf=\"showKeyboard==false \" name=\"caret-down-outline\"></ion-icon>\r\n        </div>\r\n    </div>\r\n    <div id=\"container\" *ngFor=\"let keyplaylist of keyArray\">\r\n\r\n        <ion-card *ngIf=\"showKeyboard==true\">\r\n            <ion-card-header>\r\n                <h2>{{keyplaylist.instrumentName}}</h2>\r\n                <h2>{{keyplaylist.instrumentName2}}</h2>\r\n\r\n\r\n            </ion-card-header>\r\n\r\n\r\n        </ion-card>\r\n\r\n\r\n    </div>\r\n    <div id=\"dropdown-button\" (click)=\"showKeyboard=false\">\r\n        <ion-icon *ngIf=\"showKeyboard==true \" name=\"caret-up-outline\"></ion-icon>\r\n    </div>\r\n\r\n\r\n\r\n    <div *ngIf=\"noVoice==false\" class=\"ion-text-center border ion-margin-top\">\r\n        <h2 (click)=\"showVoice=false\">VOCES</h2>\r\n\r\n        <div id=\"dropdown-button\" (click)=\"showVoice=true\">\r\n            <ion-icon *ngIf=\"showVoice==false \" name=\"caret-down-outline\"></ion-icon>\r\n        </div>\r\n    </div>\r\n    <div id=\"container\" *ngFor=\"let voiplaylist of voiArray\">\r\n\r\n        <ion-card *ngIf=\"showVoice==true \">\r\n            <ion-card-header>\r\n                <h2>{{voiplaylist.instrumentName}}\r\n                </h2>\r\n                <h2>{{voiplaylist.instrumentName2}}\r\n                </h2>\r\n\r\n\r\n            </ion-card-header>\r\n\r\n\r\n        </ion-card>\r\n\r\n\r\n    </div>\r\n    <div id=\"dropdown-button\" (click)=\"showVoice=false\">\r\n        <ion-icon *ngIf=\"showVoice==true \" name=\"caret-up-outline\"></ion-icon>\r\n    </div>\r\n\r\n\r\n\r\n\r\n    <h1 class=\"ion-text-center \" *ngIf=\"playlistArray.length==0 \">\r\n        No hay instrumentos extras\r\n    </h1>\r\n\r\n\r\n</ion-content>");

/***/ })

}]);
//# sourceMappingURL=src_app_views_projects_project-tabs_instruments_instruments_module_ts.js.map