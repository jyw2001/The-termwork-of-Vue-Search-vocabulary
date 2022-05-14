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
      <van-button type="warning" class="button1" @click="showWordTranslation" v-if="FYflag">翻译</van-button>
      <van-button type="info" class="button2" @click="CollectWord" v-if="SCflag">收藏</van-button>
      <van-button type="primary" class="button2" @click="GetWord" v-if="RSflag">认识</van-button>
    </div>
    <!-- 底部 -->
    <van-tabbar v-model="active" @change="onTabBarChange">
    
      <van-tabbar-item name="search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item name="Shoucang" icon="star">收藏</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
    <!-- 点开all后的内容 -->
    <!-- <van-popup v-model="popShow" round position="bottom" :style="{ height: '50%' }">
      <van-picker
          title="单词范围"
          show-toolbar
          :columns="columns"
          @confirm="onPopConfirm"
          @cancel="onPopCancel"
          @change="onPopChange"
      />
    </van-popup> -->

  </div>
</template>

<script>
import { Toast } from "vant";
import { Notify } from 'vant';


export default {
  data() {
    return {
      SearchWord:'输入要查询单词',
      FYflag:true,
      SCflag:false,
      RSflag:false,
      TBflag:'search',
      
      active: 'search',
      range: 'ALL',
      columns: ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],//单词开头选项
      
      popShow: false, // 弹出框
      word: {
        wordId: '',//单词编号
        word: '',//单词内容
        wordPrompt: '',
        wordTranslation: ''//单词意思
      },
      wordPromptShow: '测试-英文',
      wordTranslationShow: '测试-翻译中文'
    }
  },
  methods: {
    //显示单词
    // getOneWord() {
    //   this.$http.get(`/word/getOne/${this.range}`).then(res => {
    //     this.wordPromptShow = ''
    //     this.wordTranslationShow = ''
    //     if (res.data.code === -1) {
    //       this.$toast("该范围单词集合为空")
    //       return false
    //     }
    //     this.word = res.data.word
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    SearchBox(){
      this.SearchWord=''
    },
    GetWord(){
      if(this.TBflag=='search'){
        this.FYflag=true;
        this.SCflag=false;
        this.RSflag=false;
      }
      else{
        this.FYflag=false;
        this.SCflag=true;
        this.RSflag=true;
      }
    },
    CollectWord() {
      if(this.TBflag=='search'){
        this.FYflag=true;
        this.SCflag=false;
        this.RSflag=false;
      }
      else{
        this.FYflag=false;
        this.SCflag=true;
        this.RSflag=true;
      }

    },
    showWordTranslation() {
        this.FYflag=false;
        this.SCflag=true;
        this.RSflag=true;


      
    },

    // onClickLeft () {
    //   this.$toast('暂未开放')
    // },
    /** 切换单词范围 */
    // onClickRight () {
    //   this.popShow = !this.popShow
    // },
    // 页面切换
    onTabBarChange (index) {
      if(index=="setting"){
        Notify({ type: 'primary', message: '未开放' });
        return this.active="search";
      }
      else if(index=='search'){
        this.FYflag=true;
        this.SCflag=false;
        this.RSflag=false;
      }
      else{
        this.FYflag=false;
        this.SCflag=true;
        this.RSflag=true;
      }
      this.active=index;
      this.TBflag=index;
      
    },
    // onPopConfirm(value, index) {
    //   this.range = value
    //   this.popShow = false
    //   this.getOneWord()
    // },
    // onPopChange(picker, value, index) {
    // },
    // onPopCancel() {
    //   this.popShow = false
    // }
  },
  mounted() {
    this.GetWord()
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
  width:80%;
}
  


/* 中间样式 */
.card {
  margin: 20px 15px 24px 15px;
  padding: 24px;
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


}
.button1{
  margin-left: 40%;
  width: 88px
}
.button2{
  width: 88px;
  margin-left: 50px;
  margin-right: 50px;


}
</style>
