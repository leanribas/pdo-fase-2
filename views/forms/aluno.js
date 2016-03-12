define([],function(){
    
    var form={        
        view:'form',
        id:'formAluno',        
        rules: {
          "nome": webix.rules.isNotEmpty,
          "nota": function(value){
              return webix.rules.isNumber && value >=0 && value <= 100;
          }
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
                invalidMessage: 'Informe a nota entre 0 e 100',
                bottomLabel: '* A nota deve ser entre 0 e 100'
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
                                var url = '';
                                if(form.insert)
                                {
                                    url = 'php/aluno/adicionaaluno.php';
                                }    
                                else
                                {
                                    url = 'php/aluno/alteraaluno.php';
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