package br.com.c3pgen.helper;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Root;

@Root(name = "TABLE", strict = false)
public class Table {

	@ElementList(name = "COLUMNS", required = false)
	private Collection<Column> columns;

	@ElementList(name = "RELATIONS_START", type = RelationStart.class, required = false)
	private List<RelationStart> relationsStart;

	@ElementList(name = "RELATIONS_END", type = RelationEnd.class, required = false)
	private List<RelationEnd> relationsEnd;

	@Attribute(name = "Tablename", required = false)
	private String tablename;

	@Attribute(name = "UseStandardInserts", required = false)
	private String useStandardInserts;

	@Attribute(name = "Comments", required = false)
	private String comments;

	@Attribute(name = "YPos", required = false)
	private String yPos;

	@Attribute(name = "IDLinkedModel", required = false)
	private String idLinkedModel;

	@Attribute(name = "IsLinkedObject", required = false)
	private String isLinkedObject;

	@Attribute(name = "StandardInserts", required = false)
	private String standardInserts;

	@Attribute(name = "OrderPos", required = false)
	private String orderPos;

	@Attribute(name = "nmTable", required = false)
	private String nomeTable;

	@Attribute(name = "Temporary", required = false)
	private String temporary;

	@Attribute(name = "Obj_id_Linked", required = false)
	private String obj_id_Linked;

	@Attribute(name = "TableOptions", required = false)
	private String tableOptions;

	@Attribute(name = "TablePrefix", required = false)
	private String tablePrefix;

	@Attribute(name = "Collapsed", required = false)
	private String collapsed;

	@Attribute(name = "PrevTableName", required = false)
	private String prevTableName;

	@Attribute(name = "ID", required = false)
	private String id;

	@Attribute(name = "XPos", required = false)
	private String xPos;

	@Attribute(name = "TableType", required = false)
	private String tableType;

	public List<RelationStart> getRelationsStart() {
		if (relationsStart == null) {
			setRelationsStart(new ArrayList<RelationStart>());
		}
		return relationsStart;
	}

	public void setRelationsStart(List<RelationStart> relationsStart) {
		this.relationsStart = relationsStart;
	}

	public List<RelationEnd> getRelationsEnd() {
		if (relationsEnd == null) {
			setRelationsEnd(new ArrayList<RelationEnd>());
		}
		return relationsEnd;
	}

	public void setRelationsEnd(List<RelationEnd> relationsEnd) {
		this.relationsEnd = relationsEnd;
	}

	public String getTablename() {
		return tablename;
	}

	public void setTablename(String tablename) {
		this.tablename = tablename;
	}

	public String getUseStandardInserts() {
		return useStandardInserts;
	}

	public void setUseStandardInserts(String useStandardInserts) {
		this.useStandardInserts = useStandardInserts;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getyPos() {
		return yPos;
	}

	public void setyPos(String yPos) {
		this.yPos = yPos;
	}

	public String getIdLinkedModel() {
		return idLinkedModel;
	}

	public void setIdLinkedModel(String idLinkedModel) {
		this.idLinkedModel = idLinkedModel;
	}

	public String getIsLinkedObject() {
		return isLinkedObject;
	}

	public void setIsLinkedObject(String isLinkedObject) {
		this.isLinkedObject = isLinkedObject;
	}

	public String getStandardInserts() {
		return standardInserts;
	}

	public void setStandardInserts(String standardInserts) {
		this.standardInserts = standardInserts;
	}

	public String getOrderPos() {
		return orderPos;
	}

	public void setOrderPos(String orderPos) {
		this.orderPos = orderPos;
	}

	public String getNomeTable() {
		return nomeTable;
	}

	public void setNomeTable(String nomeTable) {
		this.nomeTable = nomeTable;
	}

	public String getTemporary() {
		return temporary;
	}

	public void setTemporary(String temporary) {
		this.temporary = temporary;
	}

	public String getObj_id_Linked() {
		return obj_id_Linked;
	}

	public void setObj_id_Linked(String obj_id_Linked) {
		this.obj_id_Linked = obj_id_Linked;
	}

	public String getTableOptions() {
		return tableOptions;
	}

	public void setTableOptions(String tableOptions) {
		this.tableOptions = tableOptions;
	}

	public String getTablePrefix() {
		return tablePrefix;
	}

	public void setTablePrefix(String tablePrefix) {
		this.tablePrefix = tablePrefix;
	}

	public String getCollapsed() {
		return collapsed;
	}

	public void setCollapsed(String collapsed) {
		this.collapsed = collapsed;
	}

	public String getPrevTableName() {
		return prevTableName;
	}

	public void setPrevTableName(String prevTableName) {
		this.prevTableName = prevTableName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getxPos() {
		return xPos;
	}

	public void setxPos(String xPos) {
		this.xPos = xPos;
	}

	public String getTableType() {
		return tableType;
	}

	public void setTableType(String tableType) {
		this.tableType = tableType;
	}

	public Collection<Column> getColumns() {
		return columns;
	}

	public void setColumns(Collection<Column> columns) {
		this.columns = columns;
	}

	@Override
	public String toString() {
		return "Table [" + id + " = " + tablename + " [ " + columns + " ]";
	}
}