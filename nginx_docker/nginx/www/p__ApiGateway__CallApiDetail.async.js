(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[17],{"8RfR":function(e,t,a){"use strict";a.r(t);a("KbV2");var r,n,o,c,i=a("I+kI"),l=(a("j+Ep"),a("/Dxd")),s=(a("85xf"),a("IYgN")),p=(a("ssvk"),a("Qo4C")),d=(a("xkj2"),a("8LEP")),m=a("mK77"),u=a.n(m),y=a("43Yg"),k=a.n(y),T=a("/tCh"),v=a.n(T),b=a("scpF"),S=a.n(b),h=a("O/V9"),g=a.n(h),f=a("8aBX"),E=a.n(f),x=(a("YyIT"),a("2pDd")),q=(a("/AXM"),a("MaTn")),w=(a("GWAV"),a("7YyU")),O=(a("GCRk"),a("fmtF")),A=a("uqIC"),R=a.n(A),I=a("7xWr"),C=a.n(I),j=a("LneV"),B=a("WnAZ"),P=a("zHco"),M=a("xNuS"),U=a("gcl2"),N=a.n(U),L=a("nPZ7"),F=a("34ay"),z=a("+kNj"),D=a("MMK4"),K=a("DnsZ"),H=K["a"].CALL_POINT,_=O["a"].TabPane,V=z["a"].Description,W="requestHeader",Y="requestBody",G="responseBody",J="responseHeader",Z="stateCode",X="busiCode",Q={front:{groupId:"Group",name:"Name",serviceType:"Service Type",requestUrl:"url",protocol:"protocol",reqMethod:"Request Method",apiType:"Api Range",status:"status"},back:{serviceType:"Service Type",callType:"Call Type",url:"url",reqPath:"Request Path",protocol:"protocol",reqMethod:"Request Method",connectTimeout:"Connect Timeout\uff08ms\uff09",socketTimeout:"Socket Timeout\uff08ms\uff09",orgId:"Org",authType:"Auth type"},backAttr:{userName:"user Name",userPassword:"user Password",tokenStr:"token Str",tokenKey:"token Key",tokenUser:"token User",tokenPassword:"token Password",tokenUrl:"token Url",trustStore:"trustStore path",trustStorePassword:"trustStore Password",keyStore:"keyStore path",keyStorePassword:"keyStore Password",ssl:"SSL",isNotValidCert:"Is Not Valid Cert",privateKeyName:"Private Key Name",isFormEncoded:"Is Form Encoded"},doc:{protocol:"protocol",encodeFormat:"Encode Format",contentType:"Content-Type",url:"URL"},log:{pathType:"pathType",extReqOne:"extReqOne",extReqTwo:"extReqTwo",extReqThree:"extReqThree",extRspOne:"extRspOne",extRspTwo:"extRspTwo",extRspThree:"extRspThree",logLevel:"logLevel",secretFlag:"secretFlag"}},$=function(e){var t=e.backendType,a=e.adapterAttrs,r=[{title:"Attr Spec Code",dataIndex:"attrSpecCode",width:"20%",render:function(e){return R.a.createElement("div",{style:{textAlign:"left",fontWeight:"bold"}},e,":")}},{title:"Attr Value",dataIndex:"attrValue"}];return t!==H?R.a.createElement(w["a"],{showHeader:!1,columns:r,size:"small",dataSource:a,pagination:!1}):"Call endpoints has not the configure properties"},ee=[{title:"Backend Type",dataIndex:"backendType"},{title:"Seq",dataIndex:"serviceSeq",defaultSortOrder:"ascend",sorter:function(e,t){return e.serviceSeq-t.serviceSeq}},{title:"Adapter",dataIndex:"adapterSpecName"},{title:"Request Url",dataIndex:"url",render:function(){return"******"}}],te=[{title:"\u7236\u8282\u70b9",dataIndex:"parent",render:function(e){if(e&&"-"!==e&&"root"!==e){var t="volcano";return R.a.createElement(q["a"],{color:t,key:e},"\xa0\xa0",e,"\xa0\xa0")}return e}},{title:"\u53c2\u6570\u540d",dataIndex:"name"},{title:"\u7c7b\u578b",dataIndex:"type",render:function(e){if("string"===e)return e;if(e){var t=e&&4!==e.length?e&&6===e.length?"green":"volcano":"geekblue";return R.a.createElement(q["a"],{color:t,key:e},"\xa0\xa0",e,"\xa0\xa0")}return R.a.createElement("span",null,"\xa0")}},{title:"\u8bf4\u660e",dataIndex:"remark"}],ae=[{title:"Name",dataIndex:"name"},{title:"Remark",dataIndex:"remark"}],re=[{title:"Status Code",dataIndex:"name"},{title:"remark",dataIndex:"remark"}],ne=["default","processing","success","default","error"],oe=(r=Object(j["connect"])(function(e){var t=e.apiCreateModel,a=e.groupModel,r=e.orgModel;return{apiService:t.apiService,groupList:a.groupList,orgList:r.orgList}}),n=x["a"].create(),r(o=n((c=function(e){function t(){var e,a;k()(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return a=S()(this,(e=g()(t)).call.apply(e,[this].concat(n))),a.state={width:"100%",data:{back:{}},requestHeaderSpec:[],requestBodySpec:[],responseHeaderSpec:[],responseBodySpec:[],stateCodeSpec:[],busiCodeSpec:[],apiAttr:[],apiOrderExtAttr:[]},a.getApi=function(e){var t=a.props.dispatch;if(-1!==e){var r={range:1,option:4,data:{}};r.data.info={},r.data.info.apiId=e,t({type:"apiCreateModel/apiInfo",payload:r,callback:function(e){a.setBaseInfo(e,t)}})}else C.a.push("/exception/403")},a.convertDocObj=function(e,t){try{if(e){var a=e["".concat(t,"Spec")];if(console.log(t,a),a&&""!==a.trim()){var r=(JSON.parse(a)||[]).map(function(e,t){return u()({},e,{key:"".concat(W,"-").concat(t)})});return console.log(t,r),r}}}catch(e){console.log(e)}return[]},a.setBaseInfo=function(e){var t=e.data,r=a.props,n=r.groupList,o=r.orgList;console.log("setBaseInfo",e),t.groupIdTitle=t.groupId?Object(D["a"])(n,t.groupId):null,t.serviceTypeTitle=t.serviceType?Object(D["b"])("apiService","service_type",t.serviceType):null,t.serviceTypeTitle=t.serviceType?Object(D["b"])("apiService","service_type",t.serviceType):null,t.callTypeTitle=t.callType?Object(D["b"])("apiServiceBackend","call_type",t.callType):null,t.reqMethodTitle=t.reqMethod?Object(D["b"])("common","req_method",t.reqMethod):null,t.apiTypeTitle=t.apiType?Object(D["b"])("apiService","api_type",t.apiType):null,t.statusTitle=t.status?Object(D["b"])("apiService","status",t.status):null;var c=t.apiServiceBackends.find(function(e){return e.backendType===H}),i=c.apiServiceBackendAttrs,l=Object(L["a"])(i),s=u()({},c,l);if(s.serviceTypeTitle=s.serviceType?Object(D["b"])("apiService","service_type",s.serviceType):null,s.reqMethodTitle=s.reqMethod?Object(D["b"])("common","req_method",s.reqMethod):null,s.apiTypeTitle=s.apiType?Object(D["b"])("apiService","api_type",s.apiType):null,s.authTypeTitle=s.authType?Object(D["b"])("apiServiceBackendAttr","auth_type",s.authType):null,s.sslTitle=1===s.ssl?"\u5f00":"\u5173",s.isFormEncoded="Y"===s.isFormEncoded?"Yes":"No",s.orgIdTitle=s.orgId?Object(D["f"])(o,s.orgId,"id","orgName"):null,"basicAuth"===s.authType){var p=s.apiServiceBackendAttrs.filter(function(e){return"userName"===e.attrSpecCode}),d=Object(L["a"])(p);s.userName=d.userName;var m=s.apiServiceBackendAttrs.filter(function(e){return"userPassword"===e.attrSpecCode}),y=Object(L["a"])(m);s.userPassword=y.userPassword}if("fixedToken"===s.authType){var k=s.apiServiceBackendAttrs.filter(function(e){return"tokenStr"===e.attrSpecCode||"tokenKey"===e.attrSpecCode}),T=Object(L["a"])(k);s.tokenStr=T.tokenStr,s.tokenKey=T.tokenKey}if("dyncToken"===s.authType){var v=s.apiServiceBackendAttrs.filter(function(e){return"tokenUser"===e.attrSpecCode}),b=Object(L["a"])(v);s.tokenUser=b.tokenUser;var S=s.apiServiceBackendAttrs.filter(function(e){return"tokenPassword"===e.attrSpecCode}),h=Object(L["a"])(S);s.tokenPassword=h.tokenPassword;var g=s.apiServiceBackendAttrs.filter(function(e){return"tokenUrl"===e.attrSpecCode}),f=Object(L["a"])(g);s.tokenUrl=f.tokenUrl}t.back=s;var E=t&&t.apiServiceDoc?t.apiServiceDoc:{},x=a.convertDocObj(E,W),q=a.convertDocObj(E,Y),w=a.convertDocObj(E,J),O=a.convertDocObj(E,G),A=a.convertDocObj(E,Z),R=a.convertDocObj(E,X),I="".concat(t.serviceTypeTitle,"   ").concat(t.reqMethod.toUpperCase()),C=E.urlSample?E.urlSample:"",j=Object(F["c"])()+C,B=[{name:Q.doc.protocol,remark:I},{name:Q.doc.encodeFormat,remark:"UTF8"},{name:Q.doc.contentType,remark:"application/json"},{name:Q.doc.url,remark:j}],P=t.apiOrderExt,M="",U="",N="",z="",K="",_="";P&&(M=P.extReq1?P.extReq1.replace("::"," "):"",U=P.extReq2?P.extReq2.replace("::"," "):"",N=P.extReq3?P.extReq3.replace("::"," "):"",z=P.extRsp1?P.extRsp1.replace("::"," "):"",K=P.extRsp2?P.extRsp2.replace("::"," "):"",_=P.extRsp3?P.extRsp3.replace("::"," "):"");var V=P?Object(D["b"])("apiOrderExt","log_level",P.logLevel):"",$=P?Object(D["b"])("apiOrderExt","secret_flag",P.secretFlag):"",ee=[{name:Q.log.extReqOne,remark:M},{name:Q.log.extReqTwo,remark:U},{name:Q.log.extReqThree,remark:N},{name:Q.log.extRspOne,remark:z},{name:Q.log.extRspTwo,remark:K},{name:Q.log.extRspThree,remark:_},{name:Q.log.logLevel,remark:V},{name:Q.log.secretFlag,remark:$}];a.setState({data:t,apiAttr:B,requestHeaderSpec:x,requestBodySpec:q,responseHeaderSpec:w,responseBodySpec:O,stateCodeSpec:A,busiCodeSpec:R,apiOrderExtAttr:ee})},a.resizeFooterToolbar=function(){requestAnimationFrame(function(){var e=document.querySelectorAll(".ant-layout-sider")[0];if(e){var t="calc(100% - ".concat(e.style.width,")"),r=a.state.width;r!==t&&a.setState({width:t})}})},a.changeTab=function(e){},a.returnPage=function(){C.a.push({pathname:"/apiGateway/apiList"})},a}return E()(t,e),v()(t,[{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){window.addEventListener("resize",this.resizeFooterToolbar,{passive:!0});var e=this.props,t=e.location,a=e.dispatch,r=t.state,n=r||{apiId:105},o=n.apiId,c=Object(F["g"])(),i=c.userId;a({type:"orgModel/allOrgList",payload:{orgType:"0,1",userId:i}}),a({type:"groupModel/allGroupList",payload:{userId:i}}),this.getApi(o)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.resizeFooterToolbar)}},{key:"render",value:function(){var e=this.props.apiService,t=this.state,a=t.width,r=t.data,n=t.requestBodySpec,o=t.requestHeaderSpec,c=t.responseHeaderSpec,m=t.responseBodySpec,y=t.stateCodeSpec,k=t.busiCodeSpec,T=t.apiAttr,v=r.back,b=e&&e.apiServiceBackends?e.apiServiceBackends.map(function(e){return u()({},e,{key:e.serviceSeq})}):[];return R.a.createElement(P["a"],{onBack:function(){return window.history.back()},style:{height:"50px"},title:"Api Detail"},R.a.createElement(O["a"],{defaultActiveKey:"info"},R.a.createElement(_,{tab:"Api\u914d\u7f6e\u4fe1\u606f",key:"info"},R.a.createElement(p["a"],{title:"\u5b9a\u4e49\u8bf7\u6c42\u4fe1\u606f",bordered:!1},R.a.createElement(z["a"],{size:"large",title:"",style:{marginBottom:0}},R.a.createElement(V,{term:Q.front.groupId},r.groupIdTitle),R.a.createElement(V,{term:Q.front.name},e.name),R.a.createElement(V,{term:Q.front.status},R.a.createElement(d["a"],{status:ne[r.status],text:r.statusTitle})),R.a.createElement(V,{term:Q.front.serviceType},r.serviceTypeTitle),R.a.createElement(V,{term:Q.front.reqMethod},r.reqMethod),R.a.createElement(V,{term:Q.front.apiType},r.apiTypeTitle)),R.a.createElement(z["a"],{size:"large",title:"",style:{marginBottom:0}},R.a.createElement(V,{term:Q.front.requestUrl},e.requestUrl))),R.a.createElement("div",{style:{height:16}},"\xa0"),R.a.createElement(p["a"],{title:"\u843d\u5730\u65b9\u670d\u52a1\u4fe1\u606f",className:N.a.card,bordered:!1},R.a.createElement(z["a"],{size:"large",title:"",style:{marginBottom:0}},R.a.createElement(V,{term:Q.back.callType},v.callTypeTitle),R.a.createElement(V,{term:Q.back.serviceType},v.serviceTypeTitle),R.a.createElement(V,{term:Q.back.url},R.a.createElement(M["a"],{length:20,style:{overflow:"inherit"}},"******")),R.a.createElement(V,{term:Q.back.reqPath},R.a.createElement(M["a"],{length:20,style:{overflow:"inherit"}},v.reqPath)),R.a.createElement(V,{term:Q.back.reqMethod},v.reqMethodTitle),R.a.createElement(V,{term:Q.back.connectTimeout},v.connectTimeout),R.a.createElement(V,{term:Q.back.connectTimeout},v.connectTimeout),R.a.createElement(V,{term:Q.back.orgId},v.orgIdTitle),R.a.createElement(V,{term:Q.backAttr.isFormEncoded},v.isFormEncoded),R.a.createElement(V,{term:Q.back.authType},v.authTypeTitle),R.a.createElement(V,{term:Q.backAttr.ssl},v.sslTitle)),R.a.createElement(z["a"],{style:{display:"basicAuth"===v.authType?"block":"none"}},R.a.createElement(V,{term:Q.backAttr.userName},v.userName),R.a.createElement(V,{term:Q.backAttr.userPassword},v.userPassword)),R.a.createElement(z["a"],{style:{display:"fixedToken"===v.authType?"block":"none"}},R.a.createElement(V,{term:Q.backAttr.tokenKey},"******"),R.a.createElement(V,{term:Q.backAttr.tokenStr},R.a.createElement(M["a"],{length:80,tooltip:!0,style:{overflow:"inherit"}},"******"))),R.a.createElement(z["a"],{style:{display:"dyncToken"===v.authType?"block":"none"}},R.a.createElement(V,{term:Q.backAttr.tokenUser},v.tokenUser),R.a.createElement(V,{term:Q.backAttr.tokenPassword},v.tokenPassword),R.a.createElement(V,{term:Q.backAttr.tokenUrl},v.tokenUrl))),R.a.createElement(O["a"],{defaultActiveKey:"table",onChange:this.changeTab},R.a.createElement(_,{tab:"Advance Config",key:"table"},R.a.createElement(p["a"],{title:"",bordered:!1},R.a.createElement(w["a"],{columns:ee,dataSource:b,pagination:!1,expandedRowRender:$}))))),R.a.createElement(_,{tab:"\u63a5\u53e3\u6587\u6863",key:"api"},R.a.createElement(p["a"],{title:"1.\u534f\u8bae\u8bf4\u660e",bordered:!1},R.a.createElement(w["a"],{columns:ae,dataSource:T,pagination:!1})),R.a.createElement(p["a"],{title:"2.\u8bf7\u6c42\u53c2\u6570\u8bf4\u660e",bordered:!1},R.a.createElement("div",{style:{fontSize:15,margin:"12px 8px"}},R.a.createElement(s["a"],{type:"info-circle",theme:"twoTone"})," \u8bf7\u6c42\u62a5\u6587\u5934\uff08Request Header\uff09"),R.a.createElement(w["a"],{columns:ae,dataSource:o,pagination:!1}),R.a.createElement("div",{style:{fontSize:15,margin:"12px 8px"}},R.a.createElement(s["a"],{type:"info-circle",theme:"twoTone"})," \u8bf7\u6c42\u62a5\u6587\u4f53\uff08Request Body\uff09"),R.a.createElement(w["a"],{columns:te,dataSource:n,pagination:!1})),R.a.createElement(p["a"],{title:"3.\u54cd\u5e94\u53c2\u6570\u8bf4\u660e",bordered:!1},R.a.createElement("div",{style:{fontSize:15,margin:"12px 8px"}},R.a.createElement(s["a"],{type:"info-circle",theme:"twoTone"})," \u54cd\u5e94\u62a5\u6587\u5934\uff08Response Header\uff09"),R.a.createElement(w["a"],{columns:ae,dataSource:c,pagination:!1}),R.a.createElement("div",{style:{fontSize:15,margin:"12px 8px"}},R.a.createElement(s["a"],{type:"info-circle",theme:"twoTone"})," \u54cd\u5e94\u62a5\u6587\u4f53\uff08Response Body\uff09"),R.a.createElement(w["a"],{columns:te,dataSource:m,pagination:!1}))),R.a.createElement(_,{tab:"\u72b6\u6001\u7801",key:"code"},R.a.createElement(p["a"],{title:"",bordered:!1},R.a.createElement("div",{style:{fontSize:15,margin:"12px 8px"}},R.a.createElement(s["a"],{type:"info-circle",theme:"twoTone"})," \u72b6\u6001\u7801\uff08State Code\uff09"),R.a.createElement(w["a"],{columns:re,dataSource:y,pagination:!1}),R.a.createElement("div",{style:{fontSize:15,margin:"12px 8px"}},R.a.createElement(s["a"],{type:"info-circle",theme:"twoTone"})," \u4e1a\u52a1\u72b6\u6001\u7801\uff08Business Code\uff09"),R.a.createElement(w["a"],{columns:re,dataSource:k,pagination:!1})))),R.a.createElement("br",null),R.a.createElement(l["a"],null),R.a.createElement(B["a"],{style:{width:a}},R.a.createElement(i["a"],{type:"primary",block:!0,onClick:this.returnPage},"\u8fd4\u56de")))}}]),t}(A["PureComponent"]),o=c))||o)||o);t["default"]=oe}}]);