//
// Backbone JS TODO Example App - Part 2
//

$(document).ready(function () {

    var Todo = Backbone.Model.extend({
        defaults: {
            Description: ""
        }
    });

    // An ordered set of todos
    var TodoCollection = Backbone.Collection.extend({
        model: Todo
    });
    
    //
    // Main App View
    // 
    var AppView = Backbone.View.extend({

        el: $("#todos"), // <--- Element in the DOM that this view is anchored to

        initialize: function () {
            // Use underscore bindall function to bind all 'this' references to the current view
            _.bindAll(this, 'render', 'addToDo', 'appendToDo');

            // Setup collection and bind events
            this.collection = new TodoCollection();
            this.collection.bind('add', this.appendToDo);

            this.render();
        },

        events: {
            "click button" : "addToDo"
        },

        render: function () {
            this.$el.append("<input id='todo-text' />");
            this.$el.append("<button id='add-todo'>Add item</button>");
            this.$el.append("<ul id='todo-list'></ul>");
        },

        addToDo: function() {
            var desc = $("input").val();
            var todo = new Todo({ Description: desc });
            this.collection.add(todo);
        },

        appendToDo: function (todo) {
            $("ul#todo-list").append("<li>" + todo.get("Description") + "</li>");
        }

    });

    // Away we go...
    var App = new AppView();
});