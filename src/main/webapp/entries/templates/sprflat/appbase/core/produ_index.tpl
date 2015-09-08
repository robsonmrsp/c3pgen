<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix='security' uri='http://www.springframework.org/security/tags'%>
<c:set var="authenticated" value="false" />
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${application.name}</title>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta name="author" content="MR" />
<link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Open+Sans:400,700|Droid+Sans:400,700' />
<link href="css/main-built.min.css" rel="stylesheet">
<link rel="icon" href="images/ico/favicon.png" type="image/png">
</head>
<security:authorize access="isAuthenticated()">
	<c:set var="authenticated" value="true" />
	<c:set var="userName">
		<security:authentication property="principal.username" />
	</c:set>
</security:authorize>
<body>

	<div class="splash" id="loadInitialPanel" class="fader" style="position: fixed; text-align: center; height: 100%; width: 100%; top: 0; right: 0; left: 0; z-index: 99999999999; opacity: 0.99;">
		<div class="color-line"></div>
		<div class="splash-title">
			<h1>Aguarde, carregando...</h1>
			<br>
			<img src="images/loading-bars.svg" width="64" height="64">
		</div>
	</div>

	<!-- Start #header -->
	<div id="header">
		<div class="container-fluid">
			<div class="navbar">
				<div class="navbar-header">
					<a class="navbar-brand" href="index.html">
						<i class="im-windows8 text-logo-element animated bounceIn"></i>
						<span class="text-logo">New</span>
						<span class="text-slogan">App</span>
					</a>
				</div>
				<nav class="top-nav" role="navigation">
					<ul class="nav navbar-nav pull-left">
						<li id="toggle-sidebar-li">
							<a href="javascript:void(-1)" id="toggle-sidebar">
								<i class="en-arrow-left2"></i>
							</a>
						</li>
						<li>
							<a href="javascript:void(-1)" class="full-screen">
								<i class="fa-fullscreen"></i>
							</a>
						</li>
					</ul>
					<ul class="nav navbar-nav pull-right">
						<li>
							<a href="javascript:void(-1)" id="toggle-header-area">
								<i class="ec-download"></i>
							</a>
						</li>
						<li class="dropdown">
							<a href="javascript:void(-1)" data-toggle="dropdown">
								<img class="user-avatar" src="images/avatars/48.jpg" alt="SuggeElson">
								SuggeElson
							</a>
							<ul class="dropdown-menu right" role="menu">
								<li>
									<a href="profile.html">
										<i class="st-user"></i>
										Profile
									</a>
								</li>
								<li>
									<a href="javascript:void(-1)">
										<i class="st-settings"></i>
										Settings
									</a>
								</li>
								<li>
									<a href="login.html">
										<i class="im-exit"></i>
										Logout
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</nav>
			</div>
			<!-- Start #header-area -->
			<div id="header-area" class="fadeInDown">
				<div class="header-area-inner">
					<ul class="list-unstyled list-inline">
						<li>
							<div class="shortcut-button">
								<a href="javascript:void(-1)">
									<i class="ec-images color-dark"></i>
									<span>Gallery</span>
								</a>
							</div>
						</li>
						<li>
							<div class="shortcut-button">
								<a href="javascript:void(-1)">
									<i class="en-light-bulb color-orange"></i>
									<span>Fresh ideas</span>
								</a>
							</div>
						</li>
						<li>
							<div class="shortcut-button">
								<a href="javascript:void(-1)">
									<i class="st-lock color-teal"></i>
									<span>Lock area</span>
								</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<!-- End #header-area -->
		</div>
		<!-- Start .header-inner -->
	</div>
	<!-- End #header -->
	<!-- Start #sidebar -->
	<div id="sidebar">
		<!-- Start .sidebar-inner -->
		<div class="sidebar-inner">
			<!-- Start .sidebar-panel -->
			<div class="sidebar-panel panel-nav-header dark-bg">
				<h4 class="sidebar-panel-title">Navigation</h4>
				<a href="javascript:void(-1)" id="expand-all-submenus" class="expand-submenus tip" title="Expand all sub menus">
					<i class="en-plus"></i>
				</a>
			</div>
			<!-- End .sidebar-panel -->
			<!-- Start #sideNav -->
			<ul id="sideNav" class="nav nav-pills nav-stacked">
				<li>
					<a href="">
						Dashboard
						<i class="im-screen"></i>
					</a>
				</li>
				<li>
					<a href="javascript:void(-1)">
						Cadastros
						<i class="im-table2"></i>
					</a>
					<ul class="nav sub">
						<#list application.entities as entity>
						<#if entity.isAppEntity == true >
						<li class="">
							<a id="${firstLower(entity.name)}s"  href="#app/${firstLower(entity.name)}s">
								<i class="en-arrow-right7"></i>
								${entity.displayName}
							</a>
							<b class="arrow"></b>
						</li>
						</#if>
						</#list>
					</ul>
				</li>
			</ul>
		</div>
	</div>
	<div id="content">
		<div class="content-wrapper">
			<div class="outlet">
				<div class="main-content">
					<!-- AQUI DENTRO SERA INSERIDO VIA ENGINE DE TEMPLATES OS FORMS E PAGES-->
				</div>
			</div>
		</div>
		<div class="clearfix"></div>
	</div>
	<script src="javascript/main-built.js"></script>
</body>
</html>