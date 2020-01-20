module.exports = {
    getHomePage: (req, res) => {
        /*let query = "SELECT * FROM immeuble ORDER BY adresse ASC"; // qury database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }*/
            res.render('index.ejs', {
                title: 'KFS | Immeubles',
                //immeubles: result
            });
        //});
    },

    getContact: (req, res) => {
        /*let query = "SELECT * FROM immeuble ORDER BY adresse ASC"; // qury database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }*/
            res.render('contact.ejs', {
                title: 'KFS | Contact',
                //immeubles: result
            });
        //});
    },
};