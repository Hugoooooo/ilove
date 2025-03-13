"use strict";

var production = false;
var device = deviceCheck();
var md = new MobileDetect(window.navigator.userAgent);

function deviceCheck() {
  var device = {};
  var md = new MobileDetect(window.navigator.userAgent);

  if (md.match(/android/i)) {
    device.os = "android";
    device.version = md.version("android");
  } else if (md.match(/(iphone|ipad|ipod);?/i)) {
    device.os = "ios";
    device.version = md.version("iOS");
  } else {
    device.os = "pc";
    device.version = md.version("Chrome");
  }

  return device;
}

function findGetParameter(parameterName) {
  var result = null,
      tmp = [];
  location.search.substr(1).split("&").forEach(function (item) {
    tmp = item.split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  });
  return result;
}

Vue.config.devtools = !production;
Vue.config.debug = !production;
Vue.config.silent = production;
document.addEventListener('DOMContentLoaded', function () {
  console.log("v1.01");
  console.log(device);
});
Vue.mixin({
  data: function data() {
    return {
      projApi: null,
      errorMsg: "",
      envMode: production ? "Started" : "Testing",
      loading: false,
      menuData: [],
      productMapping: {},
      search: ""
    };
  },
  computed: {},
  watch: {
    errorMsg: function errorMsg(val) {
      document.querySelector('body').classList.toggle('_freeze');
    }
  },
  methods: {
    gaEvant: function gaEvant(gtmData) {
      dataLayer.push({
        'event': gtmData
      });
      console.log("ga:", gtmData);
    },
    createProductMapping: function createProductMapping(menuData) {
      var productMapping = {};
      var groupInfo = null;

      function processItems(categoryArr, categoryInfo) {
        categoryArr.forEach(function (item) {
          if (item.id && item.id.startsWith('product')) {
            var _groupInfo, _groupInfo2;

            productMapping[item.id] = {
              id: item.id,
              groupName: (_groupInfo = groupInfo) === null || _groupInfo === void 0 ? void 0 : _groupInfo.name,
              group: (_groupInfo2 = groupInfo) === null || _groupInfo2 === void 0 ? void 0 : _groupInfo2.id,
              name: item.name,
              categoryName: categoryInfo.name,
              category: item.category,
              content: item.content,
              notice: item.notice,
              price: item === null || item === void 0 ? void 0 : item.price,
              img: item.img,
              warning: item === null || item === void 0 ? void 0 : item.warning
            };
          } // 如果有子項目，遞迴處理


          if (item.children && Array.isArray(item.children)) {
            if (!item.id.includes('-')) groupInfo = item;
            processItems(item.children, item);
          }
        });
      }

      processItems(menuData);
      return productMapping;
    },
    handleSearchSubmit: function handleSearchSubmit() {
      if (this.search) {
        window.location.href = "search.html?keyword=".concat(this.search);
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    // 抓取 menu.json
    var menuFile = "static/data/menu.json";
    axios.get(menuFile).then(function (response) {
      _this.menuData = response.data;
      _this.productMapping = _this.createProductMapping(_this.menuData);
    }, function (response) {
      console.log("error", response);
    });
  }
});