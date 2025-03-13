"use strict";

var search_view = new Vue({
  el: "#app",
  data: {
    keyword: ""
  },
  methods: {
    searchMode: function searchMode(data, keyword) {
      if (!keyword) return [];
      var results = [];

      var search = function search(items) {
        items.forEach(function (item) {
          // 檢查第一層name是否符合
          if (item.name.includes(keyword)) {
            // 如果符合,收集此類別下所有商品
            collectAllProducts(item, results);
          } else if (item.children && item.children.length > 0) {
            // 遞迴搜尋子類別
            search(item.children);
          }
        });
      }; // 收集所有商品的輔助函式


      var collectAllProducts = function collectAllProducts(item, results) {
        if (!item.children || item.children.length === 0) {
          // 沒有子項目代表是商品,直接加入結果
          if (item.id && item.id.startsWith('product')) {
            results.push(item);
          }

          return;
        } // 遞迴收集子類別的商品


        item.children.forEach(function (child) {
          collectAllProducts(child, results);
        });
      };

      search(data);
      return results;
    }
  },
  computed: {
    searchList: function searchList() {
      if (this.menuData.length == 0) {
        return [];
      }

      this.keyword = findGetParameter("keyword");

      if (this.keyword) {
        return this.searchMode(this.menuData, this.keyword);
      }
    }
  },
  mounted: function mounted() {}
});