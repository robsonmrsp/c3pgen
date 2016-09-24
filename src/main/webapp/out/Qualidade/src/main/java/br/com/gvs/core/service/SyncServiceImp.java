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
	CabineService cabineService;
	@Inject
	CargoService cargoService;
	@Inject
	ClienteService clienteService;
	@Inject
	CorService corService;
	@Inject
	EmbalagemService embalagemService;
	@Inject
	GeneradorService generadorService;
	@Inject
	LatadaService latadaService;
	@Inject
	PackingService packingService;
	@Inject
	SacolaService sacolaService;
	@Inject
	VariedadeService variedadeService;

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
		

		List<JsonCabine> cabines = dataBase.getCabines();
		for (JsonCabine jsonChangedByMe : cabines) {
			Cabine changedByMe = null;
			if (jsonChangedByMe.getId() != null) {
				changedByMe = cabineService.get(jsonChangedByMe.getId());
				Parser.apply(changedByMe, jsonChangedByMe);
			} else {
				changedByMe = Parser.toEntity(jsonChangedByMe);
			}
			
			if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.CREATE)) {
				cabineService.save(changedByMe);
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.UPDATE)) {
				Cabine changedByOther = cabineService.get(changedByMe.getId());
				if (changedByOther.getLastUpdateDatetime().isBefore(syncInfo.getLastSync())) {
					cabineService.update(changedByMe);
				} else {
					dtoDataBase.addConflict(jsonChangedByMe, Parser.toJson(changedByOther));
				}
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.DELETE)) {
				if(changedByMe != null)
					cabineService.delete(changedByMe.getId());
			}
		}
		List<Cabine> lastCabines = cabineService.last(syncInfo.getLastSync());
		dtoDataBase.setCabines(Parser.toListJsonCabines(lastCabines));
		

		List<JsonCargo> cargos = dataBase.getCargos();
		for (JsonCargo jsonChangedByMe : cargos) {
			Cargo changedByMe = null;
			if (jsonChangedByMe.getId() != null) {
				changedByMe = cargoService.get(jsonChangedByMe.getId());
				Parser.apply(changedByMe, jsonChangedByMe);
			} else {
				changedByMe = Parser.toEntity(jsonChangedByMe);
			}
			
			if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.CREATE)) {
				cargoService.save(changedByMe);
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.UPDATE)) {
				Cargo changedByOther = cargoService.get(changedByMe.getId());
				if (changedByOther.getLastUpdateDatetime().isBefore(syncInfo.getLastSync())) {
					cargoService.update(changedByMe);
				} else {
					dtoDataBase.addConflict(jsonChangedByMe, Parser.toJson(changedByOther));
				}
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.DELETE)) {
				if(changedByMe != null)
					cargoService.delete(changedByMe.getId());
			}
		}
		List<Cargo> lastCargos = cargoService.last(syncInfo.getLastSync());
		dtoDataBase.setCargos(Parser.toListJsonCargos(lastCargos));
		

		List<JsonCliente> clientes = dataBase.getClientes();
		for (JsonCliente jsonChangedByMe : clientes) {
			Cliente changedByMe = null;
			if (jsonChangedByMe.getId() != null) {
				changedByMe = clienteService.get(jsonChangedByMe.getId());
				Parser.apply(changedByMe, jsonChangedByMe);
			} else {
				changedByMe = Parser.toEntity(jsonChangedByMe);
			}
			
			if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.CREATE)) {
				clienteService.save(changedByMe);
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.UPDATE)) {
				Cliente changedByOther = clienteService.get(changedByMe.getId());
				if (changedByOther.getLastUpdateDatetime().isBefore(syncInfo.getLastSync())) {
					clienteService.update(changedByMe);
				} else {
					dtoDataBase.addConflict(jsonChangedByMe, Parser.toJson(changedByOther));
				}
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.DELETE)) {
				if(changedByMe != null)
					clienteService.delete(changedByMe.getId());
			}
		}
		List<Cliente> lastClientes = clienteService.last(syncInfo.getLastSync());
		dtoDataBase.setClientes(Parser.toListJsonClientes(lastClientes));
		

		List<JsonCor> cors = dataBase.getCors();
		for (JsonCor jsonChangedByMe : cors) {
			Cor changedByMe = null;
			if (jsonChangedByMe.getId() != null) {
				changedByMe = corService.get(jsonChangedByMe.getId());
				Parser.apply(changedByMe, jsonChangedByMe);
			} else {
				changedByMe = Parser.toEntity(jsonChangedByMe);
			}
			
			if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.CREATE)) {
				corService.save(changedByMe);
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.UPDATE)) {
				Cor changedByOther = corService.get(changedByMe.getId());
				if (changedByOther.getLastUpdateDatetime().isBefore(syncInfo.getLastSync())) {
					corService.update(changedByMe);
				} else {
					dtoDataBase.addConflict(jsonChangedByMe, Parser.toJson(changedByOther));
				}
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.DELETE)) {
				if(changedByMe != null)
					corService.delete(changedByMe.getId());
			}
		}
		List<Cor> lastCors = corService.last(syncInfo.getLastSync());
		dtoDataBase.setCors(Parser.toListJsonCors(lastCors));
		

		List<JsonEmbalagem> embalagems = dataBase.getEmbalagems();
		for (JsonEmbalagem jsonChangedByMe : embalagems) {
			Embalagem changedByMe = null;
			if (jsonChangedByMe.getId() != null) {
				changedByMe = embalagemService.get(jsonChangedByMe.getId());
				Parser.apply(changedByMe, jsonChangedByMe);
			} else {
				changedByMe = Parser.toEntity(jsonChangedByMe);
			}
			
			if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.CREATE)) {
				embalagemService.save(changedByMe);
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.UPDATE)) {
				Embalagem changedByOther = embalagemService.get(changedByMe.getId());
				if (changedByOther.getLastUpdateDatetime().isBefore(syncInfo.getLastSync())) {
					embalagemService.update(changedByMe);
				} else {
					dtoDataBase.addConflict(jsonChangedByMe, Parser.toJson(changedByOther));
				}
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.DELETE)) {
				if(changedByMe != null)
					embalagemService.delete(changedByMe.getId());
			}
		}
		List<Embalagem> lastEmbalagems = embalagemService.last(syncInfo.getLastSync());
		dtoDataBase.setEmbalagems(Parser.toListJsonEmbalagems(lastEmbalagems));
		

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
		

		List<JsonLatada> latadas = dataBase.getLatadas();
		for (JsonLatada jsonChangedByMe : latadas) {
			Latada changedByMe = null;
			if (jsonChangedByMe.getId() != null) {
				changedByMe = latadaService.get(jsonChangedByMe.getId());
				Parser.apply(changedByMe, jsonChangedByMe);
			} else {
				changedByMe = Parser.toEntity(jsonChangedByMe);
			}
			
			if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.CREATE)) {
				latadaService.save(changedByMe);
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.UPDATE)) {
				Latada changedByOther = latadaService.get(changedByMe.getId());
				if (changedByOther.getLastUpdateDatetime().isBefore(syncInfo.getLastSync())) {
					latadaService.update(changedByMe);
				} else {
					dtoDataBase.addConflict(jsonChangedByMe, Parser.toJson(changedByOther));
				}
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.DELETE)) {
				if(changedByMe != null)
					latadaService.delete(changedByMe.getId());
			}
		}
		List<Latada> lastLatadas = latadaService.last(syncInfo.getLastSync());
		dtoDataBase.setLatadas(Parser.toListJsonLatadas(lastLatadas));
		

		List<JsonPacking> packings = dataBase.getPackings();
		for (JsonPacking jsonChangedByMe : packings) {
			Packing changedByMe = null;
			if (jsonChangedByMe.getId() != null) {
				changedByMe = packingService.get(jsonChangedByMe.getId());
				Parser.apply(changedByMe, jsonChangedByMe);
			} else {
				changedByMe = Parser.toEntity(jsonChangedByMe);
			}
			
			if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.CREATE)) {
				packingService.save(changedByMe);
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.UPDATE)) {
				Packing changedByOther = packingService.get(changedByMe.getId());
				if (changedByOther.getLastUpdateDatetime().isBefore(syncInfo.getLastSync())) {
					packingService.update(changedByMe);
				} else {
					dtoDataBase.addConflict(jsonChangedByMe, Parser.toJson(changedByOther));
				}
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.DELETE)) {
				if(changedByMe != null)
					packingService.delete(changedByMe.getId());
			}
		}
		List<Packing> lastPackings = packingService.last(syncInfo.getLastSync());
		dtoDataBase.setPackings(Parser.toListJsonPackings(lastPackings));
		

		List<JsonSacola> sacolas = dataBase.getSacolas();
		for (JsonSacola jsonChangedByMe : sacolas) {
			Sacola changedByMe = null;
			if (jsonChangedByMe.getId() != null) {
				changedByMe = sacolaService.get(jsonChangedByMe.getId());
				Parser.apply(changedByMe, jsonChangedByMe);
			} else {
				changedByMe = Parser.toEntity(jsonChangedByMe);
			}
			
			if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.CREATE)) {
				sacolaService.save(changedByMe);
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.UPDATE)) {
				Sacola changedByOther = sacolaService.get(changedByMe.getId());
				if (changedByOther.getLastUpdateDatetime().isBefore(syncInfo.getLastSync())) {
					sacolaService.update(changedByMe);
				} else {
					dtoDataBase.addConflict(jsonChangedByMe, Parser.toJson(changedByOther));
				}
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.DELETE)) {
				if(changedByMe != null)
					sacolaService.delete(changedByMe.getId());
			}
		}
		List<Sacola> lastSacolas = sacolaService.last(syncInfo.getLastSync());
		dtoDataBase.setSacolas(Parser.toListJsonSacolas(lastSacolas));
		

		List<JsonVariedade> variedades = dataBase.getVariedades();
		for (JsonVariedade jsonChangedByMe : variedades) {
			Variedade changedByMe = null;
			if (jsonChangedByMe.getId() != null) {
				changedByMe = variedadeService.get(jsonChangedByMe.getId());
				Parser.apply(changedByMe, jsonChangedByMe);
			} else {
				changedByMe = Parser.toEntity(jsonChangedByMe);
			}
			
			if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.CREATE)) {
				variedadeService.save(changedByMe);
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.UPDATE)) {
				Variedade changedByOther = variedadeService.get(changedByMe.getId());
				if (changedByOther.getLastUpdateDatetime().isBefore(syncInfo.getLastSync())) {
					variedadeService.update(changedByMe);
				} else {
					dtoDataBase.addConflict(jsonChangedByMe, Parser.toJson(changedByOther));
				}
			} else if (jsonChangedByMe.getSyncOperation().equals(SyncOperation.DELETE)) {
				if(changedByMe != null)
					variedadeService.delete(changedByMe.getId());
			}
		}
		List<Variedade> lastVariedades = variedadeService.last(syncInfo.getLastSync());
		dtoDataBase.setVariedades(Parser.toListJsonVariedades(lastVariedades));
		
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
