export function string_to_slug(str: string) {
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

export function empty_string_to_null(value: any): any {
  if (typeof value !== "string")
    return value;
  if (value.length === 0) {
    return undefined;
  }
  return value;
}


export function object_empty_string_to_null<Type extends object>(obj: Type): Type {
  for (const key of Object.keys(obj)) {
    obj[key as keyof Type] = empty_string_to_null(obj[key as keyof Type]);
  }
  return obj;
}
