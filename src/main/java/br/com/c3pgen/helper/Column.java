package br.com.c3pgen.helper;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Root;
import org.simpleframework.xml.Transient;
import org.simpleframework.xml.convert.Convert;

@Root(name = "COLUMN", strict = false)
public class Column {

	@Attribute(name = "Comments")
	private String comments;

	@Attribute(name = "IsForeignKey")
	private String isForeignKey;

	@Attribute(name = "DefaultValue")
	private String defaultValue;

	@Attribute(name = "AutoInc")
	private String autoInc;

	@Attribute(name = "Prec")
	private String prec;

	@Attribute(name = "PrevColName")
	private String prevColName;

	@Attribute(name = "ColName")
	private String colName;

	@Attribute(name = "Pos")
	private String pos;

	@Attribute(name = "DatatypeParams")
	private String datatypeParams;

	@Attribute(name = "idDatatype")
	private String idDatatype;

	@Transient
	private DataType dataType;

	@Attribute(name = "NotNull", required = false)
	private String notNull;

	@Attribute(name = "ID")
	private String id;

	@Attribute(name = "PrimaryKey")
	private String primaryKey;

	@Attribute(name = "Width")
	private String width;

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getIsForeignKey() {
		return isForeignKey;
	}

	public void setIsForeignKey(String isForeignKey) {
		this.isForeignKey = isForeignKey;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public String getAutoInc() {
		return autoInc;
	}

	public void setAutoInc(String autoInc) {
		this.autoInc = autoInc;
	}

	public String getPrec() {
		return prec;
	}

	public void setPrec(String prec) {
		this.prec = prec;
	}

	public String getPrevColName() {
		return prevColName;
	}

	public void setPrevColName(String prevColName) {
		this.prevColName = prevColName;
	}

	public String getColName() {
		return colName;
	}

	public void setColName(String colName) {
		this.colName = colName;
	}

	public String getPos() {
		return pos;
	}

	public void setPos(String pos) {
		this.pos = pos;
	}

	public String getDatatypeParams() {
		return datatypeParams;
	}

	public void setDatatypeParams(String datatypeParams) {
		this.datatypeParams = datatypeParams;
	}

	public String getIdDatatype() {
		return idDatatype;
	}

	public void setIdDatatype(String idDatatype) {
		this.idDatatype = idDatatype;
	}

	public String getNotNull() {
		return notNull;
	}

	public void setNotNull(String notNull) {
		this.notNull = notNull;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPrimaryKey() {
		return primaryKey;
	}

	public void setPrimaryKey(String primaryKey) {
		this.primaryKey = primaryKey;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	public DataType getDataType() {
		return DataType.fromCode(idDatatype);
	}

	public void setDataType(DataType dataType) {
		this.dataType = dataType;
	}

	public Boolean isNotKey() {
		return primaryKey.equals("0") && isForeignKey.equals("0");
	}

	@Override
	public String toString() {
		return colName + " -> " + getDataType().getDescricao();
	}

}
