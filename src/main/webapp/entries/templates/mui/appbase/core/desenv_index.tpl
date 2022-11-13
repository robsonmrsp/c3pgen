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
<link rel="stylesheet" href=css/all.css " />
<!--[if lt IE 9]><script src="js/ie8/ie8-responsive-file-warning.js"></script><![endif]-->
<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
</head>
<security:authorize access="isAuthenticated()">
	<c:set var="authenticated" value="true" />
	<c:set var="userName">
		<security:authentication property="principal.username" />
	</c:set>
	<c:set var="name">
		<security:authentication property="principal.name" />
	</c:set>
	<c:set var="userEmail">
		<security:authentication property="principal.email" />
	</c:set>
	<c:set var="image">
		<security:authentication property="principal.image" />
	</c:set>
</security:authorize>
<body class="  pace-done">
	<div class="pace  pace-inactive">
		<div class="pace-progress" data-progress-text="100%" data-progress="99" style="width: 100%;">
			<div class="pace-progress-inner"></div>
		</div>
		<div class="splash" id="loadInitialPanel" class="fader" style="background-image: url('images/green-background.jpg'); text-align: center; height: 100%; width: 100%; top: 0; right: 0; left: 0; z-index: 99999999999; opacity: 0.99;">
			<div class="color-line"></div>
			<div class="splash-title">
				<h1>Aguarde, carregando...</h1>
				<small>Versão 0.7.45 30-08-2018 23:00 </small>
				<br>
				<i class="fa fa-spinner fa-pulse fa-4x "></i>
			</div>
		</div>
		<div class="pace-activity"></div>
	</div>
	<div id="container" class="effect aside-float aside-bright mainnav-lg mainnav-fixed navbar-fixed">
		<!--NAVBAR-->
		<!--===================================================-->
		<header id="navbar">
			<div id="navbar-container" class="boxed">
				<!--Brand logo & name-->
				<!--================================-->
				<div class="navbar-header">
					<a href="javascript:void(-1)" class="navbar-brand">
						<img src="images/logo.png" alt="Ymbu" height="36" width="36px" class="brand-icon">
						<div class="brand-title">
							<span class="brand-text">JSETUP</span>
						</div>
					</a>
				</div>
				<!--================================-->
				<!--End brand logo & name-->
				<!--Navbar Dropdown-->
				<!--================================-->
				<div class="navbar-content">
					<ul class="nav navbar-top-links">
						<!--Navigation toogle button-->
						<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
						<li class="tgl-menu-btn">
							<a class="mainnav-toggle" href="#">
								<i class="demo-pli-view-list"></i>
							</a>
						</li>
						<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
						<!--End Navigation toogle button-->
						<!--Search-->
						<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
						<li>
							<div class="main-header"></div>
						</li>
						<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
						<!--End Search-->
					</ul>
					<ul class="nav navbar-top-links">
						<!--Mega dropdown-->
						<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
						<!-- 						<li class="mega-dropdown"> -->
						<!-- 							<a href="#" class="mega-dropdown-toggle"> -->
						<!-- 								<i class="demo-pli-layout-grid"></i> -->
						<!-- 							</a> -->
						<!-- 						</li> -->
						<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
						<!--End mega dropdown-->
						<!--Notification dropdown-->
						<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
						<li class="dropdown">
							<!-- 							<a href="#" data-toggle="dropdown" class="dropdown-toggle" aria-expanded="false"> -->
							<!-- 								<i class="demo-pli-bell"></i> -->
							<!-- 								<span class="badge badge-header badge-danger"></span> -->
							<!-- 							</a> -->
							<!--Notification dropdown menu-->
							<div class="dropdown-menu dropdown-menu-md dropdown-menu-right" style="">
								<div class="nano scrollable has-scrollbar" style="height: 265px;">
									<div class="nano-content" tabindex="0" style="right: -17px;">
										<ul class="head-list">
											<li>
												<a href="#" class="media add-tooltip" data-title="Used space : 95%" data-container="body" data-placement="bottom" data-original-title="" title="">
													<div class="media-left">
														<i class="demo-pli-data-settings icon-2x text-main"></i>
													</div>
													<div class="media-body">
														<p class="text-nowrap text-main text-semibold">HDD is full</p>
														<div class="progress progress-sm mar-no">
															<div style="width: 95%;" class="progress-bar progress-bar-danger">
																<span class="sr-only">95% Complete</span>
															</div>
														</div>
													</div>
												</a>
											</li>
											<li>
												<a class="media" href="#">
													<div class="media-left">
														<i class="demo-pli-file-edit icon-2x"></i>
													</div>
													<div class="media-body">
														<p class="mar-no text-nowrap text-main text-semibold">Write a news article</p>
														<small>Last Update 8 hours ago</small>
													</div>
												</a>
											</li>
											<li>
												<a class="media" href="#">
													<span class="label label-info pull-right">New</span>
													<div class="media-left">
														<i class="demo-pli-speech-bubble-7 icon-2x"></i>
													</div>
													<div class="media-body">
														<p class="mar-no text-nowrap text-main text-semibold">Comment Sorting</p>
														<small>Last Update 8 hours ago</small>
													</div>
												</a>
											</li>
											<li>
												<a class="media" href="#">
													<div class="media-left">
														<i class="demo-pli-add-user-star icon-2x"></i>
													</div>
													<div class="media-body">
														<p class="mar-no text-nowrap text-main text-semibold">New User Registered</p>
														<small>4 minutes ago</small>
													</div>
												</a>
											</li>
											<li>
												<a class="media" href="#">
													<div class="media-left">
														<img class="img-circle img-sm" alt="Profile Picture" src="img/profile-photos/9.png">
													</div>
													<div class="media-body">
														<p class="mar-no text-nowrap text-main text-semibold">Lucy sent you a message</p>
														<small>30 minutes ago</small>
													</div>
												</a>
											</li>
											<li>
												<a class="media" href="#">
													<div class="media-left">
														<img class="img-circle img-sm" alt="Profile Picture" src="img/profile-photos/3.png">
													</div>
													<div class="media-body">
														<p class="mar-no text-nowrap text-main text-semibold">Jackson sent you a message</p>
														<small>40 minutes ago</small>
													</div>
												</a>
											</li>
										</ul>
									</div>
									<div class="nano-pane" style="">
										<div class="nano-slider" style="height: 169px; transform: translate(0px, 0px);"></div>
									</div>
								</div>
								<!--Dropdown footer-->
								<div class="pad-all bord-top">
									<a href="#" class="btn-link text-main box-block">
										<i class="pci-chevron chevron-right pull-right"></i>
										Show All Notifications
									</a>
								</div>
							</div>
						</li>
						<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
						<!--End notifications dropdown-->
						<!--User dropdown-->
						<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
						<li id="dropdown-user" class="dropdown">
							<a href="#" data-toggle="dropdown" class="dropdown-toggle text-right">
								<%-- 								<div class="index-username hidden-xs">${r"${userName}"}</div> --%>
								<span class="pull-right">
									<i class="fa fa-user-o ic-user"></i>
								</span>
							</a>
							<div class="dropdown-menu dropdown-menu-md dropdown-menu-right panel-default">
								<br>
								<!-- User dropdown menu -->
								<ul class="head-list">
									<li>
										<a href="#app/profile">
											<i class="fa fa-user-o icon-lg icon-fw"></i>
											Meus Dados
										</a>
									</li>
									<li>
										<a href="uploads/CHANGELOG.txt" target="_blank">
											<i class="fa  fa-history icon-lg icon-fw"></i>
											Changelog
										</a>
									</li>
									<li class="list-divider"></li>
									<li>
										<a href="j_spring_security_logout">
											<i class="icon-lg fa fa-sign-out"></i>
											Sair
										</a>
									</li>
								</ul>
							</div>
						</li>
						<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
						<!--End user dropdown-->
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
			<!--===================================================-->
			<div id="content-container">
				<div id="page-head">
					<div id="page-title">
						<h1 class="page-header text-overflow page-name"></h1>
					</div>
					<ol class="breadcrumb hide">
						<li>
							<a href="#">
								<i class="demo-pli-home"></i>
							</a>
						</li>
						<li>
							<a href="javascript:void(-1)" class="breadcrumb-label"></a>
						</li>
						<li class="active breadcrumb-item"></li>
					</ol>
				</div>
				<div id="page-content"></div>
				<!--===================================================-->
				<!--End page content-->
			</div>
			<!--===================================================-->
			<!--END CONTENT CONTAINER-->
			<!--ASIDE-->
			<!--===================================================-->
			<!--===================================================-->
			<!--END ASIDE-->
			<!--MAIN NAVIGATION-->
			<!--===================================================-->
			<nav id="mainnav-container">
				<div id="mainnav">
					<!--OPTIONAL : ADD YOUR LOGO TO THE NAVIGATION-->
					<!--It will only appear on small screen devices.-->
					<!--================================
                    <div class="mainnav-brand">
                        <a href="index.html" class="brand">
                            <img src="img/logo.png" alt="Nifty Logo" class="brand-icon">
                            <span class="brand-text">Nifty</span>
                        </a>
                        <a href="#" class="mainnav-toggle"><i class="pci-cross pci-circle icon-lg"></i></a>
                    </div>
                    -->
					<!--Menu-->
					<!--================================-->
					<div id="mainnav-menu-wrap">
						<div class="nano has-scrollbar">
							<div class="nano-content" tabindex="0" style="right: -17px;">
								<!--Profile Widget-->
								<!--================================-->
								<div id="mainnav-profile" class="mainnav-profile">
									<div class="profile-wrap text-center">
										<h4 class="text-lg text-overflow mar-no">
											<p class="mnp-name">${r"${ownerName}"}</p>
										</h4>
										<div class="pad-btm">
											<img class="img-circle img-md" src="${r"${ empty logo  ? 'images/no_photo.jpg' : image }"}" alt="usuario">
										</div>
										<a href="javascript:void(-1)" class="box-block"">
											<!-- 											<span class="pull-right dropdown-toggle"> -->
											<!-- 												<i class="dropdown-caret"></i> -->
											<!-- 											</span> -->
											<p class="mnp-name">${r"${userName}"}</p>
											<span class="mnp-desc">${r"${userEmail}"}</span>
										</a>
									</div>
									<div id="profile-nav" class="collapse list-group bg-trans">
										<a href="#" class="list-group-item">
											<i class="demo-pli-male icon-lg icon-fw"></i>
											View Profile
										</a>
										<a href="#" class="list-group-item">
											<i class="demo-pli-gear icon-lg icon-fw"></i>
											Settings
										</a>
										<a href="#" class="list-group-item">
											<i class="demo-pli-information icon-lg icon-fw"></i>
											Help
										</a>
										<a href="#" class="list-group-item">
											<i class="demo-pli-unlock icon-lg icon-fw"></i>
											Logout
										</a>
									</div>
								</div>
								<!--Shortcut buttons-->
								<!--================================-->
								<div id="mainnav-shortcut" class="hidden">
									<ul class="list-unstyled shortcut-wrap">
										<li class="col-xs-3" data-content="My Profile" data-original-title="" title="">
											<a class="shortcut-grid" href="#">
												<div class="icon-wrap icon-wrap-sm icon-circle bg-mint">
													<i class="demo-pli-male"></i>
												</div>
											</a>
										</li>
										<li class="col-xs-3" data-content="Messages" data-original-title="" title="">
											<a class="shortcut-grid" href="#">
												<div class="icon-wrap icon-wrap-sm icon-circle bg-warning">
													<i class="demo-pli-speech-bubble-3"></i>
												</div>
											</a>
										</li>
										<li class="col-xs-3" data-content="Activity" data-original-title="" title="">
											<a class="shortcut-grid" href="#">
												<div class="icon-wrap icon-wrap-sm icon-circle bg-success">
													<i class="demo-pli-thunder"></i>
												</div>
											</a>
										</li>
										<li class="col-xs-3" data-content="Lock Screen" data-original-title="" title="">
											<a class="shortcut-grid" href="#">
												<div class="icon-wrap icon-wrap-sm icon-circle bg-purple">
													<i class="demo-pli-lock-2"></i>
												</div>
											</a>
										</li>
									</ul>
								</div>
								<!--================================-->
								<ul id="mainnav-menu" class="list-group">
									<li class="list-divider"></li>
									<li class="list-header">Menu</li>
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
								</ul>
								<!--================================-->
								<!--================================-->
								<!--End widget-->
							</div>
							<div class="nano-pane" style="display: none;">
								<div class="nano-slider" style="height: 452px; transform: translate(0px, 0px);"></div>
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
		<!-- FOOTER -->
		<!--===================================================-->
		<footer id="footer">
			<!-- Visible when footer positions are fixed -->
			<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
			<div class="show-fixed pad-rgt pull-right">
				You have
				<a href="#" class="text-main">
					<span class="badge badge-danger">3</span>
					pending action.
				</a>
			</div>
			<!-- Visible when footer positions are static -->
			<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
			<!-- 			<div class="hide-fixed pull-right pad-rgt"> -->
			<!-- 				14GB of -->
			<!-- 				<strong>512GB</strong> -->
			<!-- 				Free. -->
			<!-- 			</div> -->
			<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
			<!-- Remove the class "show-fixed" and "hide-fixed" to make the content always appears. -->
			<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
			<p class="pad-lft">
				© 2019
				<a href="http://jsetup.com.br/" target="blanck">Jsetup Soluções Tecnológicas </a>
			</p>
		</footer>
		<!--===================================================-->
		<!-- END FOOTER -->
		<!-- SCROLL PAGE BUTTON -->
		<!--===================================================-->
		<button class="scroll-top btn">
			<i class="pci-chevron chevron-up"></i>
		</button>
		<!--===================================================-->
		<div class="mainnav-backdrop"></div>
	</div>
	<!--===================================================-->
	<!-- END OF CONTAINER -->
	<script data-main="js/main" src="vendor/require/require.js"></script>
</body>
</html>	