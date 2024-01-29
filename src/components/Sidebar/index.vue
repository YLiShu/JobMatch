<template>
  <div id="header">
    <div class="inner home-inner">
      <div class="logo">
        <a href="" title="JobMatch"><span>JobMatch</span></a>
      </div>
      <div class="nav">
        <ul>
          <li class="">
            <a ka="header-home" href="">首页</a>
          </li>
          <li class="">
            <a ka="header-job-recommend" href="">推荐职位</a>
          </li>
          <ul class="header-nav-group">
            <li class="cur">
              <a ka="header-job" href="">搜索</a>
            </li>
            <span class="header-nav-dot"></span>
            <li class="">
              <a ka="header_brand" href="">公司</a>
            </li>
          </ul>
        </ul>
      </div>
      <div class="user-nav">
        <li class="dropdown-wrap dropdown-help-and-feedback">
          <div class="dropdown-select">帮助与反馈</div>
          <div class="dropdown-menu">
            <div class="dropdown-menu-item header-pop-feedback">意见反馈</div>
            <div class="dropdown-menu-item online-service">在线客服</div>
          </div>
        </li>
        <ul>
          <li class="">
            <a ka="header-message" href=""
              >消息<span class="nav-chat-num"></span
            ></a>
          </li>
          <span class="nav-resume-tools">
            <li class="">
              <a ka="header-resume" href="">简历</a>
            </li>
            <div class="nav-resume-box">
              <ul>
                <li class="resume-box-update">
                  <a href="javascript:;" rel="nofollow">
                    <span>简历更新</span>
                    <p>自动识别新简历</p>
                  </a>
                </li>
                <li class="resume-box-resume">
                  <a href="" rel="nofollow" ka="resume_box_resume">
                    <span>在线编辑</span>
                    <p>匹配优质岗位</p>
                  </a>
                </li>
                <li class="resume-box-upload nav-up-file">
                  <a
                    class="header-resume-upload"
                    ka="header-resume-upload-2"
                    href="javascript:;"
                  >
                    <span>附件上传</span>
                    <p>快速投递心怡职位</p>
                  </a>
                </li>
              </ul>
            </div>
          </span>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
#header {
  width: 100%;
  height: 49px;
  background: #202329;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
  position: fixed;
  z-index: 105;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 200px;

  .inner {
    border: 1px solid red;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .nav {
      margin-left: 30px;
      ul {
        display: flex;
        list-style: none;
      }
    }

    .user-nav {
    }
  }
}
</style>