package br.com.c3pgen.service;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import br.com.c3pgen.model.SyncInfo;
import br.com.c3pgen.json.*;
import br.com.c3pgen.model.*;
import br.com.c3pgen.persistence.DaoSyncInfo;
import br.com.c3pgen.json.DtoDataBase;

public interface SyncService {
		public DtoDataBase sync(DtoDataBase dataBase) ;
}
