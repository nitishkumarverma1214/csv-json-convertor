import { Sequelize } from "sequelize-typescript";
import { Database } from "../db";
import { User } from "../db/model/user.model";
import { InputUser } from "../types/user";
import { QueryTypes } from "sequelize";

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
    const sequelize = Database.getInstance();
    const results = await sequelize.query(
      `
    SELECT
      CASE
        WHEN age < 20 THEN '< 20'
        WHEN age >= 20 AND age < 40 THEN '20 to 40'
        WHEN age >= 40 AND age < 60 THEN '40 to 60'
        ELSE '> 60'
      END AS age_group,
      COUNT(*) * 100.0 / SUM(COUNT(*)) OVER () AS percentage,
      CASE
        WHEN age < 20 THEN 1
        WHEN age >= 20 AND age < 40 THEN 2
        WHEN age >= 40 AND age < 60 THEN 3
        ELSE 4
      END AS sort_order
    FROM users
    GROUP BY age_group, sort_order
    ORDER BY sort_order
    `,
      { type: QueryTypes.SELECT }
    );

    console.log("\nAge-Group % Distribution:");
    (results as any[]).forEach((row) => {
      console.log(
        `${row.age_group.padEnd(10)} ${Number(row.percentage).toFixed(2)}%`
      );
    });
  }
}
