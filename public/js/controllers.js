'use strict';

var app = angular.module('myApp');
app.controller('homeCtrl', function() {
    console.log('homeCtrl loaded');
});

app.controller('clientsCtrl', function($scope, Clients) {
    console.log('clientsCtrl loaded');

    Clients.getAll()
        .then(function(clients) {
            $scope.clients = clients.data.reverse();
        }, function(err) {
            console.log('err when get all clients: ', err);
        });
    $scope.sortBy = (order) => {
        if ($scope.order === order) {
            $scope.order = `-${order}`;
        } else {
            $scope.order = order;
        }
    }

    $scope.addnewClient = () => {
        console.log('$scope.newClient; ', $scope.newClient);
        Clients.create($scope.newClient)
            .then(function(res) {
                console.log('client', res.data);
                $scope.clients.unshift(res.data)
                $scope.newClient = null;
            }, function(err) {
                console.log('err when get all clients: ', err);
            })
    }

    $scope.editOne = (index, id) => {
        console.log('ddd');
        console.log('id clicked: ', id);
        console.log('index: ', index);
        $scope.edditedClient = angular.copy($scope.clients[index]);
    }
    $scope.cancelClicked = () => {
        $scope.edditedClientId = null;
    }
    $scope.deleteOne = (id, index) => {
        // console.log('id: ', id);
        // console.log("$scope.clients: ", $scope.clients);
        Clients.delete(id)
            .then(function(res) {
                console.log('client', res.data);
                $scope.clients.splice(index, 1);
                $scope.edditedClientId = null;
            }, function(err) {
                console.log('err when deleting client: ', err);
            })
    }
    $scope.editOne = (id, index) => {
        console.log('id: ', id);
        Clients.update(id, $scope.edditedClient)
            .then(function(res) {
                // console.log('client', res.data);
                $scope.clients[index] = $scope.edditedClient;
                $scope.edditedClientId = null;
            }, function(err) {
                console.log('err when editting clients: ', err);
            })
    }
});
