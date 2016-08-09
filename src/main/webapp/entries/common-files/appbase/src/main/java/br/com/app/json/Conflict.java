package ${application.corePackage}.json;

public class Conflict<T> {

	private T changedByMe;
	private T changedByOther;

	public Conflict(T changedByMe, T changedByOther) {
		this.changedByMe = changedByMe;
		this.changedByOther = changedByOther;
	}

	public T getChangedByMe() {
		return changedByMe;
	}

	public void setChangedByMe(T changedByMe) {
		this.changedByMe = changedByMe;
	}

	public T getChangedByOther() {
		return changedByOther;
	}

	public void setChangedByOther(T changedByOther) {
		this.changedByOther = changedByOther;
	}

}
