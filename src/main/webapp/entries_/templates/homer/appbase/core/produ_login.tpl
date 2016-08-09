<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Login | ${application.appName}</title>
<link href="css/main-built.min.css" rel="stylesheet">
<style type="text/css"></style></head>
<body class="blank">
	<div class="color-line"></div>
	
	<div class="login-container">
		<div class="row">
			<div class="col-md-12">
				
				<div class="hpanel">
					<div class="panel-body">
						<form  id="loginForm" action="j_spring_security_check" method="post">
							<div class="form-group">
								<label class="control-label" for="username">Usuário</label>
								<input type="text" placeholder="example@gmail.com" title="Please enter you username" required="" value="" name="j_username" id="username" class="form-control">
								<span class="help-block small">Seu nome de usuário para acesso a aplicação</span>
							</div>
							
							<div class="form-group">
								<label class="control-label" for="password">Senha</label>
								<input type="password" title="Please enter your password" placeholder="******" required="" value="" name="j_password" id="password" class="form-control">
								<span class="help-block small">Sua senha.</span>
							</div>
							
							<button class="btn btn-success btn-block">Login</button>
							<a class="btn btn-default btn-block" href="#">Register</a>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>