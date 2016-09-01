package br.com.c3pgen.helper;

public enum DataType {

	SMALLINT("2", "SMALLINT", "Integer"), MEDIUMINT("3", "MEDIUMINT", "Integer"), INT("4", "INT", "Integer"), INTEGER("5", "INTEGER", "Integer"), BIGINT("6", "BIGINT", "Long"), FLOAT("7", "FLOAT", "Double"), FLOAT_("8", "FLOAT", "Double"), DOUBLE("9", "DOUBLE", "Double"), DOUBLE_PRECISION(
			"10", "DOUBLE PRECISION", "Double"), REAL("11", "REAL", "Double"), DECIMAL("12", "DECIMAL", "Double"), NUMERIC("13", "NUMERIC", "Double"), DATE("14", "DATE", "Date"), DATETIME("15", "DATETIME", "Datetime"), TIMESTAMP("16", "TIMESTAMP", "Datetime"), TIME("17", "TIME",
			"Datetime"), YEAR("18", "YEAR", "Datetime"), CHAR("19", "CHAR", "String"), VARCHAR("20", "VARCHAR", "String"), BIT("21", "BIT", "Boolean"), BOOL("22", "BOOL", "Boolean"), TINYBLOB("23", "TINYBLOB", "String"), BLOB("24", "BLOB", "String"), MEDIUMBLOB("25",
			"MEDIUMBLOB", "String"), LONGBLOB("26", "LONGBLOB", "String"), TINYTEXT("27", "TINYTEXT", "String"), TEXT("28", "TEXT", "String"), MEDIUMTEXT("29", "MEDIUMTEXT", "String"), LONGTEXT("30", "LONGTEXT", "String"), ENUM("31", "ENUM", "String"), SET("32", "SET", "String"), Varchar_20(
			"33", "Varchar(20)", "String"), Varchar_45("34", "Varchar(45)", "String"), Varchar_255("35", "Varchar(255)", "String"), GEOMETRY("36", "GEOMETRY", "String"), LINESTRING("38", "LINESTRING", "String"), POLYGON("39", "POLYGON", "String"), MULTIPOINT("40", "MULTIPOINT",
			"String"), MULTILINESTRING("41", "MULTILINESTRING", "String"), MULTIPOLYGON("42", "MULTIPOLYGON", "String"), GEOMETRYCOLLECTION("43", "GEOMETRYCOLLECTION", "String");

	private String descricao;
	private String realName;
	private String code;

	private DataType(String a, String b, String c) {
		this.setCode(a);
		this.setRealName(b);
		this.setDescricao(c);
	}

	public static DataType fromCode(String code) {

		for (DataType data : values()) {
			if (data.getCode().equals(code)) {
				return data;
			}
		}
		return VARCHAR;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
}
