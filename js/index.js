"use strict";

var index_view = new Vue({
  el: "#app",
  data: {
    "bestList": ["product1101", "product11202", "product7101", "product3101", "product8106", "product9103", "product11102"]
  },
  methods: {},
  computed: {
    bestProducts: function bestProducts() {
      var _this = this;

      return this.bestList.map(function (id) {
        return _this.productMapping[id] || {};
      });
    }
  },
  mounted: function mounted() {}
});