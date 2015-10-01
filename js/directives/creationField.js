app.directive('creationField', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: './js/directives/creationField.html' 
  }; 
});
