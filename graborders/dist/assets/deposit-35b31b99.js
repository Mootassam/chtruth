import{r as N,i as Q,h as F,u as K,H as xe,j as h,I as Ae,J as j,K as q}from"./index-d1d6c6ad.js";import{S as Ce}from"./SubHeader-9b28101e.js";import{u as Ee,y as be,F as Me,a as U}from"./FormErrors-b77a49a1.js";import{F as Z}from"./FieldFormItem-1e51f150.js";import{S as Ne}from"./sucessModal-ddd111ba.js";import{u as ve}from"./useDispatch-87ec624c.js";import"./useNotifications-0e6b3ef8.js";var Se=Object.defineProperty,_=Object.getOwnPropertySymbols,ee=Object.prototype.hasOwnProperty,te=Object.prototype.propertyIsEnumerable,J=(l,s,i)=>s in l?Se(l,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):l[s]=i,H=(l,s)=>{for(var i in s||(s={}))ee.call(s,i)&&J(l,i,s[i]);if(_)for(var i of _(s))te.call(s,i)&&J(l,i,s[i]);return l},$=(l,s)=>{var i={};for(var d in l)ee.call(l,d)&&s.indexOf(d)<0&&(i[d]=l[d]);if(l!=null&&_)for(var d of _(l))s.indexOf(d)<0&&te.call(l,d)&&(i[d]=l[d]);return i};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var D;(l=>{const s=class w{constructor(e,o,t,n){if(this.version=e,this.errorCorrectionLevel=o,this.modules=[],this.isFunction=[],e<w.MIN_VERSION||e>w.MAX_VERSION)throw new RangeError("Version value out of range");if(n<-1||n>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let r=[];for(let a=0;a<this.size;a++)r.push(!1);for(let a=0;a<this.size;a++)this.modules.push(r.slice()),this.isFunction.push(r.slice());this.drawFunctionPatterns();const c=this.addEccAndInterleave(t);if(this.drawCodewords(c),n==-1){let a=1e9;for(let f=0;f<8;f++){this.applyMask(f),this.drawFormatBits(f);const u=this.getPenaltyScore();u<a&&(n=f,a=u),this.applyMask(f)}}g(0<=n&&n<=7),this.mask=n,this.applyMask(n),this.drawFormatBits(n),this.isFunction=[]}static encodeText(e,o){const t=l.QrSegment.makeSegments(e);return w.encodeSegments(t,o)}static encodeBinary(e,o){const t=l.QrSegment.makeBytes(e);return w.encodeSegments([t],o)}static encodeSegments(e,o,t=1,n=40,r=-1,c=!0){if(!(w.MIN_VERSION<=t&&t<=n&&n<=w.MAX_VERSION)||r<-1||r>7)throw new RangeError("Invalid value");let a,f;for(a=t;;a++){const p=w.getNumDataCodewords(a,o)*8,C=b.getTotalBits(e,a);if(C<=p){f=C;break}if(a>=n)throw new RangeError("Data too long")}for(const p of[w.Ecc.MEDIUM,w.Ecc.QUARTILE,w.Ecc.HIGH])c&&f<=w.getNumDataCodewords(a,p)*8&&(o=p);let u=[];for(const p of e){i(p.mode.modeBits,4,u),i(p.numChars,p.mode.numCharCountBits(a),u);for(const C of p.getData())u.push(C)}g(u.length==f);const v=w.getNumDataCodewords(a,o)*8;g(u.length<=v),i(0,Math.min(4,v-u.length),u),i(0,(8-u.length%8)%8,u),g(u.length%8==0);for(let p=236;u.length<v;p^=253)i(p,8,u);let M=[];for(;M.length*8<u.length;)M.push(0);return u.forEach((p,C)=>M[C>>>3]|=p<<7-(C&7)),new w(a,o,M,r)}getModule(e,o){return 0<=e&&e<this.size&&0<=o&&o<this.size&&this.modules[o][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let t=0;t<this.size;t++)this.setFunctionModule(6,t,t%2==0),this.setFunctionModule(t,6,t%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),o=e.length;for(let t=0;t<o;t++)for(let n=0;n<o;n++)t==0&&n==0||t==0&&n==o-1||t==o-1&&n==0||this.drawAlignmentPattern(e[t],e[n]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const o=this.errorCorrectionLevel.formatBits<<3|e;let t=o;for(let r=0;r<10;r++)t=t<<1^(t>>>9)*1335;const n=(o<<10|t)^21522;g(n>>>15==0);for(let r=0;r<=5;r++)this.setFunctionModule(8,r,d(n,r));this.setFunctionModule(8,7,d(n,6)),this.setFunctionModule(8,8,d(n,7)),this.setFunctionModule(7,8,d(n,8));for(let r=9;r<15;r++)this.setFunctionModule(14-r,8,d(n,r));for(let r=0;r<8;r++)this.setFunctionModule(this.size-1-r,8,d(n,r));for(let r=8;r<15;r++)this.setFunctionModule(8,this.size-15+r,d(n,r));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let t=0;t<12;t++)e=e<<1^(e>>>11)*7973;const o=this.version<<12|e;g(o>>>18==0);for(let t=0;t<18;t++){const n=d(o,t),r=this.size-11+t%3,c=Math.floor(t/3);this.setFunctionModule(r,c,n),this.setFunctionModule(c,r,n)}}drawFinderPattern(e,o){for(let t=-4;t<=4;t++)for(let n=-4;n<=4;n++){const r=Math.max(Math.abs(n),Math.abs(t)),c=e+n,a=o+t;0<=c&&c<this.size&&0<=a&&a<this.size&&this.setFunctionModule(c,a,r!=2&&r!=4)}}drawAlignmentPattern(e,o){for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)this.setFunctionModule(e+n,o+t,Math.max(Math.abs(n),Math.abs(t))!=1)}setFunctionModule(e,o,t){this.modules[o][e]=t,this.isFunction[o][e]=!0}addEccAndInterleave(e){const o=this.version,t=this.errorCorrectionLevel;if(e.length!=w.getNumDataCodewords(o,t))throw new RangeError("Invalid argument");const n=w.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][o],r=w.ECC_CODEWORDS_PER_BLOCK[t.ordinal][o],c=Math.floor(w.getNumRawDataModules(o)/8),a=n-c%n,f=Math.floor(c/n);let u=[];const v=w.reedSolomonComputeDivisor(r);for(let p=0,C=0;p<n;p++){let A=e.slice(C,C+f-r+(p<a?0:1));C+=A.length;const y=w.reedSolomonComputeRemainder(A,v);p<a&&A.push(0),u.push(A.concat(y))}let M=[];for(let p=0;p<u[0].length;p++)u.forEach((C,A)=>{(p!=f-r||A>=a)&&M.push(C[p])});return g(M.length==c),M}drawCodewords(e){if(e.length!=Math.floor(w.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let o=0;for(let t=this.size-1;t>=1;t-=2){t==6&&(t=5);for(let n=0;n<this.size;n++)for(let r=0;r<2;r++){const c=t-r,f=(t+1&2)==0?this.size-1-n:n;!this.isFunction[f][c]&&o<e.length*8&&(this.modules[f][c]=d(e[o>>>3],7-(o&7)),o++)}}g(o==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let o=0;o<this.size;o++)for(let t=0;t<this.size;t++){let n;switch(e){case 0:n=(t+o)%2==0;break;case 1:n=o%2==0;break;case 2:n=t%3==0;break;case 3:n=(t+o)%3==0;break;case 4:n=(Math.floor(t/3)+Math.floor(o/2))%2==0;break;case 5:n=t*o%2+t*o%3==0;break;case 6:n=(t*o%2+t*o%3)%2==0;break;case 7:n=((t+o)%2+t*o%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[o][t]&&n&&(this.modules[o][t]=!this.modules[o][t])}}getPenaltyScore(){let e=0;for(let r=0;r<this.size;r++){let c=!1,a=0,f=[0,0,0,0,0,0,0];for(let u=0;u<this.size;u++)this.modules[r][u]==c?(a++,a==5?e+=w.PENALTY_N1:a>5&&e++):(this.finderPenaltyAddHistory(a,f),c||(e+=this.finderPenaltyCountPatterns(f)*w.PENALTY_N3),c=this.modules[r][u],a=1);e+=this.finderPenaltyTerminateAndCount(c,a,f)*w.PENALTY_N3}for(let r=0;r<this.size;r++){let c=!1,a=0,f=[0,0,0,0,0,0,0];for(let u=0;u<this.size;u++)this.modules[u][r]==c?(a++,a==5?e+=w.PENALTY_N1:a>5&&e++):(this.finderPenaltyAddHistory(a,f),c||(e+=this.finderPenaltyCountPatterns(f)*w.PENALTY_N3),c=this.modules[u][r],a=1);e+=this.finderPenaltyTerminateAndCount(c,a,f)*w.PENALTY_N3}for(let r=0;r<this.size-1;r++)for(let c=0;c<this.size-1;c++){const a=this.modules[r][c];a==this.modules[r][c+1]&&a==this.modules[r+1][c]&&a==this.modules[r+1][c+1]&&(e+=w.PENALTY_N2)}let o=0;for(const r of this.modules)o=r.reduce((c,a)=>c+(a?1:0),o);const t=this.size*this.size,n=Math.ceil(Math.abs(o*20-t*10)/t)-1;return g(0<=n&&n<=9),e+=n*w.PENALTY_N4,g(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,o=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let t=[6];for(let n=this.size-7;t.length<e;n-=o)t.splice(1,0,n);return t}}static getNumRawDataModules(e){if(e<w.MIN_VERSION||e>w.MAX_VERSION)throw new RangeError("Version number out of range");let o=(16*e+128)*e+64;if(e>=2){const t=Math.floor(e/7)+2;o-=(25*t-10)*t-55,e>=7&&(o-=36)}return g(208<=o&&o<=29648),o}static getNumDataCodewords(e,o){return Math.floor(w.getNumRawDataModules(e)/8)-w.ECC_CODEWORDS_PER_BLOCK[o.ordinal][e]*w.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let o=[];for(let n=0;n<e-1;n++)o.push(0);o.push(1);let t=1;for(let n=0;n<e;n++){for(let r=0;r<o.length;r++)o[r]=w.reedSolomonMultiply(o[r],t),r+1<o.length&&(o[r]^=o[r+1]);t=w.reedSolomonMultiply(t,2)}return o}static reedSolomonComputeRemainder(e,o){let t=o.map(n=>0);for(const n of e){const r=n^t.shift();t.push(0),o.forEach((c,a)=>t[a]^=w.reedSolomonMultiply(c,r))}return t}static reedSolomonMultiply(e,o){if(e>>>8||o>>>8)throw new RangeError("Byte out of range");let t=0;for(let n=7;n>=0;n--)t=t<<1^(t>>>7)*285,t^=(o>>>n&1)*e;return g(t>>>8==0),t}finderPenaltyCountPatterns(e){const o=e[1];g(o<=this.size*3);const t=o>0&&e[2]==o&&e[3]==o*3&&e[4]==o&&e[5]==o;return(t&&e[0]>=o*4&&e[6]>=o?1:0)+(t&&e[6]>=o*4&&e[0]>=o?1:0)}finderPenaltyTerminateAndCount(e,o,t){return e&&(this.finderPenaltyAddHistory(o,t),o=0),o+=this.size,this.finderPenaltyAddHistory(o,t),this.finderPenaltyCountPatterns(t)}finderPenaltyAddHistory(e,o){o[0]==0&&(e+=this.size),o.pop(),o.unshift(e)}};s.MIN_VERSION=1,s.MAX_VERSION=40,s.PENALTY_N1=3,s.PENALTY_N2=3,s.PENALTY_N3=40,s.PENALTY_N4=10,s.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],s.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],l.QrCode=s;function i(x,e,o){if(e<0||e>31||x>>>e)throw new RangeError("Value out of range");for(let t=e-1;t>=0;t--)o.push(x>>>t&1)}function d(x,e){return(x>>>e&1)!=0}function g(x){if(!x)throw new Error("Assertion error")}const m=class E{constructor(e,o,t){if(this.mode=e,this.numChars=o,this.bitData=t,o<0)throw new RangeError("Invalid argument");this.bitData=t.slice()}static makeBytes(e){let o=[];for(const t of e)i(t,8,o);return new E(E.Mode.BYTE,e.length,o)}static makeNumeric(e){if(!E.isNumeric(e))throw new RangeError("String contains non-numeric characters");let o=[];for(let t=0;t<e.length;){const n=Math.min(e.length-t,3);i(parseInt(e.substring(t,t+n),10),n*3+1,o),t+=n}return new E(E.Mode.NUMERIC,e.length,o)}static makeAlphanumeric(e){if(!E.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let o=[],t;for(t=0;t+2<=e.length;t+=2){let n=E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t))*45;n+=E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t+1)),i(n,11,o)}return t<e.length&&i(E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)),6,o),new E(E.Mode.ALPHANUMERIC,e.length,o)}static makeSegments(e){return e==""?[]:E.isNumeric(e)?[E.makeNumeric(e)]:E.isAlphanumeric(e)?[E.makeAlphanumeric(e)]:[E.makeBytes(E.toUtf8ByteArray(e))]}static makeEci(e){let o=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)i(e,8,o);else if(e<16384)i(2,2,o),i(e,14,o);else if(e<1e6)i(6,3,o),i(e,21,o);else throw new RangeError("ECI assignment value out of range");return new E(E.Mode.ECI,0,o)}static isNumeric(e){return E.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return E.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,o){let t=0;for(const n of e){const r=n.mode.numCharCountBits(o);if(n.numChars>=1<<r)return 1/0;t+=4+r+n.bitData.length}return t}static toUtf8ByteArray(e){e=encodeURI(e);let o=[];for(let t=0;t<e.length;t++)e.charAt(t)!="%"?o.push(e.charCodeAt(t)):(o.push(parseInt(e.substring(t+1,t+3),16)),t+=2);return o}};m.NUMERIC_REGEX=/^[0-9]*$/,m.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,m.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let b=m;l.QrSegment=m})(D||(D={}));(l=>{(s=>{const i=class{constructor(g,m){this.ordinal=g,this.formatBits=m}};i.LOW=new i(0,1),i.MEDIUM=new i(1,0),i.QUARTILE=new i(2,3),i.HIGH=new i(3,2),s.Ecc=i})(l.QrCode||(l.QrCode={}))})(D||(D={}));(l=>{(s=>{const i=class{constructor(g,m){this.modeBits=g,this.numBitsCharCount=m}numCharCountBits(g){return this.numBitsCharCount[Math.floor((g+7)/17)]}};i.NUMERIC=new i(1,[10,12,14]),i.ALPHANUMERIC=new i(2,[9,11,13]),i.BYTE=new i(4,[8,16,16]),i.KANJI=new i(8,[8,10,12]),i.ECI=new i(7,[0,0,0]),s.Mode=i})(l.QrSegment||(l.QrSegment={}))})(D||(D={}));var L=D;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var ye={L:L.QrCode.Ecc.LOW,M:L.QrCode.Ecc.MEDIUM,Q:L.QrCode.Ecc.QUARTILE,H:L.QrCode.Ecc.HIGH},oe=128,ne="L",re="#FFFFFF",se="#000000",ie=!1,ae=1,Re=4,Fe=0,Ie=.1;function le(l,s=0){const i=[];return l.forEach(function(d,g){let m=null;d.forEach(function(b,x){if(!b&&m!==null){i.push(`M${m+s} ${g+s}h${x-m}v1H${m+s}z`),m=null;return}if(x===d.length-1){if(!b)return;m===null?i.push(`M${x+s},${g+s} h1v1H${x+s}z`):i.push(`M${m+s},${g+s} h${x+1-m}v1H${m+s}z`);return}b&&m===null&&(m=x)})}),i.join("")}function ce(l,s){return l.slice().map((i,d)=>d<s.y||d>=s.y+s.h?i:i.map((g,m)=>m<s.x||m>=s.x+s.w?g:!1))}function Pe(l,s,i,d){if(d==null)return null;const g=l.length+i*2,m=Math.floor(s*Ie),b=g/s,x=(d.width||m)*b,e=(d.height||m)*b,o=d.x==null?l.length/2-x/2:d.x*b,t=d.y==null?l.length/2-e/2:d.y*b,n=d.opacity==null?1:d.opacity;let r=null;if(d.excavate){let a=Math.floor(o),f=Math.floor(t),u=Math.ceil(x+o-a),v=Math.ceil(e+t-f);r={x:a,y:f,w:u,h:v}}const c=d.crossOrigin;return{x:o,y:t,h:e,w:x,excavation:r,opacity:n,crossOrigin:c}}function De(l,s){return s!=null?Math.max(Math.floor(s),0):l?Re:Fe}function de({value:l,level:s,minVersion:i,includeMargin:d,marginSize:g,imageSettings:m,size:b,boostLevel:x}){let e=N.useMemo(()=>{const a=(Array.isArray(l)?l:[l]).reduce((f,u)=>(f.push(...L.QrSegment.makeSegments(u)),f),[]);return L.QrCode.encodeSegments(a,ye[s],i,void 0,void 0,x)},[l,s,i,x]);const{cells:o,margin:t,numCells:n,calculatedImageSettings:r}=N.useMemo(()=>{let c=e.getModules();const a=De(d,g),f=c.length+a*2,u=Pe(c,b,a,m);return{cells:c,margin:a,numCells:f,calculatedImageSettings:u}},[e,b,m,d,g]);return{qrcode:e,margin:t,cells:o,numCells:n,calculatedImageSettings:r}}var Le=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),ue=N.forwardRef(function(s,i){const d=s,{value:g,size:m=oe,level:b=ne,bgColor:x=re,fgColor:e=se,includeMargin:o=ie,minVersion:t=ae,boostLevel:n,marginSize:r,imageSettings:c}=d,f=$(d,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:u}=f,v=$(f,["style"]),M=c==null?void 0:c.src,p=N.useRef(null),C=N.useRef(null),A=N.useCallback(P=>{p.current=P,typeof i=="function"?i(P):i&&(i.current=P)},[i]),[y,O]=N.useState(!1),{margin:I,cells:B,numCells:T,calculatedImageSettings:S}=de({value:g,level:b,minVersion:t,boostLevel:n,includeMargin:o,marginSize:r,imageSettings:c,size:m});N.useEffect(()=>{if(p.current!=null){const P=p.current,R=P.getContext("2d");if(!R)return;let Y=B;const k=C.current,G=S!=null&&k!==null&&k.complete&&k.naturalHeight!==0&&k.naturalWidth!==0;G&&S.excavation!=null&&(Y=ce(B,S.excavation));const W=window.devicePixelRatio||1;P.height=P.width=m*W;const X=m/T*W;R.scale(X,X),R.fillStyle=x,R.fillRect(0,0,T,T),R.fillStyle=e,Le?R.fill(new Path2D(le(Y,I))):B.forEach(function(pe,fe){pe.forEach(function(ge,we){ge&&R.fillRect(we+I,fe+I,1,1)})}),S&&(R.globalAlpha=S.opacity),G&&R.drawImage(k,S.x+I,S.y+I,S.w,S.h)}}),N.useEffect(()=>{O(!1)},[M]);const me=H({height:m,width:m},u);let V=null;return M!=null&&(V=N.createElement("img",{src:M,key:M,style:{display:"none"},onLoad:()=>{O(!0)},ref:C,crossOrigin:S==null?void 0:S.crossOrigin})),N.createElement(N.Fragment,null,N.createElement("canvas",H({style:me,height:m,width:m,ref:A,role:"img"},v)),V)});ue.displayName="QRCodeCanvas";var Be=N.forwardRef(function(s,i){const d=s,{value:g,size:m=oe,level:b=ne,bgColor:x=re,fgColor:e=se,includeMargin:o=ie,minVersion:t=ae,boostLevel:n,title:r,marginSize:c,imageSettings:a}=d,f=$(d,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:u,cells:v,numCells:M,calculatedImageSettings:p}=de({value:g,level:b,minVersion:t,boostLevel:n,includeMargin:o,marginSize:c,imageSettings:a,size:m});let C=v,A=null;a!=null&&p!=null&&(p.excavation!=null&&(C=ce(v,p.excavation)),A=N.createElement("image",{href:a.src,height:p.h,width:p.w,x:p.x+u,y:p.y+u,preserveAspectRatio:"none",opacity:p.opacity,crossOrigin:p.crossOrigin}));const y=le(C,u);return N.createElement("svg",H({height:m,width:m,viewBox:`0 0 ${M} ${M}`,ref:i,role:"img"},f),!!r&&N.createElement("title",null,r),N.createElement("path",{fill:x,d:`M0,0 h${M}v${M}H0z`,shapeRendering:"crispEdges"}),N.createElement("path",{fill:e,d:y,shapeRendering:"crispEdges"}),A)});Be.displayName="QRCodeSVG";const z=l=>l.deposit.form,Te=Q([z],l=>l.record),ke=Q([z],l=>!!l.initLoading),ze=Q([z],l=>!!l.saveLoading),Oe=Q([z],l=>!!l.depositModal),je={selectInitLoading:ke,selectSaveLoading:ze,selectRecord:Te,selectDepositModal:Oe,selectRaw:z},he={USDT:30,SOL:.232,BTC:87e-5,ETH:.0071,XRP:16.9},Ue=l=>{const s=he[l.toUpperCase()]||0;return Ae().shape({orderno:U.string(j("entities.deposit.fields.orderno")),amount:U.decimal(j("entities.deposit.fields.amount"),{required:!0,min:s}),txid:U.string(j("entities.deposit.fields.txid"),{required:!0}),rechargechannel:U.string(j("entities.deposit.fields.rechargechannel"))})};function Ke(){var C;const l=ve(),[s,i]=F.useState("BTC"),[d,g]=F.useState(""),[m,b]=F.useState(!1),x=K(xe.selectRows),[e,o]=F.useState((C=x[0])==null?void 0:C.address),t=K(je.selectDepositModal);F.useState(!t);const n=F.useMemo(()=>Ue(s),[s]),[r]=F.useState(()=>({orderno:"",amount:"",txid:"",rechargechannel:"",rechargetime:"",status:"pending"})),c=Ee({resolver:be.yupResolver(n),mode:"all",defaultValues:r});F.useEffect(()=>{const A=x.find(y=>y.symbol===s);A&&o(A.address)},[s]);const a=()=>{navigator.clipboard.writeText(e).then(()=>{b(!0),setTimeout(()=>b(!1),3e3)})},f=A=>{const y=new Date,O=y.getFullYear(),I=String(y.getMonth()+1).padStart(2,"0"),B=String(y.getDate()).padStart(2,"0"),T=`${O}${I}${B}`,S=Math.floor(Math.random()*1e7).toString().padStart(7,"0");A.orderno=`RE${T}${S}`,A.rechargetime=y.toISOString(),A.rechargechannel=s,g(A.amount),l(q.doCreate(A)),c.reset({orderno:"",amount:"",txid:"",rechargechannel:"",rechargetime:"",status:"pending"})},u=F.useMemo(()=>x.find(A=>A.symbol===s),[s]),v=()=>{l(q.doClose()),g("")},M=A=>{i(A.target.value),c.setValue("amount",""),c.clearErrors("amount")},p=()=>he[s.toUpperCase()]||0;return h.jsxs("div",{className:"container",children:[h.jsx(Ce,{title:"Deposit Crypto"}),h.jsxs("div",{className:"networkSection",children:[h.jsx("div",{className:"sectionHeading",children:"Select Network"}),h.jsxs("div",{className:"networkDropdownContainer",children:[h.jsx("select",{className:"networkDropdown",value:s,onChange:M,children:x.map(A=>h.jsx("option",{value:A.symbol,children:A.name},A.symbol))}),h.jsx("div",{className:"networkDropdownIcon",children:h.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${s}.png`,style:{width:25,height:25},alt:s})})]})]}),x.symbol,h.jsxs("div",{className:"qrSection",children:[h.jsx(ue,{value:e,size:180,bgColor:"#ffffff",fgColor:"#000000",level:"H",includeMargin:!0,className:"qrBox"}),h.jsxs("div",{className:"addressSection",children:[h.jsx("div",{className:"addressLabel",children:"Your deposit address"}),h.jsx("div",{className:"addressText",id:"walletAddress",children:e}),h.jsxs("button",{type:"button",className:"copyBtn",onClick:a,children:[h.jsx("i",{className:"fas fa-copy"})," Copy Address"]})]})]}),h.jsx(Me,{...c,children:h.jsxs("form",{onSubmit:c.handleSubmit(f),children:[h.jsxs("div",{className:"amountSection",children:[h.jsx(Z,{name:"amount",label:`Deposit amount (${s.toUpperCase()})`,className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:`Minimum: ${p()} ${s.toUpperCase()}`}),h.jsx(Z,{name:"txid",type:"text",label:"Transaction ID (TXID)",className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:"Enter The TXID"})]}),h.jsxs("div",{className:"minAmountWarning",children:[h.jsx("i",{className:"fas fa-info-circle"}),"Minimum deposit: ",h.jsxs("strong",{children:[p()," ",s.toUpperCase()]})]}),h.jsxs("div",{className:"warningBox",children:[h.jsxs("div",{className:"warningHeader",children:[h.jsx("i",{className:"fas fa-exclamation-circle warningIcon"}),h.jsx("div",{className:"warningTitle",children:"Important Notice"})]}),h.jsx("div",{className:"warningContent",children:"Please ensure that you select the correct network for your deposit. Sending funds through the wrong network may result in permanent loss of your assets, which cannot be recovered."})]}),h.jsx("button",{type:"submit",className:"depositBtn",disabled:!c.formState.isValid,children:"Confirm Deposit"})]})}),h.jsxs("div",{className:"networkDetails",children:[h.jsxs("div",{className:"detailRow",children:[h.jsx("div",{className:"detailLabel",children:"Network"}),h.jsxs("div",{className:"detailValue",id:"detailNetwork",children:[u==null?void 0:u.name," (",s.toUpperCase(),")"]})]}),h.jsxs("div",{className:"detailRow",children:[h.jsx("div",{className:"detailLabel",children:"Minimum deposit"}),h.jsxs("div",{className:"detailValue",children:[p()," ",s.toUpperCase()]})]}),h.jsxs("div",{className:"detailRow",children:[h.jsx("div",{className:"detailLabel",children:"Estimated arrival"}),h.jsx("div",{className:"detailValue",children:"3 network confirmations"})]}),h.jsxs("div",{className:"detailRow",children:[h.jsx("div",{className:"detailLabel",children:"Processing time"}),h.jsx("div",{className:"detailValue",children:"10-30 minutes"})]})]}),h.jsx("div",{className:`toastMsg ${m?"visible":""}`,id:"toast",children:"Address copied to clipboard!"}),t&&h.jsx(Ne,{isOpen:t,onClose:v,type:"deposit",amount:d,coinType:s}),h.jsx("style",{children:`
  .depositContainer {
    max-width: 500px;
    margin: 0 auto;
    padding-bottom: 20px;
  }

  .networkSection {
      padding: 0 15px;
      margin-bottom: 20px;
  }

  .sectionHeading {
      font-weight: bold;
      margin-bottom: 12px;
      font-size: 16px;
      color: #FFFFFF;
  }

  /* Network Dropdown Styles */
  .networkDropdownContainer {
    position: relative;
    width: 100%;
  }

  .networkDropdown {
    width: 100%;
    background-color: #2A2A2A;
    border: 2px solid #2A2A2A;
    border-radius: 12px;
    padding: 12px 45px 12px 15px;
    color: white;
    font-size: 16px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
    transition: border-color 0.3s;
  }

  .networkDropdown:focus {
    outline: none;
    border-color: #F3BA2F;
  }

  .networkDropdownIcon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* QR Code Section */
  .qrSection {
      background-color: #1A1A1A;
      border-radius: 16px;
      padding: 25px;
      margin: 0 15px 20px;
      text-align: center;
  }

  .qrBox {
      width: 180px;
      height: 180px;
      margin: 0 auto 20px;
      background-color: #FFFFFF;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      padding: 10px;
  }

  .addressSection {
      margin-bottom: 20px;
  }

  .addressLabel {
      font-size: 14px;
      color: #AAAAAA;
      margin-bottom: 8px;
  }

  .addressText {
      font-size: 14px;
      word-break: break-all;
      margin-bottom: 15px;
      font-family: monospace;
      color: #F3BA2F;
      line-height: 1.4;
  }

  .copyBtn {
      background-color: #2A2A2A;
      color: #FFFFFF;
      border: none;
      border-radius: 8px;
      padding: 10px 20px;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      cursor: pointer;
      transition: background-color 0.3s;
  }

  .copyBtn:hover {
      background-color: #3A3A3A;
  }

  .copyBtn i {
      margin-right: 8px;
  }

  /* Amount Section */
  .amountSection {
      padding: 0 15px;
      margin-bottom: 10px;
  }

  .minAmountWarning {
    padding: 0 15px;
    margin-bottom: 20px;
    color: #F3BA2F;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .minAmountWarning i {
    color: #F3BA2F;
  }

  /* Warning Section */
  .warningBox {
      background-color: rgba(255, 104, 56, 0.1);
      border: 1px solid #FF6838;
      border-radius: 12px;
      padding: 15px;
      margin: 0 15px 25px;
  }

  .warningHeader {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
  }

  .warningIcon {
      color: #FF6838;
      margin-right: 10px;
      font-size: 18px;
  }

  .warningTitle {
      color: #FF6838;
      font-weight: bold;
      font-size: 16px;
  }

  .warningContent {
      color: #FF6838;
      font-size: 14px;
      line-height: 1.5;
  }

  /* Deposit Button */
  .depositBtn {
      background-color: #F3BA2F;
      color: #000000;
      border: none;
      border-radius: 12px;
      padding: 16px;
      font-size: 16px;
      font-weight: bold;
      width: calc(100% - 30px);
      margin: 0 15px;
      cursor: pointer;
      transition: background-color 0.3s ease;
  }

  .depositBtn:hover:not(:disabled) {
      background-color: #e6ab0a;
  }

  .depositBtn:disabled {
      background-color: #2A2A2A;
      color: #777777;
      cursor: not-allowed;
  }

  /* Network Details */
  .networkDetails {
      padding: 15px;
      margin-top: 20px;
      background-color: #1A1A1A;
      border-radius: 12px;
      margin: 20px 15px 0;
  }

  .detailRow {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      font-size: 14px;
  }

  .detailRow:last-child {
      margin-bottom: 0;
  }

  .detailLabel {
      color: #AAAAAA;
  }

  .detailValue {
      color: #FFFFFF;
      font-weight: 500;
  }

  /* Toast Notification */
  .toastMsg {
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #00C076;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1000;
      pointer-events: none;
  }

  .toastMsg.visible {
      opacity: 1;
  }

  /* Form field styling */
  .inputWrapper {
    // margin-bottom: 16px;
  }

  .inputLabel {
    display: block;
    // margin-bottom: 8px;
    color: #AAAAAA;
    font-size: 14px;
  }

  .inputField {
    width: 100%;
    // background-color: #2A2A2A;
    // border: 2px solid #2A2A2A;
    border-radius: 12px;
    // padding: 12px 15px;
    color: white;
    font-size: 16px;
    transition: border-color 0.3s;
  }

  .inputField:focus {
    outline: none;
    border-color: #F3BA2F;
  }

  .inputField:invalid {
    border-color: #FF6838;
  }

  @media (max-width: 350px) {
    .networkDropdown {
      padding: 10px 40px 10px 12px;
      font-size: 14px;
    }
    
    .networkDropdownIcon {
      font-size: 20px;
      right: 12px;
    }

    .qrBox {
      width: 150px;
      height: 150px;
    }

    .addressText {
      font-size: 12px;
    }
  }
`})]})}export{Ke as default};
