(self["webpackChunkOFGC"] = self["webpackChunkOFGC"] || []).push([["src_app_views_projects_project-tabs_tabs_module_ts"],{

/***/ 8180:
/*!********************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/tabs-routing.module.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsPageRoutingModule": () => (/* binding */ TabsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _tabs_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabs.page */ 3271);




const routes = [
    {
        path: '',
        component: _tabs_page__WEBPACK_IMPORTED_MODULE_0__.TabsPage,
        children: [
            {
                path: 'calendar/:id',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_laravel-echo-ionic_dist_echo_js"), __webpack_require__.e("common"), __webpack_require__.e("src_app_views_projects_project-tabs_calendar_calendar_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./calendar/calendar.module */ 9655)).then(m => m.CalendarPageModule)
            },
            {
                path: 'members/:id',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_laravel-echo-ionic_dist_echo_js"), __webpack_require__.e("common"), __webpack_require__.e("src_app_views_projects_project-tabs_members_members_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./members/members.module */ 3100)).then(m => m.MembersPageModule)
            },
            {
                path: 'works/:id',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_laravel-echo-ionic_dist_echo_js"), __webpack_require__.e("common"), __webpack_require__.e("src_app_views_projects_project-tabs_works_works_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./works/works.module */ 6521)).then(m => m.WorksPageModule)
            },
            {
                path: 'instruments/:id',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_laravel-echo-ionic_dist_echo_js"), __webpack_require__.e("common"), __webpack_require__.e("src_app_views_projects_project-tabs_instruments_instruments_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./instruments/instruments.module */ 3944)).then(m => m.InstrumentsPageModule)
            },
            {
                path: '',
                redirectTo: 'schedule',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'instruments',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_laravel-echo-ionic_dist_echo_js"), __webpack_require__.e("common"), __webpack_require__.e("src_app_views_projects_project-tabs_instruments_instruments_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./instruments/instruments.module */ 3944)).then(m => m.InstrumentsPageModule)
    }
];
let TabsPageRoutingModule = class TabsPageRoutingModule {
};
TabsPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], TabsPageRoutingModule);



/***/ }),

/***/ 6602:
/*!************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/tabs.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsPageModule": () => (/* binding */ TabsPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 9122);
/* harmony import */ var _tabs_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabs-routing.module */ 8180);
/* harmony import */ var _tabs_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabs.page */ 3271);







let TabsPageModule = class TabsPageModule {
};
TabsPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _tabs_routing_module__WEBPACK_IMPORTED_MODULE_0__.TabsPageRoutingModule,
        ],
        declarations: [_tabs_page__WEBPACK_IMPORTED_MODULE_1__.TabsPage]
    })
], TabsPageModule);



/***/ }),

/***/ 3271:
/*!**********************************************************!*\
  !*** ./src/app/views/projects/project-tabs/tabs.page.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsPage": () => (/* binding */ TabsPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_tabs_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./tabs.page.html */ 1544);
/* harmony import */ var _tabs_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabs.page.scss */ 2828);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ 8605);
/* harmony import */ var src_app_services_project_id_project_id_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/project-id/project-id.service */ 5628);







let TabsPage = class TabsPage {
    constructor(router, storage, projectIdService) {
        this.router = router;
        this.storage = storage;
        this.projectIdService = projectIdService;
        this.urlSplitArray = [];
        this.projectIdService;
    }
    ngOnInit() {
        if (this.projectIdService.projectId == null) {
            this.urlSplitArray = this.router.url.split("/");
            this.projectIdService.changeProjectId(parseInt(this.urlSplitArray.slice(-1)[0]));
        }
    }
};
TabsPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_4__.Storage },
    { type: src_app_services_project_id_project_id_service__WEBPACK_IMPORTED_MODULE_2__.ProjectIdService }
];
TabsPage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-tabs',
        template: _raw_loader_tabs_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_tabs_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], TabsPage);



/***/ }),

