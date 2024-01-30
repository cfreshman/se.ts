export const sets = {
  new: <T>(xs:T[]=[]): Set<T> => new Set(xs),
  empty: (): Set<unknown> => new Set(),
  equal: <T>(a: Set<T>, b: Set<T>): boolean => {
    return sets.subset(a, b) && sets.superset(a, b)
  },
  union: <T>(...xs: Set<T>[]): Set<T> => {
    const output = sets.new<T>()
    // xs.map(x => Array.from(x).map(element => output.add(element)))
    sets.mut.update(output, ...xs)
    return output
  },
  intersection: <T>(...xs: Set<T>[]): Set<T> => {
    const output = sets.new<T>()
    const a = xs[0]
    const bs = xs.slice(1)
    Array.from(a).map(element => {
      if (bs.every(b => b.has(element))) {
        output.add(element)
      }
    })
    return output
  },
  difference: <T>(set: Set<T>, ...others: Set<T>[]): Set<T> => {
    const output = sets.new<T>()
    Array.from(set).map(x => {
      if (!others.some(other => other.has(x))) {
        output.add(x)
      }
    })
    return output
  },
  symmetric: <T>(...xs: Set<T>[]): Set<T> => {
    const differences = []
    for (let i = 0; i < xs.length; i++) {
      const others = xs.slice(0, i).concat(xs.slice(i + 1))
      differences.push(sets.difference(xs[i], ...others))
    }
    return sets.union(...differences)
  },
  disjoint: <T>(...xs: Set<T>[]): boolean => {
    return sets.intersection(...xs).size === 0
  },
  subset: <T>(a: Set<T>, b: Set<T>): boolean => {
    return Array.from(a).every(x => b.has(x))
  },
  superset: <T>(a: Set<T>, b: Set<T>): boolean => {
    return Array.from(b).every(x => a.has(x))
  },
  peek:  <T>(x: Set<T>): T => {
    const array_x = Array.from(x)
    const element = array_x[Math.floor(Math.random() * array_x.length)]
    return element
  },
  mut: {
    clear: <T>(x: Set<T>): Set<T> => {
      x.clear()
      return x
    },
    update: <T>(set: Set<T>, ...others: Set<T>[]): Set<T> => {
      others.map(other => Array.from(other).map(element => set.add(element)))
      return set
    },
    difference: <T>(set: Set<T>, ...others: Set<T>[]): Set<T> => {
      others.map(other => Array.from(other).map(element => set.delete(element)))
      return set
    },
    pop: <T>(x: Set<T>): T => {
      const element = sets.peek(x)
      x.delete(element)
      return element
    },
  },
  array:  <T>(x: Set<T>): T[] => {
    return Array.from(x)
  },
}
