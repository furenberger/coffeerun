/**
 * Created by ryanfurness on 1/29/17.
 */
(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function RangeHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$rangeElement = $(selector);
        if (this.$rangeElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    RangeHandler.prototype.addRangeHandler = function (fn) {
        console.log('Setting range handler for range');

        this.$rangeElement.on('change', function (event) {
            strengthChange(this.value);

        });

        this.$rangeElement.on('input', function (event) {
            strengthChange(this.value);
        });

    };

    function strengthChange(value){
        if(value <= 25){
            $('#strengthValue').removeClass();
        }else if(value > 25 && value <= 50){
            $('#strengthValue').addClass('bg-info');
        }else if(value > 50 && value <= 75){
            $('#strengthValue').addClass('bg-warning');
        }else{
            $('#strengthValue').addClass('bg-danger');
        }
        $('#strengthValue').text(value);
    }

    App.RangeHandler = RangeHandler;
    window.App = App;
})(window);