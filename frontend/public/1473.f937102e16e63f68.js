"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1473],{1473:(S,g,l)=>{l.r(g),l.d(g,{LoginPageModule:()=>y});var u=l(9808),r=l(2382),a=l(5636),s=l(4800),o=l(4893),m=l(655),c=l(1135),d=l(8505),f=l(520),h=l(4158);let F=(()=>{class n{constructor(e,t){this.httpClient=e,this.storage=t,this.AUTH_SERVER_ADDRESS="http://localhost:8000/api/auth",this.authSubject=new c.X(!1)}login(e){return this.username=e.mobileEmail,this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`,e).pipe((0,d.b)(t=>(0,m.mG)(this,void 0,void 0,function*(){t.access_token&&this.storage.ready().then(()=>{this.storage.set("access_token",t.access_token)})})))}}return n.\u0275fac=function(e){return new(e||n)(o.LFG(f.eN),o.LFG(h.Ke))},n.\u0275prov=o.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();function v(n,i){1&n&&(o.TgZ(0,"span",10),o._uU(1,"Rellene el email"),o.qZA())}function P(n,i){1&n&&(o.TgZ(0,"span",10),o._uU(1,"El email no es v\xe1lido."),o.qZA())}function L(n,i){1&n&&(o.TgZ(0,"span",10),o._uU(1,"Rellene la contrase\xf1a"),o.qZA())}function Z(n,i){1&n&&(o.TgZ(0,"span",10),o._uU(1,"La contrase\xf1a debe de tener m\xe1s de 6 caracteres."),o.qZA())}function A(n,i){1&n&&(o.TgZ(0,"span",10),o._uU(1,"La contrase\xf1a no puede tener m\xe1s de 12 caracteres."),o.qZA())}const b=[{path:"",component:(()=>{class n{constructor(e,t,p,T){this.alertController=e,this.authService=t,this.formBuilder=p,this.router=T}ngOnInit(){this.loginForm=this.formBuilder.group({email:["",[r.kI.required,r.kI.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")]],password:["",r.kI.compose([r.kI.required,r.kI.minLength(6),r.kI.maxLength(12),r.kI.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$")])]})}login(e){this.authService.login({id:null,mobileEmail:e.value.email,password:e.value.password}).subscribe(()=>{this.router.navigateByUrl(""),this.loginForm.reset()})}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(a.Br),o.Y36(F),o.Y36(r.qu),o.Y36(s.F0))},n.\u0275cmp=o.Xpm({type:n,selectors:[["app-login"]],decls:20,vars:6,consts:[["src","assets\\favicon-Blanco.png"],[3,"formGroup","ngSubmit"],["id","email-fields"],["id","icon","name","person-outline"],["name","email","type","email","placeholder","your@email.com","formControlName","email","required",""],["slot","error",4,"ngIf"],["id","password-fields"],["id","icon","name","bag-outline"],["name","password","type","password","placeholder","Contrase\xf1a","formControlName","password","required",""],["type","submit","id","login-button","type","submit",1,"button"],["slot","error"]],template:function(e,t){1&e&&(o.TgZ(0,"ion-content")(1,"ion-grid")(2,"ion-thumbnail"),o._UZ(3,"img",0),o.qZA(),o.TgZ(4,"form",1),o.NdJ("ngSubmit",function(){return t.login(t.loginForm)}),o.TgZ(5,"ion-item",2)(6,"ion-row"),o._UZ(7,"ion-icon",3)(8,"ion-input",4),o.qZA(),o.YNc(9,v,2,0,"span",5),o.YNc(10,P,2,0,"span",5),o.qZA(),o.TgZ(11,"ion-item",6)(12,"ion-row"),o._UZ(13,"ion-icon",7)(14,"ion-input",8),o.qZA(),o.YNc(15,L,2,0,"span",5),o.YNc(16,Z,2,0,"span",5),o.YNc(17,A,2,0,"span",5),o.qZA(),o.TgZ(18,"button",9),o._uU(19,"ENTRAR"),o.qZA()()()()),2&e&&(o.xp6(4),o.Q6J("formGroup",t.loginForm),o.xp6(5),o.Q6J("ngIf",(null==t.loginForm.controls.email.errors?null:t.loginForm.controls.email.errors.required)&&(null==t.loginForm.controls.email?null:t.loginForm.controls.email.touched)),o.xp6(1),o.Q6J("ngIf",(null==t.loginForm.controls.email.errors?null:t.loginForm.controls.email.errors.pattern)&&(null==t.loginForm.controls.email?null:t.loginForm.controls.email.touched)),o.xp6(5),o.Q6J("ngIf",(null==t.loginForm.controls.password.errors?null:t.loginForm.controls.password.errors.required)&&(null==t.loginForm.controls.password?null:t.loginForm.controls.password.touched)),o.xp6(1),o.Q6J("ngIf",(null==t.loginForm.controls.password.errors?null:t.loginForm.controls.password.errors.minlength)&&t.loginForm.controls.password.touched),o.xp6(1),o.Q6J("ngIf",null==t.loginForm.controls.password.errors?null:t.loginForm.controls.password.errors.maxlength))},directives:[a.W2,a.jY,a.Bs,r._Y,r.JL,r.sg,a.Ie,a.Nd,a.gu,a.pK,a.j9,r.JJ,r.u,r.Q7,u.O5],styles:["ion-content[_ngcontent-%COMP%]{--offset-bottom: auto !important;--overflow: hidden;overflow:auto}ion-content[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}ion-thumbnail[_ngcontent-%COMP%]{margin:50px auto 25px;width:200px;height:191px}#icon[_ngcontent-%COMP%]{font-size:40px;margin-top:10px;padding-top:30px}ion-input[_ngcontent-%COMP%]{font-size:25px;margin-left:50px;margin-top:40px}#forgot-password-text[_ngcontent-%COMP%]{color:#000;display:block;text-align:center;margin-top:40px}#login-button[_ngcontent-%COMP%]{width:90%;height:70px;margin-left:auto;margin-right:auto;font-size:40px;display:block;font-family:Outfit,sans-serif;background-color:#006aab;color:#fff;margin-top:60px;border-radius:10px}"]}),n})()}];let w=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[[s.Bz.forChild(b)],s.Bz]}),n})(),y=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[[u.ez,r.u5,a.Pc,w,r.u5,r.UX]]}),n})()}}]);