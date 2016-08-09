	warFile = ${application.appName}-1.0-SNAPSHOT.war
	appName = ${application.appName}
	localWarDir =  
	deployDirTomcat = /home/tomcat/webapps
	limpaDeploydir = rm -rf /home/tomcat/webapps/${application.appName} /home/tomcat/webapps/${application.appName}.war
	
	username = abc
	password = 123
	userProfile = user_host
	localWarDir = /home/user_host/
	
	#Caminho do startup.sh na maquina de produção
	iniciarTomcat = /home/tomcat/bin/startup.sh
	
	#Caminho do shutdown.sh na maquina de produção 
	pararTomcat = /home/tomcat/bin/shutdown.sh
	
	#Host destino exemplo: 192.168.0.44
	host = www.YYY.com
	
	sshPort=1234
	