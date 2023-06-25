import sequelize from "../db/conn.js";
import { DataTypes } from "sequelize";


const User = sequelize.define("users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
  username: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, unique: false },
});


export default User;