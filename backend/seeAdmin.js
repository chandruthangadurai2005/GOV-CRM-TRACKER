require("dotenv").config();
const bcrypt = require("bcryptjs");
const sequelize = require("./config/database");
const User = require("./models/User");

const seedAdmin = async () => {
  try {
    await sequelize.sync();

    const existing = await User.findOne({
      where: { email: "admin@crm.com" },
    });

    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@crm.com",
      password: hashedPassword,
    });

    console.log("✅ Admin created");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
