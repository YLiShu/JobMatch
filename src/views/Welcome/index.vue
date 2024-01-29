<template>
  <div class="container">
    <div class="main">
      <div class="left">
        <div class="content">
          <div class="title">
            <div class="icon_box">
              <svg
                t="1699433423149"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1744"
                width="16"
                height="16"
              >
                <path
                  d="M707.968 157.06112C566.64064 0.81408 324.67456-12.17024 167.51616 129.98144 10.37312 272.128-1.70496 513.28 140.43648 670.43328c141.3376 156.25216 383.30368 169.23136 540.45184 27.07968 157.14816-142.14656 169.23136-383.3088 27.07968-540.45184z m-79.44192 482.57536c-124.87168 112.96256-318.07488 102.38976-430.19776-21.57056-112.96256-124.8768-103.31648-317.24032 21.5552-430.19776 124.8768-112.95744 317.24544-103.31648 430.20288 21.56032 112.9472 124.88192 103.31136 317.25056-21.56032 430.208zM866.14528 643.73248a30.73024 30.73024 0 0 1-1.64864 43.41248l-184.00256 170.54208a30.72512 30.72512 0 0 1-43.41248-1.64864l-6.9632-7.51104a30.72 30.72 0 0 1 1.64864-43.41248l184.00256-170.54208a30.72 30.72 0 0 1 43.41248 1.64864l6.9632 7.51104zM916.75136 763.3152a30.72 30.72 0 0 1-1.64864 43.40736l-120.17152 111.38048a30.72 30.72 0 0 1-43.41248-1.64352l-6.95296-7.51104a30.72 30.72 0 0 1 1.64352-43.41248l120.17152-111.37536a30.73024 30.73024 0 0 1 43.41248 1.64864l6.95808 7.50592zM974.86336 875.94496a30.72 30.72 0 0 1-1.64864 43.41248l-71.3472 66.1248a30.71488 30.71488 0 0 1-43.41248-1.64352l-6.95808-7.51104a30.72 30.72 0 0 1 1.64864-43.41248l71.3472-66.12992a30.73024 30.73024 0 0 1 43.41248 1.64864l6.95808 7.51104z"
                  p-id="1745"
                  fill="#ffffff"
                ></path>
              </svg>
            </div>
            <span>JobMatch</span>
          </div>
          <div class="jumbotron">
            <h1>发现工作机会</h1>
            <p>
              当您寻找与您专业相关的职位发布时，不妨探索我们多元化的行业平台。在这里，您可以轻松与招聘经理和专业人士建立联系，开启您职业生涯的新篇章。立即加入，发现更多机会，实现您的职业目标！
            </p>
            <p>
              <button class="btn" @click="goHome">助您前途无忧</button>
            </p>
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "../../router";

const goHome = () => {
  router.push("/home");
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 30px;

  .main {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(128, 127, 127, 0.2);
    border-radius: 50px;
    overflow: hidden;

    .left {
      flex: 1;
      height: 100%;
      display: flex;
      padding: 10px;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .content {
        height: 500px;
        width: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .title {
        width: 100%;
        height: 40px;
        display: flex;
        font-weight: bolder;
        font-size: 22px;
        margin-bottom: 40px;

        .icon_box {
          width: 60px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #527da7;
          margin-right: 15px;
        }

        span {
          line-height: 40px;
        }
      }

      .jumbotron {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        p {
          margin-top: 20px;
          line-height: 30px;
        }

        .btn {
          background: #527da7;
          outline: none;
          padding: 10px 15px;
          width: 120px;
          border: none;
          border-radius: 5px;
          color: #ffffff;
        }
      }
    }

    .right {
      flex: 1;
      height: 100%;
      box-sizing: border-box;
      border-radius: 50px;
      background: url(../../assets/welcome/bg.png) no-repeat center center;
    }
  }
}
</style>