require.config({
    baseUrl: 'app',
    urlArgs: 'v=1.0'
});

require(
    [
        'app',
        'services/routeResolver',
        'services/authService',
        'services/playerService',
        'services/gameService',
        'controllers/playerController',
        'controllers/playersOverviewController'
    ],
    function(){
        angular.bootstrap(document, ['dashboardApp']);
    }
);