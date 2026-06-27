// Barra de busqueda


$(document).ready(function () {

    $("#btnBuscar").click(function () {

        let comida = $("#txtBuscar").val().trim();

        if (comida === "") {
            $("#resultado").html("<p>Escribe algo para buscar.</p>");
            return;
        }

        $("#platosIniciales").hide();

        $("html, body").animate({
        scrollTop: $("#resultado").offset().top
        }, 800);

        $.ajax({
            url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${comida}`,
            type: "GET",
            dataType: "json",

            success: function (respuesta) {

                $("#resultado").html("");


                $("#resultado").append(`
                    <h2 class="titulo-busqueda">
                        Resultado de búsqueda: "${comida}"
                    </h2>
                `);

                if (respuesta.meals && respuesta.meals.length > 0) {

                    respuesta.meals.forEach(function (meal) {

                        $("#resultado").append(`
                            <div class="C-menu" data-id="${meal.idMeal}">
                              
                                <h2>${meal.strMeal}</h2>
                                <img src="${meal.strMealThumb}" width="250">
                                <p><strong>Categoría:</strong> ${meal.strCategory}</p>
                                <p><strong>Área:</strong> ${meal.strArea}</p>

                            </div>
                        `);

                    });

                } else {
                    $("#resultado").html("<p>No se encontraron recetas.</p>");
                }
            },

            error: function () {
                $("#resultado").html("<p>Error al consultar la API.</p>");
            }
        });

    });

});






// Mostrar comidas al azar


$(document).ready(function () {

    $("#resultado").html("");

  
    $("#resultado").append(`
        <h2 class="platoDia">Parte de nuestro menu</h2>
    `);

    for (let i = 0; i < 12; i++) {

        $.ajax({
            url: "https://www.themealdb.com/api/json/v1/1/random.php",
            type: "GET",

            success: function (data) {

                let comida = data.meals[0];

                $("#resultado").append(`
                    <div class="C-menu" data-id="${comida.idMeal}">
                        <img src="${comida.strMealThumb}" alt="${comida.strMeal}">
                        <h2>${comida.strMeal}</h2>
                    </div>
                `);

            },

            error: function () {
                $("#resultado").html("<h2>Error al cargar el menú.</h2>");
            }
        });
    }
});







// Mostrar detalles al hacer clic


$(document).on("click", ".C-menu", function() {

        let id = $(this).data("id");

        $.ajax({
            url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
            type: "GET",

            success: function(data) {

                let comida = data.meals[0];

                $("#detalle").html(`
                    <div class="detalle-menu">
                        <h2>${comida.strMeal}</h2>
                        <img src="${comida.strMealThumb}" width="350">
                        <p><strong>Categoría:</strong> ${comida.strCategory}</p>
                        <p><strong>Origen:</strong> ${comida.strArea}</p>
                        <p><strong>Instrucciones:</strong></p>
                        <p>${comida.strInstructions}</p>
                    </div>
                `);

                $("html, body").animate({
                    scrollTop: $("#detalle").offset().top
                }, 500);
            }
        });

    });

