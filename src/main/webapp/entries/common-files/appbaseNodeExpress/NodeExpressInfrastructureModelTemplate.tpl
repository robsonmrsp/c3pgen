import Sequelize from 'sequelize';
import db from '../db';

// ######################################################################################
class ${entity.name}Model extends Sequelize.Model { }
${entity.name}Model.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        defaultValue: () => Math.floor(Math.random() * 10000),
    },
<#if entity.attributes??>	
    <#list entity.attributes as att>
    ${att.name}: {
        field: '${uppercase(att.tableFieldName!att.name)}',
        <#if dataType(att.type.className) ==  "LocalDateTime"  >
        type: Sequelize.DATE,
        <#elseif dataType(att.type.className) ==  "LocalDate"  >
        type: Sequelize.DATEONLY,
        <#elseif dataType(att.type.className) ==  "Double"  || dataType(att.type.className) ==  "Float" >
        type: Sequelize.DECIMAL,
        <#elseif dataType(att.type.className) ==  "Integer" || dataType(att.type.className) ==  "Long"  >
        type: Sequelize.INTEGER,
        <#elseif dataType(att.type.className) ==  "Boolean"  >
        type: Sequelize.BOOLEAN,
        <#else>
        type: Sequelize.STRING,
        </#if>
        allowNull: ${att.required ? string('false','true')},
    },
    </#list>
</#if>
}, {
    sequelize: db,
    modelName: '${entity.name}',
    tableName: '${uppercase(entity.name)}',
    createdAt: false,
    deletedAt: false,
    updatedAt: false,
});

// Generated ${.now}
export default ${entity.name}Model;
