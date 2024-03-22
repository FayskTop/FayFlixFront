// Manipulação de Strings
export function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
  
  export function escapeSpecialCharacters(text) {
    return text.replace(/[&<>"'`=\/]/g, function (match) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
      }[match];
    });
  }
  
  export function isEmptyString(text) {
    return !text.trim();
  }
  
  // Manipulação de Datas
  export function formatDate(date) {
    // Implemente a lógica de formatação de data aqui
  }
  
  export function dateDiffInDays(date1, date2) {
    // Implemente a lógica de diferença entre datas aqui
  }
  
  export function isValidDate(date) {
    // Implemente a lógica de validação de data aqui
  }
  
  // Validador de Entradas
  export function validateEmail(email) {
    // Implemente a lógica de validação de e-mail aqui
  }
  
  export function validatePhoneNumber(phoneNumber) {
    // Implemente a lógica de validação de número de telefone aqui
  }
  
  export function validateURL(url) {
    // Implemente a lógica de validação de URL aqui
  }
  
  // Manipulação de Arrays e Objetos
  export function sortArrayOfObjects(array, key) {
    // Implemente a lógica de ordenação de array de objetos aqui
  }
  
  export function filterArrayOfObjects(array, condition) {
    // Implemente a lógica de filtragem de array de objetos aqui
  }
  
  export function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  
  export function mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
  }
  
  // Manipulação de Números
  export function formatNumber(number) {
    // Implemente a lógica de formatação de número aqui
  }
  
  export function roundNumber(number, decimalPlaces) {
    // Implemente a lógica de arredondamento de número aqui
  }
  
  export function addThousandSeparators(number) {
    // Implemente a lógica de adição de separadores de milhares aqui
  }
  
  // Outras Utilidades
  export function makeHTTPRequest(url, options) {
    // Implemente a lógica de fazer requisições HTTP aqui
  }
  
  export function setCookie(name, value, days) {
    // Implemente a lógica de definir um cookie aqui
  }
  
  export function generateUniqueID() {
    // Implemente a lógica de gerar um ID único aqui
  }