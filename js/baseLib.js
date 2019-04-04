var baseLib = {

	StaticUrl: {
		urlSeparadorApresentaImage: "http://i.imgur.com/HUOQ0qn.png",

		urlSeparadorCapaImage: "https://i.imgur.com/RsvsIsD.png",
		urlSeparadorCriticasImage: "http://i.imgur.com/8844rcV.png",
		urlSeparadorDescricaoImage: "https://i.imgur.com/GiIopNR.png",
		urlSeparadorElencoImage: "http://i.imgur.com/V5K6PuJ.png",
		urlSeparadorFichaTecnicaImage: "http://i.imgur.com/m7mofjM.png",
		urlSeparadorSinopseImage: "http://i.imgur.com/lbv76Vf.png",
		urlSeparadorTrailerImage: "http://i.imgur.com/MM3UhCl.png",

		urlApresentaAnimes: "http://i.imgur.com/sYtzdGb.png",
		urlSinopseAnimes: "http://i.imgur.com/NoxJV48.png",
		urlAgradecaAnimes: "http://i.imgur.com/B9WSYko.png",
		urlFichaAnimes: "http://i.imgur.com/hRes7t3.png",
		urlPersonagensAnimes: "http://i.imgur.com/DemlMJ4.png",
		urlAdicionaisAnimes: "http://i.imgur.com/SPF37rv.png",

		urlApresentaJogos: "http://i.imgur.com/ZeTyF0r.png",
		urlDescricaoJogos: "http://i.imgur.com/LTVtaOB.png",
		urlSeparadorInstalacaoImage: "http://i.imgur.com/Yegd43z.png",
		urlSeparadorRequisitosmage: "http://i.imgur.com/u5LdJsv.png",
		urlSeparadorScreenshotImage: "http://i.imgur.com/WiNP8YV.png",
		urlAdicionaisJogos: "http://i.imgur.com/BjugP1q.png",
		urlFichaJogos: "http://i.imgur.com/XGM2DiY.png",
		urlTrailerJogos: "http://i.imgur.com/nOZNgsw.png",

		urlLogoIMDbImage:"https://i.postimg.cc/Pr8Gv4RQ/IMDB.png",
		urlLogoMetacriticImage:"https://i.postimg.cc/SKkH5pNg/Metacritic45x45.png",
		urlLogoRottenTomatoesImage:"https://i.postimg.cc/rppL76qC/rotten.png",
		urlLogoGooglePlayStoreImage:"https://i.postimg.cc/pLRvYh7S/google.png",

		urlBaseTMDbPoster: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/"
	},

	copyToClipboard: function (str) {
		const el = document.createElement('textarea');
		el.value = str;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		// debugger
	},

	reformatDate: function (dateStr) {
		dArr = dateStr.split("-");
		return dArr[2] + "/" + dArr[1] + "/" + dArr[0].substring(2);
	},

	getYearFromDDMMMYYYY: function (dateStr) {
		dArr = dateStr.split(" ");
		return dArr[2];
	},

	showLoading: function (yesNo) {
		let loading = $('#pageLoader');

		console.log("Loading: " + yesNo);

		yesNo ? loading.addClass("is-active") : loading.removeClass("is-active");
	},




};
