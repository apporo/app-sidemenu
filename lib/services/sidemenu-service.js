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

  var interceptUrls = pluginCfg.interceptUrls || [contextPath + '/(.*).html'];
  var menuData = pluginCfg.menuData || [];
  var menuTemplate = {};
  var dataFlypanelsCfg  = pluginCfg.menuDataFlypanels || [];
  var menuListFlypanels = []

  if(!lodash.isEmpty(dataFlypanelsCfg)) {
    menuListFlypanels = getChildMenu(dataFlypanelsCfg);
    debugx.enabled && debugx(' - dataFlypanels: %s', JSON.stringify(menuListFlypanels));
  }

  function getChildMenu(items) {
    var dataFlypanels = lodash.map(items, function(item){
      return util.format('<li class="%s"><div><a class="link">%s</a>%s</div><ul>%s</ul></li>',
                  (item.items.length > 0 ? 'haschildren' : ''),
                  lodash.get(item, 'name'),
                  (item.items.length > 0 ? util.format('<a class="expand">%s<i class="fa icon"></i></a>', item.items.length) : ''),
                  getChildMenu(lodash.get(item, 'items')))
                  
    })
    return dataFlypanels;
  }

  menuTemplate.pushmenu = {
    interceptUrls: interceptUrls,
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
          util.format("<script src='%s/assets/sidemenu/js/menudata.js'></script>", contextPath)
        ]
      },
      sidemenuLoader: {
        type: 'script',
        text: [
          util.format("<script src='%s/assets/sidemenu/js/loader.js'></script>", contextPath)
        ]
      }
    }
  }

  menuTemplate.flypanels = {
    interceptUrls: interceptUrls,
    headSuffixTags: {
      sidemenuStyle: {
        type: 'css',
        text: [
          util.format("<link href='%s/assets/jquery.flypanels/flyPanels.css' rel='stylesheet' type='text/css'/>", contextPath)
        ]
      },
      bootstrap: {
        type: 'css',
        text: [
          util.format('<link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" rel="stylesheet">', contextPath)
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
          '<div class="flypanels-container preload">',
          '   <div class="offcanvas flypanels-left">',
          '     <div class="panelcontent" data-panel="treemenu">',
          '       <nav class="flypanels-treemenu" role="navigation">',
          '         <ul>',
        ]
      },
      navbarBody: {
        type: 'html',
        text: menuListFlypanels
      },
      navbarBottom: {
        type: 'html',
        text: [
          '         </ul>',
          '       </nav>',
          '     </div>',
          '   </div>',
          '   <div class="flypanels-main">',
          '     <div class="flypanels-topbar">',
          '       <a class="flypanels-button-left icon-menu" data-panel="treemenu" href="#"><i class="fa fa-bars"></i></a>',
          '     </div>',
          '   </div>',
          ' </div>',
        ]
      },
      jquery: {
        type: 'script',
        text: [
          '<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>'
        ]
      },
      flypanels: {
        type: 'script',
        text: [
          util.format("<script src='%s/assets/jquery.flypanels/jquery.flypanels.js'></script>", contextPath)
        ]
      },
      kitUtils: {
        type: 'script',
        text: [
          util.format("<script src='%s/assets/jquery.flypanels/kitUtils.js'></script>", contextPath)
        ]
      },
      sidemenuLoader: {
        type: 'script',
        text: [
          util.format("<script src='%s/assets/sidemenu/js/loader.js'></script>", contextPath)
        ]
      }
    }
  }

  var menuType = pluginCfg.menuType;

  if (['pushmenu', 'flypanels'].indexOf(menuType) < 0) {
    menuType = 'pushmenu';
  }

  params.webinjectService.enqueue(menuTemplate[menuType]);

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
    params.webinjectService.inject([
      self.getJavascriptLayer(),
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
