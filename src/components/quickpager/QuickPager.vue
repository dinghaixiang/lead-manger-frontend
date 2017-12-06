<template>
  <div class="quick-pager">
    <div class="quick-pager-content">
      <span class="quick-pager-info">共{{page.totalRows}}条,{{page.totalPages}}页</span>
      <ol class="">
        <li @click="gotoPage(1, isFirstPage)" :class="{isValidIcon:isFirstPage}"><i class="icon iconfont">&#xe7aa;</i></li>
        <li @click="gotoPage(page.currentPage - 1, isFirstPage)" :class="{isValidIcon:isFirstPage}"><i class="icon iconfont">&#xe7a6;</i></li>
        <li v-for="pager in getNumbers" @click="gotoPage(pager, isCurrentPage(pager))" :class="{isCurrentPage:isCurrentPage(pager)}">{{pager}}</li>
        <li @click="gotoPage(page.currentPage + 1, isLastPage)" :class="{isValidIcon:isLastPage}"><i class="icon iconfont">&#xe7a2;</i></li>
        <li @click="gotoPage(page.totalPages, isLastPage)" :class="{isValidIcon:isLastPage}"><i class="icon iconfont">&#xe7ae;</i></li>
      </ol>
    </div>
    <div style="clear: both"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        operation: {}
      };
    },
    props: {
      page: {
        required: true
      }
    },
    computed: {
      getNumbers () {
        if (this.page.totalPages <= 5) {
          return this.page.totalPages;
        } else {
          if (this.page.currentPage <= 3) {
            return 5;
          } else {
            if (this.page.totalPages - this.page.currentPage <= 2) {
              return [this.page.totalPages - 4, this.page.totalPages - 3, this.page.totalPages - 2, this.page.totalPages - 1, this.page.totalPages];
            } else {
              return [this.page.currentPage - 2, this.page.currentPage - 1, this.page.currentPage, this.page.currentPage + 1, this.page.currentPage + 2];
            }
          }
        }
      },
      isFirstPage () {
        return this.page.currentPage === 1;
      },
      isLastPage () {
        return this.page.currentPage === this.page.totalPages;
      }
    },
    methods: {
      isCurrentPage (page) {
        return this.page.currentPage === page;
      },
      gotoPage (toPage, tag) {
        if (tag) {
          return;
        }
        var startIndex = ((toPage - 1) < 0 ? 0 : (toPage > this.page.totalPages ? this.page.totalPages - 1 : (toPage - 1))) * this.page.pageRows;
        console.log('startIndex:' + startIndex + 'pageRows:' + this.page.pageRows);
        this.$emit('QuickPager', {'startIndex': startIndex, 'pageRows': this.page.pageRows});
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../assets/styles/base';
  .quick-pager{    margin: 15px 20px;}
  .quick-pager-content{float: right;color: @input-font-color;}
  .quick-pager-info{display: inline-block;  height: 25px;  float: left;  margin-right: 15px;  line-height: 25px;}
  .quick-pager-content ol{float: left}
  .quick-pager-content li{    float: left;  cursor: pointer;  height: 23px;  line-height: 23px;  padding: 0px 8px;  margin-left: 5px;  border: 1px solid gainsboro;  text-align: center;}
  .quick-pager-content li.isCurrentPage{border-color: @blue-color;background-color: #e7faff;color: @blue-color;}
  .quick-pager-content .icon{font-size: 12px;color: #777777}
  .quick-pager-content li.isValidIcon{cursor: not-allowed;}
  .quick-pager-content .isValidIcon i{color: #cdcdcd}
</style>
