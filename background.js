// Carrega o histórico ao iniciar
chrome.storage.local.get(['priceHistory'], (data) => {
    let priceHistory = data.priceHistory || {};
  
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'PRICE_DETECTED') {
        const { url, price, site } = message;
        
        if (!priceHistory[url]) {
          priceHistory[url] = [];
        }
  
        // Verifica se o preço já existe (evita duplicatas)
        const lastEntry = priceHistory[url][priceHistory[url].length - 1];
        if (!lastEntry || lastEntry.price !== price) {
          priceHistory[url].push({
            price,
            date: new Date().toLocaleString('pt-BR'),
            site
          });
  
          // Mantém apenas os últimos 30 registros
          if (priceHistory[url].length > 30) {
            priceHistory[url].shift();
          }
  
          // Atualiza visualmente
          chrome.action.setBadgeText({ text: price.toString() });
          chrome.storage.local.set({ priceHistory });
        }
      }
    });
  });