// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });


$(document).ready(function(){
  // console.log($('section form .input'));
 $('.login-form').submit(function(event){
  $('section form .input').each(function(index, input){
    const data = $(input);
    if(!data.val()){
      // console.log('there no value!!!',data.attr('name'));
      event.preventDefault();
      $('section .alert').slideDown();
    }else{
      $('login-form').submit();
    }
  })
 })
})

  





