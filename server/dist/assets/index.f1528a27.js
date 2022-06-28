import{r as c,j as l,F as u,a as e,T as f,b as m,B as g,c as y,d as b,P as v,e as x,f as T,g as p,h as d,i as k,L as h,I as C,C as L,k as w,R as O,l as P,m as S}from"./vendor.8825e00a.js";const B=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerpolicy&&(t.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?t.credentials="include":r.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(r){if(r.ep)return;r.ep=!0;const t=i(r);fetch(r.href,t)}};B();function M(){const[o,n]=c.exports.useState(""),[i,s]=c.exports.useState({visible:!1,message:""});c.exports.useState("");const[r,t]=c.exports.useState([]);return l(u,{children:[e(f,{variant:"h2",children:"Url shortner"}),e(m,{variant:"outlined",type:"url",required:!0,autoFocus:!0,value:o,onChange:a=>n(a.target.value)}),e(g,{disabled:!1,variant:"outlined",onClick:async()=>{s({message:"Generating ...",visible:!0});const a=await(await fetch(`/api/generate?url=${o}`)).json();t([{short:a.short,complete:o},...r]),s({message:"Generating ...",visible:!1})},children:"Generate"}),e(U,{urls:r}),e(N,{message:i.message,visible:i.visible})]})}function N(o){const{message:n,visible:i}=o;return e(u,{children:e(y,{sx:{backgroundColor:"black",color:"white",width:"30%",position:"fixed",padding:"0.5rem",top:"3rem",right:"1rem",opacity:"0.7",display:i?"block":"none"},children:e(f,{variant:"caption",children:n})})})}function U(o){const{urls:n}=o,i="https://minify-it.herokuapp.com";return e(u,{children:e(b,{component:v,children:l(x,{children:[e(T,{children:l(p,{children:[e(d,{children:"Orignal"}),e(d,{children:"Shrinked"})]})}),e(k,{children:n.map(({short:s,complete:r})=>l(p,{children:[e(d,{children:e(h,{href:r,underline:"hover",children:r})}),l(d,{children:[e(h,{href:`${i}/${s}`,underline:"hover",children:s}),e(C,{onClick:()=>{navigator.clipboard.writeText(`${i}/${s}`)},children:e(L,{className:"copy-button"})})]})]}))})]})})})}const F=w({palette:{primary:{main:"#D06224"},secondary:{main:"#D06224"}}});O.render(e(P.StrictMode,{children:e(S,{theme:F,children:e(M,{})})}),document.getElementById("root"));