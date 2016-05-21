/** @license
 *
 * OhMyRadio.js - An Online Radio Player
 *
 * Essentially requires SoundManager2 Library:
 * http://schillmania.com/projects/soundmanager2/
 *
 * ----------------------------------------------
 * Web: https://github.com/vishaltelangre/OhMyRadio
 *
 * Copyright (c) 2013, Vishal Telangre. All rights reserved.
 * Code provided under the MIT License:
 * https://github.com/vishaltelangre/OhMyRadio/LICENSE.md
 *
 * Version 0.0.1
 */


(function(window, undefined) {
  /*
   * ------------------------
   * Global Variable Setup
   * ------------------------
   */

  var sm = soundManager,
      PLAYING = 0,
      PAUSED = 1,
      STOPPED = 2;

  /*
   * ------------------------
   * Private
   * ------------------------
   */

  var _local = {
    settings: {}, /* _local.settings */

    defaults: {
      stations: {
        Marathi_Spacia_Net: "http://208.80.53.106:16704",
        Hindi_Evergreen: "http://50.7.77.114:8296",
        Nonstop_Hindi: "http://159.253.145.180:7090",
        Radio_Gabbar: "http://159.253.145.180:7090",
        CENEMIX: "http://192.184.9.79:8006",
        Streaming_Soundtracks: "http://91.121.140.11:8000",
        SoundTrax_FM: "http://91.121.140.11:8000",
        Black_Beats_Radio: "http://93.119.227.84:9000",
        Radio_DEEA: "http://178.157.81.147:8090",
        COOL_fahrenheit_93: "http://5.231.68.21:8004",
        Radio_Sound_Popup_Brasil: "http://173.193.202.68:7460",
        Rock_Radio: "http://174.36.206.197:8000",
        FM_181_Highway: "http://108.61.73.118:14018",
        FM_181_Buzz: "http://108.61.73.120:14126",
        Chart_Hits_Top_40: "http://95.141.24.98:80",
        Americas_Best_Ballads: "http://108.61.73.118:14018",
        Piano_N: "http://222.122.131.58:6400",
        Kick_Radio_80s: "http://173.193.202.87:8085",
        Planet_Radio_80s: "http://67.213.220.36:80"
      } /* _local.defaults.stations */
    }, /* _local.defaults */

    playerState: null, /* _local.playerState */

    lastUpdatedAt: 0, /* _local.lastUpdatedAt */

    playlist: {}, /* _local.playlist */

    /*
     * Usage:
     *   each([1,2,3], function(i){})
     */
    each: function(a, b) {
      var d = a.length,
        e = Array.prototype.forEach;
      if (isNaN(d))
        for (var f in a)
          c.isOwn(a, f) && b(a[f], f, a);
      else if (e)
        e.call(a, b);
      else
        for (var g = 0; d > g; g++)
          b(a[g], g, a);
    },/* _local.each */

    /*
     * Usage:
     *   target = extend({}, toObj, fromObj )
     */
    extend: function(copy, to, from){
      this.each(Array.prototype.slice.call(arguments, 1), function(objcts){
        var loop = function(final, obj){
          for( prop in obj ){
            if( typeof obj[prop] !== "object" ){
              final[prop] = obj[prop];
            }
            else{
              if(typeof final[prop] === "undefined") final[prop] = {};
              loop(final[prop], obj[prop]);
            }
          }
        }
        loop(copy, objcts);
      });
      return copy;
    }, /* _local.extend */

    /*
     * Logs a message for the developer if logging is on.
     */
    log: function() {
      if (true) {
        var time = new Date().toLocaleTimeString();
        var LOG_PREFIX = "[OhMyRadio] - " + time;
        var args = Array.prototype.slice.call( arguments );
        args.unshift( LOG_PREFIX + " ::" );

        window.console &&
        ( window.console.log.apply
          ? window.console.log.apply( window.console, args )
          : window.console.log( Array.prototype.slice.call( args, 0 ).join(" "))
        )
      }
    }, /* _local.log */

    /*
     * Event listeners
     */
    events: {
      play: function(e) {
        _local.playerState = PLAYING;
      },
      stop: function(e) {
        _local.playerState = STOPPED;
      },
      pause: function(e) {
        _local.playerState = PAUSED;
      },
      resume: function(e) {
        _local.playerState = PLAYING;
      },
      finish: function(e) {
        _local.log("Nothing to play now!");
      },
      whileloading: function(e) {
      },
      onload: function(e) {
        if (_local.sound.readyState == 2) {
        }
      },
      whileplaying: function(e) {
        var d = new Date();
        if (d - _local.lastUpdatedAt > 50){
          _local.lastUpdatedAt = d;
        }
      },
      ontimeout: function(){
        _local.log("Timed out! Try again.");
      },
      id3: function(id3){
        _local.log("ID3 Info: ", id3);
      }
    }, /* _local.events */

    /*
     * Keeps currently playing station's soundManager sound object's copy here.
     * We'll use this everywhere to manage currently playing station.
     */
    sound: {}, /* _local.sound */


    /*
     * Creates soundManager sound object and cache it in the `_local.playlist`
     * store. If the sound object is already exist in the store, then it is
     * returned without creating a new object.
     */
    prepareStation: function( stationName, stationMeta ) {
      var currentStation;
      if ( _local.playlist[ stationName ] ){
        currentStation = _local.playlist[ stationName ];
      }
      else {
        currentStation = sm.createSound({
          id: stationName,
          url: stationMeta[ stationName ] + "/;OhMyRadio",
          onplay: _local.events.play,
          onstop: _local.events.stop,
          onpause: _local.events.pause,
          onresume: _local.events.resume,
          onfinish: _local.events.finish,
          whileloading: _local.events.whileloading,
          whileplaying: _local.events.whileplaying,
          onid3: _local.events.id3,
          onload: _local.events.onload,
          ontimeout: _local.events.ontimeout,
          autoPlay: false,
          type: 'audio/mp3',
          volume: _local.settings.volume || 100
        });
        _local.playlist[ stationName ] = currentStation;
      }
      _local.log("Playing:", stationName);
      return currentStation;
    }, /* _local.prepareStation */
  }; /* _local */


  /*
   * ------------------------
   * Public
   * ------------------------
   */
  var _public = {
    togglePlay: function(){
      switch( _local.playerState ) {
        case PLAYING:
          _local.sound.pause();
          break;
        case PAUSED:
          _local.sound.resume();
          break;
        case STOPPED:
          _local.sound.play();
          break;
        default:
          _local.log("Gotta fucked up somewhere! :(");
      }
      return _local.playerState;
    }, /* _public.togglePlay */

    /*
     * Increase the volume of sound on a scale of 0-100.
     */
    increaseVolume: function( increaseBy ){
      var increaseBy = increaseBy || 10;
      if ( _local.sound.volume <= 100 - increaseBy ){
        _local.sound.setVolume( _local.sound.volume + increaseBy );
      }
      return _local.sound.volume;
    }, /* _public.increaseVolume */

    /*
     * Decrease the volume of sound on a scale of 0-100.
     */
    decreaseVolume: function( decreaseBy ){
      var decreaseBy = decreaseBy || 10;
      if ( _local.sound.volume >= decreaseBy ){
        _local.sound.setVolume( _local.sound.volume - decreaseBy );
      }
      return _local.sound.volume;
    }, /* _public.decreaseVolume */

    /*
     * Play the station by name from the `stations` list.
     */
    playByName: function( name ) {
      var stationMeta = {};
      stationMeta[ name ] = _local.settings.stations[ name ];
      // stop currently playing station before proceeding
      if ( _local.sound.sID ) {
        _local.sound.stop();
        _local.sound.unload();
      }
      if( stationMeta === "undefined" ) {
        _local.log("Can't find station:" + name);
        return;
      }
      _local.playlist.currentlyPlaying = stationMeta;
      _local.sound = _local.prepareStation( name, stationMeta );
      _local.sound.play();
      // return _local.sound;
      return stationMeta;
    }, /* _public.playByName */

    /*
     * Play the station from the `stations` list by id.
     */
    playById: function( id /* {Integer} */ ) {
      // sbottom currently playing station before proceeding
      if ( _local.sound.sID ) {
        _local.sound.stop();
        _local.sound.unload();
      }
      var stationName = Object.keys( _local.settings.stations )[ id ];
      if( stationName === "undefined" ) {
        _local.log("Can't find such station!");
        return;
      }
      return _public.playByName( stationName );
    }, /* _public.playById */

    /*
     * Plays the next station from the available `stations` list.
     */
    nextStation: function() {
      var nextId,
        allStations = _local.settings.stations,
        currentlyPlayingMeta = _local.playlist.currentlyPlaying,
        currentlyPlayingName = Object.keys( currentlyPlayingMeta )[0],
        currentlyPlayingId = Object.keys( allStations ).indexOf( currentlyPlayingName );

      if ( currentlyPlayingId + 1 >= Object.keys( allStations ).length ) {
        nextId = 0;
      } else {
        nextId = currentlyPlayingId + 1;
      }
      return _public.playById( nextId );
    }, /* _public.nextStation */

    /*
     * Plays the previous station from the available `stations` list.
     */
    prevStation: function() {
      var prevId,
        allStations = _local.settings.stations,
        currentlyPlayingMeta = _local.playlist.currentlyPlaying,
        currentlyPlayingName = Object.keys( currentlyPlayingMeta )[0],
        currentlyPlayingId = Object.keys( allStations ).indexOf( currentlyPlayingName );

      if ( currentlyPlayingId - 1 < 0 ) {
        prevId = Object.keys( allStations ).length - 1;
      } else {
        prevId = currentlyPlayingId - 1;
      }
      return _public.playById( prevId );
    }, /* _public.nextStation */

    init: function( config ){
      if ( typeof config !== "object" ) config = {};
      _local.extend( _local.settings, _local.defaults, config );

      if ( sm.flashVersion >= 9 )
        sm.defaultOptions.usePeakData = _local.settings.usePeakData;

      return _public.playById( 0 );
    } /* _public.init */
  }; /* _public */

  window.OhMyRadio = _public;
}(window));
