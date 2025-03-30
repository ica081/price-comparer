// Detecta preços na Amazon
function getAmazonPrice() {
    const priceWhole = document.querySelector('.a-price-whole')?.textContent.replace(/\D/g, '');
    const priceFraction = document.querySelector('.a-price-fraction')?.textContent;
    // No content-script.js
    const productName = document.querySelector('#productTitle')?.textContent.trim();
    
    if (priceWhole && priceFraction) {
      return parseFloat(`${priceWhole}.${priceFraction}`);
    }
    return null;
  }
  
  // Detecta preços no Mercado Livre
  function getMercadoLivrePrice() {
    const priceElement = document.querySelector('.andes-money-amount__fraction');
    if (!priceElement) return null;
    
    const priceText = priceElement.textContent.replace(/\D/g, '');
    return parseFloat(priceText);
  }
  
  // Identifica o site atual e obtém o preço
  const currentSite = window.location.hostname;
  let price = null;
  
  if (currentSite.includes('amazon')) {
    price = getAmazonPrice();
  } else if (currentSite.includes('mercadolivre')) {
    price = getMercadoLivrePrice();
  }
  
  // Envia para o background.js
  if (price) {
    chrome.runtime.sendMessage({
      type: 'PRICE_DETECTED',
      price: price,
      url: window.location.href,
      site: currentSite.includes('amazon') ? 'Amazon' : 'Mercado Livre'
    });
  }

  let lastProcessedUrl = '';

function checkPrice() {
  const currentUrl = window.location.href;
  
  // Só processa se a URL mudou
  if (currentUrl !== lastProcessedUrl) {
    lastProcessedUrl = currentUrl;
    
    const price = getPrice(); // Sua função existente
    if (price) {
      chrome.runtime.sendMessage({
        type: 'PRICE_DETECTED',
        price: price,
        url: currentUrl,
        site: window.location.hostname.includes('amazon') ? 'Amazon' : 'Mercado Livre'
      });
    }
  }
}

// Verifica a cada 2 segundos se a URL mudou
setInterval(checkPrice, 2000);