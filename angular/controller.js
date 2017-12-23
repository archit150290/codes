var app = angular.module("myApp", ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl : 'login.html'
    })
    .when('/dashboard', {
        template : 'dashboard.html'
    })
    .otherwise({
        redirectTo : '/'
    })
})

app.controller('loginCtrl', function($scope, $location){
    $scope.submit = function(){
        var uname = $scope.username;
        var password = $scope.password;
        if($scope.username=="admin" && $scope.username!="" && $scope.password=="admin" && $scope.password != ""){
            $location.path('dashboard');
        }else{
            alert("Wrong Stuff");
        }
    }
})