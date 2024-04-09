import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const readAndTransformSvg = (filePath, idPrefix) => {
    const svgContent = readFileSync(filePath, "utf-8")
        .replace(/\r?\n/g, "")
        .replace(/<svg(.*?)>/, (match, capture) => {
            let attributes = capture
                .replace(/(width|height)="(.*?)"/g, "")
                .trim();
            const fileName = filePath.split("/").pop().replace(".svg", "");
            const id = `${idPrefix}-${fileName}`;

            if (!attributes.includes("viewBox")) {
                const widthMatch = capture.match(/width="(\d+(?:\.\d+)?)"/);
                const heightMatch = capture.match(/height="(\d+(?:\.\d+)?)"/);
                const width = widthMatch ? widthMatch[1] : "100";
                const height = heightMatch ? heightMatch[1] : "100";
                attributes += ` viewBox="0 0 ${width} ${height}"`;
            }

            return `<symbol id="${id}" ${attributes}>`;
        })
        .replace(/<\/svg>/, "</symbol>");
    return svgContent;
};

const findSvgFiles = (directory, idPrefix) => {
    let svgs = [];
    const items = readdirSync(directory, { withFileTypes: true });
    for (let item of items) {
        const itemPath = join(directory, item.name);
        if (item.isDirectory()) {
            svgs = [...svgs, ...findSvgFiles(itemPath, idPrefix)];
        } else if (item.isFile() && item.name.endsWith(".svg")) {
            svgs.push(readAndTransformSvg(itemPath, idPrefix));
        }
    }
    return svgs;
};

export const svgBuilder = (directoryPath, idPrefix = "icon") => {
    const svgSymbols = directoryPath
        ? findSvgFiles(directoryPath, idPrefix)
        : [];

    return {
        name: "svg-transform",
        transformIndexHtml(html) {
            return html.replace(
                "<body>",
                `<body>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">\n${svgSymbols.join(
                    "\n"
                )}\n</svg>\n`
            );
        },
    };
};
