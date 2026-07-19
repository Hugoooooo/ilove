"use strict";

var index_view = new Vue({
  el: "#app",
  data: {
    "bestList": [],
    // 🛠️ 【在這裡填寫你想同時出現的複數區間】
    // 格式請用中括號包起來，中間用逗號隔開，例如這樣：
    "targetCategories": ["11", "21", "31", "71", "81", "91", "12", "51"]
  },
  methods: {
    getRandomProducts: function getRandomProducts() {
      if (this.productMapping) {
        var _this = this;
        var allKeys = Object.keys(this.productMapping);
        
        // 1. 【核心過濾步驟】檢查商品有沒有符合名單中的任何一個區間
        var filteredKeys = allKeys.filter(function(id) {
          // 先把 "product1101" 轉成純數字 "1101"
          var numericId = id.replace(/\D/g, '');
          
          // 檢查目前設定的複數區間陣列裡，有沒有包含這個商品的前兩碼
          return _this.targetCategories.some(function(cat) {
            return numericId.indexOf(cat) === 0;
          });
        });
        
        // 2. 把所有符合這四個分類的商品混合在一起大洗牌
        filteredKeys.sort(function() {
          return Math.random() - 0.5;
        });
        
        // 3. 從混合後的池子裡隨機抽出前 7 個展示
        this.bestList = filteredKeys.slice(0, 7);
      }
    }
  },
  computed: {
    bestProducts: function bestProducts() {
      var _this = this;

      return this.bestList.map(function (id) {
        return _this.productMapping[id] || {};
      });
    }
  },
  watch: {
    productMapping: {
      handler: function handler(newVal) {
        if (newVal && Object.keys(newVal).length > 0) {
          this.getRandomProducts();
        }
      },
      immediate: true
    },
    // 偵聽整個陣列的變化
    targetCategories: {
      handler: function handler() {
        this.getRandomProducts();
      },
      deep: true
    }
  },
  mounted: function mounted() {
    this.getRandomProducts();
  }
});