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



        ///// COMPARATOR for TodoCollection
        comparator: function (todo) {
            return -todo.get('Order');
        }