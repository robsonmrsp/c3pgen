<project name="${application.name} default="deploy" basedir=".">
	<description>
        simple example build file
    </description>
	<!-- set global properties for this build
	 -->

	<property environment="env" />

	<property name="build" location="build" />
	<property name="dist" location="dist" />
	<property name="src" location="src" />
	<property name="target" location="target" />
	<property file="build.properties" />

	<target name="send-war" description="Faz deploy do War na pasta tomcat">
		<scp todir="${r"${username}"}@${r"${host}"}:${r"${deployDirTomcat}"}/${r"${appName}"}.war" port="${r"${sshPort}"}" password="${r"${password}"}" verbose="true" trust="true" file="${r"${target}"}/${r"${warFile}"}" />
	</target>

	<target name="start-tomcat-server" description="Inicia o Servidor tomcat">
		<sshexec host="${r"${host}"}" port="${r"${sshPort}"}" username="${r"${username}"}" password="${r"${password}"}" command="${r"${iniciarTomcat}"}" trust="true" verbose="true" />
	</target>


	<target name="stop-tomcat-server" description="Para o Tomcat">
		<echo> executando-> "${r"${pararTomcat}"}"</echo>
		<echo>	usuario-> ${r"${username}"}"	</echo>
		<sshexec host="${r"${host}"}" port="${r"${sshPort}"}" username="${r"${username}"}" password="${r"${password}"}" command="${r"${pararTomcat}"}" trust="true" verbose="true" />
	</target>

	<target name="clean-tomcat-folder" description="Limpa a pasta do tomcat">
		<echo>
			executando-> "${r"${limpaDeploydir}"}" no "${r"${host}"}"
		</echo>
		<echo>
			usuario-> ${r"${username}"}"
		</echo>
		<sshexec host="${r"${host}"}" port="${r"${sshPort}"}" username="${r"${username}"}" password="${r"${password}"}" command="${r"${limpaDeploydir}"}" trust="true" verbose="true" />
	</target>

	<target name="deploy" description="Deploy Automático" depends="stop-tomcat-server, clean-tomcat-folder,send-war,start-tomcat-server">
		<echo>usuario-> Envindo a aplicação..."</echo>
	</target>
</project>