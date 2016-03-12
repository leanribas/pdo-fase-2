define([],function(){
    
    var form={        
        view:'form',
        id:'formUsuario',        
        rules: {
          "nome": webix.rules.isNotEmpty,
          "email": webix.rules.isEmail,
          "password":function(value){
              return value.length >= 6;
          }
        },        
        elements:[
            {
                view:'text',
                name:'nome',
                label:'Nome',
                required:true,
                invalidMessage:'Informe nome do Usuário'
            },
            {
                view:'text',
                name:'email',
                label:'E-mail',       
                required: true,
                invalidMessage: 'Informe um email válido'                
            },
            {
                view:'text',
                name:'password',
                type:'password',
                label:'Password',                
                invalidMessage:'Informe a senha com no mínimo de 6 caracteres',
                bottonMessage:'*para cadastrar uma nova senha informe no mínino 6 caracteres'
            },
            {
                margin:5,
                cols:[
                    {
                        view:'button',
                        type:'iconButton',
                        icon:'chevron-left',
                        width: 32,
                        click:function(){
                            var dataTable = this.getFormView().dataTable;                            
                            var id = dataTable.getPrevId(dataTable.getSelectedId());
                            if(id)
                            {
                                dataTable.select(id);
                                dataTable.showItem(id);                                
                            }    
                        }
                    },
                    {
                       view:'button',
                       type:'iconButton',
                       icon:'chevron-right',
                       width:32,
                       css:'button-next-nav',
                       click:function(){
                           var dataTable = this.getFormView().dataTable;
                           var id = dataTable.getNextId(dataTable.getSelectedId());
                           if(id)
                           {
                                dataTable.select(id);
                                dataTable.showItem(id);                                                          
                           }    

                       }
                       
                    },
                    {},
                    {
                        view:'button',
                        label:'Salvar',
                        click:function(){                                                    
                            var form = $$('formUsuario');
                            if(form.validate())
                            {                                
                                form.disable();                                
                                var windowForm = form.getParentView();                            
                                webix.extend(windowForm, webix.ProgressBar);
                                windowForm.showProgress({
                                    type:'icon',
                                    delay:2000
                                });          
                                var url = '';
                                if(form.insert)
                                {
                                    url = 'php/usuario/adicionausuario.php';
                                }    
                                else
                                {
                                    url = 'php/usuario/alterausuario.php';
                                }    
                                webix.ajax().post(url,form.getValues(),function(text,data,xhr){
                                    var retorno = data.json();
                                    
                                    if(retorno.success)
                                    {
                                      if(form.insert)  
                                      {
                                          var reg = form.getValues();
                                          reg.id = retorno.id;
                                          form.dataTable.add(reg);
                                          form.dataTable.select(form.dataTable.getLastId());
                                          form.dataTable.showItem(form.dataTable.getLastId());
                                      }    
                                      else
                                      {
                                          form.save();                                            
                                      }                                        
                                      windowForm.close();     
                                    }
                                    else
                                    {
                                      webix.alert({
                                          type:'alert-error',
                                          text:retorno.message,
                                          callback:function(){
                                              form.enable();
                                              windowForm.hideProgress();
                                          }
                                      });
                                    }    
                                });
                            }
                        }
                    },
                    {
                        view:'button',
                        label:'Cancelar',
                        click:function(){
                            this.getParentView().getParentView().getParentView().close();                            
                        }
                    }
                ]
            }
        ]
        
    }
    
    var window= {
        view: 'window',
        id:'windowUsuario',
        modal:true,
        head:'Adicionar Usuário',
        position:'center',
        body: form,
        width: 300
    }
    
    return {
        $ui: window
    }
    
})