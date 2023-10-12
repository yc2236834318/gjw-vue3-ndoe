<!-- 架子底部 子组件 -->

<script setup></script>

<template>
  <footer class="footer">
    <div class="layout">
      <!-- 保证模块 start -->
      <div class="slogan">
        <ul class="slogan-list">
          <li>
            <a href="javascript:;"><i></i>官方商城 品质保证</a>
          </li>
          <li>
            <a href="javascript:;"><i></i>7天退货 15天换货</a>
          </li>
          <li>
            <a href="javascript:;"><i></i>48元起免运费</a>
          </li>
          <li>
            <a href="javascript:;"><i></i>售后服务 全国联保</a>
          </li>
        </ul>
      </div>
      <!-- 保证模块 end -->

      <!-- 服务模块 start -->
      <div class="service clearfix">
        <div class="service-left">
          <dl>
            <dt>推荐产品</dt>
            <dd><a href="javascript:;">手机</a></dd>
            <dd><a href="javascript:;">笔记本</a></dd>
            <dd><a href="javascript:;">平板</a></dd>
            <dd><a href="javascript:;">配件</a></dd>
          </dl>
          <dl>
            <dt>品牌</dt>
            <dd><a href="javascript:;">苹果</a></dd>
            <dd><a href="javascript:;">华为</a></dd>
            <dd><a href="javascript:;">小米</a></dd>
            <dd><a href="javascript:;">oppo</a></dd>
            <dd><a href="javascript:;">vivo</a></dd>
          </dl>
          <dl>
            <dt>购物相关</dt>
            <dd><a href="javascript:;">购物指南</a></dd>
            <dd><a href="javascript:;">退换货政策</a></dd>
            <dd><a href="javascript:;">配送方式</a></dd>
            <dd><a href="javascript:;">支付方式</a></dd>
          </dl>
          <dl>
            <dt>关注我们</dt>
            <dd><a href="javascript:;">新浪微博</a></dd>
            <dd><a href="javascript:;">官方微信</a></dd>
            <dd><a href="javascript:;">官方QQ</a></dd>
            <dd><a href="javascript:;">联系我们</a></dd>
          </dl>
          <dl>
            <dt>快速链接</dt>
            <dd><a href="javascript:;">首页</a></dd>
            <dd><a href="javascript:;">列表页</a></dd>
            <dd><a href="javascript:;">详情页</a></dd>
            <dd><a href="javascript:;">购物车</a></dd>
            <dd><a href="javascript:;">搜索页</a></dd>
          </dl>
        </div>
        <div class="service-right">
          <a href="javascript:;" class="online">
            <p><i></i>在线客服</p>
          </a>
          <div class="app">
            <h2>下载APP</h2>
            <div class="app-img">
              <img src="/images/app.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <!-- 服务模块 end -->

      <!-- 底部声明 start -->
      <div class="warrant">
        <ul class="warrant-link">
          <span>
            <a href="javascript:;">关于购机网与隐私的声明</a>
            <i>|</i>
          </span>
          <span>
            <a href="javascript:;">购机网服务协议</a>
            <i>|</i>
          </span>
          <span>
            <a href="javascript:;">关于购机网推荐服务与隐私的声明</a>
            <i>|</i>
          </span>
          <span>
            <a href="javascript:;">购机网推荐服务用户协议</a>
            <i>|</i>
          </span>
          <span>
            <a href="javascript:;">关于cookies</a>
          </span>
        </ul>
        <div class="warrant-link">
          <span>
            Copyright © 2020-2023 购机网有限公司 版权所有
            <i>|</i>
          </span>
          <span>
            <a href="javascript:;">粤ICP备XXXXX号</a>
            <i>|</i>
          </span>
          <span>
            <a href="javascript:;">XXXXXXXXXXX号粤公网安备</a>
            <i>|</i>
          </span>
          <span>
            <a href="javascript:;">增值电信业务许可证：粤B2-XXXXX</a>
          </span>
          <span>
            <a href="javascript:;">
              <img src="/images/license.png" alt="" />
            </a>
          </span>
        </div>
      </div>
      <!-- 底部声明 end -->
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
  min-width: 1400px;
  padding-top: 40px;
  background-color: $deepColor;
}
// 保证模块
.slogan {
  width: 1200px;
  margin: 0 auto;
  padding: 25px 0;
  .slogan-list {
    display: flex;
    justify-content: center;
    li {
      height: 40px;
      width: 300px;
      text-align: center;
      a {
        display: inline;
        font-size: 18px;
        color: $aColor3;
        vertical-align: middle;
        text-align: center;
        i {
          display: inline-block;
          vertical-align: middle;
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
      }
      &:nth-child(1) i {
        background: url(/images/footer_1.png) no-repeat;
        background-size: 40px;
      }
      &:nth-child(2) i {
        background: url(/images/footer_2.png) no-repeat;
        background-size: 40px;
      }
      &:nth-child(3) i {
        background: url(/images/footer_3.png) no-repeat;
        background-size: 40px;
      }
      &:nth-child(4) i {
        background: url(/images/footer_4.png) no-repeat;
        background-size: 40px;
      }
    }
  }
}
// 服务模块
.service {
  display: flex;
  justify-content: center;
  width: 1200px;
  margin: 0 auto;
  padding: 20px 0 20px;
  border-top: 1px solid #e5e5e5;
  .service-left {
    padding-left: 60px;
    dl {
      float: left;
      width: 200px;
      padding-right: 39px;
      dt {
        margin-bottom: 10px;
        color: #101010;
        font-size: 14px;
        font-weight: bold;
        line-height: 24px;
      }
      dd a {
        display: inline;
        color: $aColor3;
        font-size: 12px;
        line-height: 23px;
        &:hover {
          color: $gjwColor;
        }
      }
      &:last-child {
        width: 150px;
        padding: 0;
      }
    }
  }
  .service-right {
    width: 180px;
    height: 180px;
    .online {
      display: inline-block;
      width: 140px;
      height: 40px;
      text-align: center;
      border: 0 solid #000;
      border-radius: 20px;
      background: #000;
      cursor: pointer;
      p {
        display: flex;
        justify-content: center;
        padding: 8px 0;
        color: #fff;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0;
        i {
          display: inline-block;
          width: 24px;
          height: 24px;
          margin-right: 8px;
          background: url(/images/service.png) no-repeat;
          background-size: 24px;
        }
      }
    }
  }
  .app {
    width: 250px;
    margin-top: 20px;
    margin-bottom: 4px;
    h2 {
      font-size: 14px;
      color: #000;
      line-height: 24px;
      letter-spacing: 0;
    }
    .app-img {
      width: 70px;
      height: 70px;
      margin-top: 10px;
    }
  }
}
// 声明模块
.warrant {
  width: 1200px;
  height: 80px;
  margin: 0 auto;
  margin-top: 20px;
  .warrant-link {
    height: 16px;
    margin-bottom: 5px;
    line-height: 16px;
    text-align: center;
    span {
      color: $aColor6;
      font-size: 12px;
      a {
        color: $aColor6;
      }
      i {
        width: 8px;
        margin: 0 3px;
        opacity: 0.42;
      }
      a,
      i {
        display: inline-block;
        &:hover {
          color: $gjwColor;
        }
      }
      img {
        width: 90px;
        height: 32px;
        margin: 0 6px;
        vertical-align: bottom;
      }
    }
  }
}
</style>
