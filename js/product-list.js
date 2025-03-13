"use strict";

var list_view = new Vue({
  el: "#app",
  data: {
    mainCategory: null
  },
  methods: {},
  computed: {
    categoryInfo: function categoryInfo() {
      if (this.menuData.length == 0) {
        return [];
      }

      var query = findGetParameter("category").split("-");
      var subCategoryId = query[0];
      var pos = parseInt(query[1]) - 1;
      var mainCategory = this.menuData.find(function (item) {
        return item.id == subCategoryId;
      });
      this.mainCategory = mainCategory;
      return mainCategory.children[pos];
    }
  },
  mounted: function mounted() {}
});