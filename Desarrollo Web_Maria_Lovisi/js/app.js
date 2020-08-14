
	// inicio parpadeo del título
	function rojo (){
		$(".main-titulo").animate({color:"red"}, "slow", function(){ amarillo() } )
	}
	function amarillo (){
		$(".main-titulo").animate({color:"yellow"}, "slow", function(){ rojo() })
	}

	rojo();

//boton reinicio y timer

var intervalo=0;
var eliminar=0;
var newdulces=0;
var tiempo=0;
var min=2;
var seg=0;

$(".btn-reinicio").click(function(){
	i=0;
	score=0;
	mov=0;
	$(".panel-score").css("width","25%");
	$(".panel-tablero").show();
	$(".time").show();

	$("#score-text").html("0")
	$("#movimientos-text").html("0")
	$(this).html("REINICIAR")
	clearInterval(intervalo);
	clearInterval(eliminar);
	clearInterval(newdulces);
	clearInterval(tiempo);
	min=2;  //2
	seg=0;  //0
	borrartotal()
	intervalo=setInterval(function(){desplazamiento()},200)
	tiempo=setInterval(function(){timer()},1000)
})

//funcion de contador a cero

function timer()
{
	if(seg!=0)
	{
	seg=seg-1;
	}
	if(seg==0)
	{
	if(min==0)
	{
		clearInterval(eliminar);
		clearInterval(newdulces);
		clearInterval(intervalo);
		clearInterval(tiempo);
		$( ".panel-tablero" ).hide("drop","slow",callback);
		$( ".time" ).hide();
	}
	seg=59;
	min=min-1;
	}
	$("#timer").html("0"+min+":"+seg)
}

function callback()
{
	$( ".panel-score" ).animate({width:'100%'},4000);
}

	//Funcion de borrado

	function borrartotal()
	{
	  for(var j=1;j<8;j++)
	  {
		$(".col-"+j).children("img").detach();
	  }
	}
	//Funcion inicial para llenar el cuadro del juego

	var i=0;
	var contador=0;
	var conc1=0;


	function desplazamiento()
	{
	  i=i+1
	  var numero=0;
	  var imagen=0;

	  $(".elemento").draggable({ disabled: true });
	  if(i<8)
	  {
		for(var j=1;j<8;j++)
		{
		  if($(".col-"+j).children("img:nth-child("+i+")").html()==null)
		  {
			numero=Math.floor(Math.random() * 4) + 1 ;
			imagen="image/"+numero+".png";
			$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
		  }
		}
	  }
	  if(i==8)
	  {
		clearInterval(intervalo);
		eliminar=setInterval(function(){eliminarhorver()},150)
	  }
	}
	//Funcion para eliminar mas de 3 dulces

	var rbh=0;
	var rbv=0;
	var combo=0;
	var col=["","","","","","",""];
	var res=["","","","","","",""];
	var total=0;
	var tablero=0;
	var espera=0;
	var score=0;
	var mov=0;




	function eliminarhorver()
	{
	  tablero=0;
	  rbh=horizontal()
	  rbv=vertical()

	  for(var j=1;j<8;j++)
	  {
		  tablero=tablero+$(".col-"+j).children().length;
	  }

	  if(rbh==0 && rbv==0 && tablero!=49)
	  {
		  clearInterval(eliminar);
		  combo=0;
		  newdulces=setInterval(function()
		  {
			nuevosdulces()
		},100)
	  }
	  if(rbh==1 || rbv==1)
	  {
		$(".elemento").draggable({ disabled: true });
		$("div[class^='col']").css("justify-content","flex-end")
		$(".activo").hide("pulsate",1000,function(){
		  var scoretmp=$(".activo").length;
		  $(".activo").remove("img")
		  score=score+scoretmp;
		  $("#score-text").html(score)
		})
	  }

	  if(rbh==0 && rbv==0 && tablero==49)
	  {
		$(".elemento").draggable({
		  disabled: false,
		  containment: ".panel-tablero",
		  revert: true,
		  revertDuration: 0,
		  snap: ".elemento",
		  snapMode: "inner",
		  snapTolerance: 40,
		  start: function(event, ui){
			mov=mov+1;
			$("#movimientos-text").html(mov)
		  }
		});
	  }

	  $(".elemento").droppable({
		drop: function (event, ui) {
		  var dropped = ui.draggable;
		  var droppedOn = this;
		  espera=0;
		  do{
			espera=dropped.swap($(droppedOn));
		  }while(espera==0)
		  rbh=horizontal()
		  rbv=vertical()
		  if(rbh==0 && rbv==0)
		  {
			dropped.swap($(droppedOn));
		  }
		  if(rbh==1 || rbv==1)
		  {
			clearInterval(newdulces);
			clearInterval(eliminar);
			eliminar=setInterval(function(){eliminarhorver()},150)
		  }
		},
	  });
	}
	//Funcion para intercambiar dulces

	jQuery.fn.swap = function(b)
	{
		b = jQuery(b)[0];
		var a = this[0];
		var t = a.parentNode.insertBefore(document.createTextNode(''), a);
		b.parentNode.insertBefore(a, b);
		t.parentNode.insertBefore(b, t);
		t.parentNode.removeChild(t);
		return this;
	};
	//Funcion de nuevos dulces

	function nuevosdulces()
	{
	  $(".elemento").draggable({ disabled: true });
	  $("div[class^='col']").css("justify-content","flex-start")
	  for(var j=1;j<8;j++)
	  {
		  col[j-1]=$(".col-"+j).children().length;
	  }
	  if(combo==0)
	  {
		for(var j=0;j<7;j++)
		{
		  res[j]=(7-col[j]);
		}
		total=Math.max.apply(null,res);
		contador=total;
	  }
	  if(total!=0)
	  {
		if(combo==1)
		{
		  for(var j=1;j<8;j++)
		  {
			if(contador>(total-res[j-1]))
			{
			  $(".col-"+j).children("img:nth-child("+(res[j-1])+")").remove("img")
			}
		  }
		}
		if(combo==0)
		{
		  combo=1;
		  for(var k=1;k<8;k++)
		  {
			for(var j=0;j<(res[k-1]-1);j++)
			{
				$(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>")
			}
		  }
		}
		for(var j=1;j<8;j++)
		{
		  if(contador>(total-res[j-1]))
		  {
			numero=Math.floor(Math.random() * 4) + 1 ;
			imagen="image/"+numero+".png";
			$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>")
		  }
		}
	  }
	  if(contador==1)
	  {
		  clearInterval(newdulces);
		  eliminar=setInterval(function(){eliminarhorver()},150)
	  }
	  contador=contador-1;
	}
	// busqueda horizontal de dulces

	function horizontal()
	{
	  var bh=0;
	  for(var j=1;j<8;j++)
	  {
		for(var k=1;k<6;k++)
		{
		  var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src")
		  var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src")
		  var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src")
		  if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null))
		  {
			  $(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
			  $(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
			  $(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
			  bh=1;
		  }
		}
	  }
	  return bh;
	}
	//busqueda vertial de dulces
	function vertical()
	{
	  var bv=0;
	  for(var l=1;l<6;l++)
	  {
		for(var k=1;k<8;k++)
		{
		  var res1=$(".col-"+k).children("img:nth-child("+l+")").attr("src")
		  var res2=$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src")
		  var res3=$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src")
		  if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null))
		  {
			  $(".col-"+k).children("img:nth-child("+(l)+")").attr("class","elemento activo")
			  $(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","elemento activo")
			  $(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class","elemento activo")
			  bv=1;
		  }
		}
	  }
	  return bv;
	}
