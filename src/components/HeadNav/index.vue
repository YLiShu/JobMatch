<template>
    <div id="header" :class="{ 'fixed-top': isFixed }">
        <div class="header-container">
            <div class="brand">
                <router-link to="/" title="JobMatch">JobMatch</router-link>
            </div>
            <nav class="main-nav">
                <ul class="nav-list">
                    <li class="active">
                        <router-link to="/">首页</router-link>
                    </li>
                    <li><router-link to="/jobs">推荐职位</router-link></li>
                    <li>
                        <router-link to="/search">搜索</router-link>
                    </li>
                    <li><router-link to="/companies">公司</router-link></li>
                </ul>
            </nav>
            <div class="feedback-nav">
                <div class="nav-item help-feedback">
                    <button class="dropdown-button">帮助与反馈</button>
                    <div class="dropdown-content">
                        <router-link to="/feedback">意见反馈</router-link>
                        <router-link to="/support">AI客服</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ isFixed: boolean }>();
</script>

<style lang="scss" scoped>
#header {
    background-color: #313438;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    width: 100%;
    z-index: 9999;
    font-family: "Helvetica Neue", "Microsoft YaHei", Helvetica, Arial,
        sans-serif;

    &.fixed-top {
        position: fixed;
        top: 0;
    }
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    margin: 0 auto;
    width: 1200px;
    max-width: 1200px;
    padding: 0 20px;
}

.brand a {
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.3s;
    font-family: "Comic Sans MS", "Consoals", Arial, sans-serif;

    &:hover {
        color: #00ffff;
    }
}

.main-nav .nav-list,
.feedback-nav .nav-list {
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
}

.main-nav .nav-list li,
.feedback-nav .nav-list li {
    font-size: 14px;
    margin: 5px 10px;
    font-weight: bold;
}

.main-nav .nav-list li a,
.feedback-nav .nav-list li a {
    color: #fff;
    text-decoration: none;
    padding: 8px 14px;
    transition: all 0.3s ease;

    &:hover {
        background-color: #00bebd;
        border-radius: 5px;
    }
}

.main-nav .nav-list li.active a {
    background-color: #00bebd;
    border-radius: 5px;
}

.feedback-nav {
    display: flex;
    align-items: center;

    .nav-item {
        position: relative;
        margin-left: 20px;
        &:hover .dropdown-content {
            display: block;
        }

        .dropdown-button {
            background-color: #39424e;
            color: #fff;
            padding: 8px 14px;
            border-radius: 4px;
            border: none;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;

            &:hover {
                background-color: #4a5568;
            }
        }

        .dropdown-content {
            display: none;
            position: absolute;
            left: 0px;
            background-color: #fff;
            font-size: 14px;
            min-width: 120px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            overflow: hidden;
            top: 100%;
            margin-top: 0.5rem;
        }

        .dropdown-content a {
            color: #333;
            padding: 10px 15px;
            text-decoration: none;
            display: block;
            border-bottom: 1px solid #eaeaea;
            transition: background-color 0.3s ease;

            &:hover {
                background-color: #f7f7f7;
            }

            &:last-child {
                border-bottom: none;
            }
        }
    }
}

.feedback-nav .nav-item {
    margin-left: 20px;
}
</style>