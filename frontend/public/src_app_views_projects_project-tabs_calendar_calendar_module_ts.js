(self["webpackChunkOFGC"] = self["webpackChunkOFGC"] || []).push([["src_app_views_projects_project-tabs_calendar_calendar_module_ts"],{

/***/ 5599:
/*!*********************************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/calendar/calendar-routing.module.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CalendarPageRoutingModule": () => (/* binding */ CalendarPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _calendar_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendar.page */ 20);




const routes = [
    {
        path: '',
        component: _calendar_page__WEBPACK_IMPORTED_MODULE_0__.CalendarPage,
    }
];
let CalendarPageRoutingModule = class CalendarPageRoutingModule {
};
CalendarPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], CalendarPageRoutingModule);



/***/ }),

/***/ 9655:
/*!*************************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/calendar/calendar.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CalendarPageModule": () => (/* binding */ CalendarPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 9122);
/* harmony import */ var _calendar_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendar-routing.module */ 5599);
/* harmony import */ var _calendar_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendar.page */ 20);








let CalendarPageModule = class CalendarPageModule {
};
CalendarPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _calendar_routing_module__WEBPACK_IMPORTED_MODULE_0__.CalendarPageRoutingModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule
        ],
        declarations: [_calendar_page__WEBPACK_IMPORTED_MODULE_1__.CalendarPage],
        providers: [{ provide: _angular_core__WEBPACK_IMPORTED_MODULE_3__.LOCALE_ID, useValue: 'es-Py' }],
    })
], CalendarPageModule);



/***/ }),

/***/ 20:
/*!***********************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/calendar/calendar.page.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CalendarPage": () => (/* binding */ CalendarPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_calendar_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./calendar.page.html */ 4989);
/* harmony import */ var _calendar_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calendar.page.scss */ 9019);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 9122);
/* harmony import */ var src_app_services_shedule_shedule_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/shedule/shedule.service */ 5068);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ 8605);
/* harmony import */ var laravel_echo_ionic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! laravel-echo-ionic */ 2012);









let CalendarPage = class CalendarPage {
    constructor(sheduleService, activatedRoute, alertController, storage, locale) {
        this.sheduleService = sheduleService;
        this.activatedRoute = activatedRoute;
        this.alertController = alertController;
        this.storage = storage;
        this.locale = locale;
        this.sheduleArray = [];
        this.project_id = this.activatedRoute.snapshot.paramMap.get('id');
    }
    ngOnInit() {
        this.loadInfo();
    }
    loadInfo() {
        this.storage.get("shedule").then(data => {
            if (data) {
                var array = JSON.parse(data);
                array.filter((shedule) => {
                    if (shedule.project_id == this.project_id) {
                        this.sheduleArray.push(shedule);
                        this.sheduleArray.sort((a, b) => new Date(a.sheduleDate).getTime() - new Date(b.sheduleDate).getTime());
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
        this.sheduleService.getShedules().subscribe((p) => {
            this.storage.set("shedule", JSON.stringify(p));
            this.sheduleArray = p;
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
CalendarPage.ctorParameters = () => [
    { type: src_app_services_shedule_shedule_service__WEBPACK_IMPORTED_MODULE_2__.SheduleService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.AlertController },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_7__.Storage },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Inject, args: [_angular_core__WEBPACK_IMPORTED_MODULE_8__.LOCALE_ID,] }] }
];
CalendarPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-calendar',
        template: _raw_loader_calendar_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_calendar_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], CalendarPage);



/***/ }),

/***/ 9019:
/*!*************************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/calendar/calendar.page.scss ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("ion-content {\n  --offset-bottom: auto!important;\n  --overflow: hidden;\n  overflow: auto;\n}\nion-content::-webkit-scrollbar {\n  display: none;\n}\nion-card {\n  border-radius: 0px;\n}\nion-card-title {\n  font-size: 24px;\n}\n#separation-title {\n  background-color: #006aab;\n}\nh2 {\n  font-size: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGVuZGFyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLCtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBQ0o7QUFBSTtFQUNJLGFBQUE7QUFFUjtBQUVBO0VBQ0ksa0JBQUE7QUFDSjtBQUtBO0VBQ0ksZUFBQTtBQUZKO0FBS0E7RUFDSSx5QkFBQTtBQUZKO0FBS0E7RUFDSSxlQUFBO0FBRkoiLCJmaWxlIjoiY2FsZW5kYXIucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnQge1xyXG4gICAgLS1vZmZzZXQtYm90dG9tOiBhdXRvIWltcG9ydGFudDtcclxuICAgIC0tb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmlvbi1jYXJkIHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDBweDtcclxuICAgIC8vIGJhY2tncm91bmQtY29sb3I6ICNkNGFmYWY0YjtcclxuICAgIC8vIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiKDY4LCA3MCwgNjcpO1xyXG4gICAgLy8gYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XHJcbn1cclxuXHJcbmlvbi1jYXJkLXRpdGxlIHtcclxuICAgIGZvbnQtc2l6ZTogMjRweDtcclxufVxyXG5cclxuI3NlcGFyYXRpb24tdGl0bGUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwNmFhYjtcclxufVxyXG5cclxuaDIge1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG59Il19 */");

/***/ }),

/***/ 4989:
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/projects/project-tabs/calendar/calendar.page.html ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content has-header>\r\n\r\n    <div id=\"container\" *ngFor=\"let shedule of sheduleArray\">\r\n        <ion-card>\r\n            <ion-card-header>\r\n                <ion-card-title> {{shedule.sheduleDate | date: 'EEEE, dd/MM/yyyy'}} </ion-card-title>\r\n\r\n\r\n\r\n            </ion-card-header>\r\n\r\n            <ion-card-content>\r\n\r\n\r\n                <ion-row>\r\n                    <h2 class=\"ion-padding-end\">{{shedule.sheduleTipe}} </h2>\r\n                    <h2 *ngIf=\"shedule.shedulehourRange!=''\"> {{shedule.shedulehourRange}} </h2>\r\n\r\n                </ion-row>\r\n                <h2 *ngIf=\"shedule.rooms\"> {{shedule.rooms.roomAcronym}}</h2>\r\n                <h2 *ngIf=\"shedule.sheduleNote!=''\"><b>Notas: </b>{{shedule.sheduleNote}} </h2>\r\n                <!-- <hr id=\"separation-title\"> -->\r\n\r\n\r\n\r\n\r\n            </ion-card-content>\r\n        </ion-card>\r\n    </div>\r\n</ion-content>");

/***/ })

}]);
//# sourceMappingURL=src_app_views_projects_project-tabs_calendar_calendar_module_ts.js.map