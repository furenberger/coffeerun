/**
 * Created by ryanfurness on 1/29/17.
 */
(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    var Validation = {
        isCompanyEmail: function(email){
            return /.+@bignerdranch\.com$/.test(email);
        },

        isDecaf: function(title, strength){
             if(title && title.toLowerCase().includes('decaf') && strength > 20) {
                 return false;
             }else{
                 return true;
             }
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);