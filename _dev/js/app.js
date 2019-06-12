// JS FRONT OFFICE

// INPUT FILE CUSTOM
var inputFileItems = document.querySelectorAll(".input-file");

for (var i = 0; i < inputFileItems.length; i++) {
    var fileInput = inputFileItems[i].children[0],
        button = inputFileItems[i].children[1],
        the_return = inputFileItems[i].children[2];

    button.addEventListener("keydown", function(event) {
        if (event.keyCode == 13 || event.keyCode == 32) {
            this.previousElementSibling.focus();
        }
    });

    button.addEventListener("click", function(event) {
        this.previousElementSibling.focus();
        return false;
    });

    fileInput.addEventListener("change", function(event) {
        var this_return = this.nextElementSibling.nextElementSibling;
        this_return.innerHTML = this.value.replace('C:\\fakepath\\', ' ');
    });
} // END

$(document).ready(function() {

    // RETOUR EN HAUT - créer balise #gotop
    $('#gotop').on('click', function() { //
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });

    // BOUTON TOGGLE MAIN NAV
    $('.toggle-nav').click(function() {
        $(this).toggleClass("menu-open");
        $('.menu').toggleClass("showing-nav");
        return false;
    });

    $('.toggle-nav > span').click(function() {
        $(this).parent().toggleClass("menu-open");
        $('.menu').toggleClass("showing-nav");
        return false;
    });

    // POPUP
    $('*[data-popup]').click(function() {
        $('body').addClass('mode-popup');
        $('#' + $(this).attr('data-popup')).addClass('open');
    })

    // CLOSE POPUP
    $('.close-popup').click(function() {
        $('body').removeClass('mode-popup');
        $(this).parent('.popup').removeClass('open');
    })

    // ONGLETS
    $('*[data-onglet]').click(function() {
        $('.nav-onglet > a').removeClass('actif');
        $('.onglet-content').removeClass('open');
        $(this).addClass('actif');
        $('#' + $(this).attr('data-onglet')).addClass('open');
    })

    // TOGGLE SECTION
    $('.toggle-section > .toggle-item').on('click', '> .toggle-launcher', function() {
        if ($(this).parent('.toggle-item').hasClass("open")) {
            $(this).closest('.toggle-section').find('> .toggle-item.open > .section-content').hide('fast');
            $(this).closest('.toggle-section').find('> .toggle-item.open').removeClass('open');
        } else {
            $(this).closest('.toggle-section').find('> .toggle-item.open > .section-content').hide('fast');
            $(this).closest('.toggle-section').find('> .toggle-item.open').removeClass('open');
            $(this).parent('.toggle-item').addClass('open');
            $(this).next().show('fast').css('display', 'flex');
        }
        return false;
    });
}); // FIN DOCUMENT READY
