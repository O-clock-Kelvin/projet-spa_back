import { Router } from "express";

const errorHandler = {
    
    status_404 : (req,res) => {        
        errorHandler.logError(`Erreur 404 -  ${req.url}`);
        res.status(404).json({message : "Nous sommes désolés, cette page est introuvable"});
    },
    status_500 : (err,_,res) => {
        console.error(err);
        res.status(500).json({message :"Erreur serveur. Nous sommes désolés pour la gène occasionnée"});
    }


};

export default errorHandler;

const handlerError = (err,req,res,next) => {
    if(err){
        res.status(500).json({message : "Erreur serveur. Nous sommes désolés pour la gène occasionnée"});
    }
};

getAll: async(req, res,next) => {
         
        const animals = await prismaClient.animal.findMany();
        res.json(animals);
        next();
    
},

    animalRouter.get('/', animalsController.getAll, handlerError);


app.use(errorHandler())

