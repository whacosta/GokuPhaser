var overState = function(game){};

overState.prototype = {
	create: function(){
		scoreText = this.game.add.text(16,16, "Perdiste", { fontSize: '100px', fill: '#757676'});
		console.log("Perdiste");
	}
}