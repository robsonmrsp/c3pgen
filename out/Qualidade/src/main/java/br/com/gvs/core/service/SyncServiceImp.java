package br.com.gvs.core.service;

import java.util.List;


import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;

import br.com.gvs.core.model.SyncInfo;
import br.com.gvs.core.json.*;
import br.com.gvs.core.model.*;
import br.com.gvs.core.persistence.DaoSyncInfo;
import br.com.gvs.core.json.DtoDataBase;
import br.com.gvs.core.utils.Parser;


@Named
@Transactional
public class SyncServiceImp implements SyncService {

	@Inject
	DaoSyncInfo daoSyncInfo;

	// TODO ainda está pendente o que fazer quando houver conflitos
	public DtoDataBase sync(DtoDataBase dataBase) {
		DtoDataBase dtoDataBase = new DtoDataBase();

		SyncInfo syncInfo = getLastSyncInfo(dataBase.getClienteId());
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
