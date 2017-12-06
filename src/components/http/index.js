import axios from 'axios';
var post = function({url,param={},successCallback,errorFun}) {
  axios.post(url,param).then((response)=>{
    let rspCode = response.data.code;
    if (rspCode === '0') {
      successCallback && successCallback(response.data.data);
    } else if(rspCode === '10'){
      window.location.href ="/#/login";
    }
  })
}
export default post;
