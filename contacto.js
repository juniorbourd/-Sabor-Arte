$(document).ready(function(){

    $("#formContacto").submit(function(e){

        e.preventDefault();

        $("#mensajeExito").html(`
            <div class="alerta">

                ✅ ¡Mensaje enviado correctamente!
                Nos pondremos en contacto contigo pronto.
                
            </div>
        `);

        this.reset();

    });

});


