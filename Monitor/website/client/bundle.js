(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

    // 页面性能监控
    var processData = function processData(p) {
      var data = {
        // 上个页面卸载到本页面开始加载的时长
        prevPageUnload: p.fetchStart - p.navigationStart,
        // 重定向的时长
        redirect: p.redirectEnd - p.redirectStart,
        // dns解析时长
        dns: p.domainLookupEnd - p.domainLookupStart,
        // tcp connect
        tcpConnect: p.connectEnd - p.connectStart,
        // request -> response
        send: p.responseEnd - p.requestStart,
        // 首字节接收到的时长
        ttfb: p.responseStart - p.navigationStart,
        // dom准备的时长
        domready: p.domInteractive - p.domLoading,
        // 白屏
        whiteScreen: p.domLoading - p.navigationStart,
        // dom解析时间
        dom: p.domComplete - p.domLoading,
        // window.onload执行时间
        windowonload: p.loadEventEnd - p.loadEventStart,
        // total
        total: p.loadEventEnd - p.navigationStart
      };
      return data;
    }; // onload页面全都加载完再执行


    var load = function load(cb) {
      var timer;

      var check = function check() {
        if (performance.timing.loadEventEnd) {
          clearTimeout(timer);
          cb();
        } else {
          timer = setTimeout(check, 100);
        }
      };

      window.addEventListener('load', check, false);
    }; // dom解析完成后，还没有触发onload


    var domReady = function domReady(cb) {
      var timer;

      var check = function check() {
        if (performance.timing.domInteractive) {
          clearTimeout(timer);
          cb();
        } else {
          timer = setTimeout(check, 100);
        }
      };

      window.addEventListener('DOMContentLoaded', check, false);
    };

    var perf = {
      init: function init(cb) {
        // dom解析完成后，还没有触发onload
        domReady(function () {
          var perfData = performance.timing;
          var data = processData(perfData);
          data.type = 'domReady';
          cb(data);
        });
        load(function () {
          var perfData = performance.timing;
          var data = processData(perfData);
          data.type = 'load';
          cb(data);
        });
      }
    };

    var processData$1 = function processData(d) {
      var data = {
        name: d.name,
        initiatorType: d.initiatorType,
        duration: d.duration
      };
      return data;
    };

    var resource = {
      init: function init(cb) {
        if (window.PerformanceObserver) {
          var observer = new PerformanceObserver(function (list) {
            var data = list.getEntries()[0];
            cb(processData$1(data));
          });
          observer.observe({
            entryTypes: ['resource']
          });
        } else {
          window.addEventListener('load', function () {
            // 获取资源相关信息
            var resourceData = performance.getEntriesByType('resource');
            var data = resourceData.map(function (item) {
              return processData$1(item);
            });
            cb(data);
          }, false);
        }
      }
    };

    var xhr = {
      init: function init(cb) {
        // 重写window.XMLHttpRequest方法
        var xhr = window.XMLHttpRequest;
        var oldOpen = xhr.prototype.open;

        xhr.prototype.open = function (method, url, async, username, password) {
          this.info = {
            method: method,
            url: url,
            async: async,
            username: username,
            password: password
          };
          return oldOpen.apply(this, arguments);
        };

        var oldSend = xhr.prototype.send;

        xhr.prototype.send = function (value) {
          var _this = this;

          var start = Date.now();

          var fn = function fn(type) {
            return function () {
              _this.info.time = Date.now() - start;
              _this.info.requestSize = value ? value.length : 0;
              _this.info.responseSize = _this.responseText.length;
              _this.info.type = type;
              cb(_this.info);
            };
          };

          this.addEventListener('load', fn('load'), false);
          this.addEventListener('error', fn('error'), false);
          this.addEventListener('abort', fn('abort'), false);
          return oldSend.apply(this, arguments);
        };
      } // window.fetch 重写

    };

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArrayLimit(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }

    var err = {
      init: function init(cb) {
        // window.addEventListender('error', fn, true)
        // promise失败不能通过onerror捕获
        window.onerror = function (message, source, lineno, colno, error) {
          var info = {
            message: error.message,
            name: error.name
          };
          var stack = error.stack;
          var matchUrl = stack.match(/http:\/\/[^\n]*/)[0];
          info.filename = matchUrl.match(/http:\/\/(?:\S*).js/)[0];

          var _matchUrl$match = matchUrl.match(/:(\d+):(\d+)/),
              _matchUrl$match2 = _slicedToArray(_matchUrl$match, 3),
              row = _matchUrl$match2[1],
              col = _matchUrl$match2[2];

          info.row = row;
          info.col = col; // 代码压缩 sourcemap 定位

          cb(info);
        };
      }
    };

    /* 监控页面性能
    算时间差 利用浏览器api performance
    performance.timing
    */

    perf.init(function (data) {
      // 获取页面性能相关数据
      console.log("perf", data); // 通过image传到服务端,空图片
      // new Image().src = "/p.gif?" + formatQuery(data)
    }); // 监控页面静态资源加载情况

    resource.init(function (data) {
      console.log("resource", data);
    }); // ajax 监控ajax发送情况

    xhr.init(function (data) {
      console.log("xhr", data);
    }); // 页面错误捕获
    // try catch
    // 代码出错了

    err.init(function (data) {
      console.log("err", data);
    }); // 监控用户行为
    // Xpath

})));
