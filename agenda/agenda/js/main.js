


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCnfKe3-cOwfjd6PRhl70BPskZVCgaOW6A",
    authDomain: "atividadeunifacs.firebaseapp.com",
    databaseURL: "https://atividadeunifacs.firebaseio.com",
    projectId: "atividadeunifacs",
    storageBucket: "gs://atividadeunifacs.appspot.com/",
    messagingSenderId: "863353273173"
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