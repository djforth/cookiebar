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
