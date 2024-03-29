import { sets } from '../src/index'

test('new empty set', () => {
  const x = sets.empty()
  expect(x.size).toBe(0)
  expect(x.size).toBe(sets.new().size)
  expect(x).toStrictEqual(new Set())
})

test('new set', () => {
  const x = sets.new([1, 2, 3, 2])
  expect(x.size).toBe(3)
  expect(x).toStrictEqual(new Set([1, 2, 3]))
})

test('equal', () => {
  const x = sets.new([1, 2, 3, 2])
  const y = sets.new([1, 1, 2, 3])
  const z = sets.new([1, 2, 1, 2])
  expect(sets.equal(x, y)).toBe(true)
  expect(sets.equal(x, z)).toBe(false)
})

test('union', () => {
  const x = sets.new([1, 2])
  const y = sets.new([3])
  const z = sets.new([1, 2, 3])
  expect(sets.equal(sets.union(x, y), z)).toBe(true)
})

test('intersection', () => {
  const x = sets.new([1, 2])
  const y = sets.new([3])
  const z = sets.new([1, 2, 3])
  expect(sets.equal(sets.intersection(x, z), x)).toBe(true)
  expect(sets.equal(sets.intersection(x, y, z), sets.empty())).toBe(true)
})

test('difference', () => {
  const x = sets.new([1, 2])
  const y = sets.new([3])
  const z = sets.new([1, 2, 3])
  expect(sets.equal(sets.difference(z, x), y)).toBe(true)
  expect(sets.equal(sets.difference(z, y), x)).toBe(true)
  expect(sets.equal(sets.difference(z, x, y), sets.empty())).toBe(true)
})

test('symmetric', () => {
  const x = sets.new([1, 2])
  const y = sets.new([3])
  const z = sets.new([1, 2, 3])
  expect(sets.equal(sets.symmetric(x, y), z)).toBe(true)
  expect(sets.equal(sets.symmetric(x, z), sets.new([3]))).toBe(true)
})

test('disjoint', () => {
  const x = sets.new([1, 2])
  const y = sets.new([3])
  const z = sets.new([1, 2, 3])
  expect(sets.disjoint(x, y)).toBe(true)
  expect(sets.disjoint(x, z)).toBe(false)
  expect(sets.disjoint(sets.new([1]), sets.new([2]), sets.new([3]))).toBe(true)
})

test('subset', () => {
  const x = sets.new([1, 2])
  const y = sets.new([1, 2, 3])
  const z = sets.new([1, 2])
  expect(sets.subset(x, y)).toBe(true)
  expect(sets.subset(y, x)).toBe(false)
  expect(sets.subset(x, z)).toBe(true)
})

test('superset', () => {
  const x = sets.new([1, 2])
  const y = sets.new([1, 2, 3])
  const z = sets.new([1, 2])
  expect(sets.superset(y, x)).toBe(true)
  expect(sets.superset(x, y)).toBe(false)
  expect(sets.superset(x, z)).toBe(true)
})

test('peek', () => {
  const x = sets.new([1])
  expect(sets.peek(x)).toBe(1)
})

test('mut clear', () => {
  const x = sets.new([1, 2, 3])
  expect(x.size).toBe(3)
  sets.mut.clear(x)
  expect(x.size).toBe(0)
})

test('mut update', () => {
  const x = sets.new([1, 2])
  const y = sets.new([3])
  const z = sets.new([1, 2, 3])
  expect(x.size).toBe(2)
  sets.mut.update(x, y)
  expect(x.size).toBe(3)
  expect(sets.equal(x, z)).toBe(true)
})

test('mut difference', () => {
  const x = sets.new([1, 2])
  const y = sets.new([3])
  const z = sets.new([1, 2, 3])
  expect(z.size).toBe(3)
  sets.mut.difference(z, y)
  expect(z.size).toBe(2)
  expect(sets.equal(x, z)).toBe(true)
})

test('mut pop', () => {
  const x = sets.new([1])
  expect(x.size).toBe(1)
  expect(sets.mut.pop(x)).toBe(1)
  expect(x.size).toBe(0)
})

test('array', () => {
  const x = sets.new([1])
  expect(sets.array(x)).toStrictEqual([1])
})
