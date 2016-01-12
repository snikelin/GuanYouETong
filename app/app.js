/**
 * Created by beeven on 1/12/2016.
 */

angular.module("GuanYouETongApp",[])
    .controller("MainCtrl",function($scope,$http){
        $scope.shouldShowResult = false;
        $scope.info = {};
        $scope.captcha = {};
        $scope.table = {
            GListInfo:[]
        };

        $scope.formSubmitted = function(){

        };
        $scope.returnClicked = function(){
            $scope.shouldShowResult = false;
            $scope.info.captcha = "";
        };

        function GetCaptcha(){
            $http.get("/captcha").then(function(response){
                $scope.captcha.imgsrc = response.data.imgsrc;
                $scope.captcha.hash = response.data.hash;
            });
        }
    })
    .filter("percent",function(){
        return function(input) {
            if(typeof(input) === 'undefined' || input === null) {
                return "";
            } else if(input.isNumber()){
                return input*100 + "%";
            } else {
                return input;
            }
        }
    });