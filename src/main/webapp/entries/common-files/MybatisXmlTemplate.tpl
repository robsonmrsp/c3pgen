<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" 
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="${application.rootPackage}.persistence.${entity.name}Mapper">
	<resultMap type="${entity.name}" id="result">
		<!-- pk -->
		<result column="${entity.pk}" property="id" />
	<#if entity.attributes??>	
	<#list entity.attributes as att>
		<result column="${uppercase(att.tableFieldName!att.name)}" property="${att.name}" />
	</#list>
	</#if>	
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.type == 'ManyToOne' ||  rel.type == 'OneToOne'>
		<association column="${uppercase(rel.fk)}" property="${rel.name}" select="${application.rootPackage}.persistence.${rel.model}Mapper.carrega" />
		</#if>
		<#if rel.type == 'OneToMany'>
		<collection  column="${entity.pk}" property="${rel.name}" javaType="ArrayList" ofType="${rel.model}" select="${application.rootPackage}.persistence.${rel.model}Mapper.carregaPor${entity.name}"/>
		</#if>
	</#list>
	</#if>
	</resultMap>	
    <select id="carrega" parameterType="Integer" resultMap="result">
        SELECT 
        	*
        FROM
        	${uppercase(entity.tableName!entity.name)}
        WHERE
        	${entity.pk} = ${r"#{"} id ${r"}"}
    </select>
    
    <select id="carrega${entity.name}" parameterType="${entity.name}" resultMap="result">
        SELECT 
        	*
        FROM
        	${uppercase(entity.tableName!entity.name)}
        WHERE
        	${entity.pk} = ${r"#{"} id ${r"}"}
	<#if entity.attributes??>	
	<#list entity.attributes as att>
			<if test=" ${att.name} != null ">
	    	AND ${uppercase(att.tableFieldName!att.name)} = ${r"#{"} ${att.name} ${r"}"}
	    	</if> 
	</#list>
	</#if>	
    </select>
    
    <!-- Evitando fullscan -->
    <select id="lista" resultMap="result">
        SELECT 	*
        FROM
        	${uppercase(entity.tableName!entity.name)}
        WHERE
        	ROWNUM &lt;= 1000
    </select>
    
    <select id="pesquisa" resultMap="result" parameterType="map">
		SELECT  *  FROM (
			SELECT INDICE.*
			FROM (
				SELECT INDICE.*, ROWNUM AS RN
				FROM (
		                SELECT X_TABLE.ROWID AS I_ROWID,
							X_TABLE.*
						FROM 
							${uppercase(entity.tableName!entity.name)} X_TABLE
						WHERE
						 	1 = 1
						<if test=" ${firstLower(entity.name)}.id != null ">
					    	AND ${entity.pk} = ${r"#{"} ${firstLower(entity.name)}.id ${r"}"}
					    </if> 
					<#if entity.attributes??>	
					<#list entity.attributes as att>
						<if test=" ${firstLower(entity.name)}.${att.name} != null ">
							<#if att.type.className == 'string' || att.type.className == 'String'>
					    	AND UPPER(${uppercase(att.tableFieldName!att.name)})  LIKE UPPER('%${r"${"} ${firstLower(entity.name)}.${att.name} ${r"}"}%')
					    	<#else>
					    	AND ${uppercase(att.tableFieldName!att.name)} = ${r"#{"} ${firstLower(entity.name)}.${att.name} ${r"}"}
					    	</#if>
					    </if> 
					</#list>
					</#if>
					
					<#if entity.relationships??>	
					<#list entity.relationships as rel>
						<#if rel.fk?? &&  (rel.type == 'ManyToOne' ||  rel.type == 'OneToOne')>	
						<if test=" ${firstLower(entity.name)}.${firstLower(rel.name)!firstLower(rel.model)} != null ">
					    	AND ${uppercase(rel.fk)} = ${r"#{"}  ${ firstLower(entity.name)}.${firstLower(rel.name)!firstLower(rel.model)} ${r"}"}
					    </if> 
					    </#if>				 
					</#list>
					</#if>												 
		                 ) INDICE
		           WHERE ROWNUM &lt;= ${r"#{"} config.lastResult ${r"}"}   
		           ) INDICE
		     WHERE RN >  ${r"#{"} config.firstResult ${r"}"}
		     ) INDICE
		     , ${uppercase(entity.tableName!entity.name)} X_TABLE
	   WHERE INDICE.I_ROWID = X_TABLE.ROWID
    </select>
    
    <select id="conta" resultType="Integer" parameterType="map">
        SELECT 
        	count(*) FROM ${uppercase(entity.tableName!entity.name)} X_TABLE 
        WHERE 
        	1 = 1
	<if test=" ${firstLower(entity.name)}.id != null ">
    	AND ${entity.pk} = ${r"#{"} ${firstLower(entity.name)}.id ${r"}"}
    </if>        	
	<#if entity.attributes??>	
	<#list entity.attributes as att>
		<if test=" ${firstLower(entity.name)}.${att.name} != null ">
			<#if att.type.className == 'string' || att.type.className == 'String'>
	    	AND UPPER(${uppercase(att.tableFieldName!att.name)})  LIKE UPPER('%${r"${"} ${firstLower(entity.name)}.${att.name} ${r"}"}%')
	    	<#else>
	    	AND ${uppercase(att.tableFieldName!att.name)} = ${r"#{"} ${firstLower(entity.name)}.${att.name} ${r"}"}
	    	</#if>
	    </if> 
	</#list>
	</#if>		
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.fk?? &&  (rel.type == 'ManyToOne' ||  rel.type == 'OneToOne')>
		<if test=" ${firstLower(entity.name)}.${firstLower(rel.name)!firstLower(rel.model)} != null ">
	    	AND ${uppercase(rel.fk)} = ${r"#{"}  ${ firstLower(entity.name)}.${firstLower(rel.name)!firstLower(rel.model)} ${r"}"}
	    </if> 
		</#if>												 
	</#list>
	</#if>												 
								 
    </select>
    
    <select id="filtra" parameterType="map" resultMap="result">
        SELECT *
        FROM 
        	${uppercase(entity.tableName!entity.name)} X_TABLE 
        WHERE 
        	1 = 1
			<if test=" ${firstLower(entity.name)}.id != null ">
		    	AND ${entity.pk} = ${r"#{"} ${firstLower(entity.name)}.id ${r"}"}
		    </if>        	
		<#if entity.attributes??>	
			<#list entity.attributes as att>
			<if test=" ${firstLower(entity.name)}.${att.name} != null ">
				<#if att.type.className == 'string' || att.type.className == 'String'>
		    	AND UPPER(${uppercase(att.tableFieldName!att.name)})  LIKE UPPER('%${r"${"} ${firstLower(entity.name)}.${att.name} ${r"}"}%')
		    	<#else>
		    	AND ${uppercase(att.tableFieldName!att.name)} = ${r"#{"} ${firstLower(entity.name)}.${att.name} ${r"}"}
		    	</#if>
		    </if> 
			</#list>
		</#if>									 
    </select>
    
    <insert id="salva" parameterType="${entity.name}">
    	<selectKey keyProperty="id" order="BEFORE" resultType="Integer" >
	    	SELECT ${uppercase(entity.sequence)}.NEXTVAL FROM DUAL
    	</selectKey>
    	  	INSERT INTO 
            ${uppercase(entity.tableName!entity.name)}
            (   
		<#if entity.attributes??>
				${entity.pk} 
		<#list entity.attributes as att>
	    		,${uppercase(att.tableFieldName!att.name)}  
		</#list>
		</#if>
		<#if entity.relationships??>		
			<#list entity.relationships as rel>
				<#if rel.fk?? &&  (rel.type == 'ManyToOne' ||  rel.type == 'OneToOne')>
				, ${uppercase(rel.fk)}
				</#if>												 
			</#list>
		</#if>
		
            )
            VALUES
            (
		<#if entity.attributes??>            
				  ${ r"#{"} id ${r"}" }
        <#list entity.attributes as att>
				, ${r"#{"} ${att.name}  , jdbcType = ${getMybatisJdbcType(att.type.className)}  ${r"}"}
		</#list>
		</#if>
		<#if entity.relationships??>				
			<#list entity.relationships as rel>
				<#if rel.fk?? &&  (rel.type == 'ManyToOne' ||  rel.type == 'OneToOne')>
				, ${r"#{"} ${rel.name}.id  , jdbcType = NUMERIC  ${r"}"}
				</#if>												 
			</#list>		
		</#if>												 
            )
	 </insert>   

	 <update id="atualiza" parameterType="${entity.name}">
		UPDATE  
        	${uppercase(entity.tableName!entity.name)}
 		SET 
 		<#if entity.attributes??>
 		    ${entity.pk} = ${r"#{"} id ${r"}"}
        <#list entity.attributes as att>
			<if test=" ${att.name} != null ">
			, ${uppercase(att.tableFieldName!att.name)} = ${r"#{"} ${att.name} ,  jdbcType = ${getMybatisJdbcType(att.type.className)} ${r"}" } 
			</if>	
		</#list>
		</#if>	
		<#if entity.relationships??>				
			<#list entity.relationships as rel>
				<#if rel.fk?? &&  (rel.type == 'ManyToOne' ||  rel.type == 'OneToOne')>
			<if test=" ${rel.name} != null ">				
			, ${uppercase(rel.fk)} = ${r"#{"} ${rel.name}.id ,  jdbcType = NUMERIC ${r"}" }
			</if>			
				</#if>
			</#list>		
		</#if>												 
		
 		WHERE 
            ${entity.pk} = ${r"#{"} id ${r"}"}
    </update>
    
    <delete id="deleta" parameterType="Integer" >
    	DELETE FROM ${uppercase(entity.tableName!entity.name)} 	WHERE ${entity.pk} = ${r"#{"} id ${r"}"}
    </delete>
</mapper>	
