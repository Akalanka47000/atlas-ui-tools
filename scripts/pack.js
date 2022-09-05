import crx3 from 'crx3';

crx3(['./src/manifest.json'], {
  crxPath: `./build/atlas-ui-tools.crx`,
  zipPath: `./build/atlas-ui-tools.zip`,
}).then(() => console.log('Extension packed successfully')).catch((err) => console.log(`Error packing extension: ${err}`))
