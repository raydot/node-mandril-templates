require('dotenv').config({path: '../.env'})
var mandrill = require('mandrill-api/mandrill')
var mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_TEST_KEY)

//console.log("M_K", process.env.MANDRILL_KEY)

/*
  Sample template from
  https://mandrillapp.com/api/docs/templates.nodejs.html
*/

// CREATE NEW TEMPLATE
// var name = "Dave's Test Template";
// var from_email = "no-reply@beyondnapavalley.com";
// var from_name = "Beyond Napa Valley";
// var subject = "Please verify your e-mail address";
// //var code = "<div>example code</div>";
// //var text = "Example text content";
// var publish = false;
// var labels = [
//     "example-label"
// ];
// mandrill_client.templates.add({"name": name, "from_email": from_email, "from_name": from_name, "subject": subject, /*"code": code, "text": text,*/ "publish": publish, "labels": labels}, function(result) {
//     // console.log(result);
    
//     // {
//     //     "slug": "example-template",
//     //     "name": "Example Template",
//     //     "labels": [
//     //         "example-label"
//     //     ],
//     //     "code": "<div mc:edit=\"editable\">editable content</div>",
//     //     "subject": "example subject",
//     //     "from_email": "from.email@example.com",
//     //     "from_name": "Example Name",
//     //     "text": "Example text",
//     //     "publish_name": "Example Template",
//     //     "publish_code": "<div mc:edit=\"editable\">different than draft content</div>",
//     //     "publish_subject": "example publish_subject",
//     //     "publish_from_email": "from.email.published@example.com",
//     //     "publish_from_name": "Example Published Name",
//     //     "publish_text": "Example published text",
//     //     "published_at": "2013-01-01 15:30:40",
//     //     "created_at": "2013-01-01 15:30:27",
//     //     "updated_at": "2013-01-01 15:30:49"
//     // }
    
// }, function(e) {
//     // Mandrill returns the error as an object with name and message keys
//     console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
//     // A mandrill error occurred: Invalid_Key - Invalid API key
// });

// NEW TEMPLATE WITH CONTENT MERGE
//mandrill_client = new mandrill.Mandrill('YOUR_API_KEY');
var template_name = "Dave's Test Template";
var template_content = [{
        "name": "editable",
        "content": "<div>Thank you for signing up!  Click <a href='http://www.beyondnapavalley.com?token=*|TOKENURL|*'>here</a> to login!</div>"
    }];
var outVar=makeid(16)
//console.log('oV:', outVar)
var merge_vars = [{
        "name": "TOKENURL",
        "content": outVar
    }];
//console.log(merge_vars)
mandrill_client.templates.render({"template_name": template_name, "template_content": template_content, "merge_vars": merge_vars}, function(result) {
    console.log(result);
    /*
    {
        "html": "<p><div>content to inject merge1 content</div></p>"
    }
    */
}, function(e) {
    // Mandrill returns the error as an object with name and message keys
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Invalid_Key - Invalid API key
});

// function to make random string
function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}