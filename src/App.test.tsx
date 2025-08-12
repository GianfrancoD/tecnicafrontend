import { render, screen } from '@testing-library/react';
import App from './App';

test('renders application without crashing', () => {
  render(<App />);
  // La aplicación debería renderizar sin errores
  // Verificamos que el elemento principal esté presente
  const appElement = document.querySelector('.App');
  expect(appElement).toBeInTheDocument();
});
