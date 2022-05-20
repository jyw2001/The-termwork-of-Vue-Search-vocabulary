<template>
  <div id="word-main">
    <!-- 头部 -->
    <van-nav-bar
        title="单词快翻"
        
    />
    <!-- 中间主体 -->
    <div class="card" >
      <!-- 字体颜色没有变化 -->
      <input id='Serach' v-model="SearchWord" @click="SearchBox" class="SearchBox">
    </div>
    <div class="card-info">
      <p v-text="wordPromptShow"></p>
      <p v-text="wordTranslationShow"></p>
    </div>
    <!-- 按键部分 -->
    <div class="buttons">
      <van-button type="warning" class="button1" @click="showWordTranslation" v-if="FYflag">翻译</van-button>
      <van-button type="info" class="button2" @click="CollectWord" v-if="SCflag">收藏</van-button>
      <van-button type="primary" class="button2" @click="StartTab" v-if="RSflag">认识</van-button>
    </div>
    <!-- 底部 -->
    <van-tabbar v-model="active" @change="onTabBarChange">
    
      <van-tabbar-item name="search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item name="Shoucang" icon="star">收藏</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Axios from 'axios';
import CryptoJS from 'ajax';


// api 传入数据
var appKey = '78118035c259a1c6';
var key = '7jv0TQz2FRVc5Q6FbzBhn70l1UwhCjBM';//注意：暴露appSecret，有被盗用造成损失的风险
var salt = (new Date).getTime();
var curtime = Math.round(new Date().getTime()/1000);
var query = 'good';
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
var from = 'en';
var to = 'zh-CHS';
var str1 = appKey + truncate(query) + salt + curtime + key;
var vocabId =  '';
//console.log('---',str1);
var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);

function truncate(q){
    var len = q.length;
    if(len<=20) return q;
    return q.substring(0, 10) + len + q.substring(len-10, len);
}

export default {
  data() {
    return {
      SearchWord:'输入要查询单词',
      FYflag:true,
      SCflag:false,
      RSflag:false,
      TBflag:'search',
      
      active: 'search',

      
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
    request(){
      Axios.get('/api/api',{
        q: query,
        appKey: appKey,
        salt: salt,
        from: from,
        to: to,
        sign: sign,
        signType: "v3",
        curtime: curtime,
        vocabId: vocabId,
      }).then(res=>{
        console.log(res.data);
        // console.log(this.wordTranslationShow=res.data[1].data[2].data); 

      }).catch(res=>{
        console.log(res);
      })
    },

    SearchBox(){
      this.SearchWord=''
    },
    StartTab(){
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

    // 页面切换
    onTabBarChange (index) {
      if(index=="setting"){
        Notify({ type: 'primary', message: '未开放' });
        this.FYflag=true;
        this.SCflag=false;
        this.RSflag=false;
        this.TBflag="search";
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
    this.StartTab()
    this.request()

    
  }
}
</script>

<style scoped>

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
