define([],function(){
    
    var form={        
        view:'form',
        id:'formAluno',        
        rules: {
          "nome": webix.rules.isNotEmpty,
          "nota": webix.rules.isNumber
        },        
        elements:[
            {
                view:'text',
                name:'nome',
                label:'Nome',
                required:true,
                invalidMessage:'Informe nome do Aluno'
            },
            {
                view:'text',
                name:'nota',
                label:'Nota',       
                required: true,
                invalidMessage: 'Informe a nota do Aluno'
            },
            {
                margin:5,
                cols:[
                    {},
                    {
                        view:'button',
                        label:'Salvar',
                        click:function(){                                                    
                            var form = $$('formAluno');
                            if(form.validate())
                            {                                
                                form.disable();                                
                                var windowForm = form.getParentView();                            
                                webix.extend(windowForm, webix.ProgressBar);
                                windowForm.showProgress({
                                    type:'icon',
                                    delay:2000
                                });                                
                                webix.ajax().post('php/adicionaaluno.php',function(text,data,xhr){
                                    var retorno = data.json();
                                    
                                    if(retorno.success)
                                    {
                                      form.save();  
                                      windowForm.close();     
                                    }
                                    else
                                    {
                                      webix.alert({
                                          type:'alert-error',
                                          text:'Não foi possível gravar as informações.<br> Erro: ' + retorno.message,
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
        id:'windowAluno',
        modal:true,
        head:'Adicionar Aluno',
        position:'center',
        body: form,
        width: 300
    }
    
    return {
        $ui: window
    }
    
})