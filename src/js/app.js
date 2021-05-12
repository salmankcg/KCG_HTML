// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as PageLoad from "./modules/page-load";
import  "./modules/svg";


import * as Home from "./pages/home";
import * as About from "./pages/about";


import  "./components/button";
import  "./components/footer";
import  "./components/header";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
const _pages = $('main').data('page');



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
$(function() {
    "use strict";

    PageLoad.init();

    switch(_pages){
        case 'home':
            Home.init();
        break;
        case 'about':
            About.init();
        break;
    }

    $( window ).resize(function() {
        switch(_pages){
            case 'home':
                Home.resize();
            break;
            case 'home':
                About.resize();
            break;
        }
    });

});
