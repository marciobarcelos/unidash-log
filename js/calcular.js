
document.addEventListener('DOMContentLoaded', function() {
  const btnCalcularFrete = document.getElementById('btn-calcular');
  calcularFreteButton.addEventListener('click', btnCalcularFrete);
});

function calcularFrete() {
  const fromPostalCode = document.getElementById('fromPostalCode').value;
  const toPostalCode = document.getElementById('toPostalCode').value;
  const packageHeight = parseFloat (document.getElementById('packageHeight').value);
  const packageWidth = parseFloat (document.getElementById('packageWidth').value);
  const packageLength = parseFloat (document.getElementById('packageLength').value);
  const packageWeight = parseFloat (document.getElementById('packageWeight').value);

  const fromObject = {postal_code: fromPostalCode};
  const toObject = {postal_code: toPostalCode};
  const packageObject = {height: packageHeight, width: packageWidth, length: packageLength, weight: packageWeight};

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWY0YjUzOTg3OWUyNDBkMjU0NDE2ZjhhYWVlN2RmZTQxYTRjOGNjMTAzM2Q2MjgzZGNiNzczZjhlMGU1YzQ4ZjdlYmY0NWYxZjQxNWI0ZDciLCJpYXQiOjE3MTE1NDYzMTIuNjkyMDMzLCJuYmYiOjE3MTE1NDYzMTIuNjkyMDM1LCJleHAiOjE3NDMwODIzMTIuNjcyNDI3LCJzdWIiOiI5YmFhMDg3MS02YTQ4LTQxNGUtOWZmMi03OGE0OGRjNjExNmEiLCJzY29wZXMiOlsic2hpcHBpbmctY2FsY3VsYXRlIl19.Y48e64-PKREXmB1l8UpmD1WYFLKrFyxab35nEKflx0Z93AKspFizxQbd2A76mwWh0Fw35DXtCnmwamP9fdWC8aJ9lnkWjIeOEYsWh5grIOIm5WclhtOe6T6-GbF1bfD35ag624xPt4PxzKJVycC4vKSTnBpM-U3aU_63xAutDYHzyx0KCYBDjPWihuO6GR8n9hyeRcnLip7CSE7tRA0_cHs3g9OS6JTtX-7Yb2xBUCegZyEqMJHErcDkuisGgfVC43PMNoNKWQNleWso_fQY2Nnt47puFoCebS3EFB5yIMt28p_sZUTup1TriE28Nwg87VIL4oAxO8Vzt_uhYVBR9lXpsM7k4bzACDfWaQb7S0_tgrPkZ1i5grOLP6ezKTk-lGgiiNOqrtMr2yLmrJuJjJ2QwV_Jg-GkfdLbXlDaCPD4J5RBCJuOlxjOzpfsSitKvwmCJi7DsGy_tqtIKiBKvIqAP1MDkpWReEk5b6hFSaNOGmJmf0vHsUz_J3tWu7LXtU9GKR7BJJ3wyNo4fjaD0_NMhDDPFgcMBwwzcnrXDOhQqVB998KeIzxt7PDzowE2Rfox6PevIMSS-4mxRf8KMAIfVJ8L6TW9OmGa7KP_i9NhxpBoIUJUNW6RMVYaJoe8mWEVKj4pnhJee39p3qmjmeeEJo8t1k1D-FFnFc3vi1Q',
      'User-Agent': 'Aplicação marciobarcelos.dev@gmail.com'
    },
    body: JSON.stringify({
      from: fromObject,
      to: toObject,
      package: packageObject
    })
  };
  
  fetch('https://www.melhorenvio.com.br/api/v2/me/shipment/calculate', options)
    .then(response => response.json())
    .then(response => {
    const sedexResult = response.find(service => service.name === 'SEDEX');
    if (sedexResult) {
      const sedexDiv = document.getElementById('sedexResult');
      sedexDiv.innerHTML= `
      <p>Nome: ${sedexResult.name}</p>
      <p>Preço: ${sedexResult.price}</p>
      <p>Prazo de Entrega: ${sedexResult.delivery_time} dias</p>
      `;
    } else {
      const sedexDiv = document.getElementById('sedexResult');
      sedexDiv.innerHTML = '<p>SEDEX não encontrado</p>';
    }
  })
  .catch(err => console.error(err));
}
calcularFrete();