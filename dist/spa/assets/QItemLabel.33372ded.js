import{c as o,h as r}from"./render.efdf9379.js";import{c as t,h as s}from"./index.2dc08ee7.js";var u=o({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:a}){const l=t(()=>parseInt(e.lines,10)),i=t(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(l.value===1?" ellipsis":"")),n=t(()=>e.lines!==void 0&&l.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":l.value}:null);return()=>s("div",{style:n.value,class:i.value},r(a.default))}});export{u as Q};
