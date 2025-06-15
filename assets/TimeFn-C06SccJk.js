const n=t=>{const o=Math.floor(t/3600),r=Math.floor(t%3600/60),a=t%60;return`${o<10?"0":""}${o}:${r<10?"0":""}${r}:${a<10?"0":""}${a}`},s=t=>t.toString().padStart(2,"0");export{s as f,n as g};
