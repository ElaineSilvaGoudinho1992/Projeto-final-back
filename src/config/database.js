const { Sequelize } = require('sequelize');
const dns = require('node:dns');
require('dotenv').config();

// Force IPv4 to avoid IPv6 ENETUNREACH in containers
dns.setDefaultResultOrder('ipv4first');
const lookup = (hostname, options, callback) => {
  if (typeof options === 'function') {
    return dns.lookup(hostname, { family: 4 }, options);
  }
  return dns.lookup(hostname, { family: 4 }, callback);
};

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Necessario para o Supabase
    },
    lookup
  },
  logging: false,
});

module.exports = sequelize;