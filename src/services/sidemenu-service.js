'use strict';

var Devebot = require('devebot');
var Promise = Devebot.require('bluebird');
var chores = Devebot.require('chores');
var loader = Devebot.require('loader');
var lodash = Devebot.require('lodash');
var path = require('path');

var Service = function(params) {
  params = params || {};

  var self = this;
  let LX = params.loggingFactory.getLogger();
  let LT = params.loggingFactory.getTracer();
  let packageName = params.packageName || 'app-sidemenu';
  let blockRef = chores.getBlockRef(__filename, packageName);

  LX.has('silly') && LX.log('silly', LT.toMessage({
    tags: [ blockRef, 'constructor-begin' ],
    text: ' + constructor begin ...'
  }));

  let webinjectService = params['webinjectService'];
  let webweaverService = params['webweaverService'];

  var pluginCfg = params.sandboxConfig;
  var contextPath = pluginCfg.contextPath || '/sidemenu';
  var express = webweaverService.express;

  var interceptUrls = pluginCfg.interceptUrls || [contextPath + '/(.*).html'];
  var menuData = pluginCfg.menuData || [];

  var menuType = pluginCfg.menuType;
  if (['pushmenu', 'flypanels'].indexOf(menuType) < 0) {
    menuType = 'pushmenu';
  }

  var menuTemplate = {};
  menuTemplate[menuType] = loader(path.join(__dirname, '../trailers', 'sidemenu-' + menuType))({
    contextPath: contextPath,
    interceptUrls: interceptUrls,
    menuData: menuData
  });

  webinjectService.enqueue(menuTemplate[menuType]);

  self.getStaticFilesLayer = function() {
    return {
      name: 'app-sidemenu-public',
      path: contextPath,
      middleware: express.static(path.join(__dirname, '../../public'))
    };
  }

  var router = new express();
  router.set('views', __dirname + '/../../views');
  router.set('view engine', 'ejs');
  router.route('/assets/sidemenu/js/loader.js').get(function(req, res, next) {
    res.render('loader_js', {
      menuType: menuType
    });
  });
  router.route('/assets/sidemenu/js/menudata.js').get(function(req, res, next) {
    res.render('menudata_js', {
      menuData: menuData
    });
  });

  self.getJavascriptLayer = function() {
    return {
      name: 'app-sidemenu-router',
      path: contextPath,
      middleware: router
    };
  }

  if (pluginCfg.autowired !== false) {
    webinjectService.inject([
      self.getJavascriptLayer(),
      self.getStaticFilesLayer()
    ], pluginCfg.priority);
  }

  LX.has('silly') && LX.log('silly', LT.toMessage({
    tags: [ blockRef, 'constructor-end' ],
    text: ' - constructor end!'
  }));
};

Service.referenceList = [ 'webinjectService', 'webweaverService' ];

module.exports = Service;
