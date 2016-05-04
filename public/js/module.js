'use strict';

var app = angular.module('myApp', ['ui.router']);

// localStorage.ngProductsList = [{'name': 'andy'}, {'yo': 'dd'}];
// console.log('ddd: ', JSON.parse(localStorage.ngProductsList));

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '../views/home.html',
            controller: 'homeCtrl'
        })
        .state('clients', {
            url: '/clients',
            templateUrl: '../views/clients.html',
            controller: 'clientsCtrl'
        })
        .state('properties', {
            url: '/properties/',
            templateUrl: '../views/properties.html',
            controller: 'propertiesCtrl'
        })

    $urlRouterProvider.otherwise('/');

});