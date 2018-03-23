<template>
<nav id="mainnav-container" class="sidebar" >
	<div id="mainnav">
		<!--Menu-->
		<div id="mainnav-menu-wrap">
			<div class="nano">
				<div class="nano-content">
					<div id="mainnav-profile" class="mainnav-profile" style="padding: 30px 20px 12px; background-image: url('assets/images/nav-profile.png'); background-repeat: no-repeat; background-size: cover;">
						<div class="profile-wrap">
							<div class="pad-btm text-center">
								<img class="img-circle img-sm img-border" src="/static/images/no_photo.jpg" alt="Imagem usuário">
							</div>
							<a href="javascript:void(-1)" class="box-block" data-toggle="collapse" aria-expanded="false">
								<p class="mnp-name">chico</p>
								<span class="mnp-desc">chico@gmail.com</span>
							</a>
						</div>
					</div>
					<ul id="mainnav-menu" class="list-group">
						<li class="list-divider"></li>
						<li class="list-header">Acesso Rápido</li>
						<li>
							<a href="javascript:void(-1)">
								<i class="fa fa-line-chart"></i>
								<span class="menu-title">Dashboard</span>
							</a>
						</li>
						<li class="list-divider"></li>
						<li>
							<a href="javascript:void(-1)">
								<i class="fa fa-table"></i>
								<span class="menu-title">Cadastros</span>
								<i class="arrow"></i>
							</a>
							<!--Submenu-->
						<#list application.entities as entity>
							<ul class="">
								<li id="{firstLower(entity.name)}s">
									<router-link to="/{firstLower(entity.name)}s/list">Novo {firstLower(entity.displayName)}</router-link>
								</li>
							</ul>
						</#list>
						</li>
						<li class="list-divider"></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</nav>
</template>

<script>
export default {
  name: "app-sidebar"
};
</script>
