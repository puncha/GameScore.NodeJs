AV.initialize("0upno5sfsu76f7da8xytoddc8vy35rck4ygczjaer9xd3hv1", "zzka0mgpakmq8kdg6oq3ii0cbkfiar6686cfomhiv7nlbrkx");

var gameScoreApp = angular.module('gameScoreApp', ['ngRoute', 'gameScoreControllers']);

gameScoreApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/users', {
                templateUrl: 'partials/userList.html',
                controller: 'UserListCtrl'
            }).
            when('/users/:username', {
                templateUrl: 'partials/userDetail.html',
                controller: 'UserCtrl'
            }).
            when('/user/create', {
                templateUrl: 'partials/createUser.html',
                controller: 'UserCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
