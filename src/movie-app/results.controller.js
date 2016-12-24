angular
    .module('movieApp')
    .controller('ResultsController', ['$scope', 'omdbApi', '$location', function($scope, omdbApi, $location){                       
        var query = $location.search().q;
        omdbApi.search(query)
            .then(function(results){                             
                $scope.results = results.search;                 
            })
            .catch(function(){
                $scope.errorMessage = 'An error occurred';
            });
    }]);