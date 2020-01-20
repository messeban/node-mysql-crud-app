//nodemon app.js


var x = new Boolean("false");
//var globalQuery = "SELECT * FROM immeuble ORDER BY id ";
var globalQuery ="select immeuble.id, immeuble.adresse, immeuble.commune, immeuble.code_postal, immeuble.type_fin, immeuble.type_credit, immeuble.date_acquis, immeuble.date_vente, syndic.nom  FROM immeuble LEFT JOIN syndic ON immeuble.syndicId=syndic.id ;";
module.exports = {
      getImmeublePage: (req, res) => {
        let query = globalQuery; // qury database to get all the players
        let querySyndic = "SELECT * FROM syndic"
        // execute query
        db.query(querySyndic, (err, result1) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('getImmeuble.ejs', {
                    title: 'KFS | Modifier Immeuble',
                    immeubles: result,
                    syndics: result1,
                    message: ''
                });
            });

        });

    },

    immeublesSortBy: (req, res) => {
        let orderBy = req.params.cat;
        var asc = "ASC";
        var desc = "DESC";
        let query = "";
        if(x){
            globalQuery = "select immeuble.id, immeuble.adresse, immeuble.commune, immeuble.code_postal, immeuble.type_fin, immeuble.type_credit, immeuble.date_acquis, immeuble.date_vente, syndic.nom  from immeuble left join syndic on immeuble.syndicID=syndic.id ORDER BY " + orderBy +" "+desc+ ",immeuble.adresse;";
            x = false;
        }
        else{
            globalQuery = "select immeuble.id, immeuble.adresse, immeuble.commune, immeuble.code_postal, immeuble.type_fin, immeuble.type_credit, immeuble.date_acquis, immeuble.date_vente, syndic.nom  from immeuble left join syndic on immeuble.syndicID=syndic.id ORDER BY " + orderBy +" "+asc+ ",immeuble.adresse;";
            x = true;
        }
        //let query = "SELECT * FROM immeuble ORDER BY id DESC"; // qury database to get all the players

        // execute query
        /*db.query(globalQuery, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('getImmeuble.ejs', {
                title: 'KFS | Immeubles',
                immeubles: result
            });
        });*/
        res.redirect('/immeubles');

    },


    addImmeublePage: (req, res) => {
        let syndicQuery = "SELECT nom, id FROM syndic";
        db.query(syndicQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('add-immeuble.ejs', {
                title: 'KFS | Modifier Immeuble',
                syndics: result,
                message: ''
            });
        });
    },
    addImmeuble: (req, res) => {
        /*if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }*/

       let message = '';
        let adresse = req.body.adresse;
        let commune = req.body.commune;
        let code_postal = req.body.code_postal;
        let type_fin = req.body.type_fin;
        let type_credit = req.body.type_credit;
        let date_acquis = req.body.date_acquis;
        let date_vente = req.body.date_vente;
        let syndic = req.body.syndicID;
        let adresseQuery = "SELECT * FROM immeuble WHERE adresse = '" + adresse + "'";//AND (code_postal = '" + code_postal + "')";

        db.query(adresseQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            if (result.length > 0) {
               message = 'Immeuble existe déja dans notre base de données';
                res.render('add-immeuble.ejs', {
                    message,
                    title: 'KFS | Ajouter Immeuble'
                });
            } else {

                if (err) {
                   return res.status(500).send(err);

                }
                // send the player's details to the database
                let query;
                if((syndic==null)||(syndic==''))
                {
                    query = "INSERT INTO immeuble (adresse, commune, code_postal, type_fin, type_credit, date_acquis, date_vente) VALUES ('" +
                    adresse + "', '" + commune + "', '" + code_postal + "', '" + type_fin + "', '" + type_credit +"', '"+ date_acquis+"', '"+date_vente+"')";
                }
                else{
                    query = "INSERT INTO immeuble (adresse, commune, code_postal, type_fin, type_credit, date_acquis, date_vente, syndicID) VALUES ('" +
                    adresse + "', '" + commune + "', '" + code_postal + "', '" + type_fin + "', '" + type_credit +"', '"+ date_acquis+"', '"+date_vente+"', '"+syndic+"')";
                }
                    //let query = "INSERT INTO immeuble (adresse, commune, code_postal, type_fin, type_credit, date_acquis, date_vente) VALUES ('Asakusa', 'Taito', '2018','Banque' ,'Long-term','2019-01-20', '2022-01-20')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/immeubles');
                });
            }
        });
    },
    editImmeublePage: (req, res) => {
        let immeubleId = req.params.id;
        let query = "SELECT * FROM immeuble WHERE id = '" + immeubleId + "' ";
        let date_acquis;
        let date_vente = '';

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            //date_vente = result[0].date_vente;
            res.render('edit-immeuble.ejs', {
                title: 'KFS | Modifier Immeuble',
                'immeuble': result[0],
                message: ''
            });
        });
    },
    editImmeuble: (req, res) => {
        let immeubleId = req.params.id;
        let id = req.body.id;
        let adresse = req.body.adresse;
        let commune = req.body.commune;
        let code_postal = req.body.code_postal;
        let type_fin = req.body.type_fin;
        let type_credit = req.body.type_credit;
        let date_acquis = req.body.date_acquis;
        let date_vente = req.body.date_vente;

        let query = "UPDATE immeuble SET id = '"+id+"', adresse = '" + adresse + "', commune = '" + commune + "', code_postal = '" + code_postal + "', type_fin = '" + type_fin + "', type_credit = '" + type_credit + "', date_acquis = '" + date_acquis + "', date_vente = '" + date_vente + "' WHERE immeuble.id = '" + immeubleId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/immeubles');
        });
    },
    deleteImmeuble: (req, res) => {
        let immeubleId = req.params.id;
        let deleteUserQuery = 'DELETE FROM immeuble WHERE id = "' + immeubleId + '"';


        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/immeubles');
        });
            
        
    },
    getProfilePage: (req, res) => {
        let immeubleId = req.params.id;
        let queryImmeuble = "SELECT * FROM immeuble WHERE id = '" + immeubleId + "' ";
        let querySyndic = "SELECT syndicID FROM immeuble WHERE id = '" + immeubleId + "' ";

        let syndicQuery = "SELECT nom, id FROM syndic";
        db.query(syndicQuery, (err, result1) => {
            if (err) {
                return res.status(500).send(err);
            }

        
        

            db.query(queryImmeuble, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('getProfile.ejs', {
                    title: 'KFS | Modifier Immeuble',
                    immeuble: result[0],
                    syndics: result1,
                    checkSyndic: result[0],
                    message: ''
                });
            });
        });
    },

    getProfile: (req, res) => {
        let immeuble_Id = req.params.id;
        let immeubleId = req.body.immeubleId;
        let immeubleAdresse = req.body.immeubleAdresse;
        let immeubleCommune = req.body.immeubleCommune;
        let immeubleCode_Postal = req.body.immeubleCode_Postal;
        let type_fin = req.body.type_fin;
        let type_credit = req.body.type_credit;
        let date_acquis = req.body.date_acquis;
        let date_vente = req.body.date_vente;
       // let t1 = req.body.immeuble.id;
        //console.log(immeubleCommune);
        let nom = req.body.nom;
        let email = req.body.email;
        let adresse = req.body.adresse;
        let commune = req.body.commune;
        let code_postal = req.body.code_postal;
        let syndic = req.body.syndicID;

        let query ='';
        let query1 = '';

        if(syndic==null)
        {
            query = "UPDATE immeuble SET id = '"+immeuble_Id+"', adresse = '" + immeubleAdresse + "', commune = '" + immeubleCommune + "', code_postal = '" + immeubleCode_Postal + "', type_fin = '" + type_fin + "', type_credit = '" + type_credit + "', date_acquis = '" + date_acquis + "', date_vente = '" + date_vente +"' WHERE id = '" + immeuble_Id + "'";
        }
        else{
            query = "UPDATE immeuble SET id = '"+immeuble_Id+"', adresse = '" + immeubleAdresse + "', commune = '" + immeubleCommune + "', code_postal = '" + immeubleCode_Postal + "', type_fin = '" + type_fin + "', type_credit = '" + type_credit + "', date_acquis = '" + date_acquis + "', date_vente = '" + date_vente + "', syndicID = '" + syndic  +"' WHERE id = '" + immeuble_Id + "'";
        }



            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/immeubles');

            });
        
        


    },

};