"use strict";

var detail_view = new Vue({
  el: "#app",
  data: {},
  methods: {},
  computed: {
    productInfo: function productInfo() {
      if (this.menuData.length == 0) {
        return [];
      }

      var productId = findGetParameter("id");
      var productMapping = this.createProductMapping(this.menuData);
      console.log('productMapping', productMapping);
      return productMapping[productId];
    }
  },
  mounted: function mounted() {
    var id = findGetParameter("id");
    console.log('id', id);
  }
});