import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db/conn.js';

const Show = sequelize.define('Show', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  timestamps: false,
});

export default Show;