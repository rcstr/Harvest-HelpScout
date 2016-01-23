window.WDS_HelpScout_Harvest_Integration = window.WDS_HelpScout_Harvest_Integration || {};

(function WDSHelpscoutHarvestIntegrationMain(window, document, app, undefined) {
    "use strict";

    var module = app.main = {},
        subModule = null,
        subModuleInstance = null;

    /**
     * main cache
     */
    module.cache = function cache() {
        app.c = {};
        app.c.wrapper = document.querySelector('#js-wrap');
        app.c.ticketWrapper = app.c.wrapper.querySelector('#ticket');
        app.c.listWrapper = app.c.wrapper.querySelector('#folder');
    };

    /**
     * checks necessary requirements to run application
     *
     * @returns {boolean}app.c.listWrapper
     */
    module.meetRequirements = function meetRequirements() {
        if (app.c.wrapper === null) {
            return false;
        }

        if (app.c.ticketWrapper === null && app.c.listWrapper === null) {
            return false;
        }

        return true;
    };

    /**
     * Defines which submodule we need to run
     */
    module.setSubmodule = function () {
        if (app.c.ticketWrapper !== null) {
            subModule = 'single';
        } else if (app.c.listWrapper !== null) {
            subModule = 'list';
        }
    };

    /**
     * init submodule
     */
    module.initSubmodule = function initSubmodule() {
        subModuleInstance = app[subModule];

        return new Promise(subModuleInstance.init).then(function() {
            alert('passed');
        });
    };

    /**
     * Init application
     */
    module.init = function init() {
        module.cache();

        if (module.meetRequirements()) {
            module.setSubmodule();
            module.initSubmodule();
        } else {
            window.requestAnimationFrame(module.init);
        }
    };

    document.addEventListener('DOMContentLoaded', module.init);
}(window, document, window.WDS_HelpScout_Harvest_Integration));