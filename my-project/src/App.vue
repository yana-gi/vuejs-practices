<template>
  <div id="app">
    <div class="container">
      <h1>{{ title }}</h1>
      <div class="box is-mobile">
        <Memo v-for="memo in memos" :key="memo.id"
              v-bind:id="memo.id" v-bind:body="memo.body"
              @selectMemo="showMemo"  ></Memo>
        <a href="">+</a>
        <div v-show="editItemId !== -1">
          <div class="edit">
            <textarea class="textarea" v-model="inputText"></textarea>
            <button class="button is-primary">編集</button>
            <button class="button is-primary">削除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Memo from './components/Memo.vue'

var STORAGE_KEY = 'memo_storage'
var memoStorage = {
  fetch() {
    var memoList = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]'
    )
    memoList.forEach((memo, index) => {
      memo.id = index
    })
    memoStorage.uid = memoList.length
    return memoList
  },
  save(memoList) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memoList))
  }
}

export default {
  name: 'App',
  components: {
    Memo
  },
  data(){
    return {
      title: 'タイトル',
      editItemId: -1,
      inputText: '',
      memos: []
    }
  },
  watch: {
    memos: {
      handler(memo) {
        memoStorage.save(memo)
      },
      deep: true
    },
    editItemId: function (id) {
      this.inputText = this.memos.find((v) => v.id === id).body
    }
  },
  methods: {
    showMemo: function (id) {
      this.editItemId = id
    }
  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css";
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
