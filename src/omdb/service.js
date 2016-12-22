angular.module('omdb', [])
    .factory('omdbApi', function($http, $q){
        var service = {};
        var baseUrl = 'http://www.omdbapi.com/?v=1&';

        service.search = function(query){
            var deferred = $q.defer();
            $http.get(baseUrl + 's=' + encodeURIComponent(query))
                .success(function(data){                    
                    deferred.resolve(data);
                });
            return deferred.promise; 
        };

        // service.find = function(id){
        //     return {"Title":"Star Wars","Year":"1983","Rated":"N/A","Released":"01 May 1983","Runtime":"N/A","Genre":"Action, Adventure, Sci-Fi","Director":"N/A","Writer":"N/A","Actors":"Harrison Ford, Alec Guinness, Mark Hamill, James Earl Jones","Plot":"In this game, you assume the role of Luke Skywalker and fight past many enemies to to reach and destroy the Death Star.","Language":"English","Country":"USA","Awards":"N/A","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMWJhYWQ3ZTEtYTVkOS00ZmNlLWIxZjYtODZjNTlhMjMzNGM2XkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_SX300.jpg","Metascore":"N/A","imdbRating":"7.8","imdbVotes":"368","imdbID":"tt0251413","Type":"game","Response":"True"}; 
        // }
        service.find = function(id){
            var deferred = $q.defer(); 
            $http.get(baseUrl + 'i=' + id)
                .success(function(data){
                    deferred.resolve(data);
                }); 
            return deferred.promise;
        }

        return service;
    }); 