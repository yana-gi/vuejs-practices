/* eslint-disable no-console */

var STORAGE_KEY = 'todos_storage'
var todoStorage = {
    fetch: function() {
        var todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        )
        todos.forEach(function(todo, index) {
            todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}

var app = new Vue({
    el: '#app',
    data: {
        todos: []
    },
    watch: {
        todos: {
            handler: function (todos) {
                todoStorage.save(todos)
            },
            deep: true
        }
    },
    created() {
        this.todos = todoStorage.fetch()
    },
    methods: {
        doAdd: function(event, value) {
            var comment = this.$refs.comment
            if (!comment.value.length) {
                return
            }
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                editMode: false
            })
            comment.value = ''
        },
        toOnEditMode: function(item) {
            item.editMode = true
        },
        toOffEditMode: function(item) {
            item.editMode = false
        },
        doChangeComment: function (item, index) {
            var comment = this.$refs.newComment[index]
            if (!comment.value.length) {
                item.editMode = false
                return
            }
            item.comment = comment.value
            item.editMode = false
        },
        doRemove: function (item) {
            var index = this.todos.indexOf(item)
            this.todos.splice(index,1)
        }
    }
})
