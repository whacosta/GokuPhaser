var menuState = function(game){

};

menuState.prototype = {
	create: function(){
		this.iniciaFirebase();
		console.log("menu Hasta Aqui bien");
		document.getElementById("loader").style.display = "none";
		this.game.add.tileSprite(0, 0, ancho, alto, 'background');
		gameTitle = this.game.add.sprite(ancho/2,140,"logo");
		gameTitle.scale.setTo(0.5, 0.5);
		gameTitle.anchor.setTo(0.5,0.5);

		playGame = this.game.add.button(ancho/2,alto/2,"play",this.clickPlay,this);
		playGame.scale.setTo(0.5, 0.5);
		playGame.anchor.setTo(0.5,0.5);

		scoreGame = this.game.add.button(ancho/2,alto/2 + 40,"scored",this.clickScored,this);
		scoreGame.scale.setTo(0.5, 0.5);
		scoreGame.anchor.setTo(0.5,0.5);	

		exitGame = this.game.add.button(ancho/2,alto/2 + 80,"quit",this.clickQuit,this);
		exitGame.scale.setTo(0.5, 0.5);
		exitGame.anchor.setTo(0.5,0.5);
		
	},
	clickPlay: function(){
		this.game.state.add('Game', gameState);
		this.game.state.start('Game');
	},

	clickScored: function(){
		this.game.state.add('Top', topState);
		this.game.state.start('Top');
	},

	clickQuit: function(){
		navigator.app.exitApp();
	},
	
	iniciaFirebase: function(){
		firebase.initializeApp(this.firebaseConfig);
		this.authFirebase();
	},	

	authFirebase: function(){
		firebase.auth().signInAnonymously().catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log("Error code: "+errorCode+" Message: "+errorMessage);
		  // ...
		});
	},

	firebaseConfig: {
		apiKey: "AIzaSyAaRj0xU4-NEY9UsowodxJd1ieycBlBKtA",
		authDomain: "gokuphaser.firebaseapp.com",
		databaseURL: "https://gokuphaser.firebaseio.com",
		projectId: "gokuphaser",
		storageBucket: "gokuphaser.appspot.com",
		messagingSenderId: "248921705398"
	}
}

