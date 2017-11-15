// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});


$$(document).on('deviceready',initapp);

function initapp(){
  console.log("dispositivo listo!!!");

  
  $$("#iniciar").on("click", click_btn);
  $$("#guardar").on("click", registrarUsuario);
}






function click_btn(){
  console.log("click");
  var correo = $$("#correo").val();
  var password = $$("#password").val();

  if(correo.length >0 && password.length >0){
 myApp.showPreloader("Iniciando Sesión...");
      $$.ajax({
        url: 'https://feacontr.000webhostapp.com/login.php',
        method: 'POST',
        dataType:'json',
        data: {
          email: correo,
          pass: password
        },
        success: function(data){
            myApp.hidePreloader();
             if(data.respuesta){
              console.log("ok");
              document.location="main.html";
             }else{
              myApp.alert('datos incorrectos');
             }
        },
        error: function(){
          myApp.hidePreloader();
          myApp.alert('error');
}
});
  }else{
    myApp.alert("Debe llenar los campos", "Advertencia");
  }
}


//funcion para registrar usuarios
function registrarUsuario(){
  myApp.showPreloader("Registrando...");
 console.log("registrar");
  var nombre=$$("#nombre").val();
  var apellido=$$("#apellido").val();
  var email=$$("#email").val();
  var pass=$$("#pass").val();
  var sexo=$$("#sexo").val();
  var fechaN=$$("#fechaN").val();    


  if(nombre.length >0 && apellido.length >0 && email.length >0 &&  pass.length >0 && sexo.length >0 && fechaN.length >0 ){
      $$.ajax({
          dataType: "json",
          method: "GET",
          data:{
              nombre: nombre,
              apellido: apellido,
              email: email,
              pass: pass,
              sexo: sexo,
              fechaN: fechaN
          },
          url: 'https://feacontr.000webhostapp.com/conexion.php',
          success: function(respuesta){
              console.log(respuesta.respuesta);
              if(respuesta.respuesta){
                 myApp.alert("Registro exitoso", "Portal");
                  myApp.closeModal(".popup-registro");
                   myApp.hidePreloader();

              }else{
                  myApp.hidePreloader();
                   myApp.alert("Debe llenar los campos", "Advertencia");
              }
          },
          error: function(){

               myApp.alert("Debe llenar los campos", "Advertencia");
          }
      });
  }else{
      myApp.alert("Debe llenar los campos", "Advertencia");
  }
}



$$('.popup-about').on('popup:opened', function () {
  console.log('About Popup opened')
});
$$('.popup-about').on('popup:close', function () {
  console.log('About Popup is closing')
});
$$('.popup-registro').on('popup:opened', function () {
  console.log('About Popup opened')
});
$$('.popup-registro').on('popup:close', function () {
  console.log('About Popup is closing')
});


