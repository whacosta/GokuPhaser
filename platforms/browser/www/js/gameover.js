var overState = function(game){

};

overState.prototype = {
	create: function(){
		this.game.add.tileSprite(0, 0, ancho, alto, 'background');
		texto = this.game.add.text(ancho/2,alto/2 - 100, "Game Over", { fontSize: '80px', fill: '#757676', align: "center"});
		playGame.scale.setTo(0.5, 0.5);
		texto.anchor.setTo(0.5,0.5);

		scores = this.game.add.text(ancho/2,alto/2 + 20, "Your Score: " +puntuacion, { fontSize: '40px', fill: '#757676'});
		bests = this.game.add.text(ancho/2,alto/2 + 60, "Your Best Score: " +bestScore, { fontSize: '20px', fill: '#757676'});
		scores.anchor.setTo(0.5,0.5);
		bests.anchor.setTo(0.5,0.5);

		back = this.game.add.text(ancho/2,alto/2 + 120, "BACK", { fontSize: '40px', fill: '#757676'});
		back.anchor.setTo(0.5,0.5);
		back.inputEnabled = true;
    	back.events.onInputUp.add(this.volver, this);	
		this.enviarPuntuacion();		
		console.log("Perdiste");
	},

	volver: function(){
		puntuacion=0;
		document.location.reload(true);
	},

	enviarPuntuacion: function(){
		//var database = firebase.database();
		console.log("Best Scored: "+bestScore);
		firebase.auth().onAuthStateChanged(function(user) {
			if (user && puntuacion > bestScore) {
				// User is signed in.
				bests.text = "New Best Score";
				var isAnonymous = user.isAnonymous;
				var uid = user.uid;
				var postData = {
				    username: uid,
				    scored: puntuacion,
				};
				var updates = {};
  				updates['users/' + uid] = postData;
  				firebase.database().ref().update(updates);

				console.log("PERDISTE Jugador:"+uid);

			} else {
				console.log("NO LOGIN");
			}
		});
	}

}