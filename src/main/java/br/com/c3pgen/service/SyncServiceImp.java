package br.com.c3pgen.service;

import javax.inject.Inject;
import javax.inject.Named;

import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.c3pgen.json.DtoDataBase;
import br.com.c3pgen.model.SyncInfo;
import br.com.c3pgen.persistence.DaoSyncInfo;


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
