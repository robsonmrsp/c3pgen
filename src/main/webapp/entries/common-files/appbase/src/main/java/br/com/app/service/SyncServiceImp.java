package ${application.corePackage}.service;


import java.util.List;
import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;

import ${application.corePackage}.model.SyncInfo;
import ${application.corePackage}.json.*;
import ${application.rootPackage}.json.*;
import ${application.rootPackage}.model.*;
import ${application.rootPackage}.service.*;


import ${application.corePackage}.persistence.DaoSyncInfo;
import ${application.corePackage}.json.DtoDataBase;
import ${application.rootPackage}.utils.Parser;

@Named
@Transactional
public class SyncServiceImp implements SyncService {
	<#list application.entities as entity>
	<#if entity.hasMobile == true>
	@Inject
	${entity.name}Service ${firstLower(entity.name)}Service;
	</#if>
	</#list>

	@Inject
	DaoSyncInfo daoSyncInfo;

	// TODO ainda está pendente o que fazer quando houver conflitos
	public DtoDataBase sync(DtoDataBase dataBase) {
		DtoDataBase dtoDataBase = new DtoDataBase();

		SyncInfo syncInfo = getLastSyncInfo(dataBase.getClienteId());
		<#list application.entities as entity>
		<#if entity.hasMobile == true>

		List<Json${entity.name}> ${firstLower(entity.name)}s = dataBase.get${entity.name}s();
		for (Json${entity.name} jsonChangedByMe : ${firstLower(entity.name)}s) {
			${entity.name} changedByMe = null;
			if (jsonChangedByMe.getId() != null) {
				changedByMe = ${firstLower(entity.name)}Service.get(jsonChangedByMe.getId());
				Parser.apply(changedByMe, jsonChangedByMe);
			} else {
				changedByMe = Parser.toEntity(jsonChangedByMe);
			}
			
			if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.CREATE)) {
				${firstLower(entity.name)}Service.save(changedByMe);
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.UPDATE)) {
				${entity.name} changedByOther = ${firstLower(entity.name)}Service.get(changedByMe.getId());
				if (changedByOther.getLastUpdateDatetime().isBefore(syncInfo.getLastSync())) {
					${firstLower(entity.name)}Service.update(changedByMe);
				} else {
					dtoDataBase.addConflict(jsonChangedByMe, Parser.toJson(changedByOther));
				}
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.DELETE)) {
				if(changedByMe != null)
					${firstLower(entity.name)}Service.delete(changedByMe.getId());
			}
		}
		List<${entity.name}> last${entity.name}s = ${firstLower(entity.name)}Service.last(syncInfo.getLastSync());
		dtoDataBase.set${entity.name}s(Parser.toListJson${entity.name}s(last${entity.name}s));
		
		</#if>
		</#list>
		syncInfo.setLastSync(LocalDateTime.now());
		daoSyncInfo.save(syncInfo);
		return dtoDataBase;
	}

	public SyncInfo getLastSyncInfo(String clienteId) {
		SyncInfo syncInfo = daoSyncInfo.getLast(clienteId);
		if (syncInfo == null) {
			syncInfo = new SyncInfo();
			syncInfo.setClienteId(clienteId);
			syncInfo.setLastSync(LocalDateTime.now().minusDays(10));
		}
		return syncInfo;
	}
}
