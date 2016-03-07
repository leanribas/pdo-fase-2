define([
    'views/modules/alunos'
],function(dataTableAluno){
    
    
    var layout = {
        rows:[
            dataTableAluno
        ]
    }


    
    return {
        $ui:layout,
        $oninit:function(){
            $$('dataTableAlunos').load('php/alunosmaioresnotas.php')
        }
    }
    
});