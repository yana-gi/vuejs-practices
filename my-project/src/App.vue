<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <Memo v-for="memo in memos"
          :key="memo.id"
          v-bind="memo" ></Memo>
  </div>
</template>

<script>
import Memo from './components/Memo.vue'

export default {
  name: 'App',
  components: {
    Memo
  },
  data(){
    return {
      title: 'タイトル',
      memo: { id: 1, body: 'メモ1' },
      memos: [
        { id: 1, body: 'メモ1' },
        { id: 2, body: 'メモ2' },
        { id: 3, body: 'メモ3' }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
