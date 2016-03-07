define([],function(){
    
    var grid = {
        id:'dataTableAlunos',
        view:'datatable',
        columns:[
            {id:'id',header:'ID'},
            {id:'nome',header:'Nome',fillspace:1},
            {id:'nota',header:'Nota'}
        ]        
    }
    
    return {
        $ui : grid
    }
    
})