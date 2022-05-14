<template>
  <div id="word-main">
    <!-- 头部 -->
    <van-nav-bar
        title="单词快翻"
        
    />
    <!-- 中间主体 -->
    <div class="card" >
      <!-- 字体颜色没有变化 -->
      <input v-model="SearchWord" @click="SearchBox" class="SearchBox">
    </div>
    <div class="card-info">
      <p v-text="wordPromptShow"></p>
      <p v-text="wordTranslationShow"></p>
    </div>
    <!-- 按键部分 -->
    <div class="buttons">
      <van-button type="warning" style="width: 88px" @click="showWordTranslation">翻译</van-button>
      <van-button type="info" style="width: 88px" @click="CollectWord">收藏</van-button>
      <van-button type="primary" style="width: 88px" @click="getOneWord">认识</van-button>
    </div>
    <!-- 底部 -->
    <van-tabbar v-model="tabbar_active" @change="onTabBarChange">
      <van-tabbar-item name="home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item name="search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o">圈子</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
    <!-- 点开all后的内容 -->
    <van-popup v-model="popShow" round position="bottom" :style="{ height: '50%' }">
      <van-picker
          title="单词范围"
          show-toolbar
          :columns="columns"
          @confirm="onPopConfirm"
          @cancel="onPopCancel"
          @change="onPopChange"
      />
    </van-popup>

  </div>
</template>

<script>

export default {
  data() {
    return {
      SearchWord:'输入要查询单词',
      range: 'ALL',
      columns: ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],//单词开头选项
      tabbar_active: 'home',
      popShow: false, // 弹出框
      word: {
        wordId: '',//单词编号
        word: '',//单词内容
        wordPrompt: '',
        wordTranslation: ''//单词意思
      },
      wordPromptShow: '',
      wordTranslationShow: ''
    }
  },
  methods: {
    //显示单词
    getOneWord() {
      this.$http.get(`/word/getOne/${this.range}`).then(res => {
        this.wordPromptShow = ''
        this.wordTranslationShow = ''
        if (res.data.code === -1) {
          this.$toast("该范围单词集合为空")
          return false
        }
        this.word = res.data.word
      }).catch(err => {
        console.log(err)
      })
    },
    SearchBox(){
      this.SearchWord=''
    },
    CollectWord() {
      
    },
    showWordTranslation() {
      this.wordTranslationShow = this.word.wordTranslation
    },
    onClickLeft () {
      this.$toast('暂未开放')
    },
    /** 切换单词范围 */
    onClickRight () {
      this.popShow = !this.popShow
    },
    // 页面切换
    onTabBarChange (index) {
      if (index !== 1) {
        this.$toast('暂未开放')
        this.tabbar_active = 'home'
      }
    },
    onPopConfirm(value, index) {
      this.range = value
      this.popShow = false
      this.getOneWord()
    },
    onPopChange(picker, value, index) {
    },
    onPopCancel() {
      this.popShow = false
    }
  },
  mounted() {
    this.getOneWord()
  }
}
</script>

<style scoped>
/* 单词样式 */
#word-main {
  height: 100%;
  background-color: #f7f8fa;
}
.SearchBox{
  height: 25px;
  width: 280px;
}
  


/* 中间样式 */
.card {
  margin: 20px 15px 24px 15px;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 12px grey;
  text-align: center;
  font-size: larger;
}
.card-info {
  margin: 40px 15px 40px 15px;
  height: 220px;
  padding-top: 10px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 12px #ebedf0;
  text-align: center;
  white-space: pre-line;
}
/* 按键样式 */
.buttons {

  display: flex;
  justify-content: space-between;
  margin-left: 15px;
  margin-right: 15px;

}
</style>
