var rokkerlabsTest=angular.module("rokkerlabsTest",["ui.router","chart.js","ngLodash","angularMoment"]);
"use strict";rokkerlabsTest.config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("menu",{templateUrl:"app/components/menu/menu.html",controller:"MenuCtrl",abstract:!0}).state("menu.news",{url:"/news",templateUrl:"app/components/news/news.html",controller:"NewsCtrl",parent:"menu"}).state("menu.charts",{url:"/charts",templateUrl:"app/components/charts/charts.html",controller:"ChartsCtrl",parent:"menu"}),e.otherwise("/news")}]);
"use strict";rokkerlabsTest.controller("ChartsCtrl",["$scope",function(e){e.message="Hello"}]);
"use strict";rokkerlabsTest.controller("MenuCtrl",["$scope",function(e){e.message="Hellos"}]);
"use strict";rokkerlabsTest.controller("NewsCtrl",["$scope",function(s){s.message="Hello soosoos"}]);
"use strict";rokkerlabsTest.controller("ChartsCtrl",["$scope","$http","lodash","moment","$timeout",function(t,a,o,n,s){t.datajson=[];var i=a.get("data.json");i.then(function(a){t.data=e(a.data),console.log(t.data)},function(t){console.log(t)}),t.labels=["10 AM","10 AM","10 AM","10 AM","10 AM","10 AM","10 AM"],t.onClick=function(a,o){t.data=r(t.data)},t.datasetOverride=[{yAxisID:"y-axis-1"},{yAxisID:"y-axis-2"}],t.options={scales:{yAxes:[{id:"y-axis-1",type:"linear",display:!0,position:"left"},{id:"y-axis-2",type:"linear",display:!0,position:"right"}]}};var e=function(t){var a=[];return o.forEach(t,function(t){a.push([parseInt(t.data.speed)])}),a},r=function(t){o.forEach(t,function(t){t.push(Math.floor(10*Math.random())+1)})};s(r(t.data),1)}]);
"use strict";rokkerlabsTest.controller("MenuCtrl",["$scope",function(e){e.message="Hellos"}]);
"use strict";rokkerlabsTest.controller("NewsCtrl",["$scope",function(s){s.message="Hello soosoos"}]);