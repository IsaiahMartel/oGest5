"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7400],{7400:(j,d,c)=>{c.r(d),c.d(d,{InstrumentsPageModule:()=>U});var l=c(9808),p=c(2382),a=c(5636),u=c(4800),t=c(4893),_=c(8871),m=c(4158),f=c(2852),g=c(5628);function h(n,o){1&n&&t._UZ(0,"ion-icon",9)}function y(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"div",6)(1,"h2",7),t.NdJ("click",function(){return t.CHM(e),t.oxw().showPercussion=!1}),t._uU(2,"PERCUSI\xd3N"),t.qZA(),t.TgZ(3,"div",3),t.NdJ("click",function(){return t.CHM(e),t.oxw().showPercussion=!0}),t.YNc(4,h,1,0,"ion-icon",8),t.qZA()()}if(2&n){const e=t.oxw();t.xp6(4),t.Q6J("ngIf",0==e.showPercussion)}}function v(n,o){if(1&n&&(t.TgZ(0,"ion-card")(1,"ion-card-header")(2,"h2"),t._uU(3),t.qZA(),t.TgZ(4,"h2"),t._uU(5),t.qZA()()()),2&n){const e=t.oxw().$implicit;t.xp6(3),t.Oqu(e.instrumentName),t.xp6(2),t.Oqu(e.instrumentName2)}}function I(n,o){if(1&n&&(t.TgZ(0,"div",10),t.YNc(1,v,6,2,"ion-card",11),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",1==e.showPercussion)}}function x(n,o){1&n&&t._UZ(0,"ion-icon",12)}function P(n,o){1&n&&t._UZ(0,"ion-icon",9)}function T(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"div",6)(1,"h2",7),t.NdJ("click",function(){return t.CHM(e),t.oxw().showKeyboard=!1}),t._uU(2,"TECLADO"),t.qZA(),t.TgZ(3,"div",3),t.NdJ("click",function(){return t.CHM(e),t.oxw().showKeyboard=!0}),t.YNc(4,P,1,0,"ion-icon",8),t.qZA()()}if(2&n){const e=t.oxw();t.xp6(4),t.Q6J("ngIf",0==e.showKeyboard)}}function Z(n,o){if(1&n&&(t.TgZ(0,"ion-card")(1,"ion-card-header")(2,"h2"),t._uU(3),t.qZA(),t.TgZ(4,"h2"),t._uU(5),t.qZA()()()),2&n){const e=t.oxw().$implicit;t.xp6(3),t.Oqu(e.instrumentName),t.xp6(2),t.Oqu(e.instrumentName2)}}function N(n,o){if(1&n&&(t.TgZ(0,"div",10),t.YNc(1,Z,6,2,"ion-card",11),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",1==e.showKeyboard)}}function A(n,o){1&n&&t._UZ(0,"ion-icon",12)}function w(n,o){1&n&&t._UZ(0,"ion-icon",9)}function k(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"div",6)(1,"h2",7),t.NdJ("click",function(){return t.CHM(e),t.oxw().showVoice=!1}),t._uU(2,"VOCES"),t.qZA(),t.TgZ(3,"div",3),t.NdJ("click",function(){return t.CHM(e),t.oxw().showVoice=!0}),t.YNc(4,w,1,0,"ion-icon",8),t.qZA()()}if(2&n){const e=t.oxw();t.xp6(4),t.Q6J("ngIf",0==e.showVoice)}}function J(n,o){if(1&n&&(t.TgZ(0,"ion-card")(1,"ion-card-header")(2,"h2"),t._uU(3),t.qZA(),t.TgZ(4,"h2"),t._uU(5),t.qZA()()()),2&n){const e=t.oxw().$implicit;t.xp6(3),t.hij("",e.instrumentName," "),t.xp6(2),t.hij("",e.instrumentName2," ")}}function b(n,o){if(1&n&&(t.TgZ(0,"div",10),t.YNc(1,J,6,2,"ion-card",11),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",1==e.showVoice)}}function Y(n,o){1&n&&t._UZ(0,"ion-icon",12)}function M(n,o){1&n&&(t.TgZ(0,"h1",13),t._uU(1," No hay instrumentos extras "),t.qZA())}const O=[{path:"",component:(()=>{class n{constructor(e,s,i,r,Q,q){this.playlistService=e,this.activatedRoute=s,this.alertController=i,this.storage=r,this.checkDataService=Q,this.projectIdService=q,this.playlistArray=[],this.showPercussion=!1,this.showVoice=!1,this.showKeyboard=!1,this.noPercussion=!0,this.noVoice=!0,this.noKeyboard=!0,this.perArray=[],this.keyArray=[],this.voiArray=[]}ngOnInit(){this.loadInfo()}loadInfo(){this.projectId=this.projectIdService.projectId,this.checkDataService.checkPlaylistLocal(),this.checkDataService.playlistObs.subscribe(e=>{Object.values(e).filter(i=>{i.project_id==this.projectId&&(null!=i.perplaylists||null!=i.voiplaylists||null!=i.keyplaylists)&&this.playlistArray.push(i)});for(let i of this.playlistArray){for(let r in i.perplaylists)(null!=i.perplaylists[r].instrumentName||null!=i.perplaylists[r].instrumentName2)&&(this.noPercussion=!1,(!this.perArray.includes(i.perplaylists[r].instrumentName)||!this.perArray.includes(i.perplaylists[r].instrumentName2))&&this.perArray.push(i.perplaylists[r]));for(let r in i.keyplaylists)(null!=i.keyplaylists[r].instrumentName||null!=i.keyplaylists[r].instrumentName2)&&(this.noKeyboard=!1,(!this.perArray.includes(i.keyplaylists[r].instrumentName)||!this.perArray.includes(i.keyplaylists[r].instrumentName2))&&this.keyArray.push(i.keyplaylists[r]));for(let r in i.voiplaylists)(null!=i.voiplaylists[r].instrumentName||null!=i.voiplaylists[r].instrumentName2)&&(this.noVoice=!1,(!this.voiArray.includes(i.voiplaylists[r].instrumentName)||!this.voiArray.includes(i.voiplaylists[r].instrumentName2))&&this.voiArray.push(i.voiplaylists[r]))}})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(_.c),t.Y36(u.gz),t.Y36(a.Br),t.Y36(m.Ke),t.Y36(f.j),t.Y36(g.W))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-instruments"]],decls:14,vars:10,consts:[["has-header",""],["class","ion-text-center border ion-margin-top",4,"ngIf"],["id","container",4,"ngFor","ngForOf"],["id","dropdown-button",3,"click"],["name","caret-up-outline",4,"ngIf"],["class","ion-text-center ",4,"ngIf"],[1,"ion-text-center","border","ion-margin-top"],[3,"click"],["name","caret-down-outline",4,"ngIf"],["name","caret-down-outline"],["id","container"],[4,"ngIf"],["name","caret-up-outline"],[1,"ion-text-center"]],template:function(e,s){1&e&&(t.TgZ(0,"ion-content",0),t.YNc(1,y,5,1,"div",1),t.YNc(2,I,2,1,"div",2),t.TgZ(3,"div",3),t.NdJ("click",function(){return s.showPercussion=!1}),t.YNc(4,x,1,0,"ion-icon",4),t.qZA(),t.YNc(5,T,5,1,"div",1),t.YNc(6,N,2,1,"div",2),t.TgZ(7,"div",3),t.NdJ("click",function(){return s.showKeyboard=!1}),t.YNc(8,A,1,0,"ion-icon",4),t.qZA(),t.YNc(9,k,5,1,"div",1),t.YNc(10,b,2,1,"div",2),t.TgZ(11,"div",3),t.NdJ("click",function(){return s.showVoice=!1}),t.YNc(12,Y,1,0,"ion-icon",4),t.qZA(),t.YNc(13,M,2,0,"h1",5),t.qZA()),2&e&&(t.xp6(1),t.Q6J("ngIf",0==s.noPercussion),t.xp6(1),t.Q6J("ngForOf",s.perArray),t.xp6(2),t.Q6J("ngIf",1==s.showPercussion),t.xp6(1),t.Q6J("ngIf",0==s.noKeyboard),t.xp6(1),t.Q6J("ngForOf",s.keyArray),t.xp6(2),t.Q6J("ngIf",1==s.showKeyboard),t.xp6(1),t.Q6J("ngIf",0==s.noVoice),t.xp6(1),t.Q6J("ngForOf",s.voiArray),t.xp6(2),t.Q6J("ngIf",1==s.showVoice),t.xp6(1),t.Q6J("ngIf",0==s.playlistArray.length))},directives:[a.W2,l.O5,a.gu,l.sg,a.PM,a.Zi],styles:["ion-content[_ngcontent-%COMP%]{--offset-bottom: auto!important;--overflow: hidden;overflow:auto}ion-content[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}ion-card[_ngcontent-%COMP%]{border-radius:0;background-color:#fff;border:1px solid #006aab;text-align:center}#separation-title[_ngcontent-%COMP%]{background-color:#006aab}#dropdown-button[_ngcontent-%COMP%]{border-top:1px solid #c9c8c8;text-align:center;font-size:2em;background-color:#ececec}.border[_ngcontent-%COMP%]{border:1px solid black}"]}),n})()}];let C=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[u.Bz.forChild(O)],u.Bz]}),n})(),U=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[l.ez,p.u5,a.Pc,C]]}),n})()}}]);