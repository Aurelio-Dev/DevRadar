const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAtArray');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs} = request.query;
      // Buscar todos os devs num raio de 10km
      // Filtrar por tech  
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type:  'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

    return response.json({ devs })
    }
}