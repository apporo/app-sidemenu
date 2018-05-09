'use strict';

var Devebot = require('devebot');
var lodash = Devebot.require('lodash');
var debugx = Devebot.require('pinbug')('app-sidemenu:trailers:flypanels');
var util = require('util');

function renderMenuItem(item, array, padding) {
  array = array || [];
  var subItemLen = item.items && item.items[0].items.length || 0;
  array.push(padding + '<li class="' + (subItemLen > 0 ? 'haschildren' : '') + '">');
  array.push(padding + '  <div>');
  var href = '';
  if (!lodash.isEmpty(item.link)) href = ' href="' + item.link + '"'; 
  array.push(padding + '    <a class="link"' + href + '>' + item.name + '</a>');
  if (subItemLen > 0) {
    array.push(padding + '    <a class="expand">' + subItemLen + '<i class="fa icon"></i></a>');
  }
  array.push(padding + '  </div>');
  if(subItemLen > 0) {
    traverseMenuItem(item.items[0].items, array, padding + '  ');
  }
  array.push(padding + '</li>');
}

function traverseMenuItem(items, array, padding) {
  array = array || [];
  if (lodash.isEmpty(items)) return;
  array.push(padding + '<ul>');
  lodash.map(items, function(item) {
    renderMenuItem(item, array, padding + '  ');
  });
  array.push(padding + '</ul>');
}

module.exports = function(params) {
  params = params || {};
  var contextPath = params.contextPath;
  var interceptUrls = params.interceptUrls;

  var padding = '       ';
  var menuListFlypanels = [];
  if(!lodash.isEmpty(params.menuData[0].items)) {
    traverseMenuItem(params.menuData[0].items, menuListFlypanels, padding + '  ');
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
        ]
      },
      navbarBody: {
        type: 'html',
        text: menuListFlypanels
      },
      navbarBottom: {
        type: 'html',
        text: [
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