/* generated by JSetup ${JSetupVersion} :  at ${.now} */
package ${package}.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;
<#if entity.uniqueConstraints>
import javax.persistence.UniqueConstraint;		
</#if>

<#if application.hasAudit()>
import org.hibernate.envers.Audited;
</#if>
import java.time.LocalDate;
import java.time.LocalDateTime;
	
import java.util.ArrayList;
import java.util.List;

<#if application.multitenancy && entity.multitenancy>
import ${corepackage}.model.AbstractMultitenantEntity;
<#else>
import ${corepackage}.model.AbstractEntity;
</#if>

@Entity
<#if application.hasAudit()>
@Audited
</#if>
<#if entity.uniqueConstraints >
	<#if dataBasePrefix??>
@Table(name = "${dataBasePrefix}_${uppercase(entity.tableName!entity.name)}", uniqueConstraints = {
	<#list entity.attributes as att >
		<#if att.unique>
			<#if application.multitenancy && entity.multitenancy>
		@UniqueConstraint(name = "${dataBasePrefix}_${uppercase(entity.tableName!entity.name)}_${uppercase(att.tableFieldName!att.name)}", columnNames = { "${uppercase(att.tableFieldName!att.name)}", "ID_TENANT" }),
			<#else>		
		@UniqueConstraint(name = "${dataBasePrefix}_${uppercase(entity.tableName!entity.name)}_${uppercase(att.tableFieldName!att.name)}", columnNames = { "${uppercase(att.tableFieldName!att.name)}" }), 
			</#if >
		</#if >
	</#list>		
})
	<#else>
@Table(name = "${uppercase(entity.tableName!entity.name)}", uniqueConstraints = {
	<#list entity.attributes as att >
		<#if att.unique>
			<#if application.multitenancy && entity.multitenancy>
		@UniqueConstraint(name = "${uppercase(entity.tableName!entity.name)}_${uppercase(att.tableFieldName!att.name)}", columnNames = { "${uppercase(att.tableFieldName!att.name)}",  "ID_TENANT"}), 
			<#else >
		@UniqueConstraint(name = "${uppercase(entity.tableName!entity.name)}_${uppercase(att.tableFieldName!att.name)}", columnNames = { "${uppercase(att.tableFieldName!att.name)}" }), 
			</#if >
		</#if >
	</#list>		
})
	</#if>
<#else>
	<#if dataBasePrefix??>
@Table(name = "${dataBasePrefix}_${uppercase(entity.tableName!entity.name)}")
	<#else>
@Table(name = "${uppercase(entity.tableName!entity.name)}")
	</#if>
</#if>
<#if application.multitenancy && entity.multitenancy>
public class ${entity.name} extends AbstractMultitenantEntity{
<#else>	
public class ${entity.name} extends AbstractEntity{
</#if>
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)	
	private Integer id;
	
	<#if entity.attributes??>	
	<#list entity.attributes as att>
		<#if att.name != 'id'>
		<#if dataType(att.type.className) ==  "LocalDateTime" >
	@Column(name = "${uppercase(att.tableFieldName!att.name)}")
	private ${dataType(att.type.className)} ${att.name};
	
		<#elseif  dataType(att.type.className) ==  "LocalDate" >
	@Column(name = "${uppercase(att.tableFieldName!att.name)}")
	private ${dataType(att.type.className)} ${att.name};  
				
		<#elseif  dataType(att.type.className) ==  "String" >
		<#if att.viewApproach.type == 'textarea'>
	@Column(name = "${uppercase(att.tableFieldName!att.name)}" , columnDefinition="varchar" ) 
		<#else>
	@Column(name = "${uppercase(att.tableFieldName!att.name)}" )
		</#if>
	private String ${att.name};		
	
		<#else>
	@Column(name = "${uppercase(att.tableFieldName!att.name)}")
	private ${dataType(att.type.className)} ${att.name};  	
			
		</#if>  
		</#if>
	</#list>
	</#if>
	<#if entity.relationships??>	
	<#list entity.relationships as rel>
		<#if rel.type == 'OneToMany'>
			<#if rel.origin && rel.ownerName?has_content>
	@OneToMany(mappedBy="${rel.ownerName}")
			<#else>
	@OneToMany()
			</#if>
	private List<${firstUpper(rel.model)}> ${(rel.name)};	
		
		<#elseif rel.type == 'ManyToOne'>
	@ManyToOne
	@JoinColumn(name = "ID_${uppercase(rel.name)}")
	private ${firstUpper(rel.model)} ${firstLower(rel.name)};
			
		<#elseif rel.type == 'ManyToMany'>			
			<#if rel.origin > 
    @ManyToMany(mappedBy="${rel.targetName}")
        		<#if rel.viewApproach?? >
				</#if>
    private List<${firstUpper(rel.model)}> ${(rel.name)!firstLower(rel.model)};
			<#else>
    @ManyToMany
				<#if dataBasePrefix??>
    @JoinTable(name="${dataBasePrefix}_${uppercase(entity.name)}_${uppercase(rel.model)}", joinColumns = @JoinColumn(name = "ID_${uppercase(entity.name)}", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "ID_${uppercase(rel.model)}", referencedColumnName = "ID") )
    private List<${firstUpper(rel.model)}> ${(rel.name)};
    
