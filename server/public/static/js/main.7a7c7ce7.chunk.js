(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{171:function(e,t,a){},231:function(e,t,a){e.exports=a(417)},236:function(e,t,a){},238:function(e,t,a){},240:function(e,t,a){},389:function(e,t){},392:function(e,t,a){},393:function(e,t,a){},413:function(e,t,a){},414:function(e,t,a){e.exports=a.p+"static/media/cancel.fbd28b8b.jpg"},415:function(e,t,a){},417:function(e,t,a){"use strict";a.r(t);var n,r,s,i,o,c,l,u,h,m,p,f,g,d,b=a(0),v=a.n(b),y=a(38),k=a.n(y),O=(a(236),a(30)),E=a(36),w=a(19),j=a(20),N=a(26),S=(a(111),a(10)),x={home:{logout:"Logout",typeMessagePlaceholder:"Type a message",searchPlaceholder:"Search..."},login:{email:"Email",password:"Password",enterEmail:"Enter Email",submit:"Submit",gotoRegistration:"Create an Account"},register:{firstName:"First Name",lastName:"Last Name",gotoLogin:"Already have an account? Sign in"}},C={},M=(n=function(){function e(){Object(w.a)(this,e),Object(E.a)(this,"type",r,this),Object(E.a)(this,"translation",s,this)}return Object(j.a)(e,[{key:"changeTranslations",value:function(e){this.type=e}},{key:"getTranslation",value:function(e,t){var a=t?"?".concat(e,"-").concat(t,"?"):"?".concat(e,"?");if(e&&t&&this.translation[this.type]&&this.translation[this.type][e]&&this.translation[this.type][e][t]){var n=this.translation[this.type][e][t];if("string"===typeof n)return n}else{if(e&&t)return a;if(e){t=e;var r=this.translation[this.type][t];if(r&&"string"===typeof r)return r;for(var s in this.translation[this.type]){var i=this.translation[this.type][s];if("object"===typeof i&&t in i&&"string"===typeof i[t])return i[t]}}}return a}}]),e}(),r=Object(N.a)(n.prototype,"type",[S.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"en-CA"}}),s=Object(N.a)(n.prototype,"translation",[S.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return{"en-CA":x,"fr-CA":C}}}),Object(N.a)(n.prototype,"changeTranslations",[S.d],Object.getOwnPropertyDescriptor(n.prototype,"changeTranslations"),n.prototype),n),T=a(222),A=a(45),P=(i=function(){function e(){Object(w.a)(this,e),Object(E.a)(this,"id",o,this),Object(E.a)(this,"email",c,this),Object(E.a)(this,"token",l,this),Object(E.a)(this,"firstName",u,this),Object(E.a)(this,"lastName",h,this),this.nonObservableToken=null,this.cookies=null,this.cookies=new T.a;var t=this.cookies.get("token");this.token=t,this.nonObservableToken=t,this.id=this.cookies.get("id"),this.email=this.cookies.get("email"),this.firstName=this.cookies.get("firstName"),this.lastName=this.cookies.get("lastName")}return Object(j.a)(e,[{key:"storeAuthentication",value:function(e){for(var t in this.nonObservableToken=e.token,e)this[t]=e[t],this.cookies.set(t,e[t],{path:"/",maxAge:A.cookieMaxAge})}},{key:"refreshAuthentication",value:function(){this.token=null,this.cookies.remove("token"),this.id=null,this.cookies.remove("id"),this.email=null,this.cookies.remove("email"),this.firstName=null,this.cookies.remove("firstName"),this.lastName=null,this.cookies.remove("lastName")}}]),e}(),o=Object(N.a)(i.prototype,"id",[S.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),c=Object(N.a)(i.prototype,"email",[S.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),l=Object(N.a)(i.prototype,"token",[S.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),u=Object(N.a)(i.prototype,"firstName",[S.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),h=Object(N.a)(i.prototype,"lastName",[S.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),Object(N.a)(i.prototype,"storeAuthentication",[S.d],Object.getOwnPropertyDescriptor(i.prototype,"storeAuthentication"),i.prototype),Object(N.a)(i.prototype,"refreshAuthentication",[S.d],Object.getOwnPropertyDescriptor(i.prototype,"refreshAuthentication"),i.prototype),i),U=(m=function(){function e(){Object(w.a)(this,e),Object(E.a)(this,"messages",p,this)}return Object(j.a)(e,[{key:"storeMessage",value:function(e){this.messages=e}}]),e}(),p=Object(N.a)(m.prototype,"messages",[S.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return{}}}),Object(N.a)(m.prototype,"storeMessage",[S.d],Object.getOwnPropertyDescriptor(m.prototype,"storeMessage"),m.prototype),m),D=a(99),L=a(28),R=a(27),z=a(29),I=a(198),W=a.n(I),X=(a(238),function(e){return v.a.createElement("label",{className:"translation-switch-container"},v.a.createElement("span",null,e.label),v.a.createElement(W.a,{className:"translation-switch",checked:e.checked,onChange:e.handleChange,onColor:"#86d3ff",offColor:"#86d3ff",handleDiameter:25,uncheckedIcon:!1,checkedIcon:!1,boxShadow:"0px 1px 5px rgba(0, 0, 0, 0.6)",activeBoxShadow:"0px 0px 1px 10px rgba(0, 0, 0, 0.2)",height:20,width:48}))}),G=Object(O.b)(function(e){return{translation:e.translation}})(f=Object(O.c)(f=function(e){function t(e){var a;return Object(w.a)(this,t),(a=Object(L.a)(this,Object(R.a)(t).call(this,e))).state={checked:!1},a}return Object(z.a)(t,e),Object(j.a)(t,[{key:"handleChange",value:function(){var e=this,t=this.props.translation;this.setState({checked:!this.state.checked},function(){e.state.checked?t.changeTranslations("fr-CA"):t.changeTranslations("en-CA")})}},{key:"render",value:function(){var e=this.props.translation;return v.a.createElement(X,{label:e.type,checked:this.state.checked,handleChange:this.handleChange.bind(this)})}}]),t}(b.Component))||f)||f,_=a(49),q=a(18),B=a.n(q),F=a(25),H=function(){function e(){Object(w.a)(this,e)}return Object(j.a)(e,null,[{key:"getRandomNumber",value:function(e,t){return Math.ceil(Math.random()*(t+1-e))}},{key:"decorateWithMobX",value:function(e){return Object(O.b)("message","authentication","translation")(Object(O.c)(function(t){return e(t)}))}}]),e}(),J=a(424),V=a(425),K=a(204),$=a(429),Q=a(418),Y=a(431),Z=(a(240),H.decorateWithMobX(function(e){return v.a.createElement(Y.a,{style:{visibility:e.show?"visible":"hidden"},compact:!0,className:"notify",floating:!0,content:e.message})})),ee=(a(171),H.decorateWithMobX(function(e){var t=e.translation;return v.a.createElement(J.a,null,v.a.createElement(Z,{show:e.showNotify,message:e.message}),v.a.createElement(V.a,{className:"justify-content-md-center login-container"},v.a.createElement(K.a,{md:4},v.a.createElement($.a,{onSubmit:e.onSubmit},v.a.createElement($.a.Group,{controlId:"email"},v.a.createElement($.a.Label,null,t.getTranslation("email")),v.a.createElement($.a.Control,{type:"email",placeholder:t.getTranslation("enterEmail")})),v.a.createElement($.a.Group,{controlId:"password"},v.a.createElement($.a.Label,null,t.getTranslation("password")),v.a.createElement($.a.Control,{type:"password",placeholder:t.getTranslation("password")})),v.a.createElement(Q.a,{type:"submit",loading:e.formSubmitted,primary:!0},t.getTranslation("submit")),v.a.createElement($.a.Text,{className:"text-muted authentication-link"},v.a.createElement("a",{href:"/register"},t.getTranslation("gotoRegistration")))))))})),te=H.decorateWithMobX(function(e){var t=e.translation;return v.a.createElement(J.a,null,v.a.createElement(Z,{show:e.showNotify,message:e.message}),v.a.createElement(V.a,{className:"justify-content-md-center register-container"},v.a.createElement(K.a,{md:4},v.a.createElement($.a,{onSubmit:e.onSubmit},v.a.createElement($.a.Group,{controlId:"email"},v.a.createElement($.a.Label,null,t.getTranslation("email")),v.a.createElement($.a.Control,{type:"email",placeholder:t.getTranslation("enterEmail")})),v.a.createElement($.a.Group,{controlId:"password"},v.a.createElement($.a.Label,null,t.getTranslation("password")),v.a.createElement($.a.Control,{type:"password",placeholder:t.getTranslation("password")})),v.a.createElement($.a.Group,{controlId:"firstName"},v.a.createElement($.a.Label,null,t.getTranslation("firstName")),v.a.createElement($.a.Control,{type:"text",placeholder:t.getTranslation("firstName")})),v.a.createElement($.a.Group,{controlId:"lastName"},v.a.createElement($.a.Label,null,t.getTranslation("lastName")),v.a.createElement($.a.Control,{type:"text",placeholder:t.getTranslation("lastName")})),v.a.createElement(Q.a,{type:"submit",loading:e.formSubmitted,primary:!0},t.getTranslation("submit")),v.a.createElement($.a.Text,{className:"text-muted authentication-link"},v.a.createElement("a",{href:"/login"},t.getTranslation("gotoLogin")))))))}),ae=a(207),ne=a.n(ae),re=function(){function e(){Object(w.a)(this,e)}return Object(j.a)(e,null,[{key:"request",value:function(e){var t=e.method,a=e.url,n=e.data,r=e.token,s={method:t,url:"".concat(A.restApiEndpoint,"/").concat(a)};return r&&(s.headers={authorization:"Bearer ".concat(r)}),n&&(s.data=n),ne()(s)}},{key:"post",value:function(e){var t=e.url,a=e.data,n=e.token;return this.request({method:"POST",url:t,data:a,token:n})}},{key:"get",value:function(e){var t=e.url,a=e.data,n=e.token;return this.request({method:"GET",url:t,data:a,token:n})}}]),e}(),se=function(e){function t(){return Object(w.a)(this,t),Object(L.a)(this,Object(R.a)(t).apply(this,arguments))}return Object(z.a)(t,e),Object(j.a)(t,null,[{key:"parseFormData",value:function(e){var t=e.elements,a={},n=!0,r=!1,s=void 0;try{for(var i,o=t[Symbol.iterator]();!(n=(i=o.next()).done);n=!0){var c=i.value,l=c.id,u=c.value;l&&(a[l]=u)}}catch(h){r=!0,s=h}finally{try{n||null==o.return||o.return()}finally{if(r)throw s}}return a}},{key:"login",value:function(e){var t=this.parseFormData(e);return this.post({url:"login",data:t})}},{key:"register",value:function(e){var t=this.parseFormData(e);return this.post({url:"register",data:t})}},{key:"logout",value:function(e){return this.post({url:"logout",token:e})}}]),t}(re),ie=function(e){function t(){return Object(w.a)(this,t),Object(L.a)(this,Object(R.a)(t).apply(this,arguments))}return Object(z.a)(t,e),Object(j.a)(t,null,[{key:"search",value:function(){var e=Object(F.a)(B.a.mark(function e(t,a){var n,r,s,i;return B.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={url:"api/search/user",token:a,data:{query:{bool:{should:[{match_phrase_prefix:{firstName:t}},{match_phrase_prefix:{lastName:t}}]}}}},e.next=3,this.post(n);case 3:return r=e.sent,s=r.data.body.hits.hits,i=s.map(function(e){return e._source}),e.abrupt("return",i);case 7:case"end":return e.stop()}},e,this)}));return function(t,a){return e.apply(this,arguments)}}()}]),t}(re),oe=function(e){function t(){return Object(w.a)(this,t),Object(L.a)(this,Object(R.a)(t).apply(this,arguments))}return Object(z.a)(t,e),Object(j.a)(t,null,[{key:"getConversation",value:function(){var e=Object(F.a)(B.a.mark(function e(t,a,n,r){var s;return B.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.get({url:"api/conversation?with=".concat(t,"&page=").concat(a,"&limit=").concat(n),token:r});case 2:return s=e.sent,e.abrupt("return",s&&s.data&&s.data.items);case 4:case"end":return e.stop()}},e,this)}));return function(t,a,n,r){return e.apply(this,arguments)}}()},{key:"sendMessage",value:function(e,t){return this.post({url:"api/message",data:e,token:t})}}]),t}(re),ce=Object(O.b)("authentication")(g=Object(O.c)(g=function(e){function t(e){var a;return Object(w.a)(this,t),(a=Object(L.a)(this,Object(R.a)(t).call(this,e))).state={formSubmitted:!1,showNotify:!1,message:""},a}return Object(z.a)(t,e),Object(j.a)(t,[{key:"showNotification",value:function(e,t){var a=this;this.setState({showNotify:!0,formSubmitted:!1,message:e},function(){var e=setTimeout(function(){a.setState({showNotify:!1,message:""})},3e3);"function"===typeof t&&(clearTimeout(e),t())})}},{key:"storeAuthentication",value:function(e){var t=e.data;this.props.authentication.storeAuthentication(t)}},{key:"authenticate",value:function(){var e=Object(F.a)(B.a.mark(function e(t){var a,n,r=this;return B.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.props.register){e.next=8;break}return e.next=3,se.register(t);case 3:a=e.sent,this.storeAuthentication(a),this.showNotification("Registration successful!",function(){setTimeout(function(){r.props.history.push("/home")},1e3)}),e.next=13;break;case 8:return e.next=10,se.login(t);case 10:n=e.sent,this.storeAuthentication(n),this.showNotification("Login successful!",function(){setTimeout(function(){r.props.history.push("/home")},700)});case 13:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"onSubmit",value:function(e){var t=this;if(!0!==this.state.formSubmitted){e.preventDefault();var a=e.target;this.setState({formSubmitted:!0},Object(F.a)(B.a.mark(function e(){return B.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.authenticate(a);case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),t.showNotification(e.t0.message);case 8:case"end":return e.stop()}},e,null,[[0,5]])})))}}},{key:"render",value:function(){return this.props.register?v.a.createElement(te,{message:this.state.message,showNotify:this.state.showNotify,formSubmitted:this.state.formSubmitted,onSubmit:this.onSubmit.bind(this)}):v.a.createElement(ee,{message:this.state.message,showNotify:this.state.showNotify,formSubmitted:this.state.formSubmitted,onSubmit:this.onSubmit.bind(this)})}}]),t}(b.Component))||g)||g,le=Object(_.g)(ce),ue=a(210),he=a(107),me=a(211),pe=a.n(me),fe=a(430),ge=a(426),de=a(427),be=(a(392),H.decorateWithMobX(function(e){var t="medium"===e.size?"medium":"small";return v.a.createElement("div",{className:"avatar-container avatar-".concat(t)},e.firstLetter)})),ve=(a(393),H.decorateWithMobX(function(e){var t=e.translation,a=e.user,n=e.recipient,r=e.selectedUsers,s=e.messages,i=e.onLogout,o=e.onSendMessage;return v.a.createElement(J.a,{className:"home-container"},v.a.createElement(V.a,{className:"profile-tab user-profile-tab"},v.a.createElement(K.a,{className:"profile-avatar"},v.a.createElement(be,{firstLetter:a.firstName[0].toUpperCase()})),v.a.createElement(fe.a,{labeled:!0,button:!0,icon:"setting"},v.a.createElement(fe.a.Menu,null,v.a.createElement(fe.a.Item,{onClick:i,text:t.getTranslation("logout")})))),v.a.createElement(V.a,{className:"row-container"},v.a.createElement(K.a,{className:"scrollable user-container",xs:3},v.a.createElement(V.a,{className:"user-search"},v.a.createElement(K.a,null,v.a.createElement(fe.a,{onSearchChange:e.onUserSearch,onChange:e.onUserDropdownOptionSelect,placeholder:t.getTranslation("searchPlaceholder"),fluid:!0,search:!0,selection:!0,value:"",options:e.userDropdownOptions,loading:e.userSearchLoading}))),r),v.a.createElement(K.a,{className:"message-container",xs:9},n&&v.a.createElement(V.a,{className:"profile-tab chat-profile-tab"},v.a.createElement(K.a,null,v.a.createElement(be,{firstLetter:n.firstName[0].toUpperCase()}))),n&&v.a.createElement(V.a,{onScroll:e.onMessageScroll,className:"scrollable messages"},v.a.createElement(K.a,null,v.a.createElement(ge.a,{className:"message-loader",active:e.loaderActive}),s)),n&&v.a.createElement(V.a,{className:"send-message"},v.a.createElement(K.a,null,v.a.createElement(de.a,{onKeyDown:o,className:"message-input",size:"mini",placeholder:t.getTranslation("typeMessagePlaceholder")}))))))})),ye=(a(413),H.decorateWithMobX(function(e){var t=e.user,n="".concat(t.firstName," ").concat(t.lastName);return n.length>15&&(n="".concat(n.substring(0,15),"...")),v.a.createElement(V.a,{style:{backgroundColor:e.selected?"#f7f7f7":"white"},className:"user-card-container"},v.a.createElement(K.a,null,v.a.createElement("div",{onClick:function(){return e.onClick(t.email)},className:"user-card"},v.a.createElement(be,{firstLetter:n[0].toUpperCase(),size:"medium"}),v.a.createElement("div",{className:"user-card-text-group"},v.a.createElement("h1",null," ",n," ")),v.a.createElement("img",{onClick:function(a){a.stopPropagation(),e.onCloseUserCard(t.email)},className:"close-user-card",src:a(414)}))))})),ke=(a(415),function(e){function t(){return Object(w.a)(this,t),Object(L.a)(this,Object(R.a)(t).apply(this,arguments))}return Object(z.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){return v.a.createElement(V.a,null,v.a.createElement("div",{ref:this.props.messageRef,className:this.props.left?"message-card-container-left":"message-card-container-right",xs:1},v.a.createElement(K.a,{className:"message-card ".concat(this.props.left?"message-card-left":"message-card-right")},this.props.username&&v.a.createElement("h6",{className:"message-user"}," ",this.props.username," "),v.a.createElement("p",null,this.props.message,v.a.createElement("small",null,this.props.timestamp)))))}}]),t}(b.Component)),Oe=a(75),Ee=a.n(Oe);function we(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function je(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?we(a,!0).forEach(function(t){Object(ue.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):we(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var Ne=Object(O.b)("authentication")(d=Object(O.c)(d=function(e){function t(e){var a;return Object(w.a)(this,t),(a=Object(L.a)(this,Object(R.a)(t).call(this,e))).currentPage=0,a.state={messages:[],userDropdownOptions:{},selectedUsers:{},userSearchLoading:!1,recipient:null,loaderActive:!1},a.socket=pe()(A.socketEndpoint),a.socket.on(a.props.authentication.token,function(e){if(e.from!==a.props.authentication.email){var t=Object(he.a)(a.state.messages);t.push(v.a.createElement(ke,{messageRef:a.messageRef,key:Math.random(),message:e.message,timestamp:Ee()().format("hh:mm a"),right:e.from===a.props.authentication.email,left:e.from!==a.props.authentication.email})),a.setMessagesState(t)}}),a}return Object(z.a)(t,e),Object(j.a)(t,[{key:"onLogout",value:function(){var e=Object(F.a)(B.a.mark(function e(){var t;return B.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.authentication,e.prev=1,e.next=4,se.logout(t.token);case 4:t.refreshAuthentication(),e.next=10;break;case 7:throw e.prev=7,e.t0=e.catch(1),e.t0;case 10:case"end":return e.stop()}},e,this,[[1,7]])}));return function(){return e.apply(this,arguments)}}()},{key:"onMessageScroll",value:function(e){var t=this,a=e.target&&e.target.scrollTop;this.scrollHeight=e.target&&e.target.scrollHeight,this.currentPage>0&&0===a&&this.state.recipient&&!this.state.recipient.allMessagesRetrieved&&this.state.messages&&this.state.messages.length>=A.itemsPerPage&&this.setState({loaderActive:!0},Object(F.a)(B.a.mark(function e(){var a;return B.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,oe.getConversation(t.state.recipient.email,++t.currentPage,A.itemsPerPage,t.props.authentication.token);case 3:if(!(a=e.sent)||0!==a.length){e.next=6;break}return e.abrupt("return",t.setState({loaderActive:!1,recipient:je({},t.state.recipient,{allMessagesRetrieved:!0})}));case 6:t.setState({loaderActive:!1},function(){for(var e=Object(he.a)(t.state.messages),n=[],r=a.length-1;r>=0;--r){var s=a[r];t.messageRef=v.a.createRef(),n.push(v.a.createElement(ke,{messageRef:t.messageRef,key:Math.random(),message:s.message,timestamp:Ee()().format("hh:mm a"),right:s.from===t.props.authentication.email,left:s.from!==t.props.authentication.email}))}t.state.recipient&&!t.state.recipient.allMessagesRetrieved&&t.setState({messages:n.concat(e)},function(){t.messageRef.current.scrollIntoView()})}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),t.setState({loaderActive:!1},function(){throw e.t0});case 12:case"end":return e.stop()}},e,null,[[0,9]])})))}},{key:"onUserSearch",value:function(e){var t=this,a=e.currentTarget.value;a&&this.setState({userSearchLoading:!0},Object(F.a)(B.a.mark(function e(){var n,r,s;return B.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.props.authentication,e.prev=1,e.next=4,ie.search(a,n.token);case 4:r=e.sent,s={},r.forEach(function(e){var t=e.email;s[t]=e}),t.setState({userSearchLoading:!1,userDropdownOptions:s}),e.next=14;break;case 10:throw e.prev=10,e.t0=e.catch(1),t.setState({userSearchLoading:!1}),e.t0;case 14:case"end":return e.stop()}},e,null,[[1,10]])})))}},{key:"onUserDropdownOptionSelect",value:function(){var e=Object(F.a)(B.a.mark(function e(t,a){var n,r,s,i,o;return B.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=a.value,"ArrowDown"!==(r=t.key)&&"ArrowUp"!==r&&(s=this.state.userDropdownOptions[n],i=je({},this.state.selectedUsers),o={recipient:s,userDropdownOptions:{}},s.email in this.state.selectedUsers||(i[n]=s,o.selectedUsers=i),this.setMessages(n,o));case 3:case"end":return e.stop()}},e,this)}));return function(t,a){return e.apply(this,arguments)}}()},{key:"onUserClick",value:function(){var e=Object(F.a)(B.a.mark(function e(t){return B.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.setState({recipient:this.state.selectedUsers[t]}),this.setMessages(t);case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"setMessagesState",value:function(e,t){var a=this;this.setState(je({messages:e},t),function(){a.messageRef&&a.messageRef.current&&a.messageRef.current.scrollIntoView()})}},{key:"setMessages",value:function(e,t){var a=this;this.setState({loaderActive:!0},Object(F.a)(B.a.mark(function n(){var r;return B.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,oe.getConversation(e,1,A.itemsPerPage,a.props.authentication.token);case 3:r=n.sent,a.setState({loaderActive:!1},function(){a.currentPage=1;for(var e=[],n=r.length-1;n>=0;--n){var s=r[n];a.messageRef=v.a.createRef(),e.push(v.a.createElement(ke,{messageRef:a.messageRef,key:Math.random(),message:s.message,timestamp:Ee()().format("hh:mm a"),right:s.from===a.props.authentication.email,left:s.from!==a.props.authentication.email}))}a.setMessagesState(e,t)}),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),a.setState({loaderActive:!0},function(){throw n.t0});case 10:case"end":return n.stop()}},n,null,[[0,7]])})))}},{key:"sendMessage",value:function(){var e=Object(F.a)(B.a.mark(function e(t){var a,n;return B.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.currentTarget.value,t.currentTarget.value="",e.prev=2,e.next=5,oe.sendMessage({to:this.state.recipient.email,message:a},this.props.authentication.token);case 5:e.sent.status>=200&&(this.messageRef=v.a.createRef(),(n=Object(he.a)(this.state.messages)).push(v.a.createElement(ke,{messageRef:this.messageRef,key:Math.random(),message:a,timestamp:Ee()().format("hh:mm a"),right:!0})),this.setMessagesState(n)),e.next=12;break;case 9:throw e.prev=9,e.t0=e.catch(2),e.t0;case 12:case"end":return e.stop()}},e,this,[[2,9]])}));return function(t){return e.apply(this,arguments)}}()},{key:"onSendMessage",value:function(e){"Enter"===e.key&&this.sendMessage(e)}},{key:"onCloseUserCard",value:function(e){var t=je({},this.state.selectedUsers);delete t[e];var a=this.state.recipient;a&&"object"===typeof a&&a.email===e&&(a=null,this.currentPage=0),this.setState({selectedUsers:t,recipient:a})}},{key:"render",value:function(){var e=this,t=this.props.authentication,a=t.id,n=t.email,r=t.firstName,s=t.lastName;return v.a.createElement(ve,{user:{id:a,email:n,firstName:r,lastName:s},recipient:this.state.recipient,selectedUsers:Object.keys(this.state.selectedUsers).map(function(t){var a=e.state.selectedUsers[t];return v.a.createElement(ye,{onClick:e.onUserClick.bind(e),key:a.id,user:a,selected:a.email===(e.state.recipient&&e.state.recipient.email),onCloseUserCard:e.onCloseUserCard.bind(e)})}),userDropdownOptions:Object.keys(this.state.userDropdownOptions).map(function(t){var a=e.state.userDropdownOptions[t],n=a.id,r=a.email,s=a.firstName,i=a.lastName;return{key:n,value:r,text:"".concat(s," ").concat(i)}}),userSearchLoading:this.state.userSearchLoading,messages:this.state.messages,onSendMessage:this.onSendMessage.bind(this),onLogout:this.onLogout.bind(this),onUserSearch:this.onUserSearch.bind(this),onUserDropdownOptionSelect:this.onUserDropdownOptionSelect.bind(this),onMessageScroll:this.onMessageScroll.bind(this),loaderActive:this.state.loaderActive})}}]),t}(b.Component))||d)||d,Se=H.decorateWithMobX(function(e){var t=e.authentication;return v.a.createElement(_.d,null,v.a.createElement(_.b,{path:"/login"},v.a.createElement(le,null)),v.a.createElement(_.b,{path:"/register"},v.a.createElement(le,{register:!0})),v.a.createElement(_.b,{path:"/home"},t.token?v.a.createElement(Ne,null):v.a.createElement(_.a,{to:"/login"})),v.a.createElement(_.b,{path:"/"},t.nonObservableToken?v.a.createElement(_.a,{to:"/home"}):v.a.createElement(_.a,{to:"login"})))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(416);k.a.render(v.a.createElement(function(){return v.a.createElement(D.a,null,v.a.createElement(O.a,{message:new U,authentication:new P,translation:new M},v.a.createElement(G,null),v.a.createElement(Se,null)))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},45:function(e){e.exports={restApiEndpoint:"http://localhost:4000",socketEndpoint:"http://localhost:4001",cookieMaxAge:18e3,itemsPerPage:15}}},[[231,1,2]]]);
//# sourceMappingURL=main.7a7c7ce7.chunk.js.map