
export const isRequired = (message) => {
  return message || "Campo Obrigatório";
}


export const mustMatch = (otherFieldName) => {
  return (fieldName) => `${fieldName} must match ${otherFieldName}`;
};

export const minLength = length => {
  return (fieldName) => `${fieldName} must be at least ${length} characters`;
}; 
