import{_ as c,u as l,s as u,a as i,b as m,r as p,c as _,f as v,t as f,g as d,o as h}from"./index.js";import{c as g}from"./particle.js";import{o as w,w as r}from"./index2.js";import"./isMobile.js";const k={class:"bg"},b={class:"headline"},x={__name:"LevelView",setup(B){const n=l(),{getGame:s}=u(n),a=i(),o=m(),e=p(0);return w(t=>{console.log(e.value),e.value+=t}),r(()=>e.value>500,()=>o.push({name:"game",params:{level:a.params.level}})),r(()=>s.value===void 0||s.value===null,()=>o.push({name:"waiting"})),g(7),(t,L)=>(h(),_("div",k,[v("h1",b,"Level "+f(d(a).params.level),1)]))}},y=c(x,[["__scopeId","data-v-1bff7107"]]);export{y as default};