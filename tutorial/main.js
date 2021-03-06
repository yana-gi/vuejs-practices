var STORAGE_KEY = 'todos-vuejs-demo'
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
        todos: [],
        // 洗濯しているoptionsのvalueを記憶するためのデータ
        // 初期値を -1(=すべて) にする
        current: -1,
        options: [
            { value: -1, label: 'すべて' },
            { value: 0,  label: '作業中' },
            { value: 1,  label: '完了' }
        ]
    },
    // 算出プロパティ
    // dataと似た様に扱うことができる、関数によって算出されたデータ
    computed: {
        computedTodos: function() {
            return this.todos.filter(function(el) {
                // データcurrentが-1ならすべて
                // それ以外ならcurrent と state が一致するものだけ絞り込む
                return this.current < 0 ? true : this.current === el.state
            }, this)
        },
        labels(){
            // キーから見つけやすいように、次のように加工したデータを作成
            // {0: '作業中', 1: '完了', -1: 'すべて'}
            return this.options.reduce(function(a,b) {
                return Object.assign(a,{ [b.value]: b.label })
            },{})
        }
    },
    // ウォッチャ：データの変化に反応して、登録しておいた処理を自動的に行う
    // 次の場合、todosが変化した場合、ストレージを保存する
    watch: {
        todos: {
            handler: function(todos) {
                todoStorage.save(todos)
            },
            // deepオプション：ネストされたオブジェクトも監視する
            deep: true
        }
    },
    // Vueインスタンス作成時に自動的にfetch()する（データを読み込む）
    // createdの様なライフサイクルフックメソッドの定義はmethodの中ではない
    created() {
        this.todos = todoStorage.fetch()
    },
    methods:{
        doAdd: function(event, value) {
            // ref属性で名前をつけた要素をは$refsで取得できる
            // メソッド内はthisを付ける必要がある
            var comment = this.$refs.comment
            if (!comment.value.length) {
                return
            }
            // { 新しいID, コメント, 作業状態 } というオブジェクトをpush
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })
            // フォーム要素をからにする
            comment.value = ''
        },
        // 状態変更の処理
        doChangeState: function(item) {
            item.state = item.state ? 0 : 1
        },
        // 削除の処理
        doRemove: function (item) {
            var index = this.todos.indexOf(item)
            this.todos.splice(index,1)
        }
    }
})
