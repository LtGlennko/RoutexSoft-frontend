(function(e){function t(t){for(var r,a,c=t[0],s=t[1],u=t[2],l=0,d=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={app:0},o={app:0},i=[];function c(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-2d0cc1ed":"caea49dc","chunk-2d21f0a0":"140a9b7d","chunk-2d2380f6":"27322acb","chunk-cf4e9296":"6b05a63a","chunk-4473b66c":"7df46975","chunk-71aeedd6":"79b8481a","chunk-353d9119":"ae869368","chunk-5d2173b2":"e55bcb9d"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-cf4e9296":1,"chunk-4473b66c":1,"chunk-71aeedd6":1,"chunk-353d9119":1,"chunk-5d2173b2":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d0cc1ed":"31d6cfe0","chunk-2d21f0a0":"31d6cfe0","chunk-2d2380f6":"31d6cfe0","chunk-cf4e9296":"c66f71f0","chunk-4473b66c":"b53b4043","chunk-71aeedd6":"1bbe978d","chunk-353d9119":"b73bfec2","chunk-5d2173b2":"05cd58d4"}[e]+".css",o=s.p+r,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var u=i[c],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===o))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){u=d[c],l=u.getAttribute("data-href");if(l===r||l===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[e],f.parentNode.removeChild(f),n(i)},f.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=c(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,n[1](d)}o[e]=void 0}};var f=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var f=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0035":function(e,t,n){},"17ff":function(e,t,n){"use strict";var r=n("0035"),a=n.n(r);a.a},"1e40":function(e,t,n){"use strict";var r=n("8b98"),a=n.n(r);a.a},"3dfc":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-navigation-drawer",{attrs:{app:"",permanent:""}},[n("v-list-item",{staticClass:"content_Title"},[n("v-list-item-content",[n("v-list-item-title",{staticClass:"title"},[e._v("RoutEx - Soft")])],1)],1),n("v-divider"),n("v-list",{attrs:{nav:""}},[n("v-list-item-group",{model:{value:e.item,callback:function(t){e.item=t},expression:"item"}},["Gerente"===e.user1?n("ul",e._l(e.optionManager,(function(t,r){return n("v-list-item",{key:r,attrs:{to:t.to}},[n("v-list-item-icon",[n("v-icon",{domProps:{textContent:e._s(t.icon)}})],1),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:e._s(t.text)}})],1)],1)})),1):e._e(),"Administrador"===e.user1?n("ul",e._l(e.optionAdministrator,(function(t,r){return n("v-list-item",{key:r,attrs:{to:t.to}},[n("v-list-item-icon",[n("v-icon",{domProps:{textContent:e._s(t.icon)}})],1),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:e._s(t.text)}})],1)],1)})),1):e._e(),"Registrador"===e.user1?n("ul",e._l(e.optionRegistrar,(function(t,r){return n("v-list-item",{key:r,attrs:{to:t.to}},[n("v-list-item-icon",[n("v-icon",{domProps:{textContent:e._s(t.icon)}})],1),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:e._s(t.text)}})],1)],1)})),1):e._e()])],1)],1)},a=[],o={name:"sidebar",props:{rol:String},data:function(){return{user1:"Administrador",item:0,optionAdministrator:[{text:"Gestionar Usuarios",icon:"mdi-account-circle",to:"/ManageUsers"},{text:"Gestionar Almacenes",icon:"mdi-store",to:"/ManageWarehouses"},{text:"Gestionar Planes de Vuelo",icon:"mdi-airplane",to:"/ManageFlightPlans"},{text:"Configurar Parametros",icon:"mdi-brightness-7",to:"/ConfigureParameters"}],optionRegistrar:[{text:"Crear Envios",icon:"mdi-send",to:"/ManageUsers"},{text:"Paquetes",icon:"mdi-package-variant",to:"/ManageUsers"},{text:"Clientes",icon:"mdi-account-box",to:"/ManageUsers"}],optionManager:[{text:"Cargar Historial",icon:"mdi-upload",to:"/ManageUsers"},{text:"Simulacion",icon:"mdi-account-multiple",to:"/ManageUsers"},{text:"Reporte Rutas",icon:"mdi-chart-areaspline",to:"/ManageUsers"},{text:"Reporte Paquetes",icon:"mdi-chart-bar",to:"/ManageUsers"}]}},actions:{setRole:function(e,t){console.log("Se dara el rooool"),props.rol=t}}},i=o,c=(n("1e40"),n("2877")),s=n("6544"),u=n.n(s),l=n("ce7e"),d=n("132d"),f=n("8860"),p=n("da13"),m=n("5d23"),h=n("1baa"),v=n("34c3"),g=n("f774"),b=Object(c["a"])(i,r,a,!1,null,"0ceff41c",null);t["a"]=b.exports;u()(b,{VDivider:l["a"],VIcon:d["a"],VList:f["a"],VListItem:p["a"],VListItemContent:m["a"],VListItemGroup:h["a"],VListItemIcon:v["a"],VListItemTitle:m["b"],VNavigationDrawer:g["a"]})},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],i={name:"App"},c=i,s=n("2877"),u=Object(s["a"])(c,a,o,!1,null,null,null),l=u.exports,d=(n("d3b7"),n("8c4f")),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"principal"}},[n("headerBar"),n("sidebar"),n("v-content",[n("v-fade-transition",{attrs:{mode:"out-in"}},[n("router-view")],1)],1)],1)},p=[],m=n("3dfc"),h=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-app-bar",{staticClass:"v-appBar"},[r("v-spacer"),r("img",{staticClass:"img-fluid smile_face",attrs:{src:n("74a7"),alt:""}}),r("v-toolbar-title",[e._v(" GLENN LOZANO TAPIA "),r("div",{staticClass:"cargo"},[e._v(" ADMINISTRADOR ")])]),r("v-btn",{attrs:{icon:""}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-logout")]),e._v(" Salir ")],1)],1)],1)},v=[],g={name:"headerBar",methods:{}},b=g,k=(n("17ff"),n("6544")),_=n.n(k),x=n("40dc"),y=n("8336"),P=n("132d"),C=n("2fa4"),w=n("2a7f"),M=Object(s["a"])(b,h,v,!1,null,"0fd668ce",null),A=M.exports;_()(M,{VAppBar:x["a"],VBtn:y["a"],VIcon:P["a"],VSpacer:C["a"],VToolbarTitle:w["a"]});var O={name:"Principal",components:{sidebar:m["a"],headerBar:A}},S=O,V=(n("7941"),n("a75b")),E=n("0789"),j=Object(s["a"])(S,f,p,!1,null,"5f1fef06",null),L=j.exports;_()(j,{VContent:V["a"],VFadeTransition:E["c"]}),r["a"].use(d["a"]);var T=[{path:"/Principal",name:"Principal",component:L,children:[{path:"/ManageUsers",name:"ManageUsers",component:function(){return Promise.all([n.e("chunk-cf4e9296"),n.e("chunk-71aeedd6"),n.e("chunk-5d2173b2")]).then(n.bind(null,"46a2"))}},{path:"/ManageWarehouses",name:"ManageWarehouses",component:function(){return n.e("chunk-2d2380f6").then(n.bind(null,"fe89"))}},{path:"/ManageFlightPlans",name:"ManageFlightPlans",component:function(){return n.e("chunk-2d21f0a0").then(n.bind(null,"d7b9"))}},{path:"/ConfigureParameters",name:"ConfigureParameters",component:function(){return n.e("chunk-2d0cc1ed").then(n.bind(null,"4d29"))}},{path:"/SelectClients",name:"SelectClients",component:function(){return Promise.all([n.e("chunk-cf4e9296"),n.e("chunk-71aeedd6"),n.e("chunk-353d9119")]).then(n.bind(null,"dc2f"))}}]},{path:"/Login",name:"Login",component:function(){return Promise.all([n.e("chunk-cf4e9296"),n.e("chunk-4473b66c")]).then(n.bind(null,"de64"))}}],F=new d["a"]({mode:"history",base:"/",routes:T}),I=F,U=n("2f62");r["a"].use(U["a"]);var B=new U["a"].Store({state:{},mutations:{},actions:{},modules:{}}),N=n("f309");r["a"].use(N["a"]);var R=new N["a"]({theme:{options:{customProperties:!0},themes:{light:{primary:"#ee44aa",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}}});r["a"].config.productionTip=!1,new r["a"]({router:I,store:B,vuetify:R,render:function(e){return e(l)}}).$mount("#app")},"6ecd":function(e,t,n){},"74a7":function(e,t,n){e.exports=n.p+"img/smile_face.80345cb5.png"},7941:function(e,t,n){"use strict";var r=n("6ecd"),a=n.n(r);a.a},"8b98":function(e,t,n){}});
//# sourceMappingURL=app.96059107.js.map