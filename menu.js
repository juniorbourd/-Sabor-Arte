// Mostrar menu


$(document).ready(function () {

    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/search.php?s=",
        type: "GET",

        success: function(data) {

            let comidas = data.meals.slice(0, 24);

            $.each(comidas, function(i, comida) {

                let precio = comida.idMeal % 500 + 500;

                $("#menu").append(`
                    <div class="C-menu" data-id="${comida.idMeal}">

                        <img src="${comida.strMealThumb}" alt="${comida.strMeal}">
                        <h2>${comida.strMeal}</h2>
                        <p class="precio">RD$${precio}</p>
                        
                    </div>
                `);

            });
        },

        error: function() {
            $("#menu").html("<h2>Error al cargar el menú.</h2>");
        }
    });


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
