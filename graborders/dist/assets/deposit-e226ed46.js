import{i as v,t as H,o as I,u as V,V as Z,W as Ae,j as u,p as A,X as Ee,Y as J}from"./index-4cd6ea8b.js";import{S as Ce}from"./SubHeader-a259f0be.js";import{u as be,y as Ne,F as Me,a as _}from"./FormErrors-7891a2f4.js";import{F as ee}from"./FieldFormItem-cd698a33.js";import{S as ve}from"./sucessModal-f14996ab.js";import{u as Se}from"./useDispatch-1f91c277.js";import"./useNotifications-b773cdf3.js";var ye=Object.defineProperty,Q=Object.getOwnPropertySymbols,oe=Object.prototype.hasOwnProperty,se=Object.prototype.propertyIsEnumerable,te=(l,r,i)=>r in l?ye(l,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):l[r]=i,Y=(l,r)=>{for(var i in r||(r={}))oe.call(r,i)&&te(l,i,r[i]);if(Q)for(var i of Q(r))se.call(r,i)&&te(l,i,r[i]);return l},G=(l,r)=>{var i={};for(var d in l)oe.call(l,d)&&r.indexOf(d)<0&&(i[d]=l[d]);if(l!=null&&Q)for(var d of Q(l))r.indexOf(d)<0&&se.call(l,d)&&(i[d]=l[d]);return i};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var B;(l=>{const r=class x{constructor(e,o,t,s){if(this.version=e,this.errorCorrectionLevel=o,this.modules=[],this.isFunction=[],e<x.MIN_VERSION||e>x.MAX_VERSION)throw new RangeError("Version value out of range");if(s<-1||s>7)throw new RangeError("Mask value out of range");this.size=e*4+17;let n=[];for(let a=0;a<this.size;a++)n.push(!1);for(let a=0;a<this.size;a++)this.modules.push(n.slice()),this.isFunction.push(n.slice());this.drawFunctionPatterns();const c=this.addEccAndInterleave(t);if(this.drawCodewords(c),s==-1){let a=1e9;for(let g=0;g<8;g++){this.applyMask(g),this.drawFormatBits(g);const h=this.getPenaltyScore();h<a&&(s=g,a=h),this.applyMask(g)}}w(0<=s&&s<=7),this.mask=s,this.applyMask(s),this.drawFormatBits(s),this.isFunction=[]}static encodeText(e,o){const t=l.QrSegment.makeSegments(e);return x.encodeSegments(t,o)}static encodeBinary(e,o){const t=l.QrSegment.makeBytes(e);return x.encodeSegments([t],o)}static encodeSegments(e,o,t=1,s=40,n=-1,c=!0){if(!(x.MIN_VERSION<=t&&t<=s&&s<=x.MAX_VERSION)||n<-1||n>7)throw new RangeError("Invalid value");let a,g;for(a=t;;a++){const f=x.getNumDataCodewords(a,o)*8,E=N.getTotalBits(e,a);if(E<=f){g=E;break}if(a>=s)throw new RangeError("Data too long")}for(const f of[x.Ecc.MEDIUM,x.Ecc.QUARTILE,x.Ecc.HIGH])c&&g<=x.getNumDataCodewords(a,f)*8&&(o=f);let h=[];for(const f of e){i(f.mode.modeBits,4,h),i(f.numChars,f.mode.numCharCountBits(a),h);for(const E of f.getData())h.push(E)}w(h.length==g);const S=x.getNumDataCodewords(a,o)*8;w(h.length<=S),i(0,Math.min(4,S-h.length),h),i(0,(8-h.length%8)%8,h),w(h.length%8==0);for(let f=236;h.length<S;f^=253)i(f,8,h);let M=[];for(;M.length*8<h.length;)M.push(0);return h.forEach((f,E)=>M[E>>>3]|=f<<7-(E&7)),new x(a,o,M,n)}getModule(e,o){return 0<=e&&e<this.size&&0<=o&&o<this.size&&this.modules[o][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let t=0;t<this.size;t++)this.setFunctionModule(6,t,t%2==0),this.setFunctionModule(t,6,t%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const e=this.getAlignmentPatternPositions(),o=e.length;for(let t=0;t<o;t++)for(let s=0;s<o;s++)t==0&&s==0||t==0&&s==o-1||t==o-1&&s==0||this.drawAlignmentPattern(e[t],e[s]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){const o=this.errorCorrectionLevel.formatBits<<3|e;let t=o;for(let n=0;n<10;n++)t=t<<1^(t>>>9)*1335;const s=(o<<10|t)^21522;w(s>>>15==0);for(let n=0;n<=5;n++)this.setFunctionModule(8,n,d(s,n));this.setFunctionModule(8,7,d(s,6)),this.setFunctionModule(8,8,d(s,7)),this.setFunctionModule(7,8,d(s,8));for(let n=9;n<15;n++)this.setFunctionModule(14-n,8,d(s,n));for(let n=0;n<8;n++)this.setFunctionModule(this.size-1-n,8,d(s,n));for(let n=8;n<15;n++)this.setFunctionModule(8,this.size-15+n,d(s,n));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let t=0;t<12;t++)e=e<<1^(e>>>11)*7973;const o=this.version<<12|e;w(o>>>18==0);for(let t=0;t<18;t++){const s=d(o,t),n=this.size-11+t%3,c=Math.floor(t/3);this.setFunctionModule(n,c,s),this.setFunctionModule(c,n,s)}}drawFinderPattern(e,o){for(let t=-4;t<=4;t++)for(let s=-4;s<=4;s++){const n=Math.max(Math.abs(s),Math.abs(t)),c=e+s,a=o+t;0<=c&&c<this.size&&0<=a&&a<this.size&&this.setFunctionModule(c,a,n!=2&&n!=4)}}drawAlignmentPattern(e,o){for(let t=-2;t<=2;t++)for(let s=-2;s<=2;s++)this.setFunctionModule(e+s,o+t,Math.max(Math.abs(s),Math.abs(t))!=1)}setFunctionModule(e,o,t){this.modules[o][e]=t,this.isFunction[o][e]=!0}addEccAndInterleave(e){const o=this.version,t=this.errorCorrectionLevel;if(e.length!=x.getNumDataCodewords(o,t))throw new RangeError("Invalid argument");const s=x.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][o],n=x.ECC_CODEWORDS_PER_BLOCK[t.ordinal][o],c=Math.floor(x.getNumRawDataModules(o)/8),a=s-c%s,g=Math.floor(c/s);let h=[];const S=x.reedSolomonComputeDivisor(n);for(let f=0,E=0;f<s;f++){let y=e.slice(E,E+g-n+(f<a?0:1));E+=y.length;const L=x.reedSolomonComputeRemainder(y,S);f<a&&y.push(0),h.push(y.concat(L))}let M=[];for(let f=0;f<h[0].length;f++)h.forEach((E,y)=>{(f!=g-n||y>=a)&&M.push(E[f])});return w(M.length==c),M}drawCodewords(e){if(e.length!=Math.floor(x.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let o=0;for(let t=this.size-1;t>=1;t-=2){t==6&&(t=5);for(let s=0;s<this.size;s++)for(let n=0;n<2;n++){const c=t-n,g=(t+1&2)==0?this.size-1-s:s;!this.isFunction[g][c]&&o<e.length*8&&(this.modules[g][c]=d(e[o>>>3],7-(o&7)),o++)}}w(o==e.length*8)}applyMask(e){if(e<0||e>7)throw new RangeError("Mask value out of range");for(let o=0;o<this.size;o++)for(let t=0;t<this.size;t++){let s;switch(e){case 0:s=(t+o)%2==0;break;case 1:s=o%2==0;break;case 2:s=t%3==0;break;case 3:s=(t+o)%3==0;break;case 4:s=(Math.floor(t/3)+Math.floor(o/2))%2==0;break;case 5:s=t*o%2+t*o%3==0;break;case 6:s=(t*o%2+t*o%3)%2==0;break;case 7:s=((t+o)%2+t*o%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[o][t]&&s&&(this.modules[o][t]=!this.modules[o][t])}}getPenaltyScore(){let e=0;for(let n=0;n<this.size;n++){let c=!1,a=0,g=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[n][h]==c?(a++,a==5?e+=x.PENALTY_N1:a>5&&e++):(this.finderPenaltyAddHistory(a,g),c||(e+=this.finderPenaltyCountPatterns(g)*x.PENALTY_N3),c=this.modules[n][h],a=1);e+=this.finderPenaltyTerminateAndCount(c,a,g)*x.PENALTY_N3}for(let n=0;n<this.size;n++){let c=!1,a=0,g=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[h][n]==c?(a++,a==5?e+=x.PENALTY_N1:a>5&&e++):(this.finderPenaltyAddHistory(a,g),c||(e+=this.finderPenaltyCountPatterns(g)*x.PENALTY_N3),c=this.modules[h][n],a=1);e+=this.finderPenaltyTerminateAndCount(c,a,g)*x.PENALTY_N3}for(let n=0;n<this.size-1;n++)for(let c=0;c<this.size-1;c++){const a=this.modules[n][c];a==this.modules[n][c+1]&&a==this.modules[n+1][c]&&a==this.modules[n+1][c+1]&&(e+=x.PENALTY_N2)}let o=0;for(const n of this.modules)o=n.reduce((c,a)=>c+(a?1:0),o);const t=this.size*this.size,s=Math.ceil(Math.abs(o*20-t*10)/t)-1;return w(0<=s&&s<=9),e+=s*x.PENALTY_N4,w(0<=e&&e<=2568888),e}getAlignmentPatternPositions(){if(this.version==1)return[];{const e=Math.floor(this.version/7)+2,o=this.version==32?26:Math.ceil((this.version*4+4)/(e*2-2))*2;let t=[6];for(let s=this.size-7;t.length<e;s-=o)t.splice(1,0,s);return t}}static getNumRawDataModules(e){if(e<x.MIN_VERSION||e>x.MAX_VERSION)throw new RangeError("Version number out of range");let o=(16*e+128)*e+64;if(e>=2){const t=Math.floor(e/7)+2;o-=(25*t-10)*t-55,e>=7&&(o-=36)}return w(208<=o&&o<=29648),o}static getNumDataCodewords(e,o){return Math.floor(x.getNumRawDataModules(e)/8)-x.ECC_CODEWORDS_PER_BLOCK[o.ordinal][e]*x.NUM_ERROR_CORRECTION_BLOCKS[o.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw new RangeError("Degree out of range");let o=[];for(let s=0;s<e-1;s++)o.push(0);o.push(1);let t=1;for(let s=0;s<e;s++){for(let n=0;n<o.length;n++)o[n]=x.reedSolomonMultiply(o[n],t),n+1<o.length&&(o[n]^=o[n+1]);t=x.reedSolomonMultiply(t,2)}return o}static reedSolomonComputeRemainder(e,o){let t=o.map(s=>0);for(const s of e){const n=s^t.shift();t.push(0),o.forEach((c,a)=>t[a]^=x.reedSolomonMultiply(c,n))}return t}static reedSolomonMultiply(e,o){if(e>>>8||o>>>8)throw new RangeError("Byte out of range");let t=0;for(let s=7;s>=0;s--)t=t<<1^(t>>>7)*285,t^=(o>>>s&1)*e;return w(t>>>8==0),t}finderPenaltyCountPatterns(e){const o=e[1];w(o<=this.size*3);const t=o>0&&e[2]==o&&e[3]==o*3&&e[4]==o&&e[5]==o;return(t&&e[0]>=o*4&&e[6]>=o?1:0)+(t&&e[6]>=o*4&&e[0]>=o?1:0)}finderPenaltyTerminateAndCount(e,o,t){return e&&(this.finderPenaltyAddHistory(o,t),o=0),o+=this.size,this.finderPenaltyAddHistory(o,t),this.finderPenaltyCountPatterns(t)}finderPenaltyAddHistory(e,o){o[0]==0&&(e+=this.size),o.pop(),o.unshift(e)}};r.MIN_VERSION=1,r.MAX_VERSION=40,r.PENALTY_N1=3,r.PENALTY_N2=3,r.PENALTY_N3=40,r.PENALTY_N4=10,r.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],r.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],l.QrCode=r;function i(m,e,o){if(e<0||e>31||m>>>e)throw new RangeError("Value out of range");for(let t=e-1;t>=0;t--)o.push(m>>>t&1)}function d(m,e){return(m>>>e&1)!=0}function w(m){if(!m)throw new Error("Assertion error")}const p=class C{constructor(e,o,t){if(this.mode=e,this.numChars=o,this.bitData=t,o<0)throw new RangeError("Invalid argument");this.bitData=t.slice()}static makeBytes(e){let o=[];for(const t of e)i(t,8,o);return new C(C.Mode.BYTE,e.length,o)}static makeNumeric(e){if(!C.isNumeric(e))throw new RangeError("String contains non-numeric characters");let o=[];for(let t=0;t<e.length;){const s=Math.min(e.length-t,3);i(parseInt(e.substring(t,t+s),10),s*3+1,o),t+=s}return new C(C.Mode.NUMERIC,e.length,o)}static makeAlphanumeric(e){if(!C.isAlphanumeric(e))throw new RangeError("String contains unencodable characters in alphanumeric mode");let o=[],t;for(t=0;t+2<=e.length;t+=2){let s=C.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t))*45;s+=C.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t+1)),i(s,11,o)}return t<e.length&&i(C.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)),6,o),new C(C.Mode.ALPHANUMERIC,e.length,o)}static makeSegments(e){return e==""?[]:C.isNumeric(e)?[C.makeNumeric(e)]:C.isAlphanumeric(e)?[C.makeAlphanumeric(e)]:[C.makeBytes(C.toUtf8ByteArray(e))]}static makeEci(e){let o=[];if(e<0)throw new RangeError("ECI assignment value out of range");if(e<128)i(e,8,o);else if(e<16384)i(2,2,o),i(e,14,o);else if(e<1e6)i(6,3,o),i(e,21,o);else throw new RangeError("ECI assignment value out of range");return new C(C.Mode.ECI,0,o)}static isNumeric(e){return C.NUMERIC_REGEX.test(e)}static isAlphanumeric(e){return C.ALPHANUMERIC_REGEX.test(e)}getData(){return this.bitData.slice()}static getTotalBits(e,o){let t=0;for(const s of e){const n=s.mode.numCharCountBits(o);if(s.numChars>=1<<n)return 1/0;t+=4+n+s.bitData.length}return t}static toUtf8ByteArray(e){e=encodeURI(e);let o=[];for(let t=0;t<e.length;t++)e.charAt(t)!="%"?o.push(e.charCodeAt(t)):(o.push(parseInt(e.substring(t+1,t+3),16)),t+=2);return o}};p.NUMERIC_REGEX=/^[0-9]*$/,p.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,p.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let N=p;l.QrSegment=p})(B||(B={}));(l=>{(r=>{const i=class{constructor(w,p){this.ordinal=w,this.formatBits=p}};i.LOW=new i(0,1),i.MEDIUM=new i(1,0),i.QUARTILE=new i(2,3),i.HIGH=new i(3,2),r.Ecc=i})(l.QrCode||(l.QrCode={}))})(B||(B={}));(l=>{(r=>{const i=class{constructor(w,p){this.modeBits=w,this.numBitsCharCount=p}numCharCountBits(w){return this.numBitsCharCount[Math.floor((w+7)/17)]}};i.NUMERIC=new i(1,[10,12,14]),i.ALPHANUMERIC=new i(2,[9,11,13]),i.BYTE=new i(4,[8,16,16]),i.KANJI=new i(8,[8,10,12]),i.ECI=new i(7,[0,0,0]),r.Mode=i})(l.QrSegment||(l.QrSegment={}))})(B||(B={}));var T=B;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var Fe={L:T.QrCode.Ecc.LOW,M:T.QrCode.Ecc.MEDIUM,Q:T.QrCode.Ecc.QUARTILE,H:T.QrCode.Ecc.HIGH},ne=128,re="L",ie="#FFFFFF",ae="#000000",le=!1,ce=1,Re=4,Ie=0,Pe=.1;function de(l,r=0){const i=[];return l.forEach(function(d,w){let p=null;d.forEach(function(N,m){if(!N&&p!==null){i.push(`M${p+r} ${w+r}h${m-p}v1H${p+r}z`),p=null;return}if(m===d.length-1){if(!N)return;p===null?i.push(`M${m+r},${w+r} h1v1H${m+r}z`):i.push(`M${p+r},${w+r} h${m+1-p}v1H${p+r}z`);return}N&&p===null&&(p=m)})}),i.join("")}function ue(l,r){return l.slice().map((i,d)=>d<r.y||d>=r.y+r.h?i:i.map((w,p)=>p<r.x||p>=r.x+r.w?w:!1))}function Le(l,r,i,d){if(d==null)return null;const w=l.length+i*2,p=Math.floor(r*Pe),N=w/r,m=(d.width||p)*N,e=(d.height||p)*N,o=d.x==null?l.length/2-m/2:d.x*N,t=d.y==null?l.length/2-e/2:d.y*N,s=d.opacity==null?1:d.opacity;let n=null;if(d.excavate){let a=Math.floor(o),g=Math.floor(t),h=Math.ceil(m+o-a),S=Math.ceil(e+t-g);n={x:a,y:g,w:h,h:S}}const c=d.crossOrigin;return{x:o,y:t,h:e,w:m,excavation:n,opacity:s,crossOrigin:c}}function De(l,r){return r!=null?Math.max(Math.floor(r),0):l?Re:Ie}function he({value:l,level:r,minVersion:i,includeMargin:d,marginSize:w,imageSettings:p,size:N,boostLevel:m}){let e=v.useMemo(()=>{const a=(Array.isArray(l)?l:[l]).reduce((g,h)=>(g.push(...T.QrSegment.makeSegments(h)),g),[]);return T.QrCode.encodeSegments(a,Fe[r],i,void 0,void 0,m)},[l,r,i,m]);const{cells:o,margin:t,numCells:s,calculatedImageSettings:n}=v.useMemo(()=>{let c=e.getModules();const a=De(d,w),g=c.length+a*2,h=Le(c,N,a,p);return{cells:c,margin:a,numCells:g,calculatedImageSettings:h}},[e,N,p,d,w]);return{qrcode:e,margin:t,cells:o,numCells:s,calculatedImageSettings:n}}var Be=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),pe=v.forwardRef(function(r,i){const d=r,{value:w,size:p=ne,level:N=re,bgColor:m=ie,fgColor:e=ae,includeMargin:o=le,minVersion:t=ce,boostLevel:s,marginSize:n,imageSettings:c}=d,g=G(d,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:h}=g,S=G(g,["style"]),M=c==null?void 0:c.src,f=v.useRef(null),E=v.useRef(null),y=v.useCallback(D=>{f.current=D,typeof i=="function"?i(D):i&&(i.current=D)},[i]),[L,b]=v.useState(!1),{margin:R,cells:z,numCells:O,calculatedImageSettings:F}=he({value:w,level:N,minVersion:t,boostLevel:s,includeMargin:o,marginSize:n,imageSettings:c,size:p});v.useEffect(()=>{if(f.current!=null){const D=f.current,P=D.getContext("2d");if(!P)return;let W=z;const j=E.current,X=F!=null&&j!==null&&j.complete&&j.naturalHeight!==0&&j.naturalWidth!==0;X&&F.excavation!=null&&(W=ue(z,F.excavation));const K=window.devicePixelRatio||1;D.height=D.width=p*K;const q=p/O*K;P.scale(q,q),P.fillStyle=m,P.fillRect(0,0,O,O),P.fillStyle=e,Be?P.fill(new Path2D(de(W,R))):z.forEach(function(fe,ge){fe.forEach(function(we,xe){we&&P.fillRect(xe+R,ge+R,1,1)})}),F&&(P.globalAlpha=F.opacity),X&&P.drawImage(j,F.x+R,F.y+R,F.w,F.h)}}),v.useEffect(()=>{b(!1)},[M]);const $=Y({height:p,width:p},h);let U=null;return M!=null&&(U=v.createElement("img",{src:M,key:M,style:{display:"none"},onLoad:()=>{b(!0)},ref:E,crossOrigin:F==null?void 0:F.crossOrigin})),v.createElement(v.Fragment,null,v.createElement("canvas",Y({style:$,height:p,width:p,ref:y,role:"img"},S)),U)});pe.displayName="QRCodeCanvas";var Te=v.forwardRef(function(r,i){const d=r,{value:w,size:p=ne,level:N=re,bgColor:m=ie,fgColor:e=ae,includeMargin:o=le,minVersion:t=ce,boostLevel:s,title:n,marginSize:c,imageSettings:a}=d,g=G(d,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:h,cells:S,numCells:M,calculatedImageSettings:f}=he({value:w,level:N,minVersion:t,boostLevel:s,includeMargin:o,marginSize:c,imageSettings:a,size:p});let E=S,y=null;a!=null&&f!=null&&(f.excavation!=null&&(E=ue(S,f.excavation)),y=v.createElement("image",{href:a.src,height:f.h,width:f.w,x:f.x+h,y:f.y+h,preserveAspectRatio:"none",opacity:f.opacity,crossOrigin:f.crossOrigin}));const L=de(E,h);return v.createElement("svg",Y({height:p,width:p,viewBox:`0 0 ${M} ${M}`,ref:i,role:"img"},g),!!n&&v.createElement("title",null,n),v.createElement("path",{fill:m,d:`M0,0 h${M}v${M}H0z`,shapeRendering:"crispEdges"}),v.createElement("path",{fill:e,d:L,shapeRendering:"crispEdges"}),y)});Te.displayName="QRCodeSVG";const k=l=>l.deposit.form,ze=H([k],l=>l.record),Oe=H([k],l=>!!l.initLoading),je=H([k],l=>!!l.saveLoading),ke=H([k],l=>!!l.depositModal),Ue={selectInitLoading:Oe,selectSaveLoading:je,selectRecord:ze,selectDepositModal:ke,selectRaw:k},me={USDT:30,SOL:.232,BTC:87e-5,ETH:.0071,XRP:16.9},_e=l=>{const r=me[l==null?void 0:l.toUpperCase()]||0;return Ee().shape({orderno:_.string(A("entities.deposit.fields.orderno")),amount:_.decimal(A("entities.deposit.fields.amount"),{required:!0,min:r}),txid:_.string(A("pages.deposit.fields.txid"),{required:!0}),rechargechannel:_.string(A("entities.deposit.fields.rechargechannel"))})};function qe(){var L;const l=Se(),[r,i]=I.useState("USDT"),[d,w]=I.useState(""),[p,N]=I.useState(!1),m=V(Z.selectRows),e=V(Z.selectLoading),o=V(Ue.selectDepositModal),[t,s]=I.useState(((L=m==null?void 0:m[0])==null?void 0:L.address)||"");I.useState(!1);const n=I.useMemo(()=>_e(r),[r]),[c]=I.useState(()=>({orderno:"",amount:"",txid:"",rechargechannel:"",rechargetime:"",status:"pending"})),a=be({resolver:Ne.yupResolver(n),mode:"all",defaultValues:c});I.useEffect(()=>{l(Ae.doFetch())},[l]),I.useEffect(()=>{if(m&&m.length>0){const b=m.find(R=>R.symbol===r);b?s(b.address):m[0]&&(i(m[0].symbol),s(m[0].address))}},[r,m]);const g=()=>{if(!t){console.error("No address to copy");return}navigator.clipboard.writeText(t).then(()=>{N(!0),setTimeout(()=>N(!1),3e3)}).catch(b=>{console.error("Failed to copy address: ",b)})},h=b=>{if(!r){console.error("No network selected");return}const R=new Date,z=R.getFullYear(),O=String(R.getMonth()+1).padStart(2,"0"),F=String(R.getDate()).padStart(2,"0"),$=`${z}${O}${F}`,U=Math.floor(Math.random()*1e7).toString().padStart(7,"0");b.orderno=`RE${$}${U}`,b.rechargetime=R.toISOString(),b.rechargechannel=r,w(b.amount),l(J.doCreate(b)),a.reset({orderno:"",amount:"",txid:"",rechargechannel:"",rechargetime:"",status:"pending"})},S=I.useMemo(()=>(m==null?void 0:m.find(b=>b.symbol===r))||null,[r,m]),M=()=>{l(J.doClose()),w("")},f=b=>{i(b.target.value),a.setValue("amount",""),a.clearErrors("amount")},E=()=>me[r==null?void 0:r.toUpperCase()]||0,y=()=>(S==null?void 0:S.name)||r||A("pages.deposit.unknownNetwork");return u.jsxs("div",{className:"container",children:[u.jsx(Ce,{title:A("pages.deposit.title")}),e&&u.jsx("p",{children:A("pages.deposit.loading")}),!e&&m&&m.length>0&&u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"networkSection",children:[u.jsx("div",{className:"sectionHeading",children:A("pages.deposit.selectNetwork")}),u.jsxs("div",{className:"networkDropdownContainer",children:[u.jsx("select",{className:"networkDropdown",value:r,onChange:f,"aria-label":A("pages.deposit.selectNetwork"),children:m.map(b=>u.jsx("option",{value:b.symbol,children:b.name},b.symbol))}),u.jsx("div",{className:"networkDropdownIcon",children:u.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${r}.png`,style:{width:25,height:25},alt:r})})]})]}),t&&u.jsxs("div",{className:"qrSection",children:[u.jsx(pe,{value:t,size:180,bgColor:"#ffffff",fgColor:"#000000",level:"H",includeMargin:!0,className:"qrBox"}),u.jsxs("div",{className:"addressSection",children:[u.jsx("div",{className:"addressLabel",children:A("pages.deposit.depositAddress")}),u.jsx("div",{className:"addressText",id:"walletAddress",children:t}),u.jsxs("button",{type:"button",className:"copyBtn",onClick:g,disabled:!t,children:[u.jsx("i",{className:"fas fa-copy"})," ",A("pages.deposit.copyAddress")]})]})]}),u.jsx(Me,{...a,children:u.jsxs("form",{onSubmit:a.handleSubmit(h),children:[u.jsxs("div",{className:"amountSection",children:[u.jsx(ee,{name:"amount",label:A("pages.deposit.amountLabel",r.toUpperCase()),className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:A("pages.deposit.amountPlaceholder",E(),r.toUpperCase())}),u.jsx(ee,{name:"txid",type:"text",label:A("pages.deposit.txidLabel"),className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:A("pages.deposit.txidPlaceholder")})]}),u.jsxs("div",{className:"minAmountWarning",children:[u.jsx("i",{className:"fas fa-info-circle"}),A("pages.deposit.minimumDeposit"),": ",u.jsxs("strong",{children:[E()," ",r.toUpperCase()]})]}),u.jsxs("div",{className:"warningBox",children:[u.jsxs("div",{className:"warningHeader",children:[u.jsx("i",{className:"fas fa-exclamation-circle warningIcon"}),u.jsx("div",{className:"warningTitle",children:A("pages.deposit.importantNotice")})]}),u.jsx("div",{className:"warningContent",children:A("pages.deposit.warningMessage")})]}),u.jsx("button",{type:"submit",className:"depositBtn",disabled:!a.formState.isValid||!t,children:A("pages.deposit.confirmDeposit")})]})}),u.jsxs("div",{className:"networkDetails",children:[u.jsxs("div",{className:"detailRow",children:[u.jsx("div",{className:"detailLabel",children:A("pages.deposit.network")}),u.jsxs("div",{className:"detailValue",id:"detailNetwork",children:[y()," (",r.toUpperCase(),")"]})]}),u.jsxs("div",{className:"detailRow",children:[u.jsx("div",{className:"detailLabel",children:A("pages.deposit.minimumDeposit")}),u.jsxs("div",{className:"detailValue",children:[E()," ",r.toUpperCase()]})]}),u.jsxs("div",{className:"detailRow",children:[u.jsx("div",{className:"detailLabel",children:A("pages.deposit.estimatedArrival")}),u.jsx("div",{className:"detailValue",children:A("pages.deposit.networkConfirmations")})]}),u.jsxs("div",{className:"detailRow",children:[u.jsx("div",{className:"detailLabel",children:A("pages.deposit.processingTime")}),u.jsx("div",{className:"detailValue",children:A("pages.deposit.processingTimeValue")})]})]})]}),!e&&(!m||m.length===0)&&u.jsx("div",{className:"no-methods-message",children:A("pages.deposit.noMethods")}),u.jsx("div",{className:`toastMsg ${p?"visible":""}`,id:"toast",children:A("pages.deposit.addressCopied")}),o&&u.jsx(ve,{isOpen:o,onClose:M,type:"deposit",amount:d,coinType:r}),u.jsx("style",{children:`
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
