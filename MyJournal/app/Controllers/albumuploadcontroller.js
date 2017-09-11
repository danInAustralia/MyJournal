angular.module('Journal.AlbumUploadController', [])
.controller('AlbumUploadController', ['$scope', '$http', 'albumProvider', function ($scope, $http, albumProvider) {
    
    $scope.page_load_error = "";
    $scope.done_uploading = false;

    $scope.init = function (albumName) {
        $scope.album_name = albumName;

        $scope.uploader = albumProvider.getUploader($scope.album_name, $scope);
        //albumProvider.getAlbumByName(albumName, function (err, album) {
        //    if (err) {
        //        if (err.error == "not_found")
        //            $scope.page_load_error = "No such album. Are you calling this right?";
        //        else
        //            $scope.page_load_error = "Unexpected error loading albums: " + err.message;
        //    } else {
        //        $scope.album = album;
        //    }
        //});
        $scope.uploader.onCompleteall = function () {
            $scope.done_uploading = true;
        };


        $scope.uploadFiles = function () {
            $scope.uploader.uploadAll();
        }

        $scope.uploader.onAfterAddingFile = function (item) {
            item.uploadStatus = 'Pending';
            $scope.uploadStatus[item.file.name] = 'Pending';
        }

        // FOR DESCRIPTIONS
        $scope.descriptions = {};
        $scope.uploadStatus = {};
        $scope.uploader.onBeforeUploadItem = function (item) {
            var fn = item.file.name;
            var d = item.file.lastModifiedDate;


            //var reader = new FileReader();
            //reader.onloadend = function () {
            //    var text = (reader.result);

            //    var binary = "";
            //    var bytes = new Uint8Array(text);
            //    var length = bytes.byteLength;
            //    for (var i = 0; i < length; i++) {
            //      binary += String.fromCharCode(bytes[i]);
            //    }

            //    var hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(binary));
            //    var hashStr = hash.toString();
            //}
            //reader.readAsArrayBuffer(item._file);
            //var wordArray = CryptoJS.lib.WordArray.create();
            //console.log(CryptoJS.MD5(wordArray));

            item.formData = [{
                filename: _fix_filename(item.file.name),
                description: $scope.descriptions[item.file.name],
                date: d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate()
            }];
        };

        $scope.uploader.onSuccessItem = function(item, response, status, headers) {
            //---verify MD5 of items
            var reader = new FileReader();
            reader.onloadend = function () {
                var text = (reader.result);

                var binary = "";
                var bytes = new Uint8Array(text);
                var length = bytes.byteLength;
                for (var i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }

                var hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(binary));
                var hashStr = hash.toString();
                if(hashStr === response.Md5)
                {
                    item.uploadStatus = 'Success';
                    $scope.uploadStatus[item.file.name] = 'Success';
                }
                else
                {
                    item.uploadStatus = 'Md5 mismatch';
                }
            }
            reader.readAsArrayBuffer(item._file);
            //---

        };

        $scope.uploader.onErrorItem = function (item, response, status, headers) {
            //verify MD5 of items
            //$http.get().success(){}
            var fn = item.file.name;
        };

    }






    /**
 * we'll be super fussy and only allow alnum, -, _, and .
 */
    function _fix_filename(fn) {
        if (!fn || fn.length == 0) return "unknown";

        var r = new RegExp("^[a-zA-Z0-9\\-_.]+$");
        var out = "";

        for (var i = 0; i < fn.length; i++) {
            if (r.exec(fn[i]) != null)
                out += fn[i];
        }

        if (!out) out = "unknown_" + (new Date()).getTime();
        return out;
    }
}]);