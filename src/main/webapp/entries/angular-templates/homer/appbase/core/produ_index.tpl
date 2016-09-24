<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix='security' uri='http://www.springframework.org/security/tags'%>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${application.appName}</title>
<link rel="icon" href="images/ico/favicon.png" type="image/png">
<link href="css/main-built.min.css" rel="stylesheet">
<style type="text/css">
</style>
<style type="text/css"></style>
</head>
<body>
	<div class="splash" id="loadInitialPanel" class="fader" style="position: fixed; text-align: center; height: 100%; width: 100%; top: 0; right: 0; left: 0; z-index: 99999999999; opacity: 0.99;">
		<div class="color-line"></div>
		<div class="splash-title">
			<h1>Aguarde, carregando...</h1>
			<br>
			<img src="images/loading-bars.svg" width="64" height="64">
		</div>
	</div>

	<!-- Header -->
	<div id="header">
		<div class="color-line"></div>
		<div id="logo" class="light-version">
			<span> ${firstUpper(application.appName)} </span>
		</div>
		<nav role="navigation">
			<div class="header-link hide-menu">
				<i class="fa fa-bars"></i>
			</div>
			<div class="small-logo">
				<span class="text-primary">${firstUpper(application.appName)} APP</span>
			</div>
			<form role="search" class="navbar-form-custom" method="post" action="#">
				<div class="form-group">
					<input type="text" placeholder="Search something special" class="form-control" name="search">
				</div>
			</form>
			<div class="navbar-right">
				<ul class="nav navbar-nav no-borders">
					<li class="dropdown">
						<a href="j_spring_security_logout">
							<i class="pe-7s-upload pe-rotate-90"></i>
						</a>
					</li>
				</ul>
			</div>
		</nav>
	</div>
	<!-- Navigation -->
	<aside id="menu">
		<div id="navigation">
			<div class="profile-picture">
				<a href="index.html">
					<img src="images/no_user.png" height='42' class="img-circle m-b" alt="logo">
				</a>
				<div class="stats-label text-color">
					<span class="font-extra-bold font-uppercase">NomeUsuario</span>
					<div class="dropdown">
						<a class="dropdown-toggle" href="#" data-toggle="dropdown">
							<small class="text-muted">
								Usuário
								<b class="caret"></b>
							</small>
						</a>
						<ul class="dropdown-menu animated fadeInRight m-t-xs">
							
							<li>
								<a href="profile.html">Perfil</a>
							</li>
							<li>
								<a href="analytics.html">Configuração</a>
							</li>
							<li class="divider"></li>
							<li>
								<a href="j_spring_security_logout">Logout</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<ul class="nav" id="side-menu">
				<li class="active">
					<a href="#">
						<span class="nav-label">Cadastros</span>
						<span class="fa arrow"></span>
					</a>
					<ul class="nav nav-second-level collapse" aria-expanded="true">
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
	</aside>
	<div id="wrapper">
		<div class="content animate-panel main-content"></div>
	</div>
	<div id="toTop">
		<img src="images/backtop.png" style="width: 48px; display: inline;">
	</div>
	<script src="javascript/main-built.js"></script>
</body>
</html>