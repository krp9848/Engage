(this.webpackJsonpengagefrontend=this.webpackJsonpengagefrontend||[]).push([[0],{38:function(e,t,n){},68:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(17),c=n.n(a),s=(n(38),n(6)),u=n(4),o=n(18),i=n(12),p=n(2),l=n.n(p),j=n(5),d=n(13),f=n.n(d),b="/api/tweets",v=null,g={getAll:function(){var e=Object(j.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get(b);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),setToken:function(e){v="bearer ".concat(e)},create:function(){var e=Object(j.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:v}},e.next=3,f.a.post(b,t,n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),tweetDelete:function(){var e=Object(j.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:v}},e.next=3,f.a.delete("".concat(b,"/").concat(t),n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(console.log("state now",e),console.log("action",t),t.type){case"INIT_TWEETS":return t.data;case"CREATE_TWEET":return e.concat(t.data);default:return e}},O=n(1),x=function(){var e=Object(s.b)(),t=Object(r.useState)(""),n=Object(i.a)(t,2),a=n[0],c=n[1];return Object(O.jsxs)("form",{onSubmit:function(t){t.preventDefault(),e(function(e){return function(){var t=Object(j.a)(l.a.mark((function t(n){var r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g.create(e);case 2:r=t.sent,n({type:"CREATE_TWEET",data:r});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}({text:a})),c("")},children:[Object(O.jsxs)("div",{children:["Tweet Text",Object(O.jsx)("input",{type:"text",id:"tweet-text",value:a,onChange:function(e){var t=e.target;return c(t.value)},required:!0})]}),Object(O.jsx)("button",{type:"submit",children:"Tweet"})]})},w=function(e){var t=e.tweet;return Object(O.jsx)("p",{children:t.text})},m=function(){var e=Object(s.c)((function(e){return e.tweets}));return Object(O.jsxs)("div",{children:[Object(O.jsx)("h2",{children:"All Tweets"}),e.map((function(e){return Object(O.jsx)(w,{tweet:e},e.id)}))]})},y={login:function(){var e=Object(j.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.post("api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},S=function(e,t){return function(){var n=Object(j.a)(l.a.mark((function n(r){return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r({type:"SET_MESSAGE",messageInfo:e}),setTimeout((function(){r({type:"SET_MESSAGE",messageInfo:null})}),1e3*t);case 2:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(console.log("state now",e),console.log("action",t),t.type){case"SET_MESSAGE":return t.messageInfo;default:return e}},T=function(e){return function(){var t=Object(j.a)(l.a.mark((function t(n){var r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,y.login(e);case 3:r=t.sent,window.localStorage.setItem("loggedBlogAppUser",JSON.stringify(r)),g.setToken(r.token),n({type:"SET_USER",user:r}),n(S({message:"".concat(r.username," logged in"),messageType:"success"},5)),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),n(S({message:"wrong username or password",messageType:"failure"},5));case 13:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e){return t.apply(this,arguments)}}()},k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(console.log("state now",e),console.log("action",t),t.type){case"SET_USER":return t.user;case"REMOVE_USER":return null;default:return e}},A=function(){var e=Object(s.b)(),t=Object(r.useState)(""),n=Object(i.a)(t,2),a=n[0],c=n[1],u=Object(r.useState)(""),o=Object(i.a)(u,2),p=o[0],l=o[1];return Object(O.jsxs)("form",{onSubmit:function(t){t.preventDefault(),e(T({username:a,password:p})),c(""),l("")},children:[Object(O.jsxs)("div",{children:["Username"," ",Object(O.jsx)("input",{id:"username",type:"text",value:a,onChange:function(e){var t=e.target;return c(t.value)},required:!0})]}),Object(O.jsxs)("div",{children:["Password"," ",Object(O.jsx)("input",{id:"password",type:"password",value:p,onChange:function(e){var t=e.target;return l(t.value)},required:!0})]}),Object(O.jsx)("button",{id:"login-button",type:"submit",children:"Login"})]})},U=function(){var e=Object(s.c)((function(e){return e.notification}));return e?Object(O.jsx)("h2",{className:["info","success"===e.messageType?"success":"failure"].join(" "),children:e.message}):null},I="/api/users",_={getAll:function(){var e=Object(j.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get(I);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),create:function(){var e=Object(j.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.post(I,t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return console.log("state now",e),console.log("action",t),t.type,e},R=function(){var e=Object(s.b)(),t=Object(r.useState)(""),n=Object(i.a)(t,2),a=n[0],c=n[1],u=Object(r.useState)(""),o=Object(i.a)(u,2),p=o[0],d=o[1],f=Object(r.useState)(""),b=Object(i.a)(f,2),v=b[0],g=b[1],h=Object(r.useState)(""),x=Object(i.a)(h,2),w=x[0],m=x[1];return Object(O.jsxs)("form",{onSubmit:function(t){var n;(t.preventDefault(),v===w)?e((n={username:p,password:v,name:a},function(){var e=Object(j.a)(l.a.mark((function e(t){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,_.create(n);case 3:r=e.sent,t(T({username:r.username,password:n.password})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),t(S({message:"".concat(e.t0.response.data.error),messageType:"failure"},5));case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}())):e(S({message:"Password do not match",messageType:"failure"},5))},children:[Object(O.jsxs)("div",{children:["Name"," ",Object(O.jsx)("input",{id:"signup-name",type:"text",value:a,onChange:function(e){var t=e.target;return c(t.value)},required:!0})]}),Object(O.jsxs)("div",{children:["Username"," ",Object(O.jsx)("input",{id:"signup-username",type:"text",value:p,onChange:function(e){var t=e.target;return d(t.value)},required:!0})]}),Object(O.jsxs)("div",{children:["Password"," ",Object(O.jsx)("input",{id:"signup-password",type:"password",value:v,onChange:function(e){var t=e.target;return g(t.value)},required:!0})]}),Object(O.jsxs)("div",{children:["Confirm Password"," ",Object(O.jsx)("input",{id:"signup-confirm_password",type:"password",value:w,onChange:function(e){var t=e.target;return m(t.value)},required:!0})]}),Object(O.jsx)("button",{id:"signup-button",type:"submit",children:"Sign Up"})]})};var q=function(){var e=Object(s.c)((function(e){return e.loggedInUser})),t=Object(s.b)();return Object(r.useEffect)((function(){t(function(){var e=Object(j.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.getAll();case 2:n=e.sent,console.log("request all tweets"),t({type:"INIT_TWEETS",data:n});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[t]),Object(r.useEffect)((function(){t(function(){var e=Object(j.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(n=window.localStorage.getItem("loggedBlogAppUser"))&&(r=JSON.parse(n),t({type:"SET_USER",user:r}),g.setToken(r.token));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[t]),Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)("h1",{children:Object(O.jsx)("i",{children:"Engage"})}),Object(O.jsx)(U,{}),Object(O.jsxs)(u.d,{children:[Object(O.jsx)(u.b,{path:"/signup",children:null===e?Object(O.jsx)(R,{}):Object(O.jsx)(u.a,{to:"/"})}),Object(O.jsx)(u.b,{path:"/",children:null===e?Object(O.jsxs)("div",{children:[Object(O.jsx)(A,{}),Object(O.jsxs)("p",{children:["Don't have an account? Please ",Object(O.jsx)(o.b,{to:"/signup",children:"SignUp"})]})]}):Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)("p",{children:[" ",e.username," logged in",Object(O.jsx)("button",{onClick:function(){return t(function(e){return function(){var t=Object(j.a)(l.a.mark((function t(n){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n(S({message:"".concat(e.username," logged out"),messageType:"success"},5)),n({type:"SET_USER",user:null}),window.localStorage.removeItem("loggedBlogAppUser");case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(e))},children:"logout"})]}),Object(O.jsx)(x,{}),Object(O.jsx)(m,{})]})})]})]})},N=n(16),D=n(32),M=n(33),P=Object(N.combineReducers)({notification:E,users:C,tweets:h,loggedInUser:k}),W=Object(N.createStore)(P,Object(D.composeWithDevTools)(Object(N.applyMiddleware)(M.a)));c.a.render(Object(O.jsx)(s.a,{store:W,children:Object(O.jsx)(o.a,{children:Object(O.jsx)(q,{})})}),document.getElementById("root"))}},[[68,1,2]]]);
//# sourceMappingURL=main.e2f7a66e.chunk.js.map