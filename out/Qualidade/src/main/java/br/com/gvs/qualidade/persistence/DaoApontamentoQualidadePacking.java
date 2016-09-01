package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.ApontamentoQualidadePacking;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterApontamentoQualidadePacking;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.ApontamentoQualidadePacking;
/**
*  generated: 01/09/2016 17:25:05
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoApontamentoQualidadePacking extends AccessibleHibernateDao<ApontamentoQualidadePacking> {
	private static final Logger LOGGER = Logger.getLogger(DaoApontamentoQualidadePacking.class);

	public DaoApontamentoQualidadePacking() {
		super(ApontamentoQualidadePacking.class);
	}

	@Override
	public Pagination<ApontamentoQualidadePacking> getAll(PaginationParams paginationParams) {
		FilterApontamentoQualidadePacking filterApontamentoQualidadePacking = (FilterApontamentoQualidadePacking) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterApontamentoQualidadePacking.getAparencia() != null) {
			searchCriteria.add(Restrictions.eq("aparencia", filterApontamentoQualidadePacking.getAparencia()));
			countCriteria.add(Restrictions.eq("aparencia", filterApontamentoQualidadePacking.getAparencia()));
		}				
		if (filterApontamentoQualidadePacking.getDiametroMinimo() != null) {
			searchCriteria.add(Restrictions.eq("diametroMinimo", filterApontamentoQualidadePacking.getDiametroMinimo()));
			countCriteria.add(Restrictions.eq("diametroMinimo", filterApontamentoQualidadePacking.getDiametroMinimo()));
		}				
		if (filterApontamentoQualidadePacking.getDiametroMaximo() != null) {
			searchCriteria.add(Restrictions.eq("diametroMaximo", filterApontamentoQualidadePacking.getDiametroMaximo()));
			countCriteria.add(Restrictions.eq("diametroMaximo", filterApontamentoQualidadePacking.getDiametroMaximo()));
		}				
		if (filterApontamentoQualidadePacking.getDiametroMedio() != null) {
			searchCriteria.add(Restrictions.eq("diametroMedio", filterApontamentoQualidadePacking.getDiametroMedio()));
			countCriteria.add(Restrictions.eq("diametroMedio", filterApontamentoQualidadePacking.getDiametroMedio()));
		}				
		if (filterApontamentoQualidadePacking.getBrixMinimo() != null) {
			searchCriteria.add(Restrictions.eq("brixMinimo", filterApontamentoQualidadePacking.getBrixMinimo()));
			countCriteria.add(Restrictions.eq("brixMinimo", filterApontamentoQualidadePacking.getBrixMinimo()));
		}				
		if (filterApontamentoQualidadePacking.getBrixMaximo() != null) {
			searchCriteria.add(Restrictions.eq("brixMaximo", filterApontamentoQualidadePacking.getBrixMaximo()));
			countCriteria.add(Restrictions.eq("brixMaximo", filterApontamentoQualidadePacking.getBrixMaximo()));
		}				
		if (filterApontamentoQualidadePacking.getBrixMedio() != null) {
			searchCriteria.add(Restrictions.eq("brixMedio", filterApontamentoQualidadePacking.getBrixMedio()));
			countCriteria.add(Restrictions.eq("brixMedio", filterApontamentoQualidadePacking.getBrixMedio()));
		}				
		if (filterApontamentoQualidadePacking.getPesoCachoMinimo() != null) {
			searchCriteria.add(Restrictions.eq("pesoCachoMinimo", filterApontamentoQualidadePacking.getPesoCachoMinimo()));
			countCriteria.add(Restrictions.eq("pesoCachoMinimo", filterApontamentoQualidadePacking.getPesoCachoMinimo()));
		}				
		if (filterApontamentoQualidadePacking.getPesoCachoMaximo() != null) {
			searchCriteria.add(Restrictions.eq("pesoCachoMaximo", filterApontamentoQualidadePacking.getPesoCachoMaximo()));
			countCriteria.add(Restrictions.eq("pesoCachoMaximo", filterApontamentoQualidadePacking.getPesoCachoMaximo()));
		}				
		if (filterApontamentoQualidadePacking.getPesoSacolaMinimo() != null) {
			searchCriteria.add(Restrictions.eq("pesoSacolaMinimo", filterApontamentoQualidadePacking.getPesoSacolaMinimo()));
			countCriteria.add(Restrictions.eq("pesoSacolaMinimo", filterApontamentoQualidadePacking.getPesoSacolaMinimo()));
		}				
		if (filterApontamentoQualidadePacking.getPesoSacolaMaximo() != null) {
			searchCriteria.add(Restrictions.eq("pesoSacolaMaximo", filterApontamentoQualidadePacking.getPesoSacolaMaximo()));
			countCriteria.add(Restrictions.eq("pesoSacolaMaximo", filterApontamentoQualidadePacking.getPesoSacolaMaximo()));
		}				
		if (filterApontamentoQualidadePacking.getNumeroCachoSacola() != null) {
			searchCriteria.add(Restrictions.eq("numeroCachoSacola", filterApontamentoQualidadePacking.getNumeroCachoSacola()));
			countCriteria.add(Restrictions.eq("numeroCachoSacola", filterApontamentoQualidadePacking.getNumeroCachoSacola()));
		}				
		if (filterApontamentoQualidadePacking.getNumeroSacola() != null) {
			searchCriteria.add(Restrictions.eq("numeroSacola", filterApontamentoQualidadePacking.getNumeroSacola()));
			countCriteria.add(Restrictions.eq("numeroSacola", filterApontamentoQualidadePacking.getNumeroSacola()));
		}				
		if (filterApontamentoQualidadePacking.getPesoCumbucaMinimo() != null) {
			searchCriteria.add(Restrictions.eq("pesoCumbucaMinimo", filterApontamentoQualidadePacking.getPesoCumbucaMinimo()));
			countCriteria.add(Restrictions.eq("pesoCumbucaMinimo", filterApontamentoQualidadePacking.getPesoCumbucaMinimo()));
		}				
		if (filterApontamentoQualidadePacking.getPesoCumbucaMaximo() != null) {
			searchCriteria.add(Restrictions.eq("pesoCumbucaMaximo", filterApontamentoQualidadePacking.getPesoCumbucaMaximo()));
			countCriteria.add(Restrictions.eq("pesoCumbucaMaximo", filterApontamentoQualidadePacking.getPesoCumbucaMaximo()));
		}				
		if (filterApontamentoQualidadePacking.getNumeroCachosCumbuca() != null) {
			searchCriteria.add(Restrictions.eq("numeroCachosCumbuca", filterApontamentoQualidadePacking.getNumeroCachosCumbuca()));
			countCriteria.add(Restrictions.eq("numeroCachosCumbuca", filterApontamentoQualidadePacking.getNumeroCachosCumbuca()));
		}				
		if (filterApontamentoQualidadePacking.getNumeroCumbucas() != null) {
			searchCriteria.add(Restrictions.eq("numeroCumbucas", filterApontamentoQualidadePacking.getNumeroCumbucas()));
			countCriteria.add(Restrictions.eq("numeroCumbucas", filterApontamentoQualidadePacking.getNumeroCumbucas()));
		}				
		if (filterApontamentoQualidadePacking.getPesoBruto() != null) {
			searchCriteria.add(Restrictions.eq("pesoBruto", filterApontamentoQualidadePacking.getPesoBruto()));
			countCriteria.add(Restrictions.eq("pesoBruto", filterApontamentoQualidadePacking.getPesoBruto()));
		}				
		if (filterApontamentoQualidadePacking.getPesoLiquido() != null) {
			searchCriteria.add(Restrictions.eq("pesoLiquido", filterApontamentoQualidadePacking.getPesoLiquido()));
			countCriteria.add(Restrictions.eq("pesoLiquido", filterApontamentoQualidadePacking.getPesoLiquido()));
		}				
		if (filterApontamentoQualidadePacking.getCorposEstranhos() != null) {
			searchCriteria.add(Restrictions.eq("corposEstranhos", filterApontamentoQualidadePacking.getCorposEstranhos()));
			countCriteria.add(Restrictions.eq("corposEstranhos", filterApontamentoQualidadePacking.getCorposEstranhos()));
		}				
		if (filterApontamentoQualidadePacking.getBagasAquosas() != null) {
			searchCriteria.add(Restrictions.eq("bagasAquosas", filterApontamentoQualidadePacking.getBagasAquosas()));
			countCriteria.add(Restrictions.eq("bagasAquosas", filterApontamentoQualidadePacking.getBagasAquosas()));
		}				
		if (filterApontamentoQualidadePacking.getBagasCristalinas() != null) {
			searchCriteria.add(Restrictions.eq("bagasCristalinas", filterApontamentoQualidadePacking.getBagasCristalinas()));
			countCriteria.add(Restrictions.eq("bagasCristalinas", filterApontamentoQualidadePacking.getBagasCristalinas()));
		}				
		if (filterApontamentoQualidadePacking.getFirmeza() != null) {
			searchCriteria.add(Restrictions.eq("firmeza", filterApontamentoQualidadePacking.getFirmeza()));
			countCriteria.add(Restrictions.eq("firmeza", filterApontamentoQualidadePacking.getFirmeza()));
		}				
		if (filterApontamentoQualidadePacking.getDanos() != null) {
			searchCriteria.add(Restrictions.eq("danos", filterApontamentoQualidadePacking.getDanos()));
			countCriteria.add(Restrictions.eq("danos", filterApontamentoQualidadePacking.getDanos()));
		}				
		if (filterApontamentoQualidadePacking.getPragas() != null) {
			searchCriteria.add(Restrictions.eq("pragas", filterApontamentoQualidadePacking.getPragas()));
			countCriteria.add(Restrictions.eq("pragas", filterApontamentoQualidadePacking.getPragas()));
		}				
		if (filterApontamentoQualidadePacking.getDoencas() != null) {
			searchCriteria.add(Restrictions.eq("doencas", filterApontamentoQualidadePacking.getDoencas()));
			countCriteria.add(Restrictions.eq("doencas", filterApontamentoQualidadePacking.getDoencas()));
		}				
		if (filterApontamentoQualidadePacking.getAparenciaEngaco() != null) {
			searchCriteria.add(Restrictions.eq("aparenciaEngaco", filterApontamentoQualidadePacking.getAparenciaEngaco()));
			countCriteria.add(Restrictions.eq("aparenciaEngaco", filterApontamentoQualidadePacking.getAparenciaEngaco()));
		}				
		if (filterApontamentoQualidadePacking.getDesgrana() != null) {
			searchCriteria.add(Restrictions.eq("desgrana", filterApontamentoQualidadePacking.getDesgrana()));
			countCriteria.add(Restrictions.eq("desgrana", filterApontamentoQualidadePacking.getDesgrana()));
		}				
		if (filterApontamentoQualidadePacking.getPodridao() != null) {
			searchCriteria.add(Restrictions.eq("podridao", filterApontamentoQualidadePacking.getPodridao()));
			countCriteria.add(Restrictions.eq("podridao", filterApontamentoQualidadePacking.getPodridao()));
		}				
		if (filterApontamentoQualidadePacking.getCicatrizes() != null) {
			searchCriteria.add(Restrictions.eq("cicatrizes", filterApontamentoQualidadePacking.getCicatrizes()));
			countCriteria.add(Restrictions.eq("cicatrizes", filterApontamentoQualidadePacking.getCicatrizes()));
		}				
		if (filterApontamentoQualidadePacking.getRachaduras() != null) {
			searchCriteria.add(Restrictions.eq("rachaduras", filterApontamentoQualidadePacking.getRachaduras()));
			countCriteria.add(Restrictions.eq("rachaduras", filterApontamentoQualidadePacking.getRachaduras()));
		}				
		if (filterApontamentoQualidadePacking.getRachadurasCampo() != null) {
			searchCriteria.add(Restrictions.eq("rachadurasCampo", filterApontamentoQualidadePacking.getRachadurasCampo()));
			countCriteria.add(Restrictions.eq("rachadurasCampo", filterApontamentoQualidadePacking.getRachadurasCampo()));
		}				
		if (filterApontamentoQualidadePacking.getAmolecimento() != null) {
			searchCriteria.add(Restrictions.eq("amolecimento", filterApontamentoQualidadePacking.getAmolecimento()));
			countCriteria.add(Restrictions.eq("amolecimento", filterApontamentoQualidadePacking.getAmolecimento()));
		}				
		if (filterApontamentoQualidadePacking.getObservacao() != null) {
			searchCriteria.add(Restrictions.ilike("observacao", filterApontamentoQualidadePacking.getObservacao(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("observacao", filterApontamentoQualidadePacking.getObservacao(), MatchMode.ANYWHERE));
		}
		if (filterApontamentoQualidadePacking.getDataHora() != null) {
			searchCriteria.add(Restrictions.eq("dataHora", filterApontamentoQualidadePacking.getDataHora()));
			countCriteria.add(Restrictions.eq("dataHora", filterApontamentoQualidadePacking.getDataHora()));
		}				
		if (filterApontamentoQualidadePacking.getBolsao() != null) {
			searchCriteria.createAlias("bolsao", "bolsao_");
			countCriteria.createAlias("bolsao", "bolsao_");
			searchCriteria.add(Restrictions.eq("bolsao_.id", filterApontamentoQualidadePacking.getBolsao()));
			countCriteria.add(Restrictions.eq("bolsao_.id", filterApontamentoQualidadePacking.getBolsao()));
		}
		if (filterApontamentoQualidadePacking.getGenerador() != null) {
			searchCriteria.createAlias("generador", "generador_");
			countCriteria.createAlias("generador", "generador_");
			searchCriteria.add(Restrictions.eq("generador_.id", filterApontamentoQualidadePacking.getGenerador()));
			countCriteria.add(Restrictions.eq("generador_.id", filterApontamentoQualidadePacking.getGenerador()));
		}
		if (filterApontamentoQualidadePacking.getCor() != null) {
			searchCriteria.createAlias("cor", "cor_");
			countCriteria.createAlias("cor", "cor_");
			searchCriteria.add(Restrictions.eq("cor_.id", filterApontamentoQualidadePacking.getCor()));
			countCriteria.add(Restrictions.eq("cor_.id", filterApontamentoQualidadePacking.getCor()));
		}
		if (filterApontamentoQualidadePacking.getCargo() != null) {
			searchCriteria.createAlias("cargo", "cargo_");
			countCriteria.createAlias("cargo", "cargo_");
			searchCriteria.add(Restrictions.eq("cargo_.id", filterApontamentoQualidadePacking.getCargo()));
			countCriteria.add(Restrictions.eq("cargo_.id", filterApontamentoQualidadePacking.getCargo()));
		}
		if (filterApontamentoQualidadePacking.getVariedade() != null) {
			searchCriteria.createAlias("variedade", "variedade_");
			countCriteria.createAlias("variedade", "variedade_");
			searchCriteria.add(Restrictions.eq("variedade_.id", filterApontamentoQualidadePacking.getVariedade()));
			countCriteria.add(Restrictions.eq("variedade_.id", filterApontamentoQualidadePacking.getVariedade()));
		}
		if (filterApontamentoQualidadePacking.getLatada() != null) {
			searchCriteria.createAlias("latada", "latada_");
			countCriteria.createAlias("latada", "latada_");
			searchCriteria.add(Restrictions.eq("latada_.id", filterApontamentoQualidadePacking.getLatada()));
			countCriteria.add(Restrictions.eq("latada_.id", filterApontamentoQualidadePacking.getLatada()));
		}
		if (filterApontamentoQualidadePacking.getEmbalagem() != null) {
			searchCriteria.createAlias("embalagem", "embalagem_");
			countCriteria.createAlias("embalagem", "embalagem_");
			searchCriteria.add(Restrictions.eq("embalagem_.id", filterApontamentoQualidadePacking.getEmbalagem()));
			countCriteria.add(Restrictions.eq("embalagem_.id", filterApontamentoQualidadePacking.getEmbalagem()));
		}
		if (filterApontamentoQualidadePacking.getCabine() != null) {
			searchCriteria.createAlias("cabine", "cabine_");
			countCriteria.createAlias("cabine", "cabine_");
			searchCriteria.add(Restrictions.eq("cabine_.id", filterApontamentoQualidadePacking.getCabine()));
			countCriteria.add(Restrictions.eq("cabine_.id", filterApontamentoQualidadePacking.getCabine()));
		}
		if (filterApontamentoQualidadePacking.getSacola() != null) {
			searchCriteria.createAlias("sacola", "sacola_");
			countCriteria.createAlias("sacola", "sacola_");
			searchCriteria.add(Restrictions.eq("sacola_.id", filterApontamentoQualidadePacking.getSacola()));
			countCriteria.add(Restrictions.eq("sacola_.id", filterApontamentoQualidadePacking.getSacola()));
		}
		if (filterApontamentoQualidadePacking.getCliente() != null) {
			searchCriteria.createAlias("cliente", "cliente_");
			countCriteria.createAlias("cliente", "cliente_");
			searchCriteria.add(Restrictions.eq("cliente_.id", filterApontamentoQualidadePacking.getCliente()));
			countCriteria.add(Restrictions.eq("cliente_.id", filterApontamentoQualidadePacking.getCliente()));
		}
		if (filterApontamentoQualidadePacking.getPacking() != null) {
			searchCriteria.createAlias("packing", "packing_");
			countCriteria.createAlias("packing", "packing_");
			searchCriteria.add(Restrictions.eq("packing_.id", filterApontamentoQualidadePacking.getPacking()));
			countCriteria.add(Restrictions.eq("packing_.id", filterApontamentoQualidadePacking.getPacking()));
		}

		return new Paginator<ApontamentoQualidadePacking>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<ApontamentoQualidadePacking> filter(PaginationParams paginationParams) {
		List<ApontamentoQualidadePacking> list = new ArrayList<ApontamentoQualidadePacking>();
		FilterApontamentoQualidadePacking filterApontamentoQualidadePacking = (FilterApontamentoQualidadePacking) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterApontamentoQualidadePacking.getAparencia() != null) {
			searchCriteria.add(Restrictions.eq("aparencia", filterApontamentoQualidadePacking.getAparencia()));
		}
		if (filterApontamentoQualidadePacking.getDiametroMinimo() != null) {
			searchCriteria.add(Restrictions.eq("diametroMinimo", filterApontamentoQualidadePacking.getDiametroMinimo()));
		}
		if (filterApontamentoQualidadePacking.getDiametroMaximo() != null) {
			searchCriteria.add(Restrictions.eq("diametroMaximo", filterApontamentoQualidadePacking.getDiametroMaximo()));
		}
		if (filterApontamentoQualidadePacking.getDiametroMedio() != null) {
			searchCriteria.add(Restrictions.eq("diametroMedio", filterApontamentoQualidadePacking.getDiametroMedio()));
		}
		if (filterApontamentoQualidadePacking.getBrixMinimo() != null) {
			searchCriteria.add(Restrictions.eq("brixMinimo", filterApontamentoQualidadePacking.getBrixMinimo()));
		}
		if (filterApontamentoQualidadePacking.getBrixMaximo() != null) {
			searchCriteria.add(Restrictions.eq("brixMaximo", filterApontamentoQualidadePacking.getBrixMaximo()));
		}
		if (filterApontamentoQualidadePacking.getBrixMedio() != null) {
			searchCriteria.add(Restrictions.eq("brixMedio", filterApontamentoQualidadePacking.getBrixMedio()));
		}
		if (filterApontamentoQualidadePacking.getPesoCachoMinimo() != null) {
			searchCriteria.add(Restrictions.eq("pesoCachoMinimo", filterApontamentoQualidadePacking.getPesoCachoMinimo()));
		}
		if (filterApontamentoQualidadePacking.getPesoCachoMaximo() != null) {
			searchCriteria.add(Restrictions.eq("pesoCachoMaximo", filterApontamentoQualidadePacking.getPesoCachoMaximo()));
		}
		if (filterApontamentoQualidadePacking.getPesoSacolaMinimo() != null) {
			searchCriteria.add(Restrictions.eq("pesoSacolaMinimo", filterApontamentoQualidadePacking.getPesoSacolaMinimo()));
		}
		if (filterApontamentoQualidadePacking.getPesoSacolaMaximo() != null) {
			searchCriteria.add(Restrictions.eq("pesoSacolaMaximo", filterApontamentoQualidadePacking.getPesoSacolaMaximo()));
		}
		if (filterApontamentoQualidadePacking.getNumeroCachoSacola() != null) {
			searchCriteria.add(Restrictions.eq("numeroCachoSacola", filterApontamentoQualidadePacking.getNumeroCachoSacola()));
		}
		if (filterApontamentoQualidadePacking.getNumeroSacola() != null) {
			searchCriteria.add(Restrictions.eq("numeroSacola", filterApontamentoQualidadePacking.getNumeroSacola()));
		}
		if (filterApontamentoQualidadePacking.getPesoCumbucaMinimo() != null) {
			searchCriteria.add(Restrictions.eq("pesoCumbucaMinimo", filterApontamentoQualidadePacking.getPesoCumbucaMinimo()));
		}
		if (filterApontamentoQualidadePacking.getPesoCumbucaMaximo() != null) {
			searchCriteria.add(Restrictions.eq("pesoCumbucaMaximo", filterApontamentoQualidadePacking.getPesoCumbucaMaximo()));
		}
		if (filterApontamentoQualidadePacking.getNumeroCachosCumbuca() != null) {
			searchCriteria.add(Restrictions.eq("numeroCachosCumbuca", filterApontamentoQualidadePacking.getNumeroCachosCumbuca()));
		}
		if (filterApontamentoQualidadePacking.getNumeroCumbucas() != null) {
			searchCriteria.add(Restrictions.eq("numeroCumbucas", filterApontamentoQualidadePacking.getNumeroCumbucas()));
		}
		if (filterApontamentoQualidadePacking.getPesoBruto() != null) {
			searchCriteria.add(Restrictions.eq("pesoBruto", filterApontamentoQualidadePacking.getPesoBruto()));
		}
		if (filterApontamentoQualidadePacking.getPesoLiquido() != null) {
			searchCriteria.add(Restrictions.eq("pesoLiquido", filterApontamentoQualidadePacking.getPesoLiquido()));
		}
		if (filterApontamentoQualidadePacking.getCorposEstranhos() != null) {
			searchCriteria.add(Restrictions.eq("corposEstranhos", filterApontamentoQualidadePacking.getCorposEstranhos()));
		}
		if (filterApontamentoQualidadePacking.getBagasAquosas() != null) {
			searchCriteria.add(Restrictions.eq("bagasAquosas", filterApontamentoQualidadePacking.getBagasAquosas()));
		}
		if (filterApontamentoQualidadePacking.getBagasCristalinas() != null) {
			searchCriteria.add(Restrictions.eq("bagasCristalinas", filterApontamentoQualidadePacking.getBagasCristalinas()));
		}
		if (filterApontamentoQualidadePacking.getFirmeza() != null) {
			searchCriteria.add(Restrictions.eq("firmeza", filterApontamentoQualidadePacking.getFirmeza()));
		}
		if (filterApontamentoQualidadePacking.getDanos() != null) {
			searchCriteria.add(Restrictions.eq("danos", filterApontamentoQualidadePacking.getDanos()));
		}
		if (filterApontamentoQualidadePacking.getPragas() != null) {
			searchCriteria.add(Restrictions.eq("pragas", filterApontamentoQualidadePacking.getPragas()));
		}
		if (filterApontamentoQualidadePacking.getDoencas() != null) {
			searchCriteria.add(Restrictions.eq("doencas", filterApontamentoQualidadePacking.getDoencas()));
		}
		if (filterApontamentoQualidadePacking.getAparenciaEngaco() != null) {
			searchCriteria.add(Restrictions.eq("aparenciaEngaco", filterApontamentoQualidadePacking.getAparenciaEngaco()));
		}
		if (filterApontamentoQualidadePacking.getDesgrana() != null) {
			searchCriteria.add(Restrictions.eq("desgrana", filterApontamentoQualidadePacking.getDesgrana()));
		}
		if (filterApontamentoQualidadePacking.getPodridao() != null) {
			searchCriteria.add(Restrictions.eq("podridao", filterApontamentoQualidadePacking.getPodridao()));
		}
		if (filterApontamentoQualidadePacking.getCicatrizes() != null) {
			searchCriteria.add(Restrictions.eq("cicatrizes", filterApontamentoQualidadePacking.getCicatrizes()));
		}
		if (filterApontamentoQualidadePacking.getRachaduras() != null) {
			searchCriteria.add(Restrictions.eq("rachaduras", filterApontamentoQualidadePacking.getRachaduras()));
		}
		if (filterApontamentoQualidadePacking.getRachadurasCampo() != null) {
			searchCriteria.add(Restrictions.eq("rachadurasCampo", filterApontamentoQualidadePacking.getRachadurasCampo()));
		}
		if (filterApontamentoQualidadePacking.getAmolecimento() != null) {
			searchCriteria.add(Restrictions.eq("amolecimento", filterApontamentoQualidadePacking.getAmolecimento()));
		}
		if (filterApontamentoQualidadePacking.getObservacao() != null) {
			searchCriteria.add(Restrictions.eq("observacao", filterApontamentoQualidadePacking.getObservacao()));
		}
		if (filterApontamentoQualidadePacking.getDataHora() != null) {
			searchCriteria.add(Restrictions.eq("dataHora", filterApontamentoQualidadePacking.getDataHora()));
		}
		if (filterApontamentoQualidadePacking.getBolsao() != null) {
			searchCriteria.createAlias("bolsao", "bolsao_");
			searchCriteria.add(Restrictions.eq("bolsao_.id", filterApontamentoQualidadePacking.getBolsao()));
		}
		if (filterApontamentoQualidadePacking.getGenerador() != null) {
			searchCriteria.createAlias("generador", "generador_");
			searchCriteria.add(Restrictions.eq("generador_.id", filterApontamentoQualidadePacking.getGenerador()));
		}
		if (filterApontamentoQualidadePacking.getCor() != null) {
			searchCriteria.createAlias("cor", "cor_");
			searchCriteria.add(Restrictions.eq("cor_.id", filterApontamentoQualidadePacking.getCor()));
		}
		if (filterApontamentoQualidadePacking.getCargo() != null) {
			searchCriteria.createAlias("cargo", "cargo_");
			searchCriteria.add(Restrictions.eq("cargo_.id", filterApontamentoQualidadePacking.getCargo()));
		}
		if (filterApontamentoQualidadePacking.getVariedade() != null) {
			searchCriteria.createAlias("variedade", "variedade_");
			searchCriteria.add(Restrictions.eq("variedade_.id", filterApontamentoQualidadePacking.getVariedade()));
		}
		if (filterApontamentoQualidadePacking.getLatada() != null) {
			searchCriteria.createAlias("latada", "latada_");
			searchCriteria.add(Restrictions.eq("latada_.id", filterApontamentoQualidadePacking.getLatada()));
		}
		if (filterApontamentoQualidadePacking.getEmbalagem() != null) {
			searchCriteria.createAlias("embalagem", "embalagem_");
			searchCriteria.add(Restrictions.eq("embalagem_.id", filterApontamentoQualidadePacking.getEmbalagem()));
		}
		if (filterApontamentoQualidadePacking.getCabine() != null) {
			searchCriteria.createAlias("cabine", "cabine_");
			searchCriteria.add(Restrictions.eq("cabine_.id", filterApontamentoQualidadePacking.getCabine()));
		}
		if (filterApontamentoQualidadePacking.getSacola() != null) {
			searchCriteria.createAlias("sacola", "sacola_");
			searchCriteria.add(Restrictions.eq("sacola_.id", filterApontamentoQualidadePacking.getSacola()));
		}
		if (filterApontamentoQualidadePacking.getCliente() != null) {
			searchCriteria.createAlias("cliente", "cliente_");
			searchCriteria.add(Restrictions.eq("cliente_.id", filterApontamentoQualidadePacking.getCliente()));
		}
		if (filterApontamentoQualidadePacking.getPacking() != null) {
			searchCriteria.createAlias("packing", "packing_");
			searchCriteria.add(Restrictions.eq("packing_.id", filterApontamentoQualidadePacking.getPacking()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
