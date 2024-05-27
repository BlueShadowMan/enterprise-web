<template>
	<footer>
		<div class="footer-nav">
			<ul>
				<li><router-link to="/">首页</router-link></li>
				<li><router-link to="/">关于我们</router-link></li>
				<li><router-link to="/">联系我们</router-link></li>
				<li><router-link to="/product">服务</router-link></li>
			</ul>
		</div>
		<div class="footer-info">
			<p>© 2024 Henan BlueShadow Limited Company. All rights reserved.</p>
			<p>
				<router-link to="/privacy">隐私政策</router-link> | <router-link to="/use">使用条款</router-link> | <router-link to="/">常见问题</router-link>
			</p>
		</div>
		<div class="footer-social">
			<ul>
				<li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
				<li><a href="#"><i class="fab fa-twitter"></i></a></li>
				<li><a href="#"><i class="fab fa-instagram"></i></a></li>
			</ul>
		</div>
		<div class="footer-contact">
			<p>联系我们：1234567890@qq.com</p>
			<p>电话：123-456-7890</p>
		</div>
	</footer>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
	/* 底部整体样式 */
	footer {
	  background-color: #f2f2f2;
	  padding: 20px;
	  text-align: center;
	}
	 
	/* 导航链接样式 */
	.footer-nav ul {
	  list-style-type: none;
	  padding: 0;
	}
	 
	.footer-nav ul li {
	  display: inline-block;
	  margin-right: 10px;
	}
	 
	.footer-nav ul li a {
	  text-decoration: none;
	  color: #333;
	}
	 
	/* 版权信息样式 */
	.footer-info {
	  margin: 10px 0;
	}
	 
	.footer-info p {
	  font-size: 12px;
	  color: #888;
	}
	 
	/* 社交媒体链接样式 */
	.footer-social ul {
	  list-style-type: none;
	  padding: 0;
	}
	 
	.footer-social ul li {
	  display: inline-block;
	  margin-right: 10px;
	}
	 
	.footer-social ul li a {
	  text-decoration: none;
	  color: #333;
	  font-size: 18px;
	}
	 
	/* 联系信息样式 */
	.footer-contact p {
	  font-size: 12px;
	  color: #888;
	  margin: 5px 0;
	}
	 
	/* 返回顶部按钮样式 */
	.footer-back-to-top a {
	  text-decoration: none;
	  color: #333;
	  font-size: 12px;
	}
	 
	.footer-back-to-top a:hover {
	  text-decoration: underline;
	}
</style>