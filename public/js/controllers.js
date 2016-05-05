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
    $scope.addnewOne = (newOne) => {
        Clients.create(newOne)
            .then(function(res) {
                $scope.clients.unshift(res.data)
                $scope.newOne = null;
            }, function(err) {
                console.log('err: ', err);
            })
    }

    $scope.editOne = (index, id) => {
        $scope.edditedClient = angular.copy($scope.clients[index]);
        $scope.edditedClient.index = index;
    }
    $scope.cancelClicked = () => {
        $scope.edditedClient = null;
    }
    $scope.deleteOne = (index, id) => {
        console.log('id: ', id);
        Clients.delete(id)
            .then(function(res) {
                $scope.clients.splice(index, 1);
                $scope.edditedClient = '';
            }, function(err) {
                console.log('err: ', err);
            })
    }
    $scope.edittedOne = (index, id) => {
        Clients.update(id, $scope.edditedClient)
            .then(function(res) {
                $scope.clients[index] = $scope.edditedClient;
                $scope.edditedClient = null;
            }, function(err) {
                console.log('err: ', err);
            })
    }
    $scope.getClientById = (clientId) => {
        console.log('getClientById: ', clientId);

    }
});

app.controller('getClientByIdCtrl', function($scope, $filter, $stateParams,Clients) {
    console.log('getClientByIdCtrl loaded');
    Clients.getClientById($stateParams.clientId)
        .then(function(client) {
            var client = client.data;
            $scope.client = client;
        }, function(err) {
            console.log('err when get one client detail: ', err);
        });
});








app.controller('propertiesCtrl', function($scope, Properties,$filter) {
    console.log('propertiesCtrl loaded');
    Properties.getAll()
        .then(function(properties) {
            $scope.properties = properties.data.reverse();
        }, function(err) {
            console.log('err when get all properties: ', err);
        });
    $scope.sortBy = (order) => {
        if ($scope.order === order) {
            $scope.order = `-${order}`;
        } else {
            $scope.order = order;
        }
    }
    $scope.addnewOne = (newOne) => {
        Properties.create(newOne)
            .then(function(res) {
                $scope.properties.unshift(res.data)
                $scope.newOne = null;
            }, function(err) {
                console.log('err: ', err);
            })
    }

    $scope.editOne = (index, id) => {
        $scope.edditedProperty = angular.copy($scope.properties[index]);
        $scope.edditedProperty.index = index;
    }
    $scope.cancelClicked = () => {
        $scope.edditedProperty = null;
    }
    $scope.deleteOne = (index, id) => {
        console.log('id: ', id);
        Properties.delete(id)
            .then(function(res) {
                $scope.properties.splice(index, 1);
                $scope.edditedProperty = '';
            }, function(err) {
                console.log('err: ', err);
            })
    }
    $scope.edittedOne = (index, id) => {
        Properties.update(id, $scope.edditedProperty)
            .then(function(res) {
                $scope.properties[index] = $scope.edditedProperty;
                $scope.edditedProperty = null;
            }, function(err) {
                console.log('err: ', err);
            })
    }

    $scope.rPriceFilter = {};
    $scope.uCostFilter = {};
    $scope.priceFilter = () => {

        var rPriceMin = $scope.rPriceFilter.min || 0;
        var rPriceMax = $scope.rPriceFilter.max || 100000000;
        var uCostMin = $scope.uCostFilter.min || 0;
        var uCostMax = $scope.uCostFilter.max || 100000000;

        console.log('rent price range: ', rPriceMin, ' ~ ', rPriceMax);
        console.log('Utilities cost range: ', uCostMin, ' ~ ', uCostMax);
        // console.log('oStatusAvailable: ', oStatusAvailable);

        Properties.getAllByfilter(rPriceMin, rPriceMax, uCostMin, uCostMax)
            .then(function(properties) {
                console.log('yeahhhhhh: ', properties.data);
                $scope.properties = properties.data;
            }, function(err) {
                console.log('err when get all bt filter properties: ', err);
            });


    }

    $scope.showAvailable = () => {
        $scope.searchFilterByStatus = 'available';
    }
    $scope.showAll = () => {
        $scope.searchFilterByStatus = '';
    }
    // $scope.showTotalNum = () => {
    //     if ($scope.properties) {
    //         var totalNum = $scope.properties.length;
    //     }
    //     return totalNum;
    // }
    $scope.showTotalrPrice = () => {
        var totalrPrice = 0;
        if ($scope.properties) {
            for (var i = 0; i < $scope.properties.length; i++) {
                totalrPrice = totalrPrice + $scope.properties[i].rPrice
            }
        }
        return totalrPrice;
        console.log(totalrPrice);
    }
    $scope.showTotaluCost = () => {
        var totaluCost = 0;
        if ($scope.properties) {
        for (var i = 0; i < $scope.properties.length; i++) {
            totaluCost = totaluCost + $scope.properties[i].uCost
        }}
        return totaluCost;
        console.log(totaluCost);
    }

});
