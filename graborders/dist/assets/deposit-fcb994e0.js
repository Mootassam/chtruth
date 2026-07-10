import{i as M,Q as Re,u as me,X as pe,o as A,Z as Ie,_ as je,$ as ke,Y as De,a0 as Pe,j as s,L as ze,O as Be,q as Te}from"./index-b5200eee.js";import{u as Le,y as Oe,F as Ue}from"./FormErrors-570a3785.js";import{F as fe}from"./FieldFormItem-baed0ad1.js";import{u as $e}from"./useDispatch-64d56e5e.js";var Qe=Object.defineProperty,J=Object.getOwnPropertySymbols,_e=Object.prototype.hasOwnProperty,xe=Object.prototype.propertyIsEnumerable,he=(i,l,r)=>l in i?Qe(i,l,{enumerable:!0,configurable:!0,writable:!0,value:r}):i[l]=r,ie=(i,l)=>{for(var r in l||(l={}))_e.call(l,r)&&he(i,r,l[r]);if(J)for(var r of J(l))xe.call(l,r)&&he(i,r,l[r]);return i},le=(i,l)=>{var r={};for(var c in i)_e.call(i,c)&&l.indexOf(c)<0&&(r[c]=i[c]);if(i!=null&&J)for(var c of J(i))l.indexOf(c)<0&&xe.call(i,c)&&(r[c]=i[c]);return r};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var O;(i=>{const l=class _{constructor(e,o,t,n){if(this.version=e,this.errorCorrectionLevel=o,this.modules=[],this.isFunction=[],e<_.MIN_VERSION||e>_.MAX_VERSION)throw new RangeError("Version value out of range");if(n<-1||n>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let a=[];for(let d=0;d<this.size;d++)a.push(!1);for(let d=0;d<this.size;d++)this.modules.push(a.slice()),this.isFunction.push(a.slice());this.drawFunctionPatterns();const u=this.addEccAndInterleave(t);if(this.drawCodewords(u),n==-1){let d=1e9;for(let w=0;w<8;w++){this.applyMask(w),this.drawFormatBits(w);const p=this.getPenaltyScore();p<d&&(n=w,d=p),this.applyMask(w)}}g(0<=n&&n<=7),this.mask=n,this.applyMask(n),this.drawFormatBits(n),this.isFunction=[]}static encodeText(e,o){const t=i.QrSegment.makeSegments(e);return _.encodeSegments(t,o)}static encodeBinary(e,o){const t=i.QrSegment.makeBytes(e);return _.encodeSegments([t],o)}static encodeSegments(e,o,t=1,n=40,a=-1,u=!0){if(!(_.MIN_VERSION<=t&&t<=n&&n<=_.MAX_VERSION)||a<-1||a>7)throw new RangeError("Invalid value");let d,w;for(d=t;;d++){const h=_.getNumDataCodewords(d,o)*8,C=F.getTotalBits(e,d);if(C<=h){w=C;break}if(d>=n)throw new RangeError("Data too long")}for(const h of[_.Ecc.MEDIUM,_.Ecc.QUARTILE,_.Ecc.HIGH])u&&w<=_.getNumDataCodewords(d,h)*8&&(o=h);let p=[];for(const h of e){r(h.mode.modeBits,4,p),r(h.numChars,h.mode.numCharCountBits(d),p);for(const C of h.getData())p.push(C)}g(p.length==w);const N=_.getNumDataCodewords(d,o)*8;g(p.length<=N),r(0,Math.min(4,N-p.length),p),r(0,(8-p.length%8)%8,p),g(p.length%8==0);for(let h=236;p.length<N;h^=253)r(h,8,p);let v=[];for(;v.length*8<p.length;)v.push(0);return p.forEach((h,C)=>v[C>>>3]|=h<<7-(C&7)),new _(d,o,v,a)}getModule(e,o){return 0<=e&&e<this.size&&0<=o&&o<this.size&&this.modules[o][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let t=0;t<this.size;t++)this.setFunctionModule(6,t,t%2==0),this.setFunctionModule(t,6,t%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),o=e.length;for(let t=0;t<o;t++)for(let n=0;n<o;n++)t==0&&n==0||t==0&&n==o-1||t==o-1&&n==0||this.drawAlignmentPattern(e[t],e[n]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const o=this.errorCorrectionLevel.formatBits<<3|e;let t=o;for(let a=0;a<10;a++)t=t<<1^(t>>>9)*1335;const n=(o<<10|t)^21522;g(n>>>15==0);for(let a=0;a<=5;a++)this.setFunctionModule(8,a,c(n,a));this.setFunctionModule(8,7,c(n,6)),this.setFunctionModule(8,8,c(n,7)),this.setFunctionModule(7,8,c(n,8));for(let a=9;a<15;a++)this.setFunctionModule(14-a,8,c(n,a));for(let a=0;a<8;a++)this.setFunctionModule(this.size-1-a,8,c(n,a));for(let a=8;a<15;a++)this.setFunctionModule(8,this.size-15+a,c(n,a));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let t=0;t<12;t++)e=e<<1^(e>>>11)*7973;const o=this.version<<12|e;g(o>>>18==0);for(let t=0;t<18;t++){const n=c(o,t),a=this.size-11+t%3,u=Math.floor(t/3);this.setFunctionModule(a,u,n),this.setFunctionModule(u,a,n)}}drawFinderPattern(e,o){for(let t=-4;t<=4;t++)for(let n=-4;n<=4;n++){const a=Math.max(Math.abs(n),Math.abs(t)),u=e+n,d=o+t;0<=u&&u<this.size&&0<=d&&d<this.size&&this.setFunctionModule(u,d,a!=2&&a!=4)}}drawAlignmentPattern(e,o){for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)this.setFunctionModule(e+n,o+t,Math.max(Math.abs(n),Math.abs(t))!=1)}setFunctionModule(e,o,t){this.modules[o][e]=t,this.isFunction[o][e]=!0}addEccAndInterleave(e){const o=this.version,t=this.errorCorrectionLevel;if(e.length!=_.getNumDataCodewords(o,t))throw new RangeError("Invalid argument");const n=_.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][o],a=_.ECC_CODEWORDS_PER_BLOCK[t.ordinal][o],u=Math.floor(_.getNumRawDataModules(o)/8),d=n-u%n,w=Math.floor(u/n);let p=[];const N=_.reedSolomonComputeDivisor(a);for(let h=0,C=0;h<n;h++){let S=e.slice(C,C+w-a+(h<d?0:1));C+=S.length;const T=_.reedSolomonComputeRemainder(S,N);h<d&&S.push(0),p.push(S.concat(T))}let v=[];for(let h=0;h<p[0].length;h++)p.forEach((C,S)=>{(h!=w-a||S>=d)&&v.push(C[h])});return g(v.length==u),v}drawCodewords(e){if(e.length!=Math.floor(_.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let o=0;for(let t=this.size-1;t>=1;t-=2){t==6&&(t=5);for(let n=0;n<this.size;n++)for(let a=0;a<2;a++){const u=t-a,w=(t+1&2)==0?this.size-1-n:n;!this.isFunction[w][u]&&o<e.length*8&&(this.modules[w][u]=c(e[o>>>3],7-(o&7)),o++)}}g(o==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let o=0;o<this.size;o++)for(let t=0;t<this.size;t++){let n;switch(e){case 0:n=(t+o)%2==0;break;case 1:n=o%2==0;break;case 2:n=t%3==0;break;case 3:n=(t+o)%3==0;break;case 4:n=(Math.floor(t/3)+Math.floor(o/2))%2==0;break;case 5:n=t*o%2+t*o%3==0;break;case 6:n=(t*o%2+t*o%3)%2==0;break;case 7:n=((t+o)%2+t*o%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[o][t]&&n&&(this.modules[o][t]=!this.modules[o][t])}}getPenaltyScore(){let e=0;for(let a=0;a<this.size;a++){let u=!1,d=0,w=[0,0,0,0,0,0,0];for(let p=0;p<this.size;p++)this.modules[a][p]==u?(d++,d==5?e+=_.PENALTY_N1:d>5&&e++):(this.finderPenaltyAddHistory(d,w),u||(e+=this.finderPenaltyCountPatterns(w)*_.PENALTY_N3),u=this.modules[a][p],d=1);e+=this.finderPenaltyTerminateAndCount(u,d,w)*_.PENALTY_N3}for(let a=0;a<this.size;a++){let u=!1,d=0,w=[0,0,0,0,0,0,0];for(let p=0;p<this.size;p++)this.modules[p][a]==u?(d++,d==5?e+=_.PENALTY_N1:d>5&&e++):(this.finderPenaltyAddHistory(d,w),u||(e+=this.finderPenaltyCountPatterns(w)*_.PENALTY_N3),u=this.modules[p][a],d=1);e+=this.finderPenaltyTerminateAndCount(u,d,w)*_.PENALTY_N3}for(let a=0;a<this.size-1;a++)for(let u=0;u<this.size-1;u++){const d=this.modules[a][u];d==this.modules[a][u+1]&&d==this.modules[a+1][u]&&d==this.modules[a+1][u+1]&&(e+=_.PENALTY_N2)}let o=0;for(const a of this.modules)o=a.reduce((u,d)=>u+(d?1:0),o);const t=this.size*this.size,n=Math.ceil(Math.abs(o*20-t*10)/t)-1;return g(0<=n&&n<=9),e+=n*_.PENALTY_N4,g(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,o=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let t=[6];for(let n=this.size-7;t.length<e;n-=o)t.splice(1,0,n);return t}}static getNumRawDataModules(e){if(e<_.MIN_VERSION||e>_.MAX_VERSION)throw new RangeError("Version number out of range");let o=(16*e+128)*e+64;if(e>=2){const t=Math.floor(e/7)+2;o-=(25*t-10)*t-55,e>=7&&(o-=36)}return g(208<=o&&o<=29648),o}static getNumDataCodewords(e,o){return Math.floor(_.getNumRawDataModules(e)/8)-_.ECC_CODEWORDS_PER_BLOCK[o.ordinal][e]*_.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let o=[];for(let n=0;n<e-1;n++)o.push(0);o.push(1);let t=1;for(let n=0;n<e;n++){for(let a=0;a<o.length;a++)o[a]=_.reedSolomonMultiply(o[a],t),a+1<o.length&&(o[a]^=o[a+1]);t=_.reedSolomonMultiply(t,2)}return o}static reedSolomonComputeRemainder(e,o){let t=o.map(n=>0);for(const n of e){const a=n^t.shift();t.push(0),o.forEach((u,d)=>t[d]^=_.reedSolomonMultiply(u,a))}return t}static reedSolomonMultiply(e,o){if(e>>>8||o>>>8)throw new RangeError("Byte out of range");let t=0;for(let n=7;n>=0;n--)t=t<<1^(t>>>7)*285,t^=(o>>>n&1)*e;return g(t>>>8==0),t}finderPenaltyCountPatterns(e){const o=e[1];g(o<=this.size*3);const t=o>0&&e[2]==o&&e[3]==o*3&&e[4]==o&&e[5]==o;return(t&&e[0]>=o*4&&e[6]>=o?1:0)+(t&&e[6]>=o*4&&e[0]>=o?1:0)}finderPenaltyTerminateAndCount(e,o,t){return e&&(this.finderPenaltyAddHistory(o,t),o=0),o+=this.size,this.finderPenaltyAddHistory(o,t),this.finderPenaltyCountPatterns(t)}finderPenaltyAddHistory(e,o){o[0]==0&&(e+=this.size),o.pop(),o.unshift(e)}};l.MIN_VERSION=1,l.MAX_VERSION=40,l.PENALTY_N1=3,l.PENALTY_N2=3,l.PENALTY_N3=40,l.PENALTY_N4=10,l.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],l.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],i.QrCode=l;function r(y,e,o){if(e<0||e>31||y>>>e)throw new RangeError("Value out of range");for(let t=e-1;t>=0;t--)o.push(y>>>t&1)}function c(y,e){return(y>>>e&1)!=0}function g(y){if(!y)throw new Error("Assertion error")}const f=class E{constructor(e,o,t){if(this.mode=e,this.numChars=o,this.bitData=t,o<0)throw new RangeError("Invalid argument");this.bitData=t.slice()}static makeBytes(e){let o=[];for(const t of e)r(t,8,o);return new E(E.Mode.BYTE,e.length,o)}static makeNumeric(e){if(!E.isNumeric(e))throw new RangeError("String contains non-numeric characters");let o=[];for(let t=0;t<e.length;){const n=Math.min(e.length-t,3);r(parseInt(e.substring(t,t+n),10),n*3+1,o),t+=n}return new E(E.Mode.NUMERIC,e.length,o)}static makeAlphanumeric(e){if(!E.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let o=[],t;for(t=0;t+2<=e.length;t+=2){let n=E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t))*45;n+=E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t+1)),r(n,11,o)}return t<e.length&&r(E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)),6,o),new E(E.Mode.ALPHANUMERIC,e.length,o)}static makeSegments(e){return e==""?[]:E.isNumeric(e)?[E.makeNumeric(e)]:E.isAlphanumeric(e)?[E.makeAlphanumeric(e)]:[E.makeBytes(E.toUtf8ByteArray(e))]}static makeEci(e){let o=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)r(e,8,o);else if(e<16384)r(2,2,o),r(e,14,o);else if(e<1e6)r(6,3,o),r(e,21,o);else throw new RangeError("ECI assignment value out of range");return new E(E.Mode.ECI,0,o)}static isNumeric(e){return E.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return E.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,o){let t=0;for(const n of e){const a=n.mode.numCharCountBits(o);if(n.numChars>=1<<a)return 1/0;t+=4+a+n.bitData.length}return t}static toUtf8ByteArray(e){e=encodeURI(e);let o=[];for(let t=0;t<e.length;t++)e.charAt(t)!="%"?o.push(e.charCodeAt(t)):(o.push(parseInt(e.substring(t+1,t+3),16)),t+=2);return o}};f.NUMERIC_REGEX=/^[0-9]*$/,f.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,f.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let F=f;i.QrSegment=f})(O||(O={}));(i=>{(l=>{const r=class{constructor(g,f){this.ordinal=g,this.formatBits=f}};r.LOW=new r(0,1),r.MEDIUM=new r(1,0),r.QUARTILE=new r(2,3),r.HIGH=new r(3,2),l.Ecc=r})(i.QrCode||(i.QrCode={}))})(O||(O={}));(i=>{(l=>{const r=class{constructor(g,f){this.modeBits=g,this.numBitsCharCount=f}numCharCountBits(g){return this.numBitsCharCount[Math.floor((g+7)/17)]}};r.NUMERIC=new r(1,[10,12,14]),r.ALPHANUMERIC=new r(2,[9,11,13]),r.BYTE=new r(4,[8,16,16]),r.KANJI=new r(8,[8,10,12]),r.ECI=new r(7,[0,0,0]),l.Mode=r})(i.QrSegment||(i.QrSegment={}))})(O||(O={}));var $=O;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var He={L:$.QrCode.Ecc.LOW,M:$.QrCode.Ecc.MEDIUM,Q:$.QrCode.Ecc.QUARTILE,H:$.QrCode.Ecc.HIGH},be=128,Ae="L",Fe="#FFFFFF",ye="#000000",ve=!1,Ne=1,Ye=4,Xe=0,Ge=.1;function Ce(i,l=0){const r=[];return i.forEach(function(c,g){let f=null;c.forEach(function(F,y){if(!F&&f!==null){r.push(`M${f+l} ${g+l}h${y-f}v1H${f+l}z`),f=null;return}if(y===c.length-1){if(!F)return;f===null?r.push(`M${y+l},${g+l} h1v1H${y+l}z`):r.push(`M${f+l},${g+l} h${y+1-f}v1H${f+l}z`);return}F&&f===null&&(f=y)})}),r.join("")}function Ee(i,l){return i.slice().map((r,c)=>c<l.y||c>=l.y+l.h?r:r.map((g,f)=>f<l.x||f>=l.x+l.w?g:!1))}function Ve(i,l,r,c){if(c==null)return null;const g=i.length+r*2,f=Math.floor(l*Ge),F=g/l,y=(c.width||f)*F,e=(c.height||f)*F,o=c.x==null?i.length/2-y/2:c.x*F,t=c.y==null?i.length/2-e/2:c.y*F,n=c.opacity==null?1:c.opacity;let a=null;if(c.excavate){let d=Math.floor(o),w=Math.floor(t),p=Math.ceil(y+o-d),N=Math.ceil(e+t-w);a={x:d,y:w,w:p,h:N}}const u=c.crossOrigin;return{x:o,y:t,h:e,w:y,excavation:a,opacity:n,crossOrigin:u}}function qe(i,l){return l!=null?Math.max(Math.floor(l),0):i?Ye:Xe}function Se({value:i,level:l,minVersion:r,includeMargin:c,marginSize:g,imageSettings:f,size:F,boostLevel:y}){let e=M.useMemo(()=>{const d=(Array.isArray(i)?i:[i]).reduce((w,p)=>(w.push(...$.QrSegment.makeSegments(p)),w),[]);return $.QrCode.encodeSegments(d,He[l],r,void 0,void 0,y)},[i,l,r,y]);const{cells:o,margin:t,numCells:n,calculatedImageSettings:a}=M.useMemo(()=>{let u=e.getModules();const d=qe(c,g),w=u.length+d*2,p=Ve(u,F,d,f);return{cells:u,margin:d,numCells:w,calculatedImageSettings:p}},[e,F,f,c,g]);return{qrcode:e,margin:t,cells:o,numCells:n,calculatedImageSettings:a}}var We=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),Me=M.forwardRef(function(l,r){const c=l,{value:g,size:f=be,level:F=Ae,bgColor:y=Fe,fgColor:e=ye,includeMargin:o=ve,minVersion:t=Ne,boostLevel:n,marginSize:a,imageSettings:u}=c,w=le(c,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:p}=w,N=le(w,["style"]),v=u==null?void 0:u.src,h=M.useRef(null),C=M.useRef(null),S=M.useCallback(R=>{h.current=R,typeof r=="function"?r(R):r&&(r.current=R)},[r]),[T,D]=M.useState(!1),{margin:z,cells:H,numCells:Q,calculatedImageSettings:P}=Se({value:g,level:F,minVersion:t,boostLevel:n,includeMargin:o,marginSize:a,imageSettings:u,size:f});M.useEffect(()=>{if(h.current!=null){const R=h.current,j=R.getContext("2d");if(!j)return;let X=H;const k=C.current,L=P!=null&&k!==null&&k.complete&&k.naturalHeight!==0&&k.naturalWidth!==0;L&&P.excavation!=null&&(X=Ee(H,P.excavation));const G=window.devicePixelRatio||1;R.height=R.width=f*G;const V=f/Q*G;j.scale(V,V),j.fillStyle=y,j.fillRect(0,0,Q,Q),j.fillStyle=e,We?j.fill(new Path2D(Ce(X,z))):H.forEach(function(ee,te){ee.forEach(function(q,oe){q&&j.fillRect(oe+z,te+z,1,1)})}),P&&(j.globalAlpha=P.opacity),L&&j.drawImage(k,P.x+z,P.y+z,P.w,P.h)}}),M.useEffect(()=>{D(!1)},[v]);const Y=ie({height:f,width:f},p);let B=null;return v!=null&&(B=M.createElement("img",{src:v,key:v,style:{display:"none"},onLoad:()=>{D(!0)},ref:C,crossOrigin:P==null?void 0:P.crossOrigin})),M.createElement(M.Fragment,null,M.createElement("canvas",ie({style:Y,height:f,width:f,ref:S,role:"img"},N)),B)});Me.displayName="QRCodeCanvas";var Ke=M.forwardRef(function(l,r){const c=l,{value:g,size:f=be,level:F=Ae,bgColor:y=Fe,fgColor:e=ye,includeMargin:o=ve,minVersion:t=Ne,boostLevel:n,title:a,marginSize:u,imageSettings:d}=c,w=le(c,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:p,cells:N,numCells:v,calculatedImageSettings:h}=Se({value:g,level:F,minVersion:t,boostLevel:n,includeMargin:o,marginSize:u,imageSettings:d,size:f});let C=N,S=null;d!=null&&h!=null&&(h.excavation!=null&&(C=Ee(N,h.excavation)),S=M.createElement("image",{href:d.src,height:h.h,width:h.w,x:h.x+p,y:h.y+p,preserveAspectRatio:"none",opacity:h.opacity,crossOrigin:h.crossOrigin}));const T=Ce(C,p);return M.createElement("svg",ie({height:f,width:f,viewBox:`0 0 ${v} ${v}`,ref:r,role:"img"},w),!!a&&M.createElement("title",null,a),M.createElement("path",{fill:y,d:`M0,0 h${v}v${v}H0z`,shapeRendering:"crispEdges"}),M.createElement("path",{fill:e,d:T,shapeRendering:"crispEdges"}),S)});Ke.displayName="QRCodeSVG";const Ze=["USDT","ETH","BTC","USDC","DAI","SHIB","XRP","TRX","SOL","BNB","DOGE"],Je={BTC:100,SOL:100,XRP:100,ETH:100,BNB:100,DOGE:100,USDC:50,USDT:50},et=50;function Z(i){return Je[i==null?void 0:i.toUpperCase()]??et}const we=new Set(["USDT","USDC","DAI"]),tt={USDT:2,ETH:6,BTC:8,USDC:2,DAI:2,SHIB:0,XRP:2,TRX:2,SOL:4,BNB:6,DOGE:2},ge=(i,l,r)=>{if(typeof i!="number"||!isFinite(i)||i===0)return"0";const c=r!==void 0?r:tt[l==null?void 0:l.toUpperCase()]||2;return i>0&&i<1e-6?i.toFixed(c>8?c:8):new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:c}).format(i)},ot=i=>typeof i!="number"||!isFinite(i)||i===0?"$0.00":i>0&&i<.01?`$${i.toFixed(6)}`:new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:6}).format(i);function dt(){var ce;const i=$e(),l=Re(),r=((l==null?void 0:l.id)||"").toString(),c=me(pe.selectRows),g=me(pe.selectLoading),[f,F]=A.useState(!1),[y,e]=A.useState("Address copied"),[o,t]=A.useState(!1),[n,a]=A.useState(!1),[u,d]=A.useState({}),[w,p]=A.useState(!1),[N,v]=A.useState(""),[h,C]=A.useState(null),[S,T]=A.useState([]),[D,z]=A.useState(null),[H,Q]=A.useState(0),[P,Y]=A.useState("");A.useEffect(()=>{const m=async()=>{var b;try{p(!0);const I=Be.get(),ne=((b=(await Te.get(`/tenant/${I}/prices`)).data)==null?void 0:b.data)||{},se={};Ze.forEach(K=>{const ae=ne[`${K}USDT`],ue=Number(ae==null?void 0:ae.c);ue>0&&(se[K]=ue)}),d(se)}catch(I){console.error("Failed to fetch exchange rates:",I)}finally{p(!1)}};m();const x=setInterval(m,5*60*1e3);return()=>clearInterval(x)},[]);const{minInCurrency:B,rateAvailable:R}=A.useMemo(()=>{if(!r)return{minInCurrency:0,rateAvailable:!1};const m=r.toUpperCase(),b=we.has(m)?1:u[m];return b?{minInCurrency:Z(r)/b,rateAvailable:!0}:{minInCurrency:0,rateAvailable:!1}},[r,u]),j=A.useMemo(()=>R?B===0?"0":ge(B,r):"...",[B,r,R]),X=A.useMemo(()=>{const m=R?B||0:Number.POSITIVE_INFINITY;return Ie().shape({amount:je().typeError("Amount must be a number").positive("Amount must be positive").required("Amount is required").min(m,R?`Minimum deposit is ${j} ${r}`:"Verifying minimum deposit amount, please wait"),txid:ke().required("Transaction ID is required")})},[B,j,r,R]),k=Le({resolver:Oe.yupResolver(X),mode:"onChange",defaultValues:{amount:"",txid:""}});A.useCallback((m,x)=>ge(m,r,x),[r]);const L=A.useCallback(m=>ot(m),[]);A.useEffect(()=>{i(De.doFetch())},[i]),A.useEffect(()=>{if(!c||!r)return;const m=c.find(x=>!x||!x.symbol?!1:x.symbol.toString().toLowerCase()===r.toString().toLowerCase());if(!m){C(null),T([]),z(null),v("");return}if(C(m),Q(B),Array.isArray(m.network)&&m.network.length>0){const x=m.network.map((I,U)=>({_id:I._id??`${m._id??r}-network-${U}`,name:I.name??I.network??`${m.name??r} Network`,wallet:I.wallet??I.address??I.depositAddress??"",raw:I}));T(x);const b=x.find(I=>I._id===D)||x[0];z(b._id),v(b.wallet||"")}else if(m.address){const x={_id:m._id??`${r}-single`,name:`${m.name??r} Network`,wallet:m.address,raw:null};T([x]),z(x._id),v(x.wallet||"")}else T([]),z(null),v("")},[c,r,B]),A.useEffect(()=>{if(!D)return;const m=S.find(x=>x._id===D);m&&v(m.wallet||"")},[D,S]);const G=A.useCallback(async()=>{if(!N){console.error("No address to copy");return}try{await navigator.clipboard.writeText(N),e("Address copied"),F(!0),setTimeout(()=>F(!1),3e3)}catch(m){console.error("Failed to copy address: ",m),e("Failed to copy address"),F(!0),setTimeout(()=>F(!1),3e3)}},[N]),V=A.useCallback(()=>{var x;const m=document.querySelector(".dw__qr-canvas canvas");if(!(m instanceof HTMLCanvasElement)){console.error("QR canvas not found"),e("Unable to save QR"),F(!0),setTimeout(()=>F(!1),3e3);return}try{const b=document.createElement("a"),I=(((x=S.find(U=>U._id===D))==null?void 0:x.name)||"deposit").replace(/\s+/g,"-");b.download=`${r}-${I}-address.png`,b.href=m.toDataURL("image/png"),b.click(),e("QR code saved"),F(!0),setTimeout(()=>F(!1),3e3)}catch(b){console.error("Failed to save QR code",b),e("Unable to save QR"),F(!0),setTimeout(()=>F(!1),3e3)}},[S,D,r]),ee=A.useCallback(m=>{const x=m.target.value;z(x),k.setValue("amount",""),k.clearErrors("amount")},[k]),te=A.useCallback(async m=>{if(!D||!h||!N){console.error("Missing required information");return}t(!0);try{const x=new Date,b=x.getFullYear(),I=String(x.getMonth()+1).padStart(2,"0"),U=String(x.getDate()).padStart(2,"0"),ne=Math.floor(Math.random()*1e7).toString().padStart(7,"0"),K={orderno:`RE${b}${I}${U}${ne}`,amount:m.amount,txid:m.txid,rechargechannel:r,status:"pending",network:D,rechargetime:x.toISOString()};Y(m.amount),await i(Pe.doCreate(K)),a(!0),k.reset()}catch(x){console.error("Deposit submission error:",x)}finally{t(!1)}},[D,h,N,r,i,k]),q=A.useCallback(()=>{a(!1),Y("")},[]),oe=A.useCallback(m=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${m?m.toUpperCase():""}.png`,[]),W=A.useMemo(()=>{if(!r)return 0;const m=r.toUpperCase();return we.has(m)?1:u[m]||0},[r,u]),re=k.watch("amount"),de=A.useMemo(()=>{if(!re||!W)return 0;const m=Number(re);return isNaN(m)||!isFinite(m)?0:m*W},[re,W]);return s.jsxs("div",{className:"dw__container",children:[s.jsx("div",{className:"dw__header",children:s.jsxs("div",{className:"dw__nav-bar",children:[s.jsx(ze,{to:"/deposit",className:"dw__back-btn remove_blue","aria-label":"Back to deposits",children:s.jsx("i",{className:"fas fa-arrow-left"})}),s.jsxs("div",{className:"dw__page-title",children:["Deposit ",r||"..."]})]})}),s.jsx("div",{className:"dw__content-area",children:s.jsxs("div",{className:"dw__content-wrapper",children:[r&&R&&s.jsxs("div",{className:"dw__info-box",children:[s.jsxs("div",{className:"dw__info-row",children:[s.jsx("span",{className:"dw__info-label",children:"Minimum deposit:"}),s.jsxs("span",{className:"dw__info-value",children:[j," ",r," (",L(Z(r)),")"]})]}),w&&s.jsxs("div",{className:"dw__rate-loading",children:[s.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading rates..."]})]}),s.jsxs("div",{className:"dw__section",children:[s.jsx("div",{className:"dw__section-label",children:"Deposit currency"}),s.jsxs("div",{className:"dw__currency-display",children:[s.jsx("div",{className:"dw__currency-icon","aria-hidden":!0,children:s.jsx("img",{src:oe(r),alt:r,onError:m=>{const x=m.target;x.onerror=null,x.style.display="none";const b=x.parentElement;b&&(b.textContent=r&&r.charAt(0)||"C",b.style.background="#F3BA2F",b.style.color="#000000",b.style.fontSize="14px",b.style.fontWeight="bold",b.style.display="inline-flex",b.style.alignItems="center",b.style.justifyContent="center",b.style.width="36px",b.style.height="36px",b.style.borderRadius="8px")}})}),s.jsxs("div",{className:"dw__currency-details",children:[s.jsx("div",{className:"dw__currency-name",children:(h==null?void 0:h.name)||r}),R&&s.jsxs("div",{className:"dw__currency-rate",children:["1 ",r," ≈ ",L(W)]})]})]}),s.jsx("div",{className:"dw__section-note",children:"Fixed currency - cannot be changed"})]}),S.length>0&&s.jsxs("div",{className:"dw__section",children:[s.jsx("div",{className:"dw__section-label",children:"Deposit network"}),s.jsxs("div",{className:"dw__network-select-wrapper",children:[s.jsx("select",{className:"dw__network-select",value:D||"",onChange:ee,"aria-label":"Select deposit network",children:S.map(m=>s.jsx("option",{value:m._id,children:m.name},m._id))}),s.jsx("div",{className:"dw__select-arrow",children:s.jsx("i",{className:"fas fa-chevron-down"})})]})]}),N&&s.jsxs("div",{className:"dw__qr-section",children:[s.jsx("div",{className:"dw__section-label",children:"Save QR code"}),s.jsxs("div",{className:"dw__qr-container",children:[s.jsx("div",{className:"dw__qr-canvas","aria-hidden":!0,children:s.jsx(Me,{value:N,size:180,bgColor:"#ffffff",fgColor:"#000000",level:"H",includeMargin:!0})}),s.jsxs("div",{className:"dw__address-section",children:[s.jsx("div",{className:"dw__address-label",children:"Wallet Address"}),s.jsx("div",{className:"dw__address-text",id:"walletAddress",children:N}),s.jsxs("div",{className:"dw__address-actions",children:[s.jsxs("button",{type:"button",className:"dw__action-btn dw__copy-btn",onClick:G,"aria-label":"Copy address",children:[s.jsx("i",{className:"fas fa-copy"})," Copy Address"]}),s.jsxs("button",{type:"button",className:"dw__action-btn dw__save-btn",onClick:V,"aria-label":"Save QR code",children:[s.jsx("i",{className:"fas fa-download"})," Save QR Code"]})]})]})]})]}),N&&s.jsx(Ue,{...k,children:s.jsxs("form",{onSubmit:k.handleSubmit(te),className:"dw__form",children:[s.jsx("div",{className:"dw__section",children:s.jsxs("div",{className:"dw__form-group",children:[s.jsxs("div",{className:"dw__input-with-usd",children:[s.jsx(fe,{name:"amount",label:`Amount (${r})`,placeholder:`Minimum: ${j} ${r}`,className:"dw__form-input"}),de>0&&s.jsxs("div",{className:"dw__usd-value-display",children:["≈ ",L(de)]})]}),s.jsxs("div",{className:"dw__min-amount-note",children:["Minimum deposit: ",j," ",r," (",L(Z(r)),")"]})]})}),s.jsx("div",{className:"dw__section",children:s.jsx("div",{className:"dw__form-group",children:s.jsx(fe,{name:"txid",label:"Transaction ID",placeholder:"Enter your transaction ID",className:"dw__form-input"})})}),s.jsx("div",{className:"dw__form-actions",children:s.jsx("button",{type:"submit",className:"dw__submit-btn",disabled:!k.formState.isValid||o||w||!R,"aria-disabled":!k.formState.isValid||o||w||!R,children:o?s.jsxs(s.Fragment,{children:[s.jsx("i",{className:"fas fa-spinner fa-spin"})," Processing..."]}):w?s.jsxs(s.Fragment,{children:[s.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading rates..."]}):"Confirm Deposit"})})]})}),g&&s.jsxs("div",{className:"dw__loading-section",role:"status","aria-live":"polite",children:[s.jsx("div",{className:"dw__spinner"}),s.jsx("div",{className:"dw__loading-text",children:"Loading deposit information..."})]}),!g&&!N&&r&&s.jsxs("div",{className:"dw__error-section",role:"alert",children:[s.jsx("i",{className:"fas fa-exclamation-triangle dw__error-icon"}),s.jsxs("div",{className:"dw__error-text",children:["No deposit address found for ",r]}),s.jsx("div",{className:"dw__error-note",children:"Please contact support or try another currency."})]}),s.jsxs("div",{className:"dw__hint-section",children:[s.jsx("div",{className:"dw__hint-title",children:"Important Notes"}),s.jsxs("div",{className:"dw__hint-content",children:[s.jsxs("div",{className:"dw__hint-item",children:["1. Send only ",r," to this deposit address. Sending other currencies may result in permanent loss."]}),s.jsxs("div",{className:"dw__hint-item",children:["2. Ensure you are using the correct network (",(ce=S.find(m=>m._id===D))==null?void 0:ce.name,")."]}),s.jsxs("div",{className:"dw__hint-item",children:["3. Minimum deposit amount: ",j," ",r," ($",Z(r)," USD equivalent)"]}),s.jsx("div",{className:"dw__hint-item",children:"4. Transactions typically require 1-3 network confirmations before being credited to your account."}),s.jsx("div",{className:"dw__hint-item",children:"5. Always double-check the address before sending funds."})]})]})]})}),s.jsxs("div",{className:`dw__toast ${f?"dw__toast--visible":""}`,role:"status","aria-live":"polite",children:[s.jsx("i",{className:"fas fa-check-circle dw__toast-icon"}),y]}),n&&s.jsx("div",{className:"dw__modal-overlay",role:"dialog","aria-modal":"true",children:s.jsxs("div",{className:"dw__modal-content",children:[s.jsxs("div",{className:"dw__modal-header",children:[s.jsx("h3",{className:"dw__modal-title",children:"Deposit Submitted Successfully"}),s.jsx("button",{className:"dw__modal-close",onClick:q,"aria-label":"Close",children:s.jsx("i",{className:"fas fa-times"})})]}),s.jsxs("div",{className:"dw__modal-body",children:[s.jsx("div",{className:"dw__modal-success-icon",children:s.jsx("i",{className:"fas fa-check-circle"})}),s.jsxs("div",{className:"dw__modal-success-message",children:["Your deposit of ",P," ",r," has been submitted for processing."]}),s.jsxs("div",{className:"dw__modal-success-details",children:[s.jsx("p",{children:"Please wait for network confirmations. This usually takes 5-30 minutes."}),s.jsx("p",{children:"You can track the status in your transaction history."})]})]}),s.jsx("div",{className:"dw__modal-footer",children:s.jsx("button",{className:"dw__modal-btn",onClick:q,children:"OK"})})]})}),s.jsx("style",{children:`
        /* ── Root Container ── */
        .dw__container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: #000000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #FFFFFF;
        }

        /* ── Header / Top Bar ── */
        .dw__header {
          display: flex;
          align-items: center;
          height: 56px;
          padding: 0 16px;
          background: #1A1A1A;
          border-bottom: 1px solid #2a2a2e;
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(10px);
        }
        .dw__nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .dw__back-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          color: #FFFFFF;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .dw__back-btn:hover { 
          background: #2a2a2e; 
          border-color: #F3BA2F; 
          color: #F3BA2F; 
          transform: translateX(-2px);
        }
        .dw__page-title {
          color: #FFFFFF;
          font-size: 18px;
          font-weight: bold;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          letter-spacing: 0.3px;
        }

        /* ── Content Area ── */
        .dw__content-area {
          background: #000000;
          padding: 20px 16px;
          min-height: calc(100vh - 56px);
        }
        .dw__content-wrapper { 
          width: 100%; 
        }

        /* ── Info Box ── */
        .dw__info-box {
          background: rgba(243, 186, 47, 0.08);
          border: 1px solid rgba(243, 186, 47, 0.25);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(243, 186, 47, 0.1);
        }
        .dw__info-row { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 4px; 
        }
        .dw__info-label { 
          font-size: 13px; 
          color: #F3BA2F; 
          font-weight: 600; 
        }
        .dw__info-value { 
          font-size: 13px; 
          font-weight: 700; 
          color: #FFFFFF; 
        }
        .dw__rate-loading { 
          font-size: 12px; 
          color: #AAAAAA; 
          text-align: center; 
          margin-top: 6px; 
        }

        /* ── Section ── */
        .dw__section { 
          margin-bottom: 20px; 
        }
        .dw__section-label {
          font-size: 13px;
          font-weight: bold;
          color: #AAAAAA;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }
        .dw__section-note { 
          font-size: 12px; 
          color: #AAAAAA; 
          margin-top: 8px; 
          font-style: italic; 
        }

        /* ── Currency Display ── */
        .dw__currency-display {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          border-radius: 12px;
          padding: 16px;
          transition: all 0.3s ease;
        }
        .dw__currency-display:hover {
          border-color: #F3BA2F;
          box-shadow: 0 0 0 2px rgba(243, 186, 47, 0.1);
        }
        .dw__currency-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #000000;
          border: 1px solid #2a2a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        .dw__currency-icon img { 
          width: 100%; 
          height: 100%; 
          object-fit: contain; 
        }
        .dw__currency-details { 
          flex: 1; 
        }
        .dw__currency-name { 
          font-size: 16px; 
          font-weight: 700; 
          color: #FFFFFF; 
          margin-bottom: 4px; 
        }
        .dw__currency-rate { 
          font-size: 12px; 
          color: #AAAAAA; 
        }

        /* ── Network Select ── */
        .dw__network-select-wrapper { 
          position: relative; 
        }
        .dw__network-select {
          width: 100%;
          padding: 14px 42px 14px 16px;
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          border-radius: 12px;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 600;
          appearance: none;
          cursor: pointer;
          outline: none;
          transition: all 0.3s ease;
        }
        .dw__network-select:hover {
          border-color: #F3BA2F;
        }
        .dw__network-select:focus { 
          border-color: #F3BA2F; 
          box-shadow: 0 0 0 2px rgba(243, 186, 47, 0.1);
        }
        .dw__select-arrow {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #AAAAAA;
          pointer-events: none;
          font-size: 12px;
        }

        /* ── QR Section ── */
        .dw__qr-section { 
          margin-bottom: 24px; 
        }
        .dw__qr-container {
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        .dw__qr-canvas {
          padding: 16px;
          background: #FFFFFF;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }
        .dw__qr-canvas:hover {
          transform: scale(1.02);
        }
        .dw__qr-canvas canvas { 
          border-radius: 8px; 
          display: block; 
        }
        .dw__address-section { 
          width: 100%; 
          text-align: center; 
        }
        .dw__address-label { 
          font-size: 13px; 
          font-weight: bold; 
          color: #AAAAAA; 
          text-transform: uppercase; 
          letter-spacing: 0.5px; 
          margin-bottom: 12px; 
        }
        .dw__address-text {
          font-size: 12px;
          color: #CCCCCC;
          background: #000000;
          border: 1px solid #2a2a2e;
          padding: 14px;
          border-radius: 10px;
          word-break: break-all;
          font-family: 'Courier New', monospace;
          line-height: 1.6;
          margin-bottom: 16px;
          transition: border-color 0.3s ease;
        }
        .dw__address-text:hover {
          border-color: #F3BA2F;
        }
        .dw__address-actions { 
          display: flex; 
          gap: 12px; 
          justify-content: center; 
          flex-wrap: wrap; 
        }
        .dw__action-btn {
          flex: 1;
          min-width: 130px;
          padding: 12px 16px;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        .dw__action-btn:hover { 
          transform: translateY(-2px); 
        }
        .dw__copy-btn { 
          background: linear-gradient(135deg, #F3BA2F, #FF9800); 
          color: #000000; 
          box-shadow: 0 2px 8px rgba(243, 186, 47, 0.3);
        }
        .dw__copy-btn:hover { 
          box-shadow: 0 4px 12px rgba(243, 186, 47, 0.4);
          background: linear-gradient(135deg, #FF9800, #F3BA2F);
        }
        .dw__save-btn { 
          background: #1A1A1A; 
          color: #FFFFFF; 
          border: 1.5px solid #2a2a2e; 
        }
        .dw__save-btn:hover { 
          border-color: #F3BA2F; 
          color: #F3BA2F; 
          background: #2a2a2e;
        }

        /* ── Form ── */
        .dw__form { 
          margin-top: 8px; 
        }
        .dw__form-group { 
          margin-bottom: 8px; 
        }
        .dw__input-with-usd { 
          position: relative; 
        }
        
        .dw__form input[type="text"],
        .dw__form input[type="number"],
        .dw__form input {
          background: #1A1A1A !important;
          border: 1px solid #2a2a2e !important;
          border-radius: 12px !important;
          color: #FFFFFF !important;
          padding: 14px 16px !important;
          font-size: 14px !important;
          width: 100% !important;
          outline: none !important;
          box-sizing: border-box !important;
          transition: all 0.3s ease !important;
        }
        .dw__form input:hover {
          border-color: #F3BA2F !important;
        }
        .dw__form input:focus {
          border-color: #F3BA2F !important;
          box-shadow: 0 0 0 2px rgba(243, 186, 47, 0.1) !important;
        }
        .dw__form label {
          color: #AAAAAA !important;
          font-size: 13px !important;
          font-weight: bold !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          margin-bottom: 8px !important;
          display: block !important;
        }
        .dw__usd-value-display {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          color: #AAAAAA;
          background: #1A1A1A;
          padding: 4px 10px;
          border-radius: 8px;
          pointer-events: none;
          border: 1px solid #2a2a2e;
        }
        .dw__min-amount-note { 
          font-size: 12px; 
          color: #AAAAAA; 
          margin-top: 8px; 
        }

        /* ── Submit Button ── */
        .dw__form-actions { 
          margin-top: 24px; 
        }
        .dw__submit-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #F3BA2F, #FF9800);
          color: #000000;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(243, 186, 47, 0.3);
        }
        .dw__submit-btn:hover:not(:disabled) { 
          background: linear-gradient(135deg, #FF9800, #F3BA2F);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(243, 186, 47, 0.4);
        }
        .dw__submit-btn:disabled { 
          background: #2a2a2e; 
          color: #666666; 
          cursor: not-allowed; 
          transform: none;
          box-shadow: none;
        }

        /* ── Loading State ── */
        .fa-spin { 
          animation: dwSpin 1s infinite linear; 
        }
        @keyframes dwSpin { 
          0% { transform: rotate(0deg); } 
          100% { transform: rotate(360deg); } 
        }
        .dw__loading-section { 
          text-align: center; 
          padding: 40px 0; 
        }
        .dw__spinner {
          border: 3px solid #2a2a2e;
          border-top: 3px solid #F3BA2F;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: dwSpin 1s linear infinite;
          margin: 0 auto 16px;
        }
        .dw__loading-text {
          color: #AAAAAA;
          font-size: 14px;
        }

        /* ── Error State ── */
        .dw__error-section { 
          text-align: center; 
          padding: 40px 20px; 
        }
        .dw__error-icon { 
          font-size: 48px; 
          color: #F3BA2F; 
          margin-bottom: 16px; 
          display: block; 
        }
        .dw__error-text { 
          color: #AAAAAA; 
          font-size: 16px; 
          font-weight: 600;
        }
        .dw__error-note { 
          margin-top: 12px; 
          font-size: 14px; 
          color: #666666; 
        }

        /* ── Hint Section ── */
        .dw__hint-section {
          margin-top: 32px;
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          border-radius: 16px;
          padding: 20px;
        }
        .dw__hint-title { 
          font-size: 16px; 
          font-weight: bold; 
          color: #FFFFFF; 
          margin-bottom: 16px; 
        }
        .dw__hint-content { 
          display: flex; 
          flex-direction: column; 
          gap: 12px; 
        }
        .dw__hint-item {
          font-size: 13px;
          color: #AAAAAA;
          line-height: 1.6;
          padding-left: 20px;
          position: relative;
        }
        .dw__hint-item::before { 
          content: "•"; 
          position: absolute; 
          left: 4px; 
          color: #F3BA2F; 
          font-weight: bold; 
          font-size: 18px;
        }

        /* ── Toast Notification ── */
        .dw__toast {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%) translateY(80px);
          background: #1A1A1A;
          border: 1px solid #F3BA2F;
          color: #FFFFFF;
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 9999;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        }
        .dw__toast--visible { 
          transform: translateX(-50%) translateY(0); 
        }
        .dw__toast-icon { 
          color: #F3BA2F; 
          font-size: 18px;
        }

        /* ── Success Modal ── */
        .dw__modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
          animation: dwFadeIn 0.3s ease;
        }
        @keyframes dwFadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        .dw__modal-content {
          background: #1A1A1A;
          border: 1px solid #2a2a2e;
          border-radius: 20px;
          width: 90%;
          max-width: 380px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          animation: dwSlideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes dwSlideUp {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .dw__modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid #2a2a2e;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .dw__modal-title { 
          margin: 0; 
          font-size: 18px; 
          font-weight: bold; 
          color: #FFFFFF; 
        }
        .dw__modal-close {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #2a2a2e;
          border: none;
          color: #AAAAAA;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .dw__modal-close:hover { 
          background: #F3BA2F; 
          color: #000000; 
        }
        .dw__modal-body { 
          padding: 32px 24px; 
          text-align: center; 
        }
        .dw__modal-success-icon { 
          font-size: 64px; 
          color: #F3BA2F; 
          margin-bottom: 20px; 
        }
        .dw__modal-success-message { 
          font-size: 16px; 
          color: #FFFFFF; 
          font-weight: bold; 
          margin-bottom: 16px; 
        }
        .dw__modal-success-details { 
          font-size: 14px; 
          color: #AAAAAA; 
          line-height: 1.6; 
        }
        .dw__modal-success-details p { 
          margin: 8px 0; 
        }
        .dw__modal-footer { 
          padding: 20px 24px; 
          border-top: 1px solid #2a2a2e; 
        }
        .dw__modal-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #F3BA2F, #FF9800);
          color: #000000;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(243, 186, 47, 0.3);
        }
        .dw__modal-btn:hover { 
          background: linear-gradient(135deg, #FF9800, #F3BA2F);
          box-shadow: 0 4px 12px rgba(243, 186, 47, 0.4);
          transform: translateY(-2px);
        }

        /* ── Responsive Design ── */
        @media (max-width: 768px) {
          .dw__container {
            max-width: 100%;
          }
          .dw__content-area {
            padding: 16px 12px;
          }
          .dw__page-title {
            font-size: 16px;
          }
        }
      `})]})}export{dt as default};
