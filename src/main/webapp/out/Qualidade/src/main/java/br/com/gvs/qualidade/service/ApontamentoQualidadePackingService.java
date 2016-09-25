package br.com.gvs.qualidade.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gvs.qualidade.model.ApontamentoQualidadePacking;
import br.com.gvs.core.persistence.pagination.Pager;
import br.com.gvs.core.persistence.pagination.PaginationParams;
/**
*  generated: 24/09/2016 12:52:11
**/
public interface ApontamentoQualidadePackingService {

	ApontamentoQualidadePacking get(Integer id);

	List<ApontamentoQualidadePacking> all();
	
	Pager<ApontamentoQualidadePacking> all(PaginationParams paginationParams);

	List<ApontamentoQualidadePacking> filter(PaginationParams paginationParams);
	
	List<ApontamentoQualidadePacking> search(String searchText);

	ApontamentoQualidadePacking save(ApontamentoQualidadePacking entity);

	ApontamentoQualidadePacking update(ApontamentoQualidadePacking entity);
    List<ApontamentoQualidadePacking> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
