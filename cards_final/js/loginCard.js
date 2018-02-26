










/*firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});*/



function criarUsuarioLogin(){
	alert('passei aqui');
   var email=$("#email_login_criar").val();
   var senha=$("#senha_login_criar").val();
   
   firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});
   
   
 /*  firebase.auth().signWithEmailAndPassWord(email,senha)
   .then(function (uid){
	alert("usuario cadastrado com sucesso");   
  // $("#formLogin").togger('reset');
   //PageLoginCard();
   })
   .catch(function(error){
    alert("erro ao cadastrar usuário tente outro email");
    console.log(error.message);
   })*/
}


 function sair(){
   	firebase.auth().signOut().then(function() {
		pageLogin();
        console.log('Signed Out');
}, function(error) {
  console.error('Sign Out Error', error);
});
   	
   }
  
 function logar(){
	

 	var email = $("#email_login").val();
	var senha = $("#senha_login").val();
   firebase
		.auth()
		.signInWithEmailAndPassword(email,senha)
		.then(function(user){

			$("#formLogin").trigger("reset");	
			console.log(user);
			firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            // User is signed in.
			alert('usuario logado');
			pageListarCards();
            } else {
            // No user is signed in.
			alert('usuario não logado');
            }
});
			
			

		})
		.catch(function(error){
			//alert("Erro ao efetuar o login. Tente novamente!");
			alert(error.message);
			console.log(error.message);

		});


 }

 function logarComGoogle(){
   var provedor = new  firebase.auth.GoogleAuthProvider();
   logarComProvedor(provedor);
   } 


   function logarComProvedor(provedor){
     firebase.auth().signInWithPopup(provedor).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
     alert("com sucesso");
     return
     var token = result.credential.accessToken;
     var user = result.user;
     }).catch(function(error) {
     var errorCode = error.code;
     var errorMessage = error.message;
     var email = error.email;
     var credential = error.credential;

      alert( error.message);
      return
   
   });
   }