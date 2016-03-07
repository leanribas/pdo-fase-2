define([
    
    'views/modules/alunos'
    
],function(tableAlunos){
    
    var layout = {
          rows: [
              tableAlunos
          ]        
    };
    
    
    return {
        $ui:layout,
        $oninit:function(){
            $$('dataTableAlunos').load('php/listaalunos.php');
        }
    }
    
});