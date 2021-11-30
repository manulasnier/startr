<?php include('config.php'); ?>
<!DOCTYPE html>
<html lang="fr">
	<head>
        <meta charset="utf-8" />
		<title>Startr - with less than nothing</title>
		<meta name="description" content="Startr - with less than nothing" />
        <meta name="viewport" content="width=device-width" />
        <link rel="stylesheet" href="<?= asset('app.css'); ?>" />
        <link rel="icon" type="image/png" href="<?= asset('favicon.png'); ?>" />
	</head>
	<body>
		<header>
            <h1>Startr</h1>
            <h2>Less tools for integrators</h2>
            <img class="logo" src="<?= asset('logo.svg'); ?>" alt="StartR">
        </header>
		<div class="content">

            <h2>COULEURS</h2>
            <div class="colors">
                <span class="color"></span>
                <span class="color2"></span>
                <span class="color3"></span>
            </div>

            <article class="headings-txt">
                <h1>Titre H1</h1>
                <h2>Titre H2</h2>
                <h3>Titre H3</h3>
                <h4>Titre H4</h4>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel elit arcu. Duis et sapien id lacus accumsan tempus. Ut lectus enim, sodales sit amet eros at, molestie faucibus eros. Pellentesque tempus ligula sem, quis vehicula urna pulvinar at. Donec commodo facilisis malesuada. Sed quis mauris et nisl finibus tempus vitae quis enim. Aliquam ut lacus eu justo vestibulum aliquam. Integer mattis nibh at nunc rutrum, et pretium massa dignissim. Vivamus dolor nunc, porttitor ut cursus ut, elementum ac urna. Aliquam erat volutpat.
                </p>
                <ul>
                    <li>Liste item</li>
                    <li>Liste item</li>
                    <li>Liste item</li>
                    <li>Liste item</li>
                </ul>
            </article>

            <form>
                <label>Exemple de label</label>
                <input type="text" placeholder="Input de type text" />

                <label>Exemple de label <em>avec une ligne de sous-titre</em></label>
                <textarea placeholder="Eemple de textarea"></textarea>

                <p class="checkbox">
                    <input type="checkbox" id="checkbox-demo" />
                    <label for="checkbox-demo">Exemple de checkbox</label>
                </p>

                <ul class="list-radio">
                    <li>
                        <input type="radio" name="radio-test" id="radio-1" />
                        <label for="radio-1">Premier choix</label>
                    </li>
                    <li>
                        <input type="radio" name="radio-test" id="radio-2" />
                        <label for="radio-2">Second choix</label>
                    </li>
                </ul>
            </form>

            <h2>Exemple POPUP</h2>
            <a class="btn btn-primary" href="javascript:void(0);" data-popup="mon-popup">Bouton du popup</a>

            <div id="mon-popup" class="popup">
                <h3 class="popup-heading">
                    Titre de mon popup
                </h3>
                <div class="popup-content">
                    <p>Contenu du popup</p>
                </div>
                <button class="close-popup"><i class="icon-close"></i></button>
            </div>

            <h2>Exemple Système d'onglets</h2>
            <nav class="nav-onglets">
                <a class="actif" href="javascript:void(0);" data-onglet="section1">Lien section 1</a>
                <a href="javascript:void(0);" data-onglet="section2">Lien section 2</a>
                <a href="javascript:void(0);" data-onglet="section3">Lien section 3</a>
            </nav>

            <section id="section1" class="onglet-content open">Contenu de la section 1</section>
            <section id="section2" class="onglet-content">Contenu de la section 2</section>
            <section id="section3" class="onglet-content">Contenu de la section 3</section>	
		</div> <!-- .content -->
		<footer>
            Less by Startr
        </footer>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="<?= asset('app.js'); ?>"></script>
		
	</body>
</html>
