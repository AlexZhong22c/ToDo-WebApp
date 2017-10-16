function initAll(){checkDataBase(),initCategory(),initModal(),initTaskList(),initMain()}function initCategory(){currentCateId=0,currentChildCateId=0,refreshCateList(),$("#cate-list ul>li>ul h3:first").addClass("active"),$("#cate-list ul li h2 i:first").removeClass("fa-folder").addClass("fa-folder-o"),$("#add").click(function(){$(".cover").show()}),$(".all-tasks i").addClass("fa fa-bars"),$(".cate-title i").addClass("fa fa-bars"),$("#add").addClass("fa fa-plus")}function refreshCateList(){$("#allTasks span")[0].innerHTML=queryAllTasks().length;for(var a=queryAllCates(),t="",e=0;e<a.length;e++){if(t+='<li><h2 cateid="'+a[e].id+'"><i></i><span>'+a[e].name+" ("+queryTasksTotalByCateId(a[e].id)+")</span><i></i></h2>",null!=a[e].child){for(var s="",i=queryChildCatesByIdArray(a[e].child),n=0;n<i.length;n++)s+='<li><h3 childcateid="'+i[n].id+'"><i></i><span>'+i[n].name+"</span> ("+i[n].child.length+")<i></i></h3></li>";t+="<ul>"+s+"</ul>"}t+="</li>"}$("#cate-list")[0].innerHTML="<ul>"+t+"</ul>",$("#cate-list ul>li>h2").click(function(){$(this).next()&&$(this).next().toggle(500)}),$("#cate-list ul>li>ul").delegate("h3","click",function(){$("#cate-list ul>li>ul h3").removeClass("active"),$(this).addClass("active"),currentChildCateId=parseInt($(this).attr("childcateid")),$("#cate-list h2 span").prev().removeClass("fa-folder-o").addClass("fa-folder"),$(this).parents("ul").prev("h2").children("span").prev().removeClass("fa-folder").addClass("fa-folder-o"),currentCateId=parseInt($(this).parents("ul").prev("h2").attr("cateid")),refreshTaskListByChildCateId(currentChildCateId),showPage2()}),$("#cate-list ul>li>ul h3").removeClass("active"),$("#cate-list h2 span").prev().removeClass("fa-folder-o").addClass("fa-folder");for(var l=$("#cate-list ul>li>ul h3"),e=0;e<l.length;e++)if(parseInt(l[e].getAttribute("childcateid"))==currentChildCateId){addClass(l[e],"active"),$(l[e]).parents("ul").prev("h2").children("span").prev().removeClass("fa-folder").addClass("fa-folder-o");break}$("#cate-list ul>li>h2>span").prev().addClass("fa fa-folder"),$("#cate-list ul>li>h2>span").next().addClass("fa fa-trash-o"),$("#cate-list ul>li>h2>span:first").next().removeClass("fa fa-trash-o"),$("#cate-list ul>li>ul>li>h3>span").prev().addClass("fa fa-list-ul"),$("#cate-list ul>li>ul>li>h3>span").next().addClass("fa fa-trash-o"),$("#cate-list ul>li>ul>li>h3>span:first").next().removeClass("fa fa-trash-o"),$("#cate-list>ul>li>ul>li i.fa-trash-o").click(function(a){if(a.stopPropagation(),confirm("确定删除该子分类？")){var t=parseInt($(this).parent()[0].getAttribute("childcateid"));deleteChildCateById(t),initCategory(),initTaskList(),initMain()}}),$("#cate-list>ul>li>h2>i.fa-trash-o").click(function(a){if(a.stopPropagation(),confirm("确定删除该分类？")){var t=parseInt($(this).parent()[0].getAttribute("cateid"));deleteCateById(t),initCategory(),updateModalContent(),initTaskList(),initMain()}})}function initTaskList(){prepareStatus(),$("#all-tasks").addClass("active"),refreshTaskListByChildCateId(currentChildCateId),$("#task-list ul>li").removeClass("active"),$('#task-list ul>li[taskid="0"]').addClass("active"),currentTaskId=0,$("#add-task").click(function(){var a=$("#content");$("#todo-name").html('<input type="text" class="input-title" placeholder="请输入标题">'),$(".manipulate").css("display","none"),$("#task-date span").html('<input type="date" class="input-date">'),a.removeClass("content").addClass("content-with-btn"),a.html('<textarea class="textarea-content" placeholder="请输入任务内容"></textarea>'),$(".textarea-content").focus(function(){$(".textarea-content").css("background-color","#D6D6FF")}),$(".textarea-content").blur(function(){$(".textarea-content").css("background-color","#ffffff")}),$(".button-area").html('<span class="info"></span>                    <button class="save">保存</button>                    <button class="cancel-save">放弃</button>'),$(".button-area").css("display","block"),prepareSaveOrCancelWhenAddTask(),$(".cover2").css("display","block"),$(".cover2").one("click",function(){$(".cancel-save").trigger("click")}),showPage3()}),$("#add-task").addClass("fa fa-plus")}function prepareStatus(){$("#finished-tasks").click(function(){$(".status button").removeClass("active"),$(this).addClass("active"),$("#task-list ul>li.task-done").css("display","block"),$("#task-list ul>li.task-todo").css("display","none"),$("#task-list ul").each(function(a){0==$(this).children().not(":hidden").length?$(this).prev().css("display","none"):$(this).prev().css("display","block")})}),$("#unfinish-tasks").click(function(){$(".status button").removeClass("active"),$(this).addClass("active"),$("#task-list ul>li.task-done").css("display","none"),$("#task-list ul>li.task-todo").css("display","block"),$("#task-list ul").each(function(a){0==$(this).children().not(":hidden").length?$(this).prev().css("display","none"):$(this).prev().css("display","block")})}),$("#all-tasks").click(function(){$(".status button").removeClass("active"),$(this).addClass("active"),$("#task-list ul>li").css("display","block"),$("#task-list div").css("display","block")})}function initMain(){refreshMainByTaskId(0)}function refreshManipulate(a,t){var e=$(".manipulate")[0];if(e.innerHTML="",1==t){var s=$("<a/>").appendTo(e);$('<i class="fa fa-refresh"></i>').appendTo(s),s.click(function(){confirm("确定重置该任务为未完成？")&&(updateTaskStatusById(a,!1),$("#task-list>ul>li.active").removeClass("task-done").addClass("task-todo"),$("#task-list>ul>li.active").children("i").first().removeClass("fa fa-check").addClass("fa fa-file-o"),$("#all-tasks").trigger("click"),refreshMainByTaskId(currentTaskId))})}else{var i=$("<a/>").appendTo(e),n=$("<a/>").appendTo(e);$('<i class="fa fa-check-square-o"></i>').appendTo(i),$('<i class="fa fa-pencil-square-o"></i>').appendTo(n),i.click(function(){confirm("确定标记该任务为已完成？")&&(updateTaskStatusById(a,!0),$("#task-list>ul>li.active").addClass("task-done").removeClass("task-todo"),$("#task-list>ul>li.active").children("i").first().removeClass("fa fa-file-o").addClass("fa fa-check"),$("#all-tasks").trigger("click"),refreshMainByTaskId(currentTaskId))}),n.click(function(a){var t=$("#content"),e=t[0].innerHTML;$(".manipulate").css("display","none"),t.removeClass("content").addClass("content-with-btn"),t.html('<textarea class="textarea-content" placeholder="请输入任务内容"></textarea>'),$(".textarea-content").text(e),$(".textarea-content").focus(function(){$(".textarea-content").css("background-color","#D6D6FF")}),$(".textarea-content").blur(function(){$(".textarea-content").css("background-color","#ffffff")}),$(".button-area").html('<span class="info"></span>                    <button class="save">保存</button>                    <button class="cancel-save">放弃</button>'),$(".button-area").css("display","block"),prepareSaveOrCancelWhenModifyTask(),$(".cover2").css("display","block"),$(".cover2").one("click",function(){$(".cancel-save").trigger("click")})})}}function refreshMainByTaskId(a){var t="",e=queryTaskById(a);e.finished?$("#todo-name")[0].innerHTML='<i class="fa fa-check"></i>'+e.name:$("#todo-name")[0].innerHTML=e.name,refreshManipulate(a,e.finished),$("#task-date span")[0].innerHTML=e.date,window.changeCode2?t=changeCode2(e.content):(console.log("changeCode2函数不存在！"),t=e.content),$("#content")[0].innerHTML=t}function refreshTaskListByChildCateId(a){for(var t=[],e=queryTasksByChildCateId(a),s=0;s<e.length;s++)-1==t.indexOf(e[s].date)&&t.push(e[s].date);t=t.sort();for(var i="",n=0;n<t.length;n++){for(var l=queryTasksByDateInTaskArr(t[n],e),i=i+'<div><i class="fa fa-bars"></i>'+t[n]+"</div>",r="",c=0;c<l.length;c++)if(1==l[c].finished?r+='<li taskid="'+l[c].id+'" class="task-done"><i class="fa fa-check"></i>'+l[c].name+'<i class="fa fa-trash-o"></i></li>':r+='<li taskid="'+l[c].id+'" class="task-todo"><i class="fa fa-file-o"></i>'+l[c].name+'<i class="fa fa-trash-o"></i></li>',0==n&&0==c)var o=l[c];i=i+"<ul>"+r+"</ul>"}if($("#task-list")[0].innerHTML=i,$("#task-list ul>li").length>0){currentTaskId=o.id;for(var d=$("#task-list>ul>li"),u=0;u<d.length;u++)if(parseInt(d[u].getAttribute("taskid"))==currentTaskId){addClass(d[u],"active");break}$("#task-list>ul>li i.fa-trash-o").click(function(a){if(a.stopPropagation(),confirm("确定删除该任务？")){var t=parseInt($(this).parent()[0].getAttribute("taskid"));if(deleteTaskById(t,currentChildCateId),$("#task-list ul>li").removeClass("active"),refreshMainByTaskId(0),currentTaskId=0,0==currentChildCateId)for(var e=0;e<d.length;e++)if(parseInt(d[e].getAttribute("taskid"))==currentTaskId){addClass(d[e],"active");break}0==$(this).parent().siblings().length&&($(this).parent().parent().prev()[0].innerHTML=""),$(this).parent()[0].innerHTML="",refreshCateList()}}),0===a&&$('#task-list>ul>li[taskid="0"]').children(":last").css("display","none"),refreshMainByTaskId(currentTaskId),$("#task-list").delegate("ul>li","click",function(){$("#task-list ul>li").removeClass("active"),$(this).addClass("active"),refreshMainByTaskId(currentTaskId=parseInt($(this).attr("taskid"))),showPage3()})}else refreshMainByTaskId(currentTaskId=0)}function initModal(){updateModalContent(),prepareModalEvent()}function updateModalContent(){for(var a=queryAllCates(),t='<option value="-1"> [无]</option>',e=0;e<a.length;e++)t+='<option value="'+a[e].id+'">'+a[e].name+"</option>";$("#modal-select")[0].innerHTML=t,$("#newCateName")[0].value=""}function prepareModalEvent(){$("#modal-foot button.cancel").click(function(){$(".cover").hide()}),$("#modal-foot button.ok").click(function(a){a.stopPropagation();var t=$("#newCateName")[0].value,e=parseInt($("#modal-select")[0].value);""===t?alert("请输入分类名称"):(window.changeCode?t=changeCode(t):(console.log("changeCode函数不存在！"),t=t),-1==e?addCate(t):addChildCate(e,t),refreshCateList(),$(".cover").hide()),updateModalContent()}),$(".modal").on("click",function(a){a.stopPropagation()}),$(".cover").on("click",function(){$(".cover").hide()})}function prepareSaveOrCancelWhenModifyTask(){$(".save").click(function(){var a=$(".textarea-content")[0],t=$(".info")[0];if(""===a.value)t.innerHTML="内容不能为空";else{if(window.changeCode)e=changeCode(a.value);else{console.log("changeCode函数不存在！");var e=a.value}var s={},i=queryTaskById(currentTaskId);s.id=currentTaskId,s.name=i.name,s.date=i.date,s.content=e,updateTask(s),$(".button-area").css("display","none"),$(".manipulate").css("display","block"),$(".cover2").css("display","none"),$("#content").removeClass("content-with-btn").addClass("content"),refreshMainByTaskId(currentTaskId),refreshTaskListAndActiveThisTask(currentTaskId)}}),$(".cancel-save").click(function(){$("#content").removeClass("content-with-btn").addClass("content"),refreshMainByTaskId(currentTaskId),$(".button-area").css("display","none"),$(".manipulate").css("display","block"),$(".cover2").css("display","none")})}function prepareSaveOrCancelWhenAddTask(){$(".save").click(function(){var a=$(".input-title")[0],t=$(".textarea-content")[0],e=$(".input-date")[0],s=$(".info")[0];if(""===a.value)s.innerHTML="标题不能为空";else if(""===e.value)s.innerHTML="日期不能为空";else if(""===t.value)s.innerHTML="内容不能为空";else{if(window.changeCode)var i=changeCode(a.value),n=changeCode(e.value),l=changeCode(t.value);else{console.log("changeCode函数不存在！");var i=a.value,n=e.value,l=t.value}var r={};r.pid=currentChildCateId,r.finished=!1,r.name=i,r.date=n,r.content=l,currentTaskId=addTask(r),$("#content").removeClass("content-with-btn").addClass("content"),refreshMainByTaskId(currentTaskId),refreshTaskListAndActiveThisTask(currentTaskId),refreshCateList(),$(".button-area").css("display","none"),$(".manipulate").css("display","block"),$(".cover2").css("display","none")}}),$(".cancel-save").click(function(){$("#content").removeClass("content-with-btn").addClass("content"),refreshMainByTaskId(currentTaskId),$(".button-area").css("display","none"),$(".manipulate").css("display","block"),$(".cover2").css("display","none"),showPage2()})}function refreshTaskListAndActiveThisTask(a){for(var t=[],e=queryTasksByChildCateId(currentChildCateId),s=0;s<e.length;s++)-1==t.indexOf(e[s].date)&&t.push(e[s].date);t=t.sort();for(var i="",n=0;n<t.length;n++){for(var l=queryTasksByDateInTaskArr(t[n],e),i=i+'<div><i class="fa fa-bars"></i>'+t[n]+"</div>",r="",c=0;c<l.length;c++)1==l[c].finished?r+='<li taskid="'+l[c].id+'" class="task-done"><i class="fa fa-check"></i>'+l[c].name+'<i class="fa fa-trash-o"></i></li></li>':r+='<li taskid="'+l[c].id+'" class="task-todo"><i class="fa fa-file-o"></i>'+l[c].name+'<i class="fa fa-trash-o"></i></li></li>';i=i+"<ul>"+r+"</ul>"}$("#task-list")[0].innerHTML=i,currentTaskId=a;for(var o=$("#task-list>ul>li"),d=0;d<o.length;d++)if(parseInt(o[d].getAttribute("taskid"))==currentTaskId){addClass(o[d],"active");break}0===currentChildCateId&&$('#task-list>ul>li[taskid="0"]').children(":last").css("display","none"),$("#task-list").delegate("ul>li","click",function(){$("#task-list ul>li").removeClass("active"),$(this).addClass("active"),refreshMainByTaskId(currentTaskId=parseInt($(this).attr("taskid")))}),$("#task-list>ul>li i.fa-trash-o").click(function(a){if(a.stopPropagation(),confirm("确定删除该任务？")){var t=parseInt($(this).parent()[0].getAttribute("taskid"));if(deleteTaskById(t,currentChildCateId),$("#task-list ul>li").removeClass("active"),refreshMainByTaskId(0),currentTaskId=0,0==currentChildCateId)for(var e=0;e<o.length;e++)if(parseInt(o[e].getAttribute("taskid"))==currentTaskId){addClass(o[e],"active");break}0==$(this).parent().siblings().length&&($(this).parent().parent().prev()[0].innerHTML=""),$(this).parent()[0].innerHTML="",refreshCateList()}})}function showPage1(){$(".category").attr("class","category page-active"),$(".tasks").attr("class","tasks page-next"),$(".main").attr("class","main page-next-next"),refreshBackBtn(curPage=1)}function showPage2(){$(".category").attr("class","category page-pre"),$(".tasks").attr("class","tasks page-active"),$(".main").attr("class","main page-next"),refreshBackBtn(curPage=2)}function showPage3(){$(".category").attr("class","category page-pre-pre"),$(".tasks").attr("class","tasks page-pre"),$(".main").attr("class","main page-active"),refreshBackBtn(curPage=3)}function refreshBackBtn(a){var t=$("#backBtn");switch(a){case 1:t[0].style.display="none";break;case 2:t[0].style.display="block",t.on("click",function(){showPage1()});break;case 3:t[0].style.display="block",t.on("click",function(){$(".cancel-save").trigger("click"),showPage2()})}}var currentCateId=0,currentChildCateId=0,currentTaskId=0,curPage=1;initAll();