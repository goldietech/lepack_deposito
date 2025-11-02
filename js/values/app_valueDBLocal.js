(function(){
	"use strict";
	angular.module("myApp").value("DBLocal",{
		db:null,
		localdb: function() {
			this.db = window.openDatabase("eavyDb", "1.0", "Banco Local", 2000);
			this.db.transaction(function(res) {
				res.executeSql("CREATE TABLE IF NOT EXISTS LOGINUSER(email varchar(255),nome varchar(255),data_nascimento DATE,problemas_saude TEXT,tipo_sanguineo varchar(255),mae_nome varchar(255),mae_telefone varchar(255),pai_nome varchar(255),pai_telefone varchar(255),endereco varchar(255),numero varchar(255),complemento varchar(255),bairro varchar(255),estado varchar(255),cidade varchar(255),cep varchar(255));", []);
			});
		}
	});
})();
