import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { LicenseManager, SetFilterModule } from 'ag-grid-enterprise';

let initialized = false;

export function setupAgGrid() {
  if (initialized) return;
  initialized = true;

  ModuleRegistry.registerModules([AllCommunityModule, SetFilterModule]);
  LicenseManager.setLicenseKey('LICENSE_KEY_HERE');
}
