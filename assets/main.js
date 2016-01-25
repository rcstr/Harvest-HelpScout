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

        return new Promise(subModuleInstance.init).then(function submoduleResolvedInit() {
            var tickets = subModuleInstance.getTickets();

            module.insertHVTimer(tickets);
            module.insertHVScript();
        });
    };

    module.insertHVTimer = function insertHVTimer(tickets) {
        tickets.forEach(function insertHVButton(ticket) {
            var timerEl = module.buildTimerEl(ticket);

            ticket.nodeParent.insertBefore(timerEl, ticket.nodeBefore);
        });
    };

    module.buildTimerEl = function buildTimerEl(ticket) {
        var timer = document.createElement('div');

        timer.classList.add('harvest-timer');
        timer.dataset.item = JSON.stringify({
            "id": "hs_" + ticket.ticketId,
            "name": ticket.ticketId + " " + ticket.ticketSubject
        });
        timer.dataset.group = JSON.stringify({"id": "hs", "name": "Support: Maintainn"});

        return timer;
    };

    module.insertHVScript = function insertHVScript() {
        // first script and config
        var ph = document.getElementsByTagName("script")[0];
        var _harvestPlatformConfig = {
            "applicationName": "HelpScout",
            "permalink": "https://example.com/item/%ITEM_ID%"
        };

        // config script
        var configScript = document.createElement("script");
        configScript.innerHTML = "window._harvestPlatformConfig = " + (JSON.stringify(_harvestPlatformConfig)) + ";";
        ph.parentNode.insertBefore(configScript, ph);

        // hv script
        var s = document.createElement("script");
        s.src = "https://platform.harvestapp.com/assets/platform.js";
        s.async = true;

        ph.parentNode.insertBefore(s, ph);
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