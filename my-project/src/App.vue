<template>
  <div id="app">
    <div class="container">
      <h1 class="title">{{ modeList[mode] }}</h1>
      <div class="box is-mobile">
        <div>
          <a v-for="memo in memoList" :key="memo.id" @click="doShowMemo(memo)">
            {{ firstMemoLine(memo.body) }}
            <br>
          </a>
        </div>
        <div>
          <a @click="doChangeCreateMode">+ 新規作成</a>
        </div>
        <div v-show="mode !== 'index'">
          <EditForm v-bind:mode="mode" v-bind:body="editMemo.body"
                    @click-edit="doChangeMemo"
                    @click-remove="doRemoveMemo"
                    @click-create="doCreateMemo"></EditForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditForm from './components/EditForm.vue'

const STORAGE_KEY = 'memo_storage'
const memoStorage = {
  fetch() {
    let memoList = JSON.parse(
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
    EditForm
  },
  data() {
    return {
      modeList: {'index': '一覧', 'show': '参照', 'create': '新規作成'},
      mode: 'index',
      editMemo: { id: -1, body: '' },
      memoList: []
    }
  },
  computed:{
    firstMemoLine() {
      return body => body.split('\n')[0]
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
    doShowMemo(memo) {
      this.editMemo = memo
      this.mode = 'show'
    },
    doChangeCreateMode() {
      this.editMemo = { id: -1, body: '' }
      this.mode = 'create'
    },
    doCreateMemo(inputText) {
      this.memoList.push({
        id: memoStorage.uid++,
        body: inputText
      })
      this.mode = 'index'
    },
    doChangeMemo(inputText) {
      this.$set(this.editMemo, 'body', inputText)
    },
    doRemoveMemo() {
      this.memoList = this.memoList.filter(memo => memo !== this.editMemo)
      this.mode = 'index'
    }
  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css";

.title {
  margin-top: 1.5rem;
}
.container {
  margin: 0 100px;
}
</style>
