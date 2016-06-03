// Webpack hacks
declare var require;

import 'reflect-metadata';

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');

// The usual bootstrapping imports
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent }   from './components/app.component';


bootstrap(AppComponent, [ HTTP_PROVIDERS ]);
