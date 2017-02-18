(function (window) {
    'use strict';
    var FORM_SELECTOR  = '[data-coffee-order="form"]';
    var RANGE_SELECTOR = '#strengthLevel';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';

    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var RangeHandler = App.RangeHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;

    var myTruck = new Truck('R2-D2', new DataStore());
    window.myTruck = myTruck;

    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(function(data){
        myTruck.createOrder.call(myTruck,data);
        checkList.addRow.call(checkList,data);
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);
    formHandler.addDecafHandler(Validation.isDecaf);

    var rangeHandler = new RangeHandler(RANGE_SELECTOR);
    rangeHandler.addRangeHandler();


})(window);

