import path from "path";
import { Database } from "./db";
import { CsvConverter } from "./util/csvToJson";
import { UserService } from "./service/user.service";
const execute = async () => {
  await Database.connect();
  const csvConverter = new CsvConverter();
  const sheetname = "input.csv";
  const filePath = path.join(__dirname, "../src/data/csv", sheetname);
  const jsonResult = await csvConverter.convertCSVToJSON(filePath);
  const userService = new UserService();
  await userService.insertUsers(jsonResult);
  await userService.printAgeDistributionReport();
};

execute();
