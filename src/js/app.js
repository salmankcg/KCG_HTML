// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from 'jquery';

import * as PageLoad from './modules/page-load';
import './modules/scrollmagic'
import './modules/svg';

import * as Home        from './pages/home';
import * as About       from './pages/about';
import * as Approach    from './pages/about-approach';
import * as Team        from './pages/about-team';
import * as Works       from './pages/works';
import * as Contact     from './pages/contact';
import * as Services    from './pages/services';
import * as Service     from './pages/service';

import  './components/button';
import  './components/footer';
import  './components/header';
import  "./components/testimonial";
import  "./components/services-items";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
const _pages = $('main').data('page');



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
$(function() {
    'use strict';

    PageLoad.init();

    switch(_pages){
        case 'home':
            Home.init();
        break;
        case 'about':
            About.init();
        break;
        case 'about-approach':
            Approach.init();
        break;
        case 'about-team':
            Team.init();
        break;
        case 'works':
            Works.init();
        break;
        case 'contact':
            Contact.init();
        break;
        case 'services':
            Services.init();
        break;
        case 'service':
            Service.init();
        break;
    }

    $( window ).resize(function() {
        switch(_pages){
            case 'home':
                Home.resize();
            break;
            case 'services':
                Services.resize();
            break;
            case 'service':
                Service.resize();
            break;
        }
    });

});
