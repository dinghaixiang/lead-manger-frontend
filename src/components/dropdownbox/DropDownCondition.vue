<template>
  <div class="program-drop-down-box">
    <div class="program-drop-down-box-view" @click="toggleShow">
      <span>{{selectedName}}</span>
      <i class="iconfont icon-zhankai1"></i>
    </div>
    <div class="program-drop-down-box-drop" v-show="isShow">
      <ul v-if="categoryLinkTag == '0'" id="category-list" @scroll="scrollList">
        <li v-for="(option,index) in options.firstCategories"
            @mouseover="selectSecondCategory(option.code, option.name, index)"
            @click="selectFirstCategory(option.code, option.name)">{{option.name}}
        </li>
      </ul>
      <ul v-else>
        <li v-for="option in options" @click="selectOption(option.code, option.name)">{{option.name}}</li>
      </ul>
    </div>
    <ul v-if="categoryLinkTag == '0'" class="second-category" :style="{ top: height + 'px' }"
        v-show="isShowSecCategories">
      <li v-for="option in secondCategories" @click="selectOption(option.code, option.name)">{{option.name}}</li>
    </ul>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        selectedName: '',
        secondCategories: [],
        height: 0,
        scrollTop: 0
      };
    },
    props: {
      options: {
        required: true
      },
      defaultOption: {
        type: String,
        required: true
      },
      index: {
        required: true
      },
      showFlags: {
        required: true
      },
      isShowSecCategories: {
        required: true
      },
      categoryLinkTag: {
        type: String
      },
      licenseType: {
        type: String
      },
      reset: {
        type: Boolean,
        required: false,
        default: false
      },
      directReset: {
        required: false
      }
    },
    created: function () {
      this.selectedName = this.defaultOption;
    },
    computed: {
      isShow () {
        return this.showFlags[this.index];
      }
    },
    methods: {
      toggleShow (event) {
        event.stopPropagation();
        this.$emit('toggleShow', this.index);
      },
      selectOption (code, name) {
        this.isShow = false;
        this.selectedName = name;
        this.$emit('selectOption', code, this.index);
      },
      selectFirstCategory (code, name) {
        this.selectOption(code, name);
      },
      selectSecondCategory (code, name, index) {
        if (code !== '000' && code !== '404') {
          this.height = 8 + (30 * index) - this.scrollTop;
          this.secondCategories = this.options[code][this.licenseType];
          if (this.secondCategories === undefined) {
            this.$emit('hideSecCategory');
          } else {
            this.$emit('ShowSecCategory');
          }
          return false;
        } else {
          this.secondCategories = [];
          this.$emit('hideSecCategory');
        }
      },
      scrollList () {
        this.scrollTop = document.getElementById('category-list').scrollTop;
      }
    },
    watch: {
      options: function (val, oldVal) {
        if (val !== oldVal) {
          this.selectedName = this.defaultOption;
        }
      },
      defaultOption: function (val, oldVal) {
        if (val !== oldVal) {
          this.selectedName = this.defaultOption;
        }
      },
      reset: function (val) {
        if (!val) {
          return;
        }
        this.selectedName = this.defaultOption;
      },
      directReset: function () {
        this.selectedName = this.defaultOption;
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .edit-width {
    width: 78px;
  }

  .program-drop-down-box {
    width: 108px;
    height: 28px;
    cursor: pointer;
    color: #828282;
    margin-right: 20px;
    position: relative;
    border-radius: 5px;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    .program-drop-down-box-view {
      display: inline-flex;
      font-size: 12px;
      width: 100%;
      height: 28px;
      line-height: 28px;
      border-radius: 5px;
      span {
        margin-left: 10px;
        display: inline-block;
        width: 70px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 28px;
        vertical-align: top;
      }
      i {
        color: #b9b9b9;
        font-size: 12px;
        position: absolute;
        right: 5px;
      }
    }
    .program-drop-down-box-drop {
      border: 1px solid #e0e0e0;
      border-radius: 7px;
      position: absolute;
      top: 36px;
      width: 100%;
      z-index: 1111;
      background-color: hsla(0, 0%, 100%, .95);
      ul {
        max-height: 150px;
        overflow: auto;
        border-radius: 5px;
        li {
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          padding-left: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:hover {
            background-color: #f3f4f8;
          }
        }
      }
    }
    .second-category {
      position: relative;
      top: 36px;
      left: 111px;
      border-radius: 5px;
      border: 1px solid #e0e0e0;
      max-height: 150px;
      overflow: auto;
      background-color: #f3f4f8;
      li {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        padding-left: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover {
          background-color: #e8e9f1;
        }
      }
    }
  }
</style>
