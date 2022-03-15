// ---------------------------------------------------------------------------
// Edit this file to define your game. It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "be1c95b9-cbc7-48c6-8e6a-89837aa9113e";

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.0";

/* A variable that changes the fade out speed of the option text on
 * a mobile. */
undum.game.mobileHide = 2000

/* A variable that changes the options fade out speed. */
undum.game.fadeSpeed = 1500

/* A variable that changes the slide up speed after clicking on an
 * option. */
undum.game.slideUpSpeed = 500

/* The situations that the game can be in. Each has a unique ID. */
undum.game.situations = {
    start: new undum.SimpleSituation(
        "<h1>La gran final de la Copa Cocacola</h1>\
        <img src='media/games/tutorial/logo.jpg' width='300' height='300' class='float_right'>\
        <p>Sales de casa y te preparas para jugar la final de la Copa Cocacola.\
		Entras al estadio y te quedas\
        asombrado al ver el estadio donde vas a jugar, tus compañeros se\
        rien de ti por tu inocencia y te llaman para entrar al vestuario.</p>\
        \
        <p>Llegando al vestuario te das cuenta de la cantidad de puestos y gente que entra,\
		tu entrenador te llama para entrar al vestuario, pero un señor te para y te dice que confia\
		en ti. Te quedas mirando al señor desconocido mientras entras.</p>\
        \
        <p class='transient'>Antes de entrar al vestuario <a href='cesped'>sales a ver el campo</a>.</p>"
    ),
	
	cesped: new undum.SimpleSituation(
       "<p>Saliste a ver el estadio.</p>\
		\
        <p>Vas a ver el cesped con algunos compañeros, te agachas a tocarlo y esta en perfecto\
		  estado y recien regado. Algunos compañeros se burlan de lo que haces.</p>\
		  \
        <p>Tu le dices que esto te lo enseño tu abuelo y que es para acostumbrarte \
		  a tacto del cesped para jugar, tus compañeros se asombran ya que ellos no te tomaban\
		  enserio.</p>\
		  \
        <p class='transient'>Pero al otro lado del campo <a href='todo'>hay algo que te llama la atención.</a>.</p>"
     ),

    // NB: The 'hub' situation which is the main list of topics, is
    // defined wholly in the HTML file, and doesn't have an entry in
    // the game.situations dictionary in this file.

    // For variety, here we define a situation using the top-level
    // Situation type. This is a neat approach to generate text by
    // looking it up in the HTML document. For static text that makes
    // more sense than writing it longhand.
    situations: new undum.Situation({
        enter: function(character, system, from) {
            system.write($("#s_situations").html());
        },
        optionText: "Sales al campo con tus compañeros",
    }),
    todo: new undum.SimpleSituation(
        "<p>Al otro campo saltan los jugadores vestidos todos igual de un color rojo\
		son todos mayores que tú por tres años, pero ves a alguien que te es similar\
		te quedas mirando y te saluda y va hacia a ti\
		¿Que haces,<a href='./saludas'>saludas</a> al desconocido?.</p>\
        \
        <p class='transient'>Vuelves <a href='hub'>al vestuario</a>.</p>",
        {
            actions: {
				'saludas': "<p>Saludas al rival que viene hacia ti\
							al saludarlo te das cuenta que es tu antiguo\
							vecino de la infacia Toni que se mudo hace 8 años\
							te alegras de verle y os deseais suerte para el partido.</p>"
							
            }
        }
    ),
    qualities: new undum.SimpleSituation(
        "<p>El entrenador os llama a todos para que le escucheis hablar, primero os da una charla\
		y tacticas de como se jugara el partido.</p>\
        \
        <p>Una vez hechas las tacticas el entrenador empieza a nombrar los jugadores\
		titulares y su posicion.</p>\
        \
        <p>Tu no estas de titular por lo cual le preguntas el por qué y te dice que no estas preparado\
		y se va sonriente</p>\
        \
        <p>¿Esto te <a href='./desmotivado'>desmotiva</a> o piensas que aun hay esperanzas para seguir <a href='./motivado'>entrenando más</a>?</p>\
		\
		<p class='transient'>Empieza el <a href='sticky'>partido</a>.</p>",
        {
           actions: {
                "desmotivado": function(character, system, action) {
                    system.setQuality("motivacion", character.qualities.motivacion-1);
                },
                "motivado": function(character, system, action) {
                    system.setQuality("motivacion", character.qualities.motivacion+1);
                }
		   }
		}
    ),
    sticky: new undum.SimpleSituation(
        "<p>Comienza el partido y te asombras por como juegan los demás.</p>\
		\
		<p>A los 20 minutos tu equipo pierde 0-2 y tu le pides a tu entrenador entrar\
		el te vuelve a repetir que es muy pronto para ti.</p>\
		\
		<p>Llegais al descanso y tu equipo se desmotiva pero tu sigues creyendo la remontada y contagias al equipo con tu alegria.</p>\
		\
		<p>Volveis al campo y <a href='segundaparte'> empieza la segunda parte</a>.</p>"
    ),
    segundaparte: new undum.SimpleSituation(
        "<p>Minuto 70 y se lesiona el capitan de tu equipo, el entrenador se dispone\
		a hacer un cambio, te llama a ti y dice que ahora si es tu momento.</p>\
        \
        <p>¿Decides <a href='juegas'>entrar a jugar</a> o <a href='finalmalo1'>le dices que no</a> a tu entrenador?</p>",
        {
            heading: "Comienza tu partido",
        }
    ),
    finalmalo1: new undum.SimpleSituation(
        "<p class='transient'>No entras al partido y perdeis 0-2 los demás jugadores te miran mal\
		y el entrenador te pido que no vuelvas a jugar con ellos.</p>\
		\
		<p class='transient'><img src='media/img/error.png' width='300' height='300'></p>\
		\
		<p class='transient'>Volver a <a href='segundaparte'>tomar la decision</a>.</p>"
    ),
    juegas: new undum.SimpleSituation(
        "<p>Sales a jugar el partido y el primer balon que tocas la pasas a tu compañero y marcais.</p>\
		\
		<p>Has contagiado a tu todo tu equipo, todos creen en la remontada.\
		Tras el pitido del arbitro salis a presionar y robas el balon,\
		se la pasas al delantero que marca otro gol.\
		2-2 y todo el estadio grita, en tan solo 15 minutos habeis marcado 2 goles.</p>\
		\
		<p>Tras otros 5 minutos luchando no lograis marcar otro gol para ganar el partido.\
		En el descuento te hacen una falta al borde del area...</p>\
		\
		<p>¿Te dispones a <a href='tiras'>tirar tu la falta</a> o <a href='finalmalo2'>se la dejas a cualquiera</a>?</p>",
		{	
			enter: function(character, system, from) {
                system.setQuality('ritmo',80);
				system.setQuality('tiro',85);
				system.setQuality('pase',87);
				system.setQuality('regates',83);
				system.setQuality('defensa',53);
				system.setQuality('fisico',78);
				system.setCharacterText(
                    "<p>Tus atributos / estadisticas para el partido</p>"
                );
            }
		}
	
    ),
    finalmalo2: new undum.SimpleSituation(
        "<p class='transient'>Dejaste tirar la falta a otro, ese otro era el jugador mas malo de tu equipo,\
		por lo que la falla y perdeis el partido en penaltis,¿por qué no tiraste tu?</p>\
		\
		<p class='transient'><center><img src='media/img/cagada.jpg' width='300' height='200'></center></p>"
    ),
	tiras: new undum.SimpleSituation(
		"<p class='transient'><a href='./tirar'>Te preparas.</a></p>",
		{
			actions: {
                "tirar": function(character, system, action) {
                    if(character.qualities.motivacion > 0){
						system.write("<p><a href='motivacionbien'>Coges el balon.</a></p>");
					}else{
						system.write("<p><a href='motivacionmal'>Coges el balon.</a></p>");
					}
				}
		   }
		}			
	),
	motivacionmal: new undum.SimpleSituation(
		"<p>Colocas el balon y te dispones a chutar, miras la barrera y te sientes con muy poca motivacion.</p>\
		\
		<p>Asi que te atreves a chutar y... FALLO , el balon toca la barrera, salen al contraataque y marcan GOL.</p>\
		\
		<p>El arbitro despues de ese gol pita el final del partido y perdeis la final de la copa 2-3.</p>\
		\
		<p>Vuelves a casa a descansar culpandote</p>\
		<h1>Hay que tener mas motivacion desde que sales a jugar...</h1>",
		{
			exit: function(character, system, to) {
                system.setCharacterText(
                    "<p>FINAL DE LA COPA COCACOLA.</p>"
                );
            }
		}
		
	),
	motivacionbien: new undum.SimpleSituation(
		"<p>Colocas el balon y te dispones a chutar, miras la barrera y te sientes con una gran motivacion.</p>\
		\
		<p>Asi que te atreves a chutar y... GOLAZOOO , el portero no llega a semejante balon.</p>\
		\
		<p><a href='finalbueno'>Vas a celebrar ese golazo</a></p>"
		
	),
	finalbueno : new undum.SimpleSituation(
		"<p>En ese instante el arbitro pita el final del partido y todo el mundo corre hacia a ti y te mantean.</p>\
		\
		<p>Sois los ganadores de la Copa Cocacola y te nombran el mejor jugador del partido\
		por dar 2 asistencias y hacer el gol de la victoria</p>\
		\
		\
		<h2>¡Aqui acaba tu participacion en esta historia, lo has hecho muy bien!</h2>\
		\
		<center><img src='media/img/trofeo.jpg' width='300' height='200'></center>",
		{
			heading: "GANADORES COPA COCACOLA",		
			exit: function(character, system, to) {
                system.setCharacterText(
                    "<p>FINAL DE LA COPA COCACOLA.</p>"
                );
            }			
		}
	)
};

