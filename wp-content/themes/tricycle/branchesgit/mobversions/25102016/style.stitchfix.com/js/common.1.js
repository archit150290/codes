//=======controlling fb login
window.fbAsyncInit = function () {
    FB.init({
        appId: '377137202389790',
        cookie: true,
        xfbml: true,
        version: 'v2.5'
    });
};

// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));




function checkLoginState() {
    FB.getLoginStatus(function (response) {
        if (response.status != "connected") {
            FB.login(function (response) {
                if (response.status === 'connected') {
                    datafetched();
                }
            },{scope: 'email'})
        } else {
            datafetched();
        }
    });
}

function datafetched() {
    FB.api('/me', {fields: "email,first_name, last_name"}, function (response) {
        userFirstName = response["first_name"];
        userLastName = response["last_name"];
        userEmail = response["email"];
        $("#new_user #user_first_name").val(response["first_name"]);
        $("#new_user #user_last_name").val(response["last_name"]);
        $("#new_user #user_email").val(response["email"]);
    });
}
//=======end of controlling fb login