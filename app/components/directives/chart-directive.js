'use-strict';
rokkerlabsTest.directive('ngChart',['$compile', 'lodash', function($compile, lodash){
  return {
    restrict: 'A',
    scope: {
        data: '=',
        color: '@',
        series: '=',
        labels: '=',
        type: '@'
    },
    link: function(scope, element, attributes) {
      var ctx = element;

      var updateChart = function(externalData, updatedLabels){
        var backgroundColors = ['rgba(255, 121, 121,0.4)','rgba(255, 188, 104, 0.4)','rgba(207, 236, 91, 0.4)','rgba(68, 177, 112, 0.4)','rgba(43, 162, 207, 0.4)','rgba(58, 92, 214, 0.4)','rgba(142, 49, 213, 0.4)','rgba(199, 78, 184, 0.4)','rgba(206, 128, 150, 0.4)'];
        var borderColors = ['#EA4B4B','#FFA93D','#B6D831','#24A257','#0376A2','#133EDA','#800BD9','#B82AA7','#A74C66'];
        var datasets  = function(){
          var tmpArr = [];
          var count = 0;
          lodash.forEach(scope.series, function (client) {
            var backgroundColor = backgroundColors[count];
            var borderColor = borderColors[count];

            var dataset = {
              label: client,
              fill: true,
              lineTension: 0.1,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderCapStyle: 'butt',
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: borderColor,
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: borderColor,
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: externalData[count],
              spanGaps: false,
            }
            count ++;
            tmpArr.push(dataset);
          });
          return tmpArr;
        }();
        var options = {
          animation: false,
          scaleOverride : true,
          responsive: true,
          maintainAspectRatio: true,
          scaleStartValue : 0
        };
        var myLineChart = new Chart(ctx, {
            type: scope.type,
            data: {
            labels: updatedLabels,
            datasets: datasets
                    },
            options: options
        });
      }

      scope.$watchCollection('data[0]', function (oldData, newData) {
        if (newData){
          updateChart(scope.data, scope.labels);
        }
      });
    }
  };
}]);
