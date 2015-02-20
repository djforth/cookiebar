(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lib/cookiebar.coffee":[function(require,module,exports){
'use strict';
var Cookie, cookiebar;

require('angular');

Cookie = require('cookie_mgmt');

cookiebar = angular.module('$cookiebar', []).service('cookieBarMgmt', function() {
  var cookie;
  cookie = new Cookie();
  return {
    cookie: cookie,
    getPermission: function() {
      return this.cookie.getCookie("permission") === "granted";
    },
    setPermission: function() {
      return this.cookie.createCookie("permission", "granted", 365);
    }
  };
}).directive("cookiebar", function() {
  return {
    restrict: 'A',
    replace: true,
    transclude: true,
    scope: {},
    template: '<div class="cookie-prompt" id="cookie-msg" ng-show="showBar"><div id="cookie-message" class="wrap"><div class="panel-content"><span ng-transclude></span><a class="close" ng-click="setPermission()" title="Close this message" href="javascript:">X</a></div></div></div>',
    controller: function($scope, cookieBarMgmt) {
      $scope.showBar = cookieBarMgmt.getPermission() ? false : true;
      return $scope.setPermission = function() {
        cookieBarMgmt.setPermission();
        return $scope.showBar = false;
      };
    }
  };
});

module.exports = cookiebar;



},{"angular":"angular","cookie_mgmt":"/Users/djforth/websites/modules/cookiebar/node_modules/cookie_mgmt/index.js"}],"/Users/djforth/websites/modules/cookiebar/node_modules/cookie_mgmt/index.js":[function(require,module,exports){
var ManageCookies;

ManageCookies = (function() {
  function ManageCookies() {}

  ManageCookies.prototype.createCookie = function(name, value, days) {
    if (days == null) {
      days = 0;
    }
    if (name || value) {
      return document.cookie = name + "=" + value + this.setExpires(days) + "; path=/";
    }
  };

  ManageCookies.prototype.deleteCookie = function(name) {
    if (name) {
      return document.cookie = name + "=nil;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
    }
  };

  ManageCookies.prototype.setExpires = function(days) {
    var date, expires;
    if (days) {
      date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    return expires;
  };

  ManageCookies.prototype.getCookie = function(c_name) {
    var c_end, c_start;
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + "=");
      if (c_start !== -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(";", c_start);
        if (c_end === -1) {
          c_end = document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return void 0;
  };

  return ManageCookies;

})();

module.exports = ManageCookies;
rts = ManageCookies;

},{}]},{},["./lib/cookiebar.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGpmb3J0aC93ZWJzaXRlcy9tb2R1bGVzL2Nvb2tpZWJhci9saWIvY29va2llYmFyLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9jb29raWVfbWdtdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQUEsQ0FBQTtBQUFBLElBQUEsaUJBQUE7O0FBQUEsT0FFQSxDQUFRLFNBQVIsQ0FGQSxDQUFBOztBQUFBLE1BR0EsR0FBUyxPQUFBLENBQVEsYUFBUixDQUhULENBQUE7O0FBQUEsU0FNQSxHQUFhLE9BQU8sQ0FBQyxNQUFSLENBQWUsWUFBZixFQUE2QixFQUE3QixDQUNYLENBQUMsT0FEVSxDQUNGLGVBREUsRUFDZSxTQUFBLEdBQUE7QUFDeEIsTUFBQSxNQUFBO0FBQUEsRUFBQSxNQUFBLEdBQWEsSUFBQSxNQUFBLENBQUEsQ0FBYixDQUFBO0FBQ0EsU0FBTztBQUFBLElBQ0wsTUFBQSxFQUFPLE1BREY7QUFBQSxJQUVMLGFBQUEsRUFBYyxTQUFBLEdBQUE7QUFDWixhQUFPLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBUixDQUFrQixZQUFsQixDQUFBLEtBQW1DLFNBQTFDLENBRFk7SUFBQSxDQUZUO0FBQUEsSUFJTCxhQUFBLEVBQWMsU0FBQSxHQUFBO2FBQ1osSUFBQyxDQUFBLE1BQU0sQ0FBQyxZQUFSLENBQXFCLFlBQXJCLEVBQW1DLFNBQW5DLEVBQThDLEdBQTlDLEVBRFk7SUFBQSxDQUpUO0dBQVAsQ0FGd0I7QUFBQSxDQURmLENBV1gsQ0FBQyxTQVhVLENBV0EsV0FYQSxFQVdhLFNBQUEsR0FBQTtBQUN0QixTQUFPO0FBQUEsSUFDTCxRQUFBLEVBQVUsR0FETDtBQUFBLElBRUwsT0FBQSxFQUFTLElBRko7QUFBQSxJQUdMLFVBQUEsRUFBWSxJQUhQO0FBQUEsSUFJTCxLQUFBLEVBQU8sRUFKRjtBQUFBLElBS0wsUUFBQSxFQUFVLDRRQUxMO0FBQUEsSUFNTCxVQUFBLEVBQVcsU0FBQyxNQUFELEVBQVMsYUFBVCxHQUFBO0FBQ1QsTUFBQSxNQUFNLENBQUMsT0FBUCxHQUFvQixhQUFhLENBQUMsYUFBZCxDQUFBLENBQUgsR0FBc0MsS0FBdEMsR0FBaUQsSUFBbEUsQ0FBQTthQUVBLE1BQU0sQ0FBQyxhQUFQLEdBQXVCLFNBQUEsR0FBQTtBQUNyQixRQUFBLGFBQWEsQ0FBQyxhQUFkLENBQUEsQ0FBQSxDQUFBO2VBQ0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsTUFGSTtNQUFBLEVBSGQ7SUFBQSxDQU5OO0dBQVAsQ0FEc0I7QUFBQSxDQVhiLENBTmIsQ0FBQTs7QUFBQSxNQWtDTSxDQUFDLE9BQVAsR0FBaUIsU0FsQ2pCLENBQUE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXG5cbnJlcXVpcmUoJ2FuZ3VsYXInKVxuQ29va2llID0gcmVxdWlyZSgnY29va2llX21nbXQnKVxuIyBfICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKVxuXG5jb29raWViYXIgPSAgYW5ndWxhci5tb2R1bGUoJyRjb29raWViYXInLCBbXSlcbiAgLnNlcnZpY2UoJ2Nvb2tpZUJhck1nbXQnLCAoKS0+XG4gICAgY29va2llID0gbmV3IENvb2tpZSgpXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvb2tpZTpjb29raWVcbiAgICAgIGdldFBlcm1pc3Npb246KCktPlxuICAgICAgICByZXR1cm4gQGNvb2tpZS5nZXRDb29raWUoXCJwZXJtaXNzaW9uXCIpID09IFwiZ3JhbnRlZFwiXG4gICAgICBzZXRQZXJtaXNzaW9uOigpLT5cbiAgICAgICAgQGNvb2tpZS5jcmVhdGVDb29raWUoXCJwZXJtaXNzaW9uXCIsIFwiZ3JhbnRlZFwiLCAzNjUpXG4gICAgfVxuICApXG4gIC5kaXJlY3RpdmUoXCJjb29raWViYXJcIiwgKCktPlxuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICBzY29wZToge30sXG4gICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJjb29raWUtcHJvbXB0XCIgaWQ9XCJjb29raWUtbXNnXCIgbmctc2hvdz1cInNob3dCYXJcIj48ZGl2IGlkPVwiY29va2llLW1lc3NhZ2VcIiBjbGFzcz1cIndyYXBcIj48ZGl2IGNsYXNzPVwicGFuZWwtY29udGVudFwiPjxzcGFuIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPjxhIGNsYXNzPVwiY2xvc2VcIiBuZy1jbGljaz1cInNldFBlcm1pc3Npb24oKVwiIHRpdGxlPVwiQ2xvc2UgdGhpcyBtZXNzYWdlXCIgaHJlZj1cImphdmFzY3JpcHQ6XCI+WDwvYT48L2Rpdj48L2Rpdj48L2Rpdj4nLFxuICAgICAgY29udHJvbGxlcjooJHNjb3BlLCBjb29raWVCYXJNZ210KS0+XG4gICAgICAgICRzY29wZS5zaG93QmFyID0gaWYgY29va2llQmFyTWdtdC5nZXRQZXJtaXNzaW9uKCkgdGhlbiBmYWxzZSBlbHNlIHRydWVcblxuICAgICAgICAkc2NvcGUuc2V0UGVybWlzc2lvbiA9ICgpLT5cbiAgICAgICAgICBjb29raWVCYXJNZ210LnNldFBlcm1pc3Npb24oKVxuICAgICAgICAgICRzY29wZS5zaG93QmFyID0gZmFsc2U7XG4gICAgfVxuICApXG5cblxubW9kdWxlLmV4cG9ydHMgPSBjb29raWViYXIiLCJ2YXIgTWFuYWdlQ29va2llcztcblxuTWFuYWdlQ29va2llcyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gTWFuYWdlQ29va2llcygpIHt9XG5cbiAgTWFuYWdlQ29va2llcy5wcm90b3R5cGUuY3JlYXRlQ29va2llID0gZnVuY3Rpb24obmFtZSwgdmFsdWUsIGRheXMpIHtcbiAgICBpZiAoZGF5cyA9PSBudWxsKSB7XG4gICAgICBkYXlzID0gMDtcbiAgICB9XG4gICAgaWYgKG5hbWUgfHwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIHRoaXMuc2V0RXhwaXJlcyhkYXlzKSArIFwiOyBwYXRoPS9cIjtcbiAgICB9XG4gIH07XG5cbiAgTWFuYWdlQ29va2llcy5wcm90b3R5cGUuZGVsZXRlQ29va2llID0gZnVuY3Rpb24obmFtZSkge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPW5pbDtleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDEgR01UOyBwYXRoPS9cIjtcbiAgICB9XG4gIH07XG5cbiAgTWFuYWdlQ29va2llcy5wcm90b3R5cGUuc2V0RXhwaXJlcyA9IGZ1bmN0aW9uKGRheXMpIHtcbiAgICB2YXIgZGF0ZSwgZXhwaXJlcztcbiAgICBpZiAoZGF5cykge1xuICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcbiAgICAgIGV4cGlyZXMgPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwaXJlcyA9IFwiXCI7XG4gICAgfVxuICAgIHJldHVybiBleHBpcmVzO1xuICB9O1xuXG4gIE1hbmFnZUNvb2tpZXMucHJvdG90eXBlLmdldENvb2tpZSA9IGZ1bmN0aW9uKGNfbmFtZSkge1xuICAgIHZhciBjX2VuZCwgY19zdGFydDtcbiAgICBpZiAoZG9jdW1lbnQuY29va2llLmxlbmd0aCA+IDApIHtcbiAgICAgIGNfc3RhcnQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihjX25hbWUgKyBcIj1cIik7XG4gICAgICBpZiAoY19zdGFydCAhPT0gLTEpIHtcbiAgICAgICAgY19zdGFydCA9IGNfc3RhcnQgKyBjX25hbWUubGVuZ3RoICsgMTtcbiAgICAgICAgY19lbmQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihcIjtcIiwgY19zdGFydCk7XG4gICAgICAgIGlmIChjX2VuZCA9PT0gLTEpIHtcbiAgICAgICAgICBjX2VuZCA9IGRvY3VtZW50LmNvb2tpZS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZXNjYXBlKGRvY3VtZW50LmNvb2tpZS5zdWJzdHJpbmcoY19zdGFydCwgY19lbmQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfTtcblxuICByZXR1cm4gTWFuYWdlQ29va2llcztcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYW5hZ2VDb29raWVzO1xucnRzID0gTWFuYWdlQ29va2llcztcbiJdfQ==
