const pool = require('../config/database');

const getUser = (req, res) => {
    pool.query('select id, uname, email from users', (err, result) => {
        if (err) {
            console.log("ERROR>>>> ", err);
            return res.status(404).json({ success: false })
        }
        res.status(200).json(result.rows);
    })
}

const insertUser = (req, res) => {
    pool.query(
        'insert into users (uname, password, email) values ($1, $2, $3)',
        [req.body.uname, req.body.password, req.body.email],
        async (err, result) => {
            if (err) {
                console.log("ERROR>>>> ", err);
                return res.status(200).json({ success: false })
            }

            //* select id from user table 
            const userIdObj = await pool.query('select id from users where email=$1', [req.body.email])
                .catch(err => console.log("USERID not get>>>", err));


            //* insert into login
            const userID = userIdObj.rows[0].id;
            if (userID !== undefined) {
                await pool.query('insert into login (rid, role, password, email) values ($1, $2, $3, $4)',
                    [userID, 'u', req.body.password, req.body.email])
                    .then(result => {
                        return res.status(200).json({ success: true })
                    })
                    .catch(err => {
                        console.log('LOGIN Table ERROR>>> ', err);
                        return res.status(200).json({ success: false })
                    });
            } else {
                res.status(200).json({ success: false, msg: "Insert unscucessfull" });
            }
        })
}

module.exports = {
    getUser,
    insertUser
}