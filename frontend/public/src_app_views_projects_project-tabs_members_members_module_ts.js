(self["webpackChunkOFGC"] = self["webpackChunkOFGC"] || []).push([["src_app_views_projects_project-tabs_members_members_module_ts"],{

/***/ 3057:
/*!*******************************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/members/members-routing.module.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MembersPageRoutingModule": () => (/* binding */ MembersPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _members_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./members.page */ 984);




const routes = [
    {
        path: '',
        component: _members_page__WEBPACK_IMPORTED_MODULE_0__.MembersPage
    }
];
let MembersPageRoutingModule = class MembersPageRoutingModule {
};
MembersPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], MembersPageRoutingModule);



/***/ }),

/***/ 3100:
/*!***********************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/members/members.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MembersPageModule": () => (/* binding */ MembersPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 9122);
/* harmony import */ var _members_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./members-routing.module */ 3057);
/* harmony import */ var _members_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./members.page */ 984);







let MembersPageModule = class MembersPageModule {
};
MembersPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _members_routing_module__WEBPACK_IMPORTED_MODULE_0__.MembersPageRoutingModule
        ],
        declarations: [_members_page__WEBPACK_IMPORTED_MODULE_1__.MembersPage]
    })
], MembersPageModule);



/***/ }),

/***/ 984:
/*!*********************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/members/members.page.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MembersPage": () => (/* binding */ MembersPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_members_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./members.page.html */ 8401);
/* harmony import */ var _members_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./members.page.scss */ 4844);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var src_app_services_address_address_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/address/address.service */ 7172);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 9122);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ 8605);
/* harmony import */ var laravel_echo_ionic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! laravel-echo-ionic */ 2012);









let MembersPage = class MembersPage {
    constructor(addressService, activatedRoute, alertController, storage) {
        this.addressService = addressService;
        this.activatedRoute = activatedRoute;
        this.alertController = alertController;
        this.storage = storage;
        this.addressArray = [];
        this.project_id = this.activatedRoute.snapshot.paramMap.get('id');
    }
    ngOnInit() {
        this.loadInfo();
    }
    loadInfo() {
        this.storage.get("address").then(data => {
            if (data) {
                var array = JSON.parse(data);
                array.filter((address) => {
                    console.log(address.project);
                    console.log(address.project.id);
                    if (address.project.id == this.project_id) {
                        console.log(address);
                        console.log(address.address);
                        console.log(address.addressgroups[0].addressgroupName);
                        return this.addressArray.push(address);
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
        this.addressService.getAddresses().subscribe((p) => {
            this.storage.set("address", JSON.stringify(p));
            this.addressArray = p;
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
MembersPage.ctorParameters = () => [
    { type: src_app_services_address_address_service__WEBPACK_IMPORTED_MODULE_2__.AddressService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.AlertController },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_7__.Storage }
];
MembersPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-members',
        template: _raw_loader_members_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_members_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], MembersPage);



/***/ }),

/***/ 4844:
/*!***********************************************************************!*\
  !*** ./src/app/views/projects/project-tabs/members/members.page.scss ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("ion-content {\n  --offset-bottom: auto!important;\n  --overflow: hidden;\n  overflow: auto;\n  border-width: 0px 1px 1px 1px;\n}\nion-content::-webkit-scrollbar {\n  display: none;\n}\nion-card {\n  background-color: #ffffff;\n  margin-right: 5px;\n  margin-left: 5px;\n  margin-bottom: 10px;\n  margin-top: 10px;\n}\nion-card-header {\n  padding-right: 15px;\n  padding-left: 15px;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n.name-text {\n  margin-left: 10px;\n  text-align: center;\n  float: left;\n}\n.title-text {\n  text-align: right;\n  float: right;\n  font-weight: bold;\n}\n.member-icon {\n  font-size: 2.8em;\n  float: left;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbWJlcnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksK0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFJQSw2QkFBQTtBQUZKO0FBREk7RUFDSSxhQUFBO0FBR1I7QUFFQTtFQUNJLHlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUFDSjtBQUVBO0VBQ0ksbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7QUFDSjtBQUVBO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUFDSjtBQUVBO0VBQ0ksaUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUFDSjtBQUVBO0VBQ0ksZ0JBQUE7RUFDQSxXQUFBO0FBQ0oiLCJmaWxlIjoibWVtYmVycy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tY29udGVudCB7XHJcbiAgICAtLW9mZnNldC1ib3R0b206IGF1dG8haW1wb3J0YW50O1xyXG4gICAgLS1vdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgICAmOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgIH1cclxuICAgIGJvcmRlci13aWR0aDogMHB4IDFweCAxcHggMXB4O1xyXG59XHJcblxyXG5pb24tY2FyZCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbn1cclxuXHJcbmlvbi1jYXJkLWhlYWRlciB7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxNXB4O1xyXG4gICAgcGFkZGluZy10b3A6IDEwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLm5hbWUtdGV4dCB7XHJcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZsb2F0OiBsZWZ0O1xyXG59XHJcblxyXG4udGl0bGUtdGV4dCB7XHJcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgIGZsb2F0OiByaWdodDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4ubWVtYmVyLWljb24ge1xyXG4gICAgZm9udC1zaXplOiAyLjhlbTtcclxuICAgIGZsb2F0OiBsZWZ0O1xyXG59XHJcblxyXG4vLyAuY2FyZC1zZXBhcmF0aW9uIHtcclxuLy8gICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDZhYWI7XHJcbi8vIH0iXX0= */");

/***/ }),

/***/ 8401:
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/projects/project-tabs/members/members.page.html ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content has-header>\r\n\r\n    <div id=\"container\" *ngFor=\"let address of addressArray\">\r\n        <ion-card>\r\n            <ion-card-header>\r\n                <ion-icon class=\"member-icon\" src=\"assets/director.svg\"></ion-icon>\r\n                <h5 class=\"name-text\"> {{address.addressfirstName}} {{address.addresslastName}}</h5>\r\n                <h6 class=\"title-text\">{{address.addressgroups[0].addressgroupName}}</h6>\r\n            </ion-card-header>\r\n        </ion-card>\r\n        <!-- <hr class=\"card-separation\"> -->\r\n\r\n    </div>\r\n\r\n    <h1 class=\"ion-text-center\" *ngIf=\"addressArray.length==0\">\r\n        No hay miembros\r\n    </h1>\r\n</ion-content>");

/***/ })

}]);
//# sourceMappingURL=src_app_views_projects_project-tabs_members_members_module_ts.js.map