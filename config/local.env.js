var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_HOST: '"http://api-dev.concordeautocentre.com"'
    //API_HOST: '"http://loc.api.concordeautocentre.com"'
})
