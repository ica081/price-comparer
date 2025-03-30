const priceHistory = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PRICE_DETECTED') {
    const { url, price, site } = message;
    
    if (!priceHistory[url]) {
      priceHistory[url] = [];
    }

    // Adiciona ao histórico (máx. 30 registros)
    priceHistory[url].push({
      price,
      date: new Date().toLocaleString(),
      site
    });

    if (priceHistory[url].length > 30) {
      priceHistory[url].shift();
    }

    // Salva no storage
    chrome.storage.local.set({ priceHistory });

    // Mostra notificação
    chrome.action.setBadgeText({ text: price.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });
  }
});

// Atualiza a cada minuto
chrome.alarms.create('priceCheck', { periodInMinutes: 1 });