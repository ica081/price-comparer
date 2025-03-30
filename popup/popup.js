chrome.storage.local.get('priceHistory', (data) => {
    const historyContainer = document.getElementById('priceHistory');
    
    if (data.priceHistory) {
      Object.entries(data.priceHistory).forEach(([url, entries]) => {
        const latest = entries[entries.length - 1];
        const entry = document.createElement('div');
        entry.className = 'price-entry';
        entry.innerHTML = `
          <strong>${latest.site}</strong><br>
          <span class="current">R$ ${latest.price}</span><br>
          <small>${latest.date}</small>
        `;
        historyContainer.appendChild(entry);
      });
    } else {
      historyContainer.innerHTML = '<p>Nenhum preço detectado ainda.</p>';
    }
  });