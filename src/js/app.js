// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as Home from "./pages/home";

import * as PageLoad from "./modules/page-load";
import  "./modules/svg";

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
        break
    }

    $( window ).resize(function() {
        switch(_pages){
            case 'home':
                Home.resize();
            break
        }
    });

});
