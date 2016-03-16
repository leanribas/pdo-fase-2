/**
 * Created by Mads on 02-10-2015.
 */
define([], function() {

    "use strict";

    var user = null,
        credentials = {},
        oauthUrl = {
            url:'php/usuario/login.php',
            clientId: 1,
            clientSecret:3334
        }
                
        ;

    credentials = Cookies.getJSON("appCookie") || {};

   // console.log("Credentials on load: ", credentials);

    return {
        getCurrentUser: function() {
            return this.getAccessToken();
        },
        getUserName:function() {          
            
           if(credentials.user_name === undefined) 
           {
               return null;
           }    
           return credentials.user_name;
        },
        getAccessToken: function() {
            if (credentials.access_token === undefined) {
                return null;
            }

            if ((credentials.expires_in + credentials.timestamp) < (Date.now() / 1000)) {
                return null;
            }
            
            return credentials.access_token;
        },

        setCurrentUser: function(userId) {
            user = userId;
            return true;
        },

        login: function(username, password, component) {
            var me = this;
            webix.extend(component, webix.ProgressBar);
            component.disable();
            component.showProgress();
            
            webix.ajax().post(oauthUrl.url,{             
                "username": username,
                "password": password
            }, function(text, data) {

                credentials = data.json();
                
                if(credentials.success === true)
                {
                    credentials.timestamp = Date.now() / 1000 | 0;
                    Cookies.remove("appCookie");                    
                    Cookies.set("appCookie", credentials);
                    require(["app"], function(app){
                        app.router(app.config.start);                                                
                        window.location.reload();
                    });                                                        
                }
                else
                {
                   webix.message({type:'alert-error',text:credentials.message});                    
                   component.enable();
                   component.hideProgress();                   
                }    

            }).then(null, function() {
                // If error
                component.enable();
                component.hideProgress();
            });

//            if (username == "test" && password == "test") {
//                credentials = {
//                    "access_token": "9c5742da1edc3531da2009fb35bb843c49e2e680",
//                    "expires_in": 3600,
//                    "token_type": "Bearer",
//                    "scope": null,
//                    "refresh_token": "1a8ceb5b59dac24f532b852e544ec3b834cea53c"
//                };
//                credentials.timestamp = Date.now() / 1000 | 0;
//
//                Cookies.set("appCookie", credentials);
//
//                require(["app"], function(app){                    
//                    app.router(app.config.start);
//                });
//            } else {
//                setTimeout(function() {
//                    component.enable();
//                    component.hideProgress();
//                }, 2000);
//            }
        },

        logout: function() {
            credentials = {};
            Cookies.remove("appCookie");
        },

        refresh: function() {
            // Use the refresh-token to get a new bearer-token
            
        },

        session: {
            status: function() {
                return new Promise(function (resolve, reject) {
                    console.log("Getting user-status");
                    resolve(true);

                });

            }
        }
    };
});
