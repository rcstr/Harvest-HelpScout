window.WDS_HelpScout_Harvest_Integration_Single_Ticket = window.WDS_HelpScout_Harvest_Integration_Single_Ticket || {};

(function (window, document, app, undefined) {
    'use strict';

    var c = {}; // cache

    app.cache = function() {
        c.ticketHeader = document.querySelector('#tkHeader');
        c.ticketSubject = document.querySelector("#tktSubject");
        c.ticketSubjectLabel = document.querySelector("#subject");
        c.ticketSubjectLabelText = document.querySelector("#subjectLine");
    };

    app.meetRequirements = function() {
        return (c.ticketSubject !== null);
    };

    app.getTicketInfo = function() {
        var ticketInfo = {
                "id": 0,
                "name": ""
            },
            name = c.ticketSubjectLabelText.innerHTML,
            id = parseInt(c.ticketHeader.querySelector('p strong').innerText);


        ticketInfo.id = 'hs_' + id;
        ticketInfo.name = id + ' ' + name;

        return ticketInfo;
    };

    app.injectHVButton = function(ticketInfo) {
        var timerEl = document.createElement('div');

        timerEl.classList.add('harvest-timer');
        timerEl.dataset.item = JSON.stringify(ticketInfo);
        timerEl.dataset.group = JSON.stringify({"id": "hs", "name": "Support: Maintainn"});

        c.ticketSubjectLabel.insertBefore(timerEl, c.ticketSubjectLabelText);
    };

    app.trigger_harvest_styling = function() {
        var evt = new CustomEvent( 'harvest-event:timers:chrome:add' );
        return document.querySelector( '#harvest-messaging' ).dispatchEvent( evt );
    };

    app.init = function() {
        app.cache();

        if (app.meetRequirements()) { // if DOM is present
            app.injectHVButton(app.getTicketInfo());
            app.trigger_harvest_styling();
        } else { // DOM is not rendered, let's give another shot
            window.requestAnimationFrame(app.init);
        }
    };

    return app;

})( window, document, window.WDS_HelpScout_Harvest_Integration_Single_Ticket );
