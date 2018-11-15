let friends = require("../data/friends");

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends)
    })

    app.post('/api/friends', function (req, res) {
        let newfriend = req.body
        friends.push(newfriend)
        res.json(newfriend)
    })
}