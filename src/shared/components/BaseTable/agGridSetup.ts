import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { MasterDetailModule } from "ag-grid-enterprise";
import { LicenseManager, SetFilterModule } from 'ag-grid-enterprise';

let initialized = false;

export function setupAgGrid() {
  if (initialized) return;
  initialized = true;

  ModuleRegistry.registerModules([AllCommunityModule, SetFilterModule, MasterDetailModule]);
  LicenseManager.setLicenseKey("LICENSE_KEY_HERE");
}
