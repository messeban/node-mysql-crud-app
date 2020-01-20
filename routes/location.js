var x = new Boolean("false");
var globalQuery = "SELECT * FROM syndic ORDER BY id ";
module.exports = {

    postCommune: (req,res)=>{
        let codePostal = req.params.cp;

        let queryCommune = "select commune from cp_bel where code_postal= '"+codePostal+"';";
        db.query(queryCommune, (err,result)=> {
            if (err) {
                return res.status(500).send(err);
            }
            res.send({commune: result[0].commune});
    
        });
    },
};