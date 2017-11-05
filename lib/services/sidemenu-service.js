'use strict';

var events = require('events');
var util = require('util');
var path = require('path');

var Devebot = require('devebot');
var Promise = Devebot.require('bluebird');
var lodash = Devebot.require('lodash');
var debugx = Devebot.require('debug')('appSidemenu:trailer');

var Service = function(params) {
  debugx.enabled && debugx(', constructor begin ...');

  params = params || {};

  var self = this;
  var logger = params.loggingFactory.getLogger();
  var pluginCfg = params.sandboxConfig;
  var contextPath = pluginCfg.contextPath || '/sidemenu';
  var express = params.webweaverService.express;

  var menuData = pluginCfg.menuData || [];
  console.log(menuData);

  params.webinjectService.enqueue({
    interceptUrls: ['/sidemenu-bdd/index', '/sidemenu-bdd/index1', '/sidemenu-bdd/index2'],
    headSuffixTags: {
      sidemenuStyle: {
        type: 'css',
        text: [
          util.format("<link href='%s/assets/jquery.multilevelpushmenu/jquery.multilevelpushmenu.css' rel='stylesheet' type='text/css'/>", contextPath)
        ]
      },
      fontAwesome: {
        type: 'css',
        text: [
          util.format("<link href='%s/assets/font-awesome/4.5.0/css/font-awesome.min.css' rel='stylesheet'/>", contextPath)
        ]
      },
      fontAwesomeFamily: {
        type: 'css',
        text: [
          util.format("<link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,300italic,700&subset=latin,cyrillic-ext,latin-ext,cyrillic' rel='stylesheet' type='text/css'>")
        ]
      }
    },
    bodySuffixTags: {
      navbarTop: {
        type: 'html',
        text: [
          '<div id="menu">',
        ]
      },
      navbarBottom: {
        type: 'html',
        text: [
          '</div>'
        ]
      },
      jquery: {
        type: 'script',
        text: [
          '<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>'
        ]
      },
      modernizr: {
        type: 'script',
        text: [
          '<script type="text/javascript" src="//oss.maxcdn.com/libs/modernizr/2.6.2/modernizr.min.js"></script>'
        ]
      },
      multilevelpushmenu: {
        type: 'script',
        text: [
          util.format("<script src='%s/assets/jquery.multilevelpushmenu/jquery.multilevelpushmenu.min.js'></script>", contextPath)
        ]
      },
      sidemenuData: {
        type: 'script',
        text: [
          util.format("<script>var menuData = %s;</script>", JSON.stringify(menuData, null, 2))
        ]
      },
      sidemenuLoader: {
        type: 'script',
        text: [
          util.format("<script src='%s/assets/sidemenu/js/loader.js'></script>", contextPath)
        ]
      }
    }
  });

  self.getStaticFilesLayer = function() {
    return {
      name: 'app-sidemenu-public',
      path: contextPath,
      middleware: express.static(path.join(__dirname, '../../public'))
    };
  }

  if (pluginCfg.autowired !== false) {
    params.webinjectService.inject([
      self.getStaticFilesLayer()
    ], pluginCfg.priority);
  }

  debugx.enabled && debugx(' - constructor end!');
};

Service.argumentSchema = {
  "id": "sidemenuService",
  "type": "object",
  "properties": {
    "webinjectService": {
      "type": "object"
    },
    "webweaverService": {
      "type": "object"
    }
  }
};

module.exports = Service;
