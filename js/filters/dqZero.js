app.filter('zeroOut', function(){
	return function(num){
		if (num < 0 ) {
			return 0;
		} else {
			return num;	
		};
	};
});