// Usa o nome do produto para buscar em outras lojas
async function searchInOtherStores(productName) {
    const stores = [
      {
        name: "Mercado Livre",
        url: `https://lista.mercadolivre.com.br/${encodeURIComponent(productName)}`,
        selector: ".andes-money-amount__fraction"
      },
      {
        name: "Magazine Luiza",
        url: `https://www.magazineluiza.com.br/busca/${encodeURIComponent(productName)}`,
        selector: ".price-template__text"
      }
    ];
  
    const results = [];
    
    for (const store of stores) {
      try {
        const response = await fetch(store.url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const priceElement = doc.querySelector(store.selector);
        
        if (priceElement) {
          const price = parseFloat(priceElement.innerText.replace(/\D/g, ''));
          results.push({ store: store.name, price, url: store.url });
        }
      } catch (error) {
        console.error(`Erro em ${store.name}:`, error);
      }
    }
  
    return results;
  }