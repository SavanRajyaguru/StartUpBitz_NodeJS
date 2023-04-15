const pool = require('../config/database');

const getLoginDetails = (req, res) => {

    pool.query('select * from public.login where email= $1 and password= $2',
        [req.body.email, req.body.password],
        (err, result) => {
            if (err) {
                console.log("ERROR>>>> ", err);
                return res.status(404).json({ success: false })
            }
            if (result.rowCount !== 0) {
                return res.status(200).json({ success: true, data: result.rows[0] });
            }
            res.status(200).json({ success: false });
        }
    )
}

module.exports = {
    getLoginDetails
}