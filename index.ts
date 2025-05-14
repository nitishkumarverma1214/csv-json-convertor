import path from "path";
import { CsvConverter } from "./CsvConverter";

const execute = () => {
  const csvConverter = new CsvConverter();
  const sheetname = "input.csv";
  const filePath = path.join(__dirname, sheetname);
  csvConverter.convertCSVToJSON(filePath);
};

execute();
