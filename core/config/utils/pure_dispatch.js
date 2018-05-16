const co = require('co');
const dispatch =  (actor) => co(actor)
module.exports = {
    dispatch
}
