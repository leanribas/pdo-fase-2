define([
    
    'views/modules/alunos',
    'views/forms/aluno'
    
],function(tableAlunos,formAluno){
    
    var controls = [
        {
          view:'search',
          id:'searchAlunos',
          width:300,
          placeholder: 'Filtro Nome, Nota,...',
          keyPressTimeout:500
        },
        {},
        {
          view:'button',
          label: 'Novo Aluno',
          type: 'iconButton',
          css:'button_primary',
          icon:'plus',
          width:130,
          click:function(){
              webix.ui(formAluno.$ui).show();
          }
        }
    ]
    
    
    var layout = {
          type:'line',          
          rows: [
              {
                  padding:5,
                  height:40,
                  cols:controls
              },
              
              tableAlunos
          ]        
    };
    
    
    return {
        $ui:layout,
        $oninit:function(){
            
            $$('searchAlunos').attachEvent('onTimedKeyPress',function(){
                var text = this.getValue().toLowerCase();
                $$('dataTableAlunos').filter(function(obj){                    
                    return obj.nome.toLowerCase().indexOf(text)!=-1 ||
                           obj.nota.toLowerCase().indexOf(text)!=-1 ||
                           obj.id.toLowerCase().indexOf(text)!=-1;;
                })
            })

        }
    }
    
});