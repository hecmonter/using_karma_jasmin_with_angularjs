angular
    .module('movieApp')
    .controller('SearchController', function ($location) {        
        this.query = '';
        this.search = function () {                
            if (this.query) {
                $location.path('/results').search('q', this.query);
            }
        };
    });
