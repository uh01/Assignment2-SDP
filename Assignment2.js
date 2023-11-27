document.addEventListener('DOMContentLoaded', function () {
  async function fetchData(url) {
      try {
          const response = await fetch(url);
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }

  const sortByViewButton = document.querySelector('.sbv');
  const contentContainer = document.getElementById('content');

  sortByViewButton.addEventListener('click', async () => {
      console.log('Button clicked');

      const contentApiUrl = 'https://openapi.programming-hero.com/api/videos/category/1000';

      try {
          const contentData = await fetchData(contentApiUrl);
          const sortedContent = contentData.data.slice().sort((a, b) => {
              const viewsA = parseInt(a.others.views.replace('K', '')) * 1000;
              const viewsB = parseInt(b.others.views.replace('K', '')) * 1000;

              return viewsB - viewsA;
          });

          updateContent(sortedContent);
      } catch (error) {
          console.error('Error fetching and sorting content data:', error);
      }
  });

  function formatPostedDate(postedDateInSeconds) {
      const minutesInHour = 60;
      const secondsInMinute = 60;

      const hours = Math.floor(postedDateInSeconds / (minutesInHour * secondsInMinute));
      const minutes = Math.floor((postedDateInSeconds % (minutesInHour * secondsInMinute)) / secondsInMinute);

      return `${hours} hr ${minutes} min ago`;
  }

  function updateContent(content) {
      contentContainer.innerHTML = '';

      if (content.length === 0) {
          contentContainer.innerHTML = `
              <div class="icn-txt" style="display: flex; flex-direction: column; align-items: center; margin-top: 50px;">
                  <div class="icn">
                      <img src="resources/Icon.png" alt="...">
                  </div>
                  <div class="txt" style="text-align: center; margin-top: 20px;">
                      <h1>Oops!! There is no</h1>
                      <h1>content here</h1>
                  </div>
              </div>
          `;
      } else {
          content.forEach(video => {
              const contentElement = document.createElement('div');
              contentElement.classList.add('content-item');
              contentElement.innerHTML = `
                  <div style="position: relative;">
                      <img style="width: 230px; height: 150px; object-fit: cover; border-radius: 5px" src="${video.thumbnail}" alt="${video.title}">
                      <div class="posted-date" style="position: absolute; bottom: 5px; right: 5px; font-size: 13px; background-color: #272727; color: white;">${video.others.posted_date ? formatPostedDate(video.others.posted_date) : ''}</div>
                  </div>
                  <div style="display: flex; align-items: center; margin-top: 16px;">
                      <img style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%; margin-right: 20px; margin-bottom: 25px;" src="${video.authors ? video.authors[0].profile_picture : ''}" alt="Author Profile">
                      <div class="content-details">
                          <h5 style="margin-top: 20px; font-size: 15px;">${video.title}</h5>
                          <div style="display: flex">
                              ${video.authors ? `<p style="font-size: 13px; margin-right: 5px;">${video.authors[0].profile_name}</p>` : ''}
                              ${video.authors && video.authors[0].verified ? '<i class="fas fa-check-circle" style="margin-left: 5px; margin-top: 2.5px; color: rgb(95, 176, 252);"></i>' : ''}
                          </div>
                          <p style="font-size: 13px;">Views: ${video.others.views}</p>
                      </div>
                  </div>
              `;
              contentContainer.appendChild(contentElement);
          });
      }
  }

  window.loadContent = function (categoryId) {
      const contentApiUrl = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;

      fetchData(contentApiUrl)
          .then(contentData => {
              updateContent(contentData.data);
          })
          .catch(error => console.error('Error fetching content data:', error));
  };

  function fetchCategories() {
      const categoriesApiUrl = 'https://openapi.programming-hero.com/api/videos/categories';

      fetchData(categoriesApiUrl)
          .then(categoriesData => {
              const categoriesContainer = document.getElementById('categories');
              categoriesData.data.forEach(category => {
                  const button = document.createElement('button');
                  button.textContent = category.category;
                  button.addEventListener('click', () => loadContent(category.category_id));
                  categoriesContainer.appendChild(button);
              });
          })
          .catch(error => console.error('Error fetching categories:', error));
  }

  fetchCategories();
  loadContent('1000');
});



function openBlogInNewTab() {
  var newTab = window.open();
  newTab.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Blog Page</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
          <style>
              body {
                  padding: 50px;
              }
          </style>
      </head>
      <body>
      <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
            <strong>Discuss the scope of var, let, and const.</strong>
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body">
          <strong><u>Scope of var:</u></strong>
          <br>
          Variables declared with 'var' are function-scoped. 
          <br>
          This means they are visible throughout the entire function in which they are declared.
          <br>
          <br>
          <strong><u>Scope of let:</u></strong>
          <br>
          Variables declared with 'let' have block scope.  
          <br>
          They are limited to the block, statement, or expression on which it is used.
          <br>
          <br>
          <strong><u>Scope of const:</u></strong>
          <br>
          Variables declared with 'const' have block scope i.e., 'const' also has block scope like 'let'. 
          <br>
          The key difference is that const cann't be reassigned after it's declared. 
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <strong>Tell us the use cases of null and undefined.</strong>
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
          <strong><u>Use Cases of null:</u></strong>
          <br>
          'null' represents a deliberate assignment by a programmer to indicate that a variable intentionally does not have an assigned value or that an object property should have no value. 
          <br>
          <br>
          <strong><u>Use Cases of undefined:</u></strong>
          <br>
          'undefined' represents a variable that has been declared but has not yet been assigned a value.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <strong>What do you mean by REST API?</strong>  
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
          <strong><u>REST API:</u></strong>
          <br>
          REST API stands for Representational State Transfer Application Programming Interface. 
          <br>
          REST API is an architectural style for designing networked applications.
          <br>
          It uses standard HTTP methods, allowing for scalable and interoperable communication between clients and servers over the web.
          </div>
        </div>
      </div>
    </div>

          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
      </body>
      </html>
  `);
  newTab.document.close();
}


