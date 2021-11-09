$(document).ready(function(){
	console.log("function")
	var itemsMainDiv = ('.rescarousel');
	var itemsDiv = ('.rescarousel-inner');
	var itemWidth = "";
	$('.leftLst, .rightLst').click(function () {
		console.log("called");
		var condition = $(this).hasClass("leftLst");
		if(condition)
			click(0,this);
		else
			click(1,this)
	});
	rescarouselSize();
	$(window).resize(function() {
		rescarouselSize();
	});
	function rescarouselSize() {
		var incno = 0;
		var dataItems = ("data-items");
		var itemClass = ('.item');
		var id = 0;
		var btnParentSb = '';
		var itemsSplit = '';
		var sampwidth = $(itemsMainDiv).width();
		var bodyWidth = $('body').width();
		$(itemsDiv).each(function() {
			id=id+1;
			var itemNumbers = $(this).find(itemClass).length;
			btnParentSb = $(this).parent().attr(dataItems);
			itemsSplit = btnParentSb.split(',');
			$(this).parent().attr("id","ResSlid"+id);
			if(bodyWidth>=1200)
			{
				incno=itemsSplit[3];
				itemWidth = sampwidth/incno;
			}
			else if(bodyWidth>=992)
			{
				incno=itemsSplit[2];
				itemWidth = sampwidth/incno;
			}
			else if(bodyWidth>=768)
			{
				incno=itemsSplit[1];
				itemWidth = sampwidth/incno;
			}
			else
			{
				incno=itemsSplit[0];
				itemWidth = sampwidth/incno;
			}
			$(this).css({'transform':'translateX(0px)','width':itemWidth*itemNumbers});
			$(this).find(itemClass).each(function(){
				$(this).outerWidth(itemWidth);
			});

			$(".leftLst").addClass("outt");
			$(".rightLst").removeClass("outt");

		});
	}
	function rescarousel(e, el, s){
		var leftBtn = ('.leftLst');
		var rightBtn = ('.rightLst');
		var translateXval = '';
		var divStyle = $(el+' '+itemsDiv).css('transform');
		var values = divStyle.match(/-?[\d\.]+/g);
		var xds = Math.abs(values[4]);
		if(e===0){
			translateXval = parseInt(xds)-parseInt(itemWidth*s);
			$(el+' '+rightBtn).removeClass("outt");

			if(translateXval<= itemWidth/2){
				translateXval = 0;
				$(el+' '+leftBtn).addClass("outt");
			}
		}
		else if(e===1){
			var itemsCondition = $(el).find(itemsDiv).width()-$(el).width();
			translateXval = parseInt(xds)+parseInt(itemWidth*s);
			$(el+' '+leftBtn).removeClass("outt");

			if(translateXval>= itemsCondition-itemWidth/2){
				translateXval = itemsCondition;
				$(el+' '+rightBtn).addClass("outt");
			}
		}
		$(el+' '+itemsDiv).css('transform','translateX('+-translateXval+'px)');
	}
	function click(ell,ee){
		console.log("element", ell, ee);
		var Parent ="#"+$(ee).parent().attr("id");
		var slide = $(Parent).attr("data-slide");
		rescarousel(ell, Parent, slide);
	}

});
