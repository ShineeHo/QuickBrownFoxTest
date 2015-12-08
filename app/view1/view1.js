'use strict';

var myModule = angular.module('myApp.view1', ['ui.bootstrap', 'ngRoute','ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$timeout', function($scope, $timeout) {
	var testPhrase = $scope.message = 'The, q,ui,ck br,own fo,x ,jumps, ov,er t,he l,azy dog,';
	
	var comma = ",";
	// use API
	var splitPhrase = testPhrase.split(comma).join("").split("").reverse();

	var domNode = document.querySelector("#magicWorld");
	domNode.innerHTML = "<label>" + splitPhrase.join("") + "</label>";
	
	$scope.show = false;

	$scope.playMagic = function playMagic() {; 
		$scope.show = true;
		var i = testPhrase.indexOf(comma);
		var count = 1;
		while (i != -1) {
			
			if (testPhrase.charAt(i) == comma) {
				splitPhrase.splice(i, 0, comma);
				var cloneArray = splitPhrase.slice(0);
				var interval = (1000 * count) - 500; 
				count++;

				$timeout(function(temp) {
					domNode.innerHTML = "<label>" + temp.join("") + "</label>";
					if (temp.length == splitPhrase.length) {
						domNode.classList.remove("alert-info")
						domNode.classList.add("alert-success");
					}
				}, interval, null, cloneArray);

				
				i = testPhrase.indexOf(comma, i+1);
			}
		}

	};

	

}]);