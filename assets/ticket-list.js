window.WDS_HelpScout_Harvest_Integration = window.WDS_HelpScout_Harvest_Integration || {};

(function (window, document, app, undefined) {
  app.cache = function() {
    app.elems = {};
    
    app.incognito = false;
    app.url = false;

    app.elems.js_wrap = document.getElementById( 'js-wrap' );
  };

  app.init = function init() {
    app.cache();

    // add harvest js
    app.add_harvest_js();

    document.body.addEventListener( 'harvest-event:ready', function () {
      console.log( 'harvest is ready' );
      // fire after table is built
      setTimeout( app.find_tickets_table, 500 );
    });

  };

  app.find_tickets_table = function() {
    // bail early if no js wrap element
    if ( ! app.elems.js_wrap ) {
      return;
    }

    app.elems.tickets = app.elems.js_wrap.querySelectorAll( '#tblTickets tbody tr' );

    if ( ! app.elems.tickets ) {
      return;
    }

    // add harvest button to each element
    for ( var i = 0, len = app.elems.tickets.length; i < len; ++i ) {
      var id = app.elems.tickets[i].querySelector( 'td.convoNum a' );
      var name = app.elems.tickets[i].querySelector( 'td.subj p' );

      var data = {
        'account' : {},
        'group' : {
          'id' : 'hs',
          'name' : 'Support: Maintainn'
        },
        'item' : {
          'id' : 'hs_' + id,
          'name' : id.innerText + ' - ' + name.innerText
        },
      };

      app.build_timer( app.elems.tickets[i], data );

      app.trigger_harvest_styling();
    }
  };

  app.trigger_harvest_styling = function() {
    var evt = new CustomEvent("harvest-event:timers:chrome:add");
    return document.querySelector("#harvest-messaging").dispatchEvent(evt);
  };

  app.add_timers = function() {
    var i, item, items, len, results;
    
    if ( ! this.platformLoaded ) {
      return;
    }

    items = document.querySelectorAll( this.itemSelector );
    results = [];
    
    for ( i = 0, len = items.length; i < len; i++ ) {
      item = items[i];

      if ( ! item.querySelector( '.harvest-timer' ) ) {
        results.push( this.addTimer( item ) );
      }
    }
    
    return results;
  };

  app.build_timer = function( item, data ) {
    var timer;
    timer = document.createElement( 'div' );
    timer.className = 'harvest-timer';
    timer.style.marginRight = '4px';
    timer.setAttribute( 'id', 'harvest-basecamp-timer-' + data.id );
    timer.setAttribute( 'data-account', JSON.stringify( data.account ) );
    timer.setAttribute( 'data-group', JSON.stringify( data.group ) );
    timer.setAttribute( 'data-item', JSON.stringify( data.item ) );

    var checkbox = item.querySelector( 'td.cbCol' );
    var anchor_node = item.querySelector( 'a' );
    
    return anchor_node.parentNode.insertBefore( timer, anchor_node );
  };

  app.add_harvest_js = function() {
    var configScript, ph, platformConfig, platformScript;

    platformConfig = {
      applicationName : "HelpScout",
      permalink : "https://secure.helpscout.net/conversation/%ITEM_ID%"
    };

    configScript = document.createElement( 'script' );
    configScript.innerHTML = 'window._harvestPlatformConfig = ' + ( JSON.stringify( platformConfig ) ) + ';';
    platformScript = document.createElement( 'script');
    platformScript.src = 'https://platform.harvestapp.com/assets/platform.js';
    platformScript.async = true;
    ph = document.getElementsByTagName( 'script' )[0];
    ph.parentNode.insertBefore( configScript, ph );
    ph.parentNode.insertBefore( platformScript, ph );
    
    return document.body.addEventListener( 'harvest-event:ready', (function( _this ) {
      return function() {
        app.platformLoaded = true;
        return app.add_timers();
      };
    })( this ));
  };

  document.addEventListener( 'DOMContentLoaded', app.init );

  return app;

})( window, document, window.WDS_HelpScout_Harvest_Integration );