import{C as b,D as fe,E as z,u as me,A as pe,r as j,j as m,F as ge}from"./index-876fd0ee.js";import{S as we}from"./SubHeader-a726b880.js";import{y as k,u as xe,a as Ee,F as Ae}from"./FormErrors-e6c1ebcc.js";import{F as X}from"./FieldFormItem-b6ef5fee.js";import{u as Ce}from"./useDispatch-2e80b338.js";var be=Object.defineProperty,B=Object.getOwnPropertySymbols,K=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable,W=(d,a,i)=>a in d?be(d,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):d[a]=i,U=(d,a)=>{for(var i in a||(a={}))K.call(a,i)&&W(d,i,a[i]);if(B)for(var i of B(a))Z.call(a,i)&&W(d,i,a[i]);return d},Q=(d,a)=>{var i={};for(var c in d)K.call(d,c)&&a.indexOf(c)<0&&(i[c]=d[c]);if(d!=null&&B)for(var c of B(d))a.indexOf(c)<0&&Z.call(d,c)&&(i[c]=d[c]);return i};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var S;(d=>{const a=class w{constructor(e,t,o,n){if(this.version=e,this.errorCorrectionLevel=t,this.modules=[],this.isFunction=[],e<w.MIN_VERSION||e>w.MAX_VERSION)throw new RangeError("Version value out of range");if(n<-1||n>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let r=[];for(let s=0;s<this.size;s++)r.push(!1);for(let s=0;s<this.size;s++)this.modules.push(r.slice()),this.isFunction.push(r.slice());this.drawFunctionPatterns();const l=this.addEccAndInterleave(o);if(this.drawCodewords(l),n==-1){let s=1e9;for(let f=0;f<8;f++){this.applyMask(f),this.drawFormatBits(f);const h=this.getPenaltyScore();h<s&&(n=f,s=h),this.applyMask(f)}}p(0<=n&&n<=7),this.mask=n,this.applyMask(n),this.drawFormatBits(n),this.isFunction=[]}static encodeText(e,t){const o=d.QrSegment.makeSegments(e);return w.encodeSegments(o,t)}static encodeBinary(e,t){const o=d.QrSegment.makeBytes(e);return w.encodeSegments([o],t)}static encodeSegments(e,t,o=1,n=40,r=-1,l=!0){if(!(w.MIN_VERSION<=o&&o<=n&&n<=w.MAX_VERSION)||r<-1||r>7)throw new RangeError("Invalid value");let s,f;for(s=o;;s++){const g=w.getNumDataCodewords(s,t)*8,C=A.getTotalBits(e,s);if(C<=g){f=C;break}if(s>=n)throw new RangeError("Data too long")}for(const g of[w.Ecc.MEDIUM,w.Ecc.QUARTILE,w.Ecc.HIGH])l&&f<=w.getNumDataCodewords(s,g)*8&&(t=g);let h=[];for(const g of e){i(g.mode.modeBits,4,h),i(g.numChars,g.mode.numCharCountBits(s),h);for(const C of g.getData())h.push(C)}p(h.length==f);const M=w.getNumDataCodewords(s,t)*8;p(h.length<=M),i(0,Math.min(4,M-h.length),h),i(0,(8-h.length%8)%8,h),p(h.length%8==0);for(let g=236;h.length<M;g^=253)i(g,8,h);let N=[];for(;N.length*8<h.length;)N.push(0);return h.forEach((g,C)=>N[C>>>3]|=g<<7-(C&7)),new w(s,t,N,r)}getModule(e,t){return 0<=e&&e<this.size&&0<=t&&t<this.size&&this.modules[t][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let o=0;o<this.size;o++)this.setFunctionModule(6,o,o%2==0),this.setFunctionModule(o,6,o%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),t=e.length;for(let o=0;o<t;o++)for(let n=0;n<t;n++)o==0&&n==0||o==0&&n==t-1||o==t-1&&n==0||this.drawAlignmentPattern(e[o],e[n]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const t=this.errorCorrectionLevel.formatBits<<3|e;let o=t;for(let r=0;r<10;r++)o=o<<1^(o>>>9)*1335;const n=(t<<10|o)^21522;p(n>>>15==0);for(let r=0;r<=5;r++)this.setFunctionModule(8,r,c(n,r));this.setFunctionModule(8,7,c(n,6)),this.setFunctionModule(8,8,c(n,7)),this.setFunctionModule(7,8,c(n,8));for(let r=9;r<15;r++)this.setFunctionModule(14-r,8,c(n,r));for(let r=0;r<8;r++)this.setFunctionModule(this.size-1-r,8,c(n,r));for(let r=8;r<15;r++)this.setFunctionModule(8,this.size-15+r,c(n,r));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let o=0;o<12;o++)e=e<<1^(e>>>11)*7973;const t=this.version<<12|e;p(t>>>18==0);for(let o=0;o<18;o++){const n=c(t,o),r=this.size-11+o%3,l=Math.floor(o/3);this.setFunctionModule(r,l,n),this.setFunctionModule(l,r,n)}}drawFinderPattern(e,t){for(let o=-4;o<=4;o++)for(let n=-4;n<=4;n++){const r=Math.max(Math.abs(n),Math.abs(o)),l=e+n,s=t+o;0<=l&&l<this.size&&0<=s&&s<this.size&&this.setFunctionModule(l,s,r!=2&&r!=4)}}drawAlignmentPattern(e,t){for(let o=-2;o<=2;o++)for(let n=-2;n<=2;n++)this.setFunctionModule(e+n,t+o,Math.max(Math.abs(n),Math.abs(o))!=1)}setFunctionModule(e,t,o){this.modules[t][e]=o,this.isFunction[t][e]=!0}addEccAndInterleave(e){const t=this.version,o=this.errorCorrectionLevel;if(e.length!=w.getNumDataCodewords(t,o))throw new RangeError("Invalid argument");const n=w.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][t],r=w.ECC_CODEWORDS_PER_BLOCK[o.ordinal][t],l=Math.floor(w.getNumRawDataModules(t)/8),s=n-l%n,f=Math.floor(l/n);let h=[];const M=w.reedSolomonComputeDivisor(r);for(let g=0,C=0;g<n;g++){let v=e.slice(C,C+f-r+(g<s?0:1));C+=v.length;const L=w.reedSolomonComputeRemainder(v,M);g<s&&v.push(0),h.push(v.concat(L))}let N=[];for(let g=0;g<h[0].length;g++)h.forEach((C,v)=>{(g!=f-r||v>=s)&&N.push(C[g])});return p(N.length==l),N}drawCodewords(e){if(e.length!=Math.floor(w.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let t=0;for(let o=this.size-1;o>=1;o-=2){o==6&&(o=5);for(let n=0;n<this.size;n++)for(let r=0;r<2;r++){const l=o-r,f=(o+1&2)==0?this.size-1-n:n;!this.isFunction[f][l]&&t<e.length*8&&(this.modules[f][l]=c(e[t>>>3],7-(t&7)),t++)}}p(t==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let t=0;t<this.size;t++)for(let o=0;o<this.size;o++){let n;switch(e){case 0:n=(o+t)%2==0;break;case 1:n=t%2==0;break;case 2:n=o%3==0;break;case 3:n=(o+t)%3==0;break;case 4:n=(Math.floor(o/3)+Math.floor(t/2))%2==0;break;case 5:n=o*t%2+o*t%3==0;break;case 6:n=(o*t%2+o*t%3)%2==0;break;case 7:n=((o+t)%2+o*t%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[t][o]&&n&&(this.modules[t][o]=!this.modules[t][o])}}getPenaltyScore(){let e=0;for(let r=0;r<this.size;r++){let l=!1,s=0,f=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[r][h]==l?(s++,s==5?e+=w.PENALTY_N1:s>5&&e++):(this.finderPenaltyAddHistory(s,f),l||(e+=this.finderPenaltyCountPatterns(f)*w.PENALTY_N3),l=this.modules[r][h],s=1);e+=this.finderPenaltyTerminateAndCount(l,s,f)*w.PENALTY_N3}for(let r=0;r<this.size;r++){let l=!1,s=0,f=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[h][r]==l?(s++,s==5?e+=w.PENALTY_N1:s>5&&e++):(this.finderPenaltyAddHistory(s,f),l||(e+=this.finderPenaltyCountPatterns(f)*w.PENALTY_N3),l=this.modules[h][r],s=1);e+=this.finderPenaltyTerminateAndCount(l,s,f)*w.PENALTY_N3}for(let r=0;r<this.size-1;r++)for(let l=0;l<this.size-1;l++){const s=this.modules[r][l];s==this.modules[r][l+1]&&s==this.modules[r+1][l]&&s==this.modules[r+1][l+1]&&(e+=w.PENALTY_N2)}let t=0;for(const r of this.modules)t=r.reduce((l,s)=>l+(s?1:0),t);const o=this.size*this.size,n=Math.ceil(Math.abs(t*20-o*10)/o)-1;return p(0<=n&&n<=9),e+=n*w.PENALTY_N4,p(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,t=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let o=[6];for(let n=this.size-7;o.length<e;n-=t)o.splice(1,0,n);return o}}static getNumRawDataModules(e){if(e<w.MIN_VERSION||e>w.MAX_VERSION)throw new RangeError("Version number out of range");let t=(16*e+128)*e+64;if(e>=2){const o=Math.floor(e/7)+2;t-=(25*o-10)*o-55,e>=7&&(t-=36)}return p(208<=t&&t<=29648),t}static getNumDataCodewords(e,t){return Math.floor(w.getNumRawDataModules(e)/8)-w.ECC_CODEWORDS_PER_BLOCK[t.ordinal][e]*w.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let t=[];for(let n=0;n<e-1;n++)t.push(0);t.push(1);let o=1;for(let n=0;n<e;n++){for(let r=0;r<t.length;r++)t[r]=w.reedSolomonMultiply(t[r],o),r+1<t.length&&(t[r]^=t[r+1]);o=w.reedSolomonMultiply(o,2)}return t}static reedSolomonComputeRemainder(e,t){let o=t.map(n=>0);for(const n of e){const r=n^o.shift();o.push(0),t.forEach((l,s)=>o[s]^=w.reedSolomonMultiply(l,r))}return o}static reedSolomonMultiply(e,t){if(e>>>8||t>>>8)throw new RangeError("Byte out of range");let o=0;for(let n=7;n>=0;n--)o=o<<1^(o>>>7)*285,o^=(t>>>n&1)*e;return p(o>>>8==0),o}finderPenaltyCountPatterns(e){const t=e[1];p(t<=this.size*3);const o=t>0&&e[2]==t&&e[3]==t*3&&e[4]==t&&e[5]==t;return(o&&e[0]>=t*4&&e[6]>=t?1:0)+(o&&e[6]>=t*4&&e[0]>=t?1:0)}finderPenaltyTerminateAndCount(e,t,o){return e&&(this.finderPenaltyAddHistory(t,o),t=0),t+=this.size,this.finderPenaltyAddHistory(t,o),this.finderPenaltyCountPatterns(o)}finderPenaltyAddHistory(e,t){t[0]==0&&(e+=this.size),t.pop(),t.unshift(e)}};a.MIN_VERSION=1,a.MAX_VERSION=40,a.PENALTY_N1=3,a.PENALTY_N2=3,a.PENALTY_N3=40,a.PENALTY_N4=10,a.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],a.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],d.QrCode=a;function i(x,e,t){if(e<0||e>31||x>>>e)throw new RangeError("Value out of range");for(let o=e-1;o>=0;o--)t.push(x>>>o&1)}function c(x,e){return(x>>>e&1)!=0}function p(x){if(!x)throw new Error("Assertion error")}const u=class E{constructor(e,t,o){if(this.mode=e,this.numChars=t,this.bitData=o,t<0)throw new RangeError("Invalid argument");this.bitData=o.slice()}static makeBytes(e){let t=[];for(const o of e)i(o,8,t);return new E(E.Mode.BYTE,e.length,t)}static makeNumeric(e){if(!E.isNumeric(e))throw new RangeError("String contains non-numeric characters");let t=[];for(let o=0;o<e.length;){const n=Math.min(e.length-o,3);i(parseInt(e.substring(o,o+n),10),n*3+1,t),o+=n}return new E(E.Mode.NUMERIC,e.length,t)}static makeAlphanumeric(e){if(!E.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let t=[],o;for(o=0;o+2<=e.length;o+=2){let n=E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(o))*45;n+=E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(o+1)),i(n,11,t)}return o<e.length&&i(E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(o)),6,t),new E(E.Mode.ALPHANUMERIC,e.length,t)}static makeSegments(e){return e==""?[]:E.isNumeric(e)?[E.makeNumeric(e)]:E.isAlphanumeric(e)?[E.makeAlphanumeric(e)]:[E.makeBytes(E.toUtf8ByteArray(e))]}static makeEci(e){let t=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)i(e,8,t);else if(e<16384)i(2,2,t),i(e,14,t);else if(e<1e6)i(6,3,t),i(e,21,t);else throw new RangeError("ECI assignment value out of range");return new E(E.Mode.ECI,0,t)}static isNumeric(e){return E.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return E.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,t){let o=0;for(const n of e){const r=n.mode.numCharCountBits(t);if(n.numChars>=1<<r)return 1/0;o+=4+r+n.bitData.length}return o}static toUtf8ByteArray(e){e=encodeURI(e);let t=[];for(let o=0;o<e.length;o++)e.charAt(o)!="%"?t.push(e.charCodeAt(o)):(t.push(parseInt(e.substring(o+1,o+3),16)),o+=2);return t}};u.NUMERIC_REGEX=/^[0-9]*$/,u.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,u.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let A=u;d.QrSegment=u})(S||(S={}));(d=>{(a=>{const i=class{constructor(p,u){this.ordinal=p,this.formatBits=u}};i.LOW=new i(0,1),i.MEDIUM=new i(1,0),i.QUARTILE=new i(2,3),i.HIGH=new i(3,2),a.Ecc=i})(d.QrCode||(d.QrCode={}))})(S||(S={}));(d=>{(a=>{const i=class{constructor(p,u){this.modeBits=p,this.numBitsCharCount=u}numCharCountBits(p){return this.numBitsCharCount[Math.floor((p+7)/17)]}};i.NUMERIC=new i(1,[10,12,14]),i.ALPHANUMERIC=new i(2,[9,11,13]),i.BYTE=new i(4,[8,16,16]),i.KANJI=new i(8,[8,10,12]),i.ECI=new i(7,[0,0,0]),a.Mode=i})(d.QrSegment||(d.QrSegment={}))})(S||(S={}));var P=S;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var Ne={L:P.QrCode.Ecc.LOW,M:P.QrCode.Ecc.MEDIUM,Q:P.QrCode.Ecc.QUARTILE,H:P.QrCode.Ecc.HIGH},q=128,J="L",ee="#FFFFFF",te="#000000",oe=!1,ne=1,Me=4,ve=0,Fe=.1;function re(d,a=0){const i=[];return d.forEach(function(c,p){let u=null;c.forEach(function(A,x){if(!A&&u!==null){i.push(`M${u+a} ${p+a}h${x-u}v1H${u+a}z`),u=null;return}if(x===c.length-1){if(!A)return;u===null?i.push(`M${x+a},${p+a} h1v1H${x+a}z`):i.push(`M${u+a},${p+a} h${x+1-u}v1H${u+a}z`);return}A&&u===null&&(u=x)})}),i.join("")}function ie(d,a){return d.slice().map((i,c)=>c<a.y||c>=a.y+a.h?i:i.map((p,u)=>u<a.x||u>=a.x+a.w?p:!1))}function Re(d,a,i,c){if(c==null)return null;const p=d.length+i*2,u=Math.floor(a*Fe),A=p/a,x=(c.width||u)*A,e=(c.height||u)*A,t=c.x==null?d.length/2-x/2:c.x*A,o=c.y==null?d.length/2-e/2:c.y*A,n=c.opacity==null?1:c.opacity;let r=null;if(c.excavate){let s=Math.floor(t),f=Math.floor(o),h=Math.ceil(x+t-s),M=Math.ceil(e+o-f);r={x:s,y:f,w:h,h:M}}const l=c.crossOrigin;return{x:t,y:o,h:e,w:x,excavation:r,opacity:n,crossOrigin:l}}function ye(d,a){return a!=null?Math.max(Math.floor(a),0):d?Me:ve}function se({value:d,level:a,minVersion:i,includeMargin:c,marginSize:p,imageSettings:u,size:A,boostLevel:x}){let e=b.useMemo(()=>{const s=(Array.isArray(d)?d:[d]).reduce((f,h)=>(f.push(...P.QrSegment.makeSegments(h)),f),[]);return P.QrCode.encodeSegments(s,Ne[a],i,void 0,void 0,x)},[d,a,i,x]);const{cells:t,margin:o,numCells:n,calculatedImageSettings:r}=b.useMemo(()=>{let l=e.getModules();const s=ye(c,p),f=l.length+s*2,h=Re(l,A,s,u);return{cells:l,margin:s,numCells:f,calculatedImageSettings:h}},[e,A,u,c,p]);return{qrcode:e,margin:o,cells:t,numCells:n,calculatedImageSettings:r}}var Se=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),ae=b.forwardRef(function(a,i){const c=a,{value:p,size:u=q,level:A=J,bgColor:x=ee,fgColor:e=te,includeMargin:t=oe,minVersion:o=ne,boostLevel:n,marginSize:r,imageSettings:l}=c,f=Q(c,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:h}=f,M=Q(f,["style"]),N=l==null?void 0:l.src,g=b.useRef(null),C=b.useRef(null),v=b.useCallback(y=>{g.current=y,typeof i=="function"?i(y):i&&(i.current=y)},[i]),[L,_]=b.useState(!1),{margin:I,cells:T,numCells:O,calculatedImageSettings:F}=se({value:p,level:A,minVersion:o,boostLevel:n,includeMargin:t,marginSize:r,imageSettings:l,size:u});b.useEffect(()=>{if(g.current!=null){const y=g.current,R=y.getContext("2d");if(!R)return;let $=T;const D=C.current,V=F!=null&&D!==null&&D.complete&&D.naturalHeight!==0&&D.naturalWidth!==0;V&&F.excavation!=null&&($=ie(T,F.excavation));const Y=window.devicePixelRatio||1;y.height=y.width=u*Y;const G=u/O*Y;R.scale(G,G),R.fillStyle=x,R.fillRect(0,0,O,O),R.fillStyle=e,Se?R.fill(new Path2D(re($,I))):T.forEach(function(ce,de){ce.forEach(function(ue,he){ue&&R.fillRect(he+I,de+I,1,1)})}),F&&(R.globalAlpha=F.opacity),V&&R.drawImage(D,F.x+I,F.y+I,F.w,F.h)}}),b.useEffect(()=>{_(!1)},[N]);const le=U({height:u,width:u},h);let H=null;return N!=null&&(H=b.createElement("img",{src:N,key:N,style:{display:"none"},onLoad:()=>{_(!0)},ref:C,crossOrigin:F==null?void 0:F.crossOrigin})),b.createElement(b.Fragment,null,b.createElement("canvas",U({style:le,height:u,width:u,ref:v,role:"img"},M)),H)});ae.displayName="QRCodeCanvas";var Pe=b.forwardRef(function(a,i){const c=a,{value:p,size:u=q,level:A=J,bgColor:x=ee,fgColor:e=te,includeMargin:t=oe,minVersion:o=ne,boostLevel:n,title:r,marginSize:l,imageSettings:s}=c,f=Q(c,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:h,cells:M,numCells:N,calculatedImageSettings:g}=se({value:p,level:A,minVersion:o,boostLevel:n,includeMargin:t,marginSize:l,imageSettings:s,size:u});let C=M,v=null;s!=null&&g!=null&&(g.excavation!=null&&(C=ie(M,g.excavation)),v=b.createElement("image",{href:s.src,height:g.h,width:g.w,x:g.x+h,y:g.y+h,preserveAspectRatio:"none",opacity:g.opacity,crossOrigin:g.crossOrigin}));const L=re(C,h);return b.createElement("svg",U({height:u,width:u,viewBox:`0 0 ${N} ${N}`,ref:i,role:"img"},f),!!r&&b.createElement("title",null,r),b.createElement("path",{fill:x,d:`M0,0 h${N}v${N}H0z`,shapeRendering:"crispEdges"}),b.createElement("path",{fill:e,d:L,shapeRendering:"crispEdges"}),v)});Pe.displayName="QRCodeSVG";const Ie=fe().shape({orderno:k.string(z("entities.deposit.fields.orderno")),amount:k.decimal(z("entities.deposit.fields.amount"),{required:!0}),txid:k.string(z("entities.deposit.fields.txid"),{required:!0}),rechargechannel:k.string(z("entities.deposit.fields.rechargechannel"))});function je(){const d=Ce();me(pe.selectCurrentUser);const[a,i]=j.useState("btc"),[c]=j.useState(()=>({orderno:"",amount:"",txid:"",rechargechannel:"",rechargetime:"",status:"pending"})),p=xe({resolver:Ee.yupResolver(Ie),mode:"all",defaultValues:c}),u=t=>{const o=new Date,n=o.getFullYear(),r=String(o.getMonth()+1).padStart(2,"0"),l=String(o.getDate()).padStart(2,"0"),s=`${n}${r}${l}`,f=Math.floor(Math.random()*1e7).toString().padStart(7,"0");t.orderno=`RE${s}${f}`,t.rechargetime=o.toISOString(),t.rechargechannel=a,d(ge.doCreate(t)),p.reset({orderno:"",amount:"",txid:"",rechargechannel:"",rechargetime:"",status:"pending"})},A=[{id:"btc",name:"Bitcoin",icon:"fab fa-btc",color:"#F3BA2F"},{id:"eth",name:"Ethereum",icon:"fab fa-ethereum",color:"#627EEA"},{id:"usdt",name:"Tether",icon:"fas fa-dollar-sign",color:"#26A17B"},{id:"sol",name:"Solana",icon:"fas fa-bolt",color:"#00FFA3"},{id:"xrp",name:"Ripple",icon:"fas fa-exchange-alt",color:"#23292F"}],x=j.useMemo(()=>A.find(t=>t.id===a),[a]),e=t=>{i(t.target.value)};return m.jsxs("div",{className:"depositContainer",children:[m.jsx(we,{title:"Deposit Crypto"}),m.jsxs("div",{className:"networkSection",children:[m.jsx("div",{className:"sectionHeading",children:"Select Network"}),m.jsxs("div",{className:"networkDropdownContainer",children:[m.jsx("select",{className:"networkDropdown",value:a,onChange:e,children:A.map(t=>m.jsx("option",{value:t.id,children:t.name},t.id))}),m.jsx("div",{className:"networkDropdownIcon",style:{color:x.color},children:m.jsx("i",{className:x.icon})})]})]}),m.jsxs("div",{className:"qrSection",children:[m.jsx(ae,{value:"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",size:180,bgColor:"#ffffff",fgColor:"#000000",level:"H",includeMargin:!0,className:"qrBox"}),m.jsxs("div",{className:"addressSection",children:[m.jsx("div",{className:"addressLabel",children:"Your deposit address"}),m.jsx("div",{className:"addressText",id:"walletAddress",children:"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"}),m.jsxs("button",{className:"copyBtn",id:"copyAddress",children:[m.jsx("i",{className:"fas fa-copy"})," Copy Address"]})]})]}),m.jsx(Ae,{...p,children:m.jsxs("form",{onSubmit:p.handleSubmit(u),children:[m.jsxs("div",{className:"amountSection",children:[m.jsx(X,{name:"amount",type:"text",label:"Deposit amount",className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:"Enter The Deposit Amount"}),m.jsx(X,{name:"txid",type:"text",label:"Transaction ID (TXID)",className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:"Enter The TXID"})]}),m.jsxs("div",{className:"warningBox",children:[m.jsxs("div",{className:"warningHeader",children:[m.jsx("i",{className:"fas fa-exclamation-circle warningIcon"}),m.jsx("div",{className:"warningTitle",children:"Important Notice"})]}),m.jsx("div",{className:"warningContent",children:"Please ensure that you select the correct network for your deposit. Sending funds through the wrong network may result in permanent loss of your assets, which cannot be recovered."})]}),m.jsx("button",{type:"submit",className:"depositBtn",id:"depositBtn",children:"Confirm Deposit"})]})}),m.jsxs("div",{className:"networkDetails",children:[m.jsxs("div",{className:"detailRow",children:[m.jsx("div",{className:"detailLabel",children:"Network"}),m.jsxs("div",{className:"detailValue",id:"detailNetwork",children:[x.name," (",a.toUpperCase(),")"]})]}),m.jsxs("div",{className:"detailRow",children:[m.jsx("div",{className:"detailLabel",children:"Estimated arrival"}),m.jsx("div",{className:"detailValue",children:"3 network confirmations"})]}),m.jsxs("div",{className:"detailRow",children:[m.jsx("div",{className:"detailLabel",children:"Processing time"}),m.jsx("div",{className:"detailValue",children:"10-30 minutes"})]})]}),m.jsx("div",{className:"toastMsg",id:"toast",children:"Address copied to clipboard!"}),m.jsx("style",{children:`
  .networkSection {
      padding: 0 15px;
      margin-bottom: 20px;
  }

  .sectionHeading {
      font-weight: bold;
      margin-bottom: 12px;
      font-size: 16px;
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
      width: 200px;
      height: 200px;
      margin: 0 auto 20px;
      background-color: #FFFFFF;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
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
      margin-bottom: 20px;
  }

  .amountInputBox {
      background-color: #2A2A2A;
      border-radius: 12px;
      padding: 15px;
      margin-bottom: 8px;
  }

  .amountLabel {
      font-size: 14px;
      color: #AAAAAA;
      margin-bottom: 8px;
  }

  .inputRow {
      display: flex;
      align-items: center;
      justify-content: space-between;
  }

  .amountField {
      background: transparent;
      border: none;
      color: #FFFFFF;
      font-size: 24px;
      font-weight: bold;
      width: 70%;
      outline: none;
  }

  .currencyDropdown {
      background-color: #1A1A1A;
      color: #FFFFFF;
      border: none;
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 14px;
  }

  .minAmountText {
      color: #FF6838;
      font-size: 12px;
      margin-top: 5px;
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

  .depositBtn:hover {
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
  }

  .detailRow {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      font-size: 14px;
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
  }

  @media (min-width: 401px) {
    .wallet-container {
      box-shadow: 0 0 20px rgba(243, 186, 47, 0.1);
      min-height: 100vh;
    }
  }

  @media (max-width: 350px) {
    .wallet-asset-icon,
    .wallet-transaction-icon {
      width: 35px;
      height: 35px;
      font-size: 16px;
    }
    
    .networkDropdown {
      padding: 10px 40px 10px 12px;
      font-size: 14px;
    }
    
    .networkDropdownIcon {
      font-size: 20px;
      right: 12px;
    }
  }

  .toastMsg.visible {
      opacity: 1;
  }
`})]})}export{je as default};
