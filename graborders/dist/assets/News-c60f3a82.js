import{a7 as i,j as e,C as N,r as m,u as p,p as h}from"./index-17631913.js";import{S as f}from"./SubHeader-b13b6488.js";import{p as u}from"./productListSelectors-cc253f7a.js";import{v as y}from"./v4-4a60fe23.js";import{u as b}from"./useDispatch-252e08ea.js";class x{static NewsDate(s){return i(s).format("DD-MM-YYYY")}static newTime(s){return i(s).format("HH:MM")}static Monthago(s){return i(s).fromNow()}static currentDate(s){return i(s).format("DD-MM-YYYY HH:mm")}static current(){return i().format("DD-MM-YYYY HH:mm")}static Date(s){return i(s).format("DD-MM-YYYY HH:mm")}static orderNow(){return i().format("yyyymmDD")}static Number(){const s=i().format("yyyyMMDD"),r=y().replace(/-/g,"").substring(0,8);return`${s}${r}`}}x.formatDateTime=t=>{try{const s=new Date(t),r=s.getFullYear(),a=String(s.getMonth()+1).padStart(2,"0"),c=String(s.getDate()).padStart(2,"0"),l=String(s.getHours()).padStart(2,"0"),d=String(s.getMinutes()).padStart(2,"0"),o=String(s.getSeconds()).padStart(2,"0");return`${r}/${a}/${c} ${l}:${d}:${o}`}catch(s){return console.error("Error formatting date:",s),t}};function j(t){const{topic:s,loading:r}=t;return e.jsx(e.Fragment,{children:s==null?void 0:s.map((a,c)=>{var l,d;return e.jsxs("div",{className:"news-item",children:[e.jsxs("div",{className:"news-header",children:[e.jsx("div",{className:"news-source",children:e.jsx("i",{className:"fas fa-newspaper"})}),e.jsxs("div",{className:"news-info",children:[e.jsx("div",{className:"news-source-name",children:a==null?void 0:a.meta.sourceName}),e.jsxs("div",{className:"news-date",children:[" ",x.NewsDate(a.meta.updatedAt)]})]})]}),e.jsx("div",{className:"news-title",children:(l=a==null?void 0:a.meta)==null?void 0:l.title}),e.jsx("div",{className:"news-content",children:(d=a==null?void 0:a.meta)==null?void 0:d.subtitle}),e.jsx("img",{loading:"lazy",src:a==null?void 0:a.cover,className:"news-image"}),e.jsxs("div",{className:"news-footer",children:[e.jsx("div",{className:"news-tags",children:a.assets.map(o=>e.jsxs("span",{className:"news-tag",style:{display:"flex",alignItems:"center",gap:3},children:[e.jsx("img",{src:`https://s2.coinmarketcap.com/static/img/coins/64x64/${o.coinId}.png`,alt:"",style:{width:10,height:10}})," ",o.symbol]}))}),e.jsx("div",{className:"news-actions"})]})]},c)})})}const v=[{key:"news",coin:0,label:"All"},{key:"bitcoin",coin:1,label:"Bitcoin"},{key:"ethereum",coin:1027,label:"Ethereum"},{key:"Usdt",coin:825,label:"Usdt"},{key:"BNB",coin:1839,label:"BNB"},{key:"Solona",coin:5426,label:"Solona"},{key:"USDC",coin:3408,label:"USDC"},{key:"XRP",coin:52,label:"XRP"},{key:"toncoin",coin:11419,label:"TonCoin"}],k=()=>e.jsx("div",{className:"news-placeholder",children:[...Array(5)].map((t,s)=>e.jsxs("div",{className:"news-item-placeholder",children:[e.jsx("div",{className:"placeholder-image shimmer"}),e.jsxs("div",{className:"placeholder-content",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"80%",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"60%",height:"14px",marginBottom:"12px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"40%",height:"12px"}})]})]},s))});function D(){const t=b(),[s,r]=m.useState("news"),a=p(u.selectNews),c=p(u.selectloadingNews);p(u.selectRows);const l=m.useMemo(()=>v,[]),d=m.useCallback((n,g)=>{r(n);const w={id:g,page:1,size:30};t(h.doFindNews(w))},[t]),o=m.useCallback(()=>{t(h.doFetch());const n={id:1,page:1,size:60};t(h.doFindNews(n))},[t]);return m.useEffect(()=>{o()},[o]),e.jsxs("div",{className:"container",children:[e.jsx(f,{title:"Crypto News"}),e.jsx("div",{className:"news-filters",children:l.map(n=>e.jsx("button",{className:`filter-button ${s===n.key?"active":""}`,onClick:()=>d(n.key,n.coin),children:n.label},n.key))}),e.jsxs("div",{className:"news-list",children:[e.jsx("div",{className:"news-section-title",children:"Latest News"}),c?e.jsx(k,{}):e.jsx(j,{topic:a,loading:c})]}),e.jsx("style",{children:`
        /* Shimmer animation for loading placeholders */
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }
        
        .shimmer {
          animation-duration: 1.5s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: shimmer;
          animation-timing-function: linear;
          background: #2A2A2A;
          background: #2A2A2A
          background-size: 800px 104px;
          position: relative;
        }
        
        .news-placeholder {
          margin-top: 16px;
        }
        
        .news-item-placeholder {
          display: flex;
          margin-bottom: 20px;
          padding: 16px;
          background: #1A1A1A;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .placeholder-image {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          margin-right: 16px;
          flex-shrink: 0;
        }
        
        .placeholder-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .placeholder-line {
          border-radius: 4px;
          margin-bottom: 8px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .news-item-placeholder {
            flex-direction: column;
          }
          
          .placeholder-image {
            width: 100%;
            height: 160px;
            margin-right: 0;
            margin-bottom: 12px;
          }
        }
      `})]})}const C=N.memo(D);export{C as default};
