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