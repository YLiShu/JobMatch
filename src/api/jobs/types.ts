interface Category {
    categoryId: number;
    categoryName: string;
    description: string;
}

export interface CategoryResponse {
    code: number;
    msg: string;
    data: Category[];
}

export interface CategoryPositionData {
    limit: number;
}

export interface CategoryPositionPath {
    categoryId: string;
    page: string;
}

export interface CategoryPositionResponse {
    code: number;
    msg: string;
    data: {
        category: {
            categoryId: number;
            categoryName: string;
            description: string;
        };
        posInfo: {
            total: number;
            list: {
                positionId: number;
                title: string | null;
                describe: string | null;
                requirement: string | null;
                quantity: number;
                workCity: string | null;
                salaryUp: number;
                salaryDown: number;
                tags: string | null;
                releaseDate: string | null;
                validDate: string | null;
                statePub: number;
                hits: number;
                categoryId: number;
                departmentId: number;
                hrIdPub: number;
                companyId: number;
                companyName: string | null;
                companyLogo: string | null;
                description: string | null;
                state: number;
                companyCode: string | null;
                logoImage: string | null;
                logoImageBig: string | null;
            }[];
            pageNum: number;
            pageSize: number;
            size: number;
            startRow: number;
            endRow: number;
            pages: number;
            prePage: number;
            nextPage: number;
            isFirstPage: boolean;
            isLastPage: boolean;
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            navigatePages: number;
            navigatepageNums: number[];
            navigateFirstPage: number;
            navigateLastPage: number;
        };
        title: string | null;
    };
}

export interface RecommendedPositionsPath {
    page: string;
}

export interface RecommendedPositionsData {
    limit: number;
}

interface PositionInfo {
    positionId: number;
    title: string | null;
    describe: string | null;
    requirement: string | null;
    quantity: number;
    workCity: string | null;
    salaryUp: number;
    salaryDown: number;
    tags: string | null;
    releaseDate: string;
    validDate: string | null;
    statePub: number;
    hits: number;
    categoryId: number;
    departmentId: number;
    hrIdPub: number;
    companyId: number;
    companyName: string | null;
    companyLogo: string | null;
    description: string | null;
    state: number;
    companyCode: string | null;
    logoImage: string | null;
    logoImageBig: string | null;
}

interface User {
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
}

export interface RecommendedPositionsResponse {
    code: number;
    msg: string;
    data: {
        posInfo: PositionInfo[];
        user: User;
        total: number;
    };
}

export interface PositionDetailData {
    limit: number;
}

export interface PositionDetailPath {
    page: string;
    positionId: string;
}

export interface PositionDetailResponse {
    code: number;
    msg: string;
    data: {
        category: Category;
        comList: ComList;
        company: Company;
        department: Department;
        position: Position;
        positionHr: PositionHr;
        user: User;
    };
}

interface ComList {
    total: number;
    list: UserComment[];
    pageNum: number;
    pageSize: number;
    size: number;
    startRow: number;
    endRow: number;
    pages: number;
    prePage: number;
    nextPage: number;
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
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    navigatePages: number;
    navigatepageNums: number[];
    navigateFirstPage: number;
    navigateLastPage: number;
}

interface UserComment {
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
    commentId: number;
    type: number;
    content: string | null;
    releaseTime: string | null;
}

interface Company {
    companyId: number;
    companyName: string | null;
    companyLogo: string | null;
    description: string | null;
    state: number;
    companyCode: string | null;
    city: string | null;
    phone: string | null;
    logoImage: string | null;
    logoImageBig: string | null;
}

interface Department {
    departmentId: number;
    departmentName: string | null;
    description: string | null;
    companyId: number;
}

interface Position {
    positionId: number;
    title: string | null;
    describe: string | null;
    requirement: string | null;
    quantity: number;
    workCity: string | null;
    salaryUp: number;
    salaryDown: number;
    tags: string | null;
    releaseDate: string | null;
    validDate: string | null;
    statePub: number;
    hits: number;
    categoryId: number;
    departmentId: number;
    hrIdPub: number;
}

interface PositionHr {
    hrId: number;
    hrMobile: string | null;
    hrPassword: string | null;
    hrName: string | null;
    hrEmail: string | null;
    description: string | null;
    departmentId: number;
    faceImage: string | null;
    faceImageBig: string | null;
}

export interface searchPositionData {
    keyword: string;
    orderBy: string;
    page: number;
    limit: number;
    categoryId: number;
}

export interface searchPositionResponse {
    code: number;
    msg: string;
    data: {
        keyword: string;
        orderBy: string;
        posInfo: PosInfo;
        title: string;
        user: User;
    };
}

interface PosInfo {
    total: number;
    list: {
        positionId: number;
        title: string | null;
        describe: string | null;
        requirement: string | null;
        quantity: number;
        workCity: string | null;
        salaryUp: number;
        salaryDown: number;
        tags: string | null;
        releaseDate: string | null;
        validDate: string | null;
        statePub: number;
        hits: number;
        categoryId: number;
        departmentId: number;
        hrIdPub: number;
        companyId: number;
        companyName: string | null;
        companyLogo: string | null;
        description: string | null;
        state: number;
        companyCode: string | null;
        logoImage: string | null;
        logoImageBig: string | null;
    }[];
    pageNum: number;
    pageSize: number;
    size: number;
    startRow: number;
    endRow: number;
    pages: number;
    prePage: number;
    nextPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    navigatePages: number;
    navigatepageNums: number[];
    navigateFirstPage: number;
    navigateLastPage: number;
}
