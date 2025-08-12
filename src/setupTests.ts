// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Configuración global para los tests de estructura
global.console = {
  ...console,
  log: console.log, // Mantener logs para debugging
  warn: console.warn, // Mantener warnings
  error: console.error, // Mantener errors
};
