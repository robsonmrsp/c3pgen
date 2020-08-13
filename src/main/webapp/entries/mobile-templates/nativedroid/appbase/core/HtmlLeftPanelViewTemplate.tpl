<!-- panel left -->
<div data-role="panel" id="leftpanel" data-display="overlay" data-position-fixed="true">
	<div class='nd2-sidepanel-profile wow fadeInDown'>
		<img class='profile-background' src="images/left-panel-background.jpg" />
		<div class="row">
			<div class='col-xs-4 center-xs'>
				<div class='box'>
					<img class="profile-thumbnail" src="images/no_photo.jpg" />
				</div>
			</div>
			<div class='col-xs-8'>
				<div class='box profile-text'>
					<strong>Nome Usuário</strong>
					<span class='subline'>Tipo De Usuário</span>
					<span class='subline'>
						<i>emaildousuario@email.com </i>
					</span>
				</div>
			</div>
		</div>
	</div>
	<div data-role="collapsible" data-inset="false" data-collapsed-icon="carat-d" data-expanded-icon="carat-d" data-iconpos="right">
		<h6>
			<i class="zmdi zmdi-square-right zmdi-hc-2x"></i>
			<span> &nbsp; &nbsp; &nbsp; &nbsp; Cadastros </span>
		</h6>
		<ul data-role="listview" data-inset="false" data-icon="false">
		<#list application.entities as entity>
		<#if entity.hasMobile == true>
			<li>
				<a href="#app/${firstLower(entity.name)}s" id="itemMenu${entity.name}s" data-ajax='false'>
					&nbsp; &nbsp; &nbsp;&nbsp;
					<i class="zmdi zmdi-chevron-right"></i>
					&nbsp; &nbsp; &nbsp; ${entity.displayName}s
				</a>
			</li>		
			</#if>
		</#list>
		</ul>
	</div>
	<hr class="inset">
	<ul data-role="listview" data-icon="false" data-inset="false" style="font-weight: bold;">
		<li>
			<a href="#app/config" id="itemMenuConfig" data-ajax='false'> Configurações </a>
		</li>
	</ul>
	<!-- /panel left -->