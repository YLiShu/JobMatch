<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-top">
                <div class="left">
                    <div class="brand">
                        <SvgIcon name="logoFill" size="80" />
                        <h1 class="footer-title">JobMatch</h1>
                        <p class="slogan">连接职业生涯，成就未来。</p>
                        <p>&copy; 2024 JobMatch。保留所有权利。</p>
                    </div>
                </div>
                <div class="right">
                    <div class="footer-section">
                        <h4 class="section-title">公司信息</h4>
                        <ul class="section-list">
                            <li><a href="#about-us">关于我们</a></li>
                            <li><a href="#career">加入我们</a></li>
                            <li><a href="#press">新闻中心</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4 class="section-title">客户服务</h4>
                        <ul class="section-list">
                            <li><a href="#help-center">帮助中心</a></li>
                            <li><a href="#feedback">意见反馈</a></li>
                            <li><a href="#community-suppport">社区支持</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4 class="section-title">合作伙伴</h4>
                        <ul class="section-list">
                            <li><a href="#partnerships">伙伴合作</a></li>
                            <li><a href="#affiliate">加盟计划</a></li>
                            <li><a href="#advertising">广告服务</a></li>
                        </ul>
                    </div>
                    <div class="social-media">
                        <h4 class="section-title">关注我们</h4>
                        <div class="social-links">
                            <a href="http://facebook.com" target="_blank">
                                <SvgIcon name="facebook" size="24" />
                            </a>
                            <a href="http://twitter.com" target="_blank">
                                <SvgIcon name="twitter" size="24" />
                            </a>
                            <a href="http://instagram.com" target="_blank">
                                <SvgIcon name="instagram" size="24" />
                            </a>
                            <a
                                href="https://github.com/YLiShu/JobMatch"
                                target="_blank"
                            >
                                <SvgIcon name="github" size="24" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="extra-info">
                    <p>JobMatch 提供最佳职位匹配服务，帮助你找到理想工作。</p>
                    <p>
                        使用JobMatch平台即表示您同意我们的<a
                            href="#cookie-policy"
                            class="extra-link"
                            >Cookie 政策</a
                        >和<a href="#data-privacy" class="extra-link"
                            >数据隐私政策</a
                        >。
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>
<script lang="ts" setup>
</script>
<style scoped lang="scss">
.footer {
    background: linear-gradient(135deg, #090808 0%, #003d50 100%);
    color: #e6e6e6;
    padding: 60px 0;
    user-select: none;
    font-family: "Microsoft YaHei", Arial, sans-serif;
    box-shadow: 0 -4px 10px 0 rgba(0, 0, 0, 0.2);

    .container {
        display: flex;
        flex-direction: column;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 15px;
        font-size: 14px;

        .footer-top {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            margin-bottom: 30px;

            .left {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                width: 40%;

                .brand {
                    .footer-title {
                        font-size: 18px;
                        color: #fff;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }

                    .slogan {
                        font-size: 14px;
                        margin-bottom: 15px;
                        color: rgba(255, 255, 255, 0.75);
                    }

                    p {
                        font-size: 14px;
                        margin-top: 5px;
                    }
                }
            }

            .right {
                display: flex;
                width: 60%;
                align-items: flex-start;
                justify-content: space-between;
                .footer-section {
                    .section-title {
                        color: #fff;
                        font-weight: 500;
                        margin-bottom: 15px;
                    }

                    .section-list {
                        list-style: none;
                        padding: 0;

                        li {
                            margin-bottom: 10px;

                            a {
                                color: rgba(255, 255, 255, 0.85);
                                text-decoration: none;
                                transition: color 0.3s;

                                &:hover {
                                    color: #00cdcb;
                                }
                            }
                        }
                    }
                }

                .social-media {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .section-title {
                        color: #fff;
                        font-weight: 500;
                        margin-bottom: 15px;
                    }

                    .social-links {
                        & > *:not(:last-child) {
                            margin-right: 15px;
                        }
                    }
                }
            }
        }

        .footer-bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.4);
            padding-top: 20px;
            text-align: center;

            .extra-info {
                p {
                    line-height: 1.6;
                    font-size: 14px;
                }

                .extra-link {
                    color: #00cdcb;
                    text-decoration: none;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
</style>