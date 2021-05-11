module.exports = function registerHook({ exceptions }) {
	// const { InvalidPayloadException } = exceptions;
  const fetch = require('node-fetch');

	return {
		'items.*': function () {
      const body = {
        "event_type": "dokku_rebuild"
      }
      
      fetch('https://api.github.com/repos/incubateur-territoires/incubateur.anct.gouv.fr/dispatches', {
        method: "post",
        body: JSON.stringify(body),
        headers: {
          'Authorization': `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
          'Accept': "application/vnd.github.v3+json"
        }
      })
		},
	};
};
