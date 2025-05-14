import { promises as fs } from "fs";

export class CsvConverter {
  async convertCSVToJSON(filePath: string) {
    const data = await fs.readFile(filePath, "utf-8");
    const lines = data.trim().split("\n");
    const headers = lines[0].split(",");

    const jsonResult = lines.slice(1).map((line: string) => {
      const rowValues = line.split(",");
      return this.createNestedObject(headers, rowValues);
    });
    console.log(jsonResult);
    return jsonResult;
  }
  createNestedObject(headers: string[], values: string[]) {
    const obj: any = {};
    headers.forEach((header, headerIndex) => {
      const keys = header.trim().split(".");
      let currentObj = obj;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!currentObj[key]) {
          currentObj[key] = {};
        }
        currentObj = currentObj[key];
      }
      currentObj[keys[keys.length - 1]] = values[headerIndex];
    });
    return obj;
  }
}
