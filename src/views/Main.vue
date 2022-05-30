<template>
  <div id="word-main">
    <!-- 头部 -->
    <van-nav-bar
        title="单词快翻"
    />
    <!-- 中间主体 -->
    <div class="card" >
      <!-- 输入框 -->
      <input id='Serach' placeholder="输入单词" v-model="SearchWord" @click="SearchBox" class="SearchBox">
    </div>
    <!-- 翻译的内容 -->
    <div class="card-info">
      <p v-text="wordPromptShow"></p>
      <p></p>
      <p v-text="wordTranslationShow"></p>
    </div>
    <!-- 按键部分 -->
    <div class="buttons">
      <van-button type="primary" class="button1" @click="showWordTranslation" v-if="FYflag">翻译</van-button>
      <!-- 收藏功能暂不完全 -->
      <van-button type="warning" class="button2" @click="CollectWord" v-if="SCflag">收藏</van-button>
      <van-button type="primary" class="button2" @click="RemberWord" v-if="RSflag">认识</van-button>
    </div>
    <!-- 底部 -->
    <van-tabbar v-model="active" @change="onTabBarChange">
    
      <van-tabbar-item name="search" icon="search">搜索</van-tabbar-item>
      <!-- 收藏页面、设置页面暂未开发完全 -->
      <van-tabbar-item name="Shoucang" icon="star">收藏</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>


<script>
import Axios from 'axios';
import { Notify } from 'vant';
var text='';
// api 传入数据
var appKey = '78118035c259a1c6';
var key = '7jv0TQz2FRVc5Q6FbzBhn70l1UwhCjBM';//注意：暴露appSecret，有被盗用造成损失的风险
var salt = (new Date).getTime();
var curtime = Math.round(new Date().getTime()/1000);
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
var from = 'en';
var to = 'zh-CHS';
var vocabId =  '';
//console.log('---',str1);
// API分割单词的函数 
function truncate(q){
    var len = q.length;
    if(len<=20) return q;
    return q.substring(0, 10) + len + q.substring(len-10, len);
}

export default {
  data() {
    return {
      // 搜索框内容
      SearchWord:'',
      // 按钮显示
      FYflag:true,
      SCflag:false,
      RSflag:false,
      // 页面显示
      TBflag:'search',      
      active: 'search',
      // 翻译内容：单词+翻译
      wordPromptShow: '',
      wordTranslationShow: '',
      words:{
        Starword:'',
        Translation:'',
      },
    }
  },
  methods: {

    // 点击搜索框
    SearchBox(){
        this.SearchWord='';
        this.FYflag=true;
        this.SCflag=false;
        this.RSflag=false;
        this.wordPromptShow= '',
        this.wordTranslationShow= ''

    },
    // 起始页
    StartTab(){
        this.FYflag=true;
        this.SCflag=false;
        this.RSflag=false;
        this.wordPromptShow= '',
        this.wordTranslationShow=''
    },
    // 收藏按钮
    CollectWord() {

      // Notify({ type: 'warning', message: '敬请期待！' });
      if(this.TBflag=='search'){
        this.FYflag=true;
        this.SCflag=false;
        this.RSflag=false;
        this.words.Starword=this.wordPromptShow;
        this.words.Translation=this.wordTranslationShow;
        this.$store.commit('addStarword',this.words);
        Notify({type: 'warning', message: '收藏单词：'+this.$store.state.counter});
      }
      else{
        this.FYflag=false;
        this.SCflag=true;
        this.RSflag=true;
      }
    },
    // 认识按钮
    RemberWord(){
        location.reload()
        // this.FYflag=true;
        // // this.SCflag=false;
        // this.RSflag=false;
        // this.SearchWord='';
        // this.wordPromptShow= '',
        // this.wordTranslationShow= ''
    },
    // 翻译按钮翻译出输入框内容
    showWordTranslation() {
      // console.log(this.SearchWord);
        text=this.SearchWord.toString();
        if(text===''){
          Notify({ type: 'danger', message: '搜素单词不能为空' })
        }
        else{
          this.FYflag=false;
          this.SCflag=true;
          this.RSflag=true;
          var query=text;
          var str1 = appKey + truncate(query) + salt + curtime + key;
          var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
          this.request(query,sign);
        }
        


      
    },
    //API请求函数 
    request(query,sign){
      Axios.get('/api/api',{
        dataType:'jsonp',
        params:{
          q: query,
          appKey: appKey,
          salt: salt,
          from: from,
          to: to,
          signType: "v3",
          sign: sign,
          curtime: curtime,
          vocabId: vocabId,
        }

      }).then(res=>{
        console.log(res.data);
        this.wordPromptShow='英语：'+ query;
        this.wordTranslationShow='翻译：'+res.data.basic.explains[1];

      }).catch(res=>{
        console.log(res);
      })
    },
    // 页面切换
    onTabBarChange (index) {
      
      if(index=='search'){
        
        this.FYflag=true;
        this.SCflag=false;
        this.RSflag=false;
        this.TBflag="search";
      }
      if(index=='Shoucang'){
        this.FYflag=false;
        this.SCflag=false;
        this.RSflag=true;
        this.TBflag='shoucang';
        if(this.$store.state.counter==0){
          Notify({ type: 'primary', message: '没有收藏单词' });
        }
        else{
          this.wordPromptShow='收藏'+ this.$store.state.words[0].Starword;
          this.wordTranslationShow=this.$store.state.words[0].Translation;
        }

      }
      else if(index=='setting') {
        Notify({ type: 'primary', message: '未开放' });
        this.FYflag=true;
        this.SCflag=false;
        this.RSflag=false;
        this.TBflag="search";
        return this.active="search";
      }
      this.active=index;
      this.TBflag=index;
      
    },
  },
  mounted() {
    this.StartTab()
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
/* 翻译文本内容 */
.card-info {
  margin: 40px 15px 40px 15px;
  height: 50%;
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

  /* display: flex; */
  align-items: center;
  justify-content: space-between;


}
/* 第一层按键样式 */
.button1{
  margin-left: 40%;
  width: 20%;
}
/* 第二层按键样式 */
.button2{
  width: 88px;
  margin-left:40% ;
  margin-right: 0px;
}
</style>
