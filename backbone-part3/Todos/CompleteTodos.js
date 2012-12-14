//
// Backbone JS TODO Example App - Part 3
//

$(document).ready(function () {

    var Todo = Backbone.Model.extend({
        defaults: {
            Description: "",
            Order: 0,
            IsComplete: false
        },
        idAttribute: "TodoID",
        initialize: function() {
            this.bind('change', this.save);
        }
    });

    // An ordered set of todos
    var TodoCollection = Backbone.Collection.extend({
        model: Todo,
        url: 'api/Todo',
        comparator: function (todo) {
            return -todo.get('Order');
        }
    });

    //
    // Todo Itemn view
    //
    var TodoItemView = Backbone.View.extend({
        tagName: "li",

        initialize: function(todo) {
            // Use underscore bindall function to bind all 'this' references to the current view
            _.bindAll(this, 'render', 'delete', 'moveUp', 'moveDown', 'complete');

            this.model = todo;
            this.render();
        },

        events: {
            "click span.delete": "delete",
            "click span.up" : "moveUp",
            "click span.down":"moveDown",
            "click input.complete" : "complete"
        },

        render: function() {
            this.$el.html(this.model.get("Order") + " - " + this.model.get("Description") + " &nbsp;&nbsp <span class='delete'>[delete]</span>"
                + " &nbsp;&nbsp <span class='up'>[up]</span>"
                + " &nbsp;&nbsp <span class='down'>[down]</span>"
                + " &nbsp;&nbsp <input type='checkbox' class='complete' " + this.isChecked(this.model.get("IsComplete")) + " />");
        },

        isChecked: function(IsComplete) {
            if(IsComplete) return "checked";
            else return "";
        },

        delete: function() {
            this.model.destroy(); // <--- Removes model from collection
            this.remove();  // <--- Deletes this view
        },

        moveUp: function() {
            this.model.set({ Order: this.model.get("Order") + 1 });
        },

        moveDown: function() {
            this.model.set({ Order: this.model.get("Order") - 1 });
        },

        complete: function() {
            this.model.set({ IsComplete: !this.model.get("IsComplete")});
        }

    });

    var TodoCountView = Backbone.View.extend({
        initialize: function (collection) {
            // Use underscore bindall function to bind all 'this' references to the current view
            _.bindAll(this, 'render');

            this.collection = collection;
            this.collection.bind('add remove change', this.render);

            this.render();
        },

        render: function() {
            this.$el.html("Count: " + this.collection.length + " Complete: " + this.collection.where({IsComplete: true}).length);
        }
    });
    
    //
    // Main App View
    var AppView = Backbone.View.extend({
    // 

        el: $("#todos"), // <--- Element in the DOM that this view is anchored to

        initialize: function () {
            // Use underscore bindall function to bind all 'this' references to the current view
            _.bindAll(this, 'render', 'addToDo', 'appendToDo', 'loadCollection', 'loadTodos');

            // Setup collection and bind events
            this.collection = new TodoCollection();
            this.collection.bind('add', this.appendToDo);
            this.collection.bind('change', this.loadTodos);

            this.loadCollection();
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

        loadCollection: function() {
            // Force the collection to finish fetching then render
            var self = this;
            this.collection.fetch().complete(function() {
                self.render(); 
                self.loadTodos();
            }); 
        },

        loadTodos: function() {
            this.collection.sort();
            $("ul#todo-list").html("");

            // Scope the this variable
            var self = this;
            this.collection.each(function(todo) {
                self.appendToDo(todo); 
            });
        },

        addToDo: function() {
            var desc = $("input").val();
            var todo = new Todo({ Description: desc });
            this.collection.create(todo);
        },

        appendToDo: function (todo) {
            $("ul#todo-list").append(new TodoItemView(todo).el);
        }

    });

    // Away we go...
    var App = new AppView();
});