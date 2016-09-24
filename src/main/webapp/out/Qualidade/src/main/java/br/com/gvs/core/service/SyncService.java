package br.com.gvs.core.service;

import java.util.List;


import javax.inject.Inject;
import javax.inject.Named;

import br.com.gvs.core.model.SyncInfo;
import br.com.gvs.core.json.*;
import br.com.gvs.core.model.*;
import br.com.gvs.core.persistence.DaoSyncInfo;
import br.com.gvs.core.json.DtoDataBase;

public interface SyncService {
		public DtoDataBase sync(DtoDataBase dataBase) ;
}
