package br.com.gvs.core.utils;

import java.util.ArrayList;

import java.util.List;

import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import br.com.gvs.qualidade.json.JsonAnexo;
import br.com.gvs.qualidade.model.Anexo;
import br.com.gvs.qualidade.json.JsonApontamentoQualidadePacking;
import br.com.gvs.qualidade.model.ApontamentoQualidadePacking;
import br.com.gvs.qualidade.json.JsonBolsao;
import br.com.gvs.qualidade.model.Bolsao;
import br.com.gvs.qualidade.json.JsonCabine;
import br.com.gvs.qualidade.model.Cabine;
import br.com.gvs.qualidade.json.JsonCargo;
import br.com.gvs.qualidade.model.Cargo;
import br.com.gvs.qualidade.json.JsonCbo;
import br.com.gvs.qualidade.model.Cbo;
import br.com.gvs.qualidade.json.JsonClient;
import br.com.gvs.qualidade.model.Client;
import br.com.gvs.qualidade.json.JsonCliente;
import br.com.gvs.qualidade.model.Cliente;
import br.com.gvs.qualidade.json.JsonCor;
import br.com.gvs.qualidade.model.Cor;
import br.com.gvs.qualidade.json.JsonDepartamento;
import br.com.gvs.qualidade.model.Departamento;
import br.com.gvs.qualidade.json.JsonEmbalagem;
import br.com.gvs.qualidade.model.Embalagem;
import br.com.gvs.qualidade.json.JsonFuncao;
import br.com.gvs.qualidade.model.Funcao;
import br.com.gvs.qualidade.json.JsonFuncionario;
import br.com.gvs.qualidade.model.Funcionario;
import br.com.gvs.qualidade.json.JsonGenerador;
import br.com.gvs.qualidade.model.Generador;
import br.com.gvs.qualidade.json.JsonLatada;
import br.com.gvs.qualidade.model.Latada;
import br.com.gvs.qualidade.json.JsonPacking;
import br.com.gvs.qualidade.model.Packing;
import br.com.gvs.qualidade.json.JsonSacola;
import br.com.gvs.qualidade.model.Sacola;
import br.com.gvs.qualidade.json.JsonVariedade;
import br.com.gvs.qualidade.model.Variedade;
import br.com.gvs.qualidade.json.JsonBairro;
import br.com.gvs.qualidade.model.Bairro;
import br.com.gvs.qualidade.json.JsonCep;
import br.com.gvs.qualidade.model.Cep;
import br.com.gvs.qualidade.json.JsonCidade;
import br.com.gvs.qualidade.model.Cidade;
import br.com.gvs.qualidade.json.JsonEndereco;
import br.com.gvs.qualidade.model.Endereco;
import br.com.gvs.qualidade.json.JsonEstado;
import br.com.gvs.qualidade.model.Estado;
import br.com.gvs.qualidade.json.JsonPais;
import br.com.gvs.qualidade.model.Pais;
import br.com.gvs.qualidade.json.JsonItem;
import br.com.gvs.qualidade.model.Item;
import br.com.gvs.qualidade.json.JsonItemType;
import br.com.gvs.qualidade.model.ItemType;
import br.com.gvs.qualidade.json.JsonOperation;
import br.com.gvs.qualidade.model.Operation;
import br.com.gvs.qualidade.json.JsonPermission;
import br.com.gvs.qualidade.model.Permission;
import br.com.gvs.qualidade.json.JsonRole;
import br.com.gvs.qualidade.model.Role;
import br.com.gvs.qualidade.json.JsonSession;
import br.com.gvs.qualidade.model.Session;
import br.com.gvs.qualidade.json.JsonUser;
import br.com.gvs.qualidade.model.User;
import br.com.gvs.qualidade.model.User;
import br.com.gvs.qualidade.json.JsonUser;

//saporra
public class Parser {

	private static final DateTimeFormatter DATE_TIME_FORMAT = DateTimeFormat.forPattern("dd/MM/yyyy HH:mm");
	private static final DateTimeFormatter DATE_FORMAT = DateTimeFormat.forPattern("dd/MM/yyyy");
	private static final DateTimeFormatter HOUR_FORMAT = DateTimeFormat.forPattern("HH:mm");

	public static String getHourAsString(LocalDateTime date) {
		String format = "";
		try {
			format = HOUR_FORMAT.print(date);
		} catch (Exception e) {
			format = "00:00";
		}
		return format;
	}

	public static String getDateTimeAsString(LocalDateTime date) {
		String format = "";
		try {
			format = DATE_TIME_FORMAT.print(date);
		} catch (Exception e) {
			format = DATE_TIME_FORMAT.print(new DateTime());
		}
		return format;
	}

	public static String getDateAsString(LocalDateTime date) {
		String format = "";
		try {
			format = DATE_FORMAT.print(date);
		} catch (Exception e) {
			format = DATE_FORMAT.print(new DateTime());
		}
		return format;
	}

