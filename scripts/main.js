(function (window) {
    'use strict';
    var FORM_SELECTOR  = '[data-coffee-order="form"]';
    var RANGE_SELECTOR = '#strengthLevel';

    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var RangeHandler = App.RangeHandler;

    var myTruck = new App.Truck('R2-D2', new App.DataStore());
    window.myTruck = myTruck;

    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));

    var rangeHandler = new RangeHandler(RANGE_SELECTOR);
    rangeHandler.addRangeHandler();


})(window);

