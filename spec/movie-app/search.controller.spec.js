describe('Search Controller', function(){
    var $scope; 
    var $location;

    beforeEach(inject(function(_$controller_, _$location_){
        $scope = {};       
        $location = _$location_; 

        var fn = function($scope, $location){
            $scope.search = function(){
                if($scope.query){
                    $location.path('/results').search('q', $scope.query); 
                }
            };
        };

        _$controller_(fn, {$scope: $scope, $location: $location})         

    }));

    it('should redirect to the query results page for non-empty query', function(){
        $scope.query = 'star wars';
        $scope.search();
        expect($location.url()).toBe('/results?q=star%20wars');
    });


    it('should be redirect to query results for empty query', function(){
        $scope.query = ''; 
        $scope.search();
        expect($location.url()).toBe(''); 
    }); 
}); 