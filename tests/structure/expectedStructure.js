export const EXPECTED_STRUCTURE = {
  core: {
    // Carpeta shared con sus subcarpetas
    shared: {
      requiredFolders: ['common', 'forms', 'views', 'cards'],
      optionalFiles: ['index.ts', 'index.js']
    },
    
    // Módulos que deben existir dinámicamente
    modules: {
      // Estructura base que debe tener cada módulo (sin importar el nombre)
      requiredFolders: [
        'components',
        'validations', 
        'hooks',
        'services',
        'types',
        'utils',
        'contexts',
        'constants'
      ],
      
      // Subcarpetas que debe tener components/ en cualquier módulo
      // Estas se validarán dinámicamente para cada módulo encontrado
      componentsSubfolders: {
        // Mínimo requerido para cualquier módulo
        required: ['common'],
        // Opcionales pero válidos
        optional: ['forms', 'views', 'cards', 'widgets', 'charts', 'lists', 'helpers']
      },
      
      // Archivos index que deben existir
      indexFiles: ['components/index.ts', 'components/index.js']
    }
  }
};

// Configuración de testing
export const TESTING_CONFIG = {
  // Si debe validar archivos específicos o solo carpetas
  validateSpecificFiles: false, // Solo validamos estructura de carpetas
  
  // Si debe ser estricto con los nombres de archivos
  strictFileNames: false,
  
  // Extensiones de archivo permitidas para index files
  allowedExtensions: ['.ts', '.tsx', '.js', '.jsx'],
  
  // Patrones de archivos que se pueden ignorar
  ignorePatterns: ['.DS_Store', 'Thumbs.db', '*.log'],
  
  // Configuración de módulos dinámicos
  dynamicModules: {
    // Carpetas que NO son módulos (se excluyen del análisis)
    excludeFolders: ['shared'],
    
    // Mínimo número de carpetas requeridas para considerar algo como módulo
    minimumRequiredFolders: 8, // TODAS las 8 carpetas deben existir
    
    // Si debe validar que components/ tenga al menos una subcarpeta
    requireComponentsSubfolders: true,
    
    // Número mínimo de subcarpetas en components/
    minimumComponentsSubfolders: 1
  }
};
