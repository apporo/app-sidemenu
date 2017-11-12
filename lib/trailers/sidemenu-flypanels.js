'use strict';

var Devebot = require('devebot');
var lodash = Devebot.require('lodash');
var debugx = Devebot.require('debug')('appSidemenu:trailers:flypanels');
var util = require('util');

function getChildMenu(items) {
  if (lodash.isEmpty(items)) return [];
  return lodash.map(items, function(item) {
    var subItemLen = item.items && item.items.length || 0;
    return util.format('<li class="%s"><div><a class="link">%s</a>%s</div><ul>%s</ul></li>',
                (subItemLen > 0 ? 'haschildren' : ''),
                item.name,
                (subItemLen > 0 ? util.format('<a class="expand">%s<i class="fa icon"></i></a>', subItemLen) : ''),
                getChildMenu(item.items))
  });
}

module.exports = function(params) {
  params = params || {};
  var contextPath = params.contextPath;
  var interceptUrls = params.interceptUrls;

  var menuListFlypanels = [];
  if(!lodash.isEmpty(params.menuData)) {
    menuListFlypanels = getChildMenu(params.menuData);
    debugx.enabled && debugx(' - dataFlypanels: %s', JSON.stringify(menuListFlypanels));
  }

  return {
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
          util.format('<link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" rel="stylesheet">')
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
}