<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix='security' uri='http://www.springframework.org/security/tags'%>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>c3pgen</title>
<link href="css/main-built.min.css" rel="stylesheet">
<link rel="icon" href="images/ico/favicon.png" type="image/png">
<style type="text/css">
</style>
<style type="text/css"></style>
<style>
</style>


</head>
<body class="hide-sidebar">
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
			<!-- 			<span> C3PGen </span> -->
		</div>
		<nav role="navigation">
			<!-- 			<div class="header-link hide-menu"> -->
			<!-- 				<i class="fa fa-bars"></i> -->
			<!-- 			</div> -->
			<div class="small-logo">
				<!-- 				<span class="text-primary">C3pgen APP</span> -->
			</div>
			<div class="navbar-right">
				<ul class="nav navbar-nav no-borders">
					<li class="dropdown ">
						<a class="dropdown-toggle label-menu-corner" href="#" data-toggle="dropdown" aria-expanded="true">
							<img src="http://www.assetsauditoria.com.br/imagens/boneco3.png" class="img-circle m-b" alt="logo" style="height: 29px;">
							<small style="font-size: 14px"> Chico de Toinha </small>
						</a>
						<ul class="dropdown-menu animated fadeInRight m-t-xs">
							<li>
								<a href="javascript:void(-1)">
									<i class="pe-7s-id " style="font-size: 25px; vertical-align: bottom"></i>
									Perfil
								</a>
							</li>
							<li>
								<a href="javascript:void(-1)">
									<i class="pe-7s-config spin" style="font-size: 25px; vertical-align: bottom"></i>
									Configuração
								</a>
							</li>
							<li class="divider"></li>
							<li>
								<a href="j_spring_security_logout">
									<i class="pe-7s-upload pe-rotate-90" style="font-size: 25px; vertical-align: bottom"></i>
									Logout
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="navbar-left">
				<ul class="nav navbar-nav no-borders">
					<li class="dropdown">
						<a class="dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
							<i class="pe-7s-keypad"></i>
						</a>
						<div class="dropdown-menu hdropdown bigmenu animated flipInX">
							<table>
								<tbody>
									<tr>
										<td>
											<a href="#app/applications">
												<i class="pe pe-7s-display1 text-info"></i>
												<h5>Applicações</h5>
											</a>
										</td>
										<td>
											<a href="#app/modulos">
												<i class="pe pe-7s-network text-warning"></i>
												<h5>Módulos</h5>
											</a>
										</td>
<!-- 										<td> -->
<!-- 											<a href="contacts.html"> -->
<!-- 												<i class="pe pe-7s-users text-success"></i> -->
<!-- 												<h5>Contacts</h5> -->
<!-- 											</a> -->
<!-- 										</td> -->
									</tr>
								</tbody>
							</table>
						</div>
					</li>
					<li class="dropdown">
						<a class="dropdown-toggle label-menu-corner" href="#" data-toggle="dropdown">
							<i class="pe-7s-mail"></i>
							<span class="label label-success">4</span>
						</a>
						<ul class="dropdown-menu hdropdown animated flipInX">
							<div class="title">You have 4 new messages</div>
							<li>
								<a> It is a long established. </a>
							</li>
							<li>
								<a> There are many variations. </a>
							</li>
							<li>
								<a> Lorem Ipsum is simply dummy. </a>
							</li>
							<li>
								<a> Contrary to popular belief. </a>
							</li>
							<li class="summary">
								<a href="#">See All Messages</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
	</div>
	<!-- Main Wrapper -->
	<div id="wrapper">
		<div class="content animate-panel main-content"></div>
	</div>
	<div id="toTop">
		<img src="images/backtop.png" style="width: 48px; display: inline;">
	</div>
	<script src="javascript/main-built.js"></script>
</body>
</html>