document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['priceHistory'], (data) => {
      const container = document.getElementById('priceHistory');
      
      if (!data.priceHistory || Object.keys(data.priceHistory).length === 0) {
        container.innerHTML = '<p>Nenhum preço registrado ainda.</p>';
        return;
      }
  
      Object.entries(data.priceHistory).forEach(([url, entries]) => {
        const latest = entries[entries.length - 1];
        const entry = document.createElement('div');
        entry.className = 'price-entry';
        entry.innerHTML = `
          <div class="site">${latest.site}</div>
          <div class="price">R$ ${latest.price.toFixed(2)}</div>
          <div class="date">${latest.date}</div>
        `;
        container.appendChild(entry);
      });
    });
  });

