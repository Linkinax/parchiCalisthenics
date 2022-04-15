const mongoose = require('mongoose');
const Parchi = mongoose.model('Location');

const locationsCreate = (req, res) => {
    Parchi.create({
        name:req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords: {
            type : "Point",
            coordinates:[
                parseFloat(req.body.lng),
                parseFloat(req.body.lat)
            ]
        }
    }, ( err, location)=> {
        if(err){
            res
                .status(400)
                .json(err)
        }else{
            res
                .status(201)
                .json(location)
        }

    } )
    res
        .status(200)
        .json({"status":"success"})
 };
const locationsReadOne = (req, res) => {
    Parchi
        .findById(req.params.locationid)
        .exec( (err, response) => {
            if(!response){
                return res
                    .status(404)
                    .json({"message": "Location not found"});
            }else if(err){
                return res
                    .status(404)
                    .json(err);
            }
            console.log("Reading location "+ req.params.locationid);
            console.log(response);
            res
                .status(200)
                .json(response)
        });
 };

 
const locationsUpdateOne = (req, res) => { 
    if(! req.params.locationid){
        return res
            .status(404)
            .json({"message": "LocationID is required, yet not provided"});
    }

    Parchi.findById(req.params.locationid)
        .select('-reviews -rating')
        .exec( (err, location)=> {
            if(!location){
                return res
                        .status(404)
                        .json({"message": "locationID not Found"});
            }else if (err){
                return res
                        .status(404)
                        .json(err);

            }
            
            //Updating...
            location.name = req.body.name;
            location.address = req.body.address;
            location.facilities = req.body.facilities.split(',');

            location.coords= {
                type:"Point",
                coordinates:[
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)

                ]
            };

            //saving...
            location.save( (err,loc)=> {
                if(err){
                    res
                        .status(404)
                        .json(err)
                }else{
                    res
                        .status(201)
                        .json(loc)
                }
            });


        })
    res
        .status(200)
        .json({"status":"success"})
};
const locationsListByDistance =  async (req, res) => {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const maxD = req.query.maxDist;
    
    const near= {
        type: "Point",
        coordinates: [lng, lat]
    };

    const geoOptions= {
        distanceField: "distance.calculated",
        key:'coords',
        spherical:true,
        maxDistance:2000000,
        $limit:10
    }

    //params check
    if(!lng || ! lat){
        return res
            .status(404)
            .json({"message": "lng and lat param are required"})
    }

    try{
        const results= await Parchi.aggregate([
            {
                $geoNear:{
                    near,
                    ...geoOptions
                }
            }
        ]);
        const locations = results.map(result => {
            return {
                id: result._id,
                name:result.name,
                address:result.address ,
                rating: result.rating,
                facilities: result.facilities ,
                distance:  `${result.distance.calculated.toFixed()} m`
            }
        });
        console.log(results);
        console.log(locations)
        res
            .status(200)
            .json(locations);
 

    }catch(error){
        console.log(error)
        res 
            .status(404)
            .json(error)
    }

 };
const locationsDeleteOne = (req, res) => {
    res
        .status(200)
        .json({"status":"success"})
 };
 

module.exports= {
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne,
    locationsListByDistance
}