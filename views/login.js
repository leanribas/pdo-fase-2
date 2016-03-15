/**
 * Created by Mads on 03-10-2015.
 */
define([
    "models/user"
], function(user) {

    "use strict";

    var values = webix.copy({
        username: 'admin@admin.com',
        password: 'admin',
        rememberme: false
    }, Cookies.getJSON("Crm"));

    return {
        $ui: {
            cols: [
                { gravity:1, template:"" },
                {
                    rows: [
                        {gravity: 1, template: ""},                        
                        {
                            view:  "form",
                            gravity: 1,
                            id:    'loginForm',
                            width: 400,                           

                            elements:       [
                                {
                                    view:        "text",
                                    id:          "username",
                                    name: "username",
                                    label:       "e-mail",
                                    value: values.username,
                                    required:    true,                                    
                                    bottomLabel:'informe admin@admin.com'
                                },
                                {
                                    view:     "text",
                                    id:       "password",
                                    name: "password",
                                    label:    "Password",
                                    value: values.password,
                                    required: true,
                                    type:     "password",                                    
                                    bottomLabel: 'informe admin'
                                    
                                },
                                {
                                    view: 'checkbox',
                                    id: 'remember',
                                    name: "rememberme",
                                    label: "Lembrar Credenciais?",
                                    labelPosition: "left",
                                    labelWidth: 200,
                                    checkValue: true,
                                    uncheckValue: false,
                                    value: values.rememberme
                                },
                                {
                                    view:     "button",
                                    id: "login",
                                    name: "login",
                                    label: "Login",
                                    hotkey: "enter",
                                    click: function() {
                                        if ($$("loginForm").validate()) {
                                            var values = $$("loginForm").getValues();
                                            if (true === values.rememberme) {
                                                Cookies.set("Crm", values);
                                            } else {
                                                // Clear cookie
                                                Cookies.remove("Crm");
                                            }
                                            user.login(values.username, values.password, $$('loginForm'));
                                        } else {
                                            $$("loginForm").focus();
                                        }
                                    }
                                }
                            ],
                            elementsConfig: {
                                labelPosition: "top",
                                validateEvent: "key"
                            }
                        },
                        {gravity: 1, temlate: ""}
                    ]
                },
                { gravity:1, template:"" }
            ]
        },

        $oninit: function() {
            $$("loginForm").focus();
        }
    };
});
