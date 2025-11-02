	angular.module("myApp").service("Data", function($http, Config){
		//recuperação de dados
		this.getData = function(params){
			//console.log(params);
			return $http({
				method: "POST",
				url: Config.getUrl,
				data: params
			});
		};
		this.getMap = function(params){

			//console.log(params);
			return $http({
				method: "GET",
				url: Config.urlMaps+"?address="+params.endereco+"&key="+Config.keyMap

			});
		};
		this.getMapI = function(params){

			//console.log(params);
			return $http({
				method: "GET",
				url: Config.urlMaps+"?latlng="+params.lat+","+params.lgt+"&location_type=ROOFTOP&result_type=street_address&key="+Config.keyMap

			});
		};
		//cadastro
		this.setData = function(dados){
			return $http({
				method: "POST",
				url: Config.getUrl,
				data: dados,
				headers : {
				                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
												  'Access-Control-Allow-Origin' : '*',
													'Access-Control-Allow-Headers' : '*'
				            }
			});
		};


	});

	angular.module("myApp").service("PerfilHospital", function($http, Config,Data){
		this.dadosHospital = function(dados){
			var params = {
					opc : 'gerarMarker',
					unidade_especifica : dados,
					token: Config.token
			}
			Data.getData(params).success(function(valor){

			});
			return valor;
		};

	});
