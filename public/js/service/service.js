var services = angular.module("gameScoreServices", []);

services.service("AdaptorService", ['$q', function($q) {
    return {
        avosToQPromise: function avosToQPromise(avosPromise) {
            var defer = $q.defer();

            avosPromise.then(
                _.bind(defer.resolve, defer),
                _.bind(defer.reject, defer)
            );

            return defer.promise;
        }
    };
}]);


services.service("UserService", ['AdaptorService', function(adpSrv) {
    return {
        list: function() {
            return adpSrv.avosToQPromise(new AV.Query(AV.User).find());
        },

        getByName: function(name) {
            var qPromise = adpSrv.avosToQPromise(new AV.Query(AV.User).equalTo("username", name).find());
            return qPromise.then(function(matchedUsers){
                return _.first(matchedUsers);
            });
        },

        create: function(name, password) {
            return adpSrv.avosToQPromise(AV.User.signUp(name, password));
        }
    };
}]);