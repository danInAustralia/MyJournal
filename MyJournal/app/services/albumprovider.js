//(function () {
angular.module('Journal.AlbumProvider', [])
    .service('albumProvider', ['$http', '$fileUploader', function albumProvider($http, $fileUploader) {

        this.getUploader = function (album_name, scope) {
            // create a uploader with options
            return $fileUploader.create({
                scope: scope,
                method: "PUT",
                url: "/api/albums/" + album_name + "/photos.json"
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

            if (!album_data.title) throw new Error("missing_title");
            if (!album_data.description) throw new Error("missing_description");
            if (!album_data.date) throw new Error("bad_date");

            var d = new Date(album_data.date.trim());
            if (isNaN(d.getTime())) throw new Error("bad_date");

            $http.put("/v1/albums.json", album_data)
                .success(function (data, status, headers, conf) {
                    callback(null, data);
                })
                .error(function (data, status, headers, conf) {
                    // just send back the error
                    callback(data);
                });
        };

        this.getAlbumByName = function (name, callback) {
            $http.get("/v1/albums/" + name + "/photos.json")
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