const db = require('./DB_Handler');
const DB = new db();


module.exports = {
    get: (tab, req, res) => {
        DB.Get(tab).then(results => res.json(results))
        .catch(err => {
            res.statusCode = 400;
            res.json({error: err.toString()});
        });
    },
    post: (tab, req, res) => {
        DB.Insert(tab, req.body).then(results => res.json(results))
            .catch(err => {
                res.statusCode = 400;
                res.json({error: err.toString()});
            });
    },
    put: (tab, req, res) => {
        DB.Update(tab, req.body).then(results => {
            if (results[0])
                res.json(results);
            else {
                res.statusCode = 400;
                res.json({error: 'This records not founded'});
            }
        }).catch(err => {
            res.statusCode = 400;
            res.json({error: err.toString()});
        });
    },
    delete: (tab, req, res) => {
        DB.Delete(tab, req.body).then(results => {
            if (results)
                res.json(results);
            else {
                res.statusCode = 400;
                res.json({error: 'This records not founded'});
            }
        }).catch(err => {
            res.statusCode = 400;
            res.json({error: err.toString()});
        });
    }
};
