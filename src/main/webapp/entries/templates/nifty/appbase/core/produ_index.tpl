<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix='security' uri='http://www.springframework.org/security/tags'%>

<c:set var="authenticated" value="false" />
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="JSetup">
<link rel="icon" href="images/ico/favicon.png" type="image/png">
<title>${application.appName}</title>
<link href="css/main-built.min.css" rel="stylesheet">
<!--[if lt IE 9]><script src="js/ie8/ie8-responsive-file-warning.js"></script><![endif]-->
<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
</head>
<security:authorize access="isAuthenticated()">
	<c:set var="authenticated" value="true" />
	<c:set var="userName">
		<security:authentication property="principal.name" />
	</c:set>
	<c:set var="userEmail">
		<security:authentication property="principal.email" />
	</c:set>
</security:authorize>
<body class=" pace-done">

	<div class="splash" id="loadInitialPanel" class="fader" style="position: fixed; text-align: center; height: 100%; width: 100%; top: 0; right: 0; left: 0; z-index: 99999999999; opacity: 0.99;">
		<div class="color-line"></div>
		<div class="splash-title">
			<h1>Aguarde, carregando...</h1>
			<i class="fa fa-spinner fa-pulse fa-4x "></i>
		</div>
	</div>
	<div id="container" class="effect aside-float aside-bright mainnav-lg navbar-fixed mainnav-fixed aside-fixed">
		<!--NAVBAR-->
		<!--===================================================-->
		<header id="navbar">
			<div id="navbar-container" class="boxed">
				<!--Brand logo & name-->
				<!--================================-->
				<div class="navbar-header">
					<a href="" class="navbar-brand">
						<img src="images/logo.png" alt="Nifty Logo" class="brand-icon">
						<div class="brand-title">
							<span class="brand-text">${application.appName}</span>
						</div>
					</a>
				</div>
				<!--================================-->
				<!--End brand logo & name-->
				<!--Navbar Dropdown-->
				<!--================================-->
				<div class="navbar-content clearfix">
					<ul class="nav navbar-top-links pull-left">
						<!--Navigation toogle button-->
						<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
						<li class="tgl-menu-btn">
							<a class="mainnav-toggle" href="#">
								<i class="demo-pli-view-list"></i>
							</a>
						</li>
						<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
						<!--End Navigation toogle button-->
						<!--Mega dropdown-->
						<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
						<li class="mega-dropdown">
							<a href="#" class="mega-dropdown-toggle">
								<i class="demo-pli-layout-grid"></i>
							</a>
							<div class="dropdown-menu mega-dropdown-menu"></div>
						</li>
						<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
						<!--End mega dropdown-->
					</ul>
					<ul class="nav navbar-top-links pull-right">
						<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
						<li id="dropdown-user" class="dropdown">
							<a href="#" data-toggle="dropdown" class="dropdown-toggle text-right">
								<span class="pull-right">
									<!--<img class="img-circle img-user media-object" src="images/no_photo.jpg" alt="Profile Picture">-->
									<i class="fa fa-user-o ic-user"></i>
								</span>
								<div class="index-username hidden-xs">${r"${userName}"}</div>
							</a>
							<div class="dropdown-menu dropdown-menu-md dropdown-menu-right panel-default">
								<!-- Dropdown heading  -->
								<div class="pad-all bord-btm">
									<p class="text-main mar-btm">
										<span class="text-bold">750GB</span>
										of 1,000GB Used
									</p>
									<div class="progress progress-sm">
										<div class="progress-bar" style="width: 70%;">
											<span class="sr-only">70%</span>
										</div>
									</div>
								</div>
								<!-- User dropdown menu -->
								<ul class="head-list">
									<li>
										<a href="javascript:void(-1)">
											<i class="fa fa-user-o icon-lg icon-fw"></i>
											Profile
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
										Logout
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
		<!--===================================================-->
		<!--END NAVBAR-->
		<div class="boxed">
			<!--CONTENT CONTAINER-->
			<div id="content-container">
				<div class="main-content">
					<div id="page-content">
                    
					<hr class="new-section-sm bord-no">
					<div class="row">
					    <div class="col-lg-6 col-lg-offset-3">
					        <div class="panel panel-trans text-center">
					        <div class="panel-heading">
					            <h3 class="panel-title">Seja Bem vindo ao ${application.appName}</h3>
					        </div>
					        <div class="panel-body">
					            <p>Escolha qualquer item do menu a esquerda ou do menu acima para iniciar o uso.
					        </div>
					        </div>
					    </div>
					</div>
                </div>
				</div>
			</div>
			<!--END CONTENT CONTAINER-->
			<!--ASIDE-->
			<!--===================================================-->
			<aside id="aside-container">
				<div id="aside">
					<div class="nano">
						<div class="nano-content">
							<!--Nav tabs-->
							<!--================================-->
							<ul class="nav nav-tabs nav-justified">
								<li class="active">
									<a href="javascript:void(-1)" data-toggle="tab">
										<i class="fa fa-comments"></i>
										Mensagens
									</a>
								</li>
								<li>
									<a href="javascript:void(-1)" data-toggle="tab">
										<i class="fa fa-info-circle"></i>
										Relatorios
									</a>
								</li>
								<li>
									<a href="javascript:void(-1)" data-toggle="tab">
										<i class="fa fa-wrench"></i>
										Configurações
									</a>
								</li>
							</ul>
							<!--================================-->
							<!--End nav tabs-->
							<!-- Tabs Content -->
							<!--================================-->
						</div>
					</div>
				</div>
			</aside>
			<!--===================================================-->
			<!--END ASIDE-->
			<!--MAIN NAVIGATION-->
			<!--===================================================-->
			<nav id="mainnav-container">
				<div id="mainnav">
					<!--Menu-->
					<!--================================-->
					<div id="mainnav-menu-wrap">
						<div class="nano">
							<div class="nano-content">
								<!--Profile Widget-->
								<!--================================-->
								<div id="mainnav-profile" class="mainnav-profile" style="padding: 30px 20px 12px;  background-image: url('images/nav-profile.png') ; background-repeat: no-repeat;  background-size: cover;">
									<div class="profile-wrap">
										<div class="pad-btm">
											<img class="img-circle img-sm img-border" src="images/no_photo.jpg" alt="Imagem usuário">
										</div>
										<a href="javascript:void(-1)" class="box-block" data-toggle="collapse" aria-expanded="false">
											<p class="mnp-name">${r"${userName}"}</p>
											<span class="mnp-desc">${r"${userEmail}"}</span>
										</a>
									</div>
								</div>
								<!--Shortcut buttons-->
								<!--================================-->
								<!--================================-->
								<!--End shortcut buttons-->
								<ul id="mainnav-menu" class="list-group">
									<!--Category name-->
									<li class="list-header">Menu</li>
									<!--Menu list item-->
									<li>
										<a href="">
											<i class="fa fa-area-chart"></i>
											<span class="menu-title">
												<strong>Dashboard</strong>
											</span>
										</a>
									</li>
									<li class="list-divider"></li>
									<!--Category name-->
									<li>
										<a href="javascript:void(-1)">
											<i class="fa fa-table"></i>
											<span class="menu-title">Cadastros</span>
											<i class="arrow"></i>
										</a>
										<!--Submenu-->
										<ul class="collapse">
										<#list application.entities as entity>
										<#if entity.isAppEntity == true >
											<li id="${firstLower(entity.name)}s" >
												<a href="#app/${firstLower(entity.name)}s">
													${entity.displayName}
												</a>
											</li>
										</#if>
										</#list>
										</ul>
									</li>
									<li class="list-divider"></li>
									<li class="list-header">Extras</li>
									<li>
										<a href="javascript:void(-1)">
											<i class="demo-psi-inbox-full"></i>
											<span class="menu-title">Menu de extras</span>
										</a>
									</li>
								</ul>
								<!--Widget-->
								<!--================================-->
								<div class="mainnav-widget">
									<!-- Show the button on collapsed navigation -->
									<div class="show-small">
										<a href="javascript:void(-1)" data-toggle="menu-widget" data-target="#demo-wg-server">
											<i class="demo-pli-monitor-2"></i>
										</a>
									</div>
									<!-- Hide the content on collapsed navigation -->
									<div id="demo-wg-server" class="hide-small mainnav-widget-content">
										<ul class="list-group">
											<li class="list-header pad-no pad-ver">Server Status</li>
											<li class="mar-btm">
												<span class="label label-primary pull-right">15%</span>
												<p>CPU Usage</p>
												<div class="progress progress-sm">
													<div class="progress-bar progress-bar-primary" style="width: 15%;">
														<span class="sr-only">15%</span>
													</div>
												</div>
											</li>
										</ul>
									</div>
								</div>
								<!--================================-->
								<!--End widget-->
							</div>
						</div>
					</div>
					<!--================================-->
					<!--End menu-->
				</div>
			</nav>
			<!--===================================================-->
			<!--END MAIN NAVIGATION-->
		</div>
	</div>
	<!--===================================================-->
	<!-- END OF CONTAINER -->
	<div id="toTop">
		<img src="images/backtop.png" style="width: 48px; display: inline;">
	</div>
	<script src="javascript/main-built.js"></script>
</body>
</html>
