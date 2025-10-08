import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { DynamicStructureValidator } from './structureValidator.js';

describe('🏗️  Validación Dinámica de Estructura Core', () => {
  let validator;
  let results;

  beforeAll(() => {
    validator = new DynamicStructureValidator();
    results = validator.validateCompleteStructure();
  });

  describe('Core Structure', () => {
    it('debe existir la carpeta core en src/', () => {
      expect(results.core.valid).toBe(true);
      if (!results.core.valid) {
        console.error('Errores en core:', results.core.errors);
      }
    });
  });

  describe('Shared Structure', () => {
    it('debe existir la carpeta shared en core/', () => {
      expect(results.shared.valid).toBe(true);
      if (!results.shared.valid) {
        console.error('Errores en shared:', results.shared.errors);
      }
    });

    it('shared debe tener las subcarpetas requeridas', () => {
      const requiredFolders = ['common', 'forms', 'views', 'cards'];
      const foundFolders = results.shared.foundFolders || [];
      
      requiredFolders.forEach(folder => {
        expect(foundFolders).toContain(folder);
      });
    });
  });

  describe('Dynamic Module Discovery', () => {
    it('debe encontrar al menos un módulo', () => {
      expect(results.modules.discovered.length).toBeGreaterThan(0);
      console.log('📦 Módulos descubiertos:', results.modules.discovered);
    });

    it('todos los módulos encontrados deben tener nombres válidos', () => {
      results.modules.discovered.forEach(moduleName => {
        expect(moduleName).toBeTruthy();
        expect(typeof moduleName).toBe('string');
        expect(moduleName.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Module Structure Validation', () => {
    it('cada módulo debe tener la estructura básica requerida', () => {
      const moduleValidations = Object.values(results.modules.validations);
      
      expect(moduleValidations.length).toBeGreaterThan(0);
      
      moduleValidations.forEach(moduleResult => {
        // Imprimir información detallada si falla
        if (!moduleResult.valid) {
          console.error(`❌ Módulo ${moduleResult.name} falló:`, {
            errors: moduleResult.errors,
            warnings: moduleResult.warnings,
            coverage: moduleResult.structure.coverage,
            foundFolders: moduleResult.structure.foundFolders,
            missingFolders: moduleResult.structure.missingFolders
          });
        }
        
        expect(moduleResult.valid).toBe(true);
      });
    });

    it('cada módulo debe tener carpeta components con subcarpetas', () => {
      const moduleValidations = Object.values(results.modules.validations);
      
      moduleValidations.forEach(moduleResult => {
        // Verificar que la estructura de componentes existe
        const componentsStructure = moduleResult.structure.components;
        
        if (!componentsStructure) {
          console.error(`El módulo ${moduleResult.name} no tiene estructura de componentes`);
          throw new Error(`El módulo ${moduleResult.name} no tiene estructura de componentes`);
        }
        
        // Verificar que la estructura de componentes es válida
        expect(componentsStructure.valid).toBe(true);
        if (!componentsStructure.valid) {
          console.error(`La carpeta components en ${moduleResult.name} no es válida.`, 
            { errors: componentsStructure.errors });
        }
        
        // Verificar que hay al menos una subcarpeta
        expect(componentsStructure.foundSubfolders?.length).toBeGreaterThan(0);
        if (!componentsStructure.foundSubfolders?.length) {
          console.error(`La carpeta components en ${moduleResult.name} no tiene subcarpetas`);
        }
        
        // Verificar que existe el archivo index
        expect(componentsStructure.hasIndexFile).toBe(true);
        if (!componentsStructure.hasIndexFile) {
          console.error(`La carpeta components en ${moduleResult.name} no tiene archivo index (index.ts o index.js)`);
        }
        
        // Log información útil para debugging
        console.log(`📂 ${moduleResult.name}/components: ${componentsStructure.foundSubfolders.join(', ')}`);
      });
    });
  });

  describe('Overall Validation', () => {
    it('toda la estructura debe ser válida', () => {
      const summary = results.modules.summary;
      
      // Validar que el resumen existe
      expect(summary).toBeDefined();
      
      // Imprimir reporte completo si falla
      if (!summary.overallValid) {
        console.log('\n🔍 REPORTE DETALLADO DE FALLOS:');
        validator.printReport();
      }
      
      expect(summary.overallValid).toBe(true);
    });

    it('resumen debe mostrar estadísticas correctas', () => {
      const summary = results.modules.summary;
      
      expect(summary.totalModules).toBeGreaterThan(0);
      expect(summary.validModules).toBeGreaterThan(0);
      expect(summary.validModules).toBeLessThanOrEqual(summary.totalModules);
      
      if (summary.validModules < summary.totalModules) {
        console.warn(`Solo ${summary.validModules} de ${summary.totalModules} módulos son válidos`);
      }
      
      console.log('📊 Estadísticas:', {
        totalModules: summary.totalModules,
        validModules: summary.validModules,
        invalidModules: summary.invalidModules
      });
    });
  });

  describe('Per-Module Validation', () => {
    it('cada módulo debe tener cobertura adecuada', () => {
      const moduleValidations = Object.values(results.modules.validations);
      
      moduleValidations.forEach(moduleResult => {
        const [found, total] = moduleResult.structure.coverage.split('/').map(Number);
        const coveragePercentage = (found / total) * 100;
        
        console.log(`📊 ${moduleResult.name}: ${coveragePercentage}% cobertura`);
        expect(coveragePercentage).toBeGreaterThanOrEqual(75); // Al menos 75% de cobertura
      });
    });

    it('todos los módulos deben tener components válido', () => {
      const moduleValidations = Object.values(results.modules.validations);
      
      moduleValidations.forEach(moduleResult => {
        // Verificar que la estructura de componentes existe
        const componentsStructure = moduleResult.structure.components;
        
        if (!componentsStructure) {
          throw new Error(`El módulo ${moduleResult.name} no tiene estructura de componentes`);
        }
        
        // Verificar que la estructura de componentes es válida
        if (!componentsStructure.valid) {
          console.error(`La estructura de componentes en ${moduleResult.name} no es válida:`, 
            componentsStructure.errors);
        }
        expect(componentsStructure.valid).toBe(true);
      });
    });
  });

  // Test de reporte final
  afterAll(() => {
    console.log('\n🎯 EJECUTANDO REPORTE FINAL...');
    const isValid = validator.printReport();
    
    if (isValid) {
      console.log('\n🎉 ¡Estructura válida! El proyecto cumple con todos los requisitos.');
    } else {
      console.log('\n⚠️  Hay problemas en la estructura que necesitan ser corregidos.');
    }
  });
});
