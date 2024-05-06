<template>
    <div class="edit-page">
        <div class="header">
            <div class="head-nav">
                <HeadNav :isFixed="false" />
            </div>
        </div>
        <div class="editor">
            <div class="editor-title">编辑简历</div>
            <section class="resume-section">
                <div class="section-title">基本信息</div>
                <div class="edit-area">
                    <ResumeInput
                        v-for="item in basicInfoData"
                        :name="item.title"
                        :key="item.title"
                        v-model:value="item.content"
                    />
                </div>
            </section>
            <section class="resume-section">
                <div class="section-title">工作经历</div>
                <div class="edit-area">
                    <div
                        class="resume-item-group"
                        v-for="item in experienceData.list"
                    >
                        <ResumeInput
                            v-for="field in Object.keys(experienceFields)"
                            :name="experienceFields[field]"
                            v-model:value="item[field]"
                        />
                    </div>
                </div>
            </section>
            <section class="resume-section">
                <div class="section-title">荣誉/奖项</div>
                <div class="edit-area">
                    <ResumeInput
                        v-for="(_item, index) in awards"
                        name="获奖名称"
                        :key="item"
                        v-model:value="awards[index]"
                    />
                </div>
            </section>
            <section class="resume-section">
                <div class="section-title">个人标签</div>
                <div class="edit-area">
                    <div class="resume-item-group" v-for="tagType in tagsData">
                        <ResumeInput
                            v-for="(_tag, index) in tagType.list"
                            :name="tagType.title"
                            v-model:value="tagType.list[index]"
                        />
                    </div>
                </div>
            </section>
        </div>
        <div class="back">
            <div class="back-button" @click="router.push({ name: 'Resume' })">
                保存并返回
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { useResumeStore } from "../../store/modules/Resume/resume";
import Footer from "../../components/Footer/index.vue";
import ResumeInput from "./components/resume-item-input.vue";
import { storeToRefs } from "pinia";
import { experienceFields } from "../../store/modules/Resume/type";
import { useRouter } from "vue-router";
const resumeStore = useResumeStore();
const { basicInfoData, experienceData, awards, tagsData } =
    storeToRefs(resumeStore);
const router = useRouter();
</script>

<style lang="scss" scoped>
.edit-page {
    text-align: left;

    .editor {
        width: min(100%, 1040px);
        margin: 0 auto;
        min-height: 100vh;
    }

    .editor-title {
        font-size: 30px;
        font-weight: 800;
        color: #3e4c5b;
        margin-top: 50px;
    }

    .resume-item-group {
        padding: 24px;
        &:focus,
        &:hover {
            background-color: #f9fafd;
        }
    }

    .back {
        height: 80px;
        width: 100%;
        margin-bottom: 0;
        box-shadow: 0 2px 16px 0 rgba(31, 35, 41, 0.05);
        position: sticky;
        bottom: 0;
        background-color: #fff;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        padding-right: calc((100% - min(100%, 1040px)) / 2);

        .back-button {
            height: 40px;
            padding: 0 30px;
            color: white;
            background-color: #325ab4;
            border-color: #487fc1;
            font-size: 16px;
            font-weight: 500;
            display: flex;
            align-items: center;
            line-height: 1.5;
            border: 1px solid transparent;
            border-radius: 4px;

            &:hover {
                background-color: #487fc1;
            }
        }
    }
}
</style>

<style lang="scss" src="./resume-section.scss" scoped/>