	//
	private static DateTime getHour(String date) {
		if (!date.isEmpty()) {
			try {
				return HOUR_FORMAT.parseDateTime(date);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	private static LocalDateTime getDate(String date) {
		if (!date.isEmpty()) {
			try {
				LocalDateTime dateTime = DATE_FORMAT.parseLocalDateTime(date);
				return dateTime;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	private static LocalDateTime getDateTime(String date) {
		if (!date.isEmpty()) {
			try {
				LocalDateTime dateTime = DATE_TIME_FORMAT.parseLocalDateTime(date);
				return dateTime;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	
	//converte de entidade para json --------------------
	private static JsonAnexo toBasicJson(Anexo anexo) {
		JsonAnexo jsonAnexo = new JsonAnexo();
		applyBasicJsonValues(jsonAnexo, anexo);
		return jsonAnexo;
	}
	
	private static Anexo toBasicEntity(JsonAnexo jsonAnexo) {
		Anexo anexo = new Anexo();
		applyBasicEntityValues(anexo, jsonAnexo);
		return anexo;
	}
	
	private static void applyBasicJsonValues(JsonAnexo jsonAnexo, Anexo anexo) {
		jsonAnexo.setId(anexo.getId());
	    jsonAnexo.setNome(anexo.getNome());
	    jsonAnexo.setConteudo(anexo.getConteudo());
	}	
	private static void applyBasicEntityValues(Anexo anexo, JsonAnexo jsonAnexo) {
		anexo.setId(jsonAnexo.getId());
		anexo.setNome(jsonAnexo.getNome());
		anexo.setConteudo(jsonAnexo.getConteudo());
	}	
	
	public static JsonAnexo toJson(Anexo anexo) {
		JsonAnexo jsonAnexo = new JsonAnexo();

		applyBasicJsonValues(jsonAnexo, anexo);

		ApontamentoQualidadePacking apontamentoQualidadePacking_ = anexo.getApontamentoQualidadePacking();
		if (apontamentoQualidadePacking_ != null) {
			jsonAnexo.setApontamentoQualidadePacking(toJson(apontamentoQualidadePacking_));
		}
		return jsonAnexo;
	}


	public static Anexo apply(Anexo anexo, JsonAnexo jsonAnexo) {
	
		if(anexo ==  null)
			anexo = new Anexo();
		
		applyBasicEntityValues(anexo, jsonAnexo) ;

		JsonApontamentoQualidadePacking apontamentoQualidadePacking_ = jsonAnexo.getApontamentoQualidadePacking();
		if (apontamentoQualidadePacking_ != null) {
			anexo.setApontamentoQualidadePacking(toEntity(apontamentoQualidadePacking_));
		}	
		return anexo;
		
	}		
	public static Anexo toEntity(JsonAnexo jsonAnexo) {
		Anexo anexo = new Anexo();
		
		return apply(anexo, jsonAnexo);
	}		
	
	public static List<JsonAnexo> toListJsonAnexos(List<Anexo> all) {
		List<JsonAnexo> jsonAnexos = new ArrayList<JsonAnexo>();
		for (Anexo anexo : all) {
			jsonAnexos.add(toJson(anexo));
		}
		return jsonAnexos;
	}
	//converte de entidade para json --------------------
	private static JsonApontamentoQualidadePacking toBasicJson(ApontamentoQualidadePacking apontamentoQualidadePacking) {
		JsonApontamentoQualidadePacking jsonApontamentoQualidadePacking = new JsonApontamentoQualidadePacking();
		applyBasicJsonValues(jsonApontamentoQualidadePacking, apontamentoQualidadePacking);
		return jsonApontamentoQualidadePacking;
	}
	
	private static ApontamentoQualidadePacking toBasicEntity(JsonApontamentoQualidadePacking jsonApontamentoQualidadePacking) {
		ApontamentoQualidadePacking apontamentoQualidadePacking = new ApontamentoQualidadePacking();
		applyBasicEntityValues(apontamentoQualidadePacking, jsonApontamentoQualidadePacking);
		return apontamentoQualidadePacking;
	}
	
	private static void applyBasicJsonValues(JsonApontamentoQualidadePacking jsonApontamentoQualidadePacking, ApontamentoQualidadePacking apontamentoQualidadePacking) {
		jsonApontamentoQualidadePacking.setId(apontamentoQualidadePacking.getId());
	    jsonApontamentoQualidadePacking.setAparencia(apontamentoQualidadePacking.getAparencia());
	    jsonApontamentoQualidadePacking.setDiametroMinimo(apontamentoQualidadePacking.getDiametroMinimo());
	    jsonApontamentoQualidadePacking.setDiametroMaximo(apontamentoQualidadePacking.getDiametroMaximo());
	    jsonApontamentoQualidadePacking.setDiametroMedio(apontamentoQualidadePacking.getDiametroMedio());
	    jsonApontamentoQualidadePacking.setBrixMinimo(apontamentoQualidadePacking.getBrixMinimo());
	    jsonApontamentoQualidadePacking.setBrixMaximo(apontamentoQualidadePacking.getBrixMaximo());
	    jsonApontamentoQualidadePacking.setBrixMedio(apontamentoQualidadePacking.getBrixMedio());
	    jsonApontamentoQualidadePacking.setPesoCachoMinimo(apontamentoQualidadePacking.getPesoCachoMinimo());
	    jsonApontamentoQualidadePacking.setPesoCachoMaximo(apontamentoQualidadePacking.getPesoCachoMaximo());
	    jsonApontamentoQualidadePacking.setPesoSacolaMinimo(apontamentoQualidadePacking.getPesoSacolaMinimo());
	    jsonApontamentoQualidadePacking.setPesoSacolaMaximo(apontamentoQualidadePacking.getPesoSacolaMaximo());
	    jsonApontamentoQualidadePacking.setNumeroCachoSacola(apontamentoQualidadePacking.getNumeroCachoSacola());
	    jsonApontamentoQualidadePacking.setNumeroSacola(apontamentoQualidadePacking.getNumeroSacola());
	    jsonApontamentoQualidadePacking.setPesoCumbucaMinimo(apontamentoQualidadePacking.getPesoCumbucaMinimo());
	    jsonApontamentoQualidadePacking.setPesoCumbucaMaximo(apontamentoQualidadePacking.getPesoCumbucaMaximo());
	    jsonApontamentoQualidadePacking.setNumeroCachosCumbuca(apontamentoQualidadePacking.getNumeroCachosCumbuca());
	    jsonApontamentoQualidadePacking.setNumeroCumbucas(apontamentoQualidadePacking.getNumeroCumbucas());
	    jsonApontamentoQualidadePacking.setPesoBruto(apontamentoQualidadePacking.getPesoBruto());
	    jsonApontamentoQualidadePacking.setPesoLiquido(apontamentoQualidadePacking.getPesoLiquido());
	    jsonApontamentoQualidadePacking.setCorposEstranhos(apontamentoQualidadePacking.getCorposEstranhos());
	    jsonApontamentoQualidadePacking.setBagasAquosas(apontamentoQualidadePacking.getBagasAquosas());
	    jsonApontamentoQualidadePacking.setBagasCristalinas(apontamentoQualidadePacking.getBagasCristalinas());
	    jsonApontamentoQualidadePacking.setFirmeza(apontamentoQualidadePacking.getFirmeza());
	    jsonApontamentoQualidadePacking.setDanos(apontamentoQualidadePacking.getDanos());
	    jsonApontamentoQualidadePacking.setPragas(apontamentoQualidadePacking.getPragas());
	    jsonApontamentoQualidadePacking.setDoencas(apontamentoQualidadePacking.getDoencas());
	    jsonApontamentoQualidadePacking.setAparenciaEngaco(apontamentoQualidadePacking.getAparenciaEngaco());
	    jsonApontamentoQualidadePacking.setDesgrana(apontamentoQualidadePacking.getDesgrana());
	    jsonApontamentoQualidadePacking.setPodridao(apontamentoQualidadePacking.getPodridao());
	    jsonApontamentoQualidadePacking.setCicatrizes(apontamentoQualidadePacking.getCicatrizes());
	    jsonApontamentoQualidadePacking.setRachaduras(apontamentoQualidadePacking.getRachaduras());
	    jsonApontamentoQualidadePacking.setRachadurasCampo(apontamentoQualidadePacking.getRachadurasCampo());
	    jsonApontamentoQualidadePacking.setAmolecimento(apontamentoQualidadePacking.getAmolecimento());
	    jsonApontamentoQualidadePacking.setObservacao(apontamentoQualidadePacking.getObservacao());
	    jsonApontamentoQualidadePacking.setDataHora(DateUtil.localDateTimeAsString(apontamentoQualidadePacking.getDataHora()));
	}	
	private static void applyBasicEntityValues(ApontamentoQualidadePacking apontamentoQualidadePacking, JsonApontamentoQualidadePacking jsonApontamentoQualidadePacking) {
		apontamentoQualidadePacking.setId(jsonApontamentoQualidadePacking.getId());
		apontamentoQualidadePacking.setAparencia(jsonApontamentoQualidadePacking.getAparencia());
		apontamentoQualidadePacking.setDiametroMinimo(jsonApontamentoQualidadePacking.getDiametroMinimo());
		apontamentoQualidadePacking.setDiametroMaximo(jsonApontamentoQualidadePacking.getDiametroMaximo());
		apontamentoQualidadePacking.setDiametroMedio(jsonApontamentoQualidadePacking.getDiametroMedio());
		apontamentoQualidadePacking.setBrixMinimo(jsonApontamentoQualidadePacking.getBrixMinimo());
		apontamentoQualidadePacking.setBrixMaximo(jsonApontamentoQualidadePacking.getBrixMaximo());
		apontamentoQualidadePacking.setBrixMedio(jsonApontamentoQualidadePacking.getBrixMedio());
		apontamentoQualidadePacking.setPesoCachoMinimo(jsonApontamentoQualidadePacking.getPesoCachoMinimo());
		apontamentoQualidadePacking.setPesoCachoMaximo(jsonApontamentoQualidadePacking.getPesoCachoMaximo());
		apontamentoQualidadePacking.setPesoSacolaMinimo(jsonApontamentoQualidadePacking.getPesoSacolaMinimo());
		apontamentoQualidadePacking.setPesoSacolaMaximo(jsonApontamentoQualidadePacking.getPesoSacolaMaximo());
		apontamentoQualidadePacking.setNumeroCachoSacola(jsonApontamentoQualidadePacking.getNumeroCachoSacola());
		apontamentoQualidadePacking.setNumeroSacola(jsonApontamentoQualidadePacking.getNumeroSacola());
		apontamentoQualidadePacking.setPesoCumbucaMinimo(jsonApontamentoQualidadePacking.getPesoCumbucaMinimo());
		apontamentoQualidadePacking.setPesoCumbucaMaximo(jsonApontamentoQualidadePacking.getPesoCumbucaMaximo());
		apontamentoQualidadePacking.setNumeroCachosCumbuca(jsonApontamentoQualidadePacking.getNumeroCachosCumbuca());
		apontamentoQualidadePacking.setNumeroCumbucas(jsonApontamentoQualidadePacking.getNumeroCumbucas());
		apontamentoQualidadePacking.setPesoBruto(jsonApontamentoQualidadePacking.getPesoBruto());
		apontamentoQualidadePacking.setPesoLiquido(jsonApontamentoQualidadePacking.getPesoLiquido());
		apontamentoQualidadePacking.setCorposEstranhos(jsonApontamentoQualidadePacking.getCorposEstranhos());
		apontamentoQualidadePacking.setBagasAquosas(jsonApontamentoQualidadePacking.getBagasAquosas());
		apontamentoQualidadePacking.setBagasCristalinas(jsonApontamentoQualidadePacking.getBagasCristalinas());
		apontamentoQualidadePacking.setFirmeza(jsonApontamentoQualidadePacking.getFirmeza());
		apontamentoQualidadePacking.setDanos(jsonApontamentoQualidadePacking.getDanos());
		apontamentoQualidadePacking.setPragas(jsonApontamentoQualidadePacking.getPragas());
		apontamentoQualidadePacking.setDoencas(jsonApontamentoQualidadePacking.getDoencas());
		apontamentoQualidadePacking.setAparenciaEngaco(jsonApontamentoQualidadePacking.getAparenciaEngaco());
		apontamentoQualidadePacking.setDesgrana(jsonApontamentoQualidadePacking.getDesgrana());
		apontamentoQualidadePacking.setPodridao(jsonApontamentoQualidadePacking.getPodridao());
		apontamentoQualidadePacking.setCicatrizes(jsonApontamentoQualidadePacking.getCicatrizes());
		apontamentoQualidadePacking.setRachaduras(jsonApontamentoQualidadePacking.getRachaduras());
		apontamentoQualidadePacking.setRachadurasCampo(jsonApontamentoQualidadePacking.getRachadurasCampo());
		apontamentoQualidadePacking.setAmolecimento(jsonApontamentoQualidadePacking.getAmolecimento());
		apontamentoQualidadePacking.setObservacao(jsonApontamentoQualidadePacking.getObservacao());
	    apontamentoQualidadePacking.setDataHora(DateUtil.stringAsLocalDateTime(jsonApontamentoQualidadePacking.getDataHora()));
	}	
	
	public static JsonApontamentoQualidadePacking toJson(ApontamentoQualidadePacking apontamentoQualidadePacking) {
		JsonApontamentoQualidadePacking jsonApontamentoQualidadePacking = new JsonApontamentoQualidadePacking();

		applyBasicJsonValues(jsonApontamentoQualidadePacking, apontamentoQualidadePacking);

		List<Anexo> listAnexos = apontamentoQualidadePacking.getAnexos();
		if (listAnexos != null) {
			for (Anexo loopAnexo : listAnexos) {
				jsonApontamentoQualidadePacking.getAnexos().add(toBasicJson(loopAnexo));
			}
		}
		Bolsao bolsao_ = apontamentoQualidadePacking.getBolsao();
		if (bolsao_ != null) {
			jsonApontamentoQualidadePacking.setBolsao(toJson(bolsao_));
		}
		Generador generador_ = apontamentoQualidadePacking.getGenerador();
		if (generador_ != null) {
			jsonApontamentoQualidadePacking.setGenerador(toJson(generador_));
		}
		Cor cor_ = apontamentoQualidadePacking.getCor();
		if (cor_ != null) {
			jsonApontamentoQualidadePacking.setCor(toJson(cor_));
		}
		Cargo cargo_ = apontamentoQualidadePacking.getCargo();
		if (cargo_ != null) {
			jsonApontamentoQualidadePacking.setCargo(toJson(cargo_));
		}
		Variedade variedade_ = apontamentoQualidadePacking.getVariedade();
		if (variedade_ != null) {
			jsonApontamentoQualidadePacking.setVariedade(toJson(variedade_));
		}
		Latada latada_ = apontamentoQualidadePacking.getLatada();
		if (latada_ != null) {
			jsonApontamentoQualidadePacking.setLatada(toJson(latada_));
		}
		Embalagem embalagem_ = apontamentoQualidadePacking.getEmbalagem();
		if (embalagem_ != null) {
			jsonApontamentoQualidadePacking.setEmbalagem(toJson(embalagem_));
		}
		Cabine cabine_ = apontamentoQualidadePacking.getCabine();
		if (cabine_ != null) {
			jsonApontamentoQualidadePacking.setCabine(toJson(cabine_));
		}
		Sacola sacola_ = apontamentoQualidadePacking.getSacola();
		if (sacola_ != null) {
			jsonApontamentoQualidadePacking.setSacola(toJson(sacola_));
		}
		Cliente cliente_ = apontamentoQualidadePacking.getCliente();
		if (cliente_ != null) {
			jsonApontamentoQualidadePacking.setCliente(toJson(cliente_));
		}
		Packing packing_ = apontamentoQualidadePacking.getPacking();
		if (packing_ != null) {
			jsonApontamentoQualidadePacking.setPacking(toJson(packing_));
		}
		return jsonApontamentoQualidadePacking;
	}


	public static ApontamentoQualidadePacking apply(ApontamentoQualidadePacking apontamentoQualidadePacking, JsonApontamentoQualidadePacking jsonApontamentoQualidadePacking) {
	
		if(apontamentoQualidadePacking ==  null)
			apontamentoQualidadePacking = new ApontamentoQualidadePacking();
		
		applyBasicEntityValues(apontamentoQualidadePacking, jsonApontamentoQualidadePacking) ;

		JsonBolsao bolsao_ = jsonApontamentoQualidadePacking.getBolsao();
		if (bolsao_ != null) {
			apontamentoQualidadePacking.setBolsao(toEntity(bolsao_));
		}	
		JsonGenerador generador_ = jsonApontamentoQualidadePacking.getGenerador();
		if (generador_ != null) {
			apontamentoQualidadePacking.setGenerador(toEntity(generador_));
		}	
		JsonCor cor_ = jsonApontamentoQualidadePacking.getCor();
		if (cor_ != null) {
			apontamentoQualidadePacking.setCor(toEntity(cor_));
		}	
		JsonCargo cargo_ = jsonApontamentoQualidadePacking.getCargo();
		if (cargo_ != null) {
			apontamentoQualidadePacking.setCargo(toEntity(cargo_));
		}	
		JsonVariedade variedade_ = jsonApontamentoQualidadePacking.getVariedade();
		if (variedade_ != null) {
			apontamentoQualidadePacking.setVariedade(toEntity(variedade_));
		}	
		JsonLatada latada_ = jsonApontamentoQualidadePacking.getLatada();
		if (latada_ != null) {
			apontamentoQualidadePacking.setLatada(toEntity(latada_));
		}	
		JsonEmbalagem embalagem_ = jsonApontamentoQualidadePacking.getEmbalagem();
		if (embalagem_ != null) {
			apontamentoQualidadePacking.setEmbalagem(toEntity(embalagem_));
		}	
		JsonCabine cabine_ = jsonApontamentoQualidadePacking.getCabine();
		if (cabine_ != null) {
			apontamentoQualidadePacking.setCabine(toEntity(cabine_));
		}	
		JsonSacola sacola_ = jsonApontamentoQualidadePacking.getSacola();
		if (sacola_ != null) {
			apontamentoQualidadePacking.setSacola(toEntity(sacola_));
		}	
		JsonCliente cliente_ = jsonApontamentoQualidadePacking.getCliente();
		if (cliente_ != null) {
			apontamentoQualidadePacking.setCliente(toEntity(cliente_));
		}	
		JsonPacking packing_ = jsonApontamentoQualidadePacking.getPacking();
		if (packing_ != null) {
			apontamentoQualidadePacking.setPacking(toEntity(packing_));
		}	
		return apontamentoQualidadePacking;
		
	}		
	public static ApontamentoQualidadePacking toEntity(JsonApontamentoQualidadePacking jsonApontamentoQualidadePacking) {
		ApontamentoQualidadePacking apontamentoQualidadePacking = new ApontamentoQualidadePacking();
		
		return apply(apontamentoQualidadePacking, jsonApontamentoQualidadePacking);
	}		
	
	public static List<JsonApontamentoQualidadePacking> toListJsonApontamentoQualidadePackings(List<ApontamentoQualidadePacking> all) {
		List<JsonApontamentoQualidadePacking> jsonApontamentoQualidadePackings = new ArrayList<JsonApontamentoQualidadePacking>();
		for (ApontamentoQualidadePacking apontamentoQualidadePacking : all) {
			jsonApontamentoQualidadePackings.add(toJson(apontamentoQualidadePacking));
		}
		return jsonApontamentoQualidadePackings;
	}
	//converte de entidade para json --------------------
	private static JsonBolsao toBasicJson(Bolsao bolsao) {
		JsonBolsao jsonBolsao = new JsonBolsao();
		applyBasicJsonValues(jsonBolsao, bolsao);
		return jsonBolsao;
	}
	
	private static Bolsao toBasicEntity(JsonBolsao jsonBolsao) {
		Bolsao bolsao = new Bolsao();
		applyBasicEntityValues(bolsao, jsonBolsao);
		return bolsao;
	}
	
	private static void applyBasicJsonValues(JsonBolsao jsonBolsao, Bolsao bolsao) {
		jsonBolsao.setId(bolsao.getId());
	    jsonBolsao.setNome(bolsao.getNome());
	}	
	private static void applyBasicEntityValues(Bolsao bolsao, JsonBolsao jsonBolsao) {
		bolsao.setId(jsonBolsao.getId());
		bolsao.setNome(jsonBolsao.getNome());
	}	
	
	public static JsonBolsao toJson(Bolsao bolsao) {
		JsonBolsao jsonBolsao = new JsonBolsao();

		applyBasicJsonValues(jsonBolsao, bolsao);

		List<ApontamentoQualidadePacking> listApontamentoQualidadePackings = bolsao.getApontamentoQualidadePackings();
		if (listApontamentoQualidadePackings != null) {
			for (ApontamentoQualidadePacking loopApontamentoQualidadePacking : listApontamentoQualidadePackings) {
				jsonBolsao.getApontamentoQualidadePackings().add(toBasicJson(loopApontamentoQualidadePacking));
			}
		}
		return jsonBolsao;
	}


	public static Bolsao apply(Bolsao bolsao, JsonBolsao jsonBolsao) {
	
		if(bolsao ==  null)
			bolsao = new Bolsao();
		
		applyBasicEntityValues(bolsao, jsonBolsao) ;

		return bolsao;
		
	}		
	public static Bolsao toEntity(JsonBolsao jsonBolsao) {
		Bolsao bolsao = new Bolsao();
		
		return apply(bolsao, jsonBolsao);
	}		
	
	public static List<JsonBolsao> toListJsonBolsaos(List<Bolsao> all) {
		List<JsonBolsao> jsonBolsaos = new ArrayList<JsonBolsao>();
		for (Bolsao bolsao : all) {
			jsonBolsaos.add(toJson(bolsao));
		}
		return jsonBolsaos;
	}
	//converte de entidade para json --------------------
	private static JsonCabine toBasicJson(Cabine cabine) {
		JsonCabine jsonCabine = new JsonCabine();
		applyBasicJsonValues(jsonCabine, cabine);
		return jsonCabine;
	}
	
	private static Cabine toBasicEntity(JsonCabine jsonCabine) {
		Cabine cabine = new Cabine();
		applyBasicEntityValues(cabine, jsonCabine);
		return cabine;
	}
	
	private static void applyBasicJsonValues(JsonCabine jsonCabine, Cabine cabine) {
		jsonCabine.setId(cabine.getId());
	    jsonCabine.setNome(cabine.getNome());
	}	
	private static void applyBasicEntityValues(Cabine cabine, JsonCabine jsonCabine) {
		cabine.setId(jsonCabine.getId());
		cabine.setNome(jsonCabine.getNome());
	}	
	
	public static JsonCabine toJson(Cabine cabine) {
		JsonCabine jsonCabine = new JsonCabine();

		applyBasicJsonValues(jsonCabine, cabine);

		List<ApontamentoQualidadePacking> listApontamentoQualidadePackings = cabine.getApontamentoQualidadePackings();
		if (listApontamentoQualidadePackings != null) {
			for (ApontamentoQualidadePacking loopApontamentoQualidadePacking : listApontamentoQualidadePackings) {
				jsonCabine.getApontamentoQualidadePackings().add(toBasicJson(loopApontamentoQualidadePacking));
			}
		}
		Packing packing_ = cabine.getPacking();
		if (packing_ != null) {
			jsonCabine.setPacking(toJson(packing_));
		}
		return jsonCabine;
	}


	public static Cabine apply(Cabine cabine, JsonCabine jsonCabine) {
	
		if(cabine ==  null)
			cabine = new Cabine();
		
		applyBasicEntityValues(cabine, jsonCabine) ;

		JsonPacking packing_ = jsonCabine.getPacking();
		if (packing_ != null) {
			cabine.setPacking(toEntity(packing_));
		}	
		return cabine;
		
	}		
	public static Cabine toEntity(JsonCabine jsonCabine) {
		Cabine cabine = new Cabine();
		
		return apply(cabine, jsonCabine);
	}		
	
	public static List<JsonCabine> toListJsonCabines(List<Cabine> all) {
		List<JsonCabine> jsonCabines = new ArrayList<JsonCabine>();
		for (Cabine cabine : all) {
			jsonCabines.add(toJson(cabine));
		}
		return jsonCabines;
	}
	//converte de entidade para json --------------------
	private static JsonCargo toBasicJson(Cargo cargo) {
		JsonCargo jsonCargo = new JsonCargo();
		applyBasicJsonValues(jsonCargo, cargo);
		return jsonCargo;
	}
	
	private static Cargo toBasicEntity(JsonCargo jsonCargo) {
		Cargo cargo = new Cargo();
		applyBasicEntityValues(cargo, jsonCargo);
		return cargo;
	}
	
	private static void applyBasicJsonValues(JsonCargo jsonCargo, Cargo cargo) {
		jsonCargo.setId(cargo.getId());
	    jsonCargo.setNome(cargo.getNome());
	}	
	private static void applyBasicEntityValues(Cargo cargo, JsonCargo jsonCargo) {
		cargo.setId(jsonCargo.getId());
		cargo.setNome(jsonCargo.getNome());
	}	
	
	public static JsonCargo toJson(Cargo cargo) {
		JsonCargo jsonCargo = new JsonCargo();

		applyBasicJsonValues(jsonCargo, cargo);

		List<Funcionario> listFuncionarios = cargo.getFuncionarios();
		if (listFuncionarios != null) {
			for (Funcionario loopFuncionario : listFuncionarios) {
				jsonCargo.getFuncionarios().add(toBasicJson(loopFuncionario));
			}
		}
		List<ApontamentoQualidadePacking> listApontamentoQualidadePackings = cargo.getApontamentoQualidadePackings();
		if (listApontamentoQualidadePackings != null) {
			for (ApontamentoQualidadePacking loopApontamentoQualidadePacking : listApontamentoQualidadePackings) {
				jsonCargo.getApontamentoQualidadePackings().add(toBasicJson(loopApontamentoQualidadePacking));
			}
		}
		return jsonCargo;
	}


	public static Cargo apply(Cargo cargo, JsonCargo jsonCargo) {
	
		if(cargo ==  null)
			cargo = new Cargo();
		
		applyBasicEntityValues(cargo, jsonCargo) ;

		return cargo;
		
	}		
	public static Cargo toEntity(JsonCargo jsonCargo) {
		Cargo cargo = new Cargo();
		
		return apply(cargo, jsonCargo);
	}		
	
	public static List<JsonCargo> toListJsonCargos(List<Cargo> all) {
		List<JsonCargo> jsonCargos = new ArrayList<JsonCargo>();
		for (Cargo cargo : all) {
			jsonCargos.add(toJson(cargo));
		}
		return jsonCargos;
	}
	//converte de entidade para json --------------------
	private static JsonCbo toBasicJson(Cbo cbo) {
		JsonCbo jsonCbo = new JsonCbo();
		applyBasicJsonValues(jsonCbo, cbo);
		return jsonCbo;
	}
	
	private static Cbo toBasicEntity(JsonCbo jsonCbo) {
		Cbo cbo = new Cbo();
		applyBasicEntityValues(cbo, jsonCbo);
		return cbo;
	}
	
	private static void applyBasicJsonValues(JsonCbo jsonCbo, Cbo cbo) {
		jsonCbo.setId(cbo.getId());
	    jsonCbo.setCodigo(cbo.getCodigo());
	    jsonCbo.setNome(cbo.getNome());
	}	
	private static void applyBasicEntityValues(Cbo cbo, JsonCbo jsonCbo) {
		cbo.setId(jsonCbo.getId());
		cbo.setCodigo(jsonCbo.getCodigo());
		cbo.setNome(jsonCbo.getNome());
	}	
	
	public static JsonCbo toJson(Cbo cbo) {
		JsonCbo jsonCbo = new JsonCbo();

		applyBasicJsonValues(jsonCbo, cbo);

		return jsonCbo;
	}


	public static Cbo apply(Cbo cbo, JsonCbo jsonCbo) {
	
		if(cbo ==  null)
			cbo = new Cbo();
		
		applyBasicEntityValues(cbo, jsonCbo) ;

		return cbo;
		
	}		
	public static Cbo toEntity(JsonCbo jsonCbo) {
		Cbo cbo = new Cbo();
		
		return apply(cbo, jsonCbo);
	}		
	
	public static List<JsonCbo> toListJsonCbos(List<Cbo> all) {
		List<JsonCbo> jsonCbos = new ArrayList<JsonCbo>();
		for (Cbo cbo : all) {
			jsonCbos.add(toJson(cbo));
		}
		return jsonCbos;
	}
	//converte de entidade para json --------------------
	private static JsonClient toBasicJson(Client client) {
		JsonClient jsonClient = new JsonClient();
		applyBasicJsonValues(jsonClient, client);
		return jsonClient;
	}
	
	private static Client toBasicEntity(JsonClient jsonClient) {
		Client client = new Client();
		applyBasicEntityValues(client, jsonClient);
		return client;
	}
	
	private static void applyBasicJsonValues(JsonClient jsonClient, Client client) {
		jsonClient.setId(client.getId());
	    jsonClient.setNome(client.getNome());
	}	
	private static void applyBasicEntityValues(Client client, JsonClient jsonClient) {
		client.setId(jsonClient.getId());
		client.setNome(jsonClient.getNome());
	}	
	
	public static JsonClient toJson(Client client) {
		JsonClient jsonClient = new JsonClient();

		applyBasicJsonValues(jsonClient, client);

		List<Packing> listPackings = client.getPackings();
		if (listPackings != null) {
			for (Packing loopPacking : listPackings) {
				jsonClient.getPackings().add(toBasicJson(loopPacking));
			}
		}
		List<Latada> listLatadas = client.getLatadas();
		if (listLatadas != null) {
			for (Latada loopLatada : listLatadas) {
				jsonClient.getLatadas().add(toBasicJson(loopLatada));
			}
		}
		List<Funcionario> listFuncionarios = client.getFuncionarios();
		if (listFuncionarios != null) {
			for (Funcionario loopFuncionario : listFuncionarios) {
				jsonClient.getFuncionarios().add(toBasicJson(loopFuncionario));
			}
		}
		return jsonClient;
	}


	public static Client apply(Client client, JsonClient jsonClient) {
	
		if(client ==  null)
			client = new Client();
		
		applyBasicEntityValues(client, jsonClient) ;

		return client;
		
	}		
	public static Client toEntity(JsonClient jsonClient) {
		Client client = new Client();
		
		return apply(client, jsonClient);
	}		
	
	public static List<JsonClient> toListJsonClients(List<Client> all) {
		List<JsonClient> jsonClients = new ArrayList<JsonClient>();
		for (Client client : all) {
			jsonClients.add(toJson(client));
		}
		return jsonClients;
	}
	//converte de entidade para json --------------------
	private static JsonCliente toBasicJson(Cliente cliente) {
		JsonCliente jsonCliente = new JsonCliente();
		applyBasicJsonValues(jsonCliente, cliente);
		return jsonCliente;
	}
	
	private static Cliente toBasicEntity(JsonCliente jsonCliente) {
		Cliente cliente = new Cliente();
		applyBasicEntityValues(cliente, jsonCliente);
		return cliente;
	}
	
	private static void applyBasicJsonValues(JsonCliente jsonCliente, Cliente cliente) {
		jsonCliente.setId(cliente.getId());
	    jsonCliente.setNome(cliente.getNome());
	    jsonCliente.setNomeFantasia(cliente.getNomeFantasia());
	    jsonCliente.setNomeContato(cliente.getNomeContato());
	    jsonCliente.setTelefoneContato(cliente.getTelefoneContato());
	    jsonCliente.setRazaoSocial(cliente.getRazaoSocial());
	    jsonCliente.setObservacao(cliente.getObservacao());
	    jsonCliente.setCpf(cliente.getCpf());
	    jsonCliente.setCnpj(cliente.getCnpj());
	    jsonCliente.setEmail(cliente.getEmail());
	    jsonCliente.setEmail2(cliente.getEmail2());
	    jsonCliente.setPessoaFisica(cliente.getPessoaFisica());
		jsonCliente.setDataNascimento(DateUtil.localDateAsString(cliente.getDataNascimento()));
	}	
	private static void applyBasicEntityValues(Cliente cliente, JsonCliente jsonCliente) {
		cliente.setId(jsonCliente.getId());
		cliente.setNome(jsonCliente.getNome());
		cliente.setNomeFantasia(jsonCliente.getNomeFantasia());
		cliente.setNomeContato(jsonCliente.getNomeContato());
		cliente.setTelefoneContato(jsonCliente.getTelefoneContato());
		cliente.setRazaoSocial(jsonCliente.getRazaoSocial());
		cliente.setObservacao(jsonCliente.getObservacao());
		cliente.setCpf(jsonCliente.getCpf());
		cliente.setCnpj(jsonCliente.getCnpj());
		cliente.setEmail(jsonCliente.getEmail());
		cliente.setEmail2(jsonCliente.getEmail2());
		cliente.setPessoaFisica(jsonCliente.getPessoaFisica());
	    cliente.setDataNascimento(DateUtil.stringAsLocalDate(jsonCliente.getDataNascimento()));
	}	
	
	public static JsonCliente toJson(Cliente cliente) {
		JsonCliente jsonCliente = new JsonCliente();

		applyBasicJsonValues(jsonCliente, cliente);

		return jsonCliente;
	}


	public static Cliente apply(Cliente cliente, JsonCliente jsonCliente) {
	
		if(cliente ==  null)
			cliente = new Cliente();
		
		applyBasicEntityValues(cliente, jsonCliente) ;

		return cliente;
		
	}		
	public static Cliente toEntity(JsonCliente jsonCliente) {
		Cliente cliente = new Cliente();
		
		return apply(cliente, jsonCliente);
	}		
	
	public static List<JsonCliente> toListJsonClientes(List<Cliente> all) {
		List<JsonCliente> jsonClientes = new ArrayList<JsonCliente>();
		for (Cliente cliente : all) {
			jsonClientes.add(toJson(cliente));
		}
		return jsonClientes;
	}
	//converte de entidade para json --------------------
	private static JsonCor toBasicJson(Cor cor) {
		JsonCor jsonCor = new JsonCor();
		applyBasicJsonValues(jsonCor, cor);
		return jsonCor;
	}
	
	private static Cor toBasicEntity(JsonCor jsonCor) {
		Cor cor = new Cor();
		applyBasicEntityValues(cor, jsonCor);
		return cor;
	}
	
	private static void applyBasicJsonValues(JsonCor jsonCor, Cor cor) {
		jsonCor.setId(cor.getId());
	    jsonCor.setNome(cor.getNome());
	}	
	private static void applyBasicEntityValues(Cor cor, JsonCor jsonCor) {
		cor.setId(jsonCor.getId());
		cor.setNome(jsonCor.getNome());
	}	
	
	public static JsonCor toJson(Cor cor) {
		JsonCor jsonCor = new JsonCor();

		applyBasicJsonValues(jsonCor, cor);

		List<ApontamentoQualidadePacking> listApontamentoQualidadePackings = cor.getApontamentoQualidadePackings();
		if (listApontamentoQualidadePackings != null) {
			for (ApontamentoQualidadePacking loopApontamentoQualidadePacking : listApontamentoQualidadePackings) {
				jsonCor.getApontamentoQualidadePackings().add(toBasicJson(loopApontamentoQualidadePacking));
			}
		}
		return jsonCor;
	}


	public static Cor apply(Cor cor, JsonCor jsonCor) {
	
		if(cor ==  null)
			cor = new Cor();
		
		applyBasicEntityValues(cor, jsonCor) ;

		return cor;
		
	}		
	public static Cor toEntity(JsonCor jsonCor) {
		Cor cor = new Cor();
		
		return apply(cor, jsonCor);
	}		
	
	public static List<JsonCor> toListJsonCors(List<Cor> all) {
		List<JsonCor> jsonCors = new ArrayList<JsonCor>();
		for (Cor cor : all) {
			jsonCors.add(toJson(cor));
		}
		return jsonCors;
	}
	//converte de entidade para json --------------------
	private static JsonDepartamento toBasicJson(Departamento departamento) {
		JsonDepartamento jsonDepartamento = new JsonDepartamento();
		applyBasicJsonValues(jsonDepartamento, departamento);
		return jsonDepartamento;
	}
	
	private static Departamento toBasicEntity(JsonDepartamento jsonDepartamento) {
		Departamento departamento = new Departamento();
		applyBasicEntityValues(departamento, jsonDepartamento);
		return departamento;
	}
	
	private static void applyBasicJsonValues(JsonDepartamento jsonDepartamento, Departamento departamento) {
		jsonDepartamento.setId(departamento.getId());
	    jsonDepartamento.setNome(departamento.getNome());
	    jsonDepartamento.setDescricao(departamento.getDescricao());
	}	
	private static void applyBasicEntityValues(Departamento departamento, JsonDepartamento jsonDepartamento) {
		departamento.setId(jsonDepartamento.getId());
		departamento.setNome(jsonDepartamento.getNome());
		departamento.setDescricao(jsonDepartamento.getDescricao());
	}	
	
	public static JsonDepartamento toJson(Departamento departamento) {
		JsonDepartamento jsonDepartamento = new JsonDepartamento();

		applyBasicJsonValues(jsonDepartamento, departamento);

		return jsonDepartamento;
	}


	public static Departamento apply(Departamento departamento, JsonDepartamento jsonDepartamento) {
	
		if(departamento ==  null)
			departamento = new Departamento();
		
		applyBasicEntityValues(departamento, jsonDepartamento) ;

		return departamento;
		
	}		
	public static Departamento toEntity(JsonDepartamento jsonDepartamento) {
		Departamento departamento = new Departamento();
		
		return apply(departamento, jsonDepartamento);
	}		
	
	public static List<JsonDepartamento> toListJsonDepartamentos(List<Departamento> all) {
		List<JsonDepartamento> jsonDepartamentos = new ArrayList<JsonDepartamento>();
		for (Departamento departamento : all) {
			jsonDepartamentos.add(toJson(departamento));
		}
		return jsonDepartamentos;
	}
	//converte de entidade para json --------------------
	private static JsonEmbalagem toBasicJson(Embalagem embalagem) {
		JsonEmbalagem jsonEmbalagem = new JsonEmbalagem();
		applyBasicJsonValues(jsonEmbalagem, embalagem);
		return jsonEmbalagem;
	}
	
	private static Embalagem toBasicEntity(JsonEmbalagem jsonEmbalagem) {
		Embalagem embalagem = new Embalagem();
		applyBasicEntityValues(embalagem, jsonEmbalagem);
		return embalagem;
	}
	
	private static void applyBasicJsonValues(JsonEmbalagem jsonEmbalagem, Embalagem embalagem) {
		jsonEmbalagem.setId(embalagem.getId());
	    jsonEmbalagem.setNome(embalagem.getNome());
	}	
	private static void applyBasicEntityValues(Embalagem embalagem, JsonEmbalagem jsonEmbalagem) {
		embalagem.setId(jsonEmbalagem.getId());
		embalagem.setNome(jsonEmbalagem.getNome());
	}	
	
	public static JsonEmbalagem toJson(Embalagem embalagem) {
		JsonEmbalagem jsonEmbalagem = new JsonEmbalagem();

		applyBasicJsonValues(jsonEmbalagem, embalagem);

		List<ApontamentoQualidadePacking> listApontamentoQualidadePackings = embalagem.getApontamentoQualidadePackings();
		if (listApontamentoQualidadePackings != null) {
			for (ApontamentoQualidadePacking loopApontamentoQualidadePacking : listApontamentoQualidadePackings) {
				jsonEmbalagem.getApontamentoQualidadePackings().add(toBasicJson(loopApontamentoQualidadePacking));
			}
		}
		return jsonEmbalagem;
	}


	public static Embalagem apply(Embalagem embalagem, JsonEmbalagem jsonEmbalagem) {
	
		if(embalagem ==  null)
			embalagem = new Embalagem();
		
		applyBasicEntityValues(embalagem, jsonEmbalagem) ;

		return embalagem;
		
	}		
	public static Embalagem toEntity(JsonEmbalagem jsonEmbalagem) {
		Embalagem embalagem = new Embalagem();
		
		return apply(embalagem, jsonEmbalagem);
	}		
	
	public static List<JsonEmbalagem> toListJsonEmbalagems(List<Embalagem> all) {
		List<JsonEmbalagem> jsonEmbalagems = new ArrayList<JsonEmbalagem>();
		for (Embalagem embalagem : all) {
			jsonEmbalagems.add(toJson(embalagem));
		}
		return jsonEmbalagems;
	}
	//converte de entidade para json --------------------
	private static JsonFuncao toBasicJson(Funcao funcao) {
		JsonFuncao jsonFuncao = new JsonFuncao();
		applyBasicJsonValues(jsonFuncao, funcao);
		return jsonFuncao;
	}
	
	private static Funcao toBasicEntity(JsonFuncao jsonFuncao) {
		Funcao funcao = new Funcao();
		applyBasicEntityValues(funcao, jsonFuncao);
		return funcao;
	}
	
	private static void applyBasicJsonValues(JsonFuncao jsonFuncao, Funcao funcao) {
		jsonFuncao.setId(funcao.getId());
	    jsonFuncao.setNome(funcao.getNome());
	    jsonFuncao.setDescricao(funcao.getDescricao());
	}	
	private static void applyBasicEntityValues(Funcao funcao, JsonFuncao jsonFuncao) {
		funcao.setId(jsonFuncao.getId());
		funcao.setNome(jsonFuncao.getNome());
		funcao.setDescricao(jsonFuncao.getDescricao());
	}	
	
	public static JsonFuncao toJson(Funcao funcao) {
		JsonFuncao jsonFuncao = new JsonFuncao();

		applyBasicJsonValues(jsonFuncao, funcao);

		return jsonFuncao;
	}


	public static Funcao apply(Funcao funcao, JsonFuncao jsonFuncao) {
	
		if(funcao ==  null)
			funcao = new Funcao();
		
		applyBasicEntityValues(funcao, jsonFuncao) ;

		return funcao;
		
	}		
	public static Funcao toEntity(JsonFuncao jsonFuncao) {
		Funcao funcao = new Funcao();
		
		return apply(funcao, jsonFuncao);
	}		
	
	public static List<JsonFuncao> toListJsonFuncaos(List<Funcao> all) {
		List<JsonFuncao> jsonFuncaos = new ArrayList<JsonFuncao>();
		for (Funcao funcao : all) {
			jsonFuncaos.add(toJson(funcao));
		}
		return jsonFuncaos;
	}
	//converte de entidade para json --------------------
	private static JsonFuncionario toBasicJson(Funcionario funcionario) {
		JsonFuncionario jsonFuncionario = new JsonFuncionario();
		applyBasicJsonValues(jsonFuncionario, funcionario);
		return jsonFuncionario;
	}
	
	private static Funcionario toBasicEntity(JsonFuncionario jsonFuncionario) {
		Funcionario funcionario = new Funcionario();
		applyBasicEntityValues(funcionario, jsonFuncionario);
		return funcionario;
	}
	
	private static void applyBasicJsonValues(JsonFuncionario jsonFuncionario, Funcionario funcionario) {
		jsonFuncionario.setId(funcionario.getId());
	    jsonFuncionario.setMatricula(funcionario.getMatricula());
	    jsonFuncionario.setFoto(funcionario.getFoto());
	    jsonFuncionario.setNome(funcionario.getNome());
	    jsonFuncionario.setTelefone(funcionario.getTelefone());
	    jsonFuncionario.setTelefone2(funcionario.getTelefone2());
	    jsonFuncionario.setSexo(funcionario.getSexo());
		jsonFuncionario.setDataNascimento(DateUtil.localDateAsString(funcionario.getDataNascimento()));
	    jsonFuncionario.setSalario(funcionario.getSalario());
	    jsonFuncionario.setEscolaridade(funcionario.getEscolaridade());
		jsonFuncionario.setDataAdmissao(DateUtil.localDateAsString(funcionario.getDataAdmissao()));
		jsonFuncionario.setDataDemissao(DateUtil.localDateAsString(funcionario.getDataDemissao()));
	    jsonFuncionario.setValorHoraExtra(funcionario.getValorHoraExtra());
	    jsonFuncionario.setCarteiraTrabalho(funcionario.getCarteiraTrabalho());
	    jsonFuncionario.setRg(funcionario.getRg());
	    jsonFuncionario.setRgOrgaoEmissor(funcionario.getRgOrgaoEmissor());
	    jsonFuncionario.setNomeBanco(funcionario.getNomeBanco());
	    jsonFuncionario.setBancoNumeroAgencia(funcionario.getBancoNumeroAgencia());
	    jsonFuncionario.setBancoNumeroConta(funcionario.getBancoNumeroConta());
	    jsonFuncionario.setPis(funcionario.getPis());
	}	
	private static void applyBasicEntityValues(Funcionario funcionario, JsonFuncionario jsonFuncionario) {
		funcionario.setId(jsonFuncionario.getId());
		funcionario.setMatricula(jsonFuncionario.getMatricula());
		funcionario.setFoto(jsonFuncionario.getFoto());
		funcionario.setNome(jsonFuncionario.getNome());
		funcionario.setTelefone(jsonFuncionario.getTelefone());
		funcionario.setTelefone2(jsonFuncionario.getTelefone2());
		funcionario.setSexo(jsonFuncionario.getSexo());
	    funcionario.setDataNascimento(DateUtil.stringAsLocalDate(jsonFuncionario.getDataNascimento()));
		funcionario.setSalario(jsonFuncionario.getSalario());
		funcionario.setEscolaridade(jsonFuncionario.getEscolaridade());
	    funcionario.setDataAdmissao(DateUtil.stringAsLocalDate(jsonFuncionario.getDataAdmissao()));
	    funcionario.setDataDemissao(DateUtil.stringAsLocalDate(jsonFuncionario.getDataDemissao()));
		funcionario.setValorHoraExtra(jsonFuncionario.getValorHoraExtra());
		funcionario.setCarteiraTrabalho(jsonFuncionario.getCarteiraTrabalho());
		funcionario.setRg(jsonFuncionario.getRg());
		funcionario.setRgOrgaoEmissor(jsonFuncionario.getRgOrgaoEmissor());
		funcionario.setNomeBanco(jsonFuncionario.getNomeBanco());
		funcionario.setBancoNumeroAgencia(jsonFuncionario.getBancoNumeroAgencia());
		funcionario.setBancoNumeroConta(jsonFuncionario.getBancoNumeroConta());
		funcionario.setPis(jsonFuncionario.getPis());
	}	
	
	public static JsonFuncionario toJson(Funcionario funcionario) {
		JsonFuncionario jsonFuncionario = new JsonFuncionario();

		applyBasicJsonValues(jsonFuncionario, funcionario);

		Endereco endereco_ = funcionario.getEndereco();
		if (endereco_ != null) {
			jsonFuncionario.setEndereco(toJson(endereco_));
		}
		Cargo cargo_ = funcionario.getCargo();
		if (cargo_ != null) {
			jsonFuncionario.setCargo(toJson(cargo_));
		}
		Cbo cbo_ = funcionario.getCbo();
		if (cbo_ != null) {
			jsonFuncionario.setCbo(toJson(cbo_));
		}
		Departamento departamento_ = funcionario.getDepartamento();
		if (departamento_ != null) {
			jsonFuncionario.setDepartamento(toJson(departamento_));
		}
		Funcao funcao_ = funcionario.getFuncao();
		if (funcao_ != null) {
			jsonFuncionario.setFuncao(toJson(funcao_));
		}
		return jsonFuncionario;
	}


	public static Funcionario apply(Funcionario funcionario, JsonFuncionario jsonFuncionario) {
	
		if(funcionario ==  null)
			funcionario = new Funcionario();
		
		applyBasicEntityValues(funcionario, jsonFuncionario) ;

		JsonEndereco endereco_ = jsonFuncionario.getEndereco();
		if (endereco_ != null) {
			funcionario.setEndereco(toEntity(endereco_));
		}	
		JsonCargo cargo_ = jsonFuncionario.getCargo();
		if (cargo_ != null) {
			funcionario.setCargo(toEntity(cargo_));
		}	
		JsonCbo cbo_ = jsonFuncionario.getCbo();
		if (cbo_ != null) {
			funcionario.setCbo(toEntity(cbo_));
		}	
		JsonDepartamento departamento_ = jsonFuncionario.getDepartamento();
		if (departamento_ != null) {
			funcionario.setDepartamento(toEntity(departamento_));
		}	
		JsonFuncao funcao_ = jsonFuncionario.getFuncao();
		if (funcao_ != null) {
			funcionario.setFuncao(toEntity(funcao_));
		}	
		return funcionario;
		
	}		
	public static Funcionario toEntity(JsonFuncionario jsonFuncionario) {
		Funcionario funcionario = new Funcionario();
		
		return apply(funcionario, jsonFuncionario);
	}		
	
	public static List<JsonFuncionario> toListJsonFuncionarios(List<Funcionario> all) {
		List<JsonFuncionario> jsonFuncionarios = new ArrayList<JsonFuncionario>();
		for (Funcionario funcionario : all) {
			jsonFuncionarios.add(toJson(funcionario));
		}
		return jsonFuncionarios;
	}
	//converte de entidade para json --------------------
	private static JsonGenerador toBasicJson(Generador generador) {
		JsonGenerador jsonGenerador = new JsonGenerador();
		applyBasicJsonValues(jsonGenerador, generador);
		return jsonGenerador;
	}
	
	private static Generador toBasicEntity(JsonGenerador jsonGenerador) {
		Generador generador = new Generador();
		applyBasicEntityValues(generador, jsonGenerador);
		return generador;
	}
	
	private static void applyBasicJsonValues(JsonGenerador jsonGenerador, Generador generador) {
		jsonGenerador.setId(generador.getId());
	    jsonGenerador.setNome(generador.getNome());
	}	
	private static void applyBasicEntityValues(Generador generador, JsonGenerador jsonGenerador) {
		generador.setId(jsonGenerador.getId());
		generador.setNome(jsonGenerador.getNome());
	}	
	
	public static JsonGenerador toJson(Generador generador) {
		JsonGenerador jsonGenerador = new JsonGenerador();

		applyBasicJsonValues(jsonGenerador, generador);

		List<ApontamentoQualidadePacking> listApontamentoQualidadePackings = generador.getApontamentoQualidadePackings();
		if (listApontamentoQualidadePackings != null) {
			for (ApontamentoQualidadePacking loopApontamentoQualidadePacking : listApontamentoQualidadePackings) {
				jsonGenerador.getApontamentoQualidadePackings().add(toBasicJson(loopApontamentoQualidadePacking));
			}
		}
		return jsonGenerador;
	}


	public static Generador apply(Generador generador, JsonGenerador jsonGenerador) {
	
		if(generador ==  null)
			generador = new Generador();
		
		applyBasicEntityValues(generador, jsonGenerador) ;

		return generador;
		
	}		
	public static Generador toEntity(JsonGenerador jsonGenerador) {
		Generador generador = new Generador();
		
		return apply(generador, jsonGenerador);
	}		
	
	public static List<JsonGenerador> toListJsonGeneradors(List<Generador> all) {
		List<JsonGenerador> jsonGeneradors = new ArrayList<JsonGenerador>();
		for (Generador generador : all) {
			jsonGeneradors.add(toJson(generador));
		}
		return jsonGeneradors;
	}
	//converte de entidade para json --------------------
	private static JsonLatada toBasicJson(Latada latada) {
		JsonLatada jsonLatada = new JsonLatada();
		applyBasicJsonValues(jsonLatada, latada);
		return jsonLatada;
	}
	
	private static Latada toBasicEntity(JsonLatada jsonLatada) {
		Latada latada = new Latada();
		applyBasicEntityValues(latada, jsonLatada);
		return latada;
	}
	
	private static void applyBasicJsonValues(JsonLatada jsonLatada, Latada latada) {
		jsonLatada.setId(latada.getId());
	    jsonLatada.setNome(latada.getNome());
	}	
	private static void applyBasicEntityValues(Latada latada, JsonLatada jsonLatada) {
		latada.setId(jsonLatada.getId());
		latada.setNome(jsonLatada.getNome());
	}	
	
	public static JsonLatada toJson(Latada latada) {
		JsonLatada jsonLatada = new JsonLatada();

		applyBasicJsonValues(jsonLatada, latada);

		List<ApontamentoQualidadePacking> listApontamentoQualidadePackings = latada.getApontamentoQualidadePackings();
		if (listApontamentoQualidadePackings != null) {
			for (ApontamentoQualidadePacking loopApontamentoQualidadePacking : listApontamentoQualidadePackings) {
				jsonLatada.getApontamentoQualidadePackings().add(toBasicJson(loopApontamentoQualidadePacking));
			}
		}
		return jsonLatada;
	}


	public static Latada apply(Latada latada, JsonLatada jsonLatada) {
	
		if(latada ==  null)
			latada = new Latada();
		
		applyBasicEntityValues(latada, jsonLatada) ;

		return latada;
		
	}		
	public static Latada toEntity(JsonLatada jsonLatada) {
		Latada latada = new Latada();
		
		return apply(latada, jsonLatada);
	}		
	
	public static List<JsonLatada> toListJsonLatadas(List<Latada> all) {
		List<JsonLatada> jsonLatadas = new ArrayList<JsonLatada>();
		for (Latada latada : all) {
			jsonLatadas.add(toJson(latada));
		}
		return jsonLatadas;
	}
	//converte de entidade para json --------------------
	private static JsonPacking toBasicJson(Packing packing) {
		JsonPacking jsonPacking = new JsonPacking();
		applyBasicJsonValues(jsonPacking, packing);
		return jsonPacking;
	}
	
	private static Packing toBasicEntity(JsonPacking jsonPacking) {
		Packing packing = new Packing();
		applyBasicEntityValues(packing, jsonPacking);
		return packing;
	}
	
	private static void applyBasicJsonValues(JsonPacking jsonPacking, Packing packing) {
		jsonPacking.setId(packing.getId());
	    jsonPacking.setNome(packing.getNome());
	}	
	private static void applyBasicEntityValues(Packing packing, JsonPacking jsonPacking) {
		packing.setId(jsonPacking.getId());
		packing.setNome(jsonPacking.getNome());
	}	
	
	public static JsonPacking toJson(Packing packing) {
		JsonPacking jsonPacking = new JsonPacking();

		applyBasicJsonValues(jsonPacking, packing);

		List<ApontamentoQualidadePacking> listApontamentoQualidadePackings = packing.getApontamentoQualidadePackings();
		if (listApontamentoQualidadePackings != null) {
			for (ApontamentoQualidadePacking loopApontamentoQualidadePacking : listApontamentoQualidadePackings) {
				jsonPacking.getApontamentoQualidadePackings().add(toBasicJson(loopApontamentoQualidadePacking));
			}
		}
		List<Cabine> listCabines = packing.getCabines();
		if (listCabines != null) {
			for (Cabine loopCabine : listCabines) {
				jsonPacking.getCabines().add(toBasicJson(loopCabine));
			}
		}
		return jsonPacking;
	}


	public static Packing apply(Packing packing, JsonPacking jsonPacking) {
	
		if(packing ==  null)
			packing = new Packing();
		
		applyBasicEntityValues(packing, jsonPacking) ;

		return packing;
		
	}		
	public static Packing toEntity(JsonPacking jsonPacking) {
		Packing packing = new Packing();
		
		return apply(packing, jsonPacking);
	}		
	
	public static List<JsonPacking> toListJsonPackings(List<Packing> all) {
		List<JsonPacking> jsonPackings = new ArrayList<JsonPacking>();
		for (Packing packing : all) {
			jsonPackings.add(toJson(packing));
		}
		return jsonPackings;
	}
	//converte de entidade para json --------------------
	private static JsonSacola toBasicJson(Sacola sacola) {
		JsonSacola jsonSacola = new JsonSacola();
		applyBasicJsonValues(jsonSacola, sacola);
		return jsonSacola;
	}
	
	private static Sacola toBasicEntity(JsonSacola jsonSacola) {
		Sacola sacola = new Sacola();
		applyBasicEntityValues(sacola, jsonSacola);
		return sacola;
	}
	
	private static void applyBasicJsonValues(JsonSacola jsonSacola, Sacola sacola) {
		jsonSacola.setId(sacola.getId());
	    jsonSacola.setNome(sacola.getNome());
	}	
	private static void applyBasicEntityValues(Sacola sacola, JsonSacola jsonSacola) {
		sacola.setId(jsonSacola.getId());
		sacola.setNome(jsonSacola.getNome());
	}	
	
	public static JsonSacola toJson(Sacola sacola) {
		JsonSacola jsonSacola = new JsonSacola();

		applyBasicJsonValues(jsonSacola, sacola);

		List<ApontamentoQualidadePacking> listApontamentoQualidadePackings = sacola.getApontamentoQualidadePackings();
		if (listApontamentoQualidadePackings != null) {
			for (ApontamentoQualidadePacking loopApontamentoQualidadePacking : listApontamentoQualidadePackings) {
				jsonSacola.getApontamentoQualidadePackings().add(toBasicJson(loopApontamentoQualidadePacking));
			}
		}
		return jsonSacola;
	}


	public static Sacola apply(Sacola sacola, JsonSacola jsonSacola) {
	
		if(sacola ==  null)
			sacola = new Sacola();
		
		applyBasicEntityValues(sacola, jsonSacola) ;

		return sacola;
		
	}		
	public static Sacola toEntity(JsonSacola jsonSacola) {
		Sacola sacola = new Sacola();
		
		return apply(sacola, jsonSacola);
	}		
	
	public static List<JsonSacola> toListJsonSacolas(List<Sacola> all) {
		List<JsonSacola> jsonSacolas = new ArrayList<JsonSacola>();
		for (Sacola sacola : all) {
			jsonSacolas.add(toJson(sacola));
		}
		return jsonSacolas;
	}
	//converte de entidade para json --------------------
	private static JsonVariedade toBasicJson(Variedade variedade) {
		JsonVariedade jsonVariedade = new JsonVariedade();
		applyBasicJsonValues(jsonVariedade, variedade);
		return jsonVariedade;
	}
	
	private static Variedade toBasicEntity(JsonVariedade jsonVariedade) {
		Variedade variedade = new Variedade();
		applyBasicEntityValues(variedade, jsonVariedade);
		return variedade;
	}
	
	private static void applyBasicJsonValues(JsonVariedade jsonVariedade, Variedade variedade) {
		jsonVariedade.setId(variedade.getId());
	    jsonVariedade.setNome(variedade.getNome());
	}	
	private static void applyBasicEntityValues(Variedade variedade, JsonVariedade jsonVariedade) {
		variedade.setId(jsonVariedade.getId());
		variedade.setNome(jsonVariedade.getNome());
	}	
	
	public static JsonVariedade toJson(Variedade variedade) {
		JsonVariedade jsonVariedade = new JsonVariedade();

		applyBasicJsonValues(jsonVariedade, variedade);

		List<ApontamentoQualidadePacking> listApontamentoQualidadePackings = variedade.getApontamentoQualidadePackings();
		if (listApontamentoQualidadePackings != null) {
			for (ApontamentoQualidadePacking loopApontamentoQualidadePacking : listApontamentoQualidadePackings) {
				jsonVariedade.getApontamentoQualidadePackings().add(toBasicJson(loopApontamentoQualidadePacking));
			}
		}
		return jsonVariedade;
	}


	public static Variedade apply(Variedade variedade, JsonVariedade jsonVariedade) {
	
		if(variedade ==  null)
			variedade = new Variedade();
		
		applyBasicEntityValues(variedade, jsonVariedade) ;

		return variedade;
		
	}		
	public static Variedade toEntity(JsonVariedade jsonVariedade) {
		Variedade variedade = new Variedade();
		
		return apply(variedade, jsonVariedade);
	}		
	
	public static List<JsonVariedade> toListJsonVariedades(List<Variedade> all) {
		List<JsonVariedade> jsonVariedades = new ArrayList<JsonVariedade>();
		for (Variedade variedade : all) {
			jsonVariedades.add(toJson(variedade));
		}
		return jsonVariedades;
	}
	//converte de entidade para json --------------------
	private static JsonBairro toBasicJson(Bairro bairro) {
		JsonBairro jsonBairro = new JsonBairro();
		applyBasicJsonValues(jsonBairro, bairro);
		return jsonBairro;
	}
	
	private static Bairro toBasicEntity(JsonBairro jsonBairro) {
		Bairro bairro = new Bairro();
		applyBasicEntityValues(bairro, jsonBairro);
		return bairro;
	}
	
	private static void applyBasicJsonValues(JsonBairro jsonBairro, Bairro bairro) {
		jsonBairro.setId(bairro.getId());
	    jsonBairro.setNome(bairro.getNome());
	}	
	private static void applyBasicEntityValues(Bairro bairro, JsonBairro jsonBairro) {
		bairro.setId(jsonBairro.getId());
		bairro.setNome(jsonBairro.getNome());
	}	
	
	public static JsonBairro toJson(Bairro bairro) {
		JsonBairro jsonBairro = new JsonBairro();

		applyBasicJsonValues(jsonBairro, bairro);

		Cidade cidade_ = bairro.getCidade();
		if (cidade_ != null) {
			jsonBairro.setCidade(toJson(cidade_));
		}
		Estado estado_ = bairro.getEstado();
		if (estado_ != null) {
			jsonBairro.setEstado(toJson(estado_));
		}
		return jsonBairro;
	}


	public static Bairro apply(Bairro bairro, JsonBairro jsonBairro) {
	
		if(bairro ==  null)
			bairro = new Bairro();
		
		applyBasicEntityValues(bairro, jsonBairro) ;

		JsonCidade cidade_ = jsonBairro.getCidade();
		if (cidade_ != null) {
			bairro.setCidade(toEntity(cidade_));
		}	
		JsonEstado estado_ = jsonBairro.getEstado();
		if (estado_ != null) {
			bairro.setEstado(toEntity(estado_));
		}	
		return bairro;
		
	}		
	public static Bairro toEntity(JsonBairro jsonBairro) {
		Bairro bairro = new Bairro();
		
		return apply(bairro, jsonBairro);
	}		
	
	public static List<JsonBairro> toListJsonBairros(List<Bairro> all) {
		List<JsonBairro> jsonBairros = new ArrayList<JsonBairro>();
		for (Bairro bairro : all) {
			jsonBairros.add(toJson(bairro));
		}
		return jsonBairros;
	}
	//converte de entidade para json --------------------
	private static JsonCep toBasicJson(Cep cep) {
		JsonCep jsonCep = new JsonCep();
		applyBasicJsonValues(jsonCep, cep);
		return jsonCep;
	}
	
	private static Cep toBasicEntity(JsonCep jsonCep) {
		Cep cep = new Cep();
		applyBasicEntityValues(cep, jsonCep);
		return cep;
	}
	
	private static void applyBasicJsonValues(JsonCep jsonCep, Cep cep) {
		jsonCep.setId(cep.getId());
	    jsonCep.setLogradouro(cep.getLogradouro());
	    jsonCep.setNumero(cep.getNumero());
	}	
	private static void applyBasicEntityValues(Cep cep, JsonCep jsonCep) {
		cep.setId(jsonCep.getId());
		cep.setLogradouro(jsonCep.getLogradouro());
		cep.setNumero(jsonCep.getNumero());
	}	
	
	public static JsonCep toJson(Cep cep) {
		JsonCep jsonCep = new JsonCep();

		applyBasicJsonValues(jsonCep, cep);

		Bairro bairro_ = cep.getBairro();
		if (bairro_ != null) {
			jsonCep.setBairro(toJson(bairro_));
		}
		Cidade cidade_ = cep.getCidade();
		if (cidade_ != null) {
			jsonCep.setCidade(toJson(cidade_));
		}
		Estado estado_ = cep.getEstado();
		if (estado_ != null) {
			jsonCep.setEstado(toJson(estado_));
		}
		return jsonCep;
	}


	public static Cep apply(Cep cep, JsonCep jsonCep) {
	
		if(cep ==  null)
			cep = new Cep();
		
		applyBasicEntityValues(cep, jsonCep) ;

		JsonBairro bairro_ = jsonCep.getBairro();
		if (bairro_ != null) {
			cep.setBairro(toEntity(bairro_));
		}	
		JsonCidade cidade_ = jsonCep.getCidade();
		if (cidade_ != null) {
			cep.setCidade(toEntity(cidade_));
		}	
		JsonEstado estado_ = jsonCep.getEstado();
		if (estado_ != null) {
			cep.setEstado(toEntity(estado_));
		}	
		return cep;
		
	}		
	public static Cep toEntity(JsonCep jsonCep) {
		Cep cep = new Cep();
		
		return apply(cep, jsonCep);
	}		
	
	public static List<JsonCep> toListJsonCeps(List<Cep> all) {
		List<JsonCep> jsonCeps = new ArrayList<JsonCep>();
		for (Cep cep : all) {
			jsonCeps.add(toJson(cep));
		}
		return jsonCeps;
	}
	//converte de entidade para json --------------------
	private static JsonCidade toBasicJson(Cidade cidade) {
		JsonCidade jsonCidade = new JsonCidade();
		applyBasicJsonValues(jsonCidade, cidade);
		return jsonCidade;
	}
	
	private static Cidade toBasicEntity(JsonCidade jsonCidade) {
		Cidade cidade = new Cidade();
		applyBasicEntityValues(cidade, jsonCidade);
		return cidade;
	}
	
	private static void applyBasicJsonValues(JsonCidade jsonCidade, Cidade cidade) {
		jsonCidade.setId(cidade.getId());
	    jsonCidade.setNome(cidade.getNome());
	    jsonCidade.setCep(cidade.getCep());
	}	
	private static void applyBasicEntityValues(Cidade cidade, JsonCidade jsonCidade) {
		cidade.setId(jsonCidade.getId());
		cidade.setNome(jsonCidade.getNome());
		cidade.setCep(jsonCidade.getCep());
	}	
	
	public static JsonCidade toJson(Cidade cidade) {
		JsonCidade jsonCidade = new JsonCidade();

		applyBasicJsonValues(jsonCidade, cidade);

		Estado estado_ = cidade.getEstado();
		if (estado_ != null) {
			jsonCidade.setEstado(toJson(estado_));
		}
		return jsonCidade;
	}


	public static Cidade apply(Cidade cidade, JsonCidade jsonCidade) {
	
		if(cidade ==  null)
			cidade = new Cidade();
		
		applyBasicEntityValues(cidade, jsonCidade) ;

		JsonEstado estado_ = jsonCidade.getEstado();
		if (estado_ != null) {
			cidade.setEstado(toEntity(estado_));
		}	
		return cidade;
		
	}		
	public static Cidade toEntity(JsonCidade jsonCidade) {
		Cidade cidade = new Cidade();
		
		return apply(cidade, jsonCidade);
	}		
	
	public static List<JsonCidade> toListJsonCidades(List<Cidade> all) {
		List<JsonCidade> jsonCidades = new ArrayList<JsonCidade>();
		for (Cidade cidade : all) {
			jsonCidades.add(toJson(cidade));
		}
		return jsonCidades;
	}
	//converte de entidade para json --------------------
	private static JsonEndereco toBasicJson(Endereco endereco) {
		JsonEndereco jsonEndereco = new JsonEndereco();
		applyBasicJsonValues(jsonEndereco, endereco);
		return jsonEndereco;
	}
	
	private static Endereco toBasicEntity(JsonEndereco jsonEndereco) {
		Endereco endereco = new Endereco();
		applyBasicEntityValues(endereco, jsonEndereco);
		return endereco;
	}
	
	private static void applyBasicJsonValues(JsonEndereco jsonEndereco, Endereco endereco) {
		jsonEndereco.setId(endereco.getId());
	    jsonEndereco.setComplemento(endereco.getComplemento());
	    jsonEndereco.setNumero(endereco.getNumero());
	}	
	private static void applyBasicEntityValues(Endereco endereco, JsonEndereco jsonEndereco) {
		endereco.setId(jsonEndereco.getId());
		endereco.setComplemento(jsonEndereco.getComplemento());
		endereco.setNumero(jsonEndereco.getNumero());
	}	
	
	public static JsonEndereco toJson(Endereco endereco) {
		JsonEndereco jsonEndereco = new JsonEndereco();

		applyBasicJsonValues(jsonEndereco, endereco);

		Cep cep_ = endereco.getCep();
		if (cep_ != null) {
			jsonEndereco.setCep(toJson(cep_));
		}
		return jsonEndereco;
	}


	public static Endereco apply(Endereco endereco, JsonEndereco jsonEndereco) {
	
		if(endereco ==  null)
			endereco = new Endereco();
		
		applyBasicEntityValues(endereco, jsonEndereco) ;

		JsonCep cep_ = jsonEndereco.getCep();
		if (cep_ != null) {
			endereco.setCep(toEntity(cep_));
		}	
		return endereco;
		
	}		
	public static Endereco toEntity(JsonEndereco jsonEndereco) {
		Endereco endereco = new Endereco();
		
		return apply(endereco, jsonEndereco);
	}		
	
	public static List<JsonEndereco> toListJsonEnderecos(List<Endereco> all) {
		List<JsonEndereco> jsonEnderecos = new ArrayList<JsonEndereco>();
		for (Endereco endereco : all) {
			jsonEnderecos.add(toJson(endereco));
		}
		return jsonEnderecos;
	}
	//converte de entidade para json --------------------
	private static JsonEstado toBasicJson(Estado estado) {
		JsonEstado jsonEstado = new JsonEstado();
		applyBasicJsonValues(jsonEstado, estado);
		return jsonEstado;
	}
	
	private static Estado toBasicEntity(JsonEstado jsonEstado) {
		Estado estado = new Estado();
		applyBasicEntityValues(estado, jsonEstado);
		return estado;
	}
	
	private static void applyBasicJsonValues(JsonEstado jsonEstado, Estado estado) {
		jsonEstado.setId(estado.getId());
	    jsonEstado.setNome(estado.getNome());
	    jsonEstado.setFaixaCep1Ini(estado.getFaixaCep1Ini());
	    jsonEstado.setFaixaCep1Fim(estado.getFaixaCep1Fim());
	    jsonEstado.setFaixaCep2Ini(estado.getFaixaCep2Ini());
	    jsonEstado.setFaixaCep2Fim(estado.getFaixaCep2Fim());
	}	
	private static void applyBasicEntityValues(Estado estado, JsonEstado jsonEstado) {
		estado.setId(jsonEstado.getId());
		estado.setNome(jsonEstado.getNome());
		estado.setFaixaCep1Ini(jsonEstado.getFaixaCep1Ini());
		estado.setFaixaCep1Fim(jsonEstado.getFaixaCep1Fim());
		estado.setFaixaCep2Ini(jsonEstado.getFaixaCep2Ini());
		estado.setFaixaCep2Fim(jsonEstado.getFaixaCep2Fim());
	}	
	
	public static JsonEstado toJson(Estado estado) {
		JsonEstado jsonEstado = new JsonEstado();

		applyBasicJsonValues(jsonEstado, estado);

		return jsonEstado;
	}


	public static Estado apply(Estado estado, JsonEstado jsonEstado) {
	
		if(estado ==  null)
			estado = new Estado();
		
		applyBasicEntityValues(estado, jsonEstado) ;

		return estado;
		
	}		
	public static Estado toEntity(JsonEstado jsonEstado) {
		Estado estado = new Estado();
		
		return apply(estado, jsonEstado);
	}		
	
	public static List<JsonEstado> toListJsonEstados(List<Estado> all) {
		List<JsonEstado> jsonEstados = new ArrayList<JsonEstado>();
		for (Estado estado : all) {
			jsonEstados.add(toJson(estado));
		}
		return jsonEstados;
	}
	//converte de entidade para json --------------------
	private static JsonPais toBasicJson(Pais pais) {
		JsonPais jsonPais = new JsonPais();
		applyBasicJsonValues(jsonPais, pais);
		return jsonPais;
	}
	
	private static Pais toBasicEntity(JsonPais jsonPais) {
		Pais pais = new Pais();
		applyBasicEntityValues(pais, jsonPais);
		return pais;
	}
	
	private static void applyBasicJsonValues(JsonPais jsonPais, Pais pais) {
		jsonPais.setId(pais.getId());
	    jsonPais.setCodigo(pais.getCodigo());
	    jsonPais.setNome(pais.getNome());
	}	
	private static void applyBasicEntityValues(Pais pais, JsonPais jsonPais) {
		pais.setId(jsonPais.getId());
		pais.setCodigo(jsonPais.getCodigo());
		pais.setNome(jsonPais.getNome());
	}	
	
	public static JsonPais toJson(Pais pais) {
		JsonPais jsonPais = new JsonPais();

		applyBasicJsonValues(jsonPais, pais);

		return jsonPais;
	}


	public static Pais apply(Pais pais, JsonPais jsonPais) {
	
		if(pais ==  null)
			pais = new Pais();
		
		applyBasicEntityValues(pais, jsonPais) ;

		return pais;
		
	}		
	public static Pais toEntity(JsonPais jsonPais) {
		Pais pais = new Pais();
		
		return apply(pais, jsonPais);
	}		
	
	public static List<JsonPais> toListJsonPaiss(List<Pais> all) {
		List<JsonPais> jsonPaiss = new ArrayList<JsonPais>();
		for (Pais pais : all) {
			jsonPaiss.add(toJson(pais));
		}
		return jsonPaiss;
	}
	//converte de entidade para json --------------------
	private static JsonItem toBasicJson(Item item) {
		JsonItem jsonItem = new JsonItem();
		applyBasicJsonValues(jsonItem, item);
		return jsonItem;
	}
	
	private static Item toBasicEntity(JsonItem jsonItem) {
		Item item = new Item();
		applyBasicEntityValues(item, jsonItem);
		return item;
	}
	
	private static void applyBasicJsonValues(JsonItem jsonItem, Item item) {
		jsonItem.setId(item.getId());
	    jsonItem.setName(item.getName());
	    jsonItem.setDescription(item.getDescription());
	}	
	private static void applyBasicEntityValues(Item item, JsonItem jsonItem) {
		item.setId(jsonItem.getId());
		item.setName(jsonItem.getName());
		item.setDescription(jsonItem.getDescription());
	}	
	
	public static JsonItem toJson(Item item) {
		JsonItem jsonItem = new JsonItem();

		applyBasicJsonValues(jsonItem, item);

		ItemType type_ = item.getType();
		if (type_ != null) {
			jsonItem.setType(toJson(type_));
		}
		List<Permission> listPermissions = item.getPermissions();
		if (listPermissions != null) {
			for (Permission loopPermission : listPermissions) {
				jsonItem.getPermissions().add(toBasicJson(loopPermission));
			}
		}
		return jsonItem;
	}


	public static Item apply(Item item, JsonItem jsonItem) {
	
		if(item ==  null)
			item = new Item();
		
		applyBasicEntityValues(item, jsonItem) ;

		JsonItemType type_ = jsonItem.getType();
		if (type_ != null) {
			item.setType(toEntity(type_));
		}	
		return item;
		
	}		
	public static Item toEntity(JsonItem jsonItem) {
		Item item = new Item();
		
		return apply(item, jsonItem);
	}		
	
	public static List<JsonItem> toListJsonItems(List<Item> all) {
		List<JsonItem> jsonItems = new ArrayList<JsonItem>();
		for (Item item : all) {
			jsonItems.add(toJson(item));
		}
		return jsonItems;
	}
	//converte de entidade para json --------------------
	private static JsonItemType toBasicJson(ItemType itemType) {
		JsonItemType jsonItemType = new JsonItemType();
		applyBasicJsonValues(jsonItemType, itemType);
		return jsonItemType;
	}
	
	private static ItemType toBasicEntity(JsonItemType jsonItemType) {
		ItemType itemType = new ItemType();
		applyBasicEntityValues(itemType, jsonItemType);
		return itemType;
	}
	
	private static void applyBasicJsonValues(JsonItemType jsonItemType, ItemType itemType) {
		jsonItemType.setId(itemType.getId());
	    jsonItemType.setName(itemType.getName());
	    jsonItemType.setDescription(itemType.getDescription());
	}	
	private static void applyBasicEntityValues(ItemType itemType, JsonItemType jsonItemType) {
		itemType.setId(jsonItemType.getId());
		itemType.setName(jsonItemType.getName());
		itemType.setDescription(jsonItemType.getDescription());
	}	
	
	public static JsonItemType toJson(ItemType itemType) {
		JsonItemType jsonItemType = new JsonItemType();

		applyBasicJsonValues(jsonItemType, itemType);

		return jsonItemType;
	}


	public static ItemType apply(ItemType itemType, JsonItemType jsonItemType) {
	
		if(itemType ==  null)
			itemType = new ItemType();
		
		applyBasicEntityValues(itemType, jsonItemType) ;

		return itemType;
		
	}		
	public static ItemType toEntity(JsonItemType jsonItemType) {
		ItemType itemType = new ItemType();
		
		return apply(itemType, jsonItemType);
	}		
	
	public static List<JsonItemType> toListJsonItemTypes(List<ItemType> all) {
		List<JsonItemType> jsonItemTypes = new ArrayList<JsonItemType>();
		for (ItemType itemType : all) {
			jsonItemTypes.add(toJson(itemType));
		}
		return jsonItemTypes;
	}
	//converte de entidade para json --------------------
	private static JsonOperation toBasicJson(Operation operation) {
		JsonOperation jsonOperation = new JsonOperation();
		applyBasicJsonValues(jsonOperation, operation);
		return jsonOperation;
	}
	
	private static Operation toBasicEntity(JsonOperation jsonOperation) {
		Operation operation = new Operation();
		applyBasicEntityValues(operation, jsonOperation);
		return operation;
	}
	
	private static void applyBasicJsonValues(JsonOperation jsonOperation, Operation operation) {
		jsonOperation.setId(operation.getId());
	    jsonOperation.setName(operation.getName());
	    jsonOperation.setCanEdit(operation.getCanEdit());
	    jsonOperation.setCanRead(operation.getCanRead());
	    jsonOperation.setCanUpdate(operation.getCanUpdate());
	    jsonOperation.setCanDelete(operation.getCanDelete());
	    jsonOperation.setCanExecute(operation.getCanExecute());
	}	
	private static void applyBasicEntityValues(Operation operation, JsonOperation jsonOperation) {
		operation.setId(jsonOperation.getId());
		operation.setName(jsonOperation.getName());
		operation.setCanEdit(jsonOperation.getCanEdit());
		operation.setCanRead(jsonOperation.getCanRead());
		operation.setCanUpdate(jsonOperation.getCanUpdate());
		operation.setCanDelete(jsonOperation.getCanDelete());
		operation.setCanExecute(jsonOperation.getCanExecute());
	}	
	
	public static JsonOperation toJson(Operation operation) {
		JsonOperation jsonOperation = new JsonOperation();

		applyBasicJsonValues(jsonOperation, operation);

		List<Permission> listPermissions = operation.getPermissions();
		if (listPermissions != null) {
			for (Permission loopPermission : listPermissions) {
				jsonOperation.getPermissions().add(toBasicJson(loopPermission));
			}
		}
		return jsonOperation;
	}


	public static Operation apply(Operation operation, JsonOperation jsonOperation) {
	
		if(operation ==  null)
			operation = new Operation();
		
		applyBasicEntityValues(operation, jsonOperation) ;

		return operation;
		
	}		
	public static Operation toEntity(JsonOperation jsonOperation) {
		Operation operation = new Operation();
		
		return apply(operation, jsonOperation);
	}		
	
	public static List<JsonOperation> toListJsonOperations(List<Operation> all) {
		List<JsonOperation> jsonOperations = new ArrayList<JsonOperation>();
		for (Operation operation : all) {
			jsonOperations.add(toJson(operation));
		}
		return jsonOperations;
	}
	//converte de entidade para json --------------------
	private static JsonPermission toBasicJson(Permission permission) {
		JsonPermission jsonPermission = new JsonPermission();
		applyBasicJsonValues(jsonPermission, permission);
		return jsonPermission;
	}
	
	private static Permission toBasicEntity(JsonPermission jsonPermission) {
		Permission permission = new Permission();
		applyBasicEntityValues(permission, jsonPermission);
		return permission;
	}
	
	private static void applyBasicJsonValues(JsonPermission jsonPermission, Permission permission) {
		jsonPermission.setId(permission.getId());
	    jsonPermission.setName(permission.getName());
	}	
	private static void applyBasicEntityValues(Permission permission, JsonPermission jsonPermission) {
		permission.setId(jsonPermission.getId());
		permission.setName(jsonPermission.getName());
	}	
	
	public static JsonPermission toJson(Permission permission) {
		JsonPermission jsonPermission = new JsonPermission();

		applyBasicJsonValues(jsonPermission, permission);

		List<Role> listRoles = permission.getRoles();
		if (listRoles != null) {
			for (Role loopRole : listRoles) {
				jsonPermission.getRoles().add(toBasicJson(loopRole));
			}
		}			

		Operation operation_ = permission.getOperation();
		if (operation_ != null) {
			jsonPermission.setOperation(toJson(operation_));
		}
		Item item_ = permission.getItem();
		if (item_ != null) {
			jsonPermission.setItem(toJson(item_));
		}
		return jsonPermission;
	}


	public static Permission apply(Permission permission, JsonPermission jsonPermission) {
	
		if(permission ==  null)
			permission = new Permission();
		
		applyBasicEntityValues(permission, jsonPermission) ;

		ArrayList<JsonRole> listRoles = jsonPermission.getRoles();			
		if (listRoles != null) {
			for (JsonRole loopJsonRole : listRoles) {
				permission.addRoles(toBasicEntity(loopJsonRole));
			}
		}
			
		JsonOperation operation_ = jsonPermission.getOperation();
		if (operation_ != null) {
			permission.setOperation(toEntity(operation_));
		}	
		JsonItem item_ = jsonPermission.getItem();
		if (item_ != null) {
			permission.setItem(toEntity(item_));
		}	
		return permission;
		
	}		
	public static Permission toEntity(JsonPermission jsonPermission) {
		Permission permission = new Permission();
		
		return apply(permission, jsonPermission);
	}		
	
	public static List<JsonPermission> toListJsonPermissions(List<Permission> all) {
		List<JsonPermission> jsonPermissions = new ArrayList<JsonPermission>();
		for (Permission permission : all) {
			jsonPermissions.add(toJson(permission));
		}
		return jsonPermissions;
	}
	//converte de entidade para json --------------------
	private static JsonRole toBasicJson(Role role) {
		JsonRole jsonRole = new JsonRole();
		applyBasicJsonValues(jsonRole, role);
		return jsonRole;
	}
	
	private static Role toBasicEntity(JsonRole jsonRole) {
		Role role = new Role();
		applyBasicEntityValues(role, jsonRole);
		return role;
	}
	
	private static void applyBasicJsonValues(JsonRole jsonRole, Role role) {
		jsonRole.setId(role.getId());
	    jsonRole.setAuthority(role.getAuthority());
	    jsonRole.setDescription(role.getDescription());
	}	
	private static void applyBasicEntityValues(Role role, JsonRole jsonRole) {
		role.setId(jsonRole.getId());
		role.setAuthority(jsonRole.getAuthority());
		role.setDescription(jsonRole.getDescription());
	}	
	
	public static JsonRole toJson(Role role) {
		JsonRole jsonRole = new JsonRole();

		applyBasicJsonValues(jsonRole, role);

		List<Session> listSessions = role.getSessions();
		if (listSessions != null) {
			for (Session loopSession : listSessions) {
				jsonRole.getSessions().add(toBasicJson(loopSession));
			}
		}			

		List<User> listUsers = role.getUsers();
		if (listUsers != null) {
			for (User loopUser : listUsers) {
				jsonRole.getUsers().add(toBasicJson(loopUser));
			}
		}			

		List<Permission> listPermissions = role.getPermissions();
		if (listPermissions != null) {
			for (Permission loopPermission : listPermissions) {
				jsonRole.getPermissions().add(toJson(loopPermission));
			}
		}

		return jsonRole;
	}


	public static Role apply(Role role, JsonRole jsonRole) {
	
		if(role ==  null)
			role = new Role();
		
		applyBasicEntityValues(role, jsonRole) ;

		ArrayList<JsonSession> listSessions = jsonRole.getSessions();			
		if (listSessions != null) {
			for (JsonSession loopJsonSession : listSessions) {
				role.addSessions(toBasicEntity(loopJsonSession));
			}
		}
			
		ArrayList<JsonUser> listUsers = jsonRole.getUsers();			
		if (listUsers != null) {
			for (JsonUser loopJsonUser : listUsers) {
				role.addUsers(toBasicEntity(loopJsonUser));
			}
		}
			
		ArrayList<JsonPermission> listPermissions = jsonRole.getPermissions();			
		if (listPermissions != null) {
			for (JsonPermission loopJsonPermission : listPermissions) {
				role.addPermissions(toEntity(loopJsonPermission));
			}
		}
		return role;
		
	}		
	public static Role toEntity(JsonRole jsonRole) {
		Role role = new Role();
		
		return apply(role, jsonRole);
	}		
	
	public static List<JsonRole> toListJsonRoles(List<Role> all) {
		List<JsonRole> jsonRoles = new ArrayList<JsonRole>();
		for (Role role : all) {
			jsonRoles.add(toJson(role));
		}
		return jsonRoles;
	}
	//converte de entidade para json --------------------
	private static JsonSession toBasicJson(Session session) {
		JsonSession jsonSession = new JsonSession();
		applyBasicJsonValues(jsonSession, session);
		return jsonSession;
	}
	
	private static Session toBasicEntity(JsonSession jsonSession) {
		Session session = new Session();
		applyBasicEntityValues(session, jsonSession);
		return session;
	}
	
	private static void applyBasicJsonValues(JsonSession jsonSession, Session session) {
		jsonSession.setId(session.getId());
	    jsonSession.setName(session.getName());
	    jsonSession.setCreationDate(DateUtil.localDateTimeAsString(session.getCreationDate()));
	}	
	private static void applyBasicEntityValues(Session session, JsonSession jsonSession) {
		session.setId(jsonSession.getId());
		session.setName(jsonSession.getName());
	    session.setCreationDate(DateUtil.stringAsLocalDateTime(jsonSession.getCreationDate()));
	}	
	
	public static JsonSession toJson(Session session) {
		JsonSession jsonSession = new JsonSession();

		applyBasicJsonValues(jsonSession, session);

		List<Role> listRoles = session.getRoles();
		if (listRoles != null) {
			for (Role loopRole : listRoles) {
				jsonSession.getRoles().add(toJson(loopRole));
			}
		}

		User user_ = session.getUser();
		if (user_ != null) {
			jsonSession.setUser(toJson(user_));
		}
		return jsonSession;
	}


	public static Session apply(Session session, JsonSession jsonSession) {
	
		if(session ==  null)
			session = new Session();
		
		applyBasicEntityValues(session, jsonSession) ;

		ArrayList<JsonRole> listRoles = jsonSession.getRoles();			
		if (listRoles != null) {
			for (JsonRole loopJsonRole : listRoles) {
				session.addRoles(toEntity(loopJsonRole));
			}
		}
		JsonUser user_ = jsonSession.getUser();
		if (user_ != null) {
			session.setUser(toEntity(user_));
		}	
		return session;
		
	}		
	public static Session toEntity(JsonSession jsonSession) {
		Session session = new Session();
		
		return apply(session, jsonSession);
	}		
	
	public static List<JsonSession> toListJsonSessions(List<Session> all) {
		List<JsonSession> jsonSessions = new ArrayList<JsonSession>();
		for (Session session : all) {
			jsonSessions.add(toJson(session));
		}
		return jsonSessions;
	}
	//converte de entidade para json --------------------
	private static JsonUser toBasicJson(User user) {
		JsonUser jsonUser = new JsonUser();
		applyBasicJsonValues(jsonUser, user);
		return jsonUser;
	}
	
	private static User toBasicEntity(JsonUser jsonUser) {
		User user = new User();
		applyBasicEntityValues(user, jsonUser);
		return user;
	}
	
	private static void applyBasicJsonValues(JsonUser jsonUser, User user) {
		jsonUser.setId(user.getId());
	    jsonUser.setName(user.getName());
	    jsonUser.setUsername(user.getUsername());
	    jsonUser.setPassword(user.getPassword());
	    jsonUser.setEnable(user.getEnable());
	    jsonUser.setImage(user.getImage());
	}	
	private static void applyBasicEntityValues(User user, JsonUser jsonUser) {
		user.setId(jsonUser.getId());
		user.setName(jsonUser.getName());
		user.setUsername(jsonUser.getUsername());
		user.setPassword(jsonUser.getPassword());
		user.setEnable(jsonUser.getEnable());
		user.setImage(jsonUser.getImage());
	}	
	
	public static JsonUser toJson(User user) {
		JsonUser jsonUser = new JsonUser();

		applyBasicJsonValues(jsonUser, user);

		List<Role> listRoles = user.getRoles();
		if (listRoles != null) {
			for (Role loopRole : listRoles) {
				jsonUser.getRoles().add(toJson(loopRole));
			}
		}

		Client owner_ = user.getOwner();
		if (owner_ != null) {
			jsonUser.setOwner(toJson(owner_));
		}
		return jsonUser;
	}


	public static User apply(User user, JsonUser jsonUser) {
	
		if(user ==  null)
			user = new User();
		
		applyBasicEntityValues(user, jsonUser) ;

		ArrayList<JsonRole> listRoles = jsonUser.getRoles();			
		if (listRoles != null) {
			for (JsonRole loopJsonRole : listRoles) {
				user.addRoles(toEntity(loopJsonRole));
			}
		}
		JsonClient owner_ = jsonUser.getOwner();
		if (owner_ != null) {
			user.setOwner(toEntity(owner_));
		}	
		return user;
		
	}		
	public static User toEntity(JsonUser jsonUser) {
		User user = new User();
		
		return apply(user, jsonUser);
	}		
	
	public static List<JsonUser> toListJsonUsers(List<User> all) {
		List<JsonUser> jsonUsers = new ArrayList<JsonUser>();
		for (User user : all) {
			jsonUsers.add(toJson(user));
		}
		return jsonUsers;
	}


}
