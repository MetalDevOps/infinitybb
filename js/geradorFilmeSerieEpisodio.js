var GeradorFilmeSerieEpisodio = {

    IMDbId: null,

    TipoGerador: null,

    Data: {
        OMDb: null,
        TMDb: null
    },

    Validar: function () {
        var isFilme = false;
        var isSerie = false;
        var isEpisodioSerie = false;

        if (this.IMDbId.trim().length == 0 || this.IMDbId == null) {
            bulmaToast.toast({ message: "O código do filme no IMDB é obrigatório", type: "is-danger", duration: 4000 });
            return false;
        }

        // $('#pageLoader').addClass("is-active");

        this.Data.OMDb = this.OMDbService(this.IMDbId.trim());
        this.Data.TMDb = this.TMDbService(this.IMDbId.trim());

        console.log(this.Data.OMDb);
        console.log(this.Data.TMDb);


        if (this.Data.TMDb.movie_results.length > 0) isFilme = true;
        if (this.Data.TMDb.tv_results.length > 0) isSerie = true;
        if (this.Data.TMDb.tv_episode_results.length > 0) isEpisodioSerie = true;

        if (isFilme) {
            bulmaToast.toast({ message: "O código IMDB usado pertence ao tipo 'Filme'!", type: "is-alert", duration: 4000 });
            this.TipoGerador = "1";
        }

        if (isSerie) {
            bulmaToast.toast({ message: "O código IMDB usado pertence ao tipo 'Série de TV'!", type: "is-alert", duration: 4000 });
            this.TipoGerador = "2";
        }

        if (isEpisodioSerie) {
            bulmaToast.toast({ message: "O código IMDB usado pertence ao tipo 'Episódio de série de TV'!", type: "is-alert", duration: 4000 });
            this.TipoGerador = "3";
        }

        baseLib.copyToClipboard(this.GerarBBCode());
        bulmaToast.toast({ message: "BBCode copiado para a área de transferência!", type: "is-success", duration: 4000 });
        // debugger


    },

    GerarBBCode: function () {
        var str = `
            ${this.InserirTitulo()}
            ${this.InserirCapa()}
            ${this.InserirSinopse()}
            ${this.InserirInformacao()}
            ${this.InserirElenco()}
            ${this.InserirCritica()}
            ${this.InserirTrailer()}
            `;

        return str;

    },

    InserirTitulo: function () {
        var retorno = `[align=center][img]${baseLib.StaticUrl.urlSeparadorApresentaImage}[/img][/align]`;

        switch (this.TipoGerador) {
            case "1":
                retorno += "\n[b][align=center][font=Verdana]" + this.Data.TMDb.movie_results[0].title + " (" + this.Data.OMDb.Title + ")" + "[/font][/align][/b]";
                break;
            case "2":
                retorno += "\n[b][align=center][font=Verdana]" + this.Data.TMDb.tv_results[0].name + " (" + this.Data.OMDb.Title + ")" + "[/font][/align][/b]";
                break;
            case "3":
                retorno += "\n[b][align=center][font=Verdana]" + this.Data.TMDb.tv_episode_results[0].name + " (" + this.Data.OMDb.Title + ")" + "[/font][/align][/b]";
            default:
                break;
        }

        var str = `${retorno}
                    [b][align=center][font=Verdana] (${this.Data.OMDb.Year}) [/font][/align][/b]`;

        return str;
    },

    InserirCapa: function () {
        var retorno = ``;

        switch (this.TipoGerador) {
            case "1":
                retorno += `\n[align=center][img]${baseLib.StaticUrl.urlBaseTMDbPoster + this.Data.TMDb.movie_results[0].poster_path}[/img][/align]`;
                break;
            case "2":
                retorno += `\n[align=center][img]${baseLib.StaticUrl.urlBaseTMDbPoster + this.Data.TMDb.tv_results[0].poster_path}[/img][/align]`;
                break;
            case "3":
                retorno += `\n[align=center][img]${baseLib.StaticUrl.urlBaseTMDbPoster + this.Data.TMDb.tv_episode_results[0].still_path}[/img][/align]`;
                break;
            default:
                break;
        };

        return retorno;
    },

    InserirSinopse: function () {
        var sinopse = "";

        switch (this.TipoGerador) {
            case "1":
                sinopse = "\n[align=center][font=Verdana]" + ((this.Data.TMDb.movie_results[0].overview.length == 0) ? "###### SINOPSE NÃO ENCONTRATADA ######" : this.Data.TMDb.movie_results[0].overview) + "[/font][/align]";
                break;
            case "2":
                sinopse = "\n[align=center][font=Verdana]" + ((this.Data.TMDb.tv_results[0].overview == 0) ? "###### SINOPSE NÃO ENCONTRATADA ######" : this.Data.TMDb.tv_results[0].overview) + "[/font][/align]";
                break;
            case "3":
                sinopse = "\n[align=center][font=Verdana]" + ((this.Data.TMDb.tv_episode_results[0].overview == 0) ? "###### SINOPSE NÃO ENCONTRATADA ######" : this.Data.TMDb.tv_episode_results[0].overview) + "[/font][/align]";
                break;
            default:
                break;
        }


        var str = `[align=center][img]${baseLib.StaticUrl.urlSeparadorSinopseImage}[/img][/align]
                    ${sinopse}`;


        return str;
    },

    InserirInformacao: function () {
        var str = "";
        str += `\n[align=center][img]${baseLib.StaticUrl.urlSeparadorFichaTecnicaImage}[/img][/align]`;

        switch (this.TipoGerador) {
            case "1":
            case "2":
                str += `\n[align=center][font=Verdana]Data de Lançamento: [b]${this.Data.OMDb.Released}[/b][/font] [/align]`;
                break;

            case "3":
                str += `\n[align=center][font=Verdana]Data de Lançamento: [b]${baseLib.reformatDate(this.Data.TMDb.tv_episode_results[0].air_date)}[/b][/font] [/align]`;
                str += `\n[align=center][font=Verdana]Temporada: [b]${this.Data.OMDb.Season}[/b] [/font][/align]`;
                str += `\n[align=center][font=Verdana]Episódio: [b]${this.Data.OMDb.Episode}[/b] [/font][/align]`;
                break;
            default:
                break;
        }


        str += `\n[align=center][font=Verdana]Tempo: [b]${this.Data.OMDb.Runtime}[/b][/font] [/align]`;

        if (this.TipoGerador == "1") str += `\n[align=center][font=Verdana]Produtora: [b]${this.Data.OMDb.Production}[/b][/font] [/align]`;

        str += `\n[align=center][font=Verdana]País de Origem: [b]${this.Data.OMDb.Country}[/b][/font] [/align]`;
        str += `\n[align=center][font=Verdana]Gêneros: [b]${this.Data.OMDb.Genre}[/b] [/font] [/align]`;
        if (this.Data.OMDb.Website != "N/A") str += `\n[align=center][font=Verdana]Site: [url=${this.Data.OMDb.Website}] Clique aqui [/url][/font][/align]`;

        return str;
    },

    InserirElenco: function () {
        var str = "";
        str += `\n[align=center][img]${baseLib.StaticUrl.urlSeparadorElencoImage}[/img][/align]`;

        this.Data.OMDb.Actors.split(',').forEach(element => {
            str += `\n[align=center][b][font=Verdana] ${element.trim()}[/b] - ATOR/ATRIZ[/font][/align]`
        });

        if (this.Data.OMDb.Director != "N/A") {
            this.Data.OMDb.Director.split(',').forEach(element => {
                str += `\n[align=center][b][font=Verdana] ${element.trim()}[/b] - DIRETOR(A)[/font][/align]`
            });
        }

        return str;
    },

    InserirCritica: function () {
        var str = "";

        if (this.Data.OMDb.Ratings.length > 0) {
            str += `\n[align=center][img]${baseLib.StaticUrl.urlSeparadorCriticasImage}[/img][/align]`;
            str += "\n[b][align=center][font=Verdana]CRÍTICA[/font][/align][/b]";

            this.Data.OMDb.Ratings.forEach(element => {
                switch (element.Source) {
                    case "Internet Movie Database":
                        str += `\n[align=center][img]${baseLib.StaticUrl.urlLogoIMDbImage}[/img][/align]`;
                        str += `\n[align=center][b][font=Verdana][url=https://www.imdb.com/title/${this.Data.OMDb.imdbID}]${element.Value.trim()}[/font][/b][/url][/align]`
                        break;

                    case "Rotten Tomatoes":
                    str += `\n[align=center][img]${baseLib.StaticUrl.urlLogoRottenTomatoesImage}[/img][/align]`;
                    str += `\n[align=center][b][font=Verdana]${element.Value.trim()}[/font][/b][/align]`

                        break;

                    case "Metacritic":
                    str += `\n[align=center][img]${baseLib.StaticUrl.urlLogoMetacriticImage}[/img][/align]`;
                    str += `\n[align=center][b][font=Verdana]${element.Value.trim()}[/font][/b][/align]`
                        break;
                    default:
                        break;
                }
            });

        }

        return str;
    },

    InserirTrailer: function () {
        return `[align=center][img]http://i.imgur.com/MM3UhCl.png[/img][/align]`;

    },

    InserirAgradecaComente: function () {

    },


    OMDbService: function () {
        var urlRequest = "https://www.omdbapi.com/?i=" + this.IMDbId + "&y=&plot=full&apikey=b045eb33";

        var result = null;

        $.ajax({
            url: urlRequest,
            async: false,
            success: function (data) {
                result = data;
            }
        });
        return result;
    },

    TMDbService: function () {
        var urlRequest = "https://api.themoviedb.org/3/find/" + this.IMDbId + "?api_key=650fbb9313eab50f47bc5981772e8218&language=pt-BR&external_source=imdb_id";

        var result = null;

        $.ajax({
            url: urlRequest,
            async: false,
            success: function (data) {
                result = data;
            }
        });
        return result;
    }


};