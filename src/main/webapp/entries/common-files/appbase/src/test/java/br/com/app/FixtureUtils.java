package ${application.rootPackage}.fixture;

import br.com.six2six.fixturefactory.Fixture;
import br.com.six2six.fixturefactory.Rule;

<#list application.entities as entity>
import ${application.rootPackage}.model.${entity.name};
</#list>
public class FixtureUtils {

	public static void init() {
		<#list application.entities as entity>
		Fixture.of(${entity.name}.class).addTemplate("novo", new Rule() {
			{
				<#if entity.attributes??>	
				<#list entity.attributes as att>
					<#if att.name != 'id'>
						<#if dataType(att.type.className) ==  "String" >
				add("${att.name}", regex("[a-z ]{5,15}"));
						</#if>
					</#if>
				</#list>
				</#if>
			}
		});
		</#list>

	}
}