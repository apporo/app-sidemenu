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

  var navbarList = [
    ' <li>',
    '     <a href="#"><i class="fa fa-phone"></i>Mobile Phones</a>',
    '     <h2><i class="fa fa-phone"></i>Mobile Phones</h2>',
    '     <ul>',
    '         <li>',
    '             <a href="#">Super Smart Phone</a>',
    '         </li>',
    '         <li>',
    '             <a href="#">Thin Magic Mobile</a>',
    '         </li>',
    '         <li>',
    '             <a href="#">Performance Crusher</a>',
    '         </li>',
    '         <li>',
    '             <a href="#">Futuristic Experience</a>',
    '         </li>',
    '     </ul>',
    ' </li>',
    ' <li>',
    '     <a href="#"><i class="fa fa-desktop"></i>Televisions</a>',
    '     <h2><i class="fa fa-desktop"></i>Televisions</h2>',
    '     <ul>',
    '         <li>',
    '             <a href="#">Flat Super Screen</a>',
    '         </li>',
    '         <li>',
    '             <a href="#">Gigantic LED</a>',
    '         </li>',
    '         <li>',
    '             <a href="#">Power Eater</a>',
    '         </li>',
    '         <li>',
    '             <a href="#">3D Experience</a>',
    '         </li>',
    '         <li>',
    '             <a href="#">Classic Comfort</a>',
    '         </li>',
    '     </ul>',
    ' </li>'
  ];

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
          '  <nav>',
          '    <h2><i class="fa fa-reorder"></i>All Categories</h2>',
          '    <ul>'
        ]
      },
      navbarMenu: {
        type: 'html',
        text: navbarList.join('\n')
      },
      navbarBottom: {
        type: 'html',
        text: [
          '    </ul>',
          '  </nav>',
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
