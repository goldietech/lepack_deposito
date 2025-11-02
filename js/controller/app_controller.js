//angular.module('myApp',[]);

angular.module('myApp').controller("initCtrl", function($scope, Data, PerfilHospital,$ionicModal, $location, DBLocal,Config,$ionicPopup,$ionicLoading, $compile){
	$scope.home = "Eavy Saúde";
	$scope.cadastro = "Novo Usuário";
	$scope.markershosp = [];
	$scope.markershosp = [];

	DBLocal.localdb();


	$scope.token = Config.token;
	$.fn.serializeObject = function(dados)
	{
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};



	$scope.redireciona = function(onde){
		window.location.href=onde;

	}

	$scope.FormSubmit = function(dados,btn = null){
		$('.fundo').removeClass('hide');
		$('.'+btn).fadeOut();
		var form = JSON.stringify($('form[name="'+dados+'"]').serializeObject());
		var form_data = $('form[name="'+dados+'"]');
		var target = form_data.attr('target');
		var Dalert = form_data.data('alert');

		Data.getData(form).success(function(data){
			if(target == 1){
				if(data.status && data.status == 'nao'){
					$scope.showAlert(data.titulo,data.msg);
					$('.'+btn).fadeIn();

				}else{
					//	alert('foi');
					DBLocal.db.transaction(function(res){
						var q = 'DELETE FROM LOGINUSER WHERE rowid >= ?';
						res.executeSql(q,['1']);
						res.executeSql("INSERT INTO LOGINUSER(email,nome,data_nascimento,problemas_saude,tipo_sanguineo,mae_nome,mae_telefone,pai_nome,pai_telefone,endereco,numero,complemento,bairro,estado,cidade,cep) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",[data.email,data.nome,data.data_nascimento,data.problemas_saude,data.tipo_sanguineo,data.mae_nome,data.mae_telefone,data.pai_nome,data.pai_telefone,data.endereco,data.numero,data.complemento,data.bairro,data.estado,data.cidade,data.cep]);
					});
					alert('oi');
					$scope.user_nome = data.nome;
					$scope.user_email = data.email;
					$scope.user_data_nasc = data.data_nascimento;
					$scope.user_problemas_saude = data.problemas_saude;
					$scope.user_tipo_sanguineo = data.tipo_sanguineo;
					$scope.user_pai_nome = data.pai_nome;
					$scope.user_pai_telefone = data.pai_telefone;
					$scope.user_mae_nome = data.mae_nome;
					$scope.user_mae_telefone = data.mae_telefone;
					$scope.user_endereco = data.endereco;
					$scope.user_numero = data.numero;
					$scope.user_complemento = data.complemento;
					$scope.user_cidade = data.cidade;
					$scope.user_estado = data.estado;
					$scope.user_bairro = data.bairro;
					window.location.href="admin/index.html";
				}
			}else if(target == 2){
				if(data.status && data.status == 'nao'){
					$scope.showAlert(data.titulo,data.msg);
					$('.'+btn).fadeIn();
				}else{
					//	alert('foi');
					DBLocal.db.transaction(function(res){
						var q = 'DELETE FROM LOGINUSER WHERE rowid >= ?';
						res.executeSql(q,['1']);
						res.executeSql("INSERT INTO LOGINUSER(email,nome,data_nascimento,problemas_saude,tipo_sanguineo,mae_nome,mae_telefone,pai_nome,pai_telefone,endereco,numero,complemento,bairro,estado,cidade,cep) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",[data.email,data.nome,data.data_nascimento,data.problemas_saude,data.tipo_sanguineo,data.mae_nome,data.mae_telefone,data.pai_nome,data.pai_telefone,data.endereco,data.numero,data.complemento,data.bairro,data.estado,data.cidade,data.cep]);
					});
					$scope.user_nome = data.nome;
					$scope.user_email = data.email;
					$scope.user_data_nasc = data.data_nascimento;
					$scope.user_problemas_saude = data.problemas_saude;
					$scope.user_tipo_sanguineo = data.tipo_sanguineo;
					$scope.user_pai_nome = data.pai_nome;
					$scope.user_pai_telefone = data.pai_telefone;
					$scope.user_mae_nome = data.mae_nome;
					$scope.user_mae_telefone = data.mae_telefone;
					$scope.user_endereco = data.endereco;
					$scope.user_numero = data.numero;
					$scope.user_complemento = data.complemento;
					$scope.user_cidade = data.cidade;
					$scope.user_estado = data.estado;
					$scope.user_bairro = data.bairro;
					window.location.href="admin/index.html";
				}
			}else if(target == 3){
				if(data.status && data.status == 'nao'){
					$scope.showAlert(data.titulo,data.msg);
					$('.'+btn).fadeIn();
				}else{
					window.location.href="home.html";
				}
			}

		}).error(function(data){
			//console.log(data? data : "Não foi possivel acessar o servidor");
		});
	};

	$scope.statusLogin = function(){
		DBLocal.db.transaction(function(res){
			var q = 'SELECT * FROM LOGINUSER';
			res.executeSql(q,[],function (tx, results) {
				var len = results.rows.length;
				if(len >= 1){
					window.location.href="admin/index.html";
				}
			});

		});
		//	window.location.href="admin/index.html";

	};

	$scope.showAlert = function(titulo,mensagem) {
		var alertPopup = $ionicPopup.alert({
			title: titulo,
			template: mensagem
		});

		alertPopup.then(function(res) {
			//console.log('Thank you for not eating my delicious ice cream cone');
		});
	};

	$scope.deslogar = function(){
		$('.fundo').removeClass('hide');
		DBLocal.db.transaction(function(res){
			var q = 'DELETE FROM LOGINUSER WHERE rowid >= ?';
			res.executeSql(q,['1']);
		});
		location.href="../home.html";
	};



	$ionicModal.fromTemplateUrl('views/perfil_hosp.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal_perfil_hosp = modal;
	});

	$scope.abreModal = function(id){
		var params = {
			opc : 'gerarMarker',
			unidade_especifica : id	,
			token: Config.token,
			usuario : $scope.user_email

		}
		Data.getData(params).success(function(valor){
			$scope.dadosHospital = valor[0];
			console.log($scope.dadosHospital);
			if($scope.dadosHospital.site){
				$('.siteHospital').removeClass('naoPossui');
				$('.siteHospital').addClass('possui');
				$('.siteHospitalA').attr('href',$scope.dadosHospital.site);
			}else{
				$('.siteHospital').addClass('naoPossui');
				$('.siteHospital').removeClass('possui');
			}

			if($scope.dadosHospital.contato_principal){
				$('.ligarHospital').removeClass('naoPossui');
				$('.ligarHospital').addClass('possui');
				$('.ligarHospitalA').attr('href','tel:'+$scope.dadosHospital.contato_principal);
			}else{
				$('.ligarHospital').addClass('naoPossui');
				$('.ligarHospital').removeClass('possui');
			}
			if($scope.dadosHospital.salvo){
				$('.salvarFavoritosHospital').addClass('salvoHospital');
				$('.salvoHospital').removeClass('salvarFavoritosHospital');
				$('.nomeFavorito').html('FAVORITO');

			}else{
				$('.salvoHospital').addClass('salvarFavoritosHospital');
				$('.salvarFavoritosHospital').removeClass('salvoHospital');
				$('.nomeFavorito').html('SALVAR');
			}

			var panorama;

			// StreetViewPanoramaData of a panorama just outside the Google Sydney office.
			var outsideGoogle;

			// StreetViewPanoramaData for a custom panorama: the Google Sydney reception.
			function getReceptionPanoramaData() {
					return {
					location: {
						pano: 'reception',  // The ID for this custom panorama.
						description: $scope.dadosHospital.endereco,
						latLng: new google.maps.LatLng($scope.dadosHospital.latitude, $scope.dadosHospital.longitude)
					},
					links: [{
						heading: 195,
						description: 'Sair',
						pano: outsideGoogle.location.pano
					}],
					copyright: 'Imagery (c) 2010 Google',
					tiles: {
						tileSize: new google.maps.Size(1024, 512),
						worldSize: new google.maps.Size(2048, 1024),
						centerHeading: 105,
						getTileUrl: function(pano, zoom, tileX, tileY) {
							return 'images/' +
							'panoReception1024-' + zoom + '-' + tileX + '-' + tileY + '.jpg';
						}
					}
				};
			}

			function initPanorama() {
				panorama = new google.maps.StreetViewPanorama(
					document.getElementById('street-view'),
					{
						pano: outsideGoogle.location.pano,
						// Register a provider for our custom panorama.
						panoProvider: function(pano) {
							if (pano === 'reception') {
								return getReceptionPanoramaData();
							}
						}
					});

					// Add a link to our custom panorama from outside the Google Sydney office.
					panorama.addListener('links_changed', function() {
						if (panorama.getPano() === outsideGoogle.location.pano) {
							panorama.getLinks().push({
								description: 'Google',
								heading: 25,
								pano: 'reception'
							});
						}
					});
				}

				function initialize(latitude,longitude) {
					latitude = parseFloat(latitude);
					longitude = parseFloat(longitude);
					// Use the Street View service to find a pano ID on Pirrama Rd, outside the
					// Google office.
					var streetviewService = new google.maps.StreetViewService;
					streetviewService.getPanorama(
						{location: {lat: latitude, lng: longitude}},
						function(result, status) {
							if (status === google.maps.StreetViewStatus.OK) {
								outsideGoogle = result;
								initPanorama();
							}
						});
					}
					initialize($scope.dadosHospital.latitude,$scope.dadosHospital.longitude);
				});
				//alert(id);
				$scope.modal_perfil_hosp.show();
			};

			$scope.salvarFavoritos = function(unidade){
				var params = {
					opc : 'salvarFavoritos',
					usuario : $scope.user_email,
					token : $scope.token,
					hospital : unidade
				}
				Data.getData(params).success(function(valor){
					console.log(valor);
					if(valor.status == 'add'){
						$('.salvarFavoritosHospital').addClass('salvoHospital');
						$('.salvoHospital').removeClass('salvarFavoritosHospital');
						$('.nomeFavorito').html('FAVORITO');
					}else{
						$('.salvoHospital').addClass('salvarFavoritosHospital');
						$('.salvarFavoritosHospital').removeClass('salvoHospital');
						$('.nomeFavorito').html('SALVAR');
					}
					$scope.gerarMarker($scope.user_cidade);

				});
			};
			$scope.fechaModal = function(){
				$scope.modal_perfil_hosp.hide();

				$ionicModal.fromTemplateUrl('views/perfil_hosp.html', {
					scope: $scope,
					animation: 'slide-in-up'
				}).then(function(modal) {
					$scope.modal_perfil_hosp = modal;
				});
			};
			$ionicModal.fromTemplateUrl('views/perfil.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal_perfil = modal;
			});
			$ionicModal.fromTemplateUrl('views/sobre.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal_sobre = modal;
			});
			$scope.abreModalPerfil = function(){
				$scope.modal_perfil.show();
			};
			$scope.abreModalSobre = function(){
				$scope.modal_sobre.show();
			};
			$scope.fechaModalPerfil = function(){
				$scope.modal_perfil.hide();
				$ionicModal.fromTemplateUrl('views/perfil.html', {
					scope: $scope,
					animation: 'slide-in-up'
				}).then(function(modal) {
					$scope.modal_perfil = modal;
				});



			};
			$scope.fechaModalSobre = function(){
				$scope.modal_sobre.hide();
				$ionicModal.fromTemplateUrl('views/sobre.html', {
					scope: $scope,
					animation: 'slide-in-up'
				}).then(function(modal) {
					$scope.modal_sobre = modal;
				});



			};
			$scope.mapa = function(){
				var gmarkers = [];
				$scope.dadosLogin('sem');

				function initialize() {

					var myLatlng = null;

					var mapOptions = {
						center: myLatlng,
						zoom: 16,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					var map = new google.maps.Map(document.getElementById("map"),
					mapOptions);

					//Marker + infowindow + angularjs compiled ng-click


					$scope.map = map;
					var enderecoCadastro = $scope.user_endereco+', '+$scope.user_numero+' '+$scope.user_bairro+' - '+$scope.user_cidade+' '+$scope.user_estado;
					var params = {
						endereco : enderecoCadastro
					}
					alert('mapa');
					$scope.centerOnMe();
				}
				google.maps.event.addDomListener(window, 'load', initialize);

				$scope.centerOnMe = function() {
					if(!$scope.map) {
						return;
					}

					for(i=0; i<gmarkers.length; i++){
						gmarkers[i].setMap(null);
					}
					console.log($scope.map);
					$scope.loading = $ionicLoading.show({
						content: 'Getting current location...',
						showBackdrop: false
					});
					navigator.geolocation.getCurrentPosition(function(pos) {
						$scope.latitudeAtual = pos.coords.latitude;
						$scope.longitudeAtual = pos.coords.longitude;

						$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
						var params = {
							lat : pos.coords.latitude,
							lgt : pos.coords.longitude
						}
						Data.getMapI(params).success(function(valor){
							$scope.map_endereco = valor.results[0].formatted_address;
							$scope.map_bairro = valor.results[0].address_components[3].long_name;
							var myLatlngP = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
							var marker = new google.maps.Marker({
								position: myLatlngP,
								map: $scope.map,
								title: 'atual'
							});
							gmarkers.push(marker);
							$scope.gerarMarker($scope.map_bairro);

							//	marker.setIcon('images/marker_atual.png');
						}).error(function(data){
							//console.log(data? data : "Não foi possivel acessar o servidor");
						});

						//marker.setIcon('images/marker_atual.png');

						$scope.loading.hide();
					}, function(error) {
						//alert('Unable to get location: ' + error.message);
					});




				};


				$scope.clickTest = function() {
					alert('Example of infowindow with ng-click')
				};
			}

			$scope.dadosHosp = function(){
				//alert('oi');
			}
			$scope.dadosLogin = function(tipo){
				DBLocal.db.transaction(function(res){
					var q = 'SELECT * FROM LOGINUSER';
					res.executeSql(q,null,function(i,data){
						if(data.rows.length){
							$scope.user_nome = data.rows.item(0).nome.split(' ')[0];
							$scope.user_email = data.rows.item(0).email;
							var data_nasc = data.rows.item(0).data_nascimento;
							var quebra = data_nasc.split('-');
							data_nasc = quebra[2]+'/'+quebra[1]+'/'+quebra[0];
							$scope.user_data_nasc = data_nasc;
							$scope.user_problemas_saude = data.rows.item(0).problemas_saude;
							$scope.user_tipo_sanguineo = data.rows.item(0).tipo_sanguineo;
							$scope.user_pai_nome = data.rows.item(0).pai_nome;
							$scope.user_pai_telefone = data.rows.item(0).pai_telefone;
							$scope.user_mae_nome = data.rows.item(0).mae_nome;
							$scope.user_mae_telefone = data.rows.item(0).mae_telefone;

							$scope.user_endereco = data.rows.item(0).endereco;

							$scope.user_numero = data.rows.item(0).numero;
							$scope.user_complemento = data.rows.item(0).complemento;
							$scope.user_cidade = data.rows.item(0).cidade;
							$scope.user_estado = data.rows.item(0).estado;
							$scope.user_bairro = data.rows.item(0).bairro;
						}else if(!tipo){
								location.href="../index.html";
						}
					});
				});
			};
			$scope.gerarMarker = function(cidade){
				var params = {
					opc : 'gerarMarker',
					city: cidade,
					token: $scope.token,
					usuario : $scope.user_email

				}
				for(i=0; i<$scope.markershosp.length; i++){
					$scope.markershosp[i].setMap(null);
				}
				Data.getData(params).success(function(valor){
					var total = valor.total;
					var i = 0;
					var contentString = '';
					var compiled =  '';
					var infowindow = '';
					var myLatlngP = '';
					$.each(valor, function(index, value) {
						var endereco = value.endereco+", "+value.numero+" "+value.complemento+" - "+value.bairro+" "+value.cidade;
						if(value.salvo){
							contentString = "<div><h4 style='margin:0; font-weight:bold'><strong>"+value.nome_simples+"</strong> <i class='fa fa-star' style='color:rgba(167, 136, 4, 0.75)'></i><br><small>"+value.nome_completo+"</small></h4><br><ul>";

						}else{
							contentString = "<div><h4 style='margin:0; font-weight:bold'><strong>"+value.nome_simples+"</strong><br><small>"+value.nome_completo+"</small></h4><br><ul>";

						}
						contentString += "<p>"+value.endereco+", "+value.numero+" "+value.complemento+" - "+value.bairro+" "+value.cidade+"</p><br>";
						contentString += "<a href='google.navigation:q="+value.latitude+","+value.longitude+"' style='text-decoration:none; cursor:pointer'><li style='border-bottom:1px solid #f9f9f9; padding:10px'><i class='fa fa-road' style='color:#3f3f3e'></i> Rota Até aqui</li></a>";
						contentString += "<a ng-click='abreModal("+value.id_unidade+")' style='text-decoration:none; cursor:pointer'><li style='border-bottom:1px solid #f9f9f9; padding:10px'><i class='fa fa-info-circle' style='font-size:16px'></i> Sobre</li></a>";
						contentString += "</ul></div>";
						compiled = $compile(contentString)($scope);

						window['infoWindow'+index] = new google.maps.InfoWindow({
							content: compiled[0]
						});

						window['myLatlngP'+index] = new google.maps.LatLng(value.latitude, value.longitude);
						window['marker'+index] = new google.maps.Marker({
							position: window['myLatlngP'+index],
							map: $scope.map,
							animation: google.maps.Animation.DROP
						});
						$scope.markershosp.push(window['marker'+index]);
						if(value.salvo == 'sim'){

							window['marker'+index].setIcon('images/marker_hospf.png');
						}else{
							window['marker'+index].setIcon('images/marker_hosp.png');
						}
						google.maps.event.addListener(window['marker'+index], 'click', function() {
							window['infoWindow'+index].open(map,window['marker'+index]);
						});
					});


				}).error(function(data){
					//console.log(data? data : "Não foi possivel acessar o servidor");
				});
			}
		});
