var gameState = function(game){	};

gameState.prototype = {
	create: function(){
		this.vigilaSensores();
		this.game.add.tileSprite(0, 0, ancho, alto, 'background');
		scoreText = this.game.add.text(16,16, "S: "+puntuacion, { fontSize: '40px', fill: '#757676'});
		scoreBest = this.game.add.text(ancho -100 ,16, "BS: "+bestScore, { fontSize: '40px', fill: '#757676'});
		
			
		objeto = this.game.add.sprite(this.inicioXO(), 0, 'objeto');
		goku=this.game.add.sprite(this.inicioX(), alto, 'goku');
			
		this.game.physics.arcade.enable(goku);
		this.game.physics.arcade.enable(objeto);
		
		objeto2 = this.game.add.sprite(this.inicioXO(), -72, 'objeto2');
		this.game.physics.arcade.enable(objeto2);			

		objeto3 = this.game.add.sprite(this.inicioXO(), -72, 'objeto3');
		this.game.physics.arcade.enable(objeto3);
		
		up = this.game.add.audio('up');
		death = this.game.add.audio('death');
		goku.body.collideWorldBounds = true;

		this.mejorPuntuacion();
	},

	update: function(){
		goku.body.velocity.y = (velocidadY * 300);
		goku.body.velocity.x = (velocidadX * -300);
		
		objeto.body.gravity.y = (50 + dificultad );
		objeto.body.collideWorldBounds = true;
		objeto.body.onWorldBounds = new Phaser.Signal();
		objeto.body.onWorldBounds.add(this.incrementaPuntuacion, this);

		this.game.physics.arcade.overlap(goku,objeto, this.perdiste, null, this);

		if(puntuacion >10){
			objeto2.body.gravity.y = (60 + dificultad );
			objeto2.body.collideWorldBounds = true;
			objeto2.body.onWorldBounds = new Phaser.Signal();
			objeto2.body.onWorldBounds.add(this.incrementaPuntuacion, this);
		}

		this.game.physics.arcade.overlap(goku,objeto2, this.perdiste, null, this);

		if(puntuacion > 30){
			objeto3.body.gravity.y = (60 + dificultad );
			objeto3.body.collideWorldBounds = true;
			objeto3.body.onWorldBounds = new Phaser.Signal();
			objeto3.body.onWorldBounds.add(app.incrementaPuntuacion, this);
		}

		this.game.physics.arcade.overlap(goku,objeto3, this.perdiste, null, this);
	},

	perdiste: function(){
		this.game.state.add('GameOver', overState);
		this.game.state.start('GameOver');
	},

	mejorPuntuacion: function(){
		console.log("Buscando mejorPuntuacion");
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				var uid = user.uid;
				var getScored = window.FirebaseDatabasePlugin.ref('users/' + uid);
				getScored.on('value', function(snapshot) {
					bestScore = snapshot.val().scored;
					scoreBest.text = "BS: "+bestScore;
				});
			}else{
				console.log("NO LOGIN");
			}
		});
	},

	incrementaPuntuacion: function(){
		puntuacion = puntuacion+1;
		scoreText.text = "S: "+puntuacion;
		up.play();

		objeto.body.x = this.inicioXO();
		objeto.body.y = 0;

		if(puntuacion> 0){
			dificultad = dificultad + 10;

			if(puntuacion > 11){
				objeto2.body.x = this.inicioXO();
				objeto2.body.y = 0;
			}
			if (puntuacion > 31) {
				objeto3.body.x = this.inicioXO();
				objeto3.body.y = 0;
			}		
		}
		//sonido.stop();

	},


	inicioX: function(){
		return this.numeroAletorioHasta( ancho - DIAMETRO_GOKU);
	},

	inicioXO: function(){
		return this.numeroAletorioHasta( ancho - DIAMETRO_OBJETO);
	},

	inicioY: function(){
		return this.numeroAletorioHasta( alto - DIAMETRO_GOKU);
	},

	numeroAletorioHasta: function(limite){
		var num = Math.floor(Math.random() * limite);
		return num;
	},

	vigilaSensores: function(){
		function onError(){
			console.log('onError');
		}

		function onSuccess(datosAceleracion){
			velocidadX = datosAceleracion.x;
			velocidadY = datosAceleracion.y;
		}	

		navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 10 });
	},

	recomienza: function(){
		puntuacion=0;
		document.location.reload(true);
	},
}