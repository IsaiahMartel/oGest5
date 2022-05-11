(self["webpackChunkOFGC"] = self["webpackChunkOFGC"] || []).push([["src_app_views_register_register_module_ts"],{

/***/ 2602:
/*!***********************************************************!*\
  !*** ./src/app/views/register/register-routing.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterPageRoutingModule": () => (/* binding */ RegisterPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _register_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register.page */ 5256);




const routes = [
    {
        path: '',
        component: _register_page__WEBPACK_IMPORTED_MODULE_0__.RegisterPage
    }
];
let RegisterPageRoutingModule = class RegisterPageRoutingModule {
};
RegisterPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], RegisterPageRoutingModule);



/***/ }),

/***/ 3779:
/*!***************************************************!*\
  !*** ./src/app/views/register/register.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterPageModule": () => (/* binding */ RegisterPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 9122);
/* harmony import */ var _register_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register-routing.module */ 2602);
/* harmony import */ var _register_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register.page */ 5256);








let RegisterPageModule = class RegisterPageModule {
};
RegisterPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _register_routing_module__WEBPACK_IMPORTED_MODULE_0__.RegisterPageRoutingModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule
        ],
        declarations: [_register_page__WEBPACK_IMPORTED_MODULE_1__.RegisterPage]
    })
], RegisterPageModule);



/***/ }),

/***/ 5256:
/*!*************************************************!*\
  !*** ./src/app/views/register/register.page.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterPage": () => (/* binding */ RegisterPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_register_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./register.page.html */ 4082);
/* harmony import */ var _register_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register.page.scss */ 4644);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ 8605);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 9122);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 3679);








let RegisterPage = class RegisterPage {
    constructor(router, storage, alertController, formBuilder) {
        this.router = router;
        this.storage = storage;
        this.alertController = alertController;
        this.formBuilder = formBuilder;
        this.errors = null;
    }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.minLength(3)]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.minLength(6),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.maxLength(12),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$'),
                ])],
            confirmPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required,
                ])],
        }, {
            validators: this.checkIfPasswordMatch.bind(this)
        });
    }
    checkIfPasswordMatch(formGroup) {
        let password = formGroup.get('password').value;
        let confirmPassword = formGroup.get('confirmPassword').value;
        if (confirmPassword != password) {
            formGroup.controls['confirmPassword'].setErrors({ 'incorrect': true });
        }
        else {
            formGroup.controls['confirmPassword'].setErrors(null);
        }
    }
    presentAlert(message) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Error',
                subHeader: message,
                message: 'Inténtalo de nuevo.',
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
};
RegisterPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.Router },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__.Storage },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.AlertController },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder }
];
RegisterPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-register',
        template: _raw_loader_register_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_register_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], RegisterPage);



/***/ }),

