define([
    'views/modules/alunosmaioresnotas'
],function(dataTableAluno){
    
    
    var layout = {
        rows:[
            dataTableAluno
        ]
    }


    
    return {
        $ui:layout
    }
    
});