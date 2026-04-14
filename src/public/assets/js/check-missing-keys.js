// Script to check for missing language keys
(function() {
  console.log('🔍 Checking for missing language keys...\n');
  
  const allElements = document.querySelectorAll('[data-langkey]');
  const missingKeys = new Set();
  const foundKeys = new Set();
  
  allElements.forEach(el => {
    const key = el.getAttribute('data-langkey');
    if (!key) return;
    
    // Check if key exists in both Hindi and English
    const hiExists = langMap.hi && langMap.hi[key];
    const enExists = langMap.en && langMap.en[key];
    
    if (hiExists && enExists) {
      foundKeys.add(key);
    } else {
      missingKeys.add(key);
      console.warn(`❌ Missing key: "${key}" in ${!hiExists ? 'Hindi' : ''} ${!enExists ? 'English' : ''}`);
    }
  });
  
  console.log(`\n✅ Found keys: ${foundKeys.size}`);
  console.log(`❌ Missing keys: ${missingKeys.size}`);
  
  if (missingKeys.size > 0) {
    console.log('\n📋 Missing keys list:');
    Array.from(missingKeys).sort().forEach(key => {
      console.log(`  - ${key}`);
    });
  } else {
    console.log('\n🎉 All language keys are properly translated!');
  }
})();
