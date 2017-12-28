/**
 * Created by wanglei on 16/11/3.
 */
import * as types from './mutation-types';
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  isFullMenu: true,
  isLoadLayer: false,
  tipInfo: {
    title: '温馨提示',
    type: true,
    text: '',
    isShow: false,
    confirmHint: '关闭',
    showIcon: true,
    data: {},
    closeCallback: function () {
    }
  },
  operateInfo: {
    title: '操作提示',
    text: '',
    leftOperate: '',
    rightOperate: '',
    data: {},
    sureCallback: function () {
    },
    cancelCallback: function () {
    },
    isShow: false
  },
  miniOperateInfo: {
    title: '操作提示',
    text: '',
    closeButtonText: '不保存',
    confirmButtonText: '保存',
    data: {},
    confirmCallback: function () {
    },
    cancelCallback: function () {
    },
    closeCallback: function () {
    },
    isShow: false
  },
  autoCloseInfo: {
    text: '',
    show: false
  },
  autoCloseWarningInfo: {
    text: '',
    show: false
  },
  saveSuccessInfo: {
    show: false,
    text: ''
  }
};

const getters = {
  isFullMenu: state => state.isFullMenu,
  isLoadLayer: state => state.isLoadLayer,
  tipInfo: state => state.tipInfo,
  operateInfo: state => state.operateInfo,
  miniOperateInfo: state => state.miniOperateInfo,
  saveSuccessInfo: state => state.saveSuccessInfo
};

