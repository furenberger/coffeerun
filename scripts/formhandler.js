/**
 * Created by ryanfurness on 1/29/17.
 */
(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$rangeElement = $(selector);
        if (this.$rangeElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function (fn) {
        console.log('Setting submit handler for form');

        if (!fn) {
            throw new Error('No fn provided');
        }

        this.$rangeElement.on('submit', function (event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });

            console.log(data);
            fn(data);
            this.reset();
            this.elements[0].focus();
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);