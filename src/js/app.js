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
import  "./components/about-scramble";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
const _pages = $('main').data('page');



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\


$(function() {
    'use strict';

    // console.log('INIT');
    

    switch(_pages){
        case 'home':
            PageLoad.init();
            Home.init();
        break;
        case 'about':
            About.init();
            PageLoad.hide();
        break;
        case 'about-approach':
            Approach.init();
            PageLoad.hide();
        break;
        case 'about-team':
            Team.init();
            PageLoad.hide();
        break;
        case 'works':
            Works.init();
            PageLoad.hide();
        break;
        case 'contact':
            Contact.init();
            PageLoad.hide();
        break;
        case 'services':
            Services.init();
            PageLoad.hide();
        break;
        case 'service':
            Service.init();
            PageLoad.hide();
        break;
        default:
            PageLoad.hide();
            break;
    }

    $( window ).on('resize', function() {
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

        // console.log('resize');
    });

});
