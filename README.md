# 2023 F2E - 2020 總統大選
線上網址：https://thef2e-election-map-sky.onrender.com/

![image](https://hackmd.io/_uploads/HypP1dj46.png)

## 作品說明
* [The F2E 2023 第二關卡-總統即時開票全台地圖參賽作品。](https://2023.thef2e.com/news)

作品為2020的總統大選結果，以全國、縣市、區域、鄉里四大層面來檢視票數。除了列出各候選人得票率及投票率之外，也佐以圖表、地圖做出視覺化資料呈現。
如：首頁以台灣地圖表示22縣市的票數分佈版圖，而縣市詳細頁面有長條圖及圓餅圖展示詳細資料。讓使用者可以透過直覺的搜尋方式輕鬆了解到自己居住地區投票的情形！

## 系統說明
Node: 建議 v16 以上

### Setup
```bash
# npm
npm install
```
### Development Server
```bash
# npm
npm run dev
```
### Production
```bash
# npm
npm run build
```

## 檔案結構
- api(管理所有 API)
- assets(scss、圖片等)
- components(共用元件)
- composables(共用的 js 邏輯)
- content(可放 JSON、XML、CSV 等文件)
- pages(頁面)
- plugins(第三方引入的插件)
- public(存放不須編譯的檔案)
- stores(pinia配置)
- utils(工具函數)
- app.vue(Nuxt3 的入口點頁面)

## 使用技術
* [Nuxt3](https://nuxt.com/)：基於Vue.js和Vite的框架，支援伺服器端渲染（SSR）。
* [Tailwindcss](https://tailwindcss.com/)
* [Pinia](https://pinia.vuejs.org)
* [d3](https://d3js.org/)：由[政府資料開放平台](https://data.gov.tw/dataset/7442)取得縣市界線，轉為 TopoJSON 後用以繪製台灣地圖。
* [echarts](https://echarts.apache.org/zh/index.html)：透過 API 回傳的投票數據，以長條圖、圓餅圖分析各縣市投票狀況。
* Google Apps Script + Google Excel：下載[中選會](https://db.cec.gov.tw/ElecTable/Election/ElecTickets?dataType=tickets&typeId=ELC&subjectId=P0&legisId=00&themeId=1f7d9f4f6bfe06fdaf4db7df2ed4d60c&dataLevel=N&prvCode=00&cityCode=000&areaCode=00&deptCode=000&liCode=0000)2020總統大選結果 Excel，並放置於 Google Excel上，使用 Google Apps Script 取得資料並開立 API。
* [eslint](https://eslint.org/)
* [prettier](https://prettier.io/)

## 參與人員
* 前端工程師：Yilee
* 前端工程師：Kuohua
* UI工程師：Gloria su

Update: 2023-11-21