/***/ 4644:
/*!***************************************************!*\
  !*** ./src/app/views/register/register.page.scss ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("@import url(\"https://fonts.googleapis.com/css2?family=Outfit:wght@200&display=swap\");\n#navbar {\n  border-width: 1px;\n  border-color: #6e6666;\n  border-style: solid;\n  height: 76px;\n  text-align: center;\n}\n#header-icon {\n  display: inline-block;\n  vertical-align: middle;\n  font-size: 45px;\n  color: #464040;\n  margin-bottom: 2px;\n}\n#header-text {\n  display: inline-block;\n  vertical-align: middle;\n  font-size: 30px;\n  font-family: \"Outfit\", sans-serif;\n  color: var(--ion-color-dark);\n  font-weight: 700;\n}\n#go-back-button {\n  vertical-align: middle;\n  font-size: 40px;\n  color: #464040;\n  position: absolute;\n  left: 0;\n}\nion-content {\n  --offset-bottom: auto!important;\n  --overflow: hidden;\n  overflow: auto;\n}\nion-content::-webkit-scrollbar {\n  display: none;\n}\nion-input,\nion-label {\n  margin-left: auto;\n  margin-right: auto;\n}\nion-label {\n  font-weight: bold !important;\n  margin-top: 40px;\n  margin-left: 20px;\n  font-size: 2em;\n}\nion-input {\n  width: 80%;\n  margin-top: 30px;\n  cursor: pointer;\n  text-align: center;\n  font-size: 1.5em;\n}\ninput:hover {\n  background-color: #aa7ca0;\n}\n#register-button {\n  width: 80%;\n  height: 60px;\n  font-size: 1.5em;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 10%;\n  display: block;\n  border-width: 1.5px;\n  border-color: black;\n  border-style: solid;\n  border-radius: 5px;\n  font-family: \"Outfit\", sans-serif;\n  background-color: #ffffff;\n  box-shadow: 0 0 1px black;\n}\n#square {\n  margin-top: 15px;\n  margin-left: 15px;\n  margin-right: 15px;\n  border-width: 1px;\n  border-color: black;\n  border-style: solid;\n  background-color: white;\n  padding: 10px;\n  padding-bottom: 40px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdGVyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBUSxvRkFBQTtBQUNSO0VBQ0ksaUJBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBQ0o7QUFFQTtFQUNJLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0FBQ0o7QUFFQTtFQUNJLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VBQ0EsaUNBQUE7RUFDQSw0QkFBQTtFQUNBLGdCQUFBO0FBQ0o7QUFFQTtFQUNJLHNCQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLE9BQUE7QUFDSjtBQUVBO0VBQ0ksK0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUFDSjtBQUFJO0VBQ0ksYUFBQTtBQUVSO0FBRUE7O0VBRUksaUJBQUE7RUFDQSxrQkFBQTtBQUNKO0FBRUE7RUFDSSw0QkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0FBQ0o7QUFFQTtFQUNJLFVBQUE7RUFLQSxnQkFBQTtFQUdBLGVBQUE7RUFFQSxrQkFBQTtFQUNBLGdCQUFBO0FBTko7QUFTQTtFQUNJLHlCQUFBO0FBTko7QUFTQTtFQUNJLFVBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGlDQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtBQU5KO0FBU0E7RUFDSSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxvQkFBQTtBQU5KIiwiZmlsZSI6InJlZ2lzdGVyLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU91dGZpdDp3Z2h0QDIwMCZkaXNwbGF5PXN3YXAnKTtcclxuI25hdmJhciB7XHJcbiAgICBib3JkZXItd2lkdGg6IDFweDtcclxuICAgIGJvcmRlci1jb2xvcjogcmdiKDExMCwgMTAyLCAxMDIpO1xyXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICAgIGhlaWdodDogNzZweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuI2hlYWRlci1pY29uIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBmb250LXNpemU6IDQ1cHg7XHJcbiAgICBjb2xvcjogIzQ2NDA0MDtcclxuICAgIG1hcmdpbi1ib3R0b206IDJweDtcclxufVxyXG5cclxuI2hlYWRlci10ZXh0IHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgICBmb250LWZhbWlseTogJ091dGZpdCcsIHNhbnMtc2VyaWY7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxufVxyXG5cclxuI2dvLWJhY2stYnV0dG9uIHtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICBjb2xvcjogIzQ2NDA0MDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGxlZnQ6IDA7XHJcbn1cclxuXHJcbmlvbi1jb250ZW50IHtcclxuICAgIC0tb2Zmc2V0LWJvdHRvbTogYXV0byFpbXBvcnRhbnQ7XHJcbiAgICAtLW92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgfVxyXG59XHJcblxyXG5pb24taW5wdXQsXHJcbmlvbi1sYWJlbCB7XHJcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcclxuICAgIG1hcmdpbi1yaWdodDogYXV0bztcclxufVxyXG5cclxuaW9uLWxhYmVsIHtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkICFpbXBvcnRhbnQ7XHJcbiAgICBtYXJnaW4tdG9wOiA0MHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XHJcbiAgICBmb250LXNpemU6IDJlbTtcclxufVxyXG5cclxuaW9uLWlucHV0IHtcclxuICAgIHdpZHRoOiA4MCU7XHJcbiAgICAvLyBmb250LXdlaWdodDogYm9sZDtcclxuICAgIC8vIC8vIGJhY2tncm91bmQtY29sb3I6ICM3ZmQzZmE7XHJcbiAgICAvLyBjb2xvcjogd2hpdGU7XHJcbiAgICAvLyBwYWRkaW5nOiAxNHB4IDIwcHg7XHJcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xyXG4gICAgLy8gYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XHJcbiAgICAvLyBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAvLyBib3gtc2hhZG93OiAwIDAgMXB4ICNmYTdmOTg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXNpemU6IDEuNWVtO1xyXG59XHJcblxyXG5pbnB1dDpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWE3Y2EwO1xyXG59XHJcblxyXG4jcmVnaXN0ZXItYnV0dG9uIHtcclxuICAgIHdpZHRoOiA4MCU7XHJcbiAgICBoZWlnaHQ6IDYwcHg7XHJcbiAgICBmb250LXNpemU6IDEuNWVtO1xyXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbiAgICBtYXJnaW4tdG9wOiAxMCU7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGJvcmRlci13aWR0aDogMS41cHg7XHJcbiAgICBib3JkZXItY29sb3I6IGJsYWNrO1xyXG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIGZvbnQtZmFtaWx5OiAnT3V0Zml0Jywgc2Fucy1zZXJpZjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgMXB4IGJsYWNrO1xyXG59XHJcblxyXG4jc3F1YXJlIHtcclxuICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMTVweDtcclxuICAgIG1hcmdpbi1yaWdodDogMTVweDtcclxuICAgIGJvcmRlci13aWR0aDogMXB4O1xyXG4gICAgYm9yZGVyLWNvbG9yOiBibGFjaztcclxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogNDBweDtcclxufSJdfQ== */");

