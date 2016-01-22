window.WDS_HelpScout_Harvest_Integration = window.WDS_HelpScout_Harvest_Integration || {};

(function (window, document, app, single_ticket, ticket_list, undefined) {
  app.cache = function() {
    app.elems = {};
  };

  app.init = function init() {
    app.cache();

    // add harvest js
    app.add_harvest_js();

    if ( window.location.href.indexOf( 'conversation' ) > -1 ) {
      single_ticket.init();
    } else {
      ticket_list.init();
    }
  };

  app.add_harvest_js = function() {
    var config_script, ph, platform_config, platform_script;

    platform_config = {
      applicationName : 'HelpScout',
      permalink : 'https://secure.helpscout.net/conversation/%ITEM_ID%'
    };

    config_script = document.createElement( 'script' );
    config_script.innerHTML = 'window._harvestPlatformConfig = ' + ( JSON.stringify( platform_config ) ) + ';';
    platform_script = document.createElement( 'script');
    platform_script.src = 'https://platform.harvestapp.com/assets/platform.js';
    platform_script.async = true;
    ph = document.getElementsByTagName( 'script' )[0];
    ph.parentNode.insertBefore( config_script, ph );
    ph.parentNode.insertBefore( platform_script, ph );
  };

  document.addEventListener( 'DOMContentLoaded', app.init );

  return app;

})( window, document, window.WDS_HelpScout_Harvest_Integration, window.WDS_HelpScout_Harvest_Integration_Single_Ticket, window.WDS_HelpScout_Harvest_Integration_Ticket_List );
