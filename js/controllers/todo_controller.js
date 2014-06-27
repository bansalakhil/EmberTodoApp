Todos.TodoController = Ember.ObjectController.extend({
    isCompleted: function(key, value) {
        var model = this.get('model');

        if (value === undefined) {
            // property being used as a getter
            return model.get('isCompleted');
        } else {
            // property being used as a setter
            model.set('isCompleted', value);
            model.save();
            return value;
        }
    }.property('model.isCompleted'),

    isEditing: false,

    enableEditing: function(value) {
        this.set('isEditing', value);
    },

    actions: {
        editTodo: function() {
            this.enableEditing(true);
        },

        acceptChanges: function(value) {
            this.enableEditing(false);

            if (Ember.isEmpty(this.get('model.title'))) {
                this.send('removeTodo');
            } else {
                this.get('model').save();
            }
        },

        removeTodo: function() {
            var todo = this.get('model');
            todo.deleteRecord();
            todo.save();
        }
    }


});