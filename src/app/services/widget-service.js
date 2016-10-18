angular
.module('musicTheory.service', [])
.factory('WidgetService', function() {
    'use strict';
    var widgets = [
        {
            name: 'Mode Chart',
            path: '/widget/modechart'
        },
        {
            name: 'Key Lookup',
            path: '/widget/keylookup'
        },
        {
            name: 'Chords',
            path: '/widget/chord'
        },
        {
            name: 'Notes',
            path: '/widget/note'
        },
        {
            name: 'Random Chord',
            path: '/widget/randomchord'
        },
        {
            name: 'Keyboard',
            path: '/widget/keyboard'
        }
        // ,
        // {
        //     name: 'Flash Cards',
        //     path: '/widget/flashcards'
        // }
    ];

    this.widgets = widgets;
    return this;
});
