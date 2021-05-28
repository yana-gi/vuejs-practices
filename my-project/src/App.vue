<template>
  <div id="app">
    <div class="container">
      <h1>{{ modeList[mode] }}</h1>
      <div class="box is-mobile">
        <Memo v-for="memo in memoList" :key="memo.id"
              v-bind:id="memo.id" v-bind:body="memo.body"
              @selectMemo="doShowMemo"  ></Memo>
        <a @click="doChangeCreateMode">+</a>
        <div v-show="mode === 'show'">
          <textarea class="textarea" v-model="inputText"></textarea>
          <button class="button is-primary ">
            追加
          </button>
          <button class="button is-primary">削除</button>
        </div>
        <div v-show="mode === 'create'">
          <textarea class="textarea" v-model="inputText"></textarea>
          <button class="button is-primary " @click="doCreateMemo">
            登録
          </button>
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
      modeList: {'index':'一覧', 'show':'参照', 'create':'新規作成'},
      mode: 'index',
      editItemId: -1,
      inputText: '',
      memoList: []
    }
  },
  watch: {
    memoList: {
      handler(memoList) {
        memoStorage.save(memoList)
      },
      deep: true
    }
  },
  created() {
    this.memoList = memoStorage.fetch()
  },
  methods: {
    doShowMemo(id) {
      this.editItemId = id
      this.inputText = this.memoList.find((v) => v.id === id).body
      this.mode = 'show'
    },
    doChangeCreateMode() {
      this.inputText = ''
      this.mode = 'create'
    },
    doCreateMemo() {
      this.memoList.push({
        id: memoStorage.uid++,
        body: this.inputText
      })
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
