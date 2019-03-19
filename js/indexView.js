var indexView = {
    selectedTipoGerador: 0,

    bindButtons: function () {
        $('#btnTipoGerador').click(function () {
            selectedTipoGerador = $('#cmbTipoGerador').val();

            switch (selectedTipoGerador) {
                case "1":
                    $('#divFilmeSerie').show();
                    break;
                case "2":
                    $('#divJogosSteam').show();
                    break;
                case "3":
                    $('#divPlayStore').show();
                    break;
                case "4":
                    $('#divAnimes').show();
                    break;
            }

        });

        $('#btnLoadImdb').click(function () {

            GeradorFilmeSerieEpisodio.IMDbId = $('#txtIMDbId').val().trim();
            GeradorFilmeSerieEpisodio.Validar();

        });

        $('#btnLoadSteam').click(function () {

            GeradorJogosSteam.SteamId = $('#txtSteamId').val().trim();
            GeradorJogosSteam.Validar();

        });

        $('#btnLoadPlayStore').click(function () {

            GeradorAplicativoPlayStore.GooglePlayId = $('#txtPlayStoreId').val().trim();
            GeradorAplicativoPlayStore.Validar();

        });
         $('#btnLoadAnimes').click(function () {

            GeradorAnimes.AnimeID = $('#txtAnimesId').val().trim();
            GeradorAnimes.Validar();

        });
        

        jQuery.ajaxSetup({
            beforeSend: function () {
                $('#pageLoader').addClass("is-active");
            },
            complete: function () {
                $('#pageLoader').removeClass("is-active");
            },
            success: function () { }
        });


    }
}
