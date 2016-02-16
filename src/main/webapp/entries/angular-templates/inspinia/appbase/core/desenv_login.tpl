<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login | ${application.appName}</title>
<link href="css/all.css" rel="stylesheet">
</head>
<body class="gray-bg">
	<div class="middle-box text-center loginscreen animated fadeInDown">
		<div>
			<div>
				<h1 class="logo-name">MR</h1>
			</div>
			<h3>Welcome to MR</h3>
			<p>
			</p>
			<form class="m-t" role="form" action="j_spring_security_check" method="POST">
				<div class="form-group">
					<input type="text" placeholder="" title="Please enter you username" required="" value="" name="j_username" id="username" class="form-control">
				</div>
				<div class="form-group">
					<input type="password" title="Please enter your password" placeholder="******" required="" value="" name="j_password" id="password" class="form-control">
				</div>
				<button type="submit" class="btn btn-primary block full-width m-b">Login</button>
			</form>
		</div>
	</div>
</body>
</html>
