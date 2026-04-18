Vue.js(opens new window) is a progressive framework for building user interfaces. And we are going to show how to use EmailJS SDK to send emails from Vue.js.

Below we will build the contact form component, ContactUs.vue:

<template>
  <form ref="form" @submit.prevent="sendEmail">
    <label>Name</label>
    <input type="text" name="user_name">
    <label>Email</label>
    <input type="email" name="user_email">
    <label>Message</label>
    <textarea name="message"></textarea>
    <input type="submit" value="Send">
  </form>
</template>

<script>
import emailjs from '@emailjs/browser';

export default {
  methods: {
    sendEmail() {
      emailjs
        .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this.$refs.form, {
          publicKey: 'YOUR_PUBLIC_KEY',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    },
  },
};
</script>

nstallation
This guide goes through the various methods used to install EmailJS SDK.

#Package manager
If you are using modern frameworks or another way to bundle your application, then you can use one of package managers to install EmailJS SDK.

Install EmailJS SDK using npm(opens new window):

$ npm install --save @emailjs/browser
Alternatively, you can also install the SDK via Yarn(opens new window):

$ yarn add @emailjs/browser
#Browser script
In order to get started using EmailJS on your website just paste the following code snippet before closing tag, with the correct public key:

<script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js">
</script>
<script type="text/javascript">
   (function(){
      emailjs.init({
        publicKey: "YOUR_PUBLIC_KEY",
      });
   })();
</script>

You can obtain your public key from the Account(opens new window) page in the EmailJS dashboard.

Options
Learn more about how to configure the SDK. These options are set when the SDK is initialized and passed to the init() function as an object.
You can also customize or overwrite it when the SDK method is called to process the request.

#publicKey
The public key is required to identify your account and is a required variable. You can obtain your public key from the Account(opens new window) page in the EmailJS dashboard.

Browser JavaScript Node.js Flutter React Native

#privateKey
Additionally, a private key can be used for authorization if such an option is enabled on the Account - Security(opens new window) page.

Node.js Flutter

#blockHeadless
When enabled, the SDK will not process request in headless browsers.

This option is turned off by default.

For headless browsers an error 451 - "Unavailable For Headless Browser" will be returned.

Browser JavaScript

#blockList
An object. This configuration controls whether requests are blocked for certain values in the variable. When the variable specified in watchVariable contains a value from the list, then requests won't be sent to EmailJS.

Name Type Description
list String[] The list of strings contains suspended values
watchVariable String A name of the variable to be watched
This option is turned off if one of the properties is not set.

If the value is in the list, the request method will return an error 403 - "Forbidden".

Browser JavaScript Node.js React Native Flutter

#limitRate
An object. This option allows SDK to process requests no more often than specified in the throttle. / The rate limit is per page by default. To override the behavior, an id can be set. This ID can be useful in setting the throttle for each page, group, or whole application.

Name Type Description
id String (optional) Sets the throttle ID
throttle Number (ms) After how many milliseconds a next request is allowed
This option is turned off if throttle is 0 or not set.

Error 429 - "Too Many Requests" will be returned when the rate limit blocks the request.

Browser JavaScript Node.js React Native Flutter

emailjs.init
This method allows the setup of Options for the application globally. The configuration should happen before any send email method is called.

#Syntax
emailjs.init(options);
#Code Example
emailjs.init({
publicKey: 'YOUR_PUBLIC_KEY',
// Do not allow headless browsers
blockHeadless: true,
blockList: {
// Block the suspended emails
list: ['foo@emailjs.com', 'bar@emailjs.com'],
// The variable contains the email address
watchVariable: 'userEmail',
},
limitRate: {
// Set the limit rate for the application
id: 'app',
// Allow 1 request per 10s
throttle: 10000,
},
});
emailjs.send
The basic method to send an email with EmailJS.

#Syntax
emailjs.send(serviceID, templateID, templateParams, options);
#Rate Limit
1 request per second

#Parameters
NAME TYPE DESCRIPTION
serviceID String Service ID of the service through which the email should be sent. Reserved keyword default_service is supported, and should be used to use the default service, which can be set and changed via EmailJS dashboard
templateID String Template ID of the email
templateParams Object Template parameters of the template
options Options (optional) Locally setting or overriding options. It’s not required if init() method is used
#Result
The method returns the Promise. Where response is object what contains the status and the text properties.

#Code Example
var templateParams = {
name: 'James',
notes: 'Check this out!',
};

emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams).then(
(response) => {
console.log('SUCCESS!', response.status, response.text);
},
(error) => {
console.log('FAILED...', error);
},
);
emailjs.sendForm
If you are using EmailJS to send form details, sendForm will automatically collect the values of the form and pass them to the specified template. The form should have a distinct ID, and the name attribute of each field should correspond to the variable name used in the template.

#Syntax
emailjs.sendForm(serviceID, templateID, form, options);
#Rate Limit
1 request per second

#Parameters
NAME TYPE DESCRIPTION
serviceID String Service ID of the service through which the email should be sent. Reserved keyword default_service is supported, and should be used to use the default service, which can be set and changed via EmailJS dashboard
templateID String Template ID of the email
form String, HTMLFormElement It can be HTMLFormElement or query selector
options Options (optional) Locally setting or overriding options. It’s not required if init() method is used
#Result
The method returns the Promise. Where response is object what contains the status and the text properties.

