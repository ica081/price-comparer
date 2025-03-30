// Detecta preços na Amazon
function getAmazonPrice() {
    const priceElement = document.querySelector('.a-price-whole');
    return priceElement ? priceElement.innerText.replace(/[^0-9]/g, '') : null;
  }
  
  // Detecta preços no Mercado Livre
  function getMercadoLivrePrice() {
    const priceElement = document.querySelector('.andes-money-amount__fraction');
    return priceElement ? priceElement.innerText.replace(/[^0-9]/g, '') : null;
  }
  
  // Envia o preço para o background.js
  const currentSite = window.location.hostname;
  let price;
  
  if (currentSite.includes('amazon')) {
    price = getAmazonPrice();
  } else if (currentSite.includes('mercadolivre')) {
    price = getMercadoLivrePrice();
  }
  
  if (price) {
    chrome.runtime.sendMessage({
      type: 'PRICE_DETECTED',
      price: Number(price),
      url: window.location.href,
      site: currentSite
    });
  }