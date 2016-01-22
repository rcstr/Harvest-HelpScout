(function harvest_helpscout(window, document) {
    'use strict';

    var c = {}; // cache

    function cache() {
        c.ticketHeader = document.querySelector('#tkHeader');
        c.ticketSubject = document.querySelector("#tktSubject");
        c.ticketSubjectLabel = document.querySelector("#subject");
        c.ticketSubjectLabelText = document.querySelector("#subjectLine");
    }

    function meetRequirements() {
        return (c.ticketSubject !== null);
    }

    function getTicketInfo() {
        var ticketInfo = {
                "id": 0,
                "name": ""
            },
            name = c.ticketSubjectLabelText.innerHTML,
            id = parseInt(c.ticketHeader.querySelector('p strong').innerText);


        ticketInfo.id = 'hs_' + id;
        ticketInfo.name = id + ' ' + name;

        return ticketInfo;
    }

    function injectHVButton(ticketInfo) {
        var timerEl = document.createElement('div');

        timerEl.classList.add('harvest-timer');
        timerEl.dataset.item = JSON.stringify(ticketInfo);
        timerEl.dataset.group = JSON.stringify({"id": "hs", "name": "Support: Maintainn"});

        c.ticketSubjectLabel.insertBefore(timerEl, c.ticketSubjectLabelText);
    }


    function injectHVScript() {
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
    }

    function init() {
        cache();

        if (meetRequirements()) { // if DOM is present
            injectHVButton(getTicketInfo());
            injectHVScript();
        } else { // DOM is not rendered, let's give another shot
            window.requestAnimationFrame(init);
        }
    }

    // init application on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', init);

})(window, document);