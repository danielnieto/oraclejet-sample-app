requirejs.config({
  // Path mappings for the logical module names
  paths: {
    'knockout': 'libs/knockout/knockout-3.3.0',
    'jquery': 'libs/jquery/jquery-2.1.3.min',
    'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.11.4.min',
    'ojs': 'libs/oj/v1.1.2/min-debug',
    'ojL10n': 'libs/oj/v1.1.2/ojL10n',
    'ojtranslations': 'libs/oj/v1.1.2/resources',
    'signals': 'libs/js-signals/signals.min',
    'crossroads': 'libs/crossroads/crossroads.min',
    'text': 'libs/require/text',
    'promise': 'libs/es6-promise/promise-1.0.0.min',
    'hammerjs': 'libs/hammer/hammer-2.0.4.min'
  },
  // Shim configurations for modules that do not expose AMD
  shim: {
    'jquery': {
      exports: ['jQuery', '$']
    },
    'crossroads': {
      deps: ['signals'],
      exports: 'crossroads'
    }
  },

// This section configures the i18n plugin. It is merging the Oracle JET built-in translation
// resources with a custom translation file.
// Any resource file added, must be placed under a directory named "nls". You can use a path mapping or you can define
// a path that is relative to the location of this main.js file.
    config: {
        ojL10n: {
            merge: {
                //'ojtranslations/nls/ojtranslations': 'resources/nls/myTranslations'
            }
        }
    }
});


/**
 * A top-level require call executed by the Application.
 */
require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojtoolbar','ojs/ojmenu', 'ojs/ojrouter','ojs/ojmodule'], // add additional JET component modules as needed
function(oj, ko, $) {

  // Initialize the router
  var router = oj.Router.rootInstance;
  router.configure({'movies':    {label: 'Movies',     value: 'movies', isDefault: true},
                    'viewMovie': {label: 'View Movie', value: 'viewMovie'},
                    'editMovie': {label: 'Edit Movie', value: 'editMovie'},
                    'addMovie':  {label: 'Add Movie',  value: 'addMovie'}});

  // Only the router is need in the viewModel
  var viewModel = {
    router:      router,
  };

  oj.Router.sync().then(
    function() {
      ko.applyBindings(viewModel);
      $('#globalBody').show();
    },
    function(error) {
      oj.Logger.error('Error when starting router: ' + error.message);
    }
  );
});
