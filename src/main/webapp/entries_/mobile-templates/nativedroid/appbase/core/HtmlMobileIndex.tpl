<!DOCTYPE HTML>
<html>
<head>
<title>${application.appName}</title>
<meta charset="utf-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="stylesheet" href="css/font-awesome.css" />
<link rel="stylesheet" href="css/customApp.css" />
<link rel="stylesheet" href="vendor/jquery/jquery.mobile-1.4.5.css" />
<link rel="stylesheet" href="vendor/waves/waves.css" />
<link rel="stylesheet" href="vendor/theme/flexboxgrid.min.css" />
<link rel="stylesheet" href="vendor/wow/animate.css" />
<link rel="stylesheet" href="vendor/theme/nativedroid2.css" />
<link rel="stylesheet" href="vendor/theme/material-design-iconic-font.css" />
<!-- <link rel="stylesheet" href="vendor/theme/nativedroid2.color.green.css" /> -->
<link rel="stylesheet" href="vendor/theme/nativedroid2.color.light-blue.css" />
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
</head>
<body>
	<div class="splash" id="loadInitialPanel" class="fader" style="position: fixed; text-align: center; height: 100%; width: 100%; top: 0; right: 0; left: 0; z-index: 99999999999; opacity: 0.99;">
		<div class="color-line"></div>
		<div class="splash-title">
			<h1>Aguarde, carregando...</h1>
			<small>MobApp ${application.appName} Versão 1.0.0 SNAPSHOT </small>
			<br>
			<img src="images/loading-bars.svg" width="74" height="74">
		</div>
	</div>
	<div data-role="page">
		<!-- 		Painel que está abrindo no final da pagina -->
		<div data-role="panel" id="bottomsheet" data-animate="false" data-position='bottom' data-display="overlay" class="bottom-panel-content"></div>
		<div id="headerRegion"></div>
		<div id="bodyRegion" role="main" class="ui-content main-content" data-inset="false"></div>
		<div id="bottomRegion"></div>
	</div>
 	<script type="text/javascript" src="cordova.js"></script> 
	<script data-main="js/main" src="vendor/require/require.js"></script>
</body>
</html>
