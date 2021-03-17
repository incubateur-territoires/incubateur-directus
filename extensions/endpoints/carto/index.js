// /custom/carto/investigations

module.exports = function registerEndpoint(router, { database, exceptions }) {
	const { ServiceUnavailableException } = exceptions;

  const buildQuery = (table, id) => {
    return `
      SELECT row_to_json(fc)
      FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
      FROM (SELECT 'Feature' As type
        , ST_AsGeoJSON(lg.geom)::json As geometry
        , row_to_json((SELECT l FROM (SELECT nom, id) As l
          )) As properties
      FROM (
        SELECT d.id, d.nom, d.wkb_geometry AS geom
        FROM investigations i
        LEFT JOIN investigations_${table} id
        ON i.id = id.investigations_id
        LEFT JOIN ${table} d
        ON id.${table}_id = d.id
        WHERE i.id = ${id}
      ) As lg ) As f ) as fc
    `
  }

  router.get('/investigations/:id/communes', (req, res, next) => {
    const { id } = req.params;

    const query = buildQuery('communes', id)

    database.raw(query).then(({ rows }) => {
      res.send(rows[0].row_to_json)
    }).catch((error) => {
      return next(new ServiceUnavailableException(error.message))
    })
  });

  router.get('/investigations/:id/epcis', (req, res, next) => {
    const { id } = req.params;

    const query = buildQuery('epcis', id)

    console.log(query)

    database.raw(query).then(({ rows }) => {
      res.send(rows[0].row_to_json)
    }).catch((error) => {
      return next(new ServiceUnavailableException(error.message))
    })
  });

  router.get('/investigations/:id/departements', (req, res, next) => {
    const { id } = req.params;

    const query = buildQuery('departements', id)

    database.raw(query).then(({ rows }) => {
      res.send(rows[0].row_to_json)
    }).catch((error) => {
      return next(new ServiceUnavailableException(error.message))
    })
  });

  router.get('/investigations/:id/regions', (req, res, next) => {
    const { id } = req.params;

    const query = buildQuery('regions', id)

    database.raw(query).then(({ rows }) => {
      res.send(rows[0].row_to_json)
    }).catch((error) => {
      return next(new ServiceUnavailableException(error.message))
    })
  });
};
