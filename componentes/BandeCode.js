  //.........................
  //***************************** */
  //------------------------------------------------

  // Bande Code Codificação

  let abc = {" ":"0","a":"1","b":"2","c":"3","d":"4","e":"5","f":"6","g":"7","h":"8","i":"9","j":".10","k":".11","l":".12","m":".13","n":".14","o":".15","p":".16","q":".17","r":".18","s":".19","t":".20","u":".21","v":".22","w":".23","x":".24","y":".25","z":".26","undefined":""};
  var saida1=""
  let saidaMinisculo=""

  const codificar=()=>{
    if(value=="numeric")
    {
      saidaMinisculo=textoNormal.toLowerCase()
      
      for(var i = 0; i<saidaMinisculo.length;i++){   


        if(abc[saidaMinisculo[i]] !== undefined) 
        {
          saida1 += abc[saidaMinisculo[i]]; 
        }
      }
      setTextoCodificado(saida1);
      saida1=""

    }else{     


      for(var i = textoNormal.length-1; i >= 0;i--){           
          if (textoNormal[i]==" ") {
              saida1 += "-"; 
             
          }else{
              saida1 += textoNormal[i]; //escrever[i]
          }
          
      }
      setTextoCodificado(saida1);
      saida1=""

    }
    
  }
