(self["webpackChunkOFGC"] = self["webpackChunkOFGC"] || []).push([["src_app_views_projects_project-tabs_works_works_module_ts"],{

/***/ 1979:
/*!***************************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/works/works-routing.module.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorksPageRoutingModule": () => (/* binding */ WorksPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _works_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./works.page */ 88);




const routes = [
    {
        path: '',
        component: _works_page__WEBPACK_IMPORTED_MODULE_0__.WorksPage
    }
];
let WorksPageRoutingModule = class WorksPageRoutingModule {
};
WorksPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], WorksPageRoutingModule);



/***/ }),

/***/ 6521:
/*!*******************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/works/works.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorksPageModule": () => (/* binding */ WorksPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 9122);
/* harmony import */ var _works_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./works-routing.module */ 1979);
/* harmony import */ var _works_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./works.page */ 88);







let WorksPageModule = class WorksPageModule {
};
WorksPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _works_routing_module__WEBPACK_IMPORTED_MODULE_0__.WorksPageRoutingModule
        ],
        declarations: [_works_page__WEBPACK_IMPORTED_MODULE_1__.WorksPage]
    })
], WorksPageModule);



/***/ }),

/***/ 88:
/*!*****************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/works/works.page.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorksPage": () => (/* binding */ WorksPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_works_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./works.page.html */ 3357);
/* harmony import */ var _works_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./works.page.scss */ 2393);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 9122);
/* harmony import */ var src_app_services_playlists_playlists_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/playlists/playlists.service */ 8871);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ 8605);
/* harmony import */ var laravel_echo_ionic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! laravel-echo-ionic */ 2012);









let WorksPage = class WorksPage {
    constructor(playlistService, activatedRoute, alertController, storage) {
        this.playlistService = playlistService;
        this.activatedRoute = activatedRoute;
        this.alertController = alertController;
        this.storage = storage;
        this.playlistArray = [];
        this.project_id = this.activatedRoute.snapshot.paramMap.get('id');
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
                        console.log(playlist);
                        this.playlistArray.push(playlist);
                        this.playlistArray.sort((a, b) => a.playlistOrder - b.playlistOrder);
                    }
                    ;
                });
            }
            else {
                this.updateData();
            }
        });
    }
    doConnection() {
        const echo = new laravel_echo_ionic__WEBPACK_IMPORTED_MODULE_3__.Echo({
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
            this.playlistArray = p;
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
WorksPage.ctorParameters = () => [
    { type: src_app_services_playlists_playlists_service__WEBPACK_IMPORTED_MODULE_2__.PlaylistsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.AlertController },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_7__.Storage }
];
WorksPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-works',
        template: _raw_loader_works_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_works_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], WorksPage);



/***/ }),

