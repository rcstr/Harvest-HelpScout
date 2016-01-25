window.WDS_HelpScout_Harvest_Integration = window.WDS_HelpScout_Harvest_Integration || {};

(function WDSHelpscoutHarvestIntegrationList(window, document, app, undefined) {
    "use strict";

    var module = app.list = {};

    module.cache = function cache() {
        app.c.folder = app.c.wrapper.querySelector('#folder');
    };

    module.meetRequirements = function meetRequirements() {
        return true;
    };

    module.getTickets = function getTickets() {
        var tickets = [],
            ticketList = app.c.folder.querySelectorAll('#tblTickets tbody tr');

        [].forEach.call(ticketList, function eachTicket(ticketEl) {
            var ticketID = parseInt(ticketEl.querySelector('td.convoNum a').innerText),
                ticketSubject = ticketEl.querySelector('td.subj p').innerText,
                parentNode = ticketEl.querySelector('a');

            tickets.push({
                "nodeParent": parentNode.parentNode,
                "nodeBefore": parentNode,
                "ticketId": ticketID,
                "ticketSubject": ticketSubject
            });
        });

        return tickets;
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