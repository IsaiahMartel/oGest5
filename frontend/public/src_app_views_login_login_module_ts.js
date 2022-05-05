(self["webpackChunkOFGC"] = self["webpackChunkOFGC"] || []).push([["src_app_views_login_login_module_ts"],{

/***/ 696:
/*!*****************************************************!*\
  !*** ./src/app/views/login/login-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPageRoutingModule": () => (/* binding */ LoginPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.page */ 9015);




const routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_0__.LoginPage
    }
];
let LoginPageRoutingModule = class LoginPageRoutingModule {
};
LoginPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], LoginPageRoutingModule);



/***/ }),

/***/ 265:
/*!*********************************************!*\
  !*** ./src/app/views/login/login.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPageModule": () => (/* binding */ LoginPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 9122);
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login-routing.module */ 696);
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.page */ 9015);








let LoginPageModule = class LoginPageModule {
};
LoginPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _login_routing_module__WEBPACK_IMPORTED_MODULE_0__.LoginPageRoutingModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule,
        ],
        declarations: [_login_page__WEBPACK_IMPORTED_MODULE_1__.LoginPage]
    })
], LoginPageModule);



/***/ }),

/***/ 9015:
/*!*******************************************!*\
  !*** ./src/app/views/login/login.page.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPage": () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_login_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./login.page.html */ 6140);
/* harmony import */ var _login_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.page.scss */ 3104);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 9122);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angularx-social-login */ 2707);








let LoginPage = class LoginPage {
    constructor(router, alertController, formBuilder, authServiceSocial) {
        this.router = router;
        this.alertController = alertController;
        this.formBuilder = formBuilder;
        this.authServiceSocial = authServiceSocial;
        this.user = null;
    }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.minLength(6),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.maxLength(12), _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')])],
        });
    }
    presentAlert(message) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Error',
                subHeader: message,
                message: 'Could not login. Try again.',
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
};
LoginPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.Router },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.AlertController },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder },
    { type: angularx_social_login__WEBPACK_IMPORTED_MODULE_6__.SocialAuthService }
];
LoginPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-login',
        template: _raw_loader_login_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_login_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], LoginPage);



/***/ }),

/***/ 3104:
/*!*********************************************!*\
  !*** ./src/app/views/login/login.page.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("ion-content {\n  --offset-bottom: auto!important;\n  --overflow: hidden;\n  overflow: auto;\n}\nion-content::-webkit-scrollbar {\n  display: none;\n}\nion-thumbnail {\n  margin-top: 50px;\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 25px;\n  width: 200px;\n  height: 191px;\n}\n#email-icon {\n  font-size: 2em;\n}\n#password-icon {\n  font-size: 2em;\n}\n.label {\n  text-align: center;\n  font-size: 1.8em;\n  font-family: \"Outfit\", sans-serif;\n}\nion-input {\n  font-size: 1.5em;\n  text-align: center;\n}\n#forgot-password-text {\n  color: black;\n  display: block;\n  text-align: center;\n  margin-top: 40px;\n}\n#login-button {\n  margin-top: 4%;\n  width: 90%;\n  height: 70px;\n  margin-left: auto;\n  margin-right: auto;\n  font-size: 1.8em;\n  display: block;\n  border-width: 1px;\n  border-style: solid;\n  font-family: \"Outfit\", sans-serif;\n  background-color: #006aab;\n  color: white;\n  margin-top: 25px;\n  border-radius: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLCtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBQ0o7QUFBSTtFQUNJLGFBQUE7QUFFUjtBQUVBO0VBQ0ksZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtBQUNKO0FBRUE7RUFDSSxjQUFBO0FBQ0o7QUFFQTtFQUNJLGNBQUE7QUFDSjtBQUVBO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlDQUFBO0FBQ0o7QUFFQTtFQUNJLGdCQUFBO0VBQ0Esa0JBQUE7QUFDSjtBQUVBO0VBQ0ksWUFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBQ0o7QUFFQTtFQUNJLGNBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUNBQUE7RUFDQSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBQ0oiLCJmaWxlIjoibG9naW4ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnQge1xyXG4gICAgLS1vZmZzZXQtYm90dG9tOiBhdXRvIWltcG9ydGFudDtcclxuICAgIC0tb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmlvbi10aHVtYm5haWwge1xyXG4gICAgbWFyZ2luLXRvcDogNTBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjVweDtcclxuICAgIHdpZHRoOiAyMDBweDtcclxuICAgIGhlaWdodDogMTkxcHg7XHJcbn1cclxuXHJcbiNlbWFpbC1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMmVtO1xyXG59XHJcblxyXG4jcGFzc3dvcmQtaWNvbiB7XHJcbiAgICBmb250LXNpemU6IDJlbTtcclxufVxyXG5cclxuLmxhYmVsIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogMS44ZW07XHJcbiAgICBmb250LWZhbWlseTogJ091dGZpdCcsIHNhbnMtc2VyaWY7XHJcbn1cclxuXHJcbmlvbi1pbnB1dCB7XHJcbiAgICBmb250LXNpemU6IDEuNWVtO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4jZm9yZ290LXBhc3N3b3JkLXRleHQge1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiA0MHB4O1xyXG59XHJcblxyXG4jbG9naW4tYnV0dG9uIHtcclxuICAgIG1hcmdpbi10b3A6IDQlO1xyXG4gICAgd2lkdGg6IDkwJTtcclxuICAgIGhlaWdodDogNzBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xyXG4gICAgZm9udC1zaXplOiAxLjhlbTtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgYm9yZGVyLXdpZHRoOiAxcHg7XHJcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xyXG4gICAgZm9udC1mYW1pbHk6ICdPdXRmaXQnLCBzYW5zLXNlcmlmO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwNmFhYjtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIG1hcmdpbi10b3A6IDI1cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG59Il19 */");

