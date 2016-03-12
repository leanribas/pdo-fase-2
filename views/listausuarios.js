define([
    
    'views/modules/usuarios',
    'views/forms/usuario'
    
],function(tableUsuarios,formUsuario){
    
    var controls = [
        {
          view:'search',
          id:'searchUsuarios',
          width:300,
          placeholder: 'Filtro Nome, email',
          keyPressTimeout:500
        },
        {},
        {
          view:'button',
          label: 'Novo Usuário',
          type: 'iconButton',
          css:'button_primary',
          icon:'plus',
          width:130,
          click:function(){
              formUsuario.$ui.head = 'Adicionar Usuário';              
              webix.ui(formUsuario.$ui).show();
              var form = $$('formUsuario');
              form.dataTable = $$('dataTableUsuarios');
              form.insert = true;
          }
        },
        {
            view:'button',
            type:'iconButton',
            label:'Refresh',
            icon:'refresh',
            width:130,
            click:function(){
                var dt = $$('dataTableUsuarios');
                dt.clearAll();
                dt.load(dt.config.url);
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
              
              tableUsuarios
          ]        
    };
    
    
    return {
        $ui:layout,
        $oninit:function(){
            $$('searchUsuarios').attachEvent('onTimedKeyPress',function(){
                var text = this.getValue().toLowerCase();
                $$('dataTableUsuarios').filter(function(obj){                    
                    return obj.nome.toLowerCase().indexOf(text)!=-1 ||
                           obj.email.toLowerCase().indexOf(text)!=-1 ||
                           obj.id.toLowerCase().indexOf(text)!=-1;;
                })
            })

        }
    }
    
});