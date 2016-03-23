require.config({
    baseUrl: 'app',
    urlArgs: 'v=1.0'
});

require(
    [
        'app',
        'directives/dragAndDrop',
        'services/routeResolver',
        'services/authService',
        'services/playerService',
        'services/gameService',
        'controllers/gamePreparationController',
        'controllers/gameController',
        'controllers/playerController',
        'controllers/playersOverviewController'
    ],
    function(){
        angular.bootstrap(document, ['dashboardApp']);
    }
);