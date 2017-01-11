'use strict';
rokkerlabsTest.controller('ChartsCtrl', ['$scope', '$http', 'lodash', 'moment', '$interval', function($scope, $http, lodash, moment, $interval){
  $scope.datajson = [];
  $scope.labels = ['1'];
  $scope.count = 2;

  var promise = $http.get('data.json');
  promise.then(
    function(response){
      $scope.series = getSeries(response.data);
      $scope.data = getSpeeds(response.data);
    }, function(err) {
      console.log(err);
    }
  );

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
 $scope.randomSpeeds = function(speeds){
    lodash.forEach(speeds, function (arr) {
      arr.push(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
    });
    $scope.labels.push($scope.count.toString());
    $scope.count++;
    if(speeds[0].length === 11){
      $scope.labels.shift();
      lodash.forEach(speeds, function (arr) {
        arr.shift();
      });
    }
  }
  var interval = $interval(function(){$scope.randomSpeeds($scope.data)}, 1000);
}]);
