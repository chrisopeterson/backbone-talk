//
// Backbone JS TODO Example App - Part 3
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
    // Todo Itemn view
    //
    var TodoItemView = Backbone.View.extend({
        tagName: "li",

        initialize: function(todo) {
            // Use underscore bindall function to bind all 'this' references to the current view
            _.bindAll(this, 'render', 'delete');

            this.model = todo;
            this.render();
        },

        events: {
            "click span": "delete"
        },

        render: function() {
            this.$el.html(this.model.get("Description") + " &nbsp;&nbsp <span class='delete'>[delete]<span></li>");
        },

        delete: function() {
            this.model.destroy(); // <--- Removes model from collection
            this.remove();  // <--- Deletes the list item
        }
    });

    var TodoCountView = Backbone.View.extend({
        initialize: function (collection) {
            // Use underscore bindall function to bind all 'this' references to the current view
            _.bindAll(this, 'render');

            this.collection = collection;
            this.collection.bind('add remove', this.render);

            this.render();
        },

        render: function() {
            this.$el.html("Count: " + this.collection.length);
        }
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
            this.$el.append(new TodoCountView(this.collection).el);
        },

        addToDo: function() {
            var desc = $("input").val();
            var todo = new Todo({ Description: desc });
            this.collection.add(todo);
        },

        appendToDo: function (todo) {
            $("ul#todo-list").append(new TodoItemView(todo).el);
        }

    });

    // Away we go...
    var App = new AppView();
});