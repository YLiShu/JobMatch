import { ElMessage } from "element-plus";

interface IMessageOptions {
    message: string;
    type?: "success" | "warning" | "info" | "error";
    duration?: number;
    showClose?: boolean;
}

const showMessage = (opts: IMessageOptions) => {
    ElMessage({
        message: opts.message,
        type: opts.type,
        duration: opts.duration,
        showClose: opts.showClose,
    });
};

export default {
    success(message: string, duration = 3000, showClose = false) {
        showMessage({ type: "success", message, duration, showClose });
    },
    warning(message: string, duration = 3000, showClose = false) {
        showMessage({ type: "warning", message, duration, showClose });
    },
    info(message: string, duration = 3000, showClose = false) {
        showMessage({ type: "info", message, duration, showClose });
    },
    error(message: string, duration = 3000, showClose = false) {
        showMessage({ type: "error", message, duration, showClose });
    },
};
