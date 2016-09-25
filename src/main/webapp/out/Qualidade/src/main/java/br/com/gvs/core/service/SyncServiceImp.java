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
	ApontamentoQualidadePackingService apontamentoQualidadePackingService;
	@Inject
	BolsaoService bolsaoService;
	@Inject
	GeneradorService generadorService;

	@Inject
	DaoSyncInfo daoSyncInfo;

	// TODO ainda está pendente o que fazer quando houver conflitos
	public DtoDataBase sync(DtoDataBase dataBase) {
		DtoDataBase dtoDataBase = new DtoDataBase();

		SyncInfo syncInfo = getLastSyncInfo(dataBase.getClienteId());

		List<JsonApontamentoQualidadePacking> apontamentoQualidadePackings = dataBase.getApontamentoQualidadePackings();
		for (JsonApontamentoQualidadePacking jsonChangedByMe : apontamentoQualidadePackings) {
			ApontamentoQualidadePacking changedByMe = null;
			if (jsonChangedByMe.getId() != null) {
				changedByMe = apontamentoQualidadePackingService.get(jsonChangedByMe.getId());
				Parser.apply(changedByMe, jsonChangedByMe);
			} else {
				changedByMe = Parser.toEntity(jsonChangedByMe);
			}
			
			if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.CREATE)) {
				apontamentoQualidadePackingService.save(changedByMe);
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.UPDATE)) {
				ApontamentoQualidadePacking changedByOther = apontamentoQualidadePackingService.get(changedByMe.getId());
				if (changedByOther.getLastUpdateDatetime().isBefore(syncInfo.getLastSync())) {
					apontamentoQualidadePackingService.update(changedByMe);
				} else {
					dtoDataBase.addConflict(jsonChangedByMe, Parser.toJson(changedByOther));
				}
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.DELETE)) {
				if(changedByMe != null)
					apontamentoQualidadePackingService.delete(changedByMe.getId());
			}
		}
		List<ApontamentoQualidadePacking> lastApontamentoQualidadePackings = apontamentoQualidadePackingService.last(syncInfo.getLastSync());
		dtoDataBase.setApontamentoQualidadePackings(Parser.toListJsonApontamentoQualidadePackings(lastApontamentoQualidadePackings));
		

		List<JsonBolsao> bolsaos = dataBase.getBolsaos();
		for (JsonBolsao jsonChangedByMe : bolsaos) {
			Bolsao changedByMe = null;
			if (jsonChangedByMe.getId() != null) {
				changedByMe = bolsaoService.get(jsonChangedByMe.getId());
				Parser.apply(changedByMe, jsonChangedByMe);
			} else {
				changedByMe = Parser.toEntity(jsonChangedByMe);
			}
			
			if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.CREATE)) {
				bolsaoService.save(changedByMe);
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.UPDATE)) {
				Bolsao changedByOther = bolsaoService.get(changedByMe.getId());
				if (changedByOther.getLastUpdateDatetime().isBefore(syncInfo.getLastSync())) {
					bolsaoService.update(changedByMe);
				} else {
					dtoDataBase.addConflict(jsonChangedByMe, Parser.toJson(changedByOther));
				}
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.DELETE)) {
				if(changedByMe != null)
					bolsaoService.delete(changedByMe.getId());
			}
		}
		List<Bolsao> lastBolsaos = bolsaoService.last(syncInfo.getLastSync());
		dtoDataBase.setBolsaos(Parser.toListJsonBolsaos(lastBolsaos));
		

		List<JsonGenerador> generadors = dataBase.getGeneradors();
		for (JsonGenerador jsonChangedByMe : generadors) {
			Generador changedByMe = null;
			if (jsonChangedByMe.getId() != null) {
				changedByMe = generadorService.get(jsonChangedByMe.getId());
				Parser.apply(changedByMe, jsonChangedByMe);
			} else {
				changedByMe = Parser.toEntity(jsonChangedByMe);
			}
			
			if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.CREATE)) {
				generadorService.save(changedByMe);
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.UPDATE)) {
				Generador changedByOther = generadorService.get(changedByMe.getId());
				if (changedByOther.getLastUpdateDatetime().isBefore(syncInfo.getLastSync())) {
					generadorService.update(changedByMe);
				} else {
					dtoDataBase.addConflict(jsonChangedByMe, Parser.toJson(changedByOther));
				}
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.DELETE)) {
				if(changedByMe != null)
					generadorService.delete(changedByMe.getId());
			}
		}
		List<Generador> lastGeneradors = generadorService.last(syncInfo.getLastSync());
		dtoDataBase.setGeneradors(Parser.toListJsonGeneradors(lastGeneradors));
		
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
