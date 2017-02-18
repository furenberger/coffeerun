/**
 * Created by ryanfurness on 02/14/17.
 */
(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    CheckList.prototype.addRow = function(coffeeOrder){
        if(!coffeeOrder.emailAddress){
            return;
        }

        //DO WE AHVE A DUPE
        this.removeRow(coffeeOrder.emailAddress);

        //new row
        var rowElement = new Row(coffeeOrder);

        //add to UI
        this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function(email){
      this.$element
          .find('[value="' + email + '"]')
          .closest('[data-coffee-order="checkbox"]')
          .remove();
    };

    function Row(coffeeOrder){
        var $div = $('<div></div>',{
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
        });

        var $label = $('<label></label>');

        var $checkbox = $('<input></input>',{
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        });

        var description = coffeeOrder.size + ' ';
        if(coffeeOrder.flavor){
            description += coffeeOrder.flavor + ' ';
        }

        description += coffeeOrder.coffee + ', ';
        description += ' (' + coffeeOrder.emailAddress + ') ';
        description += ' [' + coffeeOrder.strength + 'x]';

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }

    CheckList.prototype.addClickHandler = function (fn) {
        console.log('Setting click handler for checklist');

        if (!fn) {
            throw new Error('No fn provided');
        }

        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
            fn(email)
                .then(function(){
                    this.removeRow(email);
                }.bind(this))
        }.bind(this));
    };

    App.CheckList = CheckList;
    window.App = App;
})(window);