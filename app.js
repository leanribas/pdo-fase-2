/*
	App configuration
*/

define([
	"libs/core",
	"helpers/menu",
	"helpers/locale",	
	"libs/rollbar"
], function(core, menu, locale, tracker){


	//webix.codebase = "./";
	//CKEditor requires full path
	webix.codebase = document.location.href.split("#")[0].replace("index.html","")+"libs/webix/";

	if(!webix.env.touch && webix.ui.scrollSize && webix.CustomScroll)
		webix.CustomScroll.init();


	if (webix.production)
		tracker.init({
			accessToken: '650b007d5d794bb68d056584451a57a8',
			captureUncaught: true,
			source_map_enabled: true,
			code_version:"0.8.0",
			payload: {
				environment: 'production'
			}
		});

	//configuration
	var app = core.create({
		id:             "sca",
		name:		"Sistema de Cadastro de Alunos",
		version:	"0.1",
		debug:		false,
		start:		"/app/listatodosalunos"		
	});

	app.use(menu);
	app.use(locale);
        
	return app;
});