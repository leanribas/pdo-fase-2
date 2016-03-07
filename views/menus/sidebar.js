define(function(){
	
	return {
		$ui:{
			rows:[
				{
					view: "sidebar",
					id: "app:menu",														
					css:"sidebar-menu",
					tooltip: {
						template: function(obj){
							return obj.$count?"":obj.details;
						}
					},
					on:{
						onBeforeSelect:function(id){
							if(this.getItem(id).$count){
								debugger;
								return false;
							}
							
						},
						onAfterSelect:function(id){
							this.$scope.show("./"+id);
							var item = this.getItem(id);
							webix.$$("title").parse({title: item.value, details: item.details});
						}
					},
					data:[
                                                {id: "listatodosalunos", value: "Listar todos Alunos", icon:"home", details:"Lista de Alunos"},
						{id: "alunosnota", open: true, value:"Maior Nota", icon: "table", details:"Alunos com Maior Nota"}
					]
				}
			]
		}
	};

});
