<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix='security' uri='http://www.springframework.org/security/tags'%>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>c3pgen</title>
<link rel="stylesheet" href="css/all.css">
<link rel="icon" href="images/ico/favicon.png" type="image/png">
<style type="text/css">
</style>
<style type="text/css"></style>
</head>
<body>
	<!-- Simple splash screen-->
	<div class="splash" id="loadInitialPanel" class="fader" style="position: fixed; text-align: center; height: 100%; width: 100%; top: 0; right: 0; left: 0; z-index: 99999999999; opacity: 0.99;">
		<div class="color-line"></div>
		<div class="splash-title">
			<h1>Aguarde, carregando...</h1>
			<img src="images/loading-bars.svg" width="64" height="64">
		</div>
	</div>
	<!--[if lt IE 7]>
<p class="alert alert-danger">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->
	<!-- Header -->
	<div id="header">
		<div class="color-line"></div>
		<div id="logo" class="light-version">
			<span>
				<img src="images/icon.png" width="20">
			</span>
			<span> C3PGen </span>
		</div>
		<nav role="navigation">
			<div class="header-link hide-menu">
				<i class="fa fa-bars"></i>
			</div>
			<div class="small-logo">
				<span class="text-primary">C3pgen APP</span>
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
					<img src="http://webapplayers.com/homer_admin-v1.5/images/profile.jpg" class="img-circle m-b" alt="logo">
				</a>
				<div class="stats-label text-color">
					<span class="font-extra-bold font-uppercase">Chico de Toinha</span>
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
						<li class="">
							<a id="applications" href="#app/applications">
								<i class="en-arrow-right7"></i>
								Application
							</a>
							<b class="arrow"></b>
						</li>
						<li class="">
							<a id="categoria" href="#app/categoria">
								<i class="en-arrow-right7"></i>
								Categoria
							</a>
							<b class="arrow"></b>
						</li>
						<li class="">
							<a id="attributes" href="#app/attributes">
								<i class="en-arrow-right7"></i>
								Attribute
							</a>
							<b class="arrow"></b>
						</li>
						<li class="">
							<a id="attributeTypes" href="#app/attributeTypes">
								<i class="en-arrow-right7"></i>
								AttributeType
							</a>
							<b class="arrow"></b>
						</li>
						<li class="">
							<a id="theEntitys" href="#app/theEntitys">
								<i class="en-arrow-right7"></i>
								TheEntity
							</a>
							<b class="arrow"></b>
						</li>
						<li class="">
							<a id="relationships" href="#app/relationships">
								<i class="en-arrow-right7"></i>
								Relationship
							</a>
							<b class="arrow"></b>
						</li>
						<li class="">
							<a id="viewApproachs" href="#app/viewApproachs">
								<i class="en-arrow-right7"></i>
								ViewApproach
							</a>
							<b class="arrow"></b>
						</li>
						<li class="">
							<a id="clientes" href="#app/clientes">
								<i class="en-arrow-right7"></i>
								Cliente
							</a>
							<b class="arrow"></b>
						</li>
						<li class="">
							<a id="roles" href="#app/roles">
								<i class="en-arrow-right7"></i>
								Papel
							</a>
							<b class="arrow"></b>
						</li>
						<li class="">
							<a id="users" href="#app/users">
								<i class="en-arrow-right7"></i>
								Usuário
							</a>
							<b class="arrow"></b>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</aside>
	<!-- Main Wrapper -->
	<div id="wrapper">
		<div class="content animate-panel main-content"></div>
	</div>
	<div id="toTop">
		<img src="images/backtop.png" style="width: 48px; display: inline;">
	</div>
	<script data-main="js/main" src="vendor/require/require.js"></script>
</body>
</html>