/***/ }),

/***/ 4082:
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/register/register.page.html ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header class=\"ion-no-border\">\r\n\r\n    <ion-toolbar id=\"navbar\">\r\n        <ion-buttons slot=\"start\" routerLink=\"/login\">\r\n            <ion-icon id=\"go-back-button\" name=\"chevron-back-outline\"></ion-icon>\r\n\r\n        </ion-buttons>\r\n        <ion-icon id=\"header-icon\" src=\"assets/login-icon.svg\"></ion-icon>\r\n        <h2 id=\"header-text\">Registrarse</h2>\r\n\r\n    </ion-toolbar>\r\n</ion-header>\r\n\r\n\r\n<ion-content>\r\n    <div id=\"square\">\r\n        <form [formGroup]=\"registerForm\" (ngSubmit)=\"register()\" novalidate>\r\n            <ion-item>\r\n                <ion-label position=\"floating\" for=\"project_id\">\r\n                    Nombre\r\n                </ion-label>\r\n                <ion-input id=\"project-id\" type=\"text\" formControlName=\"name\" required></ion-input>\r\n            </ion-item>\r\n\r\n\r\n            <ion-item>\r\n                <ion-label position=\"floating\" for=\"project_id\">\r\n                    Email\r\n                </ion-label>\r\n                <ion-input name=\"email\" type=\"email\" formControlName=\"email\" required></ion-input>\r\n                <span slot=\"error\" *ngIf=\"registerForm.controls['email'].errors?.required && registerForm.controls['email'].touched\">Rellene el email</span>\r\n                <span slot=\"error\" *ngIf=\"registerForm.controls['email'].errors?.pattern && registerForm.controls['email'].touched\">El email no es válido.</span>\r\n            </ion-item>\r\n\r\n            <ion-item>\r\n                <ion-label position=\"floating\" for=\"project_id\">\r\n                    Contraseña\r\n                </ion-label>\r\n                <ion-input name=\"password\" type=\"password\" formControlName=\"password\" required></ion-input>\r\n                <span slot=\"error\" *ngIf=\"registerForm.controls['password'].errors?.required && registerForm.controls['password'].touched\">Rellene la contraseña</span>\r\n                <span slot=\"error\" *ngIf=\"registerForm.controls['password'].errors?.minlength && registerForm.controls['password'].touched\">La contraseña debe de tener más de 6 caracteres.</span>\r\n                <span slot=\"error\" *ngIf=\"registerForm.controls['password'].errors?.maxlength\">La contraseña no puede tener más de 12 caracteres.</span>\r\n                <!-- <span slot=\"error\" *ngIf=\"registerForm.controls['password'].errors?.pattern && registerForm.controls['password'].touched\" >La contraseña no es válida.</span> -->\r\n            </ion-item>\r\n\r\n            <ion-item>\r\n                <ion-label position=\"floating\" for=\"project_id\">\r\n                    Repita la contraseña\r\n                </ion-label>\r\n                <ion-input name=\"confirmPassword\" type=\"password\" formControlName=\"confirmPassword\" required>\r\n                </ion-input>\r\n                <span slot=\"error\" *ngIf=\"registerForm.controls['confirmPassword'].hasError('incorrect') && registerForm.controls['confirmPassword'].touched\">Las contraseñas no coinciden</span>\r\n\r\n            </ion-item>\r\n\r\n            <button id=\"register-button\" type=\"submit\" class=\"button\" type=\"submit\">REGISTRARSE</button>\r\n        </form>\r\n    </div>\r\n\r\n</ion-content>");

/***/ })

}]);
//# sourceMappingURL=src_app_views_register_register_module_ts.js.map