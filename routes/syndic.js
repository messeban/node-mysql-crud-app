var x = new Boolean("false");
var globalQuery = "SELECT * FROM syndic ORDER BY id ";
module.exports = {
      getSyndicPage: (req, res) => {
        let query = globalQuery; // qury database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('getSyndic.ejs', {
                title: 'KFS | Syndics',
                syndics: result
            });
        });
    },

    syndicsSortBy: (req, res) => {
        let orderBy = req.params.cat;
        var asc = "ASC";
        var desc = "DESC";
        let query = "";
        if(x){
            globalQuery = "SELECT * FROM syndic ORDER BY " + orderBy +" "+desc;
            x = false;
        }
        else{
            globalQuery = "SELECT * FROM syndic ORDER BY " + orderBy +" "+asc;
            x = true;
        }
        //let query = "SELECT * FROM syndic ORDER BY id DESC"; // qury database to get all the players

        // execute query

        res.redirect('/syndics');

    },


    addSyndicPage: (req, res) => {
        res.render('add-syndic.ejs',{
            title: 'KFS | Ajouter Syndic'
            ,message: ''
        });
    },
    addSyndic: (req, res) => {
        /*if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }*/
        let message = '';
        let nom = req.body.nom;
        let email = req.body.email;
        let adresse = req.body.adresse;
        let commune = req.body.commune;
        let code_postal = req.body.code_postal;


        let adresseQuery = "SELECT * FROM syndic WHERE adresse = '" + adresse + "'";//AND (code_postal = '" + code_postal + "')";

        db.query(adresseQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            if (result.length > 0) {
               message = 'Syndic existe déja dans notre base de données';
                res.render('add-syndic.ejs', {
                    message,
                    title: 'KFS | Ajouter Syndic'
                });
            } else {

                if (err) {
                   return res.status(500).send(err);

                }
                // send the player's details to the database
                let query = "insert into syndic (nom, email, adresse, commune, code_postal) VALUES ('" +
                nom + "', '" + email + "', '" + adresse + "', '" + commune + "', '" + code_postal+"')";
                
                    db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/syndics');
                });
            }
        });
    },
    editSyndicPage: (req, res) => {
        let syndicID = req.params.id;
        let query = "SELECT * FROM syndic WHERE syndicID = '" + syndicID + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-Syndic.ejs', {
                title: 'KFS | Modifier syndic',
                syndic: result[0]
                ,message: ''
            });
        });
    },
    editSyndic: (req, res) => {
        let syndicId = req.params.id;
        let nom = req.body.nom;
        let email = req.body.email;
        let adresse = req.body.adresse;
        let commune = req.body.commune;
        let code_postal = req.body.code_postal;

let query = "UPDATE syndic SET nom = '"+ nom+"', email= '"+email+"', adresse= '"+adresse+"', commune= '"+commune+"', code_postal= '"+code_postal+"' WHERE id = '"+syndicId+"'";
        //"UPDATE syndic SET adresse = '" + adresse + "', commune = '" + commune + "', code_postal = '" + code_postal + "', type_fin = '" + type_fin + "', type_credit = '" + type_credit + "', date_acquis = '" + date_acquis + "', date_vente = '" + date_vente + "' WHERE syndic.id = '" + syndicId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/syndics');
        });
    },
    deleteSyndic: (req, res) => {
        let syndicID = req.params.id;
        let deleteUserQuery = 'DELETE FROM syndic WHERE  id = "' + syndicID + '"';
        let deleteFromImmeuble = 'UPDATE immeuble set syndicID = null WHERE syndicID="'+ syndicID+'"';
        //let setSydicQuery = "UPDATE immeuble SET isSyndic  = '0' WHERE id='" + immeubleID+ "'";

       /* db.query(setSydicQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
        });*/
        db.query(deleteFromImmeuble, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
        });
        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/syndics');
        });
            
        
    }
};