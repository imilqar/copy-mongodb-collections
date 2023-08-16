const dotenv = require('dotenv')
dotenv.config()

// SOURCE
exports.SOURCE_URL = process.env.SOURCE_URL || ''
exports.SOURCE_DB_NAME = process.env.SOURCE_DB_NAME || ''

// TARGET
exports.TARGET_URL = process.env.TARGET_URL || ''
exports.TARGET_DB_NAME = process.env.TARGET_DB_NAME || ''

exports.COLLECTION_NAMES = process.env.COLLECTION_NAMES || []
