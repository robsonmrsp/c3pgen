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
											<a href="mailbox.html">
												<i class="pe pe-7s-mail text-warning"></i>
												<h5>Email</h5>
											</a>
										</td>
										<td>
											<a href="contacts.html">
												<i class="pe pe-7s-users text-success"></i>
												<h5>Contacts</h5>
											</a>
										</td>
									</tr>
<!-- 									<tr> -->
<!-- 										<td> -->
<!-- 											<a href="forum.html"> -->
<!-- 												<i class="pe pe-7s-comment text-info"></i> -->
<!-- 												<h5>Forum</h5> -->
<!-- 											</a> -->
<!-- 										</td> -->
<!-- 										<td> -->
<!-- 											<a href="analytics.html"> -->
<!-- 												<i class="pe pe-7s-graph1 text-danger"></i> -->
<!-- 												<h5>Analytics</h5> -->
<!-- 											</a> -->
<!-- 										</td> -->
<!-- 										<td> -->
<!-- 											<a href="file_manager.html"> -->
<!-- 												<i class="pe pe-7s-box1 text-success"></i> -->
<!-- 												<h5>Files</h5> -->
<!-- 											</a> -->
<!-- 										</td> -->
<!-- 									</tr> -->
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
					<!-- 					<li> -->
					<!-- 						<a href="#" id="sidebar" class="right-sidebar-toggle"> -->
					<!-- 							<i class="pe-7s-upload pe-7s-news-paper"></i> -->
					<!-- 						</a> -->
					<!-- 					</li> -->
					<!-- 					<li class="dropdown"> -->
					<!-- 						<a href="login.html"> -->
					<!-- 							<i class="pe-7s-upload pe-rotate-90"></i> -->
					<!-- 						</a> -->
					<!-- 					</li> -->
				</ul>
			</div>
		</nav>
	</div>
	<!-- Navigation -->
	<!-- 	<aside id="menu"> -->
	<!-- 		<div id="navigation"> -->
	<!-- 			<div class="profile-picture"> -->
	<!-- 				<a href="index.jsp"> -->
	<!-- 										<img src="http://webapplayers.com/homer_admin-v1.5/images/profile.jpg" class="img-circle m-b" alt="logo"> -->
	<!-- 				</a> -->
	<!-- 				<div class="stats-label text-color"> -->
	<!-- 										<span class="font-extra-bold font-uppercase">Chico de Toinha</span> -->
	<!-- 					<div class="dropdown"> -->
	<!-- 												<a class="dropdown-toggle" href="#" data-toggle="dropdown"> -->
	<!-- 													<small class="text-muted"> -->
	<!-- 														Usuário -->
	<!-- 														<b class="caret"></b> -->
	<!-- 													</small> -->
	<!-- 												</a> -->
	<!-- 					</div> -->
	<!-- 				</div> -->
	<!-- 			</div> -->
	<!-- 			<ul class="nav" id="side-menu"> -->
	<!-- 				<li class="active"> -->
	<!-- 										<a href="#"> -->
	<!-- 											<span class="nav-label">Aplicações</span> -->
	<!-- 																	<span class="fa arrow"></span> -->
	<!-- 										</a> -->
	<!-- 					<ul class="nav nav-second-level collapse" aria-expanded="true"> -->
	<!-- 						<li class=""> -->
	<!-- 							<a id="applications" href="#app/applications"> -->
	<!-- 								<i class="fa fa-file-text-o fa-3x"></i> -->
	<!-- 							</a> -->
	<!-- 							<b class="arrow"></b> -->
	<!-- 						</li> -->
	<!-- 					</ul> -->
	<!-- 				</li> -->
	<!-- 			</ul> -->
	<!-- 		</div> -->
	<!-- 	</aside> -->
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