package ${application.rootPackage}.service;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import ${application.rootPackage}.model.SyncInfo;
import ${application.rootPackage}.json.*;
import ${application.rootPackage}.model.*;
import ${application.rootPackage}.persistence.DaoSyncInfo;
import ${application.rootPackage}.json.DtoDataBase;

public interface SyncService {
		public DtoDataBase sync(DtoDataBase dataBase) ;
}
