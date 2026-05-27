import{i as M,Q as Ce,u as ae,X as ie,o as F,Z as Ne,_ as Ee,$ as Se,Y as Me,a0 as Re,j as n,L as je,V as ke}from"./index-49a858b3.js";import{u as Ie,y as Pe,F as De}from"./FormErrors-f5876ab4.js";import{F as le}from"./FieldFormItem-eb6f057d.js";import{u as ze}from"./useDispatch-71f7155d.js";var Be=Object.defineProperty,J=Object.getOwnPropertySymbols,pe=Object.prototype.hasOwnProperty,me=Object.prototype.propertyIsEnumerable,de=(l,i,s)=>i in l?Be(l,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):l[i]=s,oe=(l,i)=>{for(var s in i||(i={}))pe.call(i,s)&&de(l,s,i[s]);if(J)for(var s of J(i))me.call(i,s)&&de(l,s,i[s]);return l},se=(l,i)=>{var s={};for(var u in l)pe.call(l,u)&&i.indexOf(u)<0&&(s[u]=l[u]);if(l!=null&&J)for(var u of J(l))i.indexOf(u)<0&&me.call(l,u)&&(s[u]=l[u]);return s};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var O;(l=>{const i=class x{constructor(e,o,t,r){if(this.version=e,this.errorCorrectionLevel=o,this.modules=[],this.isFunction=[],e<x.MIN_VERSION||e>x.MAX_VERSION)throw new RangeError("Version value out of range");if(r<-1||r>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let a=[];for(let d=0;d<this.size;d++)a.push(!1);for(let d=0;d<this.size;d++)this.modules.push(a.slice()),this.isFunction.push(a.slice());this.drawFunctionPatterns();const c=this.addEccAndInterleave(t);if(this.drawCodewords(c),r==-1){let d=1e9;for(let w=0;w<8;w++){this.applyMask(w),this.drawFormatBits(w);const m=this.getPenaltyScore();m<d&&(r=w,d=m),this.applyMask(w)}}g(0<=r&&r<=7),this.mask=r,this.applyMask(r),this.drawFormatBits(r),this.isFunction=[]}static encodeText(e,o){const t=l.QrSegment.makeSegments(e);return x.encodeSegments(t,o)}static encodeBinary(e,o){const t=l.QrSegment.makeBytes(e);return x.encodeSegments([t],o)}static encodeSegments(e,o,t=1,r=40,a=-1,c=!0){if(!(x.MIN_VERSION<=t&&t<=r&&r<=x.MAX_VERSION)||a<-1||a>7)throw new RangeError("Invalid value");let d,w;for(d=t;;d++){const f=x.getNumDataCodewords(d,o)*8,N=A.getTotalBits(e,d);if(N<=f){w=N;break}if(d>=r)throw new RangeError("Data too long")}for(const f of[x.Ecc.MEDIUM,x.Ecc.QUARTILE,x.Ecc.HIGH])c&&w<=x.getNumDataCodewords(d,f)*8&&(o=f);let m=[];for(const f of e){s(f.mode.modeBits,4,m),s(f.numChars,f.mode.numCharCountBits(d),m);for(const N of f.getData())m.push(N)}g(m.length==w);const C=x.getNumDataCodewords(d,o)*8;g(m.length<=C),s(0,Math.min(4,C-m.length),m),s(0,(8-m.length%8)%8,m),g(m.length%8==0);for(let f=236;m.length<C;f^=253)s(f,8,m);let v=[];for(;v.length*8<m.length;)v.push(0);return m.forEach((f,N)=>v[N>>>3]|=f<<7-(N&7)),new x(d,o,v,a)}getModule(e,o){return 0<=e&&e<this.size&&0<=o&&o<this.size&&this.modules[o][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let t=0;t<this.size;t++)this.setFunctionModule(6,t,t%2==0),this.setFunctionModule(t,6,t%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),o=e.length;for(let t=0;t<o;t++)for(let r=0;r<o;r++)t==0&&r==0||t==0&&r==o-1||t==o-1&&r==0||this.drawAlignmentPattern(e[t],e[r]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const o=this.errorCorrectionLevel.formatBits<<3|e;let t=o;for(let a=0;a<10;a++)t=t<<1^(t>>>9)*1335;const r=(o<<10|t)^21522;g(r>>>15==0);for(let a=0;a<=5;a++)this.setFunctionModule(8,a,u(r,a));this.setFunctionModule(8,7,u(r,6)),this.setFunctionModule(8,8,u(r,7)),this.setFunctionModule(7,8,u(r,8));for(let a=9;a<15;a++)this.setFunctionModule(14-a,8,u(r,a));for(let a=0;a<8;a++)this.setFunctionModule(this.size-1-a,8,u(r,a));for(let a=8;a<15;a++)this.setFunctionModule(8,this.size-15+a,u(r,a));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let t=0;t<12;t++)e=e<<1^(e>>>11)*7973;const o=this.version<<12|e;g(o>>>18==0);for(let t=0;t<18;t++){const r=u(o,t),a=this.size-11+t%3,c=Math.floor(t/3);this.setFunctionModule(a,c,r),this.setFunctionModule(c,a,r)}}drawFinderPattern(e,o){for(let t=-4;t<=4;t++)for(let r=-4;r<=4;r++){const a=Math.max(Math.abs(r),Math.abs(t)),c=e+r,d=o+t;0<=c&&c<this.size&&0<=d&&d<this.size&&this.setFunctionModule(c,d,a!=2&&a!=4)}}drawAlignmentPattern(e,o){for(let t=-2;t<=2;t++)for(let r=-2;r<=2;r++)this.setFunctionModule(e+r,o+t,Math.max(Math.abs(r),Math.abs(t))!=1)}setFunctionModule(e,o,t){this.modules[o][e]=t,this.isFunction[o][e]=!0}addEccAndInterleave(e){const o=this.version,t=this.errorCorrectionLevel;if(e.length!=x.getNumDataCodewords(o,t))throw new RangeError("Invalid argument");const r=x.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][o],a=x.ECC_CODEWORDS_PER_BLOCK[t.ordinal][o],c=Math.floor(x.getNumRawDataModules(o)/8),d=r-c%r,w=Math.floor(c/r);let m=[];const C=x.reedSolomonComputeDivisor(a);for(let f=0,N=0;f<r;f++){let S=e.slice(N,N+w-a+(f<d?0:1));N+=S.length;const T=x.reedSolomonComputeRemainder(S,C);f<d&&S.push(0),m.push(S.concat(T))}let v=[];for(let f=0;f<m[0].length;f++)m.forEach((N,S)=>{(f!=w-a||S>=d)&&v.push(N[f])});return g(v.length==c),v}drawCodewords(e){if(e.length!=Math.floor(x.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let o=0;for(let t=this.size-1;t>=1;t-=2){t==6&&(t=5);for(let r=0;r<this.size;r++)for(let a=0;a<2;a++){const c=t-a,w=(t+1&2)==0?this.size-1-r:r;!this.isFunction[w][c]&&o<e.length*8&&(this.modules[w][c]=u(e[o>>>3],7-(o&7)),o++)}}g(o==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let o=0;o<this.size;o++)for(let t=0;t<this.size;t++){let r;switch(e){case 0:r=(t+o)%2==0;break;case 1:r=o%2==0;break;case 2:r=t%3==0;break;case 3:r=(t+o)%3==0;break;case 4:r=(Math.floor(t/3)+Math.floor(o/2))%2==0;break;case 5:r=t*o%2+t*o%3==0;break;case 6:r=(t*o%2+t*o%3)%2==0;break;case 7:r=((t+o)%2+t*o%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[o][t]&&r&&(this.modules[o][t]=!this.modules[o][t])}}getPenaltyScore(){let e=0;for(let a=0;a<this.size;a++){let c=!1,d=0,w=[0,0,0,0,0,0,0];for(let m=0;m<this.size;m++)this.modules[a][m]==c?(d++,d==5?e+=x.PENALTY_N1:d>5&&e++):(this.finderPenaltyAddHistory(d,w),c||(e+=this.finderPenaltyCountPatterns(w)*x.PENALTY_N3),c=this.modules[a][m],d=1);e+=this.finderPenaltyTerminateAndCount(c,d,w)*x.PENALTY_N3}for(let a=0;a<this.size;a++){let c=!1,d=0,w=[0,0,0,0,0,0,0];for(let m=0;m<this.size;m++)this.modules[m][a]==c?(d++,d==5?e+=x.PENALTY_N1:d>5&&e++):(this.finderPenaltyAddHistory(d,w),c||(e+=this.finderPenaltyCountPatterns(w)*x.PENALTY_N3),c=this.modules[m][a],d=1);e+=this.finderPenaltyTerminateAndCount(c,d,w)*x.PENALTY_N3}for(let a=0;a<this.size-1;a++)for(let c=0;c<this.size-1;c++){const d=this.modules[a][c];d==this.modules[a][c+1]&&d==this.modules[a+1][c]&&d==this.modules[a+1][c+1]&&(e+=x.PENALTY_N2)}let o=0;for(const a of this.modules)o=a.reduce((c,d)=>c+(d?1:0),o);const t=this.size*this.size,r=Math.ceil(Math.abs(o*20-t*10)/t)-1;return g(0<=r&&r<=9),e+=r*x.PENALTY_N4,g(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,o=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let t=[6];for(let r=this.size-7;t.length<e;r-=o)t.splice(1,0,r);return t}}static getNumRawDataModules(e){if(e<x.MIN_VERSION||e>x.MAX_VERSION)throw new RangeError("Version number out of range");let o=(16*e+128)*e+64;if(e>=2){const t=Math.floor(e/7)+2;o-=(25*t-10)*t-55,e>=7&&(o-=36)}return g(208<=o&&o<=29648),o}static getNumDataCodewords(e,o){return Math.floor(x.getNumRawDataModules(e)/8)-x.ECC_CODEWORDS_PER_BLOCK[o.ordinal][e]*x.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let o=[];for(let r=0;r<e-1;r++)o.push(0);o.push(1);let t=1;for(let r=0;r<e;r++){for(let a=0;a<o.length;a++)o[a]=x.reedSolomonMultiply(o[a],t),a+1<o.length&&(o[a]^=o[a+1]);t=x.reedSolomonMultiply(t,2)}return o}static reedSolomonComputeRemainder(e,o){let t=o.map(r=>0);for(const r of e){const a=r^t.shift();t.push(0),o.forEach((c,d)=>t[d]^=x.reedSolomonMultiply(c,a))}return t}static reedSolomonMultiply(e,o){if(e>>>8||o>>>8)throw new RangeError("Byte out of range");let t=0;for(let r=7;r>=0;r--)t=t<<1^(t>>>7)*285,t^=(o>>>r&1)*e;return g(t>>>8==0),t}finderPenaltyCountPatterns(e){const o=e[1];g(o<=this.size*3);const t=o>0&&e[2]==o&&e[3]==o*3&&e[4]==o&&e[5]==o;return(t&&e[0]>=o*4&&e[6]>=o?1:0)+(t&&e[6]>=o*4&&e[0]>=o?1:0)}finderPenaltyTerminateAndCount(e,o,t){return e&&(this.finderPenaltyAddHistory(o,t),o=0),o+=this.size,this.finderPenaltyAddHistory(o,t),this.finderPenaltyCountPatterns(t)}finderPenaltyAddHistory(e,o){o[0]==0&&(e+=this.size),o.pop(),o.unshift(e)}};i.MIN_VERSION=1,i.MAX_VERSION=40,i.PENALTY_N1=3,i.PENALTY_N2=3,i.PENALTY_N3=40,i.PENALTY_N4=10,i.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],i.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],l.QrCode=i;function s(y,e,o){if(e<0||e>31||y>>>e)throw new RangeError("Value out of range");for(let t=e-1;t>=0;t--)o.push(y>>>t&1)}function u(y,e){return(y>>>e&1)!=0}function g(y){if(!y)throw new Error("Assertion error")}const h=class E{constructor(e,o,t){if(this.mode=e,this.numChars=o,this.bitData=t,o<0)throw new RangeError("Invalid argument");this.bitData=t.slice()}static makeBytes(e){let o=[];for(const t of e)s(t,8,o);return new E(E.Mode.BYTE,e.length,o)}static makeNumeric(e){if(!E.isNumeric(e))throw new RangeError("String contains non-numeric characters");let o=[];for(let t=0;t<e.length;){const r=Math.min(e.length-t,3);s(parseInt(e.substring(t,t+r),10),r*3+1,o),t+=r}return new E(E.Mode.NUMERIC,e.length,o)}static makeAlphanumeric(e){if(!E.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let o=[],t;for(t=0;t+2<=e.length;t+=2){let r=E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t))*45;r+=E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t+1)),s(r,11,o)}return t<e.length&&s(E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)),6,o),new E(E.Mode.ALPHANUMERIC,e.length,o)}static makeSegments(e){return e==""?[]:E.isNumeric(e)?[E.makeNumeric(e)]:E.isAlphanumeric(e)?[E.makeAlphanumeric(e)]:[E.makeBytes(E.toUtf8ByteArray(e))]}static makeEci(e){let o=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)s(e,8,o);else if(e<16384)s(2,2,o),s(e,14,o);else if(e<1e6)s(6,3,o),s(e,21,o);else throw new RangeError("ECI assignment value out of range");return new E(E.Mode.ECI,0,o)}static isNumeric(e){return E.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return E.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,o){let t=0;for(const r of e){const a=r.mode.numCharCountBits(o);if(r.numChars>=1<<a)return 1/0;t+=4+a+r.bitData.length}return t}static toUtf8ByteArray(e){e=encodeURI(e);let o=[];for(let t=0;t<e.length;t++)e.charAt(t)!="%"?o.push(e.charCodeAt(t)):(o.push(parseInt(e.substring(t+1,t+3),16)),t+=2);return o}};h.NUMERIC_REGEX=/^[0-9]*$/,h.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,h.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let A=h;l.QrSegment=h})(O||(O={}));(l=>{(i=>{const s=class{constructor(g,h){this.ordinal=g,this.formatBits=h}};s.LOW=new s(0,1),s.MEDIUM=new s(1,0),s.QUARTILE=new s(2,3),s.HIGH=new s(3,2),i.Ecc=s})(l.QrCode||(l.QrCode={}))})(O||(O={}));(l=>{(i=>{const s=class{constructor(g,h){this.modeBits=g,this.numBitsCharCount=h}numCharCountBits(g){return this.numBitsCharCount[Math.floor((g+7)/17)]}};s.NUMERIC=new s(1,[10,12,14]),s.ALPHANUMERIC=new s(2,[9,11,13]),s.BYTE=new s(4,[8,16,16]),s.KANJI=new s(8,[8,10,12]),s.ECI=new s(7,[0,0,0]),i.Mode=s})(l.QrSegment||(l.QrSegment={}))})(O||(O={}));var $=O;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var Le={L:$.QrCode.Ecc.LOW,M:$.QrCode.Ecc.MEDIUM,Q:$.QrCode.Ecc.QUARTILE,H:$.QrCode.Ecc.HIGH},he=128,fe="L",we="#FFFFFF",ge="#000000",xe=!1,_e=1,Te=4,Ue=0,Oe=.1;function be(l,i=0){const s=[];return l.forEach(function(u,g){let h=null;u.forEach(function(A,y){if(!A&&h!==null){s.push(`M${h+i} ${g+i}h${y-h}v1H${h+i}z`),h=null;return}if(y===u.length-1){if(!A)return;h===null?s.push(`M${y+i},${g+i} h1v1H${y+i}z`):s.push(`M${h+i},${g+i} h${y+1-h}v1H${h+i}z`);return}A&&h===null&&(h=y)})}),s.join("")}function Ae(l,i){return l.slice().map((s,u)=>u<i.y||u>=i.y+i.h?s:s.map((g,h)=>h<i.x||h>=i.x+i.w?g:!1))}function $e(l,i,s,u){if(u==null)return null;const g=l.length+s*2,h=Math.floor(i*Oe),A=g/i,y=(u.width||h)*A,e=(u.height||h)*A,o=u.x==null?l.length/2-y/2:u.x*A,t=u.y==null?l.length/2-e/2:u.y*A,r=u.opacity==null?1:u.opacity;let a=null;if(u.excavate){let d=Math.floor(o),w=Math.floor(t),m=Math.ceil(y+o-d),C=Math.ceil(e+t-w);a={x:d,y:w,w:m,h:C}}const c=u.crossOrigin;return{x:o,y:t,h:e,w:y,excavation:a,opacity:r,crossOrigin:c}}function Qe(l,i){return i!=null?Math.max(Math.floor(i),0):l?Te:Ue}function Fe({value:l,level:i,minVersion:s,includeMargin:u,marginSize:g,imageSettings:h,size:A,boostLevel:y}){let e=M.useMemo(()=>{const d=(Array.isArray(l)?l:[l]).reduce((w,m)=>(w.push(...$.QrSegment.makeSegments(m)),w),[]);return $.QrCode.encodeSegments(d,Le[i],s,void 0,void 0,y)},[l,i,s,y]);const{cells:o,margin:t,numCells:r,calculatedImageSettings:a}=M.useMemo(()=>{let c=e.getModules();const d=Qe(u,g),w=c.length+d*2,m=$e(c,A,d,h);return{cells:c,margin:d,numCells:w,calculatedImageSettings:m}},[e,A,h,u,g]);return{qrcode:e,margin:t,cells:o,numCells:r,calculatedImageSettings:a}}var He=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),ye=M.forwardRef(function(i,s){const u=i,{value:g,size:h=he,level:A=fe,bgColor:y=we,fgColor:e=ge,includeMargin:o=xe,minVersion:t=_e,boostLevel:r,marginSize:a,imageSettings:c}=u,w=se(u,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:m}=w,C=se(w,["style"]),v=c==null?void 0:c.src,f=M.useRef(null),N=M.useRef(null),S=M.useCallback(k=>{f.current=k,typeof s=="function"?s(k):s&&(s.current=k)},[s]),[T,j]=M.useState(!1),{margin:D,cells:Y,numCells:Q,calculatedImageSettings:I}=Fe({value:g,level:A,minVersion:t,boostLevel:r,includeMargin:o,marginSize:a,imageSettings:c,size:h});M.useEffect(()=>{if(f.current!=null){const k=f.current,z=k.getContext("2d");if(!z)return;let P=Y;const L=N.current,G=I!=null&&L!==null&&L.complete&&L.naturalHeight!==0&&L.naturalWidth!==0;G&&I.excavation!=null&&(P=Ae(Y,I.excavation));const V=window.devicePixelRatio||1;k.height=k.width=h*V;const q=h/Q*V;z.scale(q,q),z.fillStyle=y,z.fillRect(0,0,Q,Q),z.fillStyle=e,He?z.fill(new Path2D(be(P,D))):Y.forEach(function(ee,W){ee.forEach(function(te,H){te&&z.fillRect(H+D,W+D,1,1)})}),I&&(z.globalAlpha=I.opacity),G&&z.drawImage(L,I.x+D,I.y+D,I.w,I.h)}}),M.useEffect(()=>{j(!1)},[v]);const X=oe({height:h,width:h},m);let B=null;return v!=null&&(B=M.createElement("img",{src:v,key:v,style:{display:"none"},onLoad:()=>{j(!0)},ref:N,crossOrigin:I==null?void 0:I.crossOrigin})),M.createElement(M.Fragment,null,M.createElement("canvas",oe({style:X,height:h,width:h,ref:S,role:"img"},C)),B)});ye.displayName="QRCodeCanvas";var Ye=M.forwardRef(function(i,s){const u=i,{value:g,size:h=he,level:A=fe,bgColor:y=we,fgColor:e=ge,includeMargin:o=xe,minVersion:t=_e,boostLevel:r,title:a,marginSize:c,imageSettings:d}=u,w=se(u,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:m,cells:C,numCells:v,calculatedImageSettings:f}=Fe({value:g,level:A,minVersion:t,boostLevel:r,includeMargin:o,marginSize:c,imageSettings:d,size:h});let N=C,S=null;d!=null&&f!=null&&(f.excavation!=null&&(N=Ae(C,f.excavation)),S=M.createElement("image",{href:d.src,height:f.h,width:f.w,x:f.x+m,y:f.y+m,preserveAspectRatio:"none",opacity:f.opacity,crossOrigin:f.crossOrigin}));const T=be(N,m);return M.createElement("svg",oe({height:h,width:h,viewBox:`0 0 ${v} ${v}`,ref:s,role:"img"},w),!!a&&M.createElement("title",null,a),M.createElement("path",{fill:y,d:`M0,0 h${v}v${v}H0z`,shapeRendering:"crispEdges"}),M.createElement("path",{fill:e,d:T,shapeRendering:"crispEdges"}),S)});Ye.displayName="QRCodeSVG";const ce=["USDT","ETH","BTC","USDC","DAI","SHIB","XRP","TRX","SOL","BNB","DOGE"],Z=200,Xe={USDT:2,ETH:6,BTC:8,USDC:2,DAI:2,SHIB:0,XRP:2,TRX:2,SOL:4,BNB:6,DOGE:2},ue=(l,i,s)=>{if(typeof l!="number"||!isFinite(l)||l===0)return"0";const u=s!==void 0?s:Xe[i==null?void 0:i.toUpperCase()]||2;return l>0&&l<1e-6?l.toFixed(u>8?u:8):new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:u}).format(l)},Ge=l=>typeof l!="number"||!isFinite(l)||l===0?"$0.00":l>0&&l<.01?`$${l.toFixed(6)}`:new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:6}).format(l);function tt(){var ne;const l=ze(),i=Ce(),s=((i==null?void 0:i.id)||"").toString(),u=ae(ie.selectRows),g=ae(ie.selectLoading),[h,A]=F.useState(!1),[y,e]=F.useState("Address copied"),[o,t]=F.useState(!1),[r,a]=F.useState(!1),[c,d]=F.useState({}),[w,m]=F.useState(!1),[C,v]=F.useState(""),[f,N]=F.useState(null),[S,T]=F.useState([]),[j,D]=F.useState(null),[Y,Q]=F.useState(0),[I,X]=F.useState("");F.useEffect(()=>{const p=async()=>{try{m(!0);const b=await ke.get("https://min-api.cryptocompare.com/data/pricemulti",{params:{fsyms:ce.join(","),tsyms:"USD"}});if(b.data&&b.data.Response!=="Error"){const R={};ce.forEach(U=>{var K;(K=b.data[U])!=null&&K.USD&&(R[U]=b.data[U].USD)}),d(R)}}catch(b){console.error("Failed to fetch exchange rates:",b)}finally{m(!1)}};p();const _=setInterval(p,5*60*1e3);return()=>clearInterval(_)},[]);const B=F.useMemo(()=>{if(!s||!c[s.toUpperCase()])return 0;const p=c[s.toUpperCase()];return Z/p},[s,c]),k=F.useMemo(()=>B===0?"0":ue(B,s),[B,s]),z=F.useMemo(()=>Ne().shape({amount:Ee().typeError("Amount must be a number").positive("Amount must be positive").required("Amount is required").min(B||0,`Minimum deposit is ${k} ${s}`),txid:Se().required("Transaction ID is required")}),[B,k,s]),P=Ie({resolver:Pe.yupResolver(z),mode:"onChange",defaultValues:{amount:"",txid:""}});F.useCallback((p,_)=>ue(p,s,_),[s]);const L=F.useCallback(p=>Ge(p),[]);F.useEffect(()=>{l(Me.doFetch())},[l]),F.useEffect(()=>{if(!u||!s)return;const p=u.find(_=>!_||!_.symbol?!1:_.symbol.toString().toLowerCase()===s.toString().toLowerCase());if(!p){N(null),T([]),D(null),v("");return}if(N(p),Q(B),Array.isArray(p.network)&&p.network.length>0){const _=p.network.map((R,U)=>({_id:R._id??`${p._id??s}-network-${U}`,name:R.name??R.network??`${p.name??s} Network`,wallet:R.wallet??R.address??R.depositAddress??"",raw:R}));T(_);const b=_.find(R=>R._id===j)||_[0];D(b._id),v(b.wallet||"")}else if(p.address){const _={_id:p._id??`${s}-single`,name:`${p.name??s} Network`,wallet:p.address,raw:null};T([_]),D(_._id),v(_.wallet||"")}else T([]),D(null),v("")},[u,s,B]),F.useEffect(()=>{if(!j)return;const p=S.find(_=>_._id===j);p&&v(p.wallet||"")},[j,S]);const G=F.useCallback(async()=>{if(!C){console.error("No address to copy");return}try{await navigator.clipboard.writeText(C),e("Address copied"),A(!0),setTimeout(()=>A(!1),3e3)}catch(p){console.error("Failed to copy address: ",p),e("Failed to copy address"),A(!0),setTimeout(()=>A(!1),3e3)}},[C]),V=F.useCallback(()=>{var _;const p=document.querySelector(".dw__qr-canvas canvas");if(!(p instanceof HTMLCanvasElement)){console.error("QR canvas not found"),e("Unable to save QR"),A(!0),setTimeout(()=>A(!1),3e3);return}try{const b=document.createElement("a"),R=(((_=S.find(U=>U._id===j))==null?void 0:_.name)||"deposit").replace(/\s+/g,"-");b.download=`${s}-${R}-address.png`,b.href=p.toDataURL("image/png"),b.click(),e("QR code saved"),A(!0),setTimeout(()=>A(!1),3e3)}catch(b){console.error("Failed to save QR code",b),e("Unable to save QR"),A(!0),setTimeout(()=>A(!1),3e3)}},[S,j,s]),q=F.useCallback(p=>{const _=p.target.value;D(_),P.setValue("amount",""),P.clearErrors("amount")},[P]),ee=F.useCallback(async p=>{if(!j||!f||!C){console.error("Missing required information");return}t(!0);try{const _=new Date,b=_.getFullYear(),R=String(_.getMonth()+1).padStart(2,"0"),U=String(_.getDate()).padStart(2,"0"),K=Math.floor(Math.random()*1e7).toString().padStart(7,"0"),ve={orderno:`RE${b}${R}${U}${K}`,amount:p.amount,txid:p.txid,rechargechannel:s,status:"pending",network:j,rechargetime:_.toISOString()};X(p.amount),await l(Re.doCreate(ve)),a(!0),P.reset()}catch(_){console.error("Deposit submission error:",_)}finally{t(!1)}},[j,f,C,s,l,P]),W=F.useCallback(()=>{a(!1),X("")},[]),te=F.useCallback(p=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${p?p.toUpperCase():""}.png`,[]),H=P.watch("amount"),re=F.useMemo(()=>{if(!H||!c[s==null?void 0:s.toUpperCase()])return 0;const p=Number(H);return isNaN(p)||!isFinite(p)?0:p*c[s.toUpperCase()]},[H,s,c]);return n.jsxs("div",{className:"dw__container",children:[n.jsx("div",{className:"dw__header",children:n.jsxs("div",{className:"dw__nav-bar",children:[n.jsx(je,{to:"/deposit",className:"dw__back-btn remove_blue","aria-label":"Back to deposits",children:n.jsx("i",{className:"fas fa-arrow-left"})}),n.jsxs("div",{className:"dw__page-title",children:["Deposit ",s||"..."]})]})}),n.jsx("div",{className:"dw__content-area",children:n.jsxs("div",{className:"dw__content-wrapper",children:[s&&c[s.toUpperCase()]&&n.jsxs("div",{className:"dw__info-box",children:[n.jsxs("div",{className:"dw__info-row",children:[n.jsx("span",{className:"dw__info-label",children:"Minimum deposit:"}),n.jsxs("span",{className:"dw__info-value",children:[k," ",s," (",L(Z),")"]})]}),w&&n.jsxs("div",{className:"dw__rate-loading",children:[n.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading rates..."]})]}),n.jsxs("div",{className:"dw__section",children:[n.jsx("div",{className:"dw__section-label",children:"Deposit currency"}),n.jsxs("div",{className:"dw__currency-display",children:[n.jsx("div",{className:"dw__currency-icon","aria-hidden":!0,children:n.jsx("img",{src:te(s),alt:s,onError:p=>{const _=p.target;_.onerror=null,_.style.display="none";const b=_.parentElement;b&&(b.textContent=s&&s.charAt(0)||"C",b.style.background="#F3BA2F",b.style.color="#000000",b.style.fontSize="14px",b.style.fontWeight="bold",b.style.display="inline-flex",b.style.alignItems="center",b.style.justifyContent="center",b.style.width="36px",b.style.height="36px",b.style.borderRadius="8px")}})}),n.jsxs("div",{className:"dw__currency-details",children:[n.jsx("div",{className:"dw__currency-name",children:(f==null?void 0:f.name)||s}),c[s==null?void 0:s.toUpperCase()]&&n.jsxs("div",{className:"dw__currency-rate",children:["1 ",s," ≈ ",L(c[s.toUpperCase()])]})]})]}),n.jsx("div",{className:"dw__section-note",children:"Fixed currency - cannot be changed"})]}),S.length>0&&n.jsxs("div",{className:"dw__section",children:[n.jsx("div",{className:"dw__section-label",children:"Deposit network"}),n.jsxs("div",{className:"dw__network-select-wrapper",children:[n.jsx("select",{className:"dw__network-select",value:j||"",onChange:q,"aria-label":"Select deposit network",children:S.map(p=>n.jsx("option",{value:p._id,children:p.name},p._id))}),n.jsx("div",{className:"dw__select-arrow",children:n.jsx("i",{className:"fas fa-chevron-down"})})]})]}),C&&n.jsxs("div",{className:"dw__qr-section",children:[n.jsx("div",{className:"dw__section-label",children:"Save QR code"}),n.jsxs("div",{className:"dw__qr-container",children:[n.jsx("div",{className:"dw__qr-canvas","aria-hidden":!0,children:n.jsx(ye,{value:C,size:180,bgColor:"#ffffff",fgColor:"#000000",level:"H",includeMargin:!0})}),n.jsxs("div",{className:"dw__address-section",children:[n.jsx("div",{className:"dw__address-label",children:"Wallet Address"}),n.jsx("div",{className:"dw__address-text",id:"walletAddress",children:C}),n.jsxs("div",{className:"dw__address-actions",children:[n.jsxs("button",{type:"button",className:"dw__action-btn dw__copy-btn",onClick:G,"aria-label":"Copy address",children:[n.jsx("i",{className:"fas fa-copy"})," Copy Address"]}),n.jsxs("button",{type:"button",className:"dw__action-btn dw__save-btn",onClick:V,"aria-label":"Save QR code",children:[n.jsx("i",{className:"fas fa-download"})," Save QR Code"]})]})]})]})]}),C&&n.jsx(De,{...P,children:n.jsxs("form",{onSubmit:P.handleSubmit(ee),className:"dw__form",children:[n.jsx("div",{className:"dw__section",children:n.jsxs("div",{className:"dw__form-group",children:[n.jsxs("div",{className:"dw__input-with-usd",children:[n.jsx(le,{name:"amount",label:`Amount (${s})`,placeholder:`Minimum: ${k} ${s}`,className:"dw__form-input"}),re>0&&n.jsxs("div",{className:"dw__usd-value-display",children:["≈ ",L(re)]})]}),n.jsxs("div",{className:"dw__min-amount-note",children:["Minimum deposit: ",k," ",s," (",L(Z),")"]})]})}),n.jsx("div",{className:"dw__section",children:n.jsx("div",{className:"dw__form-group",children:n.jsx(le,{name:"txid",label:"Transaction ID",placeholder:"Enter your transaction ID",className:"dw__form-input"})})}),n.jsx("div",{className:"dw__form-actions",children:n.jsx("button",{type:"submit",className:"dw__submit-btn",disabled:!P.formState.isValid||o||w,"aria-disabled":!P.formState.isValid||o||w,children:o?n.jsxs(n.Fragment,{children:[n.jsx("i",{className:"fas fa-spinner fa-spin"})," Processing..."]}):w?n.jsxs(n.Fragment,{children:[n.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading rates..."]}):"Confirm Deposit"})})]})}),g&&n.jsxs("div",{className:"dw__loading-section",role:"status","aria-live":"polite",children:[n.jsx("div",{className:"dw__spinner"}),n.jsx("div",{className:"dw__loading-text",children:"Loading deposit information..."})]}),!g&&!C&&s&&n.jsxs("div",{className:"dw__error-section",role:"alert",children:[n.jsx("i",{className:"fas fa-exclamation-triangle dw__error-icon"}),n.jsxs("div",{className:"dw__error-text",children:["No deposit address found for ",s]}),n.jsx("div",{className:"dw__error-note",children:"Please contact support or try another currency."})]}),n.jsxs("div",{className:"dw__hint-section",children:[n.jsx("div",{className:"dw__hint-title",children:"Important Notes"}),n.jsxs("div",{className:"dw__hint-content",children:[n.jsxs("div",{className:"dw__hint-item",children:["1. Send only ",s," to this deposit address. Sending other currencies may result in permanent loss."]}),n.jsxs("div",{className:"dw__hint-item",children:["2. Ensure you are using the correct network (",(ne=S.find(p=>p._id===j))==null?void 0:ne.name,")."]}),n.jsxs("div",{className:"dw__hint-item",children:["3. Minimum deposit amount: ",k," ",s," ($",Z," USD equivalent)"]}),n.jsx("div",{className:"dw__hint-item",children:"4. Transactions typically require 1-3 network confirmations before being credited to your account."}),n.jsx("div",{className:"dw__hint-item",children:"5. Always double-check the address before sending funds."})]})]})]})}),n.jsxs("div",{className:`dw__toast ${h?"dw__toast--visible":""}`,role:"status","aria-live":"polite",children:[n.jsx("i",{className:"fas fa-check-circle dw__toast-icon"}),y]}),r&&n.jsx("div",{className:"dw__modal-overlay",role:"dialog","aria-modal":"true",children:n.jsxs("div",{className:"dw__modal-content",children:[n.jsxs("div",{className:"dw__modal-header",children:[n.jsx("h3",{className:"dw__modal-title",children:"Deposit Submitted Successfully"}),n.jsx("button",{className:"dw__modal-close",onClick:W,"aria-label":"Close",children:n.jsx("i",{className:"fas fa-times"})})]}),n.jsxs("div",{className:"dw__modal-body",children:[n.jsx("div",{className:"dw__modal-success-icon",children:n.jsx("i",{className:"fas fa-check-circle"})}),n.jsxs("div",{className:"dw__modal-success-message",children:["Your deposit of ",I," ",s," has been submitted for processing."]}),n.jsxs("div",{className:"dw__modal-success-details",children:[n.jsx("p",{children:"Please wait for network confirmations. This usually takes 5-30 minutes."}),n.jsx("p",{children:"You can track the status in your transaction history."})]})]}),n.jsx("div",{className:"dw__modal-footer",children:n.jsx("button",{className:"dw__modal-btn",onClick:W,children:"OK"})})]})}),n.jsx("style",{children:`
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
      `})]})}export{tt as default};
