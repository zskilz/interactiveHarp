/**
 * @author Petrus J Pretorius
 * 
 * jQuery plugin that adds a interactive harp construction component.
 *
 * Used to demonstrate the origin of the 12-tone "tempered" scale.
 * 
 *
 */


(function($) {

    var defaultOptions = {
        legend: 'Interactive Harp',

    };

    var ns = 'interactiveHarp';

    var _mh = require("musicHelper");
    var _a = require("audioHelper");

    var _m = {
        addStringDiv: function(x, L, color, F) {
            var newString = $('<div/>');
            newString.addClass('stringaling')
            newString.css('left', x + 'px');
            newString.css('background', color);
            newString.css('height', L + 'px');
            newString.attr('F', F);
            //store the frequency interval relative to L0
            return (newString);
        },
        addNoteDiv: function(x, y, i, currBaseIndex) {
            var noteIndex = (i + currBaseIndex) % 12;
            var newNoteVal = $('<div>N<sub>' + i + '</sub><br/>(' + _mh.SciNotes[noteIndex] + ')</div>');
            newNoteVal.addClass('noteVal')
            newNoteVal.css('left', x + 'px');
            newNoteVal.css('top', y + 'px');
            return (newNoteVal);
        },
        calcHarmonics: function(L, n) {
            var Ret = [];
            for (var i = 1; i <= n; i++) {
                Ret.push(L / i);
            }
            return Ret;
        },
        makeScale: function(L, n) {
            var Ret = [L];
            for (var i = 1; i <= n; i++) {
                Ret.push(L / Math.pow(2, i / 12));
            }
            return Ret;
        },
        calcXPos: function(e, L, F) {
            return Math.log(F / L) * e.width() / 2 ;
        },
        drawSet: function(e, A, F, baseHue, sat, trans) {
            var s = 50,
                t = 0.75;
            if (sat !== undefined) s = sat;
            if (trans !== undefined) t = trans;
            for (var hue = baseHue, V, i = 0; V = A[i]; i++) {
                if (i > 1) {
                    hue += 360 / 12;
                    hue = hue % 360;
                }
                e.append(_m.addStringDiv(_m.calcXPos(e, V, F), V, 'hsla(' + hue + ',' + s + '%,50%,' + t + ')', F / V));
            }
        },
        drawNoteVals: function(e, A, F, currBaseIndex) {
            for (var V, i = 0; V = A[i]; i++) {

                e.append(_m.addNoteDiv(_m.calcXPos(e, V, F), V, i, currBaseIndex));

            }
        },

    };

    var methods = {
        init: function(options) {

            //TODO: extend options for styling customisation
            var _opt = $.extend({}, defaultOptions, options);
            var audio = _a.initAudio();



            return this.each(function() {
                var $this = $(this),
                    data = $this.data(ns);
                // If the plugin hasn't been initialized yet

                if (!data) {
                    var currBaseIndex = 0;
                    var btnHelper = function(className, content) {
                        return ($('<button/>').addClass(className).html(content));
                    };
                    var interactiveHarp = $('<div/>').addClass('interactiveHarp');
                    var extraFns = $('<div/>').addClass('extraFns');
                    var baseNote = $('<div/>').addClass('baseNote').html('Base Note:');
                    var iterate = btnHelper('iterate', 'Iterate');
                    var clear = btnHelper('clear', 'Clear');
                    var drawRef = btnHelper('drawRef', 'Draw L<sub>n</sub>=L<sub>0</sub>.2<sup>n/12</sup>; n=0..31 ("tempered" scale with 32 notes)');
                    var showNoteVals = btnHelper('showNoteVals', 'Draw Note Values');
                    var pentaScale = btnHelper('pentaScale', 'Pentatonic scale (4 iterations)');
                    var octaScale = btnHelper('octaScale', 'Octatonic scale (6 iterations)');
                    var twelveScale = btnHelper('twelveScale', 'non-tempered 12-tone scale (11 iterations).');
                    var manyScale = btnHelper('manyScale', 'many iterations later... (52 iterations).');
                    var mainStage = $('<div/>').addClass('stage');

                    //add to dom
                    extraFns.append(baseNote, iterate, clear, drawRef, showNoteVals, pentaScale, octaScale, twelveScale, manyScale);


                    interactiveHarp.append(extraFns);
                    interactiveHarp.append($('<div/>').addClass('legend').html(_opt.legend));
                    interactiveHarp.append(mainStage);

                    $this.append(interactiveHarp);

                    //setup logic
                    // base string length
                    var L = mainStage.height() * 0.9;
                    // "tempered" scale
                    var H = _m.makeScale(L, 12 * 2.5 + 1);
                    //setup the base note sellector
                    var baseNoteSelect = $('<select class="baseNoteSelect"/>');
                    for (var i = 0, sciNote; sciNote = _mh.SciNotes[i]; i++) {
                        baseNoteSelect.append('<option>' + sciNote + '</option>');
                    }

                    baseNoteSelect.change(function() {
                        currBaseIndex = _mh.SciNotes.indexOf($(this).val());
                        showNoteVals.click();
                    })

                    baseNote.append(baseNoteSelect);

                    var A = [];
                    var hue = 0;

                    var clearAll = function(Ob) {
                        Ob.splice(0);
                        //clear
                        Ob = _m.calcHarmonics(L, 3);
                        $this.find('.stringaling').remove();
                        $this.find('.noteVal').remove();
                        //cntx.clearRect(0, 0, canvas.width, canvas.height);

                        hue = 0;
                        _m.drawSet(mainStage, Ob, L, hue);
                        return Ob;
                    }
                    A = clearAll(A);
                    //init

                    var itt = function(Ob) {
                        var newBase;
                        //fin dthe new base note
                        for (var val, i = 0; val = Ob[i]; i++) {
                            if ((val > L / 8) && (val < L / 2)) {
                                while (val < L / 2) { //repeat octave shift untill L lies in the 1st octave range...
                                    val *= 2;
                                }
                                if (Ob.indexOf(val) == -1) { //check if we have it yet.
                                    newBase = val;
                                    continue;
                                }
                            }
                        }
                        hue += 360 / 12;
                        hue = hue % 360;

                        var newSet = _m.calcHarmonics(newBase, 3);
                        _m.drawSet(mainStage, newSet, L, hue);
                        for (var newVal, j = 0; newVal = newSet[j]; j++) { //add to the set
                            if (Ob.indexOf(newVal) == -1) {
                                Ob.push(newVal);
                            }
                        }

                    }

                    iterate.click(function() {
                        itt(A);

                    });
                    clear.click(function() {
                        A = clearAll(A);
                    });

                    drawRef.click(function() {
                        _m.drawSet(mainStage, H, L, 0, 10, 1);
                        showNoteVals.click();
                    });
                    showNoteVals.click(function() {
                        $this.find('.noteVal').remove();
                        _m.drawNoteVals(mainStage, H, L, currBaseIndex);
                    });
                    var callItter = function(times) {
                        A = clearAll(A);
                        for (var i = 0; i < times; i++) {
                            iterate.click();
                        }
                        showNoteVals.click();
                    }

                    pentaScale.click(function() {

                        callItter(4);
                        baseNoteSelect.selectedIndex = 9;
                        baseNoteSelect.change();
                    });

                    octaScale.click(function() {
                        callItter(6);
                        baseNoteSelect.selectedIndex = 8;
                        baseNoteSelect.change();
                    });

                    twelveScale.click(function() {
                        callItter(11);
                    });

                    manyScale.click(function() {
                        callItter(12 * 4 + 4);
                    });

                    if (audio && audio.audioSupported) {
                        $(document).on("mouseover", ".stringaling", function() {

                            audio.playNote($(this).attr('F'), currBaseIndex, 0);

                        });

                    }

                    $(this).data(ns, {
                        target: $this
                    });
                }

            });

        },


        destroy: function() {

            return this.each(function() {

                var $this = $(this),
                    data = $this.data(ns);

                $(window).unbind('.' + ns);
                //data.xxx.remove();
                $this.removeData(ns);

            })
        }
    };

    $.fn.interactiveHarp = function(method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method ' + method + ' does not exist on jQuery.' + ns);
        }

    };

})(jQuery);
