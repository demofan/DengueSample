# 專案說明 #

此為課程範例網站，利用一個快速打造的 Web 介紹 Microsoft Azure WebApp 的功能，以及如何利用 Microsoft Azure Search 服務建立高水準的搜尋功能。



## 資料來源 ##

政府資料開放平台 [http://data.gov.tw/](http://data.gov.tw/)提供的登革熱近12個月每日確定病例統計 [http://data.gov.tw/node/21026](http://data.gov.tw/node/21026)

## 此範例使用套的套件列表 ##

- bootstrap：[http://getbootstrap.com](http://getbootstrap.com)
- jQuery：[https://jquery.com](https://jquery.com)
- jQUery UI(css)：[https://jqueryui.com/](https://jqueryui.com/)
- jqgrid：[http://jqgrid.com/](http://jqgrid.com/)
- gmap3：[http://gmap3.net/](http://gmap3.net/)
- xdate：[http://arshaw.com/xdate/](http://arshaw.com/xdate/)

## 重點檔案說明 ##


- `AzureSearch.json.postman_collection`
    - postman 設定檔，建立 Azure Search 索引用
- `demo.js`
    - javascript 都寫在這
- `Grid.html`
    - jqgrid 範例
- `Map.html`
    - GMAP 範例
- `put.json`
    - 精簡後的 json 檔
- `Search.html`
    - Azure Search 範例
- `web.config`
    - 讓 Azure WebApp 認識 json 檔案的組態檔

