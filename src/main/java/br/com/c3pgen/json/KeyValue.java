package br.com.c3pgen.json;

public class KeyValue {

	private String key;
	private Object value;

	public KeyValue(String key, Object value) {
		super();
		this.setValue(value);
		this.setKey(key);
	}

	public static KeyValue instance(String k, Object v) {
		return new KeyValue(k, v);
	}

	public Object getValue() {
		return value;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public void setValue(Object value) {
		this.value = value;
	}
}