/***/ 2393:
/*!*******************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/works/works.page.scss ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("ion-content {\n  --offset-bottom: auto!important;\n  --overflow: hidden;\n  overflow: auto;\n  border-width: 0px 1px 1px 1px;\n}\nion-content::-webkit-scrollbar {\n  display: none;\n}\nion-header {\n  height: 65px;\n}\nion-card {\n  border-radius: 0px;\n  background-color: #ffffff;\n}\n#separation-title {\n  width: 300px;\n  background-color: #006aab;\n}\n#duration-text {\n  text-align: right;\n  float: right;\n}\n#orchestration-text {\n  text-align: left;\n  float: left;\n  font-size: 17px;\n}\n#madera {\n  color: #ff9001;\n}\n#metales {\n  color: #08a0a5;\n}\n#otrosInst {\n  color: #05a400;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLCtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBSUEsNkJBQUE7QUFGSjtBQURJO0VBQ0ksYUFBQTtBQUdSO0FBRUE7RUFDSSxZQUFBO0FBQ0o7QUFFQTtFQUNJLGtCQUFBO0VBQ0EseUJBQUE7QUFDSjtBQUVBO0VBQ0ksWUFBQTtFQUNBLHlCQUFBO0FBQ0o7QUFFQTtFQUNJLGlCQUFBO0VBQ0EsWUFBQTtBQUNKO0FBRUE7RUFDSSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FBQ0o7QUFFQTtFQUNJLGNBQUE7QUFDSjtBQUVBO0VBQ0ksY0FBQTtBQUNKO0FBRUE7RUFDSSxjQUFBO0FBQ0oiLCJmaWxlIjoid29ya3MucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnQge1xyXG4gICAgLS1vZmZzZXQtYm90dG9tOiBhdXRvIWltcG9ydGFudDtcclxuICAgIC0tb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICB9XHJcbiAgICBib3JkZXItd2lkdGg6IDBweCAxcHggMXB4IDFweDtcclxufVxyXG5cclxuaW9uLWhlYWRlciB7XHJcbiAgICBoZWlnaHQ6IDY1cHg7XHJcbn1cclxuXHJcbmlvbi1jYXJkIHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbn1cclxuXHJcbiNzZXBhcmF0aW9uLXRpdGxlIHtcclxuICAgIHdpZHRoOiAzMDBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDZhYWI7XHJcbn1cclxuXHJcbiNkdXJhdGlvbi10ZXh0IHtcclxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gICAgZmxvYXQ6IHJpZ2h0O1xyXG59XHJcblxyXG4jb3JjaGVzdHJhdGlvbi10ZXh0IHtcclxuICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIGZvbnQtc2l6ZTogMTdweDtcclxufVxyXG5cclxuI21hZGVyYSB7XHJcbiAgICBjb2xvcjogI2ZmOTAwMVxyXG59XHJcblxyXG4jbWV0YWxlcyB7XHJcbiAgICBjb2xvcjogIzA4YTBhNVxyXG59XHJcblxyXG4jb3Ryb3NJbnN0IHtcclxuICAgIGNvbG9yOiAjMDVhNDAwXHJcbn0iXX0= */");

/***/ }),

