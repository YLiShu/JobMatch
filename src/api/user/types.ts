/* 登录接口参数类型 */
export interface LoginData {
    username: string;
    password: string;
}

/* 登录接口返回值类型 */
export interface LoginResult {
    code: number;
    data: string | null;
    msg: string;
}

/* 注册接口参数类型 */
export interface RegisterData {
    mobile: string;
    captchaKey: string;
    captchaCode: string;
    password: string;
    nickName?: string;
}

/* 注册接口返回值类型 */
export interface RegisterResult {
    code: number;
    data: boolean;
    msg: string;
}

/* 图片验证码接口参数类型 */
export interface CaptchaData {
    captchaToken: number;
}

/* 图片验证码接口返回值类型 */
export interface CaptchaResult {
    code: number;
    msg: string;
    data: {
        key: string;
        captcha: string;
    };
}

/* 用户信息 */
export interface UserInfo {
    allCategoryList: {
        categoryId: number; // 分类ID
        categoryName: string; // 分类名称
        description: string; // 分类描述
    }[];
    applyPosList: {
        positionId: number; // 职位ID
        title: string; // 职位标题
        requirement: string; // 职位要求
        quantity: number; // 职位数量
        workCity: string; // 工作城市
        salaryUp: number; // 最高薪资
        salaryDown: number; // 最低薪资
        releaseDate: string; // 发布日期
        validDate: string | null; // 有效日期
        statePub: number; // 发布状态
        hits: number; // 点击次数
        categoryId: number; // 分类ID
        departmentId: number; // 部门ID
        hrIdPub: number; // 发布人ID
        applicationId: number | null; // 应用ID
        state: number; // 状态
        recentTime: string | null; // 最近时间
        resumeId: number; // 简历ID
        hrId: number; // HR ID
        hrMobile: string; // HR 手机号码
        hrName: string; // HR 姓名
        hrEmail: string; // HR 邮箱
    }[];
    favorPosList: {
        positionId: number; // 职位ID
        title: string; // 职位标题
        requirement: string; // 职位要求
        quantity: number; // 职位数量
        workCity: string; // 工作城市
        salaryUp: number; // 最高薪资
        salaryDown: number; // 最低薪资
        releaseDate: string; // 发布日期
        validDate: string | null; // 有效日期
        statePub: number; // 发布状态
        hits: number; // 点击次数
        categoryId: number; // 分类ID
        departmentId: number; // 部门ID
        hrIdPub: number; // 发布人ID
        favorId: number; // 收藏ID
        userId: number; // 用户ID
    }[];
    prePosList: any[]; // 预留职位列表，根据实际返回值确定类型
    resume: {
        resumeId: number; // 简历ID
        ability: string; // 能力描述
        internship: string; // 实习经历
        workExperience: string; // 工作经验
        certificate: string; // 证书
        jobDesire: string; // 职位意愿
        userId: number; // 用户ID
    };
    user: {
        userId: number; // 用户ID
        mobile: string; // 手机号码
        password: string; // 密码
        name: string; // 姓名
        gender: number; // 性别
        birthYear: number; // 出生年份
        nickname: string; // 昵称
        email: string; // 邮箱
        province: string; // 省份
        city: string; // 城市
        eduDegree: string; // 学历
        graduation: string; // 毕业院校
        graYear: number; // 毕业年份
        major: string | null; // 专业
        dirDesire: number; // 方向意愿
        faceImage: string | null; // 头像图片
        faceImageBig: string | null; // 大头像图片
    };
}

/* 用户信息接口返回值类型 */
export interface UserInfoResponse {
    code: number; // 返回状态码
    msg: string; // 返回消息
    data: UserInfo | null;
}

/* 上传头像接口参数类型 */
export interface uploadFaceData {
    userId: number;
    faceData: string;
}

/* 上传头像接口返回值类型 */
export interface uploadFaceResponse {
    code: number;
    msg: string;
    data: {
        userId: number;
        mobile: string | null;
        password: string | null;
        name: string | null;
        gender: number;
        birthYear: number;
        nickname: string | null;
        email: string | null;
        province: string | null;
        city: string | null;
        eduDegree: string | null;
        graduation: string | null;
        graYear: number;
        major: string | null;
        dirDesire: number;
        faceImage: string | null;
        faceImageBig: string | null;
    };
}

export interface connectRequestData {
    myUserId: number;
    friendId: number;
}
