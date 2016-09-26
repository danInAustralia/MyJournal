angular.module('Journal.AlbumUploadController', [])
.controller('AlbumUploadController', ['$scope', '$http', function ($scope, $http) {
    $http.get('/Projects/PendingVM').success(function (data) {
        $scope.model = data
    });
    $scope.approveProject = function (project) {
        $http.post('/Projects/ApproveProject', project).success(function (data) {
            $scope.model.Projects.splice($scope.model.Projects.indexOf(project), 1)
        });
    };
}]);