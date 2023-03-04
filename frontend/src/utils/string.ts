export function stringToSlug(str: string) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

export function trim(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

export function emptyStringToNull(value: any): any {
  if (typeof value !== "string")
    return value;
  const valueTrimed = trim(value)
  if (valueTrimed.length === 0) {
    return undefined;
  }
  return value;
}

export function objectEmptyStringToNull<Type extends object>(obj: Type): Type {
  for (const key of Object.keys(obj)) {
    obj[key as keyof Type] = emptyStringToNull(obj[key as keyof Type]);
  }
  return obj;
}
