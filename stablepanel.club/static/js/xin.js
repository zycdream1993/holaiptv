$(function(){
	function getList() {
		var str = '';
		for (let index = 0; index < dataList.length; index++) {
			str += `<a href="javascript:;" class="list" data-key="${index}">
			<div class="pic"><img src="${dataList[index]['bg']}" alt="" srcset=""></div>
			<p class="title">${dataList[index]['key']}</p>
			<div class="icon">
			  <i class="fa icon"></i>
			</div>
			<div class="num">
			  <span>${dataList[index]['num']}</span>
			</div>
		  </a>`;
		}
		$(".left").html(str)

		var str = '';
		let key = 0
		var dataItem = dataList[key]['item'];
		for (let index = 0; index < dataItem.length; index++) {
			str += `<a href="javascript:;" class="list">
			<div class="pic"><img class="lazyload" data-original="${dataItem[index]['tvg_logo']}" alt=""></div>
			<p class="title">${dataItem[index]['tvg_name']}</p>
			<div class="icon">
			  <i class="fa icon"></i>
			</div>
		  </a>`
		}
		$(".right").html(str)
		$("img.lazyload").lazyload({
			placeholder : "./images/loading.gif",
			effect: "fadeIn",
			threshold: 200,
			container: $(".container .right") 
		});
	}
	getList()
	$(".left .list").click(function(){
		var str = '';
		let key = $(this).data('key')
		var dataItem = dataList[key]['item'];
		for (let index = 0; index < dataItem.length; index++) {
			str += `<a href="javascript:;" class="list">
			<div class="pic"><img class="lazyload" data-original="${dataItem[index]['tvg_logo']}" alt=""></div>
			<p class="title">${dataItem[index]['tvg_name']}</p>
			<div class="icon">
			  <i class="fa icon"></i>
			</div>
		  </a>`
		}
		$(".right").html(str)
		$("img.lazyload").lazyload({
			placeholder : "./images/loading.gif",
			effect: "fadeIn",
			threshold: 200,
			container: $(".container .right")
		});
	})
});

function ajaxGet(url, data = {}, callback = null, msg = '处理中,请稍后...') {
    var index = null;
    $.ajax({
        type: "GET",
        url: url,
        data: data,
        contentType: "application/json",
        dataType: "json",
        beforeSend: function () {
            index = layer.msg(msg, {
                icon: 16
                , shade: 0.01
                , time: 0
            });
        },
        success: function (res) {
            layer.close(index);
            if (callback) {
                callback(res);
            }
        },
        error: function () {
            layer.close(index);
            layer.msg("AJAX请求异常");
        }
    });
}

function ajaxPost(url, data = {}, callback = null, msg = '处理中,请稍后...') {
    var index = null;
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        contentType: "application/json",
        dataType: "json",
        beforeSend: function () {
            index = layer.msg(msg, {
                icon: 16
                , shade: 0.01
                , time: 0
            });
        },
        success: function (res) {
            layer.close(index);
            if (callback) {
                callback(res);
            }
        },
        error: function () {
            layer.close(index);
            layer.msg("AJAX请求异常");
        }
    });
}

//js无缝滚动代码
function marquee(i, direction){
	var obj = document.getElementById("marquee" + i);
	var obj1 = document.getElementById("marquee" + i + "_1");
	var obj2 = document.getElementById("marquee" + i + "_2");
	if (direction == "up"){
		if (obj2.offsetTop - obj.scrollTop <= 0){
			obj.scrollTop -= (obj1.offsetHeight + 20);
		}else{
			var tmp = obj.scrollTop;
			obj.scrollTop++;
			if (obj.scrollTop == tmp){
				obj.scrollTop = 1;
			}
		}
	}else{
		if (obj2.offsetWidth - obj.scrollLeft <= 0){
			obj.scrollLeft -= obj1.offsetWidth;
		}else{
			obj.scrollLeft++;
		}
	}
}

function marqueeStart(i, direction){
	var obj = document.getElementById("marquee" + i);
	var obj1 = document.getElementById("marquee" + i + "_1");
	var obj2 = document.getElementById("marquee" + i + "_2");

	obj2.innerHTML = obj1.innerHTML;
	var marqueeVar = window.setInterval("marquee("+ i +", '"+ direction +"')", 20);
	obj.onmouseover = function(){
		window.clearInterval(marqueeVar);
	}
	obj.onmouseout = function(){
		marqueeVar = window.setInterval("marquee("+ i +", '"+ direction +"')", 20);
	}
}

//屏幕滚动指定位置
$('.page1').click(function() {
    $('html,body').animate({ scrollTop: $("#page1").offset().top-100}, 1000)
});

// 放大图片
$('body').on('click', '[data-image]', function () {
	var title = $(this).attr('data-image'),
		src = $(this).attr('src'),
		alt = $(this).attr('alt');
	var photos = {
		"title": title,
		"id": Math.random(),
		"data": [
			{
				"alt": alt,
				"pid": Math.random(),
				"src": src,
				"thumb": src
			}
		]
	};
	layer.photos({
		photos: photos,
		anim: 4
	});
	return false;
});

// 放大一组图片
$('body').on('click', '[data-images]', function () {
	var title = $(this).attr('data-images'), 
		now_src = $(this).attr('src'),
		now_alt = $(this).attr('alt'),
		data = []
	$("[data-images]").each(function(){
		var src = $(this).attr("src"),
			alt = $(this).attr("alt");
		console.log(src);
		if(src != now_src){
			// 压入其他图片地址
			data.push({
				"alt": alt,
				"pid": Math.random(),
				"src": src,
				"thumb": src
			});
		}else{
			// 把当前图片插入到头部
			data.unshift({
				"alt": now_alt,
				"pid": Math.random(),
				"src": now_src,
				"thumb": now_src
			});
		}
	});
	var photos = {
		"title": title,
		"id": Math.random(),
		"data": data,
	};
	layer.photos({
		photos: photos,
		anim: 4
	});
	return false;
});
