var topState = function(game){
	
};

topState.prototype = {
	create: function(){
		this.game.add.tileSprite(0, 0, ancho, alto, 'background');
		console.log("INGRESO AL TOP");
		
		top = this.game.add.text(40, 40, "TOP SCORED", { fontSize: '40px', fill: '#757676'});
		espera = this.game.add.text(40, 80, "Cargando...", { fontSize: '20px', fill: '#757676'});
		
		top1 = this.game.add.text(40, 120, "Top 1: NN", { fontSize: '30px', fill: '#757676'});
		top2 = this.game.add.text(40, 160, "Top 2: NN", { fontSize: '30px', fill: '#757676'});
		top3 = this.game.add.text(40, 200, "Top 3: NN", { fontSize: '30px', fill: '#757676'});
		top4 = this.game.add.text(40, 240, "Top 4: NN", { fontSize: '30px', fill: '#757676'});
		top5 = this.game.add.text(40, 280, "Top 5: NN", { fontSize: '30px', fill: '#757676'});
		top6 = this.game.add.text(40, 320, "Top 6: NN", { fontSize: '30px', fill: '#757676'});
		top7 = this.game.add.text(40, 360, "Top 7: NN", { fontSize: '30px', fill: '#757676'});

		you = this.game.add.text(40, 400, "Your Best Scored: " +puntuacion, { fontSize: '40px', fill: '#757676'});

		back = this.game.add.text(40, 480, "BACK", { fontSize: '40px', fill: '#757676'});
		back.inputEnabled = true;
    	back.events.onInputUp.add(this.volver, this);

    	this.getScoreds();
		this.mejorPuntuacion();
	},

	update: function(){

	},
	
	getScoreds: function(){
		console.log("Obteniendo getScoreds");
		var scoresRef = firebase.database().ref("users");
		var pos = 1;
		scoresRef.orderByValue().limitToLast(3).on("value", function(snapshot) {
		  snapshot.forEach(function(data) {
		  	switch(pos){
		  		case 1:
		  			top1.text = "Top "+pos+": "+ data.val().scored;
		  			break;
		  		case 2:
		  			top2.text = "Top "+pos+": "+ data.val().scored;
		  			break;
	  			case 3:
		  			top3.text = "Top "+pos+": "+ data.val().scored;
		  			break;
	  			case 4:
		  			top4.text = "Top "+pos+": "+ data.val().scored;
		  			break;
		  		case 5:
		  			top5.text = "Top "+pos+": "+ data.val().scored;
		  			break;
	  			case 6:
		  			top6.text = "Top "+pos+": "+ data.val().scored;
		  			break;
	  			case 7:
		  			top7.text = "Top "+pos+": "+ data.val().scored;
		  			break;
		  	}
		    pos++;
		  });
		});
		espera.text = "Listo";
	},


	mejorPuntuacion: function(){
		console.log("Buscando mejorPuntuacion");
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				var uid = user.uid;
				var getScored = firebase.database().ref('users/' + uid);
				getScored.on('value', function(snapshot) {
					bestScore = snapshot.val().scored;
					you.text = "Your Best Scored: " +bestScore;
				});
			}else{
				you.text = "Your Best Scored: NN";
			}
		});
	},

	volver: function(){
		puntuacion=0;
		document.location.reload(true);
	},
}