'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$timeout', function($scope, $timeout) {
	var testPhrase = $scope.message = 'The, q,ui,ck br,own fo,x ,jumps, ov,er t,he l,azy dog,';
	
	var comma = ",";

	var domNode = document.querySelector("#magicWorld");

	$scope.show = false;
	var phraseLength = testPhrase.length;
	var arr = new Array(phraseLength);
	var lastIndex = phraseLength - 1;


	$scope.playMagic = function playMagic() {
		$scope.show = true;

	//only for the sake of FANCT displaying
	for (var s = 0; s<phraseLength; s++) {
		arr[s] = testPhrase.charAt(s);
	}


		var lc;
		var count = 1;
		for (var i = 0, l = phraseLength; i < l; i++) {
			var c = testPhrase.charAt(i);
			// ok, its our friend comma, just give a seat and proceed to next
			if (c == comma) {
				arr[i] = c;
				continue;
			}
			
			while (testPhrase.charAt(lastIndex) == comma) { //count from back for our friend comma
				arr[lastIndex] = comma;
				lastIndex--;
			}
			lc = testPhrase.charAt(lastIndex);
			
			//ready to swap
			if (c != comma) {
				//swap
				arr[i] = lc;
				arr[lastIndex] = c; 

				var cloneArray = arr.slice(0);
				var interval = (1000 * count) - 500; 
				count++;

				$timeout(function(temp, swapIdx1, swapIdx2) {
					var isLast = swapIdx1 > swapIdx2;
					var b4Arr = temp.slice(0, swapIdx1-1);
					var middleArr = temp.slice(swapIdx1 + 1, swapIdx2-1);
					var afArr = temp.slice(swapIdx2 + 1, temp.length);

					domNode.innerHTML = b4Arr.join("") + "<label>" + temp[swapIdx1] + "</label>" + middleArr.join("") + "<label>" + temp[swapIdx2] + "</label>" + afArr.join("") ;
					if (isLast) {
						domNode.classList.remove("alert-info")
						domNode.classList.add("alert-success");
					}
				}, interval, null, cloneArray, i*1, lastIndex*1);


			} 
			
			//before proceed, lets see if it has reached middle
			if(i > lastIndex) {
				break; //done
			} else {
				lastIndex--;
			}
		}

	};

}]);
