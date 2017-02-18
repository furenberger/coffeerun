/**
 * Created by ryanfurness on 2/18/17.
 */
(function(window){
    'use strict';
    //the codes
    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDataStore(url){
        if(!url){
            throw new Error('No remote URL supplied.');
        }
        this.serverUrl = url;
    }

    RemoteDataStore.prototype.add = function (key, value){
        return $.post(this.serverUrl, value, function(serverResponse){
            console.log(serverResponse);
        });
    };

    RemoteDataStore.prototype.getAll = function (callBack) {
        return $.get(this.serverUrl,function(serverResponse){
            if(callBack) {
                console.log(serverResponse);
                callback(serverResponse);
            }
        })
    };

    RemoteDataStore.prototype.get = function (key, callBack) {
        return $.get(this.serverUrl + '/' + key,function(serverResponse){
            if(callBack) {
                console.log(serverResponse);
                callback(serverResponse);
            }
        })
    };

    RemoteDataStore.prototype.remove = function (key) {
        return $.ajax(this.serverUrl + '/' + key, {
            type: 'DELETE'
        });
    };



    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window);
