import{j as e,E as g,r as o,u as d,p as m}from"./index-cda6c8f0.js";import{S as u}from"./SubHeader-4b199ec3.js";import{p}from"./productListSelectors-777686af.js";import{D as N}from"./Dates-52f8f10c.js";import{u as j}from"./useDispatch-dbff049f.js";import"./v4-4a60fe23.js";function b(i){const{topic:n,loading:h}=i;return e.jsx(e.Fragment,{children:n==null?void 0:n.map((s,t)=>{var c,r;return e.jsxs("div",{className:"news-item",children:[e.jsxs("div",{className:"news-header",children:[e.jsx("div",{className:"news-source",children:e.jsx("i",{className:"fas fa-newspaper"})}),e.jsxs("div",{className:"news-info",children:[e.jsx("div",{className:"news-source-name",children:s==null?void 0:s.meta.sourceName}),e.jsxs("div",{className:"news-date",children:[" ",N.NewsDate(s.meta.updatedAt)]})]})]}),e.jsx("div",{className:"news-title",children:(c=s==null?void 0:s.meta)==null?void 0:c.title}),e.jsx("div",{className:"news-content",children:(r=s==null?void 0:s.meta)==null?void 0:r.subtitle}),e.jsx("img",{loading:"lazy",src:s==null?void 0:s.cover,className:"news-image"}),e.jsxs("div",{className:"news-footer",children:[e.jsx("div",{className:"news-tags",children:s.assets.map(l=>e.jsxs("span",{className:"news-tag",style:{display:"flex",alignItems:"center",gap:3},children:[e.jsx("img",{src:`https://s2.coinmarketcap.com/static/img/coins/64x64/${l.coinId}.png`,alt:"",style:{width:10,height:10}})," ",l.symbol]}))}),e.jsx("div",{className:"news-actions"})]})]},t)})})}const f=[{key:"news",coin:0,label:"All"},{key:"bitcoin",coin:1,label:"Bitcoin"},{key:"ethereum",coin:1027,label:"Ethereum"},{key:"Usdt",coin:825,label:"Usdt"},{key:"BNB",coin:1839,label:"BNB"},{key:"Solona",coin:5426,label:"Solona"},{key:"USDC",coin:3408,label:"USDC"},{key:"XRP",coin:52,label:"XRP"},{key:"toncoin",coin:11419,label:"TonCoin"}],y=()=>e.jsx("div",{className:"news-placeholder",children:[...Array(5)].map((i,n)=>e.jsxs("div",{className:"news-item-placeholder",children:[e.jsx("div",{className:"placeholder-image shimmer"}),e.jsxs("div",{className:"placeholder-content",children:[e.jsx("div",{className:"placeholder-line shimmer",style:{width:"80%",height:"16px",marginBottom:"8px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"60%",height:"14px",marginBottom:"12px"}}),e.jsx("div",{className:"placeholder-line shimmer",style:{width:"40%",height:"12px"}})]})]},n))});function v(){const i=j(),[n,h]=o.useState("news"),s=d(p.selectNews),t=d(p.selectloadingNews);d(p.selectRows);const c=o.useMemo(()=>f,[]),r=o.useCallback((a,x)=>{h(a);const w={id:x,page:1,size:30};i(m.doFindNews(w))},[i]),l=o.useCallback(()=>{i(m.doFetch());const a={id:1,page:1,size:60};i(m.doFindNews(a))},[i]);return o.useEffect(()=>{l()},[l]),e.jsxs("div",{className:"container",children:[e.jsx(u,{title:"Crypto News"}),e.jsx("div",{className:"news-filters",children:c.map(a=>e.jsx("button",{className:`filter-button ${n===a.key?"active":""}`,onClick:()=>r(a.key,a.coin),children:a.label},a.key))}),e.jsxs("div",{className:"news-list",children:[e.jsx("div",{className:"news-section-title",children:"Latest News"}),t?e.jsx(y,{}):e.jsx(b,{topic:s,loading:t})]}),e.jsx("style",{children:`
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
      `})]})}const D=g.memo(v);export{D as default};
