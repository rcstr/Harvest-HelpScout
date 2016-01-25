window.WDS_HelpScout_Harvest_Integration = window.WDS_HelpScout_Harvest_Integration || {};

(function WDSHelpscoutHarvestIntegrationSingle(window, document, app, undefined) {
    "use strict";

    var module = app.single = {};

    module.cache = function cache() {
        app.c.ticket = app.c.wrapper.querySelector('#ticket');
    };

    module.meetRequirements = function meetRequirements() {
        return true;
    };

    module.getTickets = function getTickets() {
        var ticketID = parseInt(app.c.ticket.querySelector('#tkHeader p strong').innerText),
            ticketSubject = app.c.ticket.querySelector('#subjectLine').innerText,

            parentNode = app.c.ticket.querySelector('#subject');

        return [{
            "nodeParent": parentNode,
            "nodeBefore": parentNode.querySelector("#subjectLine"),
            "ticketId": ticketID,
            "ticketSubject": ticketSubject
        }];
    };

    module.init = function init(resolve, reject) {
        module.cache();

        if (module.meetRequirements()) {
            resolve();
        } else {
            window.requestAnimationFrame(function callInit() {
                module.init(resolve, reject);
            });
        }
    };
}(window, document, window.WDS_HelpScout_Harvest_Integration));