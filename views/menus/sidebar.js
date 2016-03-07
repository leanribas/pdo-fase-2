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
                                            
                                                {id: "cadastros", value: "Cadastros", icon:"home", details:"",data:[
                                                  {id: "listatodosalunos", value: "Alunos", icon:"users", details:"Cadastro de Alunos"},                                                        
                                                ]},
                                            
						{id: "relatorios", value:"Relatórios", icon: "print", data:[
                                                  {id: "alunosnota", open: true, value:"Maiores Notas", icon: "star-o", details:"Alunos com Maiores Notas"}
                                                ]}
						
					]
				}
			]
		}
	};

});
