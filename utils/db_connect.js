const mongoose = require('mongoose')

const db_url = 'mongodb://127.0.0.1:27017/first-reactapp-backend';

mongoose.connect(db_url, {}).then(() => console.log('DATABASE CONNECTED')).catch(err => console.error(err))