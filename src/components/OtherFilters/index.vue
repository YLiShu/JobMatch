<template>
    <div class="other-filters">
        <div class="other-filters-text">其他筛选</div>
        <div class="other-filters-options">
            <div class="other-filters-mutiselect">
                <div class="other-filters-mutiselect-input">
                    <div class="other-filters-title">学历要求</div>
                </div>
                <div class="other-filters-mutiselect-box" style="display: none">
                    <ul class="other-filters-mutiselect-select">
                        <li class="other-filters-mutiselect-select-item active">
                            <div class="text">不限</div>
                        </li>
                        <li class="other-filters-mutiselect-select-item">
                            <div class="text">大专</div>
                        </li>
                        <li class="other-filters-mutiselect-select-item">
                            <div class="text">本科</div>
                        </li>
                        <li class="other-filters-mutiselect-select-item">
                            <div class="text">硕士</div>
                        </li>
                        <li class="other-filters-mutiselect-select-item">
                            <div class="text">博士</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="other-filters-mutiselect">
                <div class="other-filters-mutiselect-input">
                    <div class="other-filters-title">薪资范围</div>
                </div>
                <div class="other-filters-mutiselect-box" style="display: none">
                    <ul class="other-filters-mutiselect-select">
                        <li class="other-filters-mutiselect-select-item active">
                            <div class="text">不限</div>
                        </li>
                        <li class="other-filters-mutiselect-select-item">
                            <div class="text">2千以下</div>
                        </li>
                        <li class="other-filters-mutiselect-select-item">
                            <div class="text">2-3千</div>
                        </li>
                        <li class="other-filters-mutiselect-select-item">
                            <div class="text">3-5千</div>
                        </li>
                        <li class="other-filters-mutiselect-select-item">
                            <div class="text">5-6千</div>
                        </li>
                        <li class="other-filters-mutiselect-select-item">
                            <div class="text">6-8千</div>
                        </li>
                        <li class="other-filters-mutiselect-select-item">
                            <div class="text">0.8-1万</div>
                        </li>
                        <li class="other-filters-mutiselect-select-item">
                            <div class="text">1-1.5万</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="other-filters-clear">清空筛选条件</div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.other-filters {
    align-items: center;
    color: #222;
    display: flex;
    font-size: 16px;
    font-weight: 700;
    height: 22px;
    line-height: 48px;
    min-height: 48px;
    width: 1000px;

    .other-filters-text {
        font-size: 15px;
        width: 80px;
    }

    .other-filters-options {
        align-items: center;
        display: flex;
        flex: 1;
        margin-right: 12px;

        .other-filters-mutiselect {
            background-color: #f5f6f7;
            border-radius: 8px;
            height: 32px;
            margin-right: 16px;
            position: relative;

            .other-filters-mutiselect-input {
                align-items: center;
                border: 1px solid transparent;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                height: 32px;
                line-height: 32px;

                .other-filters-title {
                    background-color: transparent;
                    border: 0;
                    color: #222;
                    font-size: 14px;
                    font-weight: 400;
                    height: 32px;
                    display: flex;
                    padding: 2px 8px;
                    align-items: center;
                    justify-content: center;
                }

                .other-filters-icon {
                    height: 32px;
                    line-height: 30px;
                    padding-left: 8px;
                    padding-right: 12px;
                }
            }

            .other-filters-mutiselect-box {
                padding-top: 8px;
                position: absolute;
                z-index: 10;

                .other-filters-mutiselect-select {
                    background-color: #fff;
                    border: 1px solid #edeff2;
                    border-radius: 12px;
                    padding: 8px 5px;
                    width: 192px;
                    max-height: 400px;
                    overflow: auto;

                    .other-filters-mutiselect-select-item {
                        border-radius: 8px;
                        box-sizing: border-box;
                        color: #222;
                        cursor: pointer;
                        display: flex;
                        font-size: 14px;
                        font-weight: 400;
                        height: 36px;
                        padding: 7px 10px;

                        .text {
                            flex: 1;
                            height: 22px;
                            text-align: left;
                            line-height: 22px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        &:hover {
                            background: #f6f6f6;
                        }
                    }
                }
            }

            &:hover {
                .other-filters-mutiselect-box {
                    display: block !important;
                }
            }
        }
    }

    .other-filters-clear {
        color: #afb3ba;
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
        height: 20px;
        line-height: 20px;

        &:hover {
            color: #00bebd;
        }
    }
}
</style>