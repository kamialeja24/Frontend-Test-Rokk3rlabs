'use strict';
rokkerlabsTest.controller('ChartsCtrl', ['$scope', '$http', 'lodash', 'moment', '$timeout', function($scope, $http, lodash, moment, $timeout){
  $scope.datajson = [];
  var promise = $http.get('data.json');
  promise.then(
    function(response){
      //$scope.series = getSeries(response.data);
      $scope.data = getSpeeds(response.data);
      console.log($scope.data);
    }, function(err) {
      console.log(err);
    }
  );

  $scope.labels = ["10 AM", "10 AM", "10 AM", "10 AM", "10 AM", "10 AM", "10 AM"];
  $scope.onClick = function (points, evt) {
    $scope.data = randomSpeeds($scope.data);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };

  var getSeries = function (data){
    var series = [];
    lodash.forEach(data, function (serie){
      series.push(serie.zoneId);
    })
    return series;
  }

  var getSpeeds = function (data){
    var speeds = [];
    lodash.forEach(data, function(row){
      speeds.push([parseInt(row.data.speed)]);
    });
    return speeds;
  }
  var randomSpeeds = function(speeds){
    lodash.forEach(speeds, function (arr) {
      arr.push(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
    })
  }
    $timeout(randomSpeeds($scope.data), 1);
}]);
