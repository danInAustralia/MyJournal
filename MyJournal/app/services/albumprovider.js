//(function () {
angular.module('Journal.AlbumProvider', [])
    .service('albumProvider', ['$http', 'FileUploader', function albumProvider($http, FileUploader) {

        this.getUploader = function (album_name, scope) {
            // create a uploader with options
            var uploader = new FileUploader({
                scope: scope,
                method: "PUT",
                url: "/api/albums/Upload?albumID=" + album_name
            });
            return uploader;
            //return $fileUploader.create({
            //    scope: scope,
            //    method: "PUT",
            //    url: "/api/albums/Upload?albumID=" + album_name
            //});
        };

        this.getAlbums = function (callback) {
            $http.get("/api/albums")
                .then(function (response) {
                    callback(null, response.data);
                },
                function (response) {
                    // just send back the error
                    callback(response.data);
                });
        };

        this.addAlbum = function (album_data, callback) {

            if (!album_data.Name) return callback({code: "missing_title"});
            if (!album_data.Description) return callback({code:"missing_description"});
            if (!album_data.AlbumDate) return callback({ code: "bad_date" });

            //var d = new Date(album_data.date.trim());
            //if (isNaN(d.getTime())) throw new Error("bad_date");

            //$http.put("/api/PostAlbum/", album_data)
            $http.post("/api/albums/PostAlbum/", album_data)
                .then(function (response) {
                    callback(null, response.data);
                },
                function (data, status, headers, conf) {
                    // just send back the error
                    callback(data);
                });
        };

        this.getAlbumByName = function (name, callback) {
            $http.get("/api/albums/" + name)
                .then(function (response) {
                    callback(null, response.data);
                },
                function (data, status, headers, conf) {
                    // just send back the error
                    callback(data);
                });
        };

        this.getAlbumResources = function (name, pageNumber, callback) {
            $http.get("/api/albums/AlbumResources", { params: { AlbumID: name, PageNumber: pageNumber } })
                .then(function (response) {
                    callback(null, response.data);
                },
                function (data, status, headers, conf) {
                    // just send back the error
                    callback(data);
                });
        };

        this.doesMd5Exist = function (md5, callback) {
            $http.get("/api/resources/" + md5)
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                })
                .error(function (data, status, headers, conf) {
                    // just send back the error
                    callback(data);
                });
        };

    }]);


    //photoApp.service("albumProvider", albumProvider);

dateTimeReviver = function (key, value) {
    var a;
    if (typeof value === 'string') {
        a = /\/Date\((\d*)\)\//.exec(value);
        if (a) {
            return new Date(+a[1]);
        }
    }
    return value;
}