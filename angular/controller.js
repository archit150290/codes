var app = angular.module("myApp", ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        template : 'Welcome User !'
    })
    .when('/anotherPage', {
        template : 'Welcome User Again!'
    })
    .otherwise({
        redirectTo : '/'
    })
})