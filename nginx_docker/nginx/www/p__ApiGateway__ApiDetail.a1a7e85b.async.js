(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{Pllr:function(e,t,a){"use strict";a.r(t);a("KbV2");var r,n,o,c,l=a("I+kI"),i=(a("j+Ep"),a("/Dxd")),s=(a("85xf"),a("IYgN")),p=(a("ssvk"),a("Qo4C")),d=(a("xkj2"),a("8LEP")),m=a("mK77"),u=a.n(m),y=a("43Yg"),k=a.n(y),T=a("/tCh"),S=a.n(T),b=a("scpF"),v=a.n(b),g=a("O/V9"),E=a.n(g),h=a("8aBX"),f=a.n(h),x=(a("YyIT"),a("2pDd")),q=(a("/AXM"),a("MaTn")),w=(a("GWAV"),a("7YyU")),A=(a("GCRk"),a("fmtF")),O=a("uqIC"),I=a.n(O),R=a("7xWr"),C=a.n(R),P=a("LneV"),j=a("WnAZ"),B=a("zHco"),N=a("xNuS"),M=a("gcl2"),U=a.n(M),L=a("nPZ7"),F=a("34ay"),z=a("+kNj"),K=a("MMK4"),D=a("DnsZ"),V=D["a"].CALL_POINT,H=A["a"].TabPane,_=z["a"].Description,Y="requestHeader",G="requestBody",W="responseBody",J="responseHeader",Z="stateCode",X="busiCode",Q={front:{groupId:"Group",name:"Name",serviceType:"Service Type",requestUrl:"url",protocol:"protocol",reqMethod:"Request Method",apiType:"Api Range",status:"status"},back:{serviceType:"Service Type",callType:"Call Type",url:"url",reqPath:"Request Path",protocol:"protocol",reqMethod:"Request Method",connectTimeout:"Connect Timeout\uff08ms\uff09",socketTimeout:"Socket Timeout\uff08ms\uff09",orgId:"Org",authType:"Auth type",ssl:"SSL"},backAttr:{userName:"user Name",userPassword:"user Password",tokenStr:"token Str",tokenKey:"token Key",tokenUser:"token User",tokenPassword:"token Password",tokenUrl:"token Url",trustStore:"trustStore path",trustStorePassword:"trustStore Password",keyStore:"keyStore path",keyStorePassword:"keyStore Password",ssl:"SSL",isNotValidCert:"Is Not Valid Cert",privateKeyName:"Private Key Name",isFormEncoded:"Is Form Encoded"},doc:{protocol:"protocol",encodeFormat:"Encode Format",contentType:"Content-Type",url:"URL"},log:{pathType:"pathType",extReqOne:"extReqOne",extReqTwo:"extReqTwo",extReqThree:"extReqThree",extRspOne:"extRspOne",extRspTwo:"extRspTwo",extRspThree:"extRspThree",logLevel:"logLevel",secretFlag:"secretFlag"}},$=function(e){var t=e.backendType,a=e.adapterAttrs,r=[{title:"Attr Spec Code",dataIndex:"attrSpecCode",width:"20%",render:function(e){return I.a.createElement("div",{style:{textAlign:"left",fontWeight:"bold"}},e,":")}},{title:"Attr Value",dataIndex:"attrValue"}];return t!==V?I.a.createElement(w["a"],{showHeader:!1,columns:r,size:"small",dataSource:a,pagination:!1}):"Call endpoints has not the configure properties"},ee=[{title:"Backend Type",dataIndex:"backendType"},{title:"Seq",dataIndex:"serviceSeq",defaultSortOrder:"ascend",sorter:function(e,t){return e.serviceSeq-t.serviceSeq}},{title:"Adapter",dataIndex:"adapterSpecName"},{title:"Request Url",dataIndex:"url",render:function(e,t){var a=t.reqPath,r=t.url;return a=a||"",r=r||"","".concat(r).concat(a)}}],te=[{title:"Api Id",dataIndex:"apiId"},{title:"appkey",dataIndex:"appkey"},{title:"Org Name",dataIndex:"orgName"}],ae=[{title:"\u7236\u8282\u70b9",dataIndex:"parent",render:function(e){if(e&&"-"!==e&&"root"!==e){var t="volcano";return I.a.createElement(q["a"],{color:t,key:e},"\xa0\xa0",e,"\xa0\xa0")}return e}},{title:"\u53c2\u6570\u540d",dataIndex:"name"},{title:"\u7c7b\u578b",dataIndex:"type",render:function(e){if("string"===e)return e;if(e){var t=e&&4!==e.length?e&&6===e.length?"green":"volcano":"geekblue";return I.a.createElement(q["a"],{color:t,key:e},"\xa0\xa0",e,"\xa0\xa0")}return I.a.createElement("span",null,"\xa0")}},{title:"\u8bf4\u660e",dataIndex:"remark"}],re=[{title:"Name",dataIndex:"name"},{title:"Remark",dataIndex:"remark"}],ne=[{title:"Status Code",dataIndex:"name"},{title:"remark",dataIndex:"remark"}],oe=[{title:"Log Name",dataIndex:"name"},{title:"Value",dataIndex:"remark"}],ce=["default","processing","success","default","error"],le=(r=Object(P["connect"])(function(e){var t=e.apiCreateModel,a=e.groupModel,r=e.orgModel;return{apiService:t.apiService,groupList:a.groupList,orgList:r.orgList}}),n=x["a"].create(),r(o=n((c=function(e){function t(){var e,a;k()(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return a=v()(this,(e=E()(t)).call.apply(e,[this].concat(n))),a.state={width:"100%",data:{back:{}},requestHeaderSpec:[],requestBodySpec:[],responseHeaderSpec:[],responseBodySpec:[],stateCodeSpec:[],busiCodeSpec:[],apiAttr:[],apiOrderExtAttr:[]},a.getApi=function(e){var t=a.props.dispatch;if(-1!==e){var r={range:1,option:4,data:{}};r.data.info={},r.data.info.apiId=e,t({type:"apiCreateModel/apiInfo",payload:r,callback:function(e){a.setBaseInfo(e,t)}})}else C.a.push("/exception/403")},a.convertDocObj=function(e,t){try{if(e){var a=e["".concat(t,"Spec")];if(console.log(t,a),a&&""!==a.trim()){var r=(JSON.parse(a)||[]).map(function(e,t){return u()({},e,{key:"".concat(Y,"-").concat(t)})});return console.log(t,r),r}}}catch(e){console.log(e)}return[]},a.setBaseInfo=function(e){var t=e.data,r=a.props,n=r.groupList,o=r.orgList;console.log("setBaseInfo",e),t.groupIdTitle=t.groupId?Object(K["a"])(n,t.groupId):null,t.serviceTypeTitle=t.serviceType?Object(K["b"])("apiService","service_type",t.serviceType):null,t.reqMethodTitle=t.reqMethod?Object(K["b"])("common","req_method",t.reqMethod):null,t.apiTypeTitle=t.apiType?Object(K["b"])("apiService","api_type",t.apiType):null,t.statusTitle=t.status?Object(K["b"])("apiService","status",t.status):null;var c=t.apiServiceBackends.find(function(e){return e.backendType===V}),l=c.apiServiceBackendAttrs,i=Object(L["a"])(l),s=u()({},c,i);if(s.serviceTypeTitle=s.serviceType?Object(K["b"])("apiService","service_type",s.serviceType):null,s.reqMethodTitle=s.reqMethod?Object(K["b"])("common","req_method",s.reqMethod):null,console.log("apiServiceBackendFormat.callType",s.callType),s.callTypeTitle=s.callType?Object(K["b"])("apiServiceBackend","call_type",s.callType.toString()):null,console.log("apiServiceBackendFormat.callTypeTitle",s.callTypeTitle),s.apiTypeTitle=s.apiType?Object(K["b"])("apiService","api_type",s.apiType):null,s.authTypeTitle=s.authType?Object(K["b"])("apiServiceBackendAttr","auth_type",s.authType):null,s.sslTitle="open"===s.ssl?"\u5f00":"\u5173",s.isNotValidCert="Y"===s.isNotValidCert?"Yes":"No",s.isFormEncoded="Y"===s.isFormEncoded?"Yes":"No",s.orgIdTitle=s.orgId?Object(K["f"])(o,s.orgId,"id","orgName"):null,"basicAuth"===s.authType){var p=s.apiServiceBackendAttrs.filter(function(e){return"userName"===e.attrSpecCode}),d=Object(L["a"])(p);s.userName=d.userName;var m=s.apiServiceBackendAttrs.filter(function(e){return"userPassword"===e.attrSpecCode}),y=Object(L["a"])(m);s.userPassword=y.userPassword}if("fixedToken"===s.authType){var k=s.apiServiceBackendAttrs.filter(function(e){return"tokenStr"===e.attrSpecCode||"tokenKey"===e.attrSpecCode}),T=Object(L["a"])(k);s.tokenStr=T.tokenStr,s.tokenKey=T.tokenKey}if("dyncToken"===s.authType){var S=s.apiServiceBackendAttrs.filter(function(e){return"tokenUser"===e.attrSpecCode}),b=Object(L["a"])(S);s.tokenUser=b.tokenUser;var v=s.apiServiceBackendAttrs.filter(function(e){return"tokenPassword"===e.attrSpecCode}),g=Object(L["a"])(v);s.tokenPassword=g.tokenPassword;var E=s.apiServiceBackendAttrs.filter(function(e){return"tokenUrl"===e.attrSpecCode}),h=Object(L["a"])(E);s.tokenUrl=h.tokenUrl}t.back=s;var f=t&&t.apiServiceDoc?t.apiServiceDoc:{},x=a.convertDocObj(f,Y),q=a.convertDocObj(f,G),w=a.convertDocObj(f,J),A=a.convertDocObj(f,W),O=a.convertDocObj(f,Z),I=a.convertDocObj(f,X),R="".concat(t.serviceTypeTitle,"   ").concat(t.reqMethod.toUpperCase()),C=f.urlSample?f.urlSample:"",P=Object(F["c"])()+C;console.log("getEnvUrl",Object(F["c"])());var j=[{name:Q.doc.protocol,remark:R},{name:Q.doc.encodeFormat,remark:"UTF8"},{name:Q.doc.contentType,remark:"application/json"},{name:Q.doc.url,remark:P}],B=t.apiOrderExt,N="",M="",U="",z="",D="",H="";B&&(N=B.extReq1?B.extReq1.replace("::"," "):"",M=B.extReq2?B.extReq2.replace("::"," "):"",U=B.extReq3?B.extReq3.replace("::"," "):"",z=B.extRsp1?B.extRsp1.replace("::"," "):"",D=B.extRsp2?B.extRsp2.replace("::"," "):"",H=B.extRsp3?B.extRsp3.replace("::"," "):"");var _=B?Object(K["b"])("apiOrderExt","log_level",B.logLevel):"",$=B?Object(K["b"])("apiOrderExt","secret_flag",B.secretFlag):"",ee=[{name:Q.log.extReqOne,remark:N},{name:Q.log.extReqTwo,remark:M},{name:Q.log.extReqThree,remark:U},{name:Q.log.extRspOne,remark:z},{name:Q.log.extRspTwo,remark:D},{name:Q.log.extRspThree,remark:H},{name:Q.log.logLevel,remark:_},{name:Q.log.secretFlag,remark:$}];a.setState({data:t,apiAttr:j,requestHeaderSpec:x,requestBodySpec:q,responseHeaderSpec:w,responseBodySpec:A,stateCodeSpec:O,busiCodeSpec:I,apiOrderExtAttr:ee})},a.resizeFooterToolbar=function(){requestAnimationFrame(function(){var e=document.querySelectorAll(".ant-layout-sider")[0];if(e){var t="calc(100% - ".concat(e.style.width,")"),r=a.state.width;r!==t&&a.setState({width:t})}})},a.changeTab=function(e){},a.returnPage=function(){C.a.push({pathname:"/apiGateway/apiList"})},a}return f()(t,e),S()(t,[{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){window.addEventListener("resize",this.resizeFooterToolbar,{passive:!0});var e=this.props,t=e.location,a=e.dispatch,r=t.state,n=r||{apiId:105},o=n.apiId,c=Object(F["g"])(),l=c.userId;a({type:"orgModel/allOrgList",payload:{orgType:"0,1",userId:l}}),a({type:"groupModel/allGroupList",payload:{userId:l}}),this.getApi(o)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.resizeFooterToolbar)}},{key:"render",value:function(){var e=this.props.apiService,t=this.state,a=t.width,r=t.data,n=t.requestBodySpec,o=t.requestHeaderSpec,c=t.responseHeaderSpec,m=t.responseBodySpec,y=t.stateCodeSpec,k=t.busiCodeSpec,T=t.apiAttr,S=t.apiOrderExtAttr,b=r.back,v=e&&e.apiServiceBackends?e.apiServiceBackends.map(function(e){return u()({},e,{key:e.serviceSeq})}):[];return I.a.createElement(B["a"],{onBack:function(){return window.history.back()},style:{height:"50px"},title:"Api Detail"},I.a.createElement(A["a"],{defaultActiveKey:"info"},I.a.createElement(H,{tab:"Api\u914d\u7f6e\u4fe1\u606f",key:"info"},I.a.createElement(p["a"],{title:"\u5b9a\u4e49\u8bf7\u6c42\u4fe1\u606f",bordered:!1},I.a.createElement(z["a"],{size:"large",title:"",style:{marginBottom:0}},I.a.createElement(_,{term:Q.front.groupId},r.groupIdTitle),I.a.createElement(_,{term:Q.front.name},e.name),I.a.createElement(_,{term:Q.front.status},I.a.createElement(d["a"],{status:ce[r.status],text:r.statusTitle})),I.a.createElement(_,{term:Q.front.serviceType},r.serviceTypeTitle),I.a.createElement(_,{term:Q.front.reqMethod},r.reqMethod),I.a.createElement(_,{term:Q.front.apiType},r.apiTypeTitle)),I.a.createElement(z["a"],{size:"large",title:"",style:{marginBottom:0}},I.a.createElement(_,{term:Q.front.requestUrl},e.requestUrl))),I.a.createElement("div",{style:{height:16}},"\xa0"),I.a.createElement(p["a"],{title:"\u843d\u5730\u65b9\u670d\u52a1\u4fe1\u606f",className:U.a.card,bordered:!1},I.a.createElement(z["a"],{size:"large",title:"",style:{marginBottom:0}},I.a.createElement(_,{term:Q.back.callType},b.callTypeTitle),I.a.createElement(_,{term:Q.back.serviceType},b.serviceTypeTitle),I.a.createElement(_,{term:Q.back.url},I.a.createElement(N["a"],{length:30,tooltip:!0,style:{overflow:"inherit"}},b.url)),I.a.createElement(_,{term:Q.back.reqPath},b.reqPath),I.a.createElement(_,{term:Q.back.reqMethod},b.reqMethodTitle),I.a.createElement(_,{term:Q.back.connectTimeout},b.connectTimeout),I.a.createElement(_,{term:Q.back.connectTimeout},b.connectTimeout),I.a.createElement(_,{term:Q.back.orgId},b.orgIdTitle),I.a.createElement(_,{term:Q.backAttr.isFormEncoded},b.isFormEncoded),I.a.createElement(_,{term:Q.back.authType},b.authTypeTitle),I.a.createElement(_,{term:Q.backAttr.ssl},b.sslTitle)),I.a.createElement(z["a"],{style:{display:"basicAuth"===b.authType?"block":"none"}},I.a.createElement(_,{term:Q.backAttr.userName},b.userName),I.a.createElement(_,{term:Q.backAttr.userPassword},b.userPassword)),I.a.createElement(z["a"],{style:{display:"fixedToken"===b.authType?"block":"none"}},I.a.createElement(_,{term:Q.backAttr.tokenKey},b.tokenKey),I.a.createElement(_,{term:Q.backAttr.tokenStr},I.a.createElement(N["a"],{length:80,tooltip:!0,style:{overflow:"inherit"}},b.tokenStr))),I.a.createElement(z["a"],{style:{display:"dyncToken"===b.authType?"block":"none"}},I.a.createElement(_,{term:Q.backAttr.tokenUser},b.tokenUser),I.a.createElement(_,{term:Q.backAttr.tokenPassword},b.tokenPassword),I.a.createElement(_,{term:Q.backAttr.tokenUrl},b.tokenUrl)),I.a.createElement(z["a"],{style:{display:"open"===b.ssl?"block":"none"}},I.a.createElement(_,{term:Q.backAttr.trustStore},b.trustStore),I.a.createElement(_,{term:Q.backAttr.trustStorePassword},b.trustStorePassword),I.a.createElement(_,{term:Q.backAttr.keyStore},b.keyStore),I.a.createElement(_,{term:Q.backAttr.keyStorePassword},b.keyStorePassword),I.a.createElement(_,{term:Q.backAttr.isNotValidCert},b.isNotValidCert),I.a.createElement(_,{term:Q.backAttr.privateKeyName},b.privateKeyName))),I.a.createElement(A["a"],{defaultActiveKey:"table",onChange:this.changeTab},I.a.createElement(H,{tab:"Granted Org",key:"org"},I.a.createElement(p["a"],{title:"",bordered:!1},I.a.createElement(w["a"],{columns:te,dataSource:r.apiServiceOrgs,pagination:!1}))),I.a.createElement(H,{tab:"Advance Config",key:"table"},I.a.createElement(p["a"],{title:"",bordered:!1},I.a.createElement(w["a"],{columns:ee,dataSource:v,pagination:!1,expandedRowRender:$}))))),I.a.createElement(H,{tab:"\u63a5\u53e3\u6587\u6863",key:"api"},I.a.createElement(p["a"],{title:"1.\u534f\u8bae\u8bf4\u660e",bordered:!1},I.a.createElement(w["a"],{columns:re,dataSource:T,pagination:!1})),I.a.createElement(p["a"],{title:"2.\u8bf7\u6c42\u53c2\u6570\u8bf4\u660e",bordered:!1},I.a.createElement("div",{style:{fontSize:15,margin:"12px 8px"}},I.a.createElement(s["a"],{type:"info-circle",theme:"twoTone"})," \u8bf7\u6c42\u62a5\u6587\u5934\uff08Request Header\uff09"),I.a.createElement(w["a"],{columns:re,dataSource:o,pagination:!1}),I.a.createElement("div",{style:{fontSize:15,margin:"12px 8px"}},I.a.createElement(s["a"],{type:"info-circle",theme:"twoTone"})," \u8bf7\u6c42\u62a5\u6587\u4f53\uff08Request Body\uff09"),I.a.createElement(w["a"],{columns:ae,dataSource:n,pagination:!1})),I.a.createElement(p["a"],{title:"3.\u54cd\u5e94\u53c2\u6570\u8bf4\u660e",bordered:!1},I.a.createElement("div",{style:{fontSize:15,margin:"12px 8px"}},I.a.createElement(s["a"],{type:"info-circle",theme:"twoTone"})," \u54cd\u5e94\u62a5\u6587\u5934\uff08Response Header\uff09"),I.a.createElement(w["a"],{columns:re,dataSource:c,pagination:!1}),I.a.createElement("div",{style:{fontSize:15,margin:"12px 8px"}},I.a.createElement(s["a"],{type:"info-circle",theme:"twoTone"})," \u54cd\u5e94\u62a5\u6587\u4f53\uff08Response Body\uff09"),I.a.createElement(w["a"],{columns:ae,dataSource:m,pagination:!1}))),I.a.createElement(H,{tab:"\u72b6\u6001\u7801",key:"code"},I.a.createElement(p["a"],{title:"",bordered:!1},I.a.createElement("div",{style:{fontSize:15,margin:"12px 8px"}},I.a.createElement(s["a"],{type:"info-circle",theme:"twoTone"})," \u72b6\u6001\u7801\uff08State Code\uff09"),I.a.createElement(w["a"],{columns:ne,dataSource:y,pagination:!1}),I.a.createElement("div",{style:{fontSize:15,margin:"12px 8px"}},I.a.createElement(s["a"],{type:"info-circle",theme:"twoTone"})," \u4e1a\u52a1\u72b6\u6001\u7801\uff08Business Code\uff09"),I.a.createElement(w["a"],{columns:ne,dataSource:k,pagination:!1}))),I.a.createElement(H,{tab:"\u65e5\u5fd7\u914d\u7f6e",key:"log"},I.a.createElement(p["a"],{title:"",bordered:!1},I.a.createElement(w["a"],{columns:oe,dataSource:S,pagination:!1})))),I.a.createElement("br",null),I.a.createElement(i["a"],null),I.a.createElement(j["a"],{style:{width:a}},I.a.createElement(l["a"],{type:"primary",block:!0,onClick:this.returnPage},"\u8fd4\u56de")))}}]),t}(O["PureComponent"]),o=c))||o)||o);t["default"]=le}}]);