// ---------------------------------------------------------------------------
/* The Id of the starting situation. */
undum.game.start = "start";

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {
	ritmo: new undum.NumericQuality(
        "Ritmo", {priority:"0001", group:'stats'}
    ),
    tiro: new undum.IntegerQuality(
        "Tiro", {priority:"0002", group:'stats'}
    ),
    pase: new undum.NumericQuality(
        "Pase", {priority:"0003", group:'stats'}
    ),
	regates: new undum.NumericQuality(
        "Regate", {priority:"0004", group:'stats'}
    ),
	defensa: new undum.NumericQuality(
        "Defensa", {priority:"0005", group:'stats'}
    ),
	fisico: new undum.NumericQuality(
        "Fisico", {priority:"0006", group:'stats'}
    ),
    motivacion: new undum.FudgeAdjectivesQuality( // Fudge as in the FUDGE RPG
        "<span title='Skill, Stamina and Luck are reverently borrowed from the Fighting Fantasy series of gamebooks. The words representing Luck are from the FUDGE RPG. This tooltip is illustrating that you can use any HTML in the label for a quality (in this case a span containing a title attribute).'>Motivacion</span>",
        {priority:"0007", group:'stats'}
    ),

    inspiration: new undum.NonZeroIntegerQuality(
        "Inspiration", {priority:"0001", group:'progress'}
    ),
    novice: new undum.OnOffQuality(
        "Novice", {priority:"0002", group:'progress', onDisplay:"&#10003;"}
    )
};

// ---------------------------------------------------------------------------
/* The qualities are displayed in groups in the character bar. This
 * determines the groups, their heading (which can be null for no
 * heading) and ordering. QualityDefinitions without a group appear at
 * the end. It is an error to have a quality definition belong to a
 * non-existent group. */
undum.game.qualityGroups = {
    stats: new undum.QualityGroup(null, {priority:"0001"}),
    progress: new undum.QualityGroup('Progress', {priority:"0002"})
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function(character, system) {
    //character.qualities.skill = 80;
    //character.qualities.stamina = 87;
    character.qualities.motivacion = 0;
    //character.qualities.novice = 1;
    //character.qualities.inspiration = 0;
    system.setCharacterText("<p>Vas a jugar el mayor trofeo del condado.</p>");
};
