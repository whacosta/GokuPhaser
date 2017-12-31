var loadState = function(game){

};

loadState.prototype = {
	preload: function(){
		this.game.load.image('background','assets/background.jpg');
		this.game.load.image('goku','assets/goku.gif');
		this.game.load.image('objeto','assets/objeto.png');
		this.game.load.image('objeto2','assets/objeto2.png');
		this.game.load.image('objeto3','assets/objeto3.png');
		this.game.load.image('logo','assets/EsquivaTron.png');
		this.game.load.image('play','assets/Play-Game.png');
		this.game.load.image('scored','assets/Top-Scored.png');
		this.game.load.audio('death', 'assets/player_death.wav');
		this.game.load.audio('up', 'assets/pickup.wav');
	},
	create: function(){
		console.log("load Hasta Aqui bien");
		this.game.state.add('MainMenu', menuState);
		this.game.state.start('MainMenu');        
	},

};