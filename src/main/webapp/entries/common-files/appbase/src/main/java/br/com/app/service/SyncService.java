package ${application.corePackage}.service;

import java.util.List;


import javax.inject.Inject;
import javax.inject.Named;

import ${application.corePackage}.model.SyncInfo;
import ${application.corePackage}.json.*;
import ${application.corePackage}.model.*;
import ${application.corePackage}.persistence.DaoSyncInfo;
import ${application.corePackage}.json.DtoDataBase;

public interface SyncService {
		public DtoDataBase sync(DtoDataBase dataBase) ;
}
