<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix='security' uri='http://www.springframework.org/security/tags'%>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${application.name}</title>
<link rel="icon" href="images/ico/favicon.png" type="image/png">
<link href="css/main-built.min.css" rel="stylesheet">
</head>
<body class=" pace-done">
	<div class="splash" id="loadInitialPanel" class="fader" style="position: fixed; text-align: center; height: 100%; width: 100%; top: 0; right: 0; left: 0; z-index: 99999999999; opacity: 0.99;">
		<div class="color-line"></div>
		<div class="splash-title">
			<h1>Aguarde, carregando...</h1>
			<br>
			<img src="images/loading-bars.svg" width="64" height="64">
		</div>
	</div>

	<div id="wrapper">
		<nav class="navbar-default navbar-static-side" role="navigation">
			<div class="sidebar-collapse">
				<ul class="nav" id="side-menu" style="display: block;">
					<li class="nav-header">
						<div class="dropdown profile-element">
							<span>
								<img alt="image" class="img-circle" src="images/no_user.png" width="40" height="40">
							</span>
							<a data-toggle="dropdown" class="dropdown-toggle" href="javascript:void(-1)">
								<span class="clear">
									<span class="block m-t-xs">
										<strong class="font-bold">David Williams</strong>
									</span>
									<span class="text-muted text-xs block">
										Art Director
										<b class="caret"></b>
									</span>
								</span>
							</a>
							<ul class="dropdown-menu animated fadeInRight m-t-xs">
								<li>
									<a href="javascript:void(-1)">Profile</a>
								</li>
								<li>
									<a href="javascript:void(-1)">Contacts</a>
								</li>
								<li>
									<a href="javascript:void(-1)">Mailbox</a>
								</li>
								<li class="divider"></li>
								<li>
									<a href="javascript:void(-1)">Logout</a>
								</li>
							</ul>
						</div>
						<div class="logo-element">MR</div>
					</li>
					<li class="active">
						<a href="javascript:void(-1)">
							<i class="fa fa-th-large"></i>
							<span class="nav-label">Cadastros</span>
							<span class="fa arrow"></span>
						</a>
						<ul class="nav nav-second-level collapse in">
							<#list application.entities as entity>
							<#if entity.isAppEntity == true >
							<li class="">
								<a id="${firstLower(entity.name)}s" href="#app/${firstLower(entity.name)}s">
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
		</nav>
		<div id="page-wrapper" class="gray-bg dashbard-1" style="min-height: 1075px;">
			<div class="row border-bottom">
				<nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
					<div class="navbar-header">
						<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="javascript:void(-1)">
							<i class="fa fa-bars"></i>
						</a>
						<form role="search" class="navbar-form-custom" action="search_results.html">
							<div class="form-group">
								<input type="text" placeholder="Search for something..." class="form-control" name="top-search" id="top-search">
							</div>
						</form>
					</div>
					<ul class="nav navbar-top-links navbar-right">
						<li>
							<span class="m-r-sm text-muted welcome-message">Mensagem de boas vindas.</span>
						</li>
						<li class="dropdown">
							<a class="dropdown-toggle count-info" data-toggle="dropdown" href="javascript:void(-1)">
								<i class="fa fa-envelope"></i>
								<span class="label label-warning">16</span>
							</a>
							<ul class="dropdown-menu dropdown-messages">
								<li>
									<div class="dropdown-messages-box">
										<a href="profile.html" class="pull-left">
											
										</a>
										<div class="media-body">
											<small class="pull-right">46h ago</small>
											<strong>Mike Loreipsum</strong>
											started following
											<strong>Monica Smith</strong>
											.
											<br>
											<small class="text-muted">3 days ago at 7:58 pm - 10.06.2014</small>
										</div>
									</div>
								</li>
								<li class="divider"></li>
								<li>
									<div class="dropdown-messages-box">
										<a href="profile.html" class="pull-left">
											
										</a>
										<div class="media-body ">
											<small class="pull-right text-navy">5h ago</small>
											<strong>Chris Johnatan Overtunk</strong>
											started following
											<strong>Monica Smith</strong>
											.
											<br>
											<small class="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
										</div>
									</div>
								</li>
								<li class="divider"></li>
								<li>
									<div class="dropdown-messages-box">
										<a href="profile.html" class="pull-left">
											
										</a>
										<div class="media-body ">
											<small class="pull-right">23h ago</small>
											<strong>Monica Smith</strong>
											love
											<strong>Kim Smith</strong>
											.
											<br>
											<small class="text-muted">2 days ago at 2:30 am - 11.06.2014</small>
										</div>
									</div>
								</li>
								<li class="divider"></li>
								<li>
									<div class="text-center link-block">
										<a href="mailbox.html">
											<i class="fa fa-envelope"></i>
											<strong>Read All Messages</strong>
										</a>
									</div>
								</li>
							</ul>
						</li>
						<li class="dropdown">
							<a class="dropdown-toggle count-info" data-toggle="dropdown" href="javascript:void(-1)">
								<i class="fa fa-bell"></i>
								<span class="label label-primary">8</span>
							</a>
							<ul class="dropdown-menu dropdown-alerts">
								<li>
									<a href="grid_options.html">
										<div>
											<i class="fa fa-upload fa-fw"></i>
											Server Rebooted
											<span class="pull-right text-muted small">4 minutes ago</span>
										</div>
									</a>
								</li>
								<li class="divider"></li>
								<li>
									<div class="text-center link-block">
										<a href="notifications.html">
											<strong>See All Alerts</strong>
											<i class="fa fa-angle-right"></i>
										</a>
									</div>
								</li>
							</ul>
						</li>
						<li>
							<a href="login.html">
								<i class="fa fa-sign-out"></i>
								Log out
							</a>
						</li>
						<li>
							<a class="right-sidebar-toggle">
								<i class="fa fa-tasks"></i>
							</a>
						</li>
					</ul>
				</nav>
			</div>
			<div class="wrapper wrapper-content main-content"></div>
			<div class="row  border-bottom white-bg dashboard-header"></div>
		</div>
	</div>
	<div id="toTop">
		<img src="images/backtop.png" style="width: 48px; display: inline;">
	</div>
	<script src="javascript/main-built.js"></script>
</body>
</html>