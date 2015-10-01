app.filter('filtermag', function(){
return function(input) {
        return input ? 'Casting Magic!' : 'Not Casting Magic!';
    }
});