const mutations = {
  [types.SHOW_LEFT_MENU] (state, isFullMenu) {
    state.isFullMenu = isFullMenu;
  },
  [types.CHANGE_LOAD_SHOW_STATE] (state, isLoadLayer) {
    state.isLoadLayer = isLoadLayer;
  },
  [types.CLOSE_PROMPTD_DIALOG_BOX] (state) {
    state.tipInfo.isShow = false;
    state.tipInfo.title = '温馨提示';
    state.tipInfo.text = '';
    state.tipInfo.type = true;
    state.tipInfo.closeCallback && state.tipInfo.closeCallback(state.tipInfo.data);
    state.tipInfo.confirmHint = '关闭';
    state.tipInfo.showIcon = true;
  },
  [types.OPEN_SUCCESS_PROMPTD_DIALOG_BOX] (state, tip) {
    state.tipInfo.isShow = true;
    state.tipInfo.title = tip.title;
    state.tipInfo.text = tip.text;
    state.tipInfo.type = true;
    state.tipInfo.confirmHint = '关闭';
    state.tipInfo.showIcon = true;
    if (tip.data) {
      state.tipInfo.data = tip.data;
    }
    if (tip.closeCallback) {
      state.tipInfo.closeCallback = tip.closeCallback;
    } else {
      state.tipInfo.closeCallback = function () {
      };
    }
  },
  [types.OPEN_FAULT_PROMPTD_DIALOG_BOX] (state, text) {
    state.tipInfo.isShow = true;
    state.tipInfo.title = text.title || '错误提示';
    state.tipInfo.closeCallback = function () {
    };
    if (typeof (text) === 'string') {
      state.tipInfo.text = text;
    } else {
      state.tipInfo.text = text.text;
      if (text.data) {
        state.tipInfo.data = text.data;
      }
      if (text.closeCallback) {
        state.tipInfo.closeCallback = text.closeCallback;
      }
    }
    state.tipInfo.type = false;
    state.tipInfo.confirmHint = text.confirmHint || '关闭';
    state.tipInfo.showIcon = text.showIcon !== false;
  },
  [types.OPEN_NO_AUTHORIZATION_DIALOG_BOX] (state, text) {
    state.tipInfo.isShow = true;
    state.tipInfo.title = '错误提示';
    state.tipInfo.text = text;
    state.tipInfo.closeCallback = function () {
    };
    state.tipInfo.type = false;
    state.tipInfo.confirmHint = '关闭';
    state.tipInfo.showIcon = true;
  },
  [types.OPEN_OPERATE_DIALOG_BOX] (state, operateInfo) {
    state.operateInfo.isShow = true;
    state.operateInfo.text = operateInfo.text;
    state.operateInfo.leftOperate = operateInfo.leftOperate || '取消';
    state.operateInfo.rightOperate = operateInfo.rightOperate || '确定';
    if (operateInfo.data) {
      state.operateInfo.data = operateInfo.data;
    }
    if (operateInfo.sureCallback) {
      state.operateInfo.sureCallback = operateInfo.sureCallback;
    } else {
      state.operateInfo.sureCallback = function () {
      };
    }
    if (operateInfo.cancelCallback) {
      state.operateInfo.cancelCallback = operateInfo.cancelCallback;
    } else {
      state.operateInfo.cancelCallback = function () {
      };
    }
  },
  [types.CLOSE_OPERATE_DIALOG_BOX] (state) {
    state.operateInfo.isShow = false;
    state.operateInfo.text = '';
    state.operateInfo.cancelCallback && state.operateInfo.cancelCallback(state.operateInfo.data);
  },
  [types.SURE_OPERATE_DIALOG_BOX] (state) {
    state.operateInfo.isShow = false;
    state.operateInfo.text = '';
    state.operateInfo.sureCallback && state.operateInfo.sureCallback(state.operateInfo.data);
  },
  [types.OPEN_MINI_OPERATE_DIALOG_BOX] (state, miniOperateInfo) {
    state.miniOperateInfo.isShow = true;
    state.miniOperateInfo.text = miniOperateInfo.text;
    state.miniOperateInfo.confirmButtonText = miniOperateInfo.confirmButtonText;
    state.miniOperateInfo.closeButtonText = miniOperateInfo.closeButtonText;
    if (miniOperateInfo.data) {
      state.miniOperateInfo.data = miniOperateInfo.data;
    }
    if (miniOperateInfo.confirmCallback) {
      state.miniOperateInfo.confirmCallback = miniOperateInfo.confirmCallback;
    } else {
      state.miniOperateInfo.confirmCallback = function () {
      };
    }
    if (miniOperateInfo.cancelCallback) {
      state.miniOperateInfo.cancelCallback = miniOperateInfo.cancelCallback;
    } else {
      state.miniOperateInfo.cancelCallback = function () {
      };
    }
    if (miniOperateInfo.closeCallback) {
      state.miniOperateInfo.closeCallback = miniOperateInfo.closeCallback;
    } else {
      state.miniOperateInfo.closeCallback = function () {
      };
    }
  },
  [types.CONFIRM_MINI_OPERATE_DIALOG_BOX] (state) {
    state.miniOperateInfo.isShow = false;
    state.miniOperateInfo.text = '';
    state.miniOperateInfo.confirmCallback && state.miniOperateInfo.confirmCallback(state.miniOperateInfo.data);
  },
  [types.CANCEL_MINI_OPERATE_DIALOG_BOX] (state) {
    state.miniOperateInfo.isShow = false;
    state.miniOperateInfo.text = '';
    state.miniOperateInfo.cancelCallback && state.miniOperateInfo.cancelCallback(state.miniOperateInfo.data);
  },
  [types.CLOSE_MINI_OPERATE_DIALOG_BOX] (state) {
    state.miniOperateInfo.isShow = false;
    state.miniOperateInfo.text = '';
    state.miniOperateInfo.closeCallback && state.miniOperateInfo.closeCallback(state.miniOperateInfo.data);
  },
  [types.OPEN_AUTO_CLOSE_DIALOG_BOX] (state, text) {
    state.autoCloseInfo.show = true;
    state.autoCloseInfo.text = text;
  },
  [types.CLOSE_AUTO_CLOSE_DIALOG_BOX] (state) {
    state.autoCloseInfo.show = false;
    state.autoCloseInfo.text = null;
  },
  [types.SHOW_AUTO_CLOSE_WARNING_DIALOG_BOX] (state, text) {
    state.autoCloseWarningInfo.show = true;
    state.autoCloseWarningInfo.text = text;
  },
  [types.HIDE_AUTO_CLOSE_WARNING_DIALOG_BOX] (state) {
    state.autoCloseWarningInfo.show = false;
    state.autoCloseWarningInfo.text = null;
  },
  [types.SHOW_SAVE_SUCCESS_DIALOG_BOX] (state, text) {
    state.saveSuccessInfo.show = true;
    state.saveSuccessInfo.text = text;
  },
  [types.HIDE_SAVE_SUCCESS_DIALOG_BOX] (state) {
    state.saveSuccessInfo.show = false;
    state.saveSuccessInfo.text = '';
  }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations
})

export default store;
