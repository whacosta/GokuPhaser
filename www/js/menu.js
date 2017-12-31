var menuState = function(game){

};

menuState.prototype = {
	create: function(){
		console.log("menu Hasta Aqui bien");
		document.getElementById("loader").style.display = "none";
		this.game.add.tileSprite(0, 0, ancho, alto, 'background');

		//logo = game.add.sprite(ancho/2, alto/4, 'logo');
		
		this.game.state.add('Game', gameState);
		this.game.state.start('Game');
	},
}