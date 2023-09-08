const fs = require('fs');

// Read the keys from the orgin file
fs.readFile('floorp_en.ftl', 'utf-8', (err, data1) => {
  if (err) throw err;
  const keys1 = new Set(data1.split('\n')
    .filter(line => line.includes('='))
    .map(line => line.split('=')[0].trim()));

  // Read the keys from the target file
  fs.readFile('floorp.ftl', 'utf-8', (err, data2) => {
    if (err) throw err;
    const keys2 = new Set(data2.split('\n')
      .filter(line => line.includes('='))
      .map(line => line.split('=')[0].trim()));

    // Read the exception keys from the file
    fs.readFile('exception_keys.txt', 'utf-8', (err, data3) => {
      if (err) throw err;
      const exceptionKeys = new Set(data3.split('\n')
        .map(line => line.trim())
        .filter(line => line !== ''));

      // Check if the keys in the first file are present in the second file, except for the exception keys
      keys1.forEach(key => {
        if (!exceptionKeys.has(key) && !keys2.has(key)) {
          console.log(`Key '${key}' is not found.`);
        }
      });
    });
  });
});