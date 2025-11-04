import{r as M,i as H,h as R,u as V,H as Z,I as Ae,j as u,J as Ee,K as U,M as J}from"./index-127ecb3a.js";import{S as Ce}from"./SubHeader-f276b968.js";import{u as be,y as Ne,F as Me,a as _}from"./FormErrors-7fa888c6.js";import{F as ee}from"./FieldFormItem-b391ee16.js";import{S as ve}from"./sucessModal-a4d9f570.js";import{u as Se}from"./useDispatch-b88df682.js";import"./useNotifications-926b7852.js";var ye=Object.defineProperty,Q=Object.getOwnPropertySymbols,oe=Object.prototype.hasOwnProperty,ne=Object.prototype.propertyIsEnumerable,te=(l,s,i)=>s in l?ye(l,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):l[s]=i,Y=(l,s)=>{for(var i in s||(s={}))oe.call(s,i)&&te(l,i,s[i]);if(Q)for(var i of Q(s))ne.call(s,i)&&te(l,i,s[i]);return l},G=(l,s)=>{var i={};for(var d in l)oe.call(l,d)&&s.indexOf(d)<0&&(i[d]=l[d]);if(l!=null&&Q)for(var d of Q(l))s.indexOf(d)<0&&ne.call(l,d)&&(i[d]=l[d]);return i};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var L;(l=>{const s=class x{constructor(e,o,t,n){if(this.version=e,this.errorCorrectionLevel=o,this.modules=[],this.isFunction=[],e<x.MIN_VERSION||e>x.MAX_VERSION)throw new RangeError("Version value out of range");if(n<-1||n>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let r=[];for(let a=0;a<this.size;a++)r.push(!1);for(let a=0;a<this.size;a++)this.modules.push(r.slice()),this.isFunction.push(r.slice());this.drawFunctionPatterns();const c=this.addEccAndInterleave(t);if(this.drawCodewords(c),n==-1){let a=1e9;for(let g=0;g<8;g++){this.applyMask(g),this.drawFormatBits(g);const h=this.getPenaltyScore();h<a&&(n=g,a=h),this.applyMask(g)}}w(0<=n&&n<=7),this.mask=n,this.applyMask(n),this.drawFormatBits(n),this.isFunction=[]}static encodeText(e,o){const t=l.QrSegment.makeSegments(e);return x.encodeSegments(t,o)}static encodeBinary(e,o){const t=l.QrSegment.makeBytes(e);return x.encodeSegments([t],o)}static encodeSegments(e,o,t=1,n=40,r=-1,c=!0){if(!(x.MIN_VERSION<=t&&t<=n&&n<=x.MAX_VERSION)||r<-1||r>7)throw new RangeError("Invalid value");let a,g;for(a=t;;a++){const f=x.getNumDataCodewords(a,o)*8,A=b.getTotalBits(e,a);if(A<=f){g=A;break}if(a>=n)throw new RangeError("Data too long")}for(const f of[x.Ecc.MEDIUM,x.Ecc.QUARTILE,x.Ecc.HIGH])c&&g<=x.getNumDataCodewords(a,f)*8&&(o=f);let h=[];for(const f of e){i(f.mode.modeBits,4,h),i(f.numChars,f.mode.numCharCountBits(a),h);for(const A of f.getData())h.push(A)}w(h.length==g);const v=x.getNumDataCodewords(a,o)*8;w(h.length<=v),i(0,Math.min(4,v-h.length),h),i(0,(8-h.length%8)%8,h),w(h.length%8==0);for(let f=236;h.length<v;f^=253)i(f,8,h);let N=[];for(;N.length*8<h.length;)N.push(0);return h.forEach((f,A)=>N[A>>>3]|=f<<7-(A&7)),new x(a,o,N,r)}getModule(e,o){return 0<=e&&e<this.size&&0<=o&&o<this.size&&this.modules[o][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let t=0;t<this.size;t++)this.setFunctionModule(6,t,t%2==0),this.setFunctionModule(t,6,t%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),o=e.length;for(let t=0;t<o;t++)for(let n=0;n<o;n++)t==0&&n==0||t==0&&n==o-1||t==o-1&&n==0||this.drawAlignmentPattern(e[t],e[n]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const o=this.errorCorrectionLevel.formatBits<<3|e;let t=o;for(let r=0;r<10;r++)t=t<<1^(t>>>9)*1335;const n=(o<<10|t)^21522;w(n>>>15==0);for(let r=0;r<=5;r++)this.setFunctionModule(8,r,d(n,r));this.setFunctionModule(8,7,d(n,6)),this.setFunctionModule(8,8,d(n,7)),this.setFunctionModule(7,8,d(n,8));for(let r=9;r<15;r++)this.setFunctionModule(14-r,8,d(n,r));for(let r=0;r<8;r++)this.setFunctionModule(this.size-1-r,8,d(n,r));for(let r=8;r<15;r++)this.setFunctionModule(8,this.size-15+r,d(n,r));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let t=0;t<12;t++)e=e<<1^(e>>>11)*7973;const o=this.version<<12|e;w(o>>>18==0);for(let t=0;t<18;t++){const n=d(o,t),r=this.size-11+t%3,c=Math.floor(t/3);this.setFunctionModule(r,c,n),this.setFunctionModule(c,r,n)}}drawFinderPattern(e,o){for(let t=-4;t<=4;t++)for(let n=-4;n<=4;n++){const r=Math.max(Math.abs(n),Math.abs(t)),c=e+n,a=o+t;0<=c&&c<this.size&&0<=a&&a<this.size&&this.setFunctionModule(c,a,r!=2&&r!=4)}}drawAlignmentPattern(e,o){for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)this.setFunctionModule(e+n,o+t,Math.max(Math.abs(n),Math.abs(t))!=1)}setFunctionModule(e,o,t){this.modules[o][e]=t,this.isFunction[o][e]=!0}addEccAndInterleave(e){const o=this.version,t=this.errorCorrectionLevel;if(e.length!=x.getNumDataCodewords(o,t))throw new RangeError("Invalid argument");const n=x.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][o],r=x.ECC_CODEWORDS_PER_BLOCK[t.ordinal][o],c=Math.floor(x.getNumRawDataModules(o)/8),a=n-c%n,g=Math.floor(c/n);let h=[];const v=x.reedSolomonComputeDivisor(r);for(let f=0,A=0;f<n;f++){let S=e.slice(A,A+g-r+(f<a?0:1));A+=S.length;const P=x.reedSolomonComputeRemainder(S,v);f<a&&S.push(0),h.push(S.concat(P))}let N=[];for(let f=0;f<h[0].length;f++)h.forEach((A,S)=>{(f!=g-r||S>=a)&&N.push(A[f])});return w(N.length==c),N}drawCodewords(e){if(e.length!=Math.floor(x.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let o=0;for(let t=this.size-1;t>=1;t-=2){t==6&&(t=5);for(let n=0;n<this.size;n++)for(let r=0;r<2;r++){const c=t-r,g=(t+1&2)==0?this.size-1-n:n;!this.isFunction[g][c]&&o<e.length*8&&(this.modules[g][c]=d(e[o>>>3],7-(o&7)),o++)}}w(o==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let o=0;o<this.size;o++)for(let t=0;t<this.size;t++){let n;switch(e){case 0:n=(t+o)%2==0;break;case 1:n=o%2==0;break;case 2:n=t%3==0;break;case 3:n=(t+o)%3==0;break;case 4:n=(Math.floor(t/3)+Math.floor(o/2))%2==0;break;case 5:n=t*o%2+t*o%3==0;break;case 6:n=(t*o%2+t*o%3)%2==0;break;case 7:n=((t+o)%2+t*o%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[o][t]&&n&&(this.modules[o][t]=!this.modules[o][t])}}getPenaltyScore(){let e=0;for(let r=0;r<this.size;r++){let c=!1,a=0,g=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[r][h]==c?(a++,a==5?e+=x.PENALTY_N1:a>5&&e++):(this.finderPenaltyAddHistory(a,g),c||(e+=this.finderPenaltyCountPatterns(g)*x.PENALTY_N3),c=this.modules[r][h],a=1);e+=this.finderPenaltyTerminateAndCount(c,a,g)*x.PENALTY_N3}for(let r=0;r<this.size;r++){let c=!1,a=0,g=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[h][r]==c?(a++,a==5?e+=x.PENALTY_N1:a>5&&e++):(this.finderPenaltyAddHistory(a,g),c||(e+=this.finderPenaltyCountPatterns(g)*x.PENALTY_N3),c=this.modules[h][r],a=1);e+=this.finderPenaltyTerminateAndCount(c,a,g)*x.PENALTY_N3}for(let r=0;r<this.size-1;r++)for(let c=0;c<this.size-1;c++){const a=this.modules[r][c];a==this.modules[r][c+1]&&a==this.modules[r+1][c]&&a==this.modules[r+1][c+1]&&(e+=x.PENALTY_N2)}let o=0;for(const r of this.modules)o=r.reduce((c,a)=>c+(a?1:0),o);const t=this.size*this.size,n=Math.ceil(Math.abs(o*20-t*10)/t)-1;return w(0<=n&&n<=9),e+=n*x.PENALTY_N4,w(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,o=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let t=[6];for(let n=this.size-7;t.length<e;n-=o)t.splice(1,0,n);return t}}static getNumRawDataModules(e){if(e<x.MIN_VERSION||e>x.MAX_VERSION)throw new RangeError("Version number out of range");let o=(16*e+128)*e+64;if(e>=2){const t=Math.floor(e/7)+2;o-=(25*t-10)*t-55,e>=7&&(o-=36)}return w(208<=o&&o<=29648),o}static getNumDataCodewords(e,o){return Math.floor(x.getNumRawDataModules(e)/8)-x.ECC_CODEWORDS_PER_BLOCK[o.ordinal][e]*x.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let o=[];for(let n=0;n<e-1;n++)o.push(0);o.push(1);let t=1;for(let n=0;n<e;n++){for(let r=0;r<o.length;r++)o[r]=x.reedSolomonMultiply(o[r],t),r+1<o.length&&(o[r]^=o[r+1]);t=x.reedSolomonMultiply(t,2)}return o}static reedSolomonComputeRemainder(e,o){let t=o.map(n=>0);for(const n of e){const r=n^t.shift();t.push(0),o.forEach((c,a)=>t[a]^=x.reedSolomonMultiply(c,r))}return t}static reedSolomonMultiply(e,o){if(e>>>8||o>>>8)throw new RangeError("Byte out of range");let t=0;for(let n=7;n>=0;n--)t=t<<1^(t>>>7)*285,t^=(o>>>n&1)*e;return w(t>>>8==0),t}finderPenaltyCountPatterns(e){const o=e[1];w(o<=this.size*3);const t=o>0&&e[2]==o&&e[3]==o*3&&e[4]==o&&e[5]==o;return(t&&e[0]>=o*4&&e[6]>=o?1:0)+(t&&e[6]>=o*4&&e[0]>=o?1:0)}finderPenaltyTerminateAndCount(e,o,t){return e&&(this.finderPenaltyAddHistory(o,t),o=0),o+=this.size,this.finderPenaltyAddHistory(o,t),this.finderPenaltyCountPatterns(t)}finderPenaltyAddHistory(e,o){o[0]==0&&(e+=this.size),o.pop(),o.unshift(e)}};s.MIN_VERSION=1,s.MAX_VERSION=40,s.PENALTY_N1=3,s.PENALTY_N2=3,s.PENALTY_N3=40,s.PENALTY_N4=10,s.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],s.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],l.QrCode=s;function i(p,e,o){if(e<0||e>31||p>>>e)throw new RangeError("Value out of range");for(let t=e-1;t>=0;t--)o.push(p>>>t&1)}function d(p,e){return(p>>>e&1)!=0}function w(p){if(!p)throw new Error("Assertion error")}const m=class E{constructor(e,o,t){if(this.mode=e,this.numChars=o,this.bitData=t,o<0)throw new RangeError("Invalid argument");this.bitData=t.slice()}static makeBytes(e){let o=[];for(const t of e)i(t,8,o);return new E(E.Mode.BYTE,e.length,o)}static makeNumeric(e){if(!E.isNumeric(e))throw new RangeError("String contains non-numeric characters");let o=[];for(let t=0;t<e.length;){const n=Math.min(e.length-t,3);i(parseInt(e.substring(t,t+n),10),n*3+1,o),t+=n}return new E(E.Mode.NUMERIC,e.length,o)}static makeAlphanumeric(e){if(!E.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let o=[],t;for(t=0;t+2<=e.length;t+=2){let n=E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t))*45;n+=E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t+1)),i(n,11,o)}return t<e.length&&i(E.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)),6,o),new E(E.Mode.ALPHANUMERIC,e.length,o)}static makeSegments(e){return e==""?[]:E.isNumeric(e)?[E.makeNumeric(e)]:E.isAlphanumeric(e)?[E.makeAlphanumeric(e)]:[E.makeBytes(E.toUtf8ByteArray(e))]}static makeEci(e){let o=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)i(e,8,o);else if(e<16384)i(2,2,o),i(e,14,o);else if(e<1e6)i(6,3,o),i(e,21,o);else throw new RangeError("ECI assignment value out of range");return new E(E.Mode.ECI,0,o)}static isNumeric(e){return E.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return E.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,o){let t=0;for(const n of e){const r=n.mode.numCharCountBits(o);if(n.numChars>=1<<r)return 1/0;t+=4+r+n.bitData.length}return t}static toUtf8ByteArray(e){e=encodeURI(e);let o=[];for(let t=0;t<e.length;t++)e.charAt(t)!="%"?o.push(e.charCodeAt(t)):(o.push(parseInt(e.substring(t+1,t+3),16)),t+=2);return o}};m.NUMERIC_REGEX=/^[0-9]*$/,m.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,m.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let b=m;l.QrSegment=m})(L||(L={}));(l=>{(s=>{const i=class{constructor(w,m){this.ordinal=w,this.formatBits=m}};i.LOW=new i(0,1),i.MEDIUM=new i(1,0),i.QUARTILE=new i(2,3),i.HIGH=new i(3,2),s.Ecc=i})(l.QrCode||(l.QrCode={}))})(L||(L={}));(l=>{(s=>{const i=class{constructor(w,m){this.modeBits=w,this.numBitsCharCount=m}numCharCountBits(w){return this.numBitsCharCount[Math.floor((w+7)/17)]}};i.NUMERIC=new i(1,[10,12,14]),i.ALPHANUMERIC=new i(2,[9,11,13]),i.BYTE=new i(4,[8,16,16]),i.KANJI=new i(8,[8,10,12]),i.ECI=new i(7,[0,0,0]),s.Mode=i})(l.QrSegment||(l.QrSegment={}))})(L||(L={}));var B=L;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var Fe={L:B.QrCode.Ecc.LOW,M:B.QrCode.Ecc.MEDIUM,Q:B.QrCode.Ecc.QUARTILE,H:B.QrCode.Ecc.HIGH},re=128,se="L",ie="#FFFFFF",ae="#000000",le=!1,ce=1,Re=4,Ie=0,Pe=.1;function de(l,s=0){const i=[];return l.forEach(function(d,w){let m=null;d.forEach(function(b,p){if(!b&&m!==null){i.push(`M${m+s} ${w+s}h${p-m}v1H${m+s}z`),m=null;return}if(p===d.length-1){if(!b)return;m===null?i.push(`M${p+s},${w+s} h1v1H${p+s}z`):i.push(`M${m+s},${w+s} h${p+1-m}v1H${m+s}z`);return}b&&m===null&&(m=p)})}),i.join("")}function ue(l,s){return l.slice().map((i,d)=>d<s.y||d>=s.y+s.h?i:i.map((w,m)=>m<s.x||m>=s.x+s.w?w:!1))}function De(l,s,i,d){if(d==null)return null;const w=l.length+i*2,m=Math.floor(s*Pe),b=w/s,p=(d.width||m)*b,e=(d.height||m)*b,o=d.x==null?l.length/2-p/2:d.x*b,t=d.y==null?l.length/2-e/2:d.y*b,n=d.opacity==null?1:d.opacity;let r=null;if(d.excavate){let a=Math.floor(o),g=Math.floor(t),h=Math.ceil(p+o-a),v=Math.ceil(e+t-g);r={x:a,y:g,w:h,h:v}}const c=d.crossOrigin;return{x:o,y:t,h:e,w:p,excavation:r,opacity:n,crossOrigin:c}}function Le(l,s){return s!=null?Math.max(Math.floor(s),0):l?Re:Ie}function he({value:l,level:s,minVersion:i,includeMargin:d,marginSize:w,imageSettings:m,size:b,boostLevel:p}){let e=M.useMemo(()=>{const a=(Array.isArray(l)?l:[l]).reduce((g,h)=>(g.push(...B.QrSegment.makeSegments(h)),g),[]);return B.QrCode.encodeSegments(a,Fe[s],i,void 0,void 0,p)},[l,s,i,p]);const{cells:o,margin:t,numCells:n,calculatedImageSettings:r}=M.useMemo(()=>{let c=e.getModules();const a=Le(d,w),g=c.length+a*2,h=De(c,b,a,m);return{cells:c,margin:a,numCells:g,calculatedImageSettings:h}},[e,b,m,d,w]);return{qrcode:e,margin:t,cells:o,numCells:n,calculatedImageSettings:r}}var Be=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),me=M.forwardRef(function(s,i){const d=s,{value:w,size:m=re,level:b=se,bgColor:p=ie,fgColor:e=ae,includeMargin:o=le,minVersion:t=ce,boostLevel:n,marginSize:r,imageSettings:c}=d,g=G(d,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:h}=g,v=G(g,["style"]),N=c==null?void 0:c.src,f=M.useRef(null),A=M.useRef(null),S=M.useCallback(D=>{f.current=D,typeof i=="function"?i(D):i&&(i.current=D)},[i]),[P,C]=M.useState(!1),{margin:F,cells:T,numCells:k,calculatedImageSettings:y}=he({value:w,level:b,minVersion:t,boostLevel:n,includeMargin:o,marginSize:r,imageSettings:c,size:m});M.useEffect(()=>{if(f.current!=null){const D=f.current,I=D.getContext("2d");if(!I)return;let W=T;const z=A.current,X=y!=null&&z!==null&&z.complete&&z.naturalHeight!==0&&z.naturalWidth!==0;X&&y.excavation!=null&&(W=ue(T,y.excavation));const K=window.devicePixelRatio||1;D.height=D.width=m*K;const q=m/k*K;I.scale(q,q),I.fillStyle=p,I.fillRect(0,0,k,k),I.fillStyle=e,Be?I.fill(new Path2D(de(W,F))):T.forEach(function(fe,ge){fe.forEach(function(we,xe){we&&I.fillRect(xe+F,ge+F,1,1)})}),y&&(I.globalAlpha=y.opacity),X&&I.drawImage(z,y.x+F,y.y+F,y.w,y.h)}}),M.useEffect(()=>{C(!1)},[N]);const $=Y({height:m,width:m},h);let j=null;return N!=null&&(j=M.createElement("img",{src:N,key:N,style:{display:"none"},onLoad:()=>{C(!0)},ref:A,crossOrigin:y==null?void 0:y.crossOrigin})),M.createElement(M.Fragment,null,M.createElement("canvas",Y({style:$,height:m,width:m,ref:S,role:"img"},v)),j)});me.displayName="QRCodeCanvas";var Te=M.forwardRef(function(s,i){const d=s,{value:w,size:m=re,level:b=se,bgColor:p=ie,fgColor:e=ae,includeMargin:o=le,minVersion:t=ce,boostLevel:n,title:r,marginSize:c,imageSettings:a}=d,g=G(d,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:h,cells:v,numCells:N,calculatedImageSettings:f}=he({value:w,level:b,minVersion:t,boostLevel:n,includeMargin:o,marginSize:c,imageSettings:a,size:m});let A=v,S=null;a!=null&&f!=null&&(f.excavation!=null&&(A=ue(v,f.excavation)),S=M.createElement("image",{href:a.src,height:f.h,width:f.w,x:f.x+h,y:f.y+h,preserveAspectRatio:"none",opacity:f.opacity,crossOrigin:f.crossOrigin}));const P=de(A,h);return M.createElement("svg",Y({height:m,width:m,viewBox:`0 0 ${N} ${N}`,ref:i,role:"img"},g),!!r&&M.createElement("title",null,r),M.createElement("path",{fill:p,d:`M0,0 h${N}v${N}H0z`,shapeRendering:"crispEdges"}),M.createElement("path",{fill:e,d:P,shapeRendering:"crispEdges"}),S)});Te.displayName="QRCodeSVG";const O=l=>l.deposit.form,ke=H([O],l=>l.record),ze=H([O],l=>!!l.initLoading),Oe=H([O],l=>!!l.saveLoading),je=H([O],l=>!!l.depositModal),Ue={selectInitLoading:ze,selectSaveLoading:Oe,selectRecord:ke,selectDepositModal:je,selectRaw:O},pe={USDT:30,SOL:.232,BTC:87e-5,ETH:.0071,XRP:16.9},_e=l=>{const s=pe[l==null?void 0:l.toUpperCase()]||0;return Ee().shape({orderno:_.string(U("entities.deposit.fields.orderno")),amount:_.decimal(U("entities.deposit.fields.amount"),{required:!0,min:s}),txid:_.string(U("entities.deposit.fields.txid"),{required:!0}),rechargechannel:_.string(U("entities.deposit.fields.rechargechannel"))})};function qe(){var P;const l=Se(),[s,i]=R.useState("USDT"),[d,w]=R.useState(""),[m,b]=R.useState(!1),p=V(Z.selectRows),e=V(Z.selectLoading),o=V(Ue.selectDepositModal),[t,n]=R.useState(((P=p==null?void 0:p[0])==null?void 0:P.address)||"");R.useState(!1);const r=R.useMemo(()=>_e(s),[s]),[c]=R.useState(()=>({orderno:"",amount:"",txid:"",rechargechannel:"",rechargetime:"",status:"pending"})),a=be({resolver:Ne.yupResolver(r),mode:"all",defaultValues:c});R.useEffect(()=>{l(Ae.doFetch())},[l]),R.useEffect(()=>{if(p&&p.length>0){const C=p.find(F=>F.symbol===s);C?n(C.address):p[0]&&(i(p[0].symbol),n(p[0].address))}},[s,p]);const g=()=>{if(!t){console.error("No address to copy");return}navigator.clipboard.writeText(t).then(()=>{b(!0),setTimeout(()=>b(!1),3e3)}).catch(C=>{console.error("Failed to copy address: ",C)})},h=C=>{if(!s){console.error("No network selected");return}const F=new Date,T=F.getFullYear(),k=String(F.getMonth()+1).padStart(2,"0"),y=String(F.getDate()).padStart(2,"0"),$=`${T}${k}${y}`,j=Math.floor(Math.random()*1e7).toString().padStart(7,"0");C.orderno=`RE${$}${j}`,C.rechargetime=F.toISOString(),C.rechargechannel=s,w(C.amount),l(J.doCreate(C)),a.reset({orderno:"",amount:"",txid:"",rechargechannel:"",rechargetime:"",status:"pending"})},v=R.useMemo(()=>(p==null?void 0:p.find(C=>C.symbol===s))||null,[s,p]),N=()=>{l(J.doClose()),w("")},f=C=>{i(C.target.value),a.setValue("amount",""),a.clearErrors("amount")},A=()=>pe[s==null?void 0:s.toUpperCase()]||0,S=()=>(v==null?void 0:v.name)||s||"Unknown Network";return u.jsxs("div",{className:"container",children:[u.jsx(Ce,{title:"Deposit Crypto"}),e&&u.jsx("p",{children:"Deposit method loading ..."}),!e&&p&&p.length>0&&u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"networkSection",children:[u.jsx("div",{className:"sectionHeading",children:"Select Network"}),u.jsxs("div",{className:"networkDropdownContainer",children:[u.jsx("select",{className:"networkDropdown",value:s,onChange:f,"aria-label":"Select Network",children:p.map(C=>u.jsx("option",{value:C.symbol,children:C.name},C.symbol))}),u.jsx("div",{className:"networkDropdownIcon",children:u.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${s}.png`,style:{width:25,height:25},alt:s})})]})]}),t&&u.jsxs("div",{className:"qrSection",children:[u.jsx(me,{value:t,size:180,bgColor:"#ffffff",fgColor:"#000000",level:"H",includeMargin:!0,className:"qrBox"}),u.jsxs("div",{className:"addressSection",children:[u.jsx("div",{className:"addressLabel",children:"Your deposit address"}),u.jsx("div",{className:"addressText",id:"walletAddress",children:t}),u.jsxs("button",{type:"button",className:"copyBtn",onClick:g,disabled:!t,children:[u.jsx("i",{className:"fas fa-copy"})," Copy Address"]})]})]}),u.jsx(Me,{...a,children:u.jsxs("form",{onSubmit:a.handleSubmit(h),children:[u.jsxs("div",{className:"amountSection",children:[u.jsx(ee,{name:"amount",label:`Deposit amount (${s.toUpperCase()})`,className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:`Minimum: ${A()} ${s.toUpperCase()}`}),u.jsx(ee,{name:"txid",type:"text",label:"Transaction ID (TXID)",className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:"Enter The TXID"})]}),u.jsxs("div",{className:"minAmountWarning",children:[u.jsx("i",{className:"fas fa-info-circle"}),"Minimum deposit: ",u.jsxs("strong",{children:[A()," ",s.toUpperCase()]})]}),u.jsxs("div",{className:"warningBox",children:[u.jsxs("div",{className:"warningHeader",children:[u.jsx("i",{className:"fas fa-exclamation-circle warningIcon"}),u.jsx("div",{className:"warningTitle",children:"Important Notice"})]}),u.jsx("div",{className:"warningContent",children:"Please ensure that you select the correct network for your deposit. Sending funds through the wrong network may result in permanent loss of your assets, which cannot be recovered."})]}),u.jsx("button",{type:"submit",className:"depositBtn",disabled:!a.formState.isValid||!t,children:"Confirm Deposit"})]})}),u.jsxs("div",{className:"networkDetails",children:[u.jsxs("div",{className:"detailRow",children:[u.jsx("div",{className:"detailLabel",children:"Network"}),u.jsxs("div",{className:"detailValue",id:"detailNetwork",children:[S()," (",s.toUpperCase(),")"]})]}),u.jsxs("div",{className:"detailRow",children:[u.jsx("div",{className:"detailLabel",children:"Minimum deposit"}),u.jsxs("div",{className:"detailValue",children:[A()," ",s.toUpperCase()]})]}),u.jsxs("div",{className:"detailRow",children:[u.jsx("div",{className:"detailLabel",children:"Estimated arrival"}),u.jsx("div",{className:"detailValue",children:"3 network confirmations"})]}),u.jsxs("div",{className:"detailRow",children:[u.jsx("div",{className:"detailLabel",children:"Processing time"}),u.jsx("div",{className:"detailValue",children:"10-30 minutes"})]})]})]}),!e&&(!p||p.length===0)&&u.jsx("div",{className:"no-methods-message",children:"No deposit methods available at the moment."}),u.jsx("div",{className:`toastMsg ${m?"visible":""}`,id:"toast",children:"Address copied to clipboard!"}),o&&u.jsx(ve,{isOpen:o,onClose:N,type:"deposit",amount:d,coinType:s}),u.jsx("style",{children:`
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
`})]})}export{qe as default};
