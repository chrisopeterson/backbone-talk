// Backbone Js Todo app
// Reference below enables intellisense for backbone
/// <reference path="http://code.jquery.com/jquery-1.7.2.js" />
/// <reference path="http://documentcloud.github.com/backbone/backbone.js" />
/// <reference path="http://documentcloud.github.com/underscore/underscore.js" />
$(document).ready(function () {

    var Todo = Backbone.Model.extend({
        defaults: {
            Description: "",
            Order: 0,
            IsComplete: false
        },
        idAttribute: "TodoID", // <--- Use this to map the id to an id column in the db
        initialize: function () {
            this.bind('change', this.save);
        }
    });

    var TodoCollection = Backbone.Collection.extend({
        model: Todo,
        url: 'api/Todo',
        comparator: function (todo) {
            return -todo.get('Order');
        }
    });


    // Todo Item
    var TodoItem = Backbone.View.extend({
        tagName: "li",

        initialize: function () {
            // bindall events  so 'this' references the current view
            _.bindAll(this, 'render', 'remove', 'orderUp', 'orderDown');

        },

        render: function () {
            $(this.el).html(this.model.get("Description") + " &nbsp; &nbsp; <input type='checkbox' id='completed' /> &nbsp; &nbsp;"
                + "<span class='remove' style='cursor:pointer; color:red; font-family:sans-serif;'>[delete]</span>"
                + " &nbsp; &nbsp; <span class='up'>[UP]</span>"
                + " &nbsp; &nbsp; <span class='down'>[DOWN]</span>");
            return this;
        },

        events: {
            'click span.remove': 'remove',
            'click span.up': 'orderUp',
            'click span.down': 'orderDown'
        },

        remove: function () {
            this.model.destroy(); // <--- Removes model from collection
            $(this.el).remove();  // <--- Deletes the list item
        },

        orderUp: function () {
            this.model.set({ Order: this.model.get("Order") + 1 });
        },

        orderDown: function () {
            this.model.set({ Order: this.model.get("Order") - 1 });
        }
    })

    //
    // Main App View
    // 
    var AppView = Backbone.View.extend({

        el: $("#todos"),
        initialize: function () {
            // bindall events  so 'this' references the current view

            _.bindAll(this, 'render', 'addTodo', 'appendToDo');

            this.collection = new TodoCollection();
            //this.collection.reset(Todos);
            this.collection.bind('create', this.appendToDo);
            this.collection.bind('change', this.reset);

            this.render();
        },

        render: function () {
            this.$el.append("<input id='todo-text' />");
            this.$el.append("<button id='add-todo'>Add item</button>");
            this.$el.append("<ul id='todo-list'></ul>");
            this.collection.each(this.appendToDo);
        },

        events: {
            'click button#add-todo': 'addTodo'
        },

        addTodo: function () {
            var desc = $('input#todo-text').val();
            var todo = new Todo({ Description: desc });

            this.collection.create(todo);
        },

        appendToDo: function (todo) {
            var todoView = new TodoItem({ model: todo });
            $('ul#todo-list', this.el).append(todoView.render().el);
        }

    });

    var App = new AppView();

});