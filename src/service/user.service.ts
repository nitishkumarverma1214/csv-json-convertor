import { User } from "../db/model/user.model";
import { InputUser } from "../types/user";

export class UserService {
  async insertUsers(users: InputUser[]) {
    for (const user of users) {
      const fullName = `${user.name.firstName} ${user.name.lastName}`;
      const age = parseInt(user.age, 10);

      const { address, name, age: _, ...rest } = user;

      const newUser = new User({
        name: fullName,
        age,
        address,
        additional_info: rest,
      });
      await newUser.save();
    }
  }

  async printAgeDistributionReport() {
    const users = await User.findAll({ raw: true });

    const groups = {
      "< 20": 0,
      "20 to 40": 0,
      "40 to 60": 0,
      "> 60": 0,
    };

    for (const user of users) {
      const { age } = user as any;

      if (age < 20) groups["< 20"] += 1;
      else if (age <= 40) groups["20 to 40"] += 1;
      else if (age <= 60) groups["40 to 60"] += 1;
      else groups["> 60"] += 1;
    }

    const total = users.length;

    console.log("\nAge-Group      % Distribution");
    for (const [label, count] of Object.entries(groups)) {
      const percentage = total === 0 ? 0 : Math.round((count / total) * 100);
      console.log(label.padEnd(15) + percentage);
    }
  }
}
