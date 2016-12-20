﻿//(function () {
angular.module('Journal.AlbumProvider', [])
    .service('albumProvider', ['$http', '$fileUploader', function albumProvider($http, $fileUploader) {

        this.getUploader = function (album_name, scope) {
            // create a uploader with options
            return $fileUploader.create({
                scope: scope,
                method: "PUT",
                url: "/api/albums/Upload?id=" + album_name
            });
        };

        this.getAlbums = function (callback) {
            $http.get("/api/albums")
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                })
                .error(function (data, status, headers, conf) {
                    // just send back the error
                    callback(data);
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
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                })
                .error(function (data, status, headers, conf) {
                    // just send back the error
                    callback(data);
                });
        };

        this.getAlbumByName = function (name, callback) {
            $http.get("/api/albums/" + name)
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