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
        todos: [],
        editItemId: -1,
        newComment: ""
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
                comment: comment.value
            })
            comment.value = ''
        },
        doChangeComment(item) {
            const comment = this.newComment
            item.comment = comment
            this.editItemId = -1
        },
        doRemove(item) {
            const index = this.todos.indexOf(item)
            this.todos.splice(index, 1)
        },
        doStartEdit(item) {
            this.editItemId = item.id
            this.newComment = item.comment
        },
        doEndEdit() {
            this.editItemId = -1
        }
    }
})