#Code Example
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', '#myForm').then(
(response) => {
console.log('SUCCESS!', response.status, response.text);
},
(error) => {
console.log('FAILED...', error);
},
);
/send
Sends an email based on the specified email template and the passed dynamic parameters. The email is sent via the specified email service or via the default service if default_service keyword is passed.

#Resource URL
POST https://api.emailjs.com/api/v1.0/email/send
#Request Information
Content type is 'application/json'

#Rate Limit
1 request per second

#Parameters
NAME REQUIRED DESCRIPTION
service_id Yes Service ID of the service through which the email should be sent. Reserved keyword default_service is supported, and should be used to use the default service, which can be set and changed via EmailJS dashboard.
template_id Yes Template ID of the email
user_id Yes Public Key of the account
template_params No Template parameters of the template
accessToken No Private Key of the account
#Response Information
Response formats is JSON or Text

#Example Response
Success status:

200 "OK"
Failure status:

400 "The user_id parameter is required"
#Code Example
For this example we will use jQuery library. It has ajax and supports very old browsers.

// code fragment
var data = {
service_id: 'YOUR_SERVICE_ID',
template_id: 'YOUR_TEMPLATE_ID',
user_id: 'YOUR_PUBLIC_KEY',
template_params: {
'username': 'James',
'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...'
}
};

$.ajax('https://api.emailjs.com/api/v1.0/email/send', {
type: 'POST',
data: JSON.stringify(data),
contentType: 'application/json'
}).done(function() {
alert('Your mail is sent!');
}).fail(function(error) {
alert('Oops... ' + JSON.stringify(error));
});
// code fragment
/send-form
Sends an email based on the specified email template and the passed form data. The email is sent via the specified email service or via the default service if default_service keyword is passed.

#Resource URL
POST https://api.emailjs.com/api/v1.0/email/send-form
#Request Information
Content type is 'multipart/form-data'

#Rate Limit
1 request per second

#Parameters
NAME REQUIRED DESCRIPTION
service_id Yes Service ID of the service through which the email should be sent. Reserved keyword default_service is supported, and should be used to use the default service, which can be set and changed via EmailJS dashboard.
template_id Yes Template ID of the email
user_id Yes Public Key of the account
accessToken No Private Key of the account
#Response Information
Response formats is JSON or Text

#Example Response
Success status:

200 "OK"
Failure status:

400 "The user_id parameter is required"
#Code Example
For this example we will use jQuery library. It has ajax and supports very old browsers.

// code fragment
// the form id is myForm
$('#myForm').on('submit', function(event) {
event.preventDefault(); // prevent reload

    var formData = new FormData(this);
    formData.append('service_id', 'YOUR_SERVICE_ID');
    formData.append('template_id', 'YOUR_TEMPLATE_ID');
    formData.append('user_id', 'YOUR_PUBLIC_KEY');

    $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
        type: 'POST',
        data: formData,
        contentType: false, // auto-detection
        processData: false // no need to parse formData to string
    }).done(function() {
        alert('Your mail is sent!');
    }).fail(function(error) {
        alert('Oops... ' + JSON.stringify(error));
    });

});
// code fragment

history
Get a list of history records

#Resource URL
GET https://api.emailjs.com/api/v1.1/history
#Rate Limit
1 request per second

#Parameters
NAME REQUIRED DESCRIPTION
user_id Yes Public Key of the account
accessToken Yes Private Key of the account
page No A current page
count No Records in one page
errors_only No Get only failed records
#Response Information
Response formats is JSON or Text

#Example Response
Success status:

{
"is_last_page": true, // we don't have more records
"rows": [
{
"id": "email_0537496c6cf98417e10eb2d8",
"user_id": "YOUR_PUBLIC_KEY",
"result": 1, // 1 is success
"error": null,
"provider": "Yandex",
"service_id": "default_service",
"original_service_id": "yandex",
"template_id": "example_template",
"template_params": "{\"user_os\":\"macOS Mojave\"}", // your stringify template params
"files": "[]", // attachments list
"retry_count": 0,
"created_at": "2019-10-24T16:55:17.000Z",
"updated_at": "2019-10-24T16:55:17.000Z"
},
{
"id": "email_f1cb808c2545161b1a5fa4c4",
"user_id": "YOUR_PUBLIC_KEY",
"result": 2, // 2 is error,
"error": "Zoho: Invalid login: 535 Authentication Failed", // error message
"provider": "Zoho",
"service_id": "zoho",
"original_service_id": "zoho",
"template_id": "example_template",
"template_params": null,
"files": "[]",
"retry_count": 0,
"created_at": "2019-09-26T13:08:05.000Z",
"updated_at": "2019-09-26T13:08:05.000Z"
}
]
}
Failure status:

400 "The user_id parameter is required"
#Code Example
GET https://api.emailjs.com/api/v1.1/history?user_id=YOUR_PUBLIC_KEY&accessToken=YOUR_PRIVATE_KEY&page=1&count=50
