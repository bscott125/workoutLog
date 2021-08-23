const Sequalize = require('sequelize');

const sequelize = new Sequalize("postgres://postgres:12de02d9ace2444ca76afc1805370941@localhost:5432/workout-log");

module.exports = sequelize;