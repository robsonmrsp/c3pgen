package br.com.c3pgen.helper;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Root;

@Root(name = "RELATION", strict = false)
public class Relation {
	@Attribute(name = "relDirection")
	private String relDirection;

	@Attribute(name = "StartIntervalOffsetY")
	private String startIntervalOffsetY;

	@Attribute(name = "StartIntervalOffsetX")
	private String startIntervalOffsetX;

	@Attribute(name = "IsLinkedObject")
	private String isLinkedObject;

	@Attribute(name = "DestTable")
	private String destTable;

	@Attribute(name = "OrderPos")
	private String orderPos;

	@Attribute(name = "OptionalEnd")
	private String optionalEnd;

	@Attribute(name = "FKFieldsComments")
	private String fkFieldsComments;

	@Attribute(name = "Kind")
	private String kind;

	@Attribute(name = "Obj_id_Linked")
	private String obj_id_Linked;

	@Attribute(name = "Invisible")
	private String invisible;

	@Attribute(name = "ID")
	private String id;

	@Attribute(name = "CreateRefDef")
	private String createRefDef;

	@Attribute(name = "CaptionOffsetX")
	private String captionOffsetX;

	@Attribute(name = "RefDef")
	private String refDef;

	@Attribute(name = "MidOffset")
	private String midOffset;

	@Attribute(name = "FKRefDefIndex_Obj_id")
	private String fkRefDefIndex_Obj_id;

	@Attribute(name = "SrcTable")
	private String srcTable;

	@Attribute(name = "RelationName")
	private String relationName;

	@Attribute(name = "Comments")
	private String Comments;

	@Attribute(name = "FKFields")
	private String fkFields;

	@Attribute(name = "IDLinkedModel")
	private String idLinkedModel;

	@Attribute(name = "OptionalStart")
	private String optionalStart;

	@Attribute(name = "CaptionOffsetY")
	private String captionOffsetY;

	@Attribute(name = "EndIntervalOffsetX")
	private String endIntervalOffsetX;

	@Attribute(name = "EndIntervalOffsetY")
	private String endIntervalOffsetY;

	@Attribute(name = "Splitted")
	private String splitted;

	public String getRelDirection() {
		return relDirection;
	}

	public void setRelDirection(String relDirection) {
		this.relDirection = relDirection;
	}

	public String getStartIntervalOffsetY() {
		return startIntervalOffsetY;
	}

	public void setStartIntervalOffsetY(String startIntervalOffsetY) {
		this.startIntervalOffsetY = startIntervalOffsetY;
	}

	public String getStartIntervalOffsetX() {
		return startIntervalOffsetX;
	}

	public void setStartIntervalOffsetX(String startIntervalOffsetX) {
		this.startIntervalOffsetX = startIntervalOffsetX;
	}

	public String getIsLinkedObject() {
		return isLinkedObject;
	}

	public void setIsLinkedObject(String isLinkedObject) {
		this.isLinkedObject = isLinkedObject;
	}

	public String getDestTable() {
		return destTable;
	}

	public void setDestTable(String destTable) {
		this.destTable = destTable;
	}

	public String getOrderPos() {
		return orderPos;
	}

	public void setOrderPos(String orderPos) {
		this.orderPos = orderPos;
	}

	public String getOptionalEnd() {
		return optionalEnd;
	}

	public void setOptionalEnd(String optionalEnd) {
		this.optionalEnd = optionalEnd;
	}

	public String getFkFieldsComments() {
		return fkFieldsComments;
	}

	public void setFkFieldsComments(String fkFieldsComments) {
		this.fkFieldsComments = fkFieldsComments;
	}

	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		this.kind = kind;
	}

	public String getObj_id_Linked() {
		return obj_id_Linked;
	}

	public void setObj_id_Linked(String obj_id_Linked) {
		this.obj_id_Linked = obj_id_Linked;
	}

	public String getInvisible() {
		return invisible;
	}

	public void setInvisible(String invisible) {
		this.invisible = invisible;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCreateRefDef() {
		return createRefDef;
	}

	public void setCreateRefDef(String createRefDef) {
		this.createRefDef = createRefDef;
	}

	public String getCaptionOffsetX() {
		return captionOffsetX;
	}

	public void setCaptionOffsetX(String captionOffsetX) {
		this.captionOffsetX = captionOffsetX;
	}

	public String getRefDef() {
		return refDef;
	}

	public void setRefDef(String refDef) {
		this.refDef = refDef;
	}

	public String getMidOffset() {
		return midOffset;
	}

	public void setMidOffset(String midOffset) {
		this.midOffset = midOffset;
	}

	public String getFkRefDefIndex_Obj_id() {
		return fkRefDefIndex_Obj_id;
	}

	public void setFkRefDefIndex_Obj_id(String fkRefDefIndex_Obj_id) {
		this.fkRefDefIndex_Obj_id = fkRefDefIndex_Obj_id;
	}

	public String getSrcTable() {
		return srcTable;
	}

	public void setSrcTable(String srcTable) {
		this.srcTable = srcTable;
	}

	public String getRelationName() {
		return relationName;
	}

	public void setRelationName(String relationName) {
		this.relationName = relationName;
	}

	public String getComments() {
		return Comments;
	}

	public void setComments(String comments) {
		Comments = comments;
	}

	public String getFkFields() {
		return fkFields;
	}

	public void setFkFields(String fkFields) {
		this.fkFields = fkFields;
	}

	public String getIdLinkedModel() {
		return idLinkedModel;
	}

	public void setIdLinkedModel(String idLinkedModel) {
		this.idLinkedModel = idLinkedModel;
	}

	public String getOptionalStart() {
		return optionalStart;
	}

	public void setOptionalStart(String optionalStart) {
		this.optionalStart = optionalStart;
	}

	public String getCaptionOffsetY() {
		return captionOffsetY;
	}

	public void setCaptionOffsetY(String captionOffsetY) {
		this.captionOffsetY = captionOffsetY;
	}

	public String getEndIntervalOffsetX() {
		return endIntervalOffsetX;
	}

	public void setEndIntervalOffsetX(String endIntervalOffsetX) {
		this.endIntervalOffsetX = endIntervalOffsetX;
	}

	public String getEndIntervalOffsetY() {
		return endIntervalOffsetY;
	}

	public void setEndIntervalOffsetY(String endIntervalOffsetY) {
		this.endIntervalOffsetY = endIntervalOffsetY;
	}

	public String getSplitted() {
		return splitted;
	}

	public void setSplitted(String splitted) {
		this.splitted = splitted;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Relation other = (Relation) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Relation [id=" + id + ", fkFields=" + fkFields + "]";
	}

}
