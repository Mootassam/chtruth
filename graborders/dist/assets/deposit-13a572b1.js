import{D as N,u as pe,w as ge,r as R,j as m,E as we,F as T,G as xe}from"./index-3e05aead.js";import{S as Ee}from"./SubHeader-a5fb8eed.js";import{u as Ae,y as Ce,F as be,a as k}from"./FormErrors-16345895.js";import{F as X}from"./FieldFormItem-4c15ef7f.js";import{u as Ne}from"./useDispatch-23525796.js";var Me=Object.defineProperty,O=Object.getOwnPropertySymbols,q=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable,K=(h,s,i)=>s in h?Me(h,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):h[s]=i,_=(h,s)=>{for(var i in s||(s={}))q.call(s,i)&&K(h,i,s[i]);if(O)for(var i of O(s))Z.call(s,i)&&K(h,i,s[i]);return h},Q=(h,s)=>{var i={};for(var d in h)q.call(h,d)&&s.indexOf(d)<0&&(i[d]=h[d]);if(h!=null&&O)for(var d of O(h))s.indexOf(d)<0&&Z.call(h,d)&&(i[d]=h[d]);return i};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var P;(h=>{const s=class w{constructor(e,t,o,n){if(this.version=e,this.errorCorrectionLevel=t,this.modules=[],this.isFunction=[],e<w.MIN_VERSION||e>w.MAX_VERSION)throw new RangeError("Version value out of range");if(n<-1||n>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let r=[];for(let a=0;a<this.size;a++)r.push(!1);for(let a=0;a<this.size;a++)this.modules.push(r.slice()),this.isFunction.push(r.slice());this.drawFunctionPatterns();const l=this.addEccAndInterleave(o);if(this.drawCodewords(l),n==-1){let a=1e9;for(let c=0;c<8;c++){this.applyMask(c),this.drawFormatBits(c);const u=this.getPenaltyScore();u<a&&(n=c,a=u),this.applyMask(c)}}g(0<=n&&n<=7),this.mask=n,this.applyMask(n),this.drawFormatBits(n),this.isFunction=[]}static encodeText(e,t){const o=h.QrSegment.makeSegments(e);return w.encodeSegments(o,t)}static encodeBinary(e,t){const o=h.QrSegment.makeBytes(e);return w.encodeSegments([o],t)}static encodeSegments(e,t,o=1,n=40,r=-1,l=!0){if(!(w.MIN_VERSION<=o&&o<=n&&n<=w.MAX_VERSION)||r<-1||r>7)throw new RangeError("Invalid value");let a,c;for(a=o;;a++){const p=w.getNumDataCodewords(a,t)*8,A=b.getTotalBits(e,a);if(A<=p){c=A;break}if(a>=n)throw new RangeError("Data too long")}for(const p of[w.Ecc.MEDIUM,w.Ecc.QUARTILE,w.Ecc.HIGH])l&&c<=w.getNumDataCodewords(a,p)*8&&(t=p);let u=[];for(const p of e){i(p.mode.modeBits,4,u),i(p.numChars,p.mode.numCharCountBits(a),u);for(const A of p.getData())u.push(A)}g(u.length==c);const M=w.getNumDataCodewords(a,t)*8;g(u.length<=M),i(0,Math.min(4,M-u.length),u),i(0,(8-u.length%8)%8,u),g(u.length%8==0);for(let p=236;u.length<M;p^=253)i(p,8,u);let C=[];for(;C.length*8<u.length;)C.push(0);return u.forEach((p,A)=>C[A>>>3]|=p<<7-(A&7)),new w(a,t,C,r)}getModule(e,t){return 0<=e&&e<this.size&&0<=t&&t<this.size&&this.modules[t][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let o=0;o<this.size;o++)this.setFunctionModule(6,o,o%2==0),this.setFunctionModule(o,6,o%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),t=e.length;for(let o=0;o<t;o++)for(let n=0;n<t;n++)o==0&&n==0||o==0&&n==t-1||o==t-1&&n==0||this.drawAlignmentPattern(e[o],e[n]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const t=this.errorCorrectionLevel.formatBits<<3|e;let o=t;for(let r=0;r<10;r++)o=o<<1^(o>>>9)*1335;const n=(t<<10|o)^21522;g(n>>>15==0);for(let r=0;r<=5;r++)this.setFunctionModule(8,r,d(n,r));this.setFunctionModule(8,7,d(n,6)),this.setFunctionModule(8,8,d(n,7)),this.setFunctionModule(7,8,d(n,8));for(let r=9;r<15;r++)this.setFunctionModule(14-r,8,d(n,r));for(let r=0;r<8;r++)this.setFunctionModule(this.size-1-r,8,d(n,r));for(let r=8;r<15;r++)this.setFunctionModule(8,this.size-15+r,d(n,r));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let o=0;o<12;o++)e=e<<1^(e>>>11)*7973;const t=this.version<<12|e;g(t>>>18==0);for(let o=0;o<18;o++){const n=d(t,o),r=this.size-11+o%3,l=Math.floor(o/3);this.setFunctionModule(r,l,n),this.setFunctionModule(l,r,n)}}drawFinderPattern(e,t){for(let o=-4;o<=4;o++)for(let n=-4;n<=4;n++){const r=Math.max(Math.abs(n),Math.abs(o)),l=e+n,a=t+o;0<=l&&l<this.size&&0<=a&&a<this.size&&this.setFunctionModule(l,a,r!=2&&r!=4)}}drawAlignmentPattern(e,t){for(let o=-2;o<=2;o++)for(let n=-2;n<=2;n++)this.setFunctionModule(e+n,t+o,Math.max(Math.abs(n),Math.abs(o))!=1)}setFunctionModule(e,t,o){this.modules[t][e]=o,this.isFunction[t][e]=!0}addEccAndInterleave(e){const t=this.version,o=this.errorCorrectionLevel;if(e.length!=w.getNumDataCodewords(t,o))throw new RangeError("Invalid argument");const n=w.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][t],r=w.ECC_CODEWORDS_PER_BLOCK[o.ordinal][t],l=Math.floor(w.getNumRawDataModules(t)/8),a=n-l%n,c=Math.floor(l/n);let u=[];const M=w.reedSolomonComputeDivisor(r);for(let p=0,A=0;p<n;p++){let v=e.slice(A,A+c-r+(p<a?0:1));A+=v.length;const B=w.reedSolomonComputeRemainder(v,M);p<a&&v.push(0),u.push(v.concat(B))}let C=[];for(let p=0;p<u[0].length;p++)u.forEach((A,v)=>{(p!=c-r||v>=a)&&C.push(A[p])});return g(C.length==l),C}drawCodewords(e){if(e.length!=Math.floor(w.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let t=0;for(let o=this.size-1;o>=1;o-=2){o==6&&(o=5);for(let n=0;n<this.size;n++)for(let r=0;r<2;r++){const l=o-r,c=(o+1&2)==0?this.size-1-n:n;!this.isFunction[c][l]&&t<e.length*8&&(this.modules[c][l]=d(e[t>>>3],7-(t&7)),t++)}}g(t==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let t=0;t<this.size;t++)for(let o=0;o<this.size;o++){let n;switch(e){case 0:n=(o+t)%2==0;break;case 1:n=t%2==0;break;case 2:n=o%3==0;break;case 3:n=(o+t)%3==0;break;case 4:n=(Math.floor(o/3)+Math.floor(t/2))%2==0;break;case 5:n=o*t%2+o*t%3==0;break;case 6:n=(o*t%2+o*t%3)%2==0;break;case 7:n=((o+t)%2+o*t%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[t][o]&&n&&(this.modules[t][o]=!this.modules[t][o])}}getPenaltyScore(){let e=0;for(let r=0;r<this.size;r++){let l=!1,a=0,c=[0,0,0,0,0,0,0];for(let u=0;u<this.size;u++)this.modules[r][u]==l?(a++,a==5?e+=w.PENALTY_N1:a>5&&e++):(this.finderPenaltyAddHistory(a,c),l||(e+=this.finderPenaltyCountPatterns(c)*w.PENALTY_N3),l=this.modules[r][u],a=1);e+=this.finderPenaltyTerminateAndCount(l,a,c)*w.PENALTY_N3}for(let r=0;r<this.size;r++){let l=!1,a=0,c=[0,0,0,0,0,0,0];for(let u=0;u<this.size;u++)this.modules[u][r]==l?(a++,a==5?e+=w.PENALTY_N1:a>5&&e++):(this.finderPenaltyAddHistory(a,c),l||(e+=this.finderPenaltyCountPatterns(c)*w.PENALTY_N3),l=this.modules[u][r],a=1);e+=this.finderPenaltyTerminateAndCount(l,a,c)*w.PENALTY_N3}for(let r=0;r<this.size-1;r++)for(let l=0;l<this.size-1;l++){const a=this.modules[r][l];a==this.modules[r][l+1]&&a==this.modules[r+1][l]&&a==this.modules[r+1][l+1]&&(e+=w.PENALTY_N2)}let t=0;for(const r of this.modules)t=r.reduce((l,a)=>l+(a?1:0),t);const o=this.size*this.size,n=Math.ceil(Math.abs(t*20-o*10)/o)-1;return g(0<=n&&n<=9),e+=n*w.PENALTY_N4,g(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,t=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let o=[6];for(let n=this.size-7;o.length<e;n-=t)o.splice(1,0,n);return o}}static getNumRawDataModules(e){if(e<w.MIN_VERSION||e>w.MAX_VERSION)throw new RangeError("Version number out of range");let t=(16*e+128)*e+64;if(e>=2){const o=Math.floor(e/7)+2;t-=(25*o-10)*o-55,e>=7&&(t-=36)}return g(208<=t&&t<=29648),t}static getNumDataCodewords(e,t){return Math.floor(w.getNumRawDataModules(e)/8)-w.ECC_CODEWORDS_PER_BLOCK[t.ordinal][e]*w.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let t=[];for(let n=0;n<e-1;n++)t.push(0);t.push(1);let o=1;for(let n=0;n<e;n++){for(let r=0;r<t.length;r++)t[r]=w.reedSolomonMultiply(t[r],o),r+1<t.length&&(t[r]^=t[r+1]);o=w.reedSolomonMultiply(o,2)}return t}static reedSolomonComputeRemainder(e,t){let o=t.map(n=>0);for(const n of e){const r=n^o.shift();o.push(0),t.forEach((l,a)=>o[a]^=w.reedSolomonMultiply(l,r))}return o}static reedSolomonMultiply(e,t){if(e>>>8||t>>>8)throw new RangeError("Byte out of range");let o=0;for(let n=7;n>=0;n--)o=o<<1^(o>>>7)*285,o^=(t>>>n&1)*e;return g(o>>>8==0),o}finderPenaltyCountPatterns(e){const t=e[1];g(t<=this.size*3);const o=t>0&&e[2]==t&&e[3]==t*3&&e[4]==t&&e[5]==t;return(o&&e[0]>=t*4&&e[6]>=t?1:0)+(o&&e[6]>=t*4&&e[0]>=t?1:0)}finderPenaltyTerminateAndCount(e,t,o){return e&&(this.finderPenaltyAddHistory(t,o),t=0),t+=this.size,this.finderPenaltyAddHistory(t,o),this.finderPenaltyCountPatterns(o)}finderPenaltyAddHistory(e,t){t[0]==0&&(e+=this.size),t.pop(),t.unshift(e)}};s.MIN_VERSION=1,s.MAX_VERSION=40,s.PENALTY_N1=3,s.PENALTY_N2=3,s.PENALTY_N3=40,s.PENALTY_N4=10,s.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],s.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],h.QrCode=s;function i(x,e,t){if(e<0||e>31||x>>>e)throw new RangeError("Value out of range");for(let o=e-1;o>=0;o--)t.push(x>>>o&1)}function d(x,e){return(x>>>e&1)!=0}function g(x){if(!x)throw new Error("Assertion error")}const f=class E{constructor(e,t,o){if(this.mode=e,this.numChars=t,this.bitData=o,t<0)throw new RangeError("Invalid argument");this.bitData=o.slice()}static makeBytes(e){let t=[];for(const o of e)i(o,8,t);return new E(E.Mode.BYTE,e.length,t)}static makeNumeric(e){if(!E.isNumeric(e))throw new RangeError("String contains non-numeric characters");let t=[];for(let o=0;o<e.length;){const n=Math.min(e.length-o,3);i(parseInt(e.substring(o,o+n),10),n*3+1,t),o+=n}return new E(E.Mode.NUMERIC,e.length,t)}static makeAlphanumeric(e){if(!E.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let t=[],o;for(o=0;o+2<=e.length;o+=2){let n=E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(o))*45;n+=E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(o+1)),i(n,11,t)}return o<e.length&&i(E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(o)),6,t),new E(E.Mode.ALPHANUMERIC,e.length,t)}static makeSegments(e){return e==""?[]:E.isNumeric(e)?[E.makeNumeric(e)]:E.isAlphanumeric(e)?[E.makeAlphanumeric(e)]:[E.makeBytes(E.toUtf8ByteArray(e))]}static makeEci(e){let t=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)i(e,8,t);else if(e<16384)i(2,2,t),i(e,14,t);else if(e<1e6)i(6,3,t),i(e,21,t);else throw new RangeError("ECI assignment value out of range");return new E(E.Mode.ECI,0,t)}static isNumeric(e){return E.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return E.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,t){let o=0;for(const n of e){const r=n.mode.numCharCountBits(t);if(n.numChars>=1<<r)return 1/0;o+=4+r+n.bitData.length}return o}static toUtf8ByteArray(e){e=encodeURI(e);let t=[];for(let o=0;o<e.length;o++)e.charAt(o)!="%"?t.push(e.charCodeAt(o)):(t.push(parseInt(e.substring(o+1,o+3),16)),o+=2);return t}};f.NUMERIC_REGEX=/^[0-9]*$/,f.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,f.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let b=f;h.QrSegment=f})(P||(P={}));(h=>{(s=>{const i=class{constructor(g,f){this.ordinal=g,this.formatBits=f}};i.LOW=new i(0,1),i.MEDIUM=new i(1,0),i.QUARTILE=new i(2,3),i.HIGH=new i(3,2),s.Ecc=i})(h.QrCode||(h.QrCode={}))})(P||(P={}));(h=>{(s=>{const i=class{constructor(g,f){this.modeBits=g,this.numBitsCharCount=f}numCharCountBits(g){return this.numBitsCharCount[Math.floor((g+7)/17)]}};i.NUMERIC=new i(1,[10,12,14]),i.ALPHANUMERIC=new i(2,[9,11,13]),i.BYTE=new i(4,[8,16,16]),i.KANJI=new i(8,[8,10,12]),i.ECI=new i(7,[0,0,0]),s.Mode=i})(h.QrSegment||(h.QrSegment={}))})(P||(P={}));var I=P;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var ve={L:I.QrCode.Ecc.LOW,M:I.QrCode.Ecc.MEDIUM,Q:I.QrCode.Ecc.QUARTILE,H:I.QrCode.Ecc.HIGH},J=128,ee="L",te="#FFFFFF",oe="#000000",ne=!1,re=1,Fe=4,Se=0,ye=.1;function se(h,s=0){const i=[];return h.forEach(function(d,g){let f=null;d.forEach(function(b,x){if(!b&&f!==null){i.push(`M${f+s} ${g+s}h${x-f}v1H${f+s}z`),f=null;return}if(x===d.length-1){if(!b)return;f===null?i.push(`M${x+s},${g+s} h1v1H${x+s}z`):i.push(`M${f+s},${g+s} h${x+1-f}v1H${f+s}z`);return}b&&f===null&&(f=x)})}),i.join("")}function ie(h,s){return h.slice().map((i,d)=>d<s.y||d>=s.y+s.h?i:i.map((g,f)=>f<s.x||f>=s.x+s.w?g:!1))}function Re(h,s,i,d){if(d==null)return null;const g=h.length+i*2,f=Math.floor(s*ye),b=g/s,x=(d.width||f)*b,e=(d.height||f)*b,t=d.x==null?h.length/2-x/2:d.x*b,o=d.y==null?h.length/2-e/2:d.y*b,n=d.opacity==null?1:d.opacity;let r=null;if(d.excavate){let a=Math.floor(t),c=Math.floor(o),u=Math.ceil(x+t-a),M=Math.ceil(e+o-c);r={x:a,y:c,w:u,h:M}}const l=d.crossOrigin;return{x:t,y:o,h:e,w:x,excavation:r,opacity:n,crossOrigin:l}}function Pe(h,s){return s!=null?Math.max(Math.floor(s),0):h?Fe:Se}function ae({value:h,level:s,minVersion:i,includeMargin:d,marginSize:g,imageSettings:f,size:b,boostLevel:x}){let e=N.useMemo(()=>{const a=(Array.isArray(h)?h:[h]).reduce((c,u)=>(c.push(...I.QrSegment.makeSegments(u)),c),[]);return I.QrCode.encodeSegments(a,ve[s],i,void 0,void 0,x)},[h,s,i,x]);const{cells:t,margin:o,numCells:n,calculatedImageSettings:r}=N.useMemo(()=>{let l=e.getModules();const a=Pe(d,g),c=l.length+a*2,u=Re(l,b,a,f);return{cells:l,margin:a,numCells:c,calculatedImageSettings:u}},[e,b,f,d,g]);return{qrcode:e,margin:o,cells:t,numCells:n,calculatedImageSettings:r}}var Ie=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),le=N.forwardRef(function(s,i){const d=s,{value:g,size:f=J,level:b=ee,bgColor:x=te,fgColor:e=oe,includeMargin:t=ne,minVersion:o=re,boostLevel:n,marginSize:r,imageSettings:l}=d,c=Q(d,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:u}=c,M=Q(c,["style"]),C=l==null?void 0:l.src,p=N.useRef(null),A=N.useRef(null),v=N.useCallback(y=>{p.current=y,typeof i=="function"?i(y):i&&(i.current=y)},[i]),[B,$]=N.useState(!1),{margin:D,cells:j,numCells:U,calculatedImageSettings:F}=ae({value:g,level:b,minVersion:o,boostLevel:n,includeMargin:t,marginSize:r,imageSettings:l,size:f});N.useEffect(()=>{if(p.current!=null){const y=p.current,S=y.getContext("2d");if(!S)return;let V=j;const L=A.current,Y=F!=null&&L!==null&&L.complete&&L.naturalHeight!==0&&L.naturalWidth!==0;Y&&F.excavation!=null&&(V=ie(j,F.excavation));const G=window.devicePixelRatio||1;y.height=y.width=f*G;const W=f/U*G;S.scale(W,W),S.fillStyle=x,S.fillRect(0,0,U,U),S.fillStyle=e,Ie?S.fill(new Path2D(se(V,D))):j.forEach(function(ue,he){ue.forEach(function(fe,me){fe&&S.fillRect(me+D,he+D,1,1)})}),F&&(S.globalAlpha=F.opacity),Y&&S.drawImage(L,F.x+D,F.y+D,F.w,F.h)}}),N.useEffect(()=>{$(!1)},[C]);const de=_({height:f,width:f},u);let H=null;return C!=null&&(H=N.createElement("img",{src:C,key:C,style:{display:"none"},onLoad:()=>{$(!0)},ref:A,crossOrigin:F==null?void 0:F.crossOrigin})),N.createElement(N.Fragment,null,N.createElement("canvas",_({style:de,height:f,width:f,ref:v,role:"img"},M)),H)});le.displayName="QRCodeCanvas";var De=N.forwardRef(function(s,i){const d=s,{value:g,size:f=J,level:b=ee,bgColor:x=te,fgColor:e=oe,includeMargin:t=ne,minVersion:o=re,boostLevel:n,title:r,marginSize:l,imageSettings:a}=d,c=Q(d,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:u,cells:M,numCells:C,calculatedImageSettings:p}=ae({value:g,level:b,minVersion:o,boostLevel:n,includeMargin:t,marginSize:l,imageSettings:a,size:f});let A=M,v=null;a!=null&&p!=null&&(p.excavation!=null&&(A=ie(M,p.excavation)),v=N.createElement("image",{href:a.src,height:p.h,width:p.w,x:p.x+u,y:p.y+u,preserveAspectRatio:"none",opacity:p.opacity,crossOrigin:p.crossOrigin}));const B=se(A,u);return N.createElement("svg",_({height:f,width:f,viewBox:`0 0 ${C} ${C}`,ref:i,role:"img"},c),!!r&&N.createElement("title",null,r),N.createElement("path",{fill:x,d:`M0,0 h${C}v${C}H0z`,shapeRendering:"crispEdges"}),N.createElement("path",{fill:e,d:B,shapeRendering:"crispEdges"}),v)});De.displayName="QRCodeSVG";const ce={USDT:30,SOL:.232,BTC:.0087,ETH:.0071,XRP:16.9},z=[{id:"btc",name:"Bitcoin",icon:"fab fa-btc",color:"#F3BA2F",address:"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"},{id:"eth",name:"Ethereum",icon:"fab fa-ethereum",color:"#627EEA",address:"0x742d35Cc6634C0532925a3b844Bc454e4438f44e"},{id:"usdt",name:"Tether",icon:"fas fa-dollar-sign",color:"#26A17B",address:"0x742d35Cc6634C0532925a3b844Bc454e4438f44e"},{id:"sol",name:"Solana",icon:"fas fa-bolt",color:"#00FFA3",address:"So11111111111111111111111111111111111111112"},{id:"xrp",name:"Ripple",icon:"fas fa-exchange-alt",color:"#23292F",address:"rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY"}],Le=h=>{const s=ce[h.toUpperCase()]||0;return we().shape({orderno:k.string(T("entities.deposit.fields.orderno")),amount:k.decimal(T("entities.deposit.fields.amount"),{required:!0,min:s}).test("min-deposit",`Minimum deposit for ${h.toUpperCase()} is ${s}`,function(i){return i?parseFloat(i)>=s:!1}),txid:k.string(T("entities.deposit.fields.txid"),{required:!0}),rechargechannel:k.string(T("entities.deposit.fields.rechargechannel"))})};function _e(){const h=Ne();pe(ge.selectCurrentUser);const[s,i]=R.useState("btc"),[d,g]=R.useState(!1),[f,b]=R.useState(z[0].address),x=R.useMemo(()=>Le(s),[s]),[e]=R.useState(()=>({orderno:"",amount:"",txid:"",rechargechannel:"",rechargetime:"",status:"pending"})),t=Ae({resolver:Ce.yupResolver(x),mode:"all",defaultValues:e});R.useEffect(()=>{const c=z.find(u=>u.id===s);c&&b(c.address)},[s]);const o=()=>{navigator.clipboard.writeText(f).then(()=>{g(!0),setTimeout(()=>g(!1),3e3)})},n=c=>{const u=new Date,M=u.getFullYear(),C=String(u.getMonth()+1).padStart(2,"0"),p=String(u.getDate()).padStart(2,"0"),A=`${M}${C}${p}`,v=Math.floor(Math.random()*1e7).toString().padStart(7,"0");c.orderno=`RE${A}${v}`,c.rechargetime=u.toISOString(),c.rechargechannel=s,h(xe.doCreate(c)),t.reset({orderno:"",amount:"",txid:"",rechargechannel:"",rechargetime:"",status:"pending"})},r=R.useMemo(()=>z.find(c=>c.id===s),[s]),l=c=>{i(c.target.value),t.setValue("amount",""),t.clearErrors("amount")},a=()=>ce[s.toUpperCase()]||0;return m.jsxs("div",{className:"container",children:[m.jsx(Ee,{title:"Deposit Crypto"}),m.jsxs("div",{className:"networkSection",children:[m.jsx("div",{className:"sectionHeading",children:"Select Network"}),m.jsxs("div",{className:"networkDropdownContainer",children:[m.jsx("select",{className:"networkDropdown",value:s,onChange:l,children:z.map(c=>m.jsx("option",{value:c.id,children:c.name},c.id))}),m.jsx("div",{className:"networkDropdownIcon",style:{color:r.color},children:m.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${r.id.toUpperCase()}.png`,style:{width:25,height:25},alt:r.id})})]})]}),m.jsxs("div",{className:"qrSection",children:[m.jsx(le,{value:f,size:180,bgColor:"#ffffff",fgColor:"#000000",level:"H",includeMargin:!0,className:"qrBox"}),m.jsxs("div",{className:"addressSection",children:[m.jsx("div",{className:"addressLabel",children:"Your deposit address"}),m.jsx("div",{className:"addressText",id:"walletAddress",children:f}),m.jsxs("button",{type:"button",className:"copyBtn",onClick:o,children:[m.jsx("i",{className:"fas fa-copy"})," Copy Address"]})]})]}),m.jsx(be,{...t,children:m.jsxs("form",{onSubmit:t.handleSubmit(n),children:[m.jsxs("div",{className:"amountSection",children:[m.jsx(X,{name:"amount",type:"number",label:`Deposit amount (${s.toUpperCase()})`,className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:`Minimum: ${a()} ${s.toUpperCase()}`,step:"any"}),m.jsx(X,{name:"txid",type:"text",label:"Transaction ID (TXID)",className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:"Enter The TXID"})]}),m.jsxs("div",{className:"minAmountWarning",children:[m.jsx("i",{className:"fas fa-info-circle"}),"Minimum deposit: ",m.jsxs("strong",{children:[a()," ",s.toUpperCase()]})]}),m.jsxs("div",{className:"warningBox",children:[m.jsxs("div",{className:"warningHeader",children:[m.jsx("i",{className:"fas fa-exclamation-circle warningIcon"}),m.jsx("div",{className:"warningTitle",children:"Important Notice"})]}),m.jsx("div",{className:"warningContent",children:"Please ensure that you select the correct network for your deposit. Sending funds through the wrong network may result in permanent loss of your assets, which cannot be recovered."})]}),m.jsx("button",{type:"submit",className:"depositBtn",disabled:!t.formState.isValid,children:"Confirm Deposit"})]})}),m.jsxs("div",{className:"networkDetails",children:[m.jsxs("div",{className:"detailRow",children:[m.jsx("div",{className:"detailLabel",children:"Network"}),m.jsxs("div",{className:"detailValue",id:"detailNetwork",children:[r.name," (",s.toUpperCase(),")"]})]}),m.jsxs("div",{className:"detailRow",children:[m.jsx("div",{className:"detailLabel",children:"Minimum deposit"}),m.jsxs("div",{className:"detailValue",children:[a()," ",s.toUpperCase()]})]}),m.jsxs("div",{className:"detailRow",children:[m.jsx("div",{className:"detailLabel",children:"Estimated arrival"}),m.jsx("div",{className:"detailValue",children:"3 network confirmations"})]}),m.jsxs("div",{className:"detailRow",children:[m.jsx("div",{className:"detailLabel",children:"Processing time"}),m.jsx("div",{className:"detailValue",children:"10-30 minutes"})]})]}),m.jsx("div",{className:`toastMsg ${d?"visible":""}`,id:"toast",children:"Address copied to clipboard!"}),m.jsx("style",{children:`
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
`})]})}export{_e as default};
