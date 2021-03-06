describe('movieCore Test', function(){

    var PopularMovies; 
    var $httpBackend; 

    beforeEach(module('movieCore')); 

    beforeEach(inject(function(_PopularMovies_, _$httpBackend_){
        PopularMovies = _PopularMovies_; 
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create movie item', function(){
        
        //{"movieId":"abc0123456","description":"Great movie"} 
        
        // 1. Using a function to test the actual data recieved 
            // var expectedData = function(data){             
            //     return angular.fromJson(data).movieId === 'abc0123456'; 
            // };

        // 2. Comparing actual data with an exact string.        
            //var expectedData = '{"movieId":"abc0123456","description":"Great movie"}';
        
        // 3. Using a regular expression to test actual data. 
        var expectedData = /{"movieId":"abc0123456","description":".*"}/;

        // prepare backend to handle the request that we are about to send 
        $httpBackend.expectPOST(/./, expectedData).respond(201); 

        /* Code under test */
        var pm = new PopularMovies({
            movieId: 'abc0123456',
            description: 'Some description.'
        });
        pm.$save();
        // What we can 'expect' here is that not exception will be thrown when httpBackend flushes 
        // all pending request.

        expect($httpBackend.flush).not.toThrow();
    });

    /* Test if we can send correct get request */
    it('should get a movie item by id', function(){

        $httpBackend.expectGET('popular/abc0123456').respond(200);
        
        /* Code under test */
        PopularMovies.get({movieId: 'abc0123456'});
        
        expect($httpBackend.flush).not.toThrow(); 
    }); 

    it('should update movie item', function(){

        $httpBackend.expectPUT('popular').respond(200);

        /* Code under test */
        var movie = new PopularMovies({
            movieId: 'abc0123456', 
            description: 'description has changed'
        })
        movie.$update();        

        expect($httpBackend.flush).not.toThrow();
    }); 

    it('should authenticate requests', function(){
        
        /* specifying  a function that returns true or false, whether the header contains a valid property*/        
        var expectedHeaders = function(headers){            
            //console.log(angular.mock.dump(headers)); //              
            return angular.fromJson(headers).authToken === 'supersecrettoken';
        };

        /* specifying exact json object to be match against actual data sent*/
        // var expectedHeaders = {
        //   "authToken": "supersecrettoken",
        //   "Accept": "application/json, text/plain, */*"
        // };

        var matchAny = /.*/; 

        /* backend fake handle implementation for each fake request*/

        $httpBackend.whenGET(matchAny, expectedHeaders)
            .respond(200);

        $httpBackend.expectPOST(matchAny, matchAny, expectedHeaders)
            .respond(200);
        
        $httpBackend.expectPUT(matchAny, matchAny, expectedHeaders)
            .respond(200);

        $httpBackend.expectDELETE(matchAny, expectedHeaders)
            .respond(200);        
        
        /* code under test */
        var item = { id: '0123456789', description: 'This movie is great.' }; 
        
        /* Five fake requests sent to backend*/
        PopularMovies.query(); 
        PopularMovies.get({ id: '0123456789' });
        new PopularMovies(item).$save();
        new PopularMovies(item).$update();
        new PopularMovies(item).$remove(); 
              
        expect($httpBackend.flush).not.toThrow(); 

    }); 

}); 