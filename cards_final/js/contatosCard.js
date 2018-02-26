


function PageLoginCard(){

    //var user= firebase.auth().onauthSta;

	$(".divPage").hide();
	$("#txttitulo").html("Login");
	$("#pageLogin").show();
}



function pageCadastrarCard(){
	$(".divPage").hide();
	$("#txttitulo").html("Cadastrar Card");
	$("#pageCriaUsuario").show();
}



function pageListarCards(){
	
	$(".divPage").hide();
	$("#txttitulo").html("Lista de Cards");
	$("#pageListCard").show();
	$("#containercard").show();
	 
	firebase.database().ref('cards').on("value",function(snaptshot){
		var html="";
		var  card ='';
		snaptshot.forEach(function(child){
        card +='  <div class="col-sm-4">';
        card +='  <div class="card listcard" style="width: 20rem;margen-top:20px">';
        card +='         <img class="card-img-top-list" width=”20%” height=”40%”  src='+child.val().image_url+' alt="Card image cap">';
        card +='         <div class="card-body ">';
        card +='         <p class="card-text"> Nome:  '+child.val().nome+'</p>';
        card +='         <p class="card-text"> Email: '+child.val().email+'</p>';
        card +='         <p class="card-text"> Telefone: '+child.val().telefone+'</p>';
        card +='         </div>';
        card +='         <div class="card-footer text-muted">';
        card +='           <div class="row">';
        card +='             <div class="col-sm-6">';
        card +='             <a href="#" class="btn btn-danger form-control" onclick=\'deleteCard("'+child.key+'","'+child.val().nome_imagem+'")\'>remover</a>';
        card +='             </div>';
        card +='             <div class="col-sm-6">';
        card +='             <a href="#" class="btn btn-primary form-control"   id=btlike_'+child.key+'"  onclick=\'likes("'+child.key+'",'+child.val().likes+')\'><i class="icon-print icon-white"></i>Likes('+child.val().likes+') </a>';
        card +='             </div>';
        card +='            </div>';
        card +='         </div>';
        card +='       </div>';
        card +='     </div>';
     
     	});                 
		$('#containercard').html(card);

	});

}
 //cadastro  de contato


function cadastrarCardFirebase(){
   

   var file = $("#foto")[0].files[0]; 
   var task = firebase.storage()
                      .ref('cards/'+file.name)
                      .put(file);
	
   task.on('state_changed',
       function progress(snaptshot){
       var parcial=snaptshot.bytesTransferred;
       var total =snaptshot.totalBytes;
       var porcentagem =parcial/total*100;
       $("#upload_foto").val(porcentagem);
      },
      function error(error){

      	alert('erro ao fazer uplod da imagem');
      	console.log(error.message);
		return;
      },
      //depois que  a imagem e gravada salvar o contato
      function complete(){
      	firebase.storage().ref('cards/'+file.name)
      	         .getDownloadURL()
      	         .then(function(url){
      	          console.log(url);
                  alert('imagem salva com sucesso');
      	          saveContatoCard(url,file.name);
      	          $("#upload_foto").val(0);
      	      })
      	      .catch(function(error){  
      	      	//alert('erro ao salvar imagem '+error.message);

      	    })  	    

       });
       
}
function saveContatoCard(url,file_name){
	       console.log(url);
           var data={ nome:      $("#nome").val(),
	                  email:     $("#email").val(),
	                  telefone:  $("#telefone").val(),
	                  image_url: url ,
	                  nome_imagem:file_name,
	                  likes:0
	        }
            firebase.database()
	        .ref("cards")
	        .push(data)
	        .then(function(result){
	        	alert("Cadastrado com sucesso!!!");
				pageListarCards;
			    $('#myModal').modal('hide');
				//window.location.reload(true);
	        	
	        })
	        .cach(function(error){
	        	alert("Erro ao  cadastrar"+error.message);
	        	console.log(error.message);
        });

}

function deleteCard(key,image_name){

 var retorno= confirm('deseja ralmenta apagar o card ?:'+key);

 if (retorno){

        firebase.storage()
	        .ref("cards/"+image_name)
	        .delete()
	        .then(function(result){
	        	alert("imagem removida com sucesso");
	        	console.log(result);
				window.location.reload(true);
	        	
	        })
	        .catch(function(error){
	        	alert("Erro ao  remover imagem"+error.message);
	        	console.log(error.message);
	        });

       firebase.database()
	        .ref("cards/"+key)
	        .remove()
	        .then(function(result){
	        	alert("Editado com sucesso!!!");
	        	console.log(result);
	        	pageListar();
	        })
	        .catch(function(error){
	        	alert("Erro ao  Editar");
	        	console.log(error.message);
	        });
	
  }
}

  function likes(key,likesValue){
	likesValue=likesValue+1;
	var data={ likes:likesValue}   
	      
    console.log(data);
  	firebase.database()
	        .ref("cards/"+key)
	        .update(data)
	        .then(function(result){
	        	alert("Like adicionado com sucesso");
	        	console.log(result);
	        	
	        })
	        .catch(function(error){
	        	alert("Erro ao dar like");
	        	console.log(error.message);

	        });


}


