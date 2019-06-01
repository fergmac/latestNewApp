import '../css/style.scss';

document.addEventListener('DOMContentLoaded', () => {

	//on change of select menu the value is saved as variable
	document.querySelector('#article-search').addEventListener('change', () => {
		var topicChoice = document.getElementById('article-search').value;
		
		var $loaderImage = document.createElement('img');
		$loaderImage.src = 'images/ajax-loader.gif';
		$loaderImage.classList.add('ajax-loader');
		$loaderImage.id = 'loader';

		document.querySelector('.article-container').parentNode.insertBefore($loaderImage, document.querySelector('.article-container').nextSibling);
		//loading gif is appended
		
		document.querySelector('.header').classList.add('header-search');		//header is shrunk on select change

		document.querySelector('.nyt-symbol').classList.add('nyt-search-size'); 
		document.querySelector('.nyt-symbol').classList.remove('nyt-symbol');

		// set some initial variables
		let articleData; 
		let articleItems;
		// var articleName = '';
		
		var $articleList = document.querySelector('.article-list'); //accessing element like this is slower/costly so we store it in a variable when we have to access it more than once

		while($articleList.firstChild) $articleList.removeChild($articleList.firstChild); // any previous articles searched are removed from the page

		//api key is concatenated with the variable retrieved from onChange function and the api key    
		let url = 'https://api.nytimes.com/svc/topstories/v2/'+ topicChoice +'.json?'; 
		
		const params = {
			'api-key':'I59lnGkGmzdvUeTlVMbJJEWv6SVS4k7C'
		};

		// alternative to $.params

		// Solution #1 did not work TODO: figure this out
		// const URLparams = new URLSearchParams(Object.entries(params));
		// URLparams.toString();
	
		// Solution #2
		const urlParams = Object.keys(params).map((k) => {
			return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
		});

		fetch(url + urlParams, {
			method: 'GET',
			mode: 'cors',
			'Access-Control-Allow-Origin': '',
			headers: {'Content-Type': 'application/json', }
		})
		.then((response) => {
			if(response.ok) {
				return response.json();
			} else {
				throw Error(`Request rejected with status ${response.status}`);
			}
			
		})
		.then((data) => {
			// console.log(JSON.stringify(data));

			articleData = data.results; 
			articleItems = ''; 
			var i = 0;

			articleData.forEach((value) => {

				if (value.multimedia.length && i < 12) { //only 12 articles will be appended

					let articleImageUrl = value.multimedia[4].url; // setting variables for the different data sets retreived from api
					let articleCaption = value.abstract;
					let articleLink = value.url;
					

					//below article items are appended to the html article list
					articleItems += `
						<li class="article">
							<a class="caption-font" href="${articleLink}"target"_blank">
								<div class="article-box" style="background-image: url('${articleImageUrl}')">
									<div class="caption">
										<p>${articleCaption}</p>
									</div>
								</div>
							</a>
						</li>
					`;

					i++;
				}	
			});
		
			$articleList.innerHTML = articleItems;

			var $loader = document.querySelector('#loader');
			$loader.parentNode.removeChild($loader); //removes loading gif when search is complete

			document.querySelector('.nyt-search-size').classList.add('nyt-symbol');
			document.querySelector('.nyt-search-size').classList.remove('nyt-search-size'); 
		})
		.catch((err)=> {
			console.log(err);
			//if the get function fails a message is displayed
			var errMessage = '<li>Sorry! There was a problem, please try again.</li>'; 
			document.querySelector('.article-list').innerHTML = errMessage ;

			//removes loading gif when search is complete
			var $loader = document.querySelector('#loader');
			$loader.parentNode.removeChild($loader); 

			document.querySelector('.nyt-search-size').classList.add('nyt-symbol');
			document.querySelector('.nyt-search-size').classList.remove('nyt-search-size'); 
		});
	});
});
