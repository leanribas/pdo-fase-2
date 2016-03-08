define([],function(){
    
    var grid = {
        id:'dataTableAlunos',
        view:'datatable',
        columns:[
            {id:'id',header:'ID'},
            {id:'nome',header:'Nome',fillspace:1},
            {id:'nota',header:'Nota'}
        ],
        url:'php/alunosmaioresnotas.php'
    }
    
    return {
        $ui : grid
    }
    
})