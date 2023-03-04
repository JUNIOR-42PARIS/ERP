export type ValidationReturnType = string | true;

const chiffres = "0123456789";

export function isValidSiren(optionnal: boolean = false): (value: string) => ValidationReturnType {
  return function(value: string) {
    if (value.length === 0 && optionnal === true) {
      return true;
    }
    if (value.length !== 15 || value.split("").some((letter) => !chiffres.includes(letter))) {
      return "Le SIREN doit être composé de 15 chiffres";
    }
    return true;
  };
}

export function isNameTextLengthValid(min = 1, max = 50): (value: string) => ValidationReturnType {
  return function(value: string) {
    if (value.length < min) {
      return `Le texte est trop court (au moins ${min} caractères)`;
    }
    if (value.length >= max) {
      return `Le texte est trop long (au max. ${max} caractères)`;
    }
    return true;
  };
}