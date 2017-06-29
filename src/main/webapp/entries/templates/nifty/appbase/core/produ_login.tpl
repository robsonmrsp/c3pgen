<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>Login | ${application.appName}</title>
<meta name="description" content="User login page" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="css/main-built.min.css" />
</head>

<body class="  pace-done"><div class="pace  pace-inactive">
<div class="pace-progress" data-progress-text="100%" data-progress="99" style="width: 100%;">
  <div class="pace-progress-inner"></div>
</div>
<div class="pace-activity"></div></div>
	<div id="container" class="cls-container">
		<!-- BACKGROUND IMAGE -->
		<!--===================================================-->
		<div id="bg-overlay" class="bg-img" style="background-image: url(&quot;images/background.jpg&quot;);"></div>
		
		<!-- LOGIN FORM -->
		<!--===================================================-->
		<div class="cls-content">
		    <div class="cls-content-sm panel">
		        <div class="panel-body">
		            <div class="mar-ver pad-btm">
		                <h3 class="h4 mar-no">Login</h3>
		                <p class="text-muted">Entre com seu usuário e senha</p>
		            </div>
					<form action="j_spring_security_check" method="post">
		                <div class="form-group">
							<input type="text" class="form-control" placeholder="Usuário" name="j_username" />
		                </div>
		                <div class="form-group">
							<input type="password" class="form-control" placeholder="Senha" name="j_password" />
		                </div>
		                <div class="checkbox pad-btm text-left">
		                    <input id="demo-form-checkbox" class="magic-checkbox" type="checkbox">
		                    <label for="demo-form-checkbox">Mantenha-me conectado</label>
		                </div>
		                <button class="btn btn-primary btn-lg btn-block" type="submit">Log in</button>
		            </form>
		        </div>
		
		        <div class="pad-all">
		            <a href="#" class="btn-link mar-rgt">Esqueceu a Senha ?</a>
		            <a href="#" class="btn-link mar-lft">Cria uma nova conta</a>
		
		            <div class="media pad-top bord-top">
		                <div class="pull-right">
		                    <a href="#" class="pad-rgt"><i class="demo-psi-facebook icon-lg text-primary"></i></a>
		                    <a href="#" class="pad-rgt"><i class="demo-psi-twitter icon-lg text-info"></i></a>
		                    <a href="#" class="pad-rgt"><i class="demo-psi-google-plus icon-lg text-danger"></i></a>
		                </div>
		                <div class="media-body text-left">
		                    Login com
		                </div>
		            </div>
		        </div>
		    </div>
		</div>
	</div>
</body>
</html>