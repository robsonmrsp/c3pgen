<template>
<header id="navbar">
	<div id="navbar-container" class="boxed">
		<!--Brand logo & name-->
 		<!--================================-->
        <div class="navbar-header">
			<a href="" class="navbar-brand no-print">
				<img :src="'/static/images/logo.png'" alt="Nifty Logo" class="brand-icon">
				<div class="brand-title">
					<span class="brand-text">appAdmin</span>
				</div>
			</a>
		</div>
		<div class="navbar-content clearfix no-print">
			<ul class="nav navbar-top-links pull-left">
				<li class="tgl-menu-btn">
					<a class="mainnav-toggle" href="#">
						<i class="demo-pli-view-list"></i>
					</a>
				</li>
				<li class="mega-dropdown">
					<a href="#" class="mega-dropdown-toggle">
						<i class="demo-pli-layout-grid"></i>
					</a>
					<div class="dropdown-menu mega-dropdown-menu"></div>
				</li>
			</ul>
			<span class="main-header"> </span>
			<ul class="nav navbar-top-links pull-right">
				<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
				<li id="dropdown-user" class="dropdown">
					<a href="#" data-toggle="dropdown" class="dropdown-toggle text-right">
						<span class="pull-right">
							<i class="fa fa-user-o ic-user"></i>
						</span>
						<div class="index-username hidden-xs">chico</div>
					</a>
					<div class="dropdown-menu dropdown-menu-md dropdown-menu-right panel-default">
						<!-- Dropdown heading  -->
						<br>
						<!-- User dropdown menu -->
						<ul class="head-list">
							<li>
								<a href="javascript:void(-1)">
									<i class="fa fa-user-o icon-lg icon-fw"></i>
									Meus Dados
								</a>
							</li>
							<li>
								<a href="javascript:void(-1)">
									<i class="fa fa-info-circle icon-lg icon-fw"></i>
									Ajuda
								</a>
							</li>
						</ul>
						<!-- Dropdown footer -->
						<div class="pad-all text-right">
							<a href="j_spring_security_logout" class="btn btn-primary">
								<i class="fa fa-sign-out"></i>
								Sair
							</a>
						</div>
					</div>
				</li>
				<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
				<!--End user dropdown-->
				<li>
					<a href="javascript:void(-1)" class="aside-toggle navbar-aside-icon">
						<i class="pci-ver-dots"></i>
					</a>
				</li>
			</ul>
		</div>
		<!--================================-->
		<!--End Navbar Dropdown-->
	</div>
</header>
</template>

<script>
export default {
  name: "app-header"
  //   computed: {}
};
</script>
