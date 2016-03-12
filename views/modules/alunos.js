define([
    'views/forms/aluno'
],function(formAluno){
    
    var actionAltera = function(){
        formAluno.$ui.head = 'Alteração';                
        webix.ui(formAluno.$ui).show();
        $$('formAluno').bind('dataTableAlunos');        
        $$('formAluno').dataTable = $$('dataTableAlunos');                
    };
    
    var grid = {
        id:'dataTableAlunos',
        view:'datatable',
        select:true,
        columns:[            
            {id:'id',header:'ID',sort:'int'},
            {id:'nome',header:'Nome',fillspace:3,sort:'string'},
            {id:'nota',header:'Nota',fillspace:1,sort:'int'},
            {id:'action-update',header:'&nbsp;', width:60, padding:10, template:'<span style="cursor:pointer; margin-left:14px" class="icon_action_update webix_icon fa-pencil"></span>'},
            {id:'action-delete',header:'&nbsp;',width:60,template:'<span style="cursor:pointer;margin-left:14px" class="icon_action_delete webix_icon fa-trash-o"></span>'}
        ],
        url:'php/aluno/listaalunos.php',                
        onClick:{
            icon_action_update:function(e,id,node){                
              actionAltera();
            },
            icon_action_delete:function(e,id,node){
                webix.confirm({
                   title:"Confirmar" ,
                   text: 'Deseja deletar o aluno selecionado?',
                   ok:'Sim',
                   cancel:'Não',
                   callback:function(res){
                       if(res)
                       {
                           webix.ajax().post('php/aluno/removealuno.php',{id:$$('dataTableAlunos').getItem(id).id},function(text,data,xhr){
                               
                               var retorno = data.json();
                               if(retorno.success == false)
                               {
                                   webix.alert({
                                       title:'Erro',
                                       text:retorno.message,
                                       type:'alert-error'
                                   })
                               }
                               else
                               {
                                   $$('dataTableAlunos').remove(id);
                               }
                               
                           });
                           
                       }
                   }
                });
            }
        },
        on:{
            onBeforeLoad:function(){
                this.showOverlay('Carregando Dados...');
            },
            onAfterLoad:function(){
                this.hideOverlay();
            }
        }
    }
    
    return {
        $ui : grid,
        $oninit:function(){
//            $$('dataTableAlunos').attachEvent('onItemDblClick',function(){
//                actionAltera();
//            });
        }
    }
    
})