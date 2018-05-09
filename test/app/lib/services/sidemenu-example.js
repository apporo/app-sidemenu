'use strict';

var events = require('events');
var util = require('util');
var path = require('path');
var Devebot = require('devebot');
var Promise = Devebot.require('bluebird');
var lodash = Devebot.require('lodash');
var debugx = Devebot.require('pinbug')('app-sidemenu:example');

var Service = function(params) {
  debugx.enabled && debugx(' + constructor begin ...');

  params = params || {};

  var self = this;

  var logger = params.loggingFactory.getLogger();
  var pluginCfg = params.sandboxConfig;
  var contextPath = pluginCfg.contextPath || '/sidemenu';
  var express = params.webweaverService.express;

  var router = new express();
  router.set('views', __dirname + '/../../views');
  router.set('view engine', 'ejs');
  router.route('/index').get(function(req, res, next) {
    res.render('index', {});
  });

  params.webinjectService.inject([
    params.webweaverService.getDefaultRedirectLayer(),
    {
      name: 'app-sidemenu-example-public',
      path: contextPath,
      middleware: express.static(path.join(__dirname, '../../public'))
    },
    {
      name: 'app-sidemenu-example-router',
      path: contextPath,
      middleware: router
    }
  ]);

  debugx.enabled && debugx(' - constructor end!');
};

Service.referenceList = ['webinjectService', 'webweaverService'];

module.exports = Service;
