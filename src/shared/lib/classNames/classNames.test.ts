import { classNames } from './classNames';

describe('classNames', () => {
  test('with one class', () => {
    expect(classNames('someClass')).toBe('someClass');
  });
  test('with additional classes', () => {
    expect(classNames('', {}, ['class1', 'class2'])).toBe('class1 class2');
  });
  test('with every true mods', () => {
    expect(classNames('someClass', { hovered: true, focus: true })).toBe(
      'someClass hovered focus'
    );
  });
  test('with one false mod', () => {
    expect(classNames('someClass', { a: true, b: false })).toBe('someClass a');
  });
  test('with every false mods', () => {
    expect(classNames('someClass', { a: false, b: false })).toBe('someClass');
  });
});
