'use strict';

flujoApp.config(function(RestangularProvider) {

	RestangularProvider.setBaseUrl('http://flujogenicoback.dev:8081');
	//RestangularProvider.setDefaultHeaders({'X-Auth-Token': window.sessionStorage.token});
	RestangularProvider.setDefaultHttpFields({ withCredentials: true });

	// RestangularProvider.setResponseExtractor(function(response, operation) {
	// 	console.log(response.status);
	// });
	RestangularProvider.setErrorInterceptor(
        function(response) {
            if (response.status == 401) {
                console.log("Login required... ");
                window.location.href='/#/login';
            } else if (response.status == 404) {
                console.log("Resource not available...");
            } else {
                console.log("Response received with HTTP error code: " + response.status );
            }
            return false; // stop the promise chain
     });


});	
