export interface Basic_data {
	name: string;
	birth: string;
	age: number;
	tel: string;
	email: string;
	college: string[];
	loc: string[];
	edu: string;
}

export interface Tag {
	edu_tag: string[];
	loc_tag: string;
	experience_tag: string[];
	ability: string[];
	total_work_time: number;
}

export interface Custom_content {
	money_obj: string;
	self_desc: any[];
	self_tag: any[];
}

export interface ResumeData {
	basic_data: Basic_data;
	job_obj: string[];
	experience: string[];
	award: string[];
	ability: string[];
	job_fit: string[];
	tag: Tag;
	score: number;
	custom_content: Custom_content;
}

export const basicInfoEnum = {
	name: "姓名",
	age: "年龄",
	birth: "出生日期",
	tel: "联系电话",
	email: "邮箱",
	edu: "学历",
	college: "教育经历",
	loc: "所在地",
};

export const tagsEnum = {
	edu_tag: "教育",
	experience_tag: "经历",
	ability_tag: "技能",
};

export const experienceFields = {
	company: "公司",
	range: "起止时间",
	position: "职位",
	desc: "描述",
};