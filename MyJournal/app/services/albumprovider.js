//(function () {
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

        this.getTestAlbum = function () {
            var album = {
                "ID": 6,
                "Name": "4 Silvertop Terrace",
                "Description": "pictures of the house",
                "AlbumDate": "0001-01-01T00:00:00.000Z",
                "Resources": [
                   {
                       "Md5": "14322636150c20fae45b45388c3a2c0a",
                       "OriginalFileName": "house silvertop advert.zip",
                       "Type": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 2,
                               "unwrap": false,
                               "_entityName": "ResourceModel.ResourceType",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       },
                       "Tags": [

                       ],
                       "Description": null,
                       "Date": null,
                       "Owner": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 2,
                               "unwrap": false,
                               "_entityName": "ResourceModel.User",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       }
                   },
                   {
                       "Md5": "d53b47bb32ce0459e6ad1db654c72079",
                       "OriginalFileName": "image2.jpg",
                       "Type": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 1,
                               "unwrap": false,
                               "_entityName": "ResourceModel.ResourceType",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       },
                       "Tags": [

                       ],
                       "Description": null,
                       "Date": "2017-04-10T12:45:40.000Z",
                       "Owner": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 2,
                               "unwrap": false,
                               "_entityName": "ResourceModel.User",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       }
                   },
                   {
                       "Md5": "590105f79b97f6b2aa1cfdd66dd07c03",
                       "OriginalFileName": "image3.jpg",
                       "Type": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 1,
                               "unwrap": false,
                               "_entityName": "ResourceModel.ResourceType",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       },
                       "Tags": [

                       ],
                       "Description": null,
                       "Date": "2017-04-10T12:45:46.000Z",
                       "Owner": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 2,
                               "unwrap": false,
                               "_entityName": "ResourceModel.User",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       }
                   },
                   {
                       "Md5": "1e6d4afcd7b4659afae215b7b9ac6f9e",
                       "OriginalFileName": "image4.jpg",
                       "Type": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 1,
                               "unwrap": false,
                               "_entityName": "ResourceModel.ResourceType",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       },
                       "Tags": [

                       ],
                       "Description": null,
                       "Date": "2017-04-10T12:45:51.000Z",
                       "Owner": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 2,
                               "unwrap": false,
                               "_entityName": "ResourceModel.User",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       }
                   },
                   {
                       "Md5": "eb120cba4d14fa5bdd192a928b7b47df",
                       "OriginalFileName": "image5.jpg",
                       "Type": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 1,
                               "unwrap": false,
                               "_entityName": "ResourceModel.ResourceType",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       },
                       "Tags": [

                       ],
                       "Description": null,
                       "Date": "2017-04-10T12:45:56.000Z",
                       "Owner": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 2,
                               "unwrap": false,
                               "_entityName": "ResourceModel.User",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       }
                   },
                   {
                       "Md5": "e1adaa92fe1557fb77dd1242b5c52e2c",
                       "OriginalFileName": "image6.jpg",
                       "Type": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 1,
                               "unwrap": false,
                               "_entityName": "ResourceModel.ResourceType",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       },
                       "Tags": [

                       ],
                       "Description": null,
                       "Date": "2017-04-10T12:46:00.000Z",
                       "Owner": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 2,
                               "unwrap": false,
                               "_entityName": "ResourceModel.User",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       }
                   },
                   {
                       "Md5": "d761907176ae89bab1a6b87fab742aec",
                       "OriginalFileName": "image7.jpg",
                       "Type": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 1,
                               "unwrap": false,
                               "_entityName": "ResourceModel.ResourceType",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       },
                       "Tags": [

                       ],
                       "Description": null,
                       "Date": "2017-04-10T12:46:05.000Z",
                       "Owner": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 2,
                               "unwrap": false,
                               "_entityName": "ResourceModel.User",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       }
                   },
                   {
                       "Md5": "42afa65dd6d3ebbdbb5e654fea059d72",
                       "OriginalFileName": "image8.jpg",
                       "Type": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 1,
                               "unwrap": false,
                               "_entityName": "ResourceModel.ResourceType",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       },
                       "Tags": [

                       ],
                       "Description": null,
                       "Date": "2017-04-10T12:46:10.000Z",
                       "Owner": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 2,
                               "unwrap": false,
                               "_entityName": "ResourceModel.User",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       }
                   },
                   {
                       "Md5": "0be119cea69378d2ea0f8e9172b0537a",
                       "OriginalFileName": "image9.jpg",
                       "Type": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 1,
                               "unwrap": false,
                               "_entityName": "ResourceModel.ResourceType",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       },
                       "Tags": [

                       ],
                       "Description": null,
                       "Date": "2017-04-10T12:46:15.000Z",
                       "Owner": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 2,
                               "unwrap": false,
                               "_entityName": "ResourceModel.User",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       }
                   },
                   {
                       "Md5": "8f2b82f3fba41dc743c0885a2716dc4c",
                       "OriginalFileName": "image10.jpg",
                       "Type": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 1,
                               "unwrap": false,
                               "_entityName": "ResourceModel.ResourceType",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       },
                       "Tags": [

                       ],
                       "Description": null,
                       "Date": "2017-04-10T12:46:20.000Z",
                       "Owner": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 2,
                               "unwrap": false,
                               "_entityName": "ResourceModel.User",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       }
                   },
                   {
                       "Md5": "6b2785f5ad88f5bc0f388913debcc116",
                       "OriginalFileName": "image11.jpg",
                       "Type": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 1,
                               "unwrap": false,
                               "_entityName": "ResourceModel.ResourceType",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       },
                       "Tags": [

                       ],
                       "Description": null,
                       "Date": "2017-04-10T12:46:26.000Z",
                       "Owner": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 2,
                               "unwrap": false,
                               "_entityName": "ResourceModel.User",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       }
                   },
                   {
                       "Md5": "48bce81492561dc79af6ff15a57d1d59",
                       "OriginalFileName": "image12 (1).jpg",
                       "Type": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 1,
                               "unwrap": false,
                               "_entityName": "ResourceModel.ResourceType",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       },
                       "Tags": [

                       ],
                       "Description": null,
                       "Date": "2017-04-10T12:46:31.000Z",
                       "Owner": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 2,
                               "unwrap": false,
                               "_entityName": "ResourceModel.User",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       }
                   },
                   {
                       "Md5": "76a5bee9141b52e68695c9ba20f9c29d",
                       "OriginalFileName": "main.jpg",
                       "Type": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.ResourceType",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 1,
                               "unwrap": false,
                               "_entityName": "ResourceModel.ResourceType",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.ResourceType, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       },
                       "Tags": [

                       ],
                       "Description": null,
                       "Date": "2017-04-10T12:46:41.000Z",
                       "Owner": {
                           "__interceptor": {
                               "persistentClass": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                               "getIdentifierMethod": {
                                   "Name": "get_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Int32 get_ID()",
                                   "Signature2": "System.Int32 get_ID()",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "setIdentifierMethod": {
                                   "Name": "set_ID",
                                   "AssemblyName": "ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                   "ClassName": "ResourceModel.User",
                                   "Signature": "Void set_ID(Int32)",
                                   "Signature2": "System.Void set_ID(System.Int32)",
                                   "MemberType": 8,
                                   "GenericArguments": null
                               },
                               "overridesEquals": false,
                               "componentIdType": null,
                               "_target": null,
                               "initialized": false,
                               "_id": 2,
                               "unwrap": false,
                               "_entityName": "ResourceModel.User",
                               "readOnly": false,
                               "readOnlyBeforeAttachedToSession": null
                           },
                           "__baseType": "ResourceModel.User, ResourceModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                           "__baseInterfaceCount": 1,
                           "__baseInterface0": "NHibernate.Proxy.INHibernateProxy, NHibernate, Version=4.0.0.4000, Culture=neutral, PublicKeyToken=aa95f207798dfdb4"
                       }
                   }
                ],
                "Owner": null
            };
            return album;
        }
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