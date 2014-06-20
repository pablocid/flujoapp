'use strict';

flujoApp.config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl('http://flujogenicoback.dev:8081');
	//RestangularProvider.setDefaultHeaders({'X-Auth-Token': 'fi27eEnVQZdHG4J9zTX3ypQBo6Y5s6QjPfU0mDoB'});
	RestangularProvider.setDefaultHeaders({'X-Auth-Token': window.sessionStorage.token});
	//RestangularProvider.setDefaultHttpFields({withCredentials: true});
	RestangularProvider.setDefaultHttpFields({ withCredentials: true });

	// RestangularProvider.setDefaultHeaders(
	// 	{"Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest" }
	// );

});


//tO2Y8pjquWilgPHohLj7lgebzgqB2WmtBRhU2yym