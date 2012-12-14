    //
    // Todo Item view
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
            this.$el.html(this.model.get("Description") + " &nbsp;&nbsp <span class='delete'>[delete]</span>"
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
            this.remove();  // <--- Deletes the list item
        },

        moveUp: function() {

        },

        moveDown: function() {

        },

        complete: function() {

        }

    });

    ///////// For the model
    idAttribute: "TodoID", // <--- Use this to map the id to an id column in the db
    initialize: function () {
        this.bind('change', this.save);
    }