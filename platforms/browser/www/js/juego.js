var app={
	inicio: function(){
		DIAMETRO_GOKU = 59;
		DIAMETRO_OBJETO = 128;
		
		dificultad=0;
		velocidadX=0;
		velocidadY=0;
		puntuacion=1;

		alto = document.documentElement.clientHeight;
		ancho = document.documentElement.clientWidth;

		app.vigilaSensores();
		app.iniciaJuego();
		
	},

	iniciaJuego: function(){
		function preload(){
			//game.stage.backgroundColor='#f27d0c';
			game.load.image('background','assets/background.jpg');
			game.load.image('goku','assets/goku.gif');
			game.load.image('objeto','assets/objeto.png');
			game.load.image('objeto2','assets/objeto2.png');
			game.load.image('objeto3','assets/objeto3.png');
			game.load.audio('death', 'assets/player_death.wav');
			game.load.audio('up', 'assets/pickup.wav');
			game.physics.startSystem(Phaser.Physics.ARCADE);
			
		}

		function create(){

			document.getElementById("loader").style.display = "none";
			game.add.tileSprite(0, 0, ancho, alto, 'background');
			
			scoreText = game.add.text(16,16, puntuacion, { fontSize: '100px', fill: '#757676'});
			
			objeto = game.add.sprite(app.inicioXO(), 0, 'objeto');
			goku=game.add.sprite(app.inicioX(), app.inicioY(), 'goku');
			
			game.physics.arcade.enable(goku);
			game.physics.arcade.enable(objeto);
			
			objeto2 = game.add.sprite(app.inicioXO(), -72, 'objeto2');
			game.physics.arcade.enable(objeto2);			

			objeto3 = game.add.sprite(app.inicioXO(), -72, 'objeto3');
			game.physics.arcade.enable(objeto3);
			
			up = game.add.audio('up');
			death = game.add.audio('death');
			goku.body.collideWorldBounds = true;
			//goku.body.onWorldBounds = new Phaser.Signal();
			//goku.body.onWorldBounds.add(app.decrementaPuntuacion, this);
		}

		function update(){
			goku.body.velocity.y = (velocidadY * 300);
			goku.body.velocity.x = (velocidadX * -300);
			
			objeto.body.gravity.y = (50 + dificultad );
			objeto.body.collideWorldBounds = true;
			objeto.body.onWorldBounds = new Phaser.Signal();
			objeto.body.onWorldBounds.add(app.incrementaPuntuacion, this);

			game.physics.arcade.overlap(goku,objeto, app.decrementaPuntuacion, null, this);

			if(puntuacion >10){
				objeto2.body.gravity.y = (60 + dificultad );
				objeto2.body.collideWorldBounds = true;
				objeto2.body.onWorldBounds = new Phaser.Signal();
				objeto2.body.onWorldBounds.add(app.incrementaPuntuacion, this);
			}

			game.physics.arcade.overlap(goku,objeto2, app.decrementaPuntuacion, null, this);

			if(puntuacion > 30){
				objeto3.body.gravity.y = (60 + dificultad );
				objeto3.body.collideWorldBounds = true;
				objeto3.body.onWorldBounds = new Phaser.Signal();
				objeto3.body.onWorldBounds.add(app.incrementaPuntuacion, this);
			}

			game.physics.arcade.overlap(goku,objeto3, app.decrementaPuntuacion, null, this);
		}

		var estados = { preload: preload, create: create, update: update };
		var game = new Phaser.Game(ancho, alto, Phaser.CANVAS,'phaser', estados);
	},

	decrementaPuntuacion: function(){
		puntuacion = 0;
		scoreText.text = puntuacion;
		death.play();
		if (puntuacion == 0) {
			var r = confirm("Perdiste!");
			if (r == true) {
			    setTimeout(app.recomienza, 1000);
			} else {
			    navigator.app.exitApp();
			}
		}
	},

	incrementaPuntuacion: function(){
		puntuacion = puntuacion+1;
		scoreText.text = puntuacion;
		up.play();

		objeto.body.x = app.inicioXO();
		objeto.body.y = 0;

		if(puntuacion> 0){
			dificultad = dificultad + 10;

			if(puntuacion > 11){
				objeto2.body.x = app.inicioXO();
				objeto2.body.y = 0;
			}
			if (puntuacion > 31) {
				objeto3.body.x = app.inicioXO();
				objeto3.body.y = 0;
			}		
		}
		//sonido.stop();

	},


	inicioX: function(){
		return app.numeroAletorioHasta( ancho - DIAMETRO_GOKU);
	},

	inicioXO: function(){
		return app.numeroAletorioHasta( ancho - DIAMETRO_OBJETO);
	},

	inicioY: function(){
		return app.numeroAletorioHasta( alto - DIAMETRO_GOKU);
	},

	numeroAletorioHasta: function(limite){
		return Math.floor(Math.random() * limite);
	},

	vigilaSensores: function(){
		function onError(){
			console.log('onError');
		}

		function onSuccess(datosAceleracion){
			app.detectaAgitacion(datosAceleracion);
			app.registraDireccion(datosAceleracion);
		}	

		navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 10 });
	},

	detectaAgitacion: function(datosAceleracion){
		agitacionX = datosAceleracion.x > 10;
		agitacionY = datosAceleracion.y > 10;

		if (agitacionX || agitacionY) {
			setTimeout(app.recomienza, 1000);
		}
	},

	recomienza: function(){
		document.location.reload(true);
	},

	registraDireccion: function(datosAceleracion){
		velocidadX = datosAceleracion.x;
		velocidadY = datosAceleracion.y;
	}

};

if('addEventListener' in document){
	document.addEventListener('deviceready', function(){
		app.inicio();
	}, false);
}
