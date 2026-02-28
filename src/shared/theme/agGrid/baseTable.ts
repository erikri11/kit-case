import { themeMaterial, colorSchemeDark, colorSchemeLight } from 'ag-grid-community';

export function baseTableTheme(mode: 'light' | 'dark') {
  const scheme = mode === 'dark' ? colorSchemeDark : colorSchemeLight;
  let theme = themeMaterial.withPart(scheme);

  theme = theme.withParams({
    wrapperBorder: true,
    headerRowBorder: true,
    headerColumnBorder: true,
    rowBorder: true,
    columnBorder: true,
    fontFamily: 'Lato, sans-serif',
    headerTextColor: mode === 'dark' ? '#FFF' : '#000',
    rowHoverColor: mode === 'dark' ? '#333' : '#f5f5f5',
  });

  return theme;
}
