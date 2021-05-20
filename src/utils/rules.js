export const tel = (value) => value.match(/^0\d{2}-\d{3}-\d{4}$/) || value.match(/^0\d{9,10}$/);

export const zipCode = (val) => val.match(/^(\d{7}|\(\d{3}-\d{4}\))$/);

export const fax = (val) => val.match(/^(\+?\d{1,}(\s?|-?)\d*(\s?|-?)\(?\d{2,}\)?(\s?|-?)\d{3,}\s?\d{3,})$/);