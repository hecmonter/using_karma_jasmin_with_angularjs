describe('omdb service', function(){
    
    var movieData =  {"Title":"Star Wars","Year":"1983","Rated":"N/A","Released":"01 May 1983","Runtime":"N/A","Genre":"Action, Adventure, Sci-Fi","Director":"N/A","Writer":"N/A","Actors":"Harrison Ford, Alec Guinness, Mark Hamill, James Earl Jones","Plot":"In this game, you assume the role of Luke Skywalker and fight past many enemies to to reach and destroy the Death Star.","Language":"English","Country":"USA","Awards":"N/A","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMWJhYWQ3ZTEtYTVkOS00ZmNlLWIxZjYtODZjNTlhMjMzNGM2XkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_SX300.jpg","Metascore":"N/A","imdbRating":"7.8","imdbVotes":"368","imdbID":"tt0251413","Type":"game","Response":"True"};

    var movieDataById = {"Title":"Star Wars","Year":"1983","Rated":"N/A","Released":"01 May 1983","Runtime":"N/A","Genre":"Action, Adventure, Sci-Fi","Director":"N/A","Writer":"N/A","Actors":"Harrison Ford, Alec Guinness, Mark Hamill, James Earl Jones","Plot":"In this game, you assume the role of Luke Skywalker and fight past many enemies to to reach and destroy the Death Star.","Language":"English","Country":"USA","Awards":"N/A","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMWJhYWQ3ZTEtYTVkOS00ZmNlLWIxZjYtODZjNTlhMjMzNGM2XkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_SX300.jpg","Metascore":"N/A","imdbRating":"7.8","imdbVotes":"368","imdbID":"tt0251413","Type":"game","Response":"True"};  
     
    var omdbApi = {};
    
    /* 
        First we load the whole module that contains the service we want to test
    */
    beforeEach(module('omdb')); 


    /* 
        Inject the specific service to be tested. 
    */
    beforeEach(inject(function(_omdbApi_){
        omdbApi = _omdbApi_; 
    }));

    /*
        What is expected to happen when a search is issued? 
    */
    it('should return movie data from a search', function(){
        console.log(dump(movieData));
        expect(omdbApi.search('Star Wars')).toEqual(movieData);
    });


    /*
        What is expected to happen when a search is issued? 
    */
    it('should return movie data by id', function(){
        expect(omdbApi.find('tt0251413')).toEqual(movieDataById);
    }); 
    
}); 