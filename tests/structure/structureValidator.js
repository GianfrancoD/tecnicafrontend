import { existsSync, statSync, readdirSync } from 'fs';
import { join } from 'path';
import { EXPECTED_STRUCTURE, TESTING_CONFIG } from './expectedStructure.js';

export class DynamicStructureValidator {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot;
    this.srcPath = join(projectRoot, 'src');
    this.corePath = join(this.srcPath, 'core');
    this.results = {
      core: { valid: false, errors: [] },
      shared: { valid: false, errors: [] },
      modules: { discovered: [], validations: {}, summary: {} }
    };
  }

  // Descubre automáticamente todos los módulos en core/
  discoverModules() {
    if (!existsSync(this.corePath)) {
      return [];
    }
    
    return readdirSync(this.corePath)
      .filter(item => {
        const itemPath = join(this.corePath, item);
        // Excluir carpetas no-módulo y solo incluir directorios
        return !TESTING_CONFIG.dynamicModules.excludeFolders.includes(item) && 
               statSync(itemPath).isDirectory();
      });
  }

  // Valida que existe la carpeta core
  validateCoreExists() {
    const exists = existsSync(this.corePath) && statSync(this.corePath).isDirectory();
    
    if (!exists) {
      this.results.core.errors.push('Carpeta "core" no encontrada en src/');
    }
    
    this.results.core.valid = exists;
    return exists;
  }

  // Valida la estructura de la carpeta shared
  validateSharedStructure() {
    const sharedPath = join(this.corePath, 'shared');
    const sharedConfig = EXPECTED_STRUCTURE.core.shared;
    const errors = [];
    
    if (!existsSync(sharedPath)) {
      errors.push('Carpeta "shared" no encontrada en core/');
      this.results.shared = { valid: false, errors };
      return false;
    }

    // Validar subcarpetas requeridas de shared
    sharedConfig.requiredFolders.forEach(folderName => {
      const folderPath = join(sharedPath, folderName);
      if (!existsSync(folderPath)) {
        errors.push(`Carpeta requerida "shared/${folderName}" no encontrada`);
      }
    });

    this.results.shared = {
      valid: errors.length === 0,
      errors,
      path: sharedPath,
      foundFolders: this.getFoldersIn(sharedPath)
    };

    return errors.length === 0;
  }

  // Valida la estructura de un módulo específico
  validateModuleStructure(moduleName) {
    const modulePath = join(this.corePath, moduleName);
    const moduleConfig = EXPECTED_STRUCTURE.core.modules;
    const result = {
      name: moduleName,
      path: modulePath,
      valid: true,
      errors: [],
      warnings: [],
      structure: {}
    };

    if (!existsSync(modulePath)) {
      result.valid = false;
      result.errors.push(`Módulo "${moduleName}" no existe`);
      return result;
    }

    // Validar carpetas principales del módulo
    const foundFolders = this.getFoldersIn(modulePath);
    const missingFolders = [];
    
    moduleConfig.requiredFolders.forEach(folderName => {
      if (!foundFolders.includes(folderName)) {
        missingFolders.push(folderName);
      }
    });

    // Verificar si cumple con el mínimo requerido
    const foundRequiredCount = moduleConfig.requiredFolders.length - missingFolders.length;
    const minimumRequired = TESTING_CONFIG.dynamicModules.minimumRequiredFolders;
    
    if (foundRequiredCount < minimumRequired) {
      result.valid = false;
      result.errors.push(
        `Módulo "${moduleName}" solo tiene ${foundRequiredCount}/${moduleConfig.requiredFolders.length} carpetas requeridas. ` +
        `Mínimo necesario: ${minimumRequired}`
      );
    }

    if (missingFolders.length > 0) {
      result.warnings.push(`Carpetas faltantes: ${missingFolders.join(', ')}`);
    }

    // Validar estructura específica de components/
    result.structure.components = this.validateComponentsStructure(moduleName, modulePath);
    
    // Si components no es válido y es requerido, marcar todo el módulo como inválido
    if (!result.structure.components.valid && foundFolders.includes('components')) {
      result.valid = false;
    }

    result.structure.foundFolders = foundFolders;
    result.structure.missingFolders = missingFolders;
    result.structure.coverage = `${foundRequiredCount}/${moduleConfig.requiredFolders.length}`;

    return result;
  }

  // Valida la estructura específica de components/ en un módulo
  validateComponentsStructure(moduleName, modulePath) {
    const componentsPath = join(modulePath, 'components');
    const componentConfig = EXPECTED_STRUCTURE.core.modules.componentsSubfolders;
    
    const result = {
      valid: true,
      errors: [],
      warnings: [],
      foundSubfolders: [],
      hasIndexFile: false
    };

    if (!existsSync(componentsPath)) {
      result.valid = false;
      result.errors.push(`Carpeta "components" no encontrada en módulo ${moduleName}`);
      return result;
    }

    // Obtener subcarpetas de components
    const foundSubfolders = this.getFoldersIn(componentsPath);
    result.foundSubfolders = foundSubfolders;

    // Verificar mínimo de subcarpetas si está configurado
    if (TESTING_CONFIG.dynamicModules.requireComponentsSubfolders) {
      const minSubfolders = TESTING_CONFIG.dynamicModules.minimumComponentsSubfolders;
      
      if (foundSubfolders.length < minSubfolders) {
        result.valid = false;
        result.errors.push(
          `components/ en "${moduleName}" debe tener al menos ${minSubfolders} subcarpeta(s). ` +
          `Encontradas: ${foundSubfolders.length}`
        );
      }
    }

    // Validar que al menos tenga la subcarpeta 'common' si existe alguna
    if (foundSubfolders.length > 0 && !foundSubfolders.includes('common')) {
      result.warnings.push(`Se recomienda tener una carpeta "common" en components/`);
    }

    // Verificar archivo index
    const indexExists = EXPECTED_STRUCTURE.core.modules.indexFiles.some(indexFile => {
      return existsSync(join(modulePath, indexFile));
    });
    
    result.hasIndexFile = indexExists;
    if (!indexExists) {
      result.warnings.push('No se encontró archivo index en components/');
    }

    return result;
  }

  // Obtiene solo las carpetas (no archivos) de un directorio
  getFoldersIn(dirPath) {
    if (!existsSync(dirPath)) return [];
    
    return readdirSync(dirPath)
      .filter(item => {
        const itemPath = join(dirPath, item);
        return statSync(itemPath).isDirectory() && 
               !TESTING_CONFIG.ignorePatterns.includes(item);
      });
  }

  // Ejecuta validación completa del proyecto
  validateCompleteStructure() {
    console.log('🔍 Iniciando validación dinámica de estructura...\n');

    // 1. Validar core existe
    const coreExists = this.validateCoreExists();
    if (!coreExists) {
      return this.results;
    }

    // 2. Validar shared
    this.validateSharedStructure();

    // 3. Descubrir módulos dinámicamente
    const discoveredModules = this.discoverModules();
    this.results.modules.discovered = discoveredModules;

    console.log(`📦 Módulos encontrados: ${discoveredModules.length}`);
    console.log(`   - ${discoveredModules.join(', ')}\n`);

    // 4. Validar cada módulo encontrado
    discoveredModules.forEach(moduleName => {
      const moduleResult = this.validateModuleStructure(moduleName);
      this.results.modules.validations[moduleName] = moduleResult;
    });

    // 5. Generar resumen
    this.generateSummary();

    return this.results;
  }

  // Genera un resumen de los resultados
  generateSummary() {
    const validModules = Object.values(this.results.modules.validations)
      .filter(module => module.valid).length;
    
    const totalModules = this.results.modules.discovered.length;

    this.results.modules.summary = {
      totalModules,
      validModules,
      invalidModules: totalModules - validModules,
      coreValid: this.results.core.valid,
      sharedValid: this.results.shared.valid,
      overallValid: this.results.core.valid && 
                   this.results.shared.valid && 
                   validModules === totalModules
    };
  }

  // Imprime reporte detallado
  printReport() {
    const { core, shared, modules } = this.results;
    const { summary } = modules;

    console.log('📋 REPORTE DE VALIDACIÓN DE ESTRUCTURA\n');
    console.log('=' .repeat(50));

    // Core
    console.log(`\n🏗️  CORE: ${core.valid ? '✅' : '❌'}`);
    if (core.errors.length > 0) {
      core.errors.forEach(error => console.log(`   ❌ ${error}`));
    }

    // Shared
    console.log(`\n📁 SHARED: ${shared.valid ? '✅' : '❌'}`);
    if (shared.errors.length > 0) {
      shared.errors.forEach(error => console.log(`   ❌ ${error}`));
    }
    if (shared.foundFolders) {
      console.log(`   📂 Carpetas encontradas: ${shared.foundFolders.join(', ')}`);
    }

    // Módulos
    console.log(`\n📦 MÓDULOS: ${summary.validModules}/${summary.totalModules} válidos`);
    
    Object.values(modules.validations).forEach(module => {
      const status = module.valid ? '✅' : '❌';
      console.log(`\n   ${status} ${module.name.toUpperCase()}`);
      console.log(`      📊 Cobertura: ${module.structure.coverage}`);
      
      if (module.errors.length > 0) {
        module.errors.forEach(error => console.log(`      ❌ ${error}`));
      }
      
      if (module.warnings.length > 0) {
        module.warnings.forEach(warning => console.log(`      ⚠️  ${warning}`));
      }

      if (module.structure.components) {
        const compStatus = module.structure.components.valid ? '✅' : '❌';
        console.log(`      ${compStatus} Components: ${module.structure.components.foundSubfolders.length} subcarpetas`);
        if (module.structure.components.foundSubfolders.length > 0) {
          console.log(`         📂 ${module.structure.components.foundSubfolders.join(', ')}`);
        }
      }
    });

    // Resumen final
    console.log('\n' + '=' .repeat(50));
    console.log(`\n🎯 RESULTADO FINAL: ${summary.overallValid ? '✅ VÁLIDO' : '❌ INVÁLIDO'}`);
    console.log(`   Core: ${summary.coreValid ? '✅' : '❌'}`);
    console.log(`   Shared: ${summary.sharedValid ? '✅' : '❌'}`);
    console.log(`   Módulos: ${summary.validModules}/${summary.totalModules}`);
    
    return summary.overallValid;
  }
}