    			<#else>
    @JoinTable(name="${uppercase(entity.name)}_${uppercase(rel.model)}", joinColumns = @JoinColumn(name = "ID_${uppercase(entity.name)}", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "ID_${uppercase(rel.model)}", referencedColumnName = "ID") )
    private List<${firstUpper(rel.model)}> ${(rel.name)};
    
				</#if>		
			</#if>		
		<#elseif rel.type == 'OneToOne'>
			<#if rel.origin >
	@OneToOne(optional=false, mappedBy="${rel.targetName}")
	@JoinColumn(name = "ID_${uppercase(rel.name)}")
	private ${firstUpper(rel.model)} ${firstLower(rel.name)!firstLower(rel.model)};
	
			<#else>
	@OneToOne
	@JoinColumn(name = "ID_${uppercase(rel.name)}")
	private ${firstUpper(rel.model)} ${firstLower(rel.name)!firstLower(rel.model)};
	
			</#if>
		</#if>
	</#list>
	</#if>
		
	public  ${entity.name}() {
		
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	<#list entity.attributes as att>
		<#if att.name != 'id'>
	public ${dataType(att.type.className)} get${firstUpper(att.name)}() {
		return ${att.name};
	}

	public void set${firstUpper(att.name)}(${dataType(att.type.className)} ${att.name}) {
		this.${att.name} = ${att.name};
	}
		</#if>
	</#list>
	<#if entity.relationships??>		
	<#list entity.relationships as rel>
		<#if rel.type == 'OneToMany'>
	public void set${firstUpper(rel.name)}(List<${firstUpper(rel.model)}> ${rel.name}){
		this.${rel.name} = ${rel.name};
	}
	
	public List<${firstUpper(rel.model)}>  get${firstUpper(rel.name)}() {
		if(this.${firstLower(rel.name)} == null){
			set${firstUpper(rel.name)}(new ArrayList<${firstUpper(rel.model)}>());
		}
		return this.${(rel.name)};
	}
		
	public boolean add${firstUpper(rel.name)}(${firstUpper(rel.model)} ${firstLower(rel.model)}){
		<#if rel.uniDirecional == false>
		<#if rel.ownerName?has_content>
		${firstLower(rel.model)}.set${firstUpper(rel.ownerName)}(this);
		</#if>
		</#if>
		return get${firstUpper(rel.name)}().add(${firstLower(rel.model)});
	}
	
	public boolean remove${firstUpper(rel.name)}(${firstUpper(rel.model)} ${firstLower(rel.model)}){
		<#if rel.uniDirecional == false >
		<#if rel.ownerName?has_content>
		${firstLower(rel.model)}.set${firstUpper(rel.ownerName)}(null);
		</#if>
		</#if>
		return get${firstUpper(rel.name)}().remove(${firstLower(rel.model)});
	}
	
		<#elseif rel.type == 'ManyToOne'>
	public ${firstUpper(rel.model)} get${firstUpper(rel.name)}() {
		return ${firstLower(rel.name)};
	}
	
	public void set${firstUpper(rel.name)}(${firstUpper(rel.model)} ${firstLower(rel.model)}) {
		this.${firstLower(rel.name)} = ${firstLower(rel.model)};
	}
	
		<#elseif rel.type == 'ManyToMany'>
	public void set${firstUpper(rel.name)}(List<${firstUpper(rel.model)}> ${rel.name}){
		this.${(rel.name)} = ${rel.name};
	}
	
	public List<${firstUpper(rel.model)}>  get${firstUpper(rel.name)}() {
		if(this.${firstLower(rel.name)} == null){
			set${firstUpper(rel.name)}(new ArrayList<${firstUpper(rel.model)}>());
		}
		return this.${(rel.name)}; 
	}
		
	public boolean add${firstUpper(rel.name)}(${firstUpper(rel.model)} ${firstLower(rel.model)}){	
		return get${firstUpper(rel.name)}().add(${firstLower(rel.model)});
	}
	
	public boolean remove${firstUpper(rel.name)}(${firstUpper(rel.model)} ${firstLower(rel.model)}){	
		return get${firstUpper(rel.name)}().remove(${firstLower(rel.model)});
	}
		<#elseif rel.type == 'ManyToOne'>
	public  ${firstUpper(rel.name)} get${firstUpper(rel.name)}() {
		return ${firstLower(rel.name)}
	}
	
	public void set${firstUpper(rel.name)}(${firstUpper(rel.model)} ${firstLower(rel.model)}) {
		this.${firstLower(rel.name)} = ${firstLower(rel.model)};
	}
		<#elseif rel.type == 'OneToOne'>
	public ${firstUpper(rel.model)} get${firstUpper(rel.name)}() {
		return ${firstLower(rel.name)};
	}
	
	public void set${firstUpper(rel.name)}(${firstUpper(rel.model)} ${firstLower(rel.model)}) {
		this.${firstLower(rel.name)} = ${firstLower(rel.model)};
	}
		</#if>
	</#list>
	</#if>
	
}
//generated by JSetup ${JSetupVersion} :  at ${.now}