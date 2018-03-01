// Fonction qui affiche une notification en bas du header pendant 3 secondes
// type : ( string ) class qu'aura l'élément ajouté ( valid, error ou delete )
// message : ( string ) message affiché
function showMessage(type, message){
  var alert = $('<p>');
  alert.addClass('msg');
  alert.addClass(type);
  alert.html(message);

  $('header').append(alert);

  setTimeout(function(){
    alert.addClass('open');
  }, 100)

  setTimeout(function(){
    alert.removeClass('open');
  }, 3000)

  setTimeout(function(){
    alert.remove();
  }, 3500)
}