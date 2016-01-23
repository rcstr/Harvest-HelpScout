window.WDS_HelpScout_Harvest_Integration = window.WDS_HelpScout_Harvest_Integration || {};

(function WDSHelpscoutHarvestIntegrationSingle(window, document, app, undefined) {
    "use strict";

    var module = app.single = {};

    module.cache = function cache() {
    };

    module.meetRequirements = function meetRequirements() {
        return true;
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