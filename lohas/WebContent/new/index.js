angular.module('ionicApp', ['ionic'])

    .controller('SlideController', function($scope,$ionicSlideBoxDelegate,$ionicActionSheet) {
        $scope.myActiveSlide = 0;
        $scope.title = "主页";
            $scope.nextSlide = function(a) {
                $ionicSlideBoxDelegate.slide(a);
                if(a==0){
                    $scope.title = "收藏";
                }
                if(a==1){
                    $scope.title = "主页";
                }
                if(a==2){
                    $scope.title = "我的";
                }
            }
        $scope.ti=function(b){
            $scope.title=b;
        }

        $scope.show = function() {

            // 显示操作表
            $ionicActionSheet.show({
                buttons: [
                    { text: '退 出' },
                    { text: '切换用户' },
                ],
                destructiveText: '反馈信息',
                titleText: '您好',
                cancelText: '关闭',
                buttonClicked: function(index) {
                    return true;
                }
            });

        };
    })