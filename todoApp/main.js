/* eslint-disable no-console */

var STORAGE_KEY = 'todos_storage'
var todoStorage = {
    fetch() {
        var todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        )
        todos.forEach((todo, index) => {
            todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
    },
    save(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}

let app = new Vue({
    el: '#app',
    data: {
        todos: []
    },
    watch: {
        todos: {
            handler(todos) {
                todoStorage.save(todos)
            },
            deep: true
        }
    },
    created() {
        this.todos = todoStorage.fetch()
    },
    methods: {
        doAdd(event, value) {
            const comment = this.$refs.comment;
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
        doChangeComment(item, index) {
            const comment = this.$refs.newComment[index]
            if (!comment.value.length) {
                item.editMode = false
                return
            }
            item.comment = comment.value
            item.editMode = false
        },
        doRemove(item) {
            const index = this.todos.indexOf(item)
            this.todos.splice(index, 1)
        }
    }
})
