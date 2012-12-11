//
// Backbone JS TODO Example App - Start
//

$(document).ready(function () {

    /*
    var Todo = Backbone.Model.extend({
        defaults: {
            Description: ""
        }
    });

    var TodoCollection = Backbone.Collection.extend({
        model: Todo
    });
    */

    //
    // Main App View
    // 
    var AppView = Backbone.View.extend({

        el: $("#todos"), // <--- Element in the DOM that this view is anchored to

        initialize: function () {
            // Use underscore bindall function to bind all 'this' references to the current view
            _.bindAll(this, 'render');

            this.render();
        },

        render: function () {
            this.$el.append("<input id='todo-text' />");
            this.$el.append("<button id='add-todo'>Add item</button>");
            this.$el.append("<ul id='todo-list'></ul>");
        }

    });

    // Away we go...
    var App = new AppView();
});