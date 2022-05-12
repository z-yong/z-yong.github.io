$(function() {
	const tpl = $(`
		<div class="topbar">
			<div class="container">
				<div class="topbar-nav">
					<a href="">小米商城</a><span>|</span>
					<a href="">MIUI</a><span>|</span>
					<a href="">IoT</a><span>|</span>
					<a href="">云服务</a><span>|</span>
					<a href="">金融</a><span>|</span>
					<a href="">有品</a><span>|</span>
					<a href="">小爱开放平台</a><span>|</span>
					<a href="">政企服务</a><span>|</span>
					<a href="">Select Region</a>
				</div>
				<div class="topbar-cart logined" style="display: none">
					<a href="cart.html"><i class="iconfont">&#xe60c;</i>购物车<span>（<label class="count">0</label>）</span></a>
				</div>
				<div class="topbar-info clearfix">
					<a href="serviceLogin.html" class="not-logined">登录</a><span class="not-logined">|</span>
					<a href="serviceLogin.html?tab=register" class="not-logined">注册</a><span class="not-logined">|</span>
					<a class="logined username"></a><span class="logined">|</span>
					<a class="sep">消息通知</a>
					<a href="#" class="sep logined logout" style="display: none">登出</a>
				</div>
			</div>
		</div>

		<div class="header">
			<div class="container">
				<div class="header-logo">
					<a href="index.html" class="lr" title='首页'>小米官网</a>
				</div>
				<div class="header-nav">
					<ul class="nav-list clearfix">
						<li class="nav-category">
							<a href="javascript:;">全部商品分类</a>
							<div class="category-list">
								<ul>
									
								</ul>
							</div>
						</li>
						<li class="nav-item tpl-nav">
							<a></a>
						</li>
					</ul>
				</div>
				<div class="header-search">
					<form action="" class="search-form">
						<input type="search" name="keyword" class="search-text">
						<input type="submit" value="&#xe616;" class="search-btn iconfont">
					</form>
					<div class='associate'>
						<ul>
						</ul>
					</div>
				</div>
			</div>
		</div>
	`);

	// category-list>ul 的模板 
								// <li class="tpl-cat">
								// 		<a class="title">
								// 			<span></span>
								// 			<i class="iconfont"></i>
								// 		</a>
								// 		<div class="children clearfix">
								// 			<ul class="children-list">
								// 				<li class="tpl-children">
								// 					<a href="#">
								// 						<img src="" alt="" />
								// 						<span class="text"></span>
								// 					</a>
								// 				</li>
								// 			</ul>
								// 		</div>
								// 	</li><li class="tpl-cat">
								// 		<a class="title">
								// 			<span></span>
								// 			<i class="iconfont"></i>
								// 		</a>
								// 		<div class="children clearfix">
								// 			<ul class="children-list">
								// 				<li class="tpl-children">
								// 					<a href="#">
								// 						<img src="" alt="" />
								// 						<span class="text"></span>
								// 					</a>
								// 				</li>
								// 			</ul>
								// 		</div>
								// 	</li>

	// 剔除模板后即可插入到页面占位
	$('body').prepend(tpl);

	// 请求成功再异步填充内容\
	$.apiGet('/menu?type=top').then(function(data){
		let str = ''
		data.forEach(function(ele,index){
			// 因为只有一类商品 所以pid是始终是1
			const pid = 1;
			str += `<li class='nav-item tpl-nav'><a href=product.html?pid=${pid}>${ele.name}</a></li>`;
		})
		$('.nav-list').append(str)
	})
	$.apiGet('/menu?type=left').then(function(data){
		let str = '';
		let children = '';
		data.forEach(function(ele,index){
			str += `<li class="tpl-cat">
						<a class="title">
							<span>${ele.name}</span>
							<i class="iconfont"></i>
						</a>
						<div class="children clearfix">
								<ul class="children-list">`;
			if(ele.list){
				ele.list.forEach(function(ele,index){
					str += `<li class="tpl-children">
								<a href="product.html?pid=${ele.pid}">
									<img src="${ele.img}" alt="" />
									<span class="text">${ele.name}</span>
								</a>
							</li>`
				})
				
			}
			str += '</ul></div></li>'
		})
		$('.category-list ul').append(str);
		// 这里多加一个tab类 是为了当从后端拿到tpl-children里面的内容时用户移入进去才会显示 与css相配合
		$('.tpl-children').parents('.clearfix').addClass('tab')
	})


	// 用户登陆过与否
	$.getUserInfo().then(function(user){
		if(user){
			$('.logined').show();
			$('.not-logined').hide();
			$('.username').text(user.name)
		};
		$('.logout').on('click',function(){
			$.logout()
		})
		$.apiGet('/user/cart').then(function(data){
			if(!data.length){
				$('.topbar-cart .count').text(0)
			}else{
				// reduct 累加器 
				const len = data.reduce((sum,item) => {
					return sum + parseInt(item.quantity)
				},0)
				$('.topbar-cart .count').text(len);
				
			}
		})
	},function(){
		$('.logined').hide();
		$('.not-logined').show();
	})


//    input框联想词
	tpl.find('.search-text').on('input',function(){
		const val = $(this).val()
		if(val){
			const url = ` https://api.search.mi.com/query?jsonpcallback=xmsearch&query=${val}&page_index=1`
			$('<script>').appendTo($('body'))
			.attr('src',url)
		}else{
			$('.associate').hide();
		}
		
	})
	// https://api.search.mi.com/query?jsonpcallback=xmsearch&query=s&page_index=1
	
});

function xmsearch(data){
	$('.associate').html('')
	// 先判断获取到的数据是不是空
	// 这里需要将数据变成json格式判断
	const dd = JSON.stringify(data.data);
	if(dd == '{}'){
		return
	}
	const oUl = $('<ul class=associate-list></ul>').html('')
	// if(data == '{}')
	let str = ''
	data.data.list.forEach(function(ele,index){
		str +=  `<a href='###'><li>${ele.title}</li></a>`
	})
	$('.associate').show();
	oUl.appendTo($('.associate'))
	.html(str)

}


