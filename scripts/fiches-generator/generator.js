const generator = async () => { 
  require('dotenv').config()
  
  let fs = require("fs")
  let he = require("he")
  let { render } = require("mustache")
  let fetch = require('node-fetch')

  const url = 'https://directus.incubateur.anct.gouv.fr/items/investigations?filter[promotion][_eq]=1&fields=*,communes.communes_id.nom,departements.departements_id.nom,epcis.epcis_id.nom,regions.regions_id.nom'
  const response = await fetch(url, {
    headers: {'Authorization': `Bearer ${process.env.TOKEN}`}
  });
  const data = await response.json();
  const investigations = data['data'];

  var id = 0;
  const investigationsMapped = investigations.map(investigation => {
    id = id + 1;
    investigation['id'] = id;

    const collectivites = []
    
    investigation['owner'] = investigation.communes.map((c) => { return c.communes_id.nom }).join(', ')
    if (!investigation['owner']) {
      investigation['owner'] = "Agence nationale de la cohésion des territoires"
    }

    investigation['fiche_de_probleme'] = he.decode(investigation['fiche_de_probleme'])
    investigation['mission'] = he.decode(investigation['mission'])
    
    return investigation
  })

  let template = fs.readFileSync("./template.md").toString()

  investigationsMapped.forEach(i => {
    let output = render(template, i)
    fs.writeFileSync(`./investigations/anct-pni-${i.id}.md`, output)
  })
}

generator();
