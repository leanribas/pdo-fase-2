define(function(){


        var uploadFiles = function(){
                $$("upl1").send();
        };

        var cancelUpload = function(){
                var id= $$("upl1").files.getFirstId();
                while(id){
                        $$("upl1").stopUpload(id);
                        id = $$("upl1").files.getNextId(id);
                }
        };
        
        var closeWindow = function(){
            this.getParentView().getParentView().getParentView().close();
        }

        webix.type(webix.ui.list, {
                name:"myUploader",
                template:function(f,type){
                        var html = "<div class='upload_overall'><div class='upload_name'>"+f.name+"</div>";
                        html += "<div class='upload_remove_file'><span style='color:#AAA' class='cancel_icon'></span></div>";
                        html += "<div class='upload_status'>";
                        html += "<div class='upload_progress "+f.status+"' style='width:"+(f.status == 'transfer'||f.status=="server"?f.percent+"%": "0px")+"'></div>";
                        html += "<div class='upload_message "+ f.status+"'>"+type.status(f)+"</div>";
                        html +=	 "</div>";
                        html += "<div class='upload_size'>"+ f.sizetext+"</div></div>";
                        return html;
                 },
                status:function(f){
                        var messages = {
                                server: "Enviado",
                                error: "Error",
                                client: "Pronto",
                                transfer:  f.percent+"%"
                        };
                        return messages[f.status]

                },
                on_click:{
                        "upload_remove_file":function(ev, id){
                                $$(this.config.uploader).files.remove(id);
                        }
                },
                height: 35
        });



	return {
		$ui:{
			view:"window", modal:true, id:"order-win", position:"center",
                        width:700,
			head:"Upload de Arquivos",
			body:{
				paddingY:20, paddingX:30, elementsConfig:{labelWidth: 140}, view:"form", id:"upload-form", rows: [
						{ view: "uploader", id:"upl1", height:37, align:"center", type:"iconButton", icon:"plus-circle", label:"Adicionar Arquivos" ,autosend:false, link:"mylist",  upload:"php/upload.php"},
						{
							borderless: true,
							view:"list",  id:"mylist", type:"myUploader",
							autoheight:true, minHeight: 50
						},
						{
							id: "uploadButtons",
							cols:[
								{view:"button", label: "Upload", type:"iconButton", icon: "upload", click: uploadFiles, align: "center"},
								{width:5},
								{view:"button", label: "Cancelar", type:"iconButton", icon: "cancel-circle", click: cancelUpload, align: "center"},
								{view:"button", label: "Fechar", type:"iconButton", icon: "cancel-circle", click: closeWindow, align: "center"}

							]
						}
					]
			}
		}
	};

});