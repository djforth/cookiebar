
require('angular')
require('angular-mocks')


cookieBar = require('../lib/cookiebar.coffee')
directives = require('./directives_tests.coffee')

# /app/assets/javascripts/modules/header/cookiebar.coffee

Cookie = require('cookie_mgmt')

describe 'Cookiebar', ->
  cb_mgmt = cookie = null
  beforeEach ->
    angular.mock.module('$cookiebar')

  describe 'cookieBarMgmt Service', ->
    cb_mgmt = null

    beforeEach ->
      cookie = new Cookie()
      angular.mock.inject((cookieBarMgmt)->
        cb_mgmt = cookieBarMgmt
      )

    it 'should exist', ->
      expect(cb_mgmt).toBeDefined()

    describe 'getPermission', ->

      it 'should return true if permission granted', ->
        # cookie.createCookie("permission", "granted", 1)
        spyOn(cb_mgmt.cookie, 'getCookie').and.returnValue('granted')
        expect(cb_mgmt.getPermission()).toBeTruthy()
        expect(cb_mgmt.cookie.getCookie).toHaveBeenCalled()

      it 'should return false if not permission granted', ->
        spyOn(cb_mgmt.cookie, 'getCookie').and.returnValue('')
        expect(cb_mgmt.getPermission()).toBeFalsy()
        expect(cb_mgmt.cookie.getCookie).toHaveBeenCalled()


    describe 'setPermission', ->
      it 'should set the permission cookie', ->
        spyOn(cb_mgmt.cookie, 'createCookie')
        cb_mgmt.setPermission()
        expect(cb_mgmt.cookie.createCookie).toHaveBeenCalled()
        expect(cb_mgmt.cookie.createCookie).toHaveBeenCalledWith("permission", 'granted', 365)


  describe 'cookie bar directives', ->
    element = scope = isoScope = null

    afterEach ->
      angular.element(element).remove();

    describe 'general', ->

      beforeEach ->
        angular.mock.inject(($rootScope, cookieBarMgmt)->
          scope = $rootScope.$new()
          cb_mgmt = cookieBarMgmt
          spyOn(cb_mgmt, 'getPermission').and.returnValue(false)
          spyOn(cb_mgmt, 'setPermission')
          element = directives.createDirectiveHTML('<div cookiebar><h1>This is a test</h1></div>', scope)
          isoScope = element.isolateScope();
        )

      it 'should exist', ->
        expect(element).toBeDefined()

      it 'sets showBar to false if setPermission called', ->
        isoScope.setPermission()
        expect(scope.showBar).toBeFalsy()
        expect(cb_mgmt.setPermission).toHaveBeenCalled()

    describe 'if permission is set', ->

      beforeEach ->
        angular.mock.inject(($rootScope, cookieBarMgmt)->
          scope = $rootScope.$new()
          cb_mgmt = cookieBarMgmt
          spyOn(cb_mgmt, 'getPermission').and.returnValue(true)
          spyOn(cb_mgmt, 'setPermission')
          element = directives.createDirectiveHTML('<div cookiebar><h1>This is a test</h1></div>', scope)
          isoScope = element.isolateScope();
        )

      it 'if cookie set then showbar false', ->
        expect(scope.showBar).toBeFalsy()


      it 'should be hidden', ->
       expect(element.hasClass('ng-hide')).toBeTruthy()

    describe 'if permission is set', ->

      beforeEach ->
        angular.mock.inject(($rootScope, cookieBarMgmt)->
          scope = $rootScope.$new()
          cb_mgmt = cookieBarMgmt
          spyOn(cb_mgmt, 'getPermission').and.returnValue(false)
          spyOn(cb_mgmt, 'setPermission')
          element = directives.createDirectiveHTML('<div cookiebar><h1>This is a test</h1></div>', scope)
          isoScope = element.isolateScope();
        )

      it 'if cookie set then showbar false', ->
        expect(scope.showBar).toBeFalsy()


      it 'should be hidden', ->
       expect(element.hasClass('ng-hide')).toBeFalsy()






















