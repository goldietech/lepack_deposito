(function(){
	"use strict";
	angular.module("myApp").config(function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise("/menu/home");

		$stateProvider

		.state("menu", {
			url:"/menu",
			templateUrl:"views/menu.html",
			abstract: true,
			controller: "initCtrl"
		})
		.state("index", {
			url:"/index",
			views:{
				'menuContent':{
					templateUrl:"../index.html"

				}
			}
		})
		.state("menu.home", {
			url:"/home",
			views:{
				'menuContent':{
					templateUrl:"views/home.html"

				}
			}
		})
		.state("menu.cadastro", {
			url:"/cadastro",
			views:{
				'menuContent':{
					templateUrl:"views/cadastro.html"

				}
			}
		})
		.state("menu.perfil_hosp", {
			url:"/perfil_hosp",
			templateUrl:"views/perfil_hosp.html"
		});



	});

})();
