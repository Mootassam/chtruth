import{G as M,u as W,y as pe,r as R,H as ge,j as f,I as we,J as T,K as xe}from"./index-9272ea36.js";import{S as Ae}from"./SubHeader-5c5f9af7.js";import{u as Ee,y as Ce,F as be,a as z}from"./FormErrors-3546350b.js";import{F as X}from"./FieldFormItem-17e2d6ee.js";import{u as Ne}from"./useDispatch-729df1b9.js";var Me=Object.defineProperty,O=Object.getOwnPropertySymbols,q=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable,K=(d,s,i)=>s in d?Me(d,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):d[s]=i,_=(d,s)=>{for(var i in s||(s={}))q.call(s,i)&&K(d,i,s[i]);if(O)for(var i of O(s))Z.call(s,i)&&K(d,i,s[i]);return d},Q=(d,s)=>{var i={};for(var c in d)q.call(d,c)&&s.indexOf(c)<0&&(i[c]=d[c]);if(d!=null&&O)for(var c of O(d))s.indexOf(c)<0&&Z.call(d,c)&&(i[c]=d[c]);return i};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var I;(d=>{const s=class w{constructor(e,o,t,n){if(this.version=e,this.errorCorrectionLevel=o,this.modules=[],this.isFunction=[],e<w.MIN_VERSION||e>w.MAX_VERSION)throw new RangeError("Version value out of range");if(n<-1||n>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let r=[];for(let a=0;a<this.size;a++)r.push(!1);for(let a=0;a<this.size;a++)this.modules.push(r.slice()),this.isFunction.push(r.slice());this.drawFunctionPatterns();const l=this.addEccAndInterleave(t);if(this.drawCodewords(l),n==-1){let a=1e9;for(let m=0;m<8;m++){this.applyMask(m),this.drawFormatBits(m);const h=this.getPenaltyScore();h<a&&(n=m,a=h),this.applyMask(m)}}g(0<=n&&n<=7),this.mask=n,this.applyMask(n),this.drawFormatBits(n),this.isFunction=[]}static encodeText(e,o){const t=d.QrSegment.makeSegments(e);return w.encodeSegments(t,o)}static encodeBinary(e,o){const t=d.QrSegment.makeBytes(e);return w.encodeSegments([t],o)}static encodeSegments(e,o,t=1,n=40,r=-1,l=!0){if(!(w.MIN_VERSION<=t&&t<=n&&n<=w.MAX_VERSION)||r<-1||r>7)throw new RangeError("Invalid value");let a,m;for(a=t;;a++){const p=w.getNumDataCodewords(a,o)*8,N=b.getTotalBits(e,a);if(N<=p){m=N;break}if(a>=n)throw new RangeError("Data too long")}for(const p of[w.Ecc.MEDIUM,w.Ecc.QUARTILE,w.Ecc.HIGH])l&&m<=w.getNumDataCodewords(a,p)*8&&(o=p);let h=[];for(const p of e){i(p.mode.modeBits,4,h),i(p.numChars,p.mode.numCharCountBits(a),h);for(const N of p.getData())h.push(N)}g(h.length==m);const x=w.getNumDataCodewords(a,o)*8;g(h.length<=x),i(0,Math.min(4,x-h.length),h),i(0,(8-h.length%8)%8,h),g(h.length%8==0);for(let p=236;h.length<x;p^=253)i(p,8,h);let E=[];for(;E.length*8<h.length;)E.push(0);return h.forEach((p,N)=>E[N>>>3]|=p<<7-(N&7)),new w(a,o,E,r)}getModule(e,o){return 0<=e&&e<this.size&&0<=o&&o<this.size&&this.modules[o][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let t=0;t<this.size;t++)this.setFunctionModule(6,t,t%2==0),this.setFunctionModule(t,6,t%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),o=e.length;for(let t=0;t<o;t++)for(let n=0;n<o;n++)t==0&&n==0||t==0&&n==o-1||t==o-1&&n==0||this.drawAlignmentPattern(e[t],e[n]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const o=this.errorCorrectionLevel.formatBits<<3|e;let t=o;for(let r=0;r<10;r++)t=t<<1^(t>>>9)*1335;const n=(o<<10|t)^21522;g(n>>>15==0);for(let r=0;r<=5;r++)this.setFunctionModule(8,r,c(n,r));this.setFunctionModule(8,7,c(n,6)),this.setFunctionModule(8,8,c(n,7)),this.setFunctionModule(7,8,c(n,8));for(let r=9;r<15;r++)this.setFunctionModule(14-r,8,c(n,r));for(let r=0;r<8;r++)this.setFunctionModule(this.size-1-r,8,c(n,r));for(let r=8;r<15;r++)this.setFunctionModule(8,this.size-15+r,c(n,r));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let t=0;t<12;t++)e=e<<1^(e>>>11)*7973;const o=this.version<<12|e;g(o>>>18==0);for(let t=0;t<18;t++){const n=c(o,t),r=this.size-11+t%3,l=Math.floor(t/3);this.setFunctionModule(r,l,n),this.setFunctionModule(l,r,n)}}drawFinderPattern(e,o){for(let t=-4;t<=4;t++)for(let n=-4;n<=4;n++){const r=Math.max(Math.abs(n),Math.abs(t)),l=e+n,a=o+t;0<=l&&l<this.size&&0<=a&&a<this.size&&this.setFunctionModule(l,a,r!=2&&r!=4)}}drawAlignmentPattern(e,o){for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)this.setFunctionModule(e+n,o+t,Math.max(Math.abs(n),Math.abs(t))!=1)}setFunctionModule(e,o,t){this.modules[o][e]=t,this.isFunction[o][e]=!0}addEccAndInterleave(e){const o=this.version,t=this.errorCorrectionLevel;if(e.length!=w.getNumDataCodewords(o,t))throw new RangeError("Invalid argument");const n=w.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][o],r=w.ECC_CODEWORDS_PER_BLOCK[t.ordinal][o],l=Math.floor(w.getNumRawDataModules(o)/8),a=n-l%n,m=Math.floor(l/n);let h=[];const x=w.reedSolomonComputeDivisor(r);for(let p=0,N=0;p<n;p++){let v=e.slice(N,N+m-r+(p<a?0:1));N+=v.length;const P=w.reedSolomonComputeRemainder(v,x);p<a&&v.push(0),h.push(v.concat(P))}let E=[];for(let p=0;p<h[0].length;p++)h.forEach((N,v)=>{(p!=m-r||v>=a)&&E.push(N[p])});return g(E.length==l),E}drawCodewords(e){if(e.length!=Math.floor(w.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let o=0;for(let t=this.size-1;t>=1;t-=2){t==6&&(t=5);for(let n=0;n<this.size;n++)for(let r=0;r<2;r++){const l=t-r,m=(t+1&2)==0?this.size-1-n:n;!this.isFunction[m][l]&&o<e.length*8&&(this.modules[m][l]=c(e[o>>>3],7-(o&7)),o++)}}g(o==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let o=0;o<this.size;o++)for(let t=0;t<this.size;t++){let n;switch(e){case 0:n=(t+o)%2==0;break;case 1:n=o%2==0;break;case 2:n=t%3==0;break;case 3:n=(t+o)%3==0;break;case 4:n=(Math.floor(t/3)+Math.floor(o/2))%2==0;break;case 5:n=t*o%2+t*o%3==0;break;case 6:n=(t*o%2+t*o%3)%2==0;break;case 7:n=((t+o)%2+t*o%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[o][t]&&n&&(this.modules[o][t]=!this.modules[o][t])}}getPenaltyScore(){let e=0;for(let r=0;r<this.size;r++){let l=!1,a=0,m=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[r][h]==l?(a++,a==5?e+=w.PENALTY_N1:a>5&&e++):(this.finderPenaltyAddHistory(a,m),l||(e+=this.finderPenaltyCountPatterns(m)*w.PENALTY_N3),l=this.modules[r][h],a=1);e+=this.finderPenaltyTerminateAndCount(l,a,m)*w.PENALTY_N3}for(let r=0;r<this.size;r++){let l=!1,a=0,m=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[h][r]==l?(a++,a==5?e+=w.PENALTY_N1:a>5&&e++):(this.finderPenaltyAddHistory(a,m),l||(e+=this.finderPenaltyCountPatterns(m)*w.PENALTY_N3),l=this.modules[h][r],a=1);e+=this.finderPenaltyTerminateAndCount(l,a,m)*w.PENALTY_N3}for(let r=0;r<this.size-1;r++)for(let l=0;l<this.size-1;l++){const a=this.modules[r][l];a==this.modules[r][l+1]&&a==this.modules[r+1][l]&&a==this.modules[r+1][l+1]&&(e+=w.PENALTY_N2)}let o=0;for(const r of this.modules)o=r.reduce((l,a)=>l+(a?1:0),o);const t=this.size*this.size,n=Math.ceil(Math.abs(o*20-t*10)/t)-1;return g(0<=n&&n<=9),e+=n*w.PENALTY_N4,g(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,o=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let t=[6];for(let n=this.size-7;t.length<e;n-=o)t.splice(1,0,n);return t}}static getNumRawDataModules(e){if(e<w.MIN_VERSION||e>w.MAX_VERSION)throw new RangeError("Version number out of range");let o=(16*e+128)*e+64;if(e>=2){const t=Math.floor(e/7)+2;o-=(25*t-10)*t-55,e>=7&&(o-=36)}return g(208<=o&&o<=29648),o}static getNumDataCodewords(e,o){return Math.floor(w.getNumRawDataModules(e)/8)-w.ECC_CODEWORDS_PER_BLOCK[o.ordinal][e]*w.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let o=[];for(let n=0;n<e-1;n++)o.push(0);o.push(1);let t=1;for(let n=0;n<e;n++){for(let r=0;r<o.length;r++)o[r]=w.reedSolomonMultiply(o[r],t),r+1<o.length&&(o[r]^=o[r+1]);t=w.reedSolomonMultiply(t,2)}return o}static reedSolomonComputeRemainder(e,o){let t=o.map(n=>0);for(const n of e){const r=n^t.shift();t.push(0),o.forEach((l,a)=>t[a]^=w.reedSolomonMultiply(l,r))}return t}static reedSolomonMultiply(e,o){if(e>>>8||o>>>8)throw new RangeError("Byte out of range");let t=0;for(let n=7;n>=0;n--)t=t<<1^(t>>>7)*285,t^=(o>>>n&1)*e;return g(t>>>8==0),t}finderPenaltyCountPatterns(e){const o=e[1];g(o<=this.size*3);const t=o>0&&e[2]==o&&e[3]==o*3&&e[4]==o&&e[5]==o;return(t&&e[0]>=o*4&&e[6]>=o?1:0)+(t&&e[6]>=o*4&&e[0]>=o?1:0)}finderPenaltyTerminateAndCount(e,o,t){return e&&(this.finderPenaltyAddHistory(o,t),o=0),o+=this.size,this.finderPenaltyAddHistory(o,t),this.finderPenaltyCountPatterns(t)}finderPenaltyAddHistory(e,o){o[0]==0&&(e+=this.size),o.pop(),o.unshift(e)}};s.MIN_VERSION=1,s.MAX_VERSION=40,s.PENALTY_N1=3,s.PENALTY_N2=3,s.PENALTY_N3=40,s.PENALTY_N4=10,s.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],s.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],d.QrCode=s;function i(A,e,o){if(e<0||e>31||A>>>e)throw new RangeError("Value out of range");for(let t=e-1;t>=0;t--)o.push(A>>>t&1)}function c(A,e){return(A>>>e&1)!=0}function g(A){if(!A)throw new Error("Assertion error")}const u=class C{constructor(e,o,t){if(this.mode=e,this.numChars=o,this.bitData=t,o<0)throw new RangeError("Invalid argument");this.bitData=t.slice()}static makeBytes(e){let o=[];for(const t of e)i(t,8,o);return new C(C.Mode.BYTE,e.length,o)}static makeNumeric(e){if(!C.isNumeric(e))throw new RangeError("String contains non-numeric characters");let o=[];for(let t=0;t<e.length;){const n=Math.min(e.length-t,3);i(parseInt(e.substring(t,t+n),10),n*3+1,o),t+=n}return new C(C.Mode.NUMERIC,e.length,o)}static makeAlphanumeric(e){if(!C.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let o=[],t;for(t=0;t+2<=e.length;t+=2){let n=C.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t))*45;n+=C.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t+1)),i(n,11,o)}return t<e.length&&i(C.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)),6,o),new C(C.Mode.ALPHANUMERIC,e.length,o)}static makeSegments(e){return e==""?[]:C.isNumeric(e)?[C.makeNumeric(e)]:C.isAlphanumeric(e)?[C.makeAlphanumeric(e)]:[C.makeBytes(C.toUtf8ByteArray(e))]}static makeEci(e){let o=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)i(e,8,o);else if(e<16384)i(2,2,o),i(e,14,o);else if(e<1e6)i(6,3,o),i(e,21,o);else throw new RangeError("ECI assignment value out of range");return new C(C.Mode.ECI,0,o)}static isNumeric(e){return C.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return C.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,o){let t=0;for(const n of e){const r=n.mode.numCharCountBits(o);if(n.numChars>=1<<r)return 1/0;t+=4+r+n.bitData.length}return t}static toUtf8ByteArray(e){e=encodeURI(e);let o=[];for(let t=0;t<e.length;t++)e.charAt(t)!="%"?o.push(e.charCodeAt(t)):(o.push(parseInt(e.substring(t+1,t+3),16)),t+=2);return o}};u.NUMERIC_REGEX=/^[0-9]*$/,u.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,u.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let b=u;d.QrSegment=u})(I||(I={}));(d=>{(s=>{const i=class{constructor(g,u){this.ordinal=g,this.formatBits=u}};i.LOW=new i(0,1),i.MEDIUM=new i(1,0),i.QUARTILE=new i(2,3),i.HIGH=new i(3,2),s.Ecc=i})(d.QrCode||(d.QrCode={}))})(I||(I={}));(d=>{(s=>{const i=class{constructor(g,u){this.modeBits=g,this.numBitsCharCount=u}numCharCountBits(g){return this.numBitsCharCount[Math.floor((g+7)/17)]}};i.NUMERIC=new i(1,[10,12,14]),i.ALPHANUMERIC=new i(2,[9,11,13]),i.BYTE=new i(4,[8,16,16]),i.KANJI=new i(8,[8,10,12]),i.ECI=new i(7,[0,0,0]),s.Mode=i})(d.QrSegment||(d.QrSegment={}))})(I||(I={}));var D=I;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var ve={L:D.QrCode.Ecc.LOW,M:D.QrCode.Ecc.MEDIUM,Q:D.QrCode.Ecc.QUARTILE,H:D.QrCode.Ecc.HIGH},J=128,ee="L",te="#FFFFFF",oe="#000000",ne=!1,re=1,ye=4,Se=0,Fe=.1;function se(d,s=0){const i=[];return d.forEach(function(c,g){let u=null;c.forEach(function(b,A){if(!b&&u!==null){i.push(`M${u+s} ${g+s}h${A-u}v1H${u+s}z`),u=null;return}if(A===c.length-1){if(!b)return;u===null?i.push(`M${A+s},${g+s} h1v1H${A+s}z`):i.push(`M${u+s},${g+s} h${A+1-u}v1H${u+s}z`);return}b&&u===null&&(u=A)})}),i.join("")}function ie(d,s){return d.slice().map((i,c)=>c<s.y||c>=s.y+s.h?i:i.map((g,u)=>u<s.x||u>=s.x+s.w?g:!1))}function Re(d,s,i,c){if(c==null)return null;const g=d.length+i*2,u=Math.floor(s*Fe),b=g/s,A=(c.width||u)*b,e=(c.height||u)*b,o=c.x==null?d.length/2-A/2:c.x*b,t=c.y==null?d.length/2-e/2:c.y*b,n=c.opacity==null?1:c.opacity;let r=null;if(c.excavate){let a=Math.floor(o),m=Math.floor(t),h=Math.ceil(A+o-a),x=Math.ceil(e+t-m);r={x:a,y:m,w:h,h:x}}const l=c.crossOrigin;return{x:o,y:t,h:e,w:A,excavation:r,opacity:n,crossOrigin:l}}function Ie(d,s){return s!=null?Math.max(Math.floor(s),0):d?ye:Se}function ae({value:d,level:s,minVersion:i,includeMargin:c,marginSize:g,imageSettings:u,size:b,boostLevel:A}){let e=M.useMemo(()=>{const a=(Array.isArray(d)?d:[d]).reduce((m,h)=>(m.push(...D.QrSegment.makeSegments(h)),m),[]);return D.QrCode.encodeSegments(a,ve[s],i,void 0,void 0,A)},[d,s,i,A]);const{cells:o,margin:t,numCells:n,calculatedImageSettings:r}=M.useMemo(()=>{let l=e.getModules();const a=Ie(c,g),m=l.length+a*2,h=Re(l,b,a,u);return{cells:l,margin:a,numCells:m,calculatedImageSettings:h}},[e,b,u,c,g]);return{qrcode:e,margin:t,cells:o,numCells:n,calculatedImageSettings:r}}var Pe=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),le=M.forwardRef(function(s,i){const c=s,{value:g,size:u=J,level:b=ee,bgColor:A=te,fgColor:e=oe,includeMargin:o=ne,minVersion:t=re,boostLevel:n,marginSize:r,imageSettings:l}=c,m=Q(c,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:h}=m,x=Q(m,["style"]),E=l==null?void 0:l.src,p=M.useRef(null),N=M.useRef(null),v=M.useCallback(F=>{p.current=F,typeof i=="function"?i(F):i&&(i.current=F)},[i]),[P,B]=M.useState(!1),{margin:L,cells:j,numCells:U,calculatedImageSettings:y}=ae({value:g,level:b,minVersion:t,boostLevel:n,includeMargin:o,marginSize:r,imageSettings:l,size:u});M.useEffect(()=>{if(p.current!=null){const F=p.current,S=F.getContext("2d");if(!S)return;let H=j;const k=N.current,V=y!=null&&k!==null&&k.complete&&k.naturalHeight!==0&&k.naturalWidth!==0;V&&y.excavation!=null&&(H=ie(j,y.excavation));const Y=window.devicePixelRatio||1;F.height=F.width=u*Y;const G=u/U*Y;S.scale(G,G),S.fillStyle=A,S.fillRect(0,0,U,U),S.fillStyle=e,Pe?S.fill(new Path2D(se(H,L))):j.forEach(function(ue,he){ue.forEach(function(fe,me){fe&&S.fillRect(me+L,he+L,1,1)})}),y&&(S.globalAlpha=y.opacity),V&&S.drawImage(k,y.x+L,y.y+L,y.w,y.h)}}),M.useEffect(()=>{B(!1)},[E]);const de=_({height:u,width:u},h);let $=null;return E!=null&&($=M.createElement("img",{src:E,key:E,style:{display:"none"},onLoad:()=>{B(!0)},ref:N,crossOrigin:y==null?void 0:y.crossOrigin})),M.createElement(M.Fragment,null,M.createElement("canvas",_({style:de,height:u,width:u,ref:v,role:"img"},x)),$)});le.displayName="QRCodeCanvas";var De=M.forwardRef(function(s,i){const c=s,{value:g,size:u=J,level:b=ee,bgColor:A=te,fgColor:e=oe,includeMargin:o=ne,minVersion:t=re,boostLevel:n,title:r,marginSize:l,imageSettings:a}=c,m=Q(c,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:h,cells:x,numCells:E,calculatedImageSettings:p}=ae({value:g,level:b,minVersion:t,boostLevel:n,includeMargin:o,marginSize:l,imageSettings:a,size:u});let N=x,v=null;a!=null&&p!=null&&(p.excavation!=null&&(N=ie(x,p.excavation)),v=M.createElement("image",{href:a.src,height:p.h,width:p.w,x:p.x+h,y:p.y+h,preserveAspectRatio:"none",opacity:p.opacity,crossOrigin:p.crossOrigin}));const P=se(N,h);return M.createElement("svg",_({height:u,width:u,viewBox:`0 0 ${E} ${E}`,ref:i,role:"img"},m),!!r&&M.createElement("title",null,r),M.createElement("path",{fill:A,d:`M0,0 h${E}v${E}H0z`,shapeRendering:"crispEdges"}),M.createElement("path",{fill:e,d:P,shapeRendering:"crispEdges"}),v)});De.displayName="QRCodeSVG";const ce={USDT:30,SOL:.232,BTC:87e-5,ETH:.0071,XRP:16.9},Le=d=>{const s=ce[d.toUpperCase()]||0;return we().shape({orderno:z.string(T("entities.deposit.fields.orderno")),amount:z.decimal(T("entities.deposit.fields.amount"),{required:!0,min:s}).test("min-deposit",`Minimum deposit for ${d.toUpperCase()} is ${s}`,function(i){return i?parseFloat(i)>=s:!1}),txid:z.string(T("entities.deposit.fields.txid"),{required:!0}),rechargechannel:z.string(T("entities.deposit.fields.rechargechannel"))})};function _e(){var h;const d=Ne();W(pe.selectCurrentUser);const[s,i]=R.useState("BTC"),[c,g]=R.useState(!1),u=W(ge.selectRows),[b,A]=R.useState((h=u[0])==null?void 0:h.address),e=R.useMemo(()=>Le(s),[s]),[o]=R.useState(()=>({orderno:"",amount:"",txid:"",rechargechannel:"",rechargetime:"",status:"pending"})),t=Ee({resolver:Ce.yupResolver(e),mode:"all",defaultValues:o});R.useEffect(()=>{const x=u.find(E=>E.symbol===s);x&&A(x.address)},[s]);const n=()=>{navigator.clipboard.writeText(b).then(()=>{g(!0),setTimeout(()=>g(!1),3e3)})},r=x=>{const E=new Date,p=E.getFullYear(),N=String(E.getMonth()+1).padStart(2,"0"),v=String(E.getDate()).padStart(2,"0"),P=`${p}${N}${v}`,B=Math.floor(Math.random()*1e7).toString().padStart(7,"0");x.orderno=`RE${P}${B}`,x.rechargetime=E.toISOString(),x.rechargechannel=s,d(xe.doCreate(x)),t.reset({orderno:"",amount:"",txid:"",rechargechannel:"",rechargetime:"",status:"pending"})},l=R.useMemo(()=>u.find(x=>x.symbol===s),[s]),a=x=>{i(x.target.value),t.setValue("amount",""),t.clearErrors("amount")},m=()=>ce[s.toUpperCase()]||0;return f.jsxs("div",{className:"container",children:[f.jsx(Ae,{title:"Deposit Crypto"}),f.jsxs("div",{className:"networkSection",children:[f.jsx("div",{className:"sectionHeading",children:"Select Network"}),f.jsxs("div",{className:"networkDropdownContainer",children:[f.jsx("select",{className:"networkDropdown",value:s,onChange:a,children:u.map(x=>f.jsx("option",{value:x.symbol,children:x.name},x.symbol))}),f.jsx("div",{className:"networkDropdownIcon",children:f.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${s}.png`,style:{width:25,height:25},alt:s})})]})]}),u.symbol,f.jsxs("div",{className:"qrSection",children:[f.jsx(le,{value:b,size:180,bgColor:"#ffffff",fgColor:"#000000",level:"H",includeMargin:!0,className:"qrBox"}),f.jsxs("div",{className:"addressSection",children:[f.jsx("div",{className:"addressLabel",children:"Your deposit address"}),f.jsx("div",{className:"addressText",id:"walletAddress",children:b}),f.jsxs("button",{type:"button",className:"copyBtn",onClick:n,children:[f.jsx("i",{className:"fas fa-copy"})," Copy Address"]})]})]}),f.jsx(be,{...t,children:f.jsxs("form",{onSubmit:t.handleSubmit(r),children:[f.jsxs("div",{className:"amountSection",children:[f.jsx(X,{name:"amount",type:"Number",label:`Deposit amount (${s.toUpperCase()})`,className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:`Minimum: ${m()} ${s.toUpperCase()}`}),f.jsx(X,{name:"txid",type:"text",label:"Transaction ID (TXID)",className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:"Enter The TXID"})]}),f.jsxs("div",{className:"minAmountWarning",children:[f.jsx("i",{className:"fas fa-info-circle"}),"Minimum deposit: ",f.jsxs("strong",{children:[m()," ",s.toUpperCase()]})]}),f.jsxs("div",{className:"warningBox",children:[f.jsxs("div",{className:"warningHeader",children:[f.jsx("i",{className:"fas fa-exclamation-circle warningIcon"}),f.jsx("div",{className:"warningTitle",children:"Important Notice"})]}),f.jsx("div",{className:"warningContent",children:"Please ensure that you select the correct network for your deposit. Sending funds through the wrong network may result in permanent loss of your assets, which cannot be recovered."})]}),f.jsx("button",{type:"submit",className:"depositBtn",disabled:!t.formState.isValid,children:"Confirm Deposit"})]})}),f.jsxs("div",{className:"networkDetails",children:[f.jsxs("div",{className:"detailRow",children:[f.jsx("div",{className:"detailLabel",children:"Network"}),f.jsxs("div",{className:"detailValue",id:"detailNetwork",children:[l.name," (",s.toUpperCase(),")"]})]}),f.jsxs("div",{className:"detailRow",children:[f.jsx("div",{className:"detailLabel",children:"Minimum deposit"}),f.jsxs("div",{className:"detailValue",children:[m()," ",s.toUpperCase()]})]}),f.jsxs("div",{className:"detailRow",children:[f.jsx("div",{className:"detailLabel",children:"Estimated arrival"}),f.jsx("div",{className:"detailValue",children:"3 network confirmations"})]}),f.jsxs("div",{className:"detailRow",children:[f.jsx("div",{className:"detailLabel",children:"Processing time"}),f.jsx("div",{className:"detailValue",children:"10-30 minutes"})]})]}),f.jsx("div",{className:`toastMsg ${c?"visible":""}`,id:"toast",children:"Address copied to clipboard!"}),f.jsx("style",{children:`
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
