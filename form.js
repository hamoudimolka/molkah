 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDz0RnC83YmlcppqvXcvtGX9gDT4H5RRGc",
    authDomain: "feedback-a718b.firebaseapp.com",
    databaseURL: "https://feedback-a718b.firebaseio.com",
    projectId: "feedback-a718b",
    storageBucket: "feedback-a718b.appspot.com",
    messagingSenderId: "763248010135"
  };
  firebase.initializeApp(config);
$(function()
{
    function after_form_submitted(data) 
    {
        if(data.result == 'success')
        {
            $('form#reused_form').hide();
            $('#success_message').show();
            $('#error_message').hide();
        }
        else
        {
            $('#error_message').append('<ul></ul>');

            jQuery.each(data.errors,function(key,val)
            {
                $('#error_message ul').append('<li>'+key+':'+val+'</li>');
            });
            $('#success_message').hide();
            $('#error_message').show();

            //reverse the response on the button
            $('button[type="button"]', $form).each(function()
            {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if(label)
                {
                    $btn.prop('type','submit' ); 
                    $btn.text(label);
                    $btn.prop('orig_label','');
                }
            });
            
        }//else
    }

	$('#reused_form').submit(function(e)
      {
        e.preventDefault();

        $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function()
        {
            $btn = $(this);
            $btn.prop('type','button' ); 
            $btn.prop('orig_label',$btn.text());
            $btn.text('Sending ...');
        });
        

                    $.ajax({
                type: "POST",
                url: 'handler.php',
                data: $form.serialize(),
                success: after_form_submitted,
                dataType: 'json' 
            });        
        
      });	
});
document.getElementById("form").addEventListener("submit",submitForm);

function submitForm(e){
    e.preventDefault(e);
    var name= getInputVal("name");
    var email= getInputVal("email");
    var comments = getInputVal("comments"); 
    console.log(name,email,comments);

    saveMessage(name,email,comments);


}

var messageRef = firebase.database().ref("messages");

function getInputVal(id){
    return document.getElementById(id).value;
}
function saveMessage(name,email,comments){
    var newMessageRef = messageRef.push();
    newMessageRef.set({
        name : name,
        email : email,
        comments : comments
    });


}