

function pageCadastrar(){
	$(".divPage").hide();
	$("#txttitulo").html("Cadastrar Contato");
	$("#cadastrar").show();
}
function pageListar(){
	$(".divPage").hide();
	$("#txttitulo").html("Listar Contatos");
	$("#listar").show();
	$("button").removeAttr("disabled");
	firebase.database().ref('contatos').on("value",function(snaptshot){
		var html="";
		snaptshot.forEach(function(child){
              html+="<tr>"
                  +"<td>"+child.val().nome+"</td>"
                  +"<td>"+child.val().email+"</td>"
                  +"<td>"+child.val().telefone+"</td>"
                  +"<td><button onclick = \"pageEditar('"+child.key+"')\" class='btn btn-warning'> Editar</button></td>"
                  +"<td><button onclick = \"pageApagar('"+child.key+"')\" class='btn btn-danger'> Apagar</button></td>"
                  +"</tr>";
		});
		$("#tabelaContato").html(html);

	});
}

function pageApagar(key){
 var retorno= confirm('deseja ralmenta apagar?');
 if (retorno){
       firebase.database()
	        .ref("contatos/"+key)
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

function pageEditar(key){
	$(".divPage").hide();
	$(".txttitulo").html("Editar Contato");
	$("#editar").show();
	$(".divPage").show();
	firebase.database()
	.ref("contatos/"+key)
	.once('value')
	.then(function(snaptshot){
			$('#nome_editar').val(snaptshot.val().nome);
            $('#email_editar').val(snaptshot.val().email);
            $('#telefone_editar').val(snaptshot.val().telefone);
            $('#key_editar').val(key);
	})
	.catch(function(error){
	alert('erro ao editar contato');
	console.log(error.message);
	})

}








function cadastrar(){
   var file =("#foto")[0].files[0]; 
   var task = firebase.storage()
                      .ref('contatos/'+file.name)
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
      	console.log(erro.message);
      },
      function complete(){
      	firebase.storege('contatos/'+file.nome)
      	         .getDownloadURL()
      	         .then(function(url){
                  saveContato();
            

      	      })
      	      .catch(function(error){  

      	    })  	    

       });


}



function saveContato(){


           var data={ nome:      $("#nome").val(),
	                  email:     $("#email").val(),
	                  telefone:  $("#telefone").val(),
	                  foto:      $("#foto").val(), 
	        }
            
            
	        firebase.database()
	        .ref("contatos")
	        .push(data)
	        .then(function(result){
	        	alert("Cadastrado com sucesso!!!");
	        	console.log(result);
	        	$("button").reomoveAttr('disabled');
	        	$('#formCadastrar').trigger('reset');
	        	

	        })
	        .cach(function(error){
	        	alert("Erro ao  cadastrar");
	        	console.log(error.message);

	        });


}

function editar(){
	var data={ nome:      $("#nome_editar").val(),
	           email:     $("#email_editar").val(),
	           telefone:  $("#telefone_editar").val() 
	       }
    console.log(data);
    var key=$("key_editar").val();
	firebase.database()
	        .ref("contatos/"+key)
	        .update(data)
	        .then(function(result){
	        	alert("Editado com sucesso!!!");
	        	$("button").removeAttr("disabled");
	        	console.log(result);
	        	$('#formEditar').trigger('reset');
	        	 PageListar();
	        })
	        .catch(function(error){
	        	alert("Erro ao  Editar");
	        	console.log(error.message);

	        });


}


