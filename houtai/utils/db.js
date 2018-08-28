//数据库辅助工具，链接mongodb数据库
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/db");

module.exports = mongoose;