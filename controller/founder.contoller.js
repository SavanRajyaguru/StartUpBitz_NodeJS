const pool = require('../config/database');

const getFounder = (req, res) => {

    //* display all startup data
    pool.query('select * from founder', (err, result) => {
        if (err) {
            console.log("ERROR>>>> ", err);
            return res.status(200).json({ success: false })
        }
        res.status(200).json(result.rows);
    })
}

const insrtFounderDetails = (req, res) => {

    //* insert into the founder table 
    pool.query(
        `insert into founder 
        (uname, password, email, company_name, url, about, 
            investor_name, total_funding, industry, city, country, verify)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
            req.body.uname,
            req.body.password,
            req.body.email,
            req.body.company_name,
            req.body.url,
            req.body.about,
            req.body.investor_name,
            req.body.total_funding,
            req.body.industry,
            req.body.city,
            req.body.country,
            false
        ],
        async (err, result) => {
            if (err) {
                console.log("ERROR>>>> ", err);
                return res.status(200).json({ success: false });
            }
            console.log(result);

            //* select id from user table 
            const userIdObj = await pool.query('select fid from founder where email=$1', [req.body.email])
                .catch(err => console.log("USERID not get>>>", err));

            //* insert into login
            const userID = userIdObj.rows[0].fid;
            if (userID !== undefined) {
                await pool.query('insert into login (rid, role, password, email) values ($1, $2, $3, $4)',
                    [userID, 'f', req.body.password, req.body.email])
                    .then(result => {
                        return res.status(200).json({ success: true })
                    })
                    .catch(err => {
                        console.log('LOGIN Table ERROR>>> ', err);
                        return res.status(200).json({ success: false })
                    });
            } else {
                res.status(200).json({ success: false, msg: "Insert founder unscucessfull" });
            }
        }
    )

}

module.exports = {
    getFounder,
    insrtFounderDetails
}