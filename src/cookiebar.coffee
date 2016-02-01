'use strict'

require('angular')
Cookie = require('@djforth/cookie_mgmt')
# _      = require('lodash')

cookiebar =  angular.module('$cookiebar', [])
  .service('cookieBarMgmt', ()->
    cookie = new Cookie()
    return {
      cookie:cookie
      getPermission:()->
        return @cookie.getCookie("permission") == "granted"
      setPermission:()->
        @cookie.createCookie("permission", "granted", 365)
    }
  )
  .directive("cookiebar", ()->
    return {
      restrict: 'A',
      replace: true,
      transclude: true,
      scope: {},
      template: '<div class="cookie-prompt" id="cookie-msg" ng-show="showBar"><div id="cookie-message" class="wrap"><div class="panel-content"><span ng-transclude></span><a class="close" ng-click="setPermission()" title="Close this message" href="javascript:">X</a></div></div></div>',
      controller:($scope, cookieBarMgmt)->
        $scope.showBar = if cookieBarMgmt.getPermission() then false else true

        $scope.setPermission = ()->
          cookieBarMgmt.setPermission()
          $scope.showBar = false;
    }
  )


module.exports = cookiebar