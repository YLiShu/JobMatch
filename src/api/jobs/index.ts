import http from "../../utils/http";
import type {
    CategoryPositionData,
    CategoryPositionPath,
    CategoryPositionResponse,
    CategoryResponse,
    PositionDetailData,
    PositionDetailPath,
    PositionDetailResponse,
    RecommendedPositionsData,
    RecommendedPositionsPath,
    RecommendedPositionsResponse,
    searchPositionData,
    searchPositionResponse,
} from "./types";

export const getCategoryList = () => {
    return http.get<CategoryResponse>("/getCategoryList");
};

export const getPositionByCategory = (
    { categoryId, page }: CategoryPositionPath,
    data: CategoryPositionData
) => {
    return http.get<CategoryPositionResponse>(
        `/category/${categoryId}/${page}`,
        data
    );
};

export const getRecommendedPositions = (
    { page }: RecommendedPositionsPath,
    data: RecommendedPositionsData
) => {
    return http.get<RecommendedPositionsResponse>(`/page/${page}`, data);
};

export const getPositionDetail = (
    { positionId, page }: PositionDetailPath,
    data: PositionDetailData
) => {
    return http.get<PositionDetailResponse>(
        `/position/${positionId}/${page}`,
        data
    );
};

export const getFavorOrNotPosition = ({
    positionId,
}: {
    positionId: string;
}) => {
    return http.get<any>(`/user/favorOrNot/${positionId}`);
};

export const getApplyOrNotPosition = ({
    positionId,
}: {
    positionId: string;
}) => {
    return http.get<any>(`/user/applyOrNot/${positionId}`);
};

export const collectedPosition = ({ positionId }: { positionId: string }) => {
    return http.get<any>(`/user/favor/${positionId}`);
};

export const cancelCollectedPosition = ({
    positionId,
}: {
    positionId: string;
}) => {
    return http.get<any>(`/user/disfavor/${positionId}`);
};

export const deliveryPosition = (data: { positionId: string }) => {
    return http.get<any>("/user/apply", data);
};

export const searchPosition = (data: searchPositionData) => {
    return http.get<searchPositionResponse>("/search", data);
};
