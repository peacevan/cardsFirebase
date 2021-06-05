


// Initialize Firebase
  var config = {
    apiKey: "",
    authDomain: "atividadeunifacs.firebaseapp.com",
    databaseURL: "https://atividadeunifacs.firebaseio.com",
    projectId: "atividadeunifacs",
    storageBucket: "gs://atividadeunifacs.appspot.com/",
    messagingSenderId: ""
  };
  firebase.initializeApp(config);
  
  $(document).ready(function(){
	  
	firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            // User is signed in.
			//alert('usuario logado');
			
			pageListarCards();
            } else {
             PageLoginCard();
            }  
	  
	  });
   //PageLoginCard();
  //  pageListarContato();


});
