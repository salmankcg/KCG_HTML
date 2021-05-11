// ------------------------------ \\\
// ---------- IMPORTS ----------- \\\
// ------------------------------ \\\
import $ from "jquery";
import * as Home from "./pages/home";

import  "./modules/svg";
import  "./modules/loader";

import  "./components/button";
import  "./components/testimonial";



// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
const _pages = $('main').data('page');



// ----------------------------------------- \\\
// ---------------- INIT'S ----------------- \\\
// ----------------------------------------- \\\
$(function() {
    "use strict";

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
