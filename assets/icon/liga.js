/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
    'use strict';
    function supportsProperty(p) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            i,
            div = document.createElement('div'),
            ret = p in div.style;
        if (!ret) {
            p = p.charAt(0).toUpperCase() + p.substr(1);
            for (i = 0; i < prefixes.length; i += 1) {
                ret = prefixes[i] + p in div.style;
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    }
    var icons;
    if (!supportsProperty('fontFeatureSettings')) {
        icons = {
            'image': '&#xe913;',
            'picture': '&#xe913;',
            'dice': '&#xe93e;',
            'game': '&#xe93e;',
            'pacman': '&#xe93f;',
            'game2': '&#xe93f;',
            'spades': '&#xe940;',
            'cards': '&#xe940;',
            'clubs': '&#xe941;',
            'cards2': '&#xe941;',
            'diamonds': '&#xe942;',
            'cards3': '&#xe942;',
            'profile': '&#xe93b;',
            'file2': '&#xe93b;',
            'folder-plus': '&#xe931;',
            'directory3': '&#xe931;',
            'floppy-disk': '&#xe962;',
            'save2': '&#xe962;',
            'undo': '&#xe965;',
            'ccw': '&#xe965;',
            'redo': '&#xe966;',
            'cw': '&#xe966;',
            'list-numbered': '&#xe9b9;',
            'options': '&#xe9b9;',
            'list': '&#xe9ba;',
            'todo': '&#xe9ba;',
            'list2': '&#xe9bb;',
            'todo2': '&#xe9bb;',
            'minus': '&#xea0b;',
            'subtract': '&#xea0b;',
            'info': '&#xea0c;',
            'information': '&#xea0c;',
            'spell-check': '&#xea12;',
            'spelling': '&#xea12;',
            'sort-amount-asc': '&#xea4c;',
            'arrange5': '&#xea4c;',
            'sort-amount-desc': '&#xea4d;',
            'arrange6': '&#xea4d;',
            'checkbox-checked': '&#xea52;',
            'checkbox': '&#xea52;',
            'checkbox-unchecked': '&#xea53;',
            'checkbox2': '&#xea53;',
            'radio-checked': '&#xea54;',
            'radio-button': '&#xea54;',
            'ligature': '&#xea5d;',
            'typography': '&#xea5d;',
            'ligature2': '&#xea5e;',
            'typography2': '&#xea5e;',
            'text-height': '&#xea5f;',
            'wysiwyg': '&#xea5f;',
            'text-width': '&#xea60;',
            'wysiwyg2': '&#xea60;',
            'font-size': '&#xea61;',
            'wysiwyg3': '&#xea61;',
            'bold': '&#xea62;',
            'wysiwyg4': '&#xea62;',
            'underline': '&#xea63;',
            'wysiwyg5': '&#xea63;',
            'italic': '&#xea64;',
            'wysiwyg6': '&#xea64;',
            'strikethrough': '&#xea65;',
            'wysiwyg7': '&#xea65;',
            'page-break': '&#xea68;',
            'wysiwyg10': '&#xea68;',
            'superscript2': '&#xea6b;',
            'wysiwyg13': '&#xea6b;',
            'subscript2': '&#xea6c;',
            'wysiwyg14': '&#xea6c;',
            'text-color': '&#xea6d;',
            'wysiwyg15': '&#xea6d;',
            'clear-formatting': '&#xea6f;',
            'wysiwyg17': '&#xea6f;',
            'table': '&#xea70;',
            'wysiwyg18': '&#xea70;',
            'insert-template': '&#xea72;',
            'wysiwyg20': '&#xea72;',
            'youtube': '&#xea9d;',
            'brand21': '&#xea9d;',
            'tux': '&#xeabd;',
            'brand52': '&#xeabd;',
          '0': 0
        };
        delete icons['0'];
        window.icomoonLiga = function (els) {
            var classes,
                el,
                i,
                innerHTML,
                key;
            els = els || document.getElementsByTagName('*');
            if (!els.length) {
                els = [els];
            }
            for (i = 0; ; i += 1) {
                el = els[i];
                if (!el) {
                    break;
                }
                classes = el.className;
                if (/icon-/.test(classes)) {
                    innerHTML = el.innerHTML;
                    if (innerHTML && innerHTML.length > 1) {
                        for (key in icons) {
                            if (icons.hasOwnProperty(key)) {
                                innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
                            }
                        }
                        el.innerHTML = innerHTML;
                    }
                }
            }
        };
        window.icomoonLiga();
    }
}());
