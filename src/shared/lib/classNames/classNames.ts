type classNameArgs = string | { [key: string]: boolean }

export function classNames(...args: classNameArgs[]): string {
  return args.map(el => {
    if (typeof el === 'string') {
      return el
    } else {
      for (var key in el) {
        if (el.hasOwnProperty(key) && !!el[key]) {
          return key
        }
    }
    }
  }).join(' ')
}