import axios from 'axios'
import router from '../router';
const leadApi='/lead-api';
const USER_ID='user_id';
const USER_NAME='user_name';
const USER_EMAIL='user_email';

const student = {
  authenticated: false,
  id:'',
  userName:'',
  email:''
};
const clear = () => {
  student.authenticated= false;
  student.id='';
  student.userName='';
  student.email='';
  clearData(USER_ID);
  clearData(USER_EMAIL);
  clearData(USER_NAME);
};
const login =(content,param,redictUrl)=>{
  axios.post(leadApi+'/login',param).then((response)=>{
    let rspCode = response.data.code;
    if (rspCode === '0') {
      if (response.data.data) {
        student.authenticated= true;
        student.id=response.data.data.userId;
        student.userName=response.data.data.userName;
        student.email=response.data.data.email;
        setData(USER_ID,response.data.data.userId,30);
        setData(USER_NAME,response.data.data.userName,30);
        setData(USER_EMAIL,response.data.data.email,30);
        router.replace(redictUrl);
      } else {
        content.loginError = '用户名或密码错误';
      }
    }  else {
      content.loginError=response.data.message;
    }
  })
};
const checkAuth = () => {
  let token = getData(USER_ID);
  student.authenticated = !!token;
  student.authenticated && load();
};
const load = () => {
  student.id = getData(USER_ID);
  student.email = getData(USER_EMAIL);
  student.userName =getData(USER_NAME);
};
const setData = (name, value, expireTime) => {
  window.localStorage ? window.localStorage.setItem(name, value) : setCookie(name, value, expireTime);
};

const getData = (name) => {
  return window.localStorage ? window.localStorage.getItem(name) : getCookieValue(name);
};

const clearData = (name) => {
  window.localStorage ? window.localStorage.removeItem(name) : setCookie(name, null, -1);
};

const getCookieValue = (name) => {
  var cookieValues = new RegExp('(^| )' + name + '=([^;]*)(;|$)').exec(document.cookie);
  return cookieValues ? cookieValues[2] : null;
};
const setCookie = (name, value, expireTime) => {
  var expiresDate;
  expireTime && (expiresDate = new Date(), expiresDate.setTime(expiresDate.getTime() + expireTime));
  document.cookie = name + '=' + value + (expiresDate ? '; expires=' + expiresDate.toGMTString() : '');
};
export default {
  login,
  student,
  checkAuth,
  clear
}