/***/ 3357:
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/projects/project-tabs/works/works.page.html ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content>\r\n\r\n    <div id=\"container\" *ngFor=\"let playlist of playlistArray\">\r\n        <ion-card>\r\n            <ion-card-header>\r\n                <ion-card-title>{{playlist.workName}}</ion-card-title>\r\n                <hr id=\"separation-title\">\r\n\r\n            </ion-card-header>\r\n\r\n            <ion-card-content>\r\n\r\n                <div>\r\n                    <ion-row>\r\n                        <span id=\"madera\">\r\n                            <h3 *ngIf='playlist.flute!=null' id=\"orchestration-text\"><b>{{playlist.flute}}</b></h3>\r\n                            <h3 *ngIf='playlist.fluteExp!=null &&  playlist.fluteExp!=\"\"' id=\"orchestration-text\">[{{playlist.flute}}]</h3>\r\n                            <h3 *ngIf='playlist.oboe!=null' id=\"orchestration-text\"><b>{{playlist.oboe}}</b></h3>\r\n                            <h3 *ngIf='playlist.oboeExp!=null && playlist.oboeExp!=\"\"' id=\"orchestration-text\">[{{playlist.oboeExp}}]</h3>\r\n                            <h3 *ngIf='playlist.clarinet!=null' id=\"orchestration-text\"><b>{{playlist.clarinet}}</b></h3>\r\n                            <h3 *ngIf='playlist.clarinetExp!=null && playlist.clarinetExp!=\"\"' id=\"orchestration-text\">[{{playlist.clarinetExp}}]</h3>\r\n                            <h3 *ngIf='playlist.bassoon!=null' id=\"orchestration-text\"><b>{{playlist.bassoon}}</b></h3>\r\n                            <h3 *ngIf='playlist.bassoonExp!=null && playlist.bassoonExp!=\"\"' id=\"orchestration-text\">[{{playlist.bassoonExp}}]</h3>\r\n                            <h3  *ngIf='playlist.workName!=\"PAUSA\"' id=\"orchestration-text\">--</h3>\r\n                        </span>\r\n                        <span id=\"metales\">\r\n                            <h3 *ngIf='playlist.horn!=null' id=\"orchestration-text\"><b>{{playlist.horn}}</b></h3>\r\n                            <h3 *ngIf='playlist.hornExp!=null  && playlist.hornExp!=\"\"' id=\"orchestration-text\">[{{playlist.hornExp}}]</h3>\r\n                            <h3 *ngIf='playlist.trumpet!=null' id=\"orchestration-text\"><b>{{playlist.trumpet}}</b></h3>\r\n                            <h3 *ngIf='playlist.trumpetExp!=null  && playlist.trumpetExp!=\"\"' id=\"orchestration-text\">[{{playlist.trumpetExp}}]</h3>\r\n                            <h3 *ngIf='playlist.trombone!=null' id=\"orchestration-text\"><b>{{playlist.trombone}}</b></h3>\r\n                            <h3 *ngIf='playlist.tromboneExp!=null && playlist.tromboneExp!=\"\"' id=\"orchestration-text\">[{{playlist.tromboneExp}}]</h3>\r\n                            <h3 *ngIf='playlist.tuba!=null' id=\"orchestration-text\"><b>{{playlist.tuba}}</b></h3>\r\n                            <h3 *ngIf='playlist.tubaExp!=null && playlist.tubaExp!=\"\"' id=\"orchestration-text\">[{{playlist.tubaExp}}]</h3>\r\n                        </span>\r\n                        <span id=\"otrosInst\">\r\n                            <h3 *ngIf='playlist.timpani==1' id=\"orchestration-text\"><b>-tmp</b></h3>\r\n                            <h3 *ngIf='playlist.timpani!=1  && playlist.timpani!=0 && playlist.timpani!=null && playlist.timpani!=undefined' id=\"orchestration-text\"><b>-{{playlist.timpani}}tmp</b></h3>\r\n                            <h3 *ngIf='playlist.percusion!=null && playlist.percusion!=0' id=\"orchestration-text\"><b>{{playlist.percusion}}</b></h3>\r\n                            <h3 *ngIf='playlist.harp!=null && playlist.harp!=0' id=\"orchestration-text\"><b>-{{playlist.harp}}</b></h3>\r\n                            <h3 *ngIf='playlist.harpExp!=null && playlist.harpExp!=0' id=\"orchestration-text\">[{{playlist.harpExp}}]</h3>\r\n                            <h3 *ngIf='playlist.keyboard!=null && playlist.keyboard!=0' id=\"orchestration-text\"><b>-{{playlist.keyboard}}</b></h3>\r\n                            <h3 *ngIf='playlist.keyboardExp!=null && playlist.keyboardExp!=0' id=\"orchestration-text\">[{{playlist.keyboardExp}}]</h3>\r\n                            <h3 *ngIf='playlist.extra!=null && playlist.extra!=0' id=\"orchestration-text\"><b>-{{playlist.extra}}</b></h3>\r\n                            <h3 *ngIf='playlist.extraExp!=null && playlist.extraExp!=0' id=\"orchestration-text\">[{{playlist.extraExp}}]</h3>\r\n                            <h3 *ngIf='playlist.stringsExp!=null && playlist.stringsExp!==\"N\"' id=\"orchestration-text\">str</h3>\r\n\r\n\r\n                         \r\n                        </span>\r\n                    </ion-row>\r\n                    <h2 id=\"orchestration-text\">{{playlist.playlistString}}</h2>\r\n                    <div *ngIf=\"playlist.workDuration\">\r\n                        <h1 *ngIf=\"playlist.workDuration.length>5\" id=\"duration-text\">{{playlist.workDuration.substring(0, 5)}}</h1>\r\n                        <h1 *ngIf=\"playlist.workDuration.length==5\" id=\"duration-text\">{{playlist.workDuration}}</h1>\r\n                    </div>\r\n                </div>\r\n\r\n            </ion-card-content>\r\n        </ion-card>\r\n\r\n    </div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n</ion-content>");

/***/ })

}]);
//# sourceMappingURL=src_app_views_projects_project-tabs_works_works_module_ts.js.map