import { defineStore } from "pinia";
import { ref } from "vue";
import { basicInfo, experience, tags } from "./mock";
import { basicInfoEnum, tagsEnum, ResumeData } from "./type";

export type BasicInfoData = {
  title: string;
  content: string;
}[];

export type ExperienceData = {
  title: string;
  list: {
    company: string;
    range: string;
    position: string;
    desc: string;
  }[];
};

export type TagsData = {
  title: string;
  list: string[];
}[];

export const useResumeStore = defineStore("resume", () => {
  const basicInfoData = ref<BasicInfoData>(basicInfo);
  const experienceData = ref<ExperienceData>(experience);
  const ability = ref<string>('');
  const awards = ref<string[]>([]);
  const tagsData = ref<TagsData>(tags);
  const lastUpdateTime = ref("2024-03-01");

  // 解析后端简历数据
  function handleResumeData(data: ResumeData) {
    lastUpdateTime.value = new Date().toLocaleDateString();
    // 基本信息
    const newBasicInfo = [];
    const basic_data = data.basic_data;
    for (const key in basicInfoEnum) {
        if ((basic_data as any)[key]) {
            const val = (basic_data as any)[key] as string | string[];
            newBasicInfo.push({
                title: (basicInfoEnum as any)[key],
                content: Array.isArray(val) ? val.join(", ") : val,
            });
        } else {
            newBasicInfo.push({
                title: (basicInfoEnum as any)[key],
                content: "暂无",
            });
        }
    }
    basicInfoData.value = newBasicInfo;

    // 工作经历
    const newExperience: ExperienceData = {
        title: "工作经历",
        list: [],
    };
    const experience_data = data.experience;
    newExperience.list.push({
      company: '暂无',
      range: '暂无',
      position: '暂无',
      desc: experience_data.join("\n")
    });
    experienceData.value = newExperience;
    // 技能
    ability.value = data.ability.join(", ");

    // 获奖
    awards.value = data.award;

    // 标签
    const tags = data.tag;
    const newTags = [];
    for (const key in tagsEnum) {
        if ((tags as any)[key]) {
            newTags.push({
                title: (tagsEnum as any)[key],
                list: (tags as any)[key] as string[],
            });
        }
    }
    tagsData.value = newTags;
  }

  return {
    basicInfoData,
    experienceData,
    ability,
    awards,
    tagsData,
    lastUpdateTime,
    handleResumeData
  };
});