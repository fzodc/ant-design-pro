(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[50],{"1oPl":function(e,t,n){"use strict";n.r(t);n("coCt");var a=n("94qY"),i=(n("KbV2"),n("I+kI")),r=(n("85xf"),n("IYgN")),o=n("rXjv"),l=n.n(o),s=(n("Z3A/"),n("pB2J")),u=n("43Yg"),p=n.n(u),c=n("/tCh"),d=n.n(c),f=n("scpF"),m=n.n(f),h=n("O/V9"),w=n.n(h),g=n("8aBX"),y=n.n(g),v=n("uqIC"),L=n.n(v),S=n("p5sR"),b=n.n(S),x=function(e){function t(){var e,n;p()(this,t);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return n=m()(this,(e=w()(t)).call.apply(e,[this].concat(i))),n.state={fileList:[],uploading:!1},n.handleUpload=function(){var e=n.state.fileList,t=new FormData;e.forEach(function(e){t.append("files[]",e)}),n.setState({uploading:!0}),b()({url:"https://www.mocky.io/v2/5cc8019d300000980a055e76",method:"post",contentType:"application/json",headers:{"X-My-Custom-Header":"SomethingImportant"},processData:!1,data:t,success:function(){n.setState({fileList:[],uploading:!1}),s["a"].success("upload successfully.")},error:function(){n.setState({uploading:!1}),s["a"].error("upload failed.")}})},n}return y()(t,e),d()(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.uploading,o=t.fileList,s={onRemove:function(t){e.setState(function(e){var n=e.fileList.indexOf(t),a=e.fileList.slice();return a.splice(n,1),{fileList:a}})},beforeUpload:function(t){return e.setState(function(e){return{fileList:[].concat(l()(e.fileList),[t])}}),!1},multiple:!0,defaultFileList:[{uid:"1",name:"xxx.png",status:"done",response:"Server Error 500",url:"http://www.baidu.com/xxx.png"},{uid:"2",name:"yyy.png",status:"done",url:"http://www.baidu.com/yyy.png"},{uid:"3",name:"zzz.png",status:"error",response:"Server Error 500",url:"http://www.baidu.com/zzz.png"}]};return L.a.createElement("div",null,L.a.createElement(a["a"],s,L.a.createElement(i["a"],null,L.a.createElement(r["a"],{type:"upload"})," Select File")),L.a.createElement(i["a"],{type:"primary",onClick:this.handleUpload,disabled:0===o.length,loading:n,style:{marginTop:16}},n?"Uploading":"Start Upload"))}}]),t}(v["PureComponent"]);t["default"]=x}}]);