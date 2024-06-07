if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
          .then(registration => {
              console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch(error => {
              console.log('ServiceWorker registration failed: ', error);
          });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('data-form');
  const dataList = document.getElementById('data-list');
  const storedData = JSON.parse(localStorage.getItem('formData')) || [];

  function updateDataList() {
      dataList.innerHTML = '';
      storedData.forEach(data => {
          const li = document.createElement('li');
          li.textContent = `Name: ${data.name}, Email: ${data.email}`;
          dataList.appendChild(li);
      });
  }

  form.addEventListener('submit', event => {
      event.preventDefault();
      const name = form.name.value;
      const email = form.email.value;

      const formData = { name, email };
      storedData.push(formData);
      localStorage.setItem('formData', JSON.stringify(storedData));
      updateDataList();
      form.reset();
  });

  updateDataList();
});
