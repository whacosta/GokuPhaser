var bootState = function(game){
	console.log("%cStarting my awesome game", "color:white; background:red");
	
};
  
bootState.prototype = {
	create: function(){
		alto = document.documentElement.clientHeight;
	    ancho = document.documentElement.clientWidth;
	    DIAMETRO_GOKU = 59;
		DIAMETRO_OBJETO = 128;
		
		dificultad=0;
		velocidadX=0;
		velocidadY=0;
		puntuacion=1;
		bestScore=0;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		console.log("boot Hasta Aqui bien");
		this.game.state.start('Preloader');

	},

}




