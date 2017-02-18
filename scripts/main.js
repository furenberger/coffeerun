(function (window) {
    'use strict';
    var FORM_SELECTOR  = '[data-coffee-order="form"]';
    var RANGE_SELECTOR = '#strengthLevel';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';

    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var RangeHandler = App.RangeHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
    var remoteDS = new RemoteDataStore(SERVER_URL);

    var myTruck = new Truck('R2-D2', remoteDS);
    window.myTruck = myTruck;

    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(function(data){
        return myTruck.createOrder.call(myTruck,data)
            .then(function() {
                checkList.addRow.call(checkList, data);
            },
            function(){
                alert('Server unreachable. Try again later');
            });
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);
    myTruck.printOrders(checkList.addRow.bind(checkList));

    formHandler.addDecafHandler(Validation.isDecaf);

    var rangeHandler = new RangeHandler(RANGE_SELECTOR);
    rangeHandler.addRangeHandler();


})(window);

