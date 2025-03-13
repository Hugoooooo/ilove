"use strict";

var group_view = new Vue({
  el: "#app",
  data: {},
  methods: {},
  computed: {
    groupInfo: function groupInfo() {
      if (this.menuData.length == 0) {
        return [];
      }

      var groupId = findGetParameter("group");
      var groupInfo = this.menuData.find(function (item) {
        return item.id == groupId;
      });
      return groupInfo;
    }
  },
  mounted: function mounted() {}
});