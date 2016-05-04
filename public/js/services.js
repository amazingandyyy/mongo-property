'use strict';

var app = angular.module('myApp');
app.service('Clients', function($http) {

    this.getAll = () => {
        return $http.get('/api/clients/');
    }
    this.create = (newCard) => {
        return $http({
            method: 'POST',
            url: '/api/clients/',
            data: newCard
        });
    }
    this.delete = (id) => {
        return $http({
            method: 'DELETE',
            url: `/api/clients/${id}`
        });
    }
    this.update = (id, edditedCard) => {
        return $http({
            method: 'PUT',
            url: `/api/clients/${id}`,
            data: edditedCard
        });
    }
});

app.service('Properties', function($http) {

    this.getAll = () => {
        return $http.get('/api/properties/');
    }
    this.create = (newCard) => {
        return $http({
            method: 'POST',
            url: '/api/properties/',
            data: newCard
        });
    }
    this.delete = (id) => {
        return $http({
            method: 'DELETE',
            url: `/api/properties/${id}`
        });
    }
    this.update = (id, edditedCard) => {
        return $http({
            method: 'PUT',
            url: `/api/properties/${id}`,
            data: edditedCard
        });
    }
});
