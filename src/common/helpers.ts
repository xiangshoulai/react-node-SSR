import path from "path";

export default function getProjectUrl(...str: string[]) {
    return path.join(__dirname, '../../', ...str);
}
