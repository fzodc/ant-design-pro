(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[27],{ArfN:function(e,t,a){"use strict";a.r(t);a("ssvk");var r,n,i,o,l=a("Qo4C"),s=(a("B3Wq"),a("CImR")),c=(a("85xf"),a("IYgN")),m=(a("KbV2"),a("I+kI")),p=(a("AGar"),a("A42C")),d=(a("cZcT"),a("T+5x")),g=(a("4WAF"),a("Qfhr")),u=(a("PCp+"),a("HnZV")),f=(a("GWAV"),a("7YyU")),h=a("mK77"),b=a.n(h),E=a("43Yg"),y=a.n(E),v=a("/tCh"),L=a.n(v),O=a("scpF"),M=a.n(O),x=a("O/V9"),k=a.n(x),S=a("8aBX"),w=a.n(S),I=(a("RmDK"),a("/6XP")),j=(a("YyIT"),a("2pDd")),T=(a("H5tu"),a("N9Wk")),C=a("uqIC"),F=a.n(C),N=a("QHZv"),R=a("LneV"),Y=a("a/LZ"),q=a.n(Y),D=a("CTfC"),V=a.n(D),H=a("zHco"),A=a("xNuS"),K=a("nNTM"),z=a.n(K),P=a("MMK4"),W=a("+kNj"),B=W["a"].Description,Q=u["a"].TextArea,Z={reqMessage:"reqMessage",respMessage:"respMessage",seq:"seq",encryptFlag:"Encrypt Flag"},J=function(e){function t(){var e,a;y()(this,t);for(var r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return a=M()(this,(e=k()(t)).call.apply(e,[this].concat(n))),a.getSecretFlag=function(e){return e?Object(P["b"])("apiOrderExt","secret_flag",e):""},a.getOrderItem=function(){var e=a.props.orderItem;return e?e.map(function(e){return F.a.createElement(d["a"],null,F.a.createElement(g["a"],null,F.a.createElement(l["a"],{title:"".concat(e.orderItemCode),bordered:!1,extra:"".concat(e.createTime)},F.a.createElement(W["a"],null,F.a.createElement(B,{style:{width:350},term:Z.seq},F.a.createElement("div",{style:{width:330}},F.a.createElement(A["a"],{tooltip:!0,length:20,style:{overflow:"inherit"}},"".concat(e.seq)))),F.a.createElement(B,{style:{width:350},term:Z.encryptFlag},F.a.createElement(A["a"],{tooltip:!0,length:40,style:{overflow:"inherit"}},a.getSecretFlag("".concat(e.encryptFlag))))),F.a.createElement(W["a"],null,F.a.createElement(B,{style:{width:350}},F.a.createElement("div",{style:{width:330}},F.a.createElement(Q,{rows:20,value:e.reqMessage}))),F.a.createElement(B,null,F.a.createElement("div",{style:{width:400}},F.a.createElement(Q,{rows:20,value:e.respMessage})))))))}):"The order item has not order message"},a}return w()(t,e),L()(t,[{key:"render",value:function(){return F.a.createElement("div",null,this.getOrderItem())}}]),t}(C["PureComponent"]),_=J,G=a("34ay"),U=a("+n12"),X=T["a"].RangePicker,$=j["a"].Item,ee=I["a"].Option,te=function(e){return Object.keys(e).map(function(t){return e[t]}).join(",")},ae=(r=Object(R["connect"])(function(e){var t=e.apiLogModel,a=e.uniComp,r=e.loading;return{apiLogModel:t,uniComp:a,loading:r.models.apiLogModel}}),n=j["a"].create(),r(i=n((o=function(e){function t(e){var a;return y()(this,t),a=M()(this,k()(t).call(this,e)),a.state={expandForm:!1,selectedRow:{},formValues:{},pagination:{pageNo:1,pageSize:10},filtersArg:{},sorter:{},drawerVisible:!1,logList:[],data:[],value:[],fetching:!1,rangePickerValue:Object(U["b"])("today"),targetOrgs:[],expandAllFlag:!1},a.getOptionWhithList=function(e){return!e||e.length<1?F.a.createElement(ee,{key:0,value:0},"\u6ca1\u6709\u627e\u5230\u9009\u9879"):e.map(function(e){return F.a.createElement(ee,{key:e.itemCode,value:e.itemCode},e.itemValue)})},a.getOptionWhithList=function(e){return!e||e.length<1?F.a.createElement(ee,{key:0,value:0},"\u6ca1\u6709\u627e\u5230\u9009\u9879"):e.map(function(e){return F.a.createElement(ee,{key:e.itemCode,value:e.itemCode},e.itemValue)})},a.onExpand=function(e,t){console.log("onExpand1111",t);var r=a.props.dispatch,n=t.orderId,i=t.orderCode,o=a.state.logList,l=o.map(function(e){return b()({},e)}),s=a.getRowByKey(n,l);if(s&&e)if(s.expanded)console.log("");else{var c={};c.orderCode=i,r({type:"apiLogModel/logItemList",payload:c,callback:function(e){var t=e.data,r=t.intfOrderItems;s.logItemList=r,s.expanded=!0,a.setState({logList:l})}})}},a.expandedRowRender=function(e){console.log("expandedRowRender",e);var t=e.logItemList,r=[{title:Object(N["formatMessage"])({id:"app.apiLogList.log.orderItemCode"}),dataIndex:"orderItemCode",render:function(e,t){return F.a.createElement("a",{onClick:function(){return a.handleDetail(t)}},e)}},{title:Object(N["formatMessage"])({id:"app.apiLogList.log.implType"}),dataIndex:"implType"},{title:Object(N["formatMessage"])({id:"app.apiLogList.log.reqTarget"}),dataIndex:"reqTarget",render:function(e){return F.a.createElement(A["a"],{tooltip:!0,length:40,style:{overflow:"inherit"}},"".concat(e))}},{title:Object(N["formatMessage"])({id:"app.apiLogList.log.reqTime"}),dataIndex:"reqTime",render:function(e){return F.a.createElement("span",null,q()(e).format("YYYY-MM-DD HH:mm:ss"))}},{title:Object(N["formatMessage"])({id:"app.apiLogList.log.respTime"}),dataIndex:"respTime",render:function(e){return F.a.createElement("span",null,q()(e).format("YYYY-MM-DD HH:mm:ss"))}}];return F.a.createElement(f["a"],{columns:r,size:"small",dataSource:t,pagination:!1})},a.conversionFilter=function(e){return Object.keys(e).reduce(function(t,a){var r=b()({},t);return r[a]=te(e[a]),r},{})},a.handleFormReset=function(){var e=a.props,t=e.form,r=e.dispatch,n=a.state.targetOrgs;t.resetFields(),a.setState({formValues:{}});var i=Object(G["h"])(),o={data:{}};o.data.info={pageNo:1,pageSize:10,userName:i,targetOrgs:n},r({type:"apiLogModel/logList",payload:o,callback:function(e){var t=e.data,r=t.records,n=t.pagination;a.setState({logList:r,pagination:n})}})},a.toggleForm=function(){var e=a.state.expandForm;a.setState({expandForm:!e})},a.handleChange=function(e){a.setState({value:e,data:[],fetching:!1})},a.fetchApi=function(e){a.lastFetchId+=1,a.setState({data:[],fetching:!0});var t=a.props.dispatch,r=Object(G["g"])(),n={userId:r,data:{}};n.data.info={pageNo:1,pageSize:10,name:e},t({type:"apiLogModel/apiListBySearch",payload:n,callback:function(e){if("200"===e.code){var t=e.data,r=t.records,n=r.map(function(e){return{text:"".concat(e.name),value:e.apiId}});a.setState({data:n,fetching:!1})}}})},a.handleSearch=function(e){e.preventDefault();var t=a.props,r=t.dispatch,n=t.form,i=a.state.targetOrgs;n.validateFields(function(e,t){if(!e){var n=b()({},t);console.log(t,n),a.setState({formValues:n});var o=n.requestTime,l=n.extFlag,s=n.extInput;switch(l){case"1":n.extReq1=s;break;case"2":n.extReq2=s;break;case"3":n.extReq3=s;break;case"4":n.extRsp1=s;break;case"5":n.extRsp2=s;break;case"6":n.extRsp3=s;break;default:break}var c=o[0].format("YYYY-MM-DD HH:mm:ss.SSS"),m=o[1].format("YYYY-MM-DD HH:mm:ss.SSS"),p=a.state,d=p.filtersArg,g=p.sorter,u=a.conversionFilter(d),f=Object(G["h"])(),h={data:{}};h.data.info=b()({pageNo:1,pageSize:10},u,n,g,{requestStartTime:c,requestEndTime:m,userName:f,targetOrgs:i}),r({type:"apiLogModel/logList",payload:h,callback:function(e){var t=e.data,r=t.records,n=t.pagination;a.setState({logList:r,pagination:n})}})}})},a.handleTableChange=function(e,t,r){var n=a.props.dispatch,i=a.state,o=i.formValues,l=i.targetOrgs,s=o.requestTime,c=o.extFlag,m=o.extInput,p=s[0].format("YYYY-MM-DD HH:mm:ss.SSS"),d=s[1].format("YYYY-MM-DD HH:mm:ss.SSS");switch(c){case"1":o.extReq1=m;break;case"2":o.extReq2=m;break;case"3":o.extReq3=m;break;case"4":o.extRsp1=m;break;case"5":o.extRsp2=m;break;case"6":o.extRsp3=m;break;default:break}a.setState({pagination:e,filtersArg:t,sorter:r});var g=a.conversionFilter(t),u=b()({pageNo:e.current,pageSize:e.pageSize},o,g,{requestStartTime:p,requestEndTime:d,targetOrgs:l});r.field&&(u.sorter="".concat(r.field,"_").concat(r.order));var f=Object(G["h"])(),h={data:{}};h.data.info=b()({pageNo:1,pageSize:10},u,{userName:f,targetOrgs:l}),h.data.info.pageNo=h.data.info.pageNo?h.data.info.pageNo:1,n({type:"apiLogModel/logList",payload:h,callback:function(e){var t=e.data,r=t.records,n=t.pagination;a.setState({logList:r,pagination:n})}})},a.handleDrawerVisible=function(e,t){a.setState({selectedRow:e,drawerVisible:!!t})},a.handleDetail=function(e){a.handleDrawerVisible(e,!0)},a.onDrawerClose=function(){a.handleDrawerVisible(null,!1)},a.isActive=function(e){var t=a.state.rangePickerValue,r=Object(U["b"])(e);return t[0]&&t[1]&&t[0].isSame(r[0],"day")&&t[1].isSame(r[1],"day")?z.a.currentDate:""},a.selectDate=function(e){var t=a.props.form;t.setFieldsValue({requestTime:Object(U["b"])(e)}),a.setState({rangePickerValue:Object(U["b"])(e)})},a.handleRangePickerChange=function(e){var t=a.props.form;t.setFieldsValue({requestTime:e}),a.setState({rangePickerValue:e})},a.lastFetchId=0,a.fetchApi=V()(a.fetchApi,800),a}return w()(t,e),L()(t,[{key:"componentWillMount",value:function(){var e=this,t=this.props.dispatch,a=Object(G["g"])(),r="org",n=9999,i=Object(G["h"])(),o={userId:a,tableName:r,pageSize:n,userName:i};console.log("binddata",o),t({type:"uniComp/list",payload:o,onConversionData:void 0,callback:function(t){var a=t.data,r=a.records,n=r.map(function(e){return e.id});console.log("targetOrgs",n),e.setState({targetOrgs:n})}})}},{key:"getOptionMaster",value:function(e,t){var a=Object(P["d"])(e,t);return this.getOptionWhithList(a)}},{key:"getRowByKey",value:function(e,t){var a=this.state.logList;return(t||a).filter(function(t){return t.orderId===e})[0]}},{key:"getOption",value:function(e,t){var a=Object(P["d"])(e,t);return this.getOptionWhithList(a)}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator,t=this.state,a=t.fetching,r=t.data,n=t.value,i=t.rangePickerValue;return F.a.createElement(j["a"],{onSubmit:this.handleSearch,layout:"inline"},F.a.createElement(d["a"],{gutter:{md:8,lg:24,xl:48}},F.a.createElement(g["a"],{md:8,sm:24},F.a.createElement($,{label:Object(N["formatMessage"])({id:"app.apiLogList.log.transactionId"})},e("transactionId")(F.a.createElement(u["a"],{placeholder:Object(N["formatMessage"])({id:"app.noteTips.log.transactionId"})})))),F.a.createElement(g["a"],{md:8,sm:24},F.a.createElement($,{label:Object(N["formatMessage"])({id:"app.apiLogList.log.appKey"})},e("appKey")(F.a.createElement(u["a"],{placeholder:Object(N["formatMessage"])({id:"app.noteTips.log.appKey"})})))),F.a.createElement(g["a"],{md:8,sm:24},F.a.createElement($,{label:Object(N["formatMessage"])({id:"app.apiLogList.log.reqTime"})},F.a.createElement("div",{className:z.a.salesExtraWrap},e("requestTime",{initialValue:i})(F.a.createElement(X,{onChange:this.handleRangePickerChange,showTime:{format:"HH:mm"},style:{width:256}})))))),F.a.createElement(d["a"],{gutter:{md:8,lg:24,xl:48}},F.a.createElement(g["a"],{md:8,sm:24},F.a.createElement($,{label:Object(N["formatMessage"])({id:"app.apiLogList.log.apiName"})},e("apiId")(F.a.createElement(I["a"],{showSearch:"true",labelInValue:!0,value:n,placeholder:Object(N["formatMessage"])({id:"app.noteTips.log.apiName"}),notFoundContent:a?F.a.createElement(p["a"],{size:"small"}):null,filterOption:!1,onSearch:this.fetchApi,onChange:this.handleChange,style:{width:"100%"}},r.map(function(e){return F.a.createElement(ee,{key:e.value},e.text)}))))),F.a.createElement(g["a"],{md:8,sm:24},F.a.createElement($,{label:Object(N["formatMessage"])({id:"app.apiLogList.log.statusName"})},e("status",{})(F.a.createElement(I["a"],{placeholder:Object(N["formatMessage"])({id:"app.noteTips.log.statusName"}),style:{width:"100%"}},this.getOption("intfOrder","status"))))),F.a.createElement(g["a"],{md:8,sm:24},F.a.createElement("span",{className:z.a.submitButtons},F.a.createElement(m["a"],{type:"primary",htmlType:"submit"},"Query"),F.a.createElement(m["a"],{style:{marginLeft:8},onClick:this.handleFormReset,htmlType:"button"},"Reset"),F.a.createElement("a",{style:{marginLeft:8},onClick:this.toggleForm},"UnFold ",F.a.createElement(c["a"],{type:"down"}))))))}},{key:"renderAdvancedForm",value:function(){var e=this.props.form.getFieldDecorator,t=this.state,a=t.fetching,r=t.data,n=t.value,i=t.rangePickerValue,o=e("extFlag",{})(F.a.createElement(I["a"],{style:{width:110}},this.getOptionMaster("apiOrderExt","ext_flag")));return F.a.createElement(j["a"],{onSubmit:this.handleSearch,layout:"inline"},F.a.createElement(d["a"],{gutter:{md:8,lg:24,xl:48}},F.a.createElement(g["a"],{md:8,sm:24},F.a.createElement($,{label:Object(N["formatMessage"])({id:"app.apiLogList.log.transactionId"})},e("transactionId")(F.a.createElement(u["a"],{placeholder:Object(N["formatMessage"])({id:"app.noteTips.log.transactionId"})})))),F.a.createElement(g["a"],{md:8,sm:24},F.a.createElement($,{label:Object(N["formatMessage"])({id:"app.apiLogList.log.appKey"})},e("appKey")(F.a.createElement(u["a"],{placeholder:Object(N["formatMessage"])({id:"app.noteTips.log.appKey"})})))),F.a.createElement(g["a"],{md:8,sm:24},F.a.createElement($,{label:Object(N["formatMessage"])({id:"app.apiLogList.log.reqTime"})},e("requestTime",{initialValue:i})(F.a.createElement(X,{onChange:this.handleRangePickerChange,showTime:{format:"HH:mm"},style:{width:256}}))))),F.a.createElement(d["a"],{gutter:{md:8,lg:24,xl:48}},F.a.createElement(g["a"],{md:8,sm:24},F.a.createElement($,{label:Object(N["formatMessage"])({id:"app.apiLogList.log.apiName"})},e("apiId")(F.a.createElement(I["a"],{showSearch:"true",labelInValue:!0,value:n,placeholder:Object(N["formatMessage"])({id:"app.noteTips.log.apiName"}),notFoundContent:a?F.a.createElement(p["a"],{size:"small"}):null,filterOption:!1,onSearch:this.fetchApi,onChange:this.handleChange,style:{width:"100%"}},r.map(function(e){return F.a.createElement(ee,{key:e.value},e.text)}))))),F.a.createElement(g["a"],{md:8,sm:24},F.a.createElement($,{label:Object(N["formatMessage"])({id:"app.apiLogList.log.statusName"})},e("status",{})(F.a.createElement(I["a"],{placeholder:Object(N["formatMessage"])({id:"app.noteTips.log.statusName"}),style:{width:"100%"}},this.getOption("intfOrder","status"))))),F.a.createElement(g["a"],{md:8,sm:24},F.a.createElement($,{label:Object(N["formatMessage"])({id:"app.apiLogList.log.extInput"})},e("extInput",{})(F.a.createElement(u["a"],{addonBefore:o,placeholder:Object(N["formatMessage"])({id:"app.noteTips.log.extInput"})}))))),F.a.createElement(d["a"],{gutter:{md:8,lg:24,xl:48}},F.a.createElement(g["a"],{md:8,sm:24},F.a.createElement($,{label:Object(N["formatMessage"])({id:"app.apiLogList.log.keyValue"})},e("keyValue")(F.a.createElement(u["a"],{placeholder:Object(N["formatMessage"])({id:"app.noteTips.log.keyValue"})}))))),F.a.createElement("div",{style:{overflow:"hidden"}},F.a.createElement("div",{style:{float:"right",marginBottom:24}},F.a.createElement(m["a"],{type:"primary",htmlType:"submit"},"Query"),F.a.createElement(m["a"],{style:{marginLeft:8},onClick:this.handleFormReset,htmlType:"button"},"Reset"),F.a.createElement("a",{style:{marginLeft:8},onClick:this.toggleForm},"Fold ",F.a.createElement(c["a"],{type:"up"})))))}},{key:"renderForm",value:function(){var e=this.state.expandForm;return e?this.renderAdvancedForm():this.renderSimpleForm()}},{key:"render",value:function(){var e=this,t=this.state.expandAllFlag,a=this.props.loading,r=this.state,n=r.logList,i=r.pagination,o=r.drawerVisible,c=r.selectedRow,m=c?c.intfOrderItemMessages:[],p=b()({showSizeChanger:!0,showQuickJumper:!0},i),d=[{title:Object(N["formatMessage"])({id:"app.apiLogList.log.transactionId"}),dataIndex:"transactionId"},{title:Object(N["formatMessage"])({id:"app.apiLogList.log.statusName"}),dataIndex:"statusName"},{title:Object(N["formatMessage"])({id:"app.apiLogList.log.sourceTypeName"}),dataIndex:"sourceTypeName"},{title:Object(N["formatMessage"])({id:"app.apiLogList.log.apiName"}),dataIndex:"apiName"},{title:Object(N["formatMessage"])({id:"app.apiLogList.log.appKey"}),dataIndex:"appKey"},{title:Object(N["formatMessage"])({id:"app.apiLogList.log.orderCode"}),dataIndex:"orderCode"},{title:Object(N["formatMessage"])({id:"app.apiLogList.log.requestTime"}),dataIndex:"requestTime",sorter:!0,render:function(e){return F.a.createElement("span",null,q()(e).format("YYYY-MM-DD HH:mm:ss"))}},{title:Object(N["formatMessage"])({id:"app.apiLogList.log.responseTime"}),dataIndex:"responseTime",sorter:!0,render:function(e){return F.a.createElement("span",null,q()(e).format("YYYY-MM-DD HH:mm:ss"))}}],g=[];return F.a.createElement(H["a"],{showBreadcrumb:!0,style:{height:"50px"}},F.a.createElement(l["a"],{bordered:!1},F.a.createElement("div",{className:z.a.tableList},F.a.createElement("div",{className:z.a.tableListForm},this.renderForm()),F.a.createElement(f["a"],{loading:a,size:"small",columns:d,expandedRowRender:function(t){return e.expandedRowRender(t)},onExpand:function(t,a){return e.onExpand(t,a)},dataSource:n,pagination:p,onChange:this.handleTableChange,defaultExpandAllRows:t,defaultExpandedRowKeys:g}),F.a.createElement(s["a"],{width:850,placement:"right",closable:!0,onClose:this.onDrawerClose,visible:o},F.a.createElement(_,{orderItem:m})))))}}]),t}(C["PureComponent"]),i=o))||i)||i);t["default"]=ae}}]);