describe('MovieCore', function(){

    var PopularMovies; 
    var $httpBackend; 

    beforeEach(module('MovieCore')); 

    beforeEach(inject(function(_PopularMovies_, _$httpBackend_){
        PopularMovies = _PopularMovies_; 
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create popular movie', function(){
        
        //{"movieId":"tt0076759","description":"Great movie"} 
        var expectedData = function(data){             
            return angular.fromJson(data).movieId === 'tt0076759'; 
        };

        // prepare backend to handle the request that we are about to send 
        $httpBackend.expectPOST(/./, expectedData).respond(201); 

        // make use of the code under testing
        var pm = new PopularMovies({
            movieId: 'tt0076759',
            description: 'Great movie'
        });

        pm.$save();
        // What we can 'expect' here is that not exception will be thrown when httpBackend flushes 
        // all pending request.

        expect($httpBackend.flush).not.toThrow();
    }); 



}); 