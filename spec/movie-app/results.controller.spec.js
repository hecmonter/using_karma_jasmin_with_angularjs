describe('Results Controller', function(){
    var results = {
        "search": [
                    {"Title":"Star Wars: Episode V - The Empire Strikes Back","Year":"1980","Rated":"PG","Released":"20 Jun 1980","Runtime":"124 min","Genre":"Action, Adventure, Fantasy","Director":"Irvin Kershner","Writer":"Leigh Brackett (screenplay), Lawrence Kasdan (screenplay), George Lucas (story by)","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams","Plot":"After the rebels have been brutally overpowered by the Empire on their newly established base, Luke Skywalker takes advanced Jedi training with Master Yoda, while his friends are pursued by Darth Vader as part of his plan to capture Luke.","Language":"English","Country":"USA","Awards":"Won 1 Oscar. Another 19 wins & 18 nominations.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYmViY2M2MTYtY2MzOS00YjQ1LWIzYmEtOTBiNjhlMGM0NjZjXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg","Metascore":"80","imdbRating":"8.8","imdbVotes":"861,526","imdbID":"tt0080684","Type":"movie","Response":"True"},
                    
                    {"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","Rated":"PG","Released":"25 May 1977","Runtime":"121 min","Genre":"Action, Adventure, Fantasy","Director":"George Lucas","Writer":"George Lucas","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing","Plot":"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.","Language":"English","Country":"USA","Awards":"Won 6 Oscars. Another 48 wins & 28 nominations.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BZGEzZTExMDEtNjg4OC00NjQxLTk5NTUtNjRkNjA3MmYwZjg1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg","Metascore":"92","imdbRating":"8.7","imdbVotes":"933,758","imdbID":"tt0076759","Type":"movie","Response":"True"}, 
                    
                    {"Title":"Star Wars: Episode VI - Return of the Jedi","Year":"1983","Rated":"PG","Released":"25 May 1983","Runtime":"131 min","Genre":"Action, Adventure, Fantasy","Director":"Richard Marquand","Writer":"Lawrence Kasdan (screenplay), George Lucas (screenplay), George Lucas (story by)","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams","Plot":"After rescuing Han Solo from the palace of Jabba the Hutt, the rebels attempt to destroy the second Death Star, while Luke struggles to make Vader return from the dark side of the Force.","Language":"English","Country":"USA","Awards":"Nominated for 4 Oscars. Another 18 wins & 16 nominations.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BODllZjg2YjUtNWEzNy00ZGY2LTgyZmQtYTkxNDYyOWM3OTUyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg","Metascore":"53","imdbRating":"8.4","imdbVotes":"702,638","imdbID":"tt0086190","Type":"movie","Response":"True"}
                ]
        };

    var $controller; 
    var $scope; 
    var $q; 
    var omdbApi; 
    var $rootScope; 
    var $location; 

    beforeEach(module('omdb')); 
    beforeEach(module('movieApp')); 

    beforeEach(inject(function(_$controller_, _$q_, _$location_, _$rootScope_, _omdbApi_){
        $controller = _$controller_;
        $scope = {};
        $q = _$q_; 
        $rootScope = _$rootScope_; 
        omdbApi = _omdbApi_; 
        $location = _$location_;         
    }));

    it('should load search results', function(){
        /*mock the seach method on omdbApi and resolve with results object as response*/        
        spyOn(omdbApi, 'search').and.callFake(function(){            
            var deferred = $q.defer();
            deferred.resolve(results); 
            return deferred.promise; 
        });
        
        /* set the querystring part of the url to ?q=star%20wars */        
        $location.search('q', 'star wars');
        
        /* get an instance of the controller and set the correct locals*/
        $controller('ResultsController', { $scope: $scope });        
        
        /* force angular internals to apply digest cycle, so that pending promises could be revolved*/
        $rootScope.$apply(); // used to resolve the promise above; 

        /* expectations */
        expect($scope.results[0].Title).toBe(results.search[0].Title); 
        expect($scope.results[1].Title).toBe(results.search[1].Title); 
        expect($scope.results[2].Title).toBe(results.search[2].Title); 
        
        /* special matcher for spies */
        expect(omdbApi.search).toHaveBeenCalledWith('star wars');
    }); 
    
    it('should set result status to error', function(){        
        spyOn(omdbApi, 'search').and.callFake(function(){            
            var deferred = $q.defer();
            deferred.reject(); 
            return deferred.promise; 
        });
        $location.search('q', 'star wars');
        $controller('ResultsController', { $scope: $scope });        
        $rootScope.$apply(); // used to resolve the promise above;         
        expect($scope.errorMessage).toBe('An error occurred');
    }); 

}); 