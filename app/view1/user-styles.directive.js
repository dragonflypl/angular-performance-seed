(function() {

    function numericBalance(balance) {
        if (!balance) {
            return;
        }
        return +balance.substring(1);
    }
    
    function mailType(email) {
        if (email.indexOf('@gmail') != -1) {
            return 'gmail';
        }
        if (email.indexOf('@hotmail') != -1) {
            return 'hotmail';
        }  
        return 'othermail';
    }

	angular.module('myApp.view1').directive('userStyles', function($log) {
		return {
			controller: function($scope, $element) {
				var element = $element[0];
				var previousOdd, previousMoney, previousStatus, previousPhone, previousEmail;

				$scope.$watch(function() {
					var item = $scope.item;
					var currentOdd = item.id % 2;
					if (currentOdd !== previousOdd) {
						previousOdd ? element.classList.remove('odd') : element.classList.remove('even');
						currentOdd ? element.classList.add('odd') : element.classList.add('even');
						previousOdd = currentOdd;
					}
					var currentMoney = numericBalance(item.balance) >= 30000;
					if (currentMoney !== previousMoney) {
						previousMoney ? element.classList.remove('rich') : element.classList.remove('poor');
						currentMoney ? element.classList.add('rich') : element.classList.add('poor');
						previousMoney = currentMoney;
					}
					var currentStatus = item.status === 'yes';
					if (currentStatus !== previousStatus) {
						previousStatus ? element.classList.remove('taken') : element.classList.remove('free');
						currentStatus ? element.classList.add('taken') : element.classList.add('free');
						previousStatus = currentStatus;
					}
					var currentPhone = item.phone.indexOf('.') !== -1;
					if (currentPhone !== previousPhone) {
						previousPhone ? element.classList.remove('dotted') : element.classList.remove('not-dotted');
						currentPhone ? element.classList.add('dotted') : element.classList.add('not-dotted');
						previousPhone = currentPhone;
					}	
					var currentEmail = mailType(item.email);
					if (currentEmail !== previousEmail) {
						element.classList.remove('gmail');
						element.classList.remove('hotmail');
						element.classList.remove('othermail');
						element.classList.add(currentEmail);
						previousEmail = currentEmail;
					}	
				});
			}
		}
	})
}())