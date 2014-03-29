var gameScoreControllers = angular.module("gameScoreControllers", ['gameScoreServices']);

gameScoreControllers.controller('UserListCtrl', ['$scope', 'UserService', function ($scope, userService) {
    userService.list().then(function (results) {
        $scope.users = results;
    });
}]);

gameScoreControllers.controller('UserCtrl', ['$scope', '$routeParams', 'UserService', function ($scope, $routeParams, userService) {
    var user = $scope.user = {};
    if ($routeParams.username) {
        var name = $routeParams.username;
        userService.getByName(name).then(function (matchedUser) {
            $scope.user = matchedUser;
        });

    }

    $scope.createUser = function () {
        $scope.hasError = $scope.isSucceeded = false;
        userService.create(user.username, user.password).then(
            function (results) {
                $scope.isSucceeded = true;
                setTimeout(
                    function () {
                        window.location.hash = "#/users";
                    },
                    2000);
            },
            function (error) {
                $scope.hasError = true;
                if (error && error.message)
                    $scope.error = error.message;
                else
                    $scope.error = "Unknown Error."
            });
    };

}]);