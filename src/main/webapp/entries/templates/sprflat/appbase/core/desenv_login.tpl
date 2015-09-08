<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Login | ${application.name}</title>
<!-- Mobile specific metas -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link href="css/all.css" rel="stylesheet" />
<link rel="icon" href="assets/img/ico/favicon.ico" type="image/png">
<meta name="msapplication-TileColor" content="#3399cc" />
</head>
<body class="login-page">
	<div id="login" class="">
		<img id="logo" src="assets/img/logo.png" alt="sprFlat Logo">
		<div class="login-wrapper">
			<ul id="myTab" class="nav nav-tabs nav-justified bn">
				<li>
					<a href="javascript:void(-1)" data-toggle="tab">Login</a>
				</li>
			</ul>
			<div id="myTabContent" class="tab-content bn">
				<div class="tab-pane fade active in" id="log-in">
					<div class="seperator">
						<hr>
					</div>
					<form class="form-horizontal mt10" action="j_spring_security_check" method="post">
						<div class="form-group">
							<div class="col-lg-12">
								<input type="text" class="form-control left-icon" placeholder="Seu nome de usuário" name="j_username" />
								<i class="ec-user s16 left-input-icon"></i>
							</div>
						</div>
						<div class="form-group">
							<div class="col-lg-12">
								<input type="password" class="form-control left-icon" name="j_password" placeholder="Sua senha">
								<i class="ec-locked s16 left-input-icon"></i>
								<span class="help-block">
									<a href="#">
										<small>Esqueceu a senha ?</small>
									</a>
								</span>
							</div>
						</div>
						<div class="form-group">
							<div class="col-lg-6 col-md-6 col-sm-6 col-xs-8">
								<!-- col-lg-12 start here -->
								<label class="checkbox"> </label>
							</div>
							<div class="col-lg-6 col-md-6 col-sm-6 col-xs-4">
								<button class="btn btn-success pull-right" type="submit">Login</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>