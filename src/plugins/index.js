import Vue from "vue";
import axios from 'axios';

Vue.use(VueAxios,axios)

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


var instance = axios.create({
    baseURL:'https://openapi.youdao.com/api',
    timeout:
})


axios({
    url:'https://openapi.youdao.com/api',
    method:'post',
    data:{
        q: query,
        appKey: appKey,
        salt: salt,
        from: from,
        to: to,
        sign: sign,
        signType: "v3",
        curtime: curtime,
        vocabId: vocabId,
    }
}).then(res=>{
    console.log(res);
});

function truncate(q){
    var len = q.length;
    if(len<=20) return q;
    return q.substring(0, 10) + len + q.substring(len-10, len);
}