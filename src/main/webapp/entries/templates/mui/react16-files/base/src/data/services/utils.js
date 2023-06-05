export const money = (value) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const translateDay = (day) => {
  switch (day) {
    case 'MONDAY': {
      return 'Segunda';
    }
    case 'TUESDAY': {
      return 'Terça';
    }
    case 'WEDNESDAY': {
      return 'Quarta';
    }
    case 'THURSDAY': {
      return 'Quinta';
    }
    case 'FRIDAY': {
      return 'Sexta';
    }
    case 'SATURDAY': {
      return 'Sábado';
    }
    case 'SUNDAY': {
      return 'Domingo';
    }
    default: {
      console.log('Dia não encontrado.');
      return day;
    }
  }
};
