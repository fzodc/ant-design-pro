(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[68],{gm0l:function(e,a,t){"use strict";t.r(a);t("ssvk");var l=t("Qo4C"),n=(t("cZcT"),t("T+5x")),r=(t("4WAF"),t("Qfhr")),c=(t("GCRk"),t("fmtF")),s=(t("H5tu"),t("N9Wk")),m=t("uqIC"),i=t.n(m),o=t("BS6i"),E=t.n(o),d=t("lVjH"),u=t.n(d),k=t("KTCi"),g=s["a"].RangePicker,N=c["a"].TabPane,C=[{title:"crm",total:323234},{title:"billing",total:263234},{title:"ose",total:223234},{title:"tdc",total:173234},{title:"och",total:113234},{title:"mvno",total:3234},{title:"ali",total:234}],h=Object(m["memo"])(function(e){var a=e.rangePickerValue,t=e.salesData,s=e.isActive,m=e.handleRangePickerChange,o=e.loading,d=e.selectDate;return i.a.createElement(l["a"],{loading:o,bordered:!1,bodyStyle:{padding:0}},i.a.createElement("div",{className:u.a.salesCard},i.a.createElement(c["a"],{tabBarExtraContent:i.a.createElement("div",{className:u.a.salesExtraWrap},i.a.createElement("div",{className:u.a.salesExtra},i.a.createElement("a",{className:s("today"),onClick:function(){return d("today")}},"All Day"),i.a.createElement("a",{className:s("week"),onClick:function(){return d("week")}},"All Week"),i.a.createElement("a",{className:s("month"),onClick:function(){return d("month")}},"All Month"),i.a.createElement("a",{className:s("year"),onClick:function(){return d("year")}},"All Year")),i.a.createElement(g,{value:a,onChange:m,style:{width:256}})),size:"large",tabBarStyle:{marginBottom:24}},i.a.createElement(N,{tab:"Consumer Calls",key:"calls"},i.a.createElement(n["a"],null,i.a.createElement(r["a"],{xl:16,lg:12,md:12,sm:24,xs:24},i.a.createElement("div",{className:u.a.salesBar},i.a.createElement(k["a"],{height:295,title:"Calls Trend",data:t}))),i.a.createElement(r["a"],{xl:8,lg:12,md:12,sm:24,xs:24},i.a.createElement("div",{className:u.a.salesRank},i.a.createElement("h4",{className:u.a.rankingTitle},"Consumer Ranking of Call"),i.a.createElement("ul",{className:u.a.rankingList},C.map(function(e,a){return i.a.createElement("li",{key:e.title},i.a.createElement("span",{className:"".concat(u.a.rankingItemNumber," ").concat(a<3?u.a.active:"")},a+1),i.a.createElement("span",{className:u.a.rankingItemTitle,title:e.title},e.title),i.a.createElement("span",{className:u.a.rankingItemValue},E()(e.total).format("0,0")))})))))),i.a.createElement(N,{tab:"Producer Calleds",key:"calleds"},i.a.createElement(n["a"],null,i.a.createElement(r["a"],{xl:16,lg:12,md:12,sm:24,xs:24},i.a.createElement("div",{className:u.a.salesBar},i.a.createElement(k["a"],{height:292,title:"Called Trend",data:t}))),i.a.createElement(r["a"],{xl:8,lg:12,md:12,sm:24,xs:24},i.a.createElement("div",{className:u.a.salesRank},i.a.createElement("h4",{className:u.a.rankingTitle},"Producer Ranking of Called"),i.a.createElement("ul",{className:u.a.rankingList},C.map(function(e,a){return i.a.createElement("li",{key:e.title},i.a.createElement("span",{className:"".concat(u.a.rankingItemNumber," ").concat(a<3?u.a.active:"")},a+1),i.a.createElement("span",{className:u.a.rankingItemTitle,title:e.title},e.title),i.a.createElement("span",null,E()(e.total).format("0,0")))})))))))))});a["default"]=h}}]);