/***/ }),

/***/ 6140:
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/login/login.page.html ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content>\r\n    <ion-grid>\r\n\r\n        <ion-thumbnail>\r\n            <img src=\"assets\\favicon-Blanco.png\">\r\n          </ion-thumbnail>\r\n\r\n            <form [formGroup]=\"loginForm\" (ngSubmit)=\"login()\" novalidate>\r\n\r\n                <ion-item id=\"email-fields\">\r\n                    <ion-label class=\"label\" position=\"floating\" for=\"project_id\">Email</ion-label>\r\n                    <ion-row>\r\n                        <ion-icon id=\"email-icon\" name=\"person-outline\"></ion-icon>\r\n                        <ion-input name=\"email\" type=\"email\" placeholder=\"your@email.com\" formControlName=\"email\" required></ion-input>\r\n                    </ion-row>\r\n\r\n                    <span slot=\"error\" *ngIf=\"loginForm.controls['email'].errors?.required && loginForm.controls['email']?.touched\">Rellene el email</span>\r\n                    <span slot=\"error\" *ngIf=\"loginForm.controls['email'].errors?.pattern && loginForm.controls['email']?.touched\">El email no es válido.</span>\r\n\r\n                </ion-item>\r\n\r\n                <ion-item id=\"password-fields\">\r\n                    <ion-label class=\"label\" position=\"floating\" for=\"project_id\">Contraseña</ion-label>\r\n\r\n                    <ion-row>\r\n                        <ion-icon id=\"password-icon\" name=\"bag-outline\"></ion-icon>\r\n                        <ion-input name=\"password\" type=\"password\" placeholder=\"Contraseña\" formControlName=\"password\" required></ion-input>\r\n                    </ion-row>\r\n\r\n                    <span slot=\"error\" *ngIf=\"loginForm.controls['password'].errors?.required && loginForm.controls['password']?.touched\">Rellene la contraseña</span>\r\n                    <span slot=\"error\" *ngIf=\"loginForm.controls['password'].errors?.minlength && loginForm.controls['password'].touched\">La contraseña debe de tener más de 6 caracteres.</span>\r\n                    <span slot=\"error\" *ngIf=\"loginForm.controls['password'].errors?.maxlength\">La contraseña no puede tener más de 12 caracteres.</span>\r\n                    <span slot=\"error\" *ngIf=\"loginForm.controls['password'].errors?.pattern && loginForm.controls['password'].touched\">La contraseña no es válida.</span>\r\n                    <span slot=\"error\" *ngIf=\"loginForm.controls['password'].errors?.pattern && loginForm.controls['password'].touched\">La contraseña no es válida.</span>\r\n                </ion-item>\r\n\r\n                <button type=\"submit\" id=\"login-button\" class=\"button\" type=\"submit\">ENTRAR</button>\r\n\r\n                <h3 id=\"forgot-password-text\">¿Has olvidado tu contraseña?</h3>\r\n\r\n            </form>\r\n    </ion-grid>\r\n</ion-content>");

/***/ })

}]);
//# sourceMappingURL=src_app_views_login_login_module_ts.js.map