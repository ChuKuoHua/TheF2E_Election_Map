# THE F2E Election-Map
Release: v1.1.0
Node: 建議 v16 以上

2023-10-31

## Setup
```bash
# npm
npm install
```
## Development Server
```bash
# npm
npm run dev
```
## Production
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