/***/ 2828:
/*!************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/tabs.page.scss ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("ion-content {\n  --overflow: hidden;\n  overflow: auto;\n}\nion-content::-webkit-scrollbar {\n  display: none;\n}\n#separation-title {\n  background-color: #006aab;\n  width: 350px;\n}\n#go-back-button {\n  vertical-align: middle;\n  font-size: 40px;\n  color: #464040;\n  position: absolute;\n  left: 0;\n}\n#header-icon {\n  display: inline-block;\n  vertical-align: middle;\n  font-size: 55px;\n  color: #464040;\n  margin-bottom: 2px;\n}\n#navbar-text {\n  text-align: center;\n  vertical-align: middle;\n  font-size: 18px;\n  color: #464040;\n  font-weight: 700;\n}\nion-tab-bar {\n  height: 70px;\n}\nion-tab-bar {\n  border-width: 2px 0px 0px 0px;\n  border-color: #006aab;\n  border-style: solid;\n}\nion-label {\n  font-size: 3em;\n}\n.tabs-icons {\n  font-size: 4em;\n  color: #006aab;\n}\nhr {\n  height: 2px;\n  background-color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFRO0VBQ0ksa0JBQUE7RUFDQSxjQUFBO0FBQ1o7QUFBWTtFQUNJLGFBQUE7QUFFaEI7QUFLUTtFQUNJLHlCQUFBO0VBQ0EsWUFBQTtBQUZaO0FBS1E7RUFDSSxzQkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxPQUFBO0FBRlo7QUFLUTtFQUNJLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0FBRlo7QUFLUTtFQUNJLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FBRlo7QUFLUTtFQUNJLFlBQUE7QUFGWjtBQUtRO0VBQ0ksNkJBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0FBRlo7QUFLUTtFQUNJLGNBQUE7QUFGWjtBQUtRO0VBQ0ksY0FBQTtFQUNBLGNBQUE7QUFGWjtBQUtRO0VBQ0ksV0FBQTtFQUNBLHVCQUFBO0FBRloiLCJmaWxlIjoidGFicy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgICAgICAgIGlvbi1jb250ZW50IHtcclxuICAgICAgICAgICAgLS1vdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogYXV0bztcclxuICAgICAgICAgICAgJjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyAjbmF2YmFyIHtcclxuICAgICAgICAvLyAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICMwMDZhYWI7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgICNzZXBhcmF0aW9uLXRpdGxlIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwNmFhYjtcclxuICAgICAgICAgICAgd2lkdGg6IDM1MHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAjZ28tYmFjay1idXR0b24ge1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNDY0MDQwO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICNoZWFkZXItaWNvbiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgICAgICAgICAgZm9udC1zaXplOiA1NXB4O1xyXG4gICAgICAgICAgICBjb2xvcjogIzQ2NDA0MDtcclxuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMnB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAjbmF2YmFyLXRleHQge1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgICAgICAgY29sb3I6ICM0NjQwNDA7XHJcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlvbi10YWItYmFyIHtcclxuICAgICAgICAgICAgaGVpZ2h0OiA3MHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpb24tdGFiLWJhciB7XHJcbiAgICAgICAgICAgIGJvcmRlci13aWR0aDogMnB4IDBweCAwcHggMHB4O1xyXG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICMwMDZhYWI7XHJcbiAgICAgICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlvbi1sYWJlbCB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogM2VtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAudGFicy1pY29ucyB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNGVtO1xyXG4gICAgICAgICAgICBjb2xvcjogIzAwNmFhYjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaHIge1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDJweDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgICAgICAgfSJdfQ== */");

/***/ }),

/***/ 1544:
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/projects/project-tabs/tabs.page.html ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header class=\"ion-no-border\">\r\n    <ion-toolbar id=\"navbar\">\r\n        <ion-buttons slot=\"start\" routerLink=\"/home\">\r\n\r\n            <ion-icon id=\"go-back-button\" name=\"chevron-back-outline\"></ion-icon>\r\n\r\n        </ion-buttons>\r\n\r\n        <h2 id=\"navbar-text\">{{projectIdService.projectName}}</h2>\r\n\r\n    </ion-toolbar>\r\n    <hr id=\"separation-title\">\r\n</ion-header>\r\n\r\n<ion-content>\r\n    <ion-tabs>\r\n        <ion-tab-bar slot=\"bottom\">\r\n\r\n            <ion-tab-button tab=\"calendar/{{projectIdService.projectId}}\">\r\n                <ion-icon class=\"tabs-icons\" name=\"calendar\"></ion-icon>\r\n            </ion-tab-button>\r\n\r\n            <ion-tab-button tab=\"members/{{projectIdService.projectId}}\">\r\n                <ion-icon class=\"tabs-icons\" name=\"people\"></ion-icon>\r\n            </ion-tab-button>\r\n\r\n            <ion-tab-button tab=\"works/{{projectIdService.projectId}}\">\r\n                <ion-icon class=\"tabs-icons\" name=\"musical-notes-outline\"></ion-icon>\r\n            </ion-tab-button>\r\n\r\n            <ion-tab-button tab=\"instruments/{{projectIdService.projectId}}\">\r\n                <ion-icon class=\"tabs-icons\" name=\"triangle-outline\"></ion-icon>\r\n            </ion-tab-button>\r\n\r\n        </ion-tab-bar>\r\n    </ion-tabs>\r\n</ion-content>");

/***/ })

}]);
//# sourceMappingURL=src_app_views_projects_project-tabs_tabs_module_ts.js.map