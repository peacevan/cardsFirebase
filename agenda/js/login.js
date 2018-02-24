

function PageLogin(){

    var user= firebase.auth().onauthSta;

	$(".divPage").hide();
	$("#txttitulo").html("Login");
	$("#pageLogin").show();
}

function criarUsuario(){
   var email=("#email_login").val();
   var email=("#senha_login").val();
   firebase().auth().createUseWithEmailAndPassWord(email,senha)
   .then(function (uid){
    alert('cadastrado com sucesso faça o login');
    ("#formLogin").togger('reset');
   })
   .catch(function(error){

    alert("erroa ao cadastrar usuário tente outro email");
    console.log(error.message);
   })
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
			PageListar();

		})
		.catch(function(error){
			//alert("Erro ao efetuar o login. Tente novamente!");
			alert(error.message);
			console.log(error.message);

		});


 }



   function criarUsuario(){
   var email=("#email_login").val();
   var senha=("#senha_login").val();
   firebase().auth().signWithEmailAndPassWord(email,senha)
   .then(function (uid){
   $("#formLogin").togger('reset');
    pageListar();
   })
   .catch(function(error){
    alert("erroa ao cadastrar usuário tente outro email");
    console.log(error.message);
   })
}







   function sair(){
   	firebase.singOut();
   	pagelogin();
   }

   function logarComFacebook(){
   var provedor = new  firebase.auth.FacebookAuthProvider();
   logarComProvedor(provedor);
   }

     function logarComGoogle(){
     	alert('aqui');
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



