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
<meta name="author" content="ThemeBucket">
<link rel="icon" href="images/ico/favicon.png" type="image/png">
<title>Qualidade</title>
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
</security:authorize>
<body class="no-skin">
	<div class="splash" id="loadInitialPanel" class="fader" style="position: fixed; text-align: center; height: 100%; width: 100%; top: 0; right: 0; left: 0; z-index: 99999999999; opacity: 0.99;">
		<div class="color-line"></div>
		<div class="splash-title">
			<h1>Aguarde, carregando...</h1>
			<img src="images/loading-bars.svg" width="64" height="64">
		</div>
	</div>
	<div id="navbar" class="navbar navbar-default navbar-fixed-top">
		<div class="navbar-container" id="navbar-container">
			<button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
				<span class="sr-only">Toggle sidebar</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<div class="navbar-header pull-left">
				<a href="#" class="navbar-brand">
					<small>
						<i class="fa fa-desktop"></i>
						&nbsp;&nbsp;Qualidade
					</small>
				</a>
			</div>
			<div class="navbar-buttons navbar-header pull-right" role="navigation">
				<ul class="nav ace-nav">
					<li class="light-blue">
						<a data-toggle="dropdown" href="#" class="dropdown-toggle">
							<img class="nav-user-photo" src="images/avatar2.png" alt="" width="40" height="40" />
							<span class="user-info">
								<small>Bem vindo,</small>
								Usuario
							</span>
							<i class="ace-icon fa fa-caret-down"></i>
						</a>
						<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
							<li>
								<a href="j_spring_security_logout">
									<i class="ace-icon fa fa-power-off"></i>
									Sair
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="main-container" id="main-container">
		<div id="sidebar" class="sidebar responsive ">
			<ul class="nav nav-list" id='nav-accordion'>
				<li>
					<a href="#">
						<i class="menu-icon fa fa-home"></i>
						<span class="menu-text"> Home </span>
					</a>
					<b class="arrow"></b>
				</li>
				<li class="">
					<a href="#" class="dropdown-toggle">
						<i class="menu-icon fa fa-file-text-o"></i>
						<span class="menu-text"> Cadastros </span>
						<b class="arrow fa fa-angle-down"></b>
					</a>
					<b class="arrow"></b>
					<ul class="submenu">
					
					
			<li id="anexos" class="">
				<a href="#app/anexos">
					<i class="menu-icon fa fa-caret-right"></i>
					Anexo
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="apontamentoQualidadePackings" class="">
				<a href="#app/apontamentoQualidadePackings">
					<i class="menu-icon fa fa-caret-right"></i>
					Apontamento qualidade packing
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="bolsaos" class="">
				<a href="#app/bolsaos">
					<i class="menu-icon fa fa-caret-right"></i>
					Bolsao
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="cabines" class="">
				<a href="#app/cabines">
					<i class="menu-icon fa fa-caret-right"></i>
					Cabine
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="cargos" class="">
				<a href="#app/cargos">
					<i class="menu-icon fa fa-caret-right"></i>
					Cargo
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="cbos" class="">
				<a href="#app/cbos">
					<i class="menu-icon fa fa-caret-right"></i>
					Cbo
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="clientes" class="">
				<a href="#app/clientes">
					<i class="menu-icon fa fa-caret-right"></i>
					Cliente
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="controleCumbucas" class="">
				<a href="#app/controleCumbucas">
					<i class="menu-icon fa fa-caret-right"></i>
					Controle Cumbuca
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="cors" class="">
				<a href="#app/cors">
					<i class="menu-icon fa fa-caret-right"></i>
					Cor
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="departamentos" class="">
				<a href="#app/departamentos">
					<i class="menu-icon fa fa-caret-right"></i>
					Departamento
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="embalagems" class="">
				<a href="#app/embalagems">
					<i class="menu-icon fa fa-caret-right"></i>
					Embalagem
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="funcaos" class="">
				<a href="#app/funcaos">
					<i class="menu-icon fa fa-caret-right"></i>
					Funcao
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="funcionarios" class="">
				<a href="#app/funcionarios">
					<i class="menu-icon fa fa-caret-right"></i>
					Funcionario
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="generadors" class="">
				<a href="#app/generadors">
					<i class="menu-icon fa fa-caret-right"></i>
					Generador
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="latadas" class="">
				<a href="#app/latadas">
					<i class="menu-icon fa fa-caret-right"></i>
					Latada
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="packings" class="">
				<a href="#app/packings">
					<i class="menu-icon fa fa-caret-right"></i>
					Packing
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="sacolas" class="">
				<a href="#app/sacolas">
					<i class="menu-icon fa fa-caret-right"></i>
					Sacola
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="variedades" class="">
				<a href="#app/variedades">
					<i class="menu-icon fa fa-caret-right"></i>
					Variedade
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="roles" class="">
				<a href="#app/roles">
					<i class="menu-icon fa fa-caret-right"></i>
					Papel
				</a>
				<b class="arrow"></b>
			</li>
			
			<li id="users" class="">
				<a href="#app/users">
					<i class="menu-icon fa fa-caret-right"></i>
					Usuário
				</a>
				<b class="arrow"></b>
			</li>
			

						
					</ul>
				</li>
			</ul>
			<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
				<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
			</div>
		</div>
		<div class="main-content">
			<div class="main-content-inner">
				<div class="breadcrumbs" id="breadcrumbs">
					<ul class="breadcrumb">
						<li>
							<i class="ace-icon fa fa-home home-icon"></i>
							<a href="#">Home</a>
						</li>
						<li class="active">Cadastrar Pessoa</li>
					</ul>
				</div>
				<div class="page-content">
					<div class="page-header">
						<h1>Home</h1>
					</div>
					<div class="main-principal">
						<!-- AQUI DENTRO SERÃ INSERIDO VIA ENGINE DE TEMPLATES OS FORMS E PAGES-->
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="footer-inner">
				<div class="footer-content">
					<span class="bigger-120">
						<span class="blue bolder">Novo</span>
						Projeto &copy; 2014-2015
					</span>
				</div>
			</div>
		</div>
		<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
			<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
		</a>
	</div>
	<div id="toTop">
		<img src="images/backtop.png" style="width: 48px; display: inline;">
	</div>
	<script data-main="js/main" src="vendor/require/require.js"></script>
</body>
</html>