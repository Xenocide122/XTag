$(function () {
    var lstore = function () {
        var b = {}, e = window,
            g = e.document,
            c;
        b.disabled = false;
        b.set = function () {};
        b.get = function () {};
        b.remove = function () {};
        b.clear = function () {};
        b.transact = function (a, d) {
            var f = b.get(a);
            if (typeof f == "undefined") f = {};
            d(f);
            b.set(a, f)
        };
        b.serialize = function (a) {
            return JSON.stringify(a)
        };
        b.deserialize = function (a) {
            if (typeof a == "string") return JSON.parse(a)
        };
        var h;
        try {
            h = "localStorage" in e && e.localStorage
        } catch (k) {
            h = false
        }
        if (h) {
            c = e.localStorage;
            b.set = function (a, d) {
                c.setItem(a, b.serialize(d))
            };
            b.get = function (a) {
                return b.deserialize(c.getItem(a))
            };
            b.remove = function (a) {
                c.removeItem(a)
            };
            b.clear = function () {
                c.clear()
            }
        } else {
            var i;
            try {
                i = "globalStorage" in e && e.globalStorage && e.globalStorage[e.location.hostname]
            } catch (l) {
                i = false
            }
            if (i) {
                c = e.globalStorage[e.location.hostname];
                b.set = function (a, d) {
                    c[a] = b.serialize(d)
                };
                b.get = function (a) {
                    return b.deserialize(c[a] && c[a].value)
                };
                b.remove = function (a) {
                    delete c[a]
                };
                b.clear = function () {
                    for (var a in c) delete c[a]
                }
            } else if (g.documentElement.addBehavior) {
                c = g.createElement("div");
                e = function (a) {
                    return function () {
                        var d = Array.prototype.slice.call(arguments, 0);
                        d.unshift(c);
                        g.body.appendChild(c);
                        c.addBehavior("#default#userData");
                        c.load("localStorage");
                        d = a.apply(b, d);
                        g.body.removeChild(c);
                        return d
                    }
                };
                b.set = e(function (a, d, f) {
                    a.setAttribute(d, b.serialize(f));
                    a.save("localStorage")
                });
                b.get = e(function (a, d) {
                    return b.deserialize(a.getAttribute(d))
                });
                b.remove = e(function (a, d) {
                    a.removeAttribute(d);
                    a.save("localStorage")
                });
                b.clear = e(function (a) {
                    var d = a.XMLDocument.documentElement.attributes;
                    a.load("localStorage");
                    for (var f = 0, j; j = d[f]; f++) a.removeAttribute(j.name);
                    a.save("localStorage")
                })
            }
        }
        try {
            b.set("__storejs__", "__storejs__");
            if (b.get("__storejs__") != "__storejs__") b.disabled = true;
            b.remove("__storejs__")
        } catch (m) {
            b.disabled = true
        }
        return b
    }();
    window.TurntableX = null;
    (function () {
        TurntableX = function () {
            var originalCLasses;
            var midnightClasses = {
                '#queue .songs .current-song': {
                    'background-color': '#111'
                },
                '#chat .message.verified': {
                    'background-color': 'rgb(49, 46, 16)'
                },
                '#buddyList': {
                    'background': '#222'
                },
                '#playlist .switch-menu.second': {
                    'background': '#151515',
                    'color': '#bbb'
                },
                '#playlist .switch-menu.second:hover': {
                    'background': '#050505',
                    'color': '#ccc'
                },
                '#buddyListNipple': {
                    'height': '3px',
                    'width': '0px',
                    'left': '17px',
                    'border-top': '10px solid #222',
                    'border-bottom': 'none',
                    'border-left': '10px solid transparent',
                    'border-right': '10px solid transparent',
                    'position': 'relative',
                    'background': 'none'
                },
                '.floating-panel .default-message, .queue-message': {
                    'text-shadow': '0 1px 0 black'
                },
                '.contextual-popup .options, .typeahead': {
                    'background': '#050505',
                    'border': 'solid 1px #444',
                    'box-shadow': '0 1px 0 0 rgba(100,100,100,0.1)'
                },
                '.contextual-popup .option, #guest-list .guestOptionsContainer .guestOption, .typeahead .suggestion': {
                    'color': '#aaa'
                },
                '#chat .message.action': {
                    'color': '#b49100'
                },
                '.edit-description': {
                    'color': '#999',
                    'background-color': '#111'
                },
                '#pmWindows .pmOptionsIconActive': {
                    'background': '#050505 url(http://turntablex.com/images/window_icons_inverted.png) 0 -19px no-repeat'
                },
                '#buddyListOptionsIconActive': {
                    'background': '#050505 url(http://turntablex.com/images/window_icons_inverted.png) 0 -19px no-repeat'
                },
                '#room-settings-container .nib .icon': {
                    'background': '#050505 url(http://turntablex.com/images/window_icons_inverted.png) -3px -22px no-repeat'
                },
                '.contextual-popup.closed .nib': {
                    'background-color': '#111'
                },
                'div.pmError': {
                    'border-top': '1px solid #1c1c1c',
                    'background': '#333'
                },
                '.contextual-popup .nib': {
                    'background': '#050505',
                    'border-left': 'solid 1px #444',
                    'border-right': 'solid 1px #444',
                    'border-top': 'solid 1px #444'
                },
                '.pmContent .message, #chat .message': {
                    'border': 'none',
                    'background-color': '#222',
                    'color': '#CCC'
                },
                '.pmContent .message:nth-child(odd), #chat .message:nth-child(odd), .guest-list-container .guests .guest:nth-child(even)': {
                    'background-color': '#333',
                    'color': '#CCC'
                },
                '#chat .message.mention': {
                    'background-color': 'rgb(15, 64, 126)',
                    'color': '#D6D6D6'
                },
                '.chat-container .messages, .guest-list-container .guests': {
                    'background-color': '#222'
                },
                '.guest-list-container .guest': {
                    'border': 'none',
                    'background-color': '#222',
                    'color': '#BBB'
                },
                '.guest-list-container .guests .guest:hover': {
                    'background-color': '#444',
                    'border-radius': '3px'
                },
                'div.pmHistoryDivider span.pmHistoryDividerText': {
                    'background-color': '#222',
                    'color': '#CCC'
                },
                'div.pmContainer': {
                    'background-color': '#222'
                },
                '.song': {
                    'background-color': '#222',
                    'border-bottom': 'none',
                    'border-top': 'none',
                    'color': '#CCC'
                },
                '.song.nth-child-even': {
                    'background-color': '#333'
                },
                '#song-log': {
                    'background-color': '#333'
                },
                '.song .title': {
                    'color': '#999'
                },
                '.song:hover': {
                    'background-color': '#444'
                },
                '.song-list ul': {
                    'background': '#222'
                },
                '.song-list ul.songs': {
                    'background': '#222'
                },
                '.song-list': {
                    'background': '#222'
                },
                '#chat, #guest-list, #playlist, #room-info': {
                    'background-color': '#222'
                },
                '#playlist': {
                    'background': '#222'
                },
                '.room-info-link h3': {
                    'color': '#AAA'
                },
                '#room-info-intro': {
                    'color': '#CCC',
                    'border-bottom': 'none'
                },
                '.room-info-wrap': {
                    'background-color': '#111',
                    'border-bottom': 'none'
                },
                '#room-info .room-name': {
                    'color': '#DDD'
                },
                '.description-wrap': {
                    'color': '#BBB'
                },
                '#queue .song.batch.selected': {
                    'box-shadow': '0 0 0 1px rgb(5, 31, 48)',
                    'background': 'rgb(6, 27, 54)'
                },
                '.flat-button': {
                    'box-shadow': 'none',
                    'background-color': '#090909',
                    'border': '1px solid #333333'
                },
                '.floating-panel .separator': {
                    'border-bottom': '1px solid #111',
                    'border-top': '1px solid #555555',
                    'text-shadow': '0 1px 0 black',
                    'color': '#DDD',
                    'background': '-webkit-linear-gradient(top,#555 0,#222 100%)'
                },
                '#buddyList .buddy, #pmOverflowList .buddy': {
                    'background': '#333'
                },
                '#buddyList .buddy:nth-child(even), #pmOverflowList .buddy:nth-child(even)': {
                    'background': '#222'
                },
                '#buddyList .name, #pmOverflowList .name': {
                    'color': '#EEE'
                },
                '#songs': {
                    'background-color': '#333'
                },
                '.settings-dropdown .dropdown .option': {
                    'background-color': '#333',
                    'box-shadow': 'inset 0 0 0 1px #444',
                    '-webkit-box-shadow': 'inset 0 0 0 1px #444',
                    '-moz-box-shadow': 'inset 0 0 0 1px #444',
                    'color': '#CCC'
                },
                '.floating-menu .option': {
                    'background-color': '#333',
                    'box-shadow': 'inset 0 0 0 1px #444',
                    'color': '#CCC'
                },
                '#playlist .floating-menu .option': {
                    'box-shadow': 'inset 0 0 0 1px #222',
                    '-webkit-box-shadow': 'inset 0 0 0 1px #222',
                    '-moz-box-shadow': 'inset 0 0 0 1px #222'
                },
                '.settings-dropdown .dropdown .option.special': {
                    'background-color': '#222'
                },
                '#playlist .song .song-options .site-add': {
                    'background-color': '#222'
                },
                '#playlist .song-options': {
                    'right': '47px'
                },
                '.song .title': {
                    'color': '#CCC'
                },
                '.song .details': {
                    'color': '#BBB'
                },
                '#queue .songs .currentSong': {
                    'background-color': '#10121F'
                },
                '#queue .songs .currentSong': {
                    'background-color': '#022561'
                },
                '.song .progress': {
                    'background-color': '#0081B4'
                },
                '#lame-button': {
                    'background-image': 'url(http://turntablex.com/images/songboard_down.png)'
                },
                '.song-playing #lame-button:active, #lame-button.selected, #lame-button.selected:hover': {
                    'background-image': 'url(http://turntablex.com/images/songboard_down_active.png)'
                },
                '.song-playing #lame-button:hover': {
                    'background-image': 'url(http://turntablex.com/images/songboard_down_hover.png)'
                },
                '#awesome-button': {
                    'background-image': 'url(http://turntablex.com/images/songboard_up.png)'
                },
                '.song-playing #awesome-button:active, #awesome-button.selected, #awesome-button.selected:hover': {
                    'background-image': 'url(http://turntablex.com/images/songboard_up_active.png)'
                },
                '.song-playing #awesome-button:hover': {
                    'background-image': 'url(http://turntablex.com/images/songboard_up_hover.png)'
                },
                '#songboard-artist, #songboard-title, #time, #time-left, #song-add': {
                    'text-shadow': '0 0 5px rgb(0,0,255)'
                },
                '#songboard, #song-add': {
                    'color': 'rgb(0,214,255)'
                },
                '#progress': {
                    'box-shadow': '0 0 5px rgba(0,183,218,0.66)'
                }
            };
            var settings;
            var defaultSettings = {
                panels: {
                    'scene': {
                        type: 'docked',
                        index: 1,
                        width: 'full',
                        left: 0,
                        top: 0,
                        height: '100%',
                        header: false,
                        header: false
                    },
                    'queue': {
                        type: 'docked',
                        index: 2,
                        width: 'auto',
                        left: 0,
                        top: 0,
                        height: '100%',
                        header: true,
                        hidden: true
                    },
                    'room': {
                        type: 'docked',
                        index: 0,
                        width: 'auto',
                        left: 0,
                        top: 0,
                        height: '100%',
                        header: true,
                        hidden: false
                    },
                    'chat': {
                        type: 'docked',
                        index: 3,
                        left: 0,
                        top: 0,
                        width: 'auto',
                        height: '100%',
                        header: true,
                        hidden: true
                    }
                },
                notifications: {
                    keywords: [],
                    mentionSoundURL: "",
                    mentionSoundVol: 4,
                    onAddDJ: {
                        chat: false,
                        desktop: false,
                        fans: false,
                        timer: 3000
                    },
                    onRemoveDJ: {
                        chat: false,
                        desktop: false,
                        fans: false,
                        timer: 3000
                    },
                    onOldSong: {
                        chat: false,
                        desktop: false,
                        fans: false,
                        timer: 3000
                    },
                    onNewSong: {
                        chat: false,
                        desktop: false,
                        fans: false,
                        timer: 3000
                    },
                    onChat: {
                        chat: false,
                        desktop: false,
                        fans: false,
                        timer: 3000
                    },
                    onMention: {
                        chat: false,
                        desktop: false,
                        fans: false,
                        timer: 3000
                    },
                    onHeart: {
                        chat: false,
                        desktop: false,
                        fans: false,
                        timer: 3000
                    },
                    onRegistered: {
                        chat: false,
                        desktop: false,
                        fans: false,
                        timer: 3000
                    },
                    onDeregistered: {
                        chat: false,
                        desktop: false,
                        fans: false,
                        timer: 3000
                    },
                    onPM: {
                        chat: false,
                        desktop: false,
                        fans: false,
                        timer: 3000
                    },
                    onFan: {
                        chat: false,
                        desktop: false,
                        fans: false,
                        timer: 3000
                    },
                    onUnfan: {
                        chat: false,
                        desktop: false,
                        fans: false,
                        timer: 3000
                    }
                },
                tags: {
                    names: [],
                    display: {},
                    songs: {}
                },
                laptop: {
                    type: 'default',
                    stickers: {
                        selected: '',
                        animations: {}
                    }
                },
                skin: 'default',
                version: version,
                autoDJ: false,
                autoAwesome: false,
                autoDJTimer: 50,
                chatCommands: true,
                chatDelimiter: '#',
                debug: false,
            };

            function loadSettings() {
                settings = lstore.get('ttx-settings');
                if (!settings) {
                    settings = defaultSettings;
                    lstore.set('ttx-settings', settings);
                    show_features = true;
                } else {
                    if (settings.version < version) {
                        show_features = true;
                        settings.version = version;
                    }
                    settings = $.extend(true, {}, defaultSettings, settings);
                    saveSettings(true);
                }
            }
            var saveTimer = null;

            function saveSettings(instant) {
                if (typeof instant === 'undefined') {
                    instant = true;
                }
                if (saveTimer !== null) {
                    clearTimeout(saveTimer);
                    saveTimer = null;
                }
                if (instant) {
                    lstore.set('ttx-settings', settings);
                } else {
                    setTimeout(function () {
                        saveSettings(true);
                    }, 10000);
                }
            }
            var Settings = function () {
                function settingsGet(key, def) {
                    if (key) key = '-' + key;
                    else key = '';
                    var local = lstore.get('ttx-settings' + key);
                    return local ? local : def;
                }

                function settingsSet(key, settings) {
                    if (key) key = '-' + key;
                    else key = '';
                    lstore.set('ttx-settings' + key, settings);
                }
                return {
                    get: settingsGet,
                    set: settingsSet
                };
            }();
            var IDLE_MAX = 15 * 60 * 1000;
            var IMAGES = {
                heart: '<img width="14" src="http://turntablex.com/images/heart.png" title="Queued" alt="Queued">',
                up: '<img width="14" src="http://turntablex.com/images/up.png" title="Awesomed" alt="Awesomed">',
                fan: '<img width="14" src="http://static.turntable.fm.s3.amazonaws.com/images/room/fan_icon.png" title="Fanned" alt="Fanned">',
                down: '<img width="14" src="http://turntablex.com/images/down.png" title="Lamed" alt="Lamed">',
                computer: '<img width="15" src="http://turntablex.com/images/computer.png">',
                x: '<img width="14" src="http://turntablex.com/images/turntableX.png">'
            };
            var ICONS = {
                mod: '<div class="mod icon ttx-icon" title="Moderator"></div>',
                upvote: '<div class="upvote icon ttx-icon" title="Awesomed" style="background-image:url(http://turntablex.com/images/up.png); background-size: 15px auto; width: 15px;"></div>',
                downvote: '<div class="downvote icon ttx-icon" title="Lamed" style="background-image:url(http://turntablex.com/images/down.png); background-size: 15px auto; width: 15px;"></div>',
                heart: '<div class="heart icon ttx-icon" title="Snagged" style="background-image:url(http://turntablex.com/images/heart.png); background-size: 15px auto; width: 15px;"></div>',
                superuser: '<div class="superuser icon ttx-icon" title="Superuser"></div>',
                fanned: '<div class="fanned icon ttx-icon" title="Fanned"></div>'
            };
            var IMAGE_URLS = {
                x: 'http://turntablex.com/images/turntableX.png',
                ttstats: 'http://turntablex.com/images/ttstats.png'
            };
            var _mentionRegex = null;
            var self = this;
            var DEVX = window.location.hash.indexOf('devx') > -1;
            var TT = {};
            var _location = null;
            var _mods = null;
            var _idleTimers = null;
            var _usernames = null;
            var _users = null;
            var _djs = null;
            var _currentSong = null;
            var _upvoters = null;
            var _downvoters = null;
            var _hearts = null;
            var version = 119;
            var version_string = '1.1.9';
            var show_features = false;
            var paypal_donate = '<form style="display:inline-block" action="https://www.paypal.com/cgi-bin/webscr" target="_blank" method="post">\
<input type="hidden" name="cmd" value="_s-xclick">\
<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----MIIHLwYJKoZIhvcNAQcEoIIHIDCCBxwCAQExggEwMIIBLAIBADCBlDCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20CAQAwDQYJKoZIhvcNAQEBBQAEgYBulHtqD4uQzF/eAp2wx1W/aBJXoXiE3nXjvN4a3z6l6nGfCt4Qpng31w6SDDaGwI+D3EFwlcHSctSpXOqclM6pUAOcDEjiMKt3OvFWp0j0EC5F93xW8pW12fZ6kuJH/seUOMQiAW2AQ9uqaQ2WG9e2k+jPVzRHHhVE+imbwhLZUTELMAkGBSsOAwIaBQAwgawGCSqGSIb3DQEHATAUBggqhkiG9w0DBwQI2uVtbZNLqSaAgYixnP100fbzVxl96Etm1Q28h3Z70q0uTvM0zJsxjCUdh+DHt5sOe2skiH192KTlFZtKee9ejauW++5rp9Hr4Sed/dzK8wAGNnYT9cVCwQj4mxbPwyrFwdW9CJyzenJx0+edqGvw+3CA1Tcz7wbFFiGVPhcDzemC8OW+zsvs0I+/cP2f4o/doV1eoIIDhzCCA4MwggLsoAMCAQICAQAwDQYJKoZIhvcNAQEFBQAwgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tMB4XDTA0MDIxMzEwMTMxNVoXDTM1MDIxMzEwMTMxNVowgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBR07d/ETMS1ycjtkpkvjXZe9k+6CieLuLsPumsJ7QC1odNz3sJiCbs2wC0nLE0uLGaEtXynIgRqIddYCHx88pb5HTXv4SZeuv0Rqq4+axW9PLAAATU8w04qqjaSXgbGLP3NmohqM6bV9kZZwZLR/klDaQGo1u9uDb9lr4Yn+rBQIDAQABo4HuMIHrMB0GA1UdDgQWBBSWn3y7xm8XvVk/UtcKG+wQ1mSUazCBuwYDVR0jBIGzMIGwgBSWn3y7xm8XvVk/UtcKG+wQ1mSUa6GBlKSBkTCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb22CAQAwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOBgQCBXzpWmoBa5e9fo6ujionW1hUhPkOBakTr3YCDjbYfvJEiv/2P+IobhOGJr85+XHhN0v4gUkEDI8r2/rNk1m0GA8HKddvTjyGw/XqXa+LSTlDYkqI8OwR8GEYj4efEtcRpRYBxV8KxAW93YDWzFGvruKnnLbDAF6VR5w/cCMn5hzGCAZowggGWAgEBMIGUMIGOMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLFApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTIxMjA5MTcwMTAyWjAjBgkqhkiG9w0BCQQxFgQU9bSguw3QcFF40s2qPdRhgQgviiQwDQYJKoZIhvcNAQEBBQAEgYCy70wmHh9EW9TBU8RsFylv1HiLDAwXAnyWIgQCDPwYM4jU7uHqsauskqSfu1Ql3Oi1/7cvGRiy6GahKCrpiKZRWUBmjVNSqfDhfWfjOpOp5WMbi9tZib0clMjH6sYcAjDMsjA8iNEj3fBOb7ZFTyobOHTZrMi4q617Krk8vkwPzg==-----END PKCS7-----\
">\
<input type="image" style="padding:0px 0px 0px 0px; margin:0px 0px 0px 0px;border:none;display:inline-block;background-color:transparent" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" name="submit" alt="PayPal - The safer, easier way to pay online!">\
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">\
</form>';
            var paypal_premium = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">\
<input type="hidden" name="cmd" value="_xclick">\
<input type="hidden" name="custom" id="ttx_id" value="">\
<input type="hidden" name="business" value="RQRM2S636UK4U">\
<input type="hidden" name="lc" value="US">\
<input type="hidden" name="item_name" value="Turntable X Premium">\
<input type="hidden" name="amount" id="ttx_amount" value="10.00">\
<input type="hidden" name="currency_code" value="USD">\
<input type="hidden" name="button_subtype" value="services">\
<input type="hidden" name="no_note" value="0">\
<input type="hidden" name="cn" value="Add special instructions to the seller:">\
<input type="hidden" name="no_shipping" value="2">\
<input type="hidden" name="tax_rate" value="0.000">\
<input type="hidden" name="shipping" value="0.00">\
<input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynow_SM.gif:NonHostedGuest">\
<input type="image" style="padding:0px 0px 0px 0px; margin:0px 0px 0px 0px;border:none;display:inline-block;background-color:transparent" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">\
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">\
</form>\
';
            var changelog_message = '<h3>I wanted to give a special shoutout to some of the great artists here on TT.FM who have contributed to all of the awesome new avatars that are available. You guys rock!</h3>\
    <h3>&nbsp;</h3>\
    <h2><a href="javascript:TTX.TT.RoomView.callback(\'pm_user\',\'4e302b064fe7d015e309987e\')">@meowpwr</a><span style="font-size:16px"> for Meow</span></h2>\
    <h2><a href="javascript:TTX.TT.RoomView.callback(\'pm_user\',\'4e7cee5da3f7511653056b10\')">C y a n</a><span style="font-size:16px"> for Ninjette, Punk</span></h2>\
    <h2><a href="javascript:TTX.TT.RoomView.callback(\'pm_user\',\'4e5d5550a3f7514e0000f445\')">chaostoon</a><span style="font-size:16px"> for Warrior, Robot, King, and Ghost</span></h2>\
        <h2><a href="javascript:TTX.TT.RoomView.callback(\'pm_user\',\'4f9aa569eb35c15fd8000209\')">Kellbellz</a><span style="font-size:16px"> for Pixies, Cowboy, Cowgirl, Bandit</span></h2>\
        <h2><a href="javascript:TTX.TT.RoomView.callback(\'pm_user\',\'4e7aa9674fe7d03022009ef2\')">SkzR</a><span style="font-size:16px"> for Zeus</span></h2>\
    <h2><a href="javascript:TTX.TT.RoomView.callback(\'pm_user\',\'4f611bff590ca246ef0158f7\')">z0mbieparade [OONTZ]</a><span style="font-size:16px"> for Pirates, Zombies, Werewolf, Mermaid, Fairies, Goths</span></h2>';
            var changelog = {
                '1.1.9': [{
                    'premium': true,
                    'header': 'New Customs',
                    'content': '11 new premium avatars and 10 new re-styled laptops!'
                }, {
                    'premium': false,
                    'header': 'Maintenance',
                    'content': 'fixing bugs in the aftermath of the TT.FM zoom wheel update'
                }],
                '1.1.8': [{
                    'premium': false,
                    'header': 'Stage Lights Knob',
                    'content': 'gives you local control of the stage lights. Click to cycle through 8 awexome modes: Disabled (lights function as normal), Off, Level 1, Level 2, Level 3, Rave Mode 1, Rave Mode 2, Blackout. Located in the upper right corner of the screen.'
                }, {
                    'premium': false,
                    'header': 'Start/Stop Animations',
                    'content': 'toggles the following animations on/off: head bopping, floating hearts and stars. Located on the menu to the left of the stage lights knob.'
                }, {
                    'premium': false,
                    'header': 'Larger Chat/PM Avatar Icons',
                    'content': 'the better to see you with...'
                }, {
                    'premium': false,
                    'header': 'TTstats Profile Link',
                    'content': 'ever wish you could look up a user\'s stats right out of their profile? Now you can! Thanks to @izzmo for running ttstats!'
                }],
                '1.1.7': [{
                    'premium': true,
                    'header': 'Premium Avatars',
                    'content': 'Added 8 new avatars and fixed several bugs causing problems for TTC users'
                }, {
                    'premium': false,
                    'header': 'Auto DJ Fix',
                    'content': 'AutoDJ will never fire twice in a row on the same song. This should prevent you from attempting to grab a spot that is reserved serveral times and possibly being booted because of it.'
                }],
                '1.1.6': [{
                    'premium': true,
                    'header': 'Custom Profile',
                    'content': 'Premium users can NOW change their avatars and laptops to any of the awesome TTX Premium Avatars (check out X>Profile), as well as choose a personal verification =)'
                }, {
                    'premium': false,
                    'header': 'Boot Command',
                    'content': 'Type #boot @username in the chat to quickly bot those trolls out of your room.'
                }, {
                    'premium': false,
                    'header': 'Queue Sorting',
                    'content': 'Type +artist, +length, -artist, -length, or +shuffle into any search in your queue - you will see your results sorted or shuffled! Works with tag searching.'
                }],
                '1.1.5': [{
                    'premium': true,
                    'header': 'Laptop Animation',
                    'content': 'Premium users can animate on the TTX server! You will be able to animate at MAX speed with NO LIMITS! Everybody using TTX can see animations, and normal TT users will see your laptop update every 15 seconds.'
                }, {
                    'premium': false,
                    'header': 'New Freebies',
                    'content': 'AutoDJ, laptop animation, and chat commands are ALL FREE! From now on, only Server-related features will be Premium-only (including fast laptop animation, server-backed settings, custom avatars, ....).'
                }, {
                    'premium': false,
                    'header': 'New Server',
                    'content': 'New, faster, decicated TTX server'
                }, {
                    'premium': false,
                    'header': 'Queue Count',
                    'content': 'When you search for anything in the queue (including tags), you will see the number of songs in your search and the total # of songs in your current playlist.'
                }, {
                    'premium': false,
                    'header': 'Custom Avatars',
                    'content': 'Available to Staff/Admin users only, custom avatars are now available in TTX! Coming soon to all premium users, more info then.'
                }],
                '1.1.4': [{
                    'premium': true,
                    'header': 'Tag command',
                    'content': 'type #tag! tag1 tag2 tag3 in the chat to save the current song and automatically apply one or more tags to it!'
                }, {
                    'premium': false,
                    'header': 'Tweaks',
                    'content': 'various visual tweaks to make the new playlist UI look nicer in the midnight theme.'
                }, {
                    'premium': false,
                    'header': 'TTX Tags',
                    'content': 'get the most out of your music with tagging in TTX. Organizing your music has never been easier: just click on a tag icon in the queue to add a tag to any song. You can use your mouse or keyboard (enter, escape, tab) to quickly tag several songs. Then, type #tag1 #tag2... in the search box to see results filtered by any combination of tags! Its like playlists on the fly.'
                }, {
                    'premium': false,
                    'header': 'Import/Export',
                    'content': 'back up your settings (tags, laptops, misc) and restore them later. You can use this to transfer settings between computers'
                }],
                '1.1.3': [{
                    'premium': true,
                    'header': 'AutoDJ Button',
                    'content': 'AutoDJ is no longer in the settings... now it has its own button, with a slider to adjust the delay!'
                }, {
                    'premium': true,
                    'header': 'Animation Sync',
                    'content': 'New animation option! If you click on the Sync button while animating, your animations will be synced to a master clock! Scroll messages across the deck or play a "movie" with your fellow TTX DJs. The best part is, the sync happens automatically!'
                }, {
                    'premium': false,
                    'header': 'Chat Commands',
                    'content': 'You can now use the Chat as a command center! Type / in chat to see a list of commands.'
                }, {
                    'premium': false,
                    'header': 'Laptop Text Colors',
                    'content': 'New laptop text colors are now possible, the running list of all colors is P, B, R, L, O, Y, W'
                }, {
                    'premium': false,
                    'header': 'Laptop Cover',
                    'content': 'Choose your laptop cover, or spoof an iphone or android! Check out X -> Settings.'
                }, {
                    'premium': false,
                    'header': 'AutoAwesome Button',
                    'content': 'By popular request, AutoAwesome now has its own button.'
                }, {
                    'premium': false,
                    'header': 'Speed Improvements/Fixes',
                    'content': 'Made several speed-ups and improved the way TTX handles switching rooms and page refreshes. It should now load faster and more consistantly without needing refreshes'
                }],
                '1.1.2': [{
                    'premium': true,
                    'header': 'AutoDJ Timer',
                    'content': 'Adjust delay for AutoDJ, located in X Menu -> Settings'
                }, {
                    'premium': true,
                    'header': 'Import Stickers',
                    'content': 'You can now import stickers and see the IDs of users who are not in the same room as you.'
                }, {
                    'premium': false,
                    'header': 'Notification Timers',
                    'content': 'Adjust notification display time for any notification!'
                }],
                '1.1.1': [{
                    'premium': true,
                    'header': 'Laptop Editor',
                    'content': 'New buttons in the laptop editor, more efficient laptop switching code, and the ability to import anyones laptop stickers by viewing their profile!'
                }, {
                    'premium': false,
                    'header': 'Import Your Stickers',
                    'content': 'If you want to use the laptop storage/animation feature but you are worried about losing your stickers, now you can save your standard Turntable stickers as a TTX laptop! Just go to your profile (the popup where you can see your info and laptop cover) and click "Import": your laptop will be saved locally, and you access, share, and edit it any time by going to the laptop icon!'
                }, {
                    'premium': false,
                    'header': 'Premium Features',
                    'content': 'TTX Premium is now available on demand! Check out the X Menu -> Premium for details.'
                }, {
                    'premium': false,
                    'header': 'Fixes',
                    'content': 'TTX will no longer remove your stickers if you do not have a laptop selected when you start to DJ. If you DO have a laptop selected but you are not DJing, the laptop will be activated when you jump on stage. Click on a laptop in the Laptop Menu to select it.'
                }],
                '1.1.0': [{
                    'premium': true,
                    'header': 'Laptop Editor',
                    'content': '(Thanks to B^Dub for the icons!) added Delete/Copy/Paste/Insert/Goto Start/Goto End to the custom laptop editor.'
                }, {
                    'premium': false,
                    'header': 'Keyword Notifications',
                    'content': 'by popular demand, there is now an option to add keywords that will act as mentions in the Notifications dialog. Thanks to Reminem for finding and fixing an early bug with this feature!'
                }, {
                    'premium': false,
                    'header': 'Sticker Bank',
                    'content': 'TTX presents the laptop sticker bank! Located near the volume knob, you can use this menu to save laptop stickers and easily switch between them.'
                }, {
                    'premium': false,
                    'header': 'Sticker Sharing',
                    'content': '...and you can also share stickers over chat! Click on the clipboard icon in the laptop menu and then paste into any chat or PM box. TTX users will see an import button in the chat that will allow them to import the sticker into their own bank!'
                }, {
                    'premium': false,
                    'header': 'Dock Improvements',
                    'content': 'the dock can now be clicked on to either minimize or maximize all panels.'
                }, {
                    'premium': false,
                    'header': 'X Menu',
                    'content': 'all TTX related settings are now under their own menu located near the Turntable logo (the X Menu).'
                }, {
                    'premium': false,
                    'header': 'Bug Fixes',
                    'content': 'TTX will now load properly if you join a room with no song playing or if the room enters such a state.'
                }, {
                    'premium': false,
                    'header': 'Debug IDs',
                    'content': 'in Debug Mode, you will be able to see the userid next to the user name in the Profile dialog'
                }],
                '1.0.9': [{
                    'premium': true,
                    'header': 'Laptop Animation',
                    'content': 'added text-mode animation support and a speed control that will pop up when you are animating! Clicking on the speed control will reverse the animation.'
                }, {
                    'premium': false,
                    'header': 'Notifications',
                    'content': 'added notifications to TTX! Go to your profile icon -> Notifications to see the options. You can enable either chat or desktop notifications, and choose whether you want the notification to apply just to your fans, or to anybody.'
                }],
                '1.0.8': [{
                    'premium': false,
                    'header': 'Midnight Blue',
                    'content': 'TTX presents a new theme for Turntable! Enjoy a darker experience by clicking the light switch in the top-right corner (click it again to switch back). Special thanks to <a href="http://turntable.fm/bdubs">B^Dub</a> for the suggestion and for providing the aweXome skins for the blue song board!'
                }, {
                    'premium': false,
                    'header': 'Changelog',
                    'content': 'this popup can be accessed by going to X Menu -> About'
                }, {
                    'premium': false,
                    'header': 'Hosting',
                    'content': 'all Turntable X content (scripts, styles, and images) will now be hosted on <a href="http://turntablex.com">turntablex.com</a>. This means faster load times and instant updates! (no need to update via the Chrome web store)'
                }],
                '1.0.7': [{
                    'premium': false,
                    'header': 'Panels',
                    'content': 'added buttons to un-dock and re-dock panels, re-styled panel headers'
                }],
                '1.0.6': [{
                    'premium': true,
                    'header': 'Laptop Stickers',
                    'content': 'animate your laptop stickers! Create and save laptop animations by checking out the Laptop Menu in the header'
                }, {
                    'premium': true,
                    'header': 'Auto DJ',
                    'content': 'grab open DJ spots as soon as they are available. Can be toggled in the settings'
                }, {
                    'premium': false,
                    'header': 'Chat Timers',
                    'content': 'timestamps on all chat and private messages'
                }, {
                    'premium': false,
                    'header': 'Idle Metrics',
                    'content': 'idle timers update every second, and the number of idle users is displayed in the guest list header'
                }, {
                    'premium': false,
                    'header': 'Panels',
                    'content': 'chat, guest list, and queue panels can be dragged sideways, downwards, resized, and minimized!'
                }, {
                    'premium': false,
                    'header': 'Fixes',
                    'content': '@ chat suggestions are now visible'
                }],
                '1.0.5-1.0.0': [{
                    'premium': false,
                    'header': 'Panels',
                    'content': 'made the queue, guest list, and queue into panels that can be re-positioned'
                }, {
                    'premium': false,
                    'header': 'Guest List',
                    'content': 'guest list improvements, including vote indicators, idle timers, and re-organization'
                }, {
                    'premium': false,
                    'header': 'Auto Awesome',
                    'content': 'support your fellow DJing by upvoting their songs automatically! Can be disabled in X Menu -> Settings'
                }, {
                    'premium': false,
                    'header': 'Current Song Info',
                    'content': 'see the title and artist of the current song, along with upvotes, downvotes, and hearts'
                }, {
                    'premium': false,
                    'header': 'Initial Release',
                    'content': 'TurntableX was released on November 14, 2012, the same day that Tunrtable.FM launched their new interface'
                }]
            };
            var Custom = function () {
                var loaded = false,
                    settings = {}, defaultSettings = {}, lastUpdate = null,
                    shownLaptops = 0,
                    shownAvatars = 0,
                    AVATARS = {
                        "4": {
                            "id": "4",
                            "payload": {
                                "ll": 130,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [15, 70]
                                    }, {
                                        "name": "hf",
                                        "offset": [2, 5]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [15, 70]
                                    }, {
                                        "name": "hb",
                                        "offset": [30, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/darkwizard\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/darkwizard\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/darkwizard\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/darkwizard\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/darkwizard\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/darkwizard\/headfront.png"
                                },
                                "avatarid": "custom4",
                                "size": [125, 219],
                                "frontSize": [125, 319]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Dark Wizard",
                            "is_shown": "1"
                        },
                        "5": {
                            "id": "5",
                            "payload": {
                                "ll": 120,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/ghost\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/ghost\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/ghost\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/ghost\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/ghost\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/ghost\/headfront.png"
                                },
                                "avatarid": "custom5",
                                "size": [119, 188],
                                "frontSize": [119, 188]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Ghost",
                            "is_shown": "1"
                        },
                        "6": {
                            "id": "6",
                            "payload": {
                                "ll": 110,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/meow\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/meow\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/meow\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/meow\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/meow\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/meow\/headfront.png"
                                },
                                "avatarid": "custom6",
                                "size": [119, 188],
                                "frontSize": [119, 188]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Meow",
                            "is_shown": "1"
                        },
                        "7": {
                            "id": "7",
                            "payload": {
                                "ll": 180,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/warrior\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/warrior\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/warrior\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/warrior\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/warrior\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/warrior\/headfront.png"
                                },
                                "avatarid": "custom7",
                                "size": [153, 280],
                                "frontSize": [153, 280]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Warrior",
                            "is_shown": "1"
                        },
                        "8": {
                            "id": "8",
                            "payload": {
                                "ll": 120,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [-8, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [-8, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/robot\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/robot\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/robot\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/robot\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/robot\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/robot\/headfront.png"
                                },
                                "avatarid": "custom8",
                                "size": [154, 203],
                                "frontSize": [154, 203]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Robot",
                            "is_shown": "1"
                        },
                        "9": {
                            "id": "9",
                            "payload": {
                                "ll": 115,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [32, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [32, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/king\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/king\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/king\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/king\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/king\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/king\/headfront.png"
                                },
                                "avatarid": "custom9",
                                "size": [202, 196],
                                "frontSize": [202, 196]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "King",
                            "is_shown": "1"
                        },
                        "10": {
                            "id": "10",
                            "payload": {
                                "ll": 130,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [22, 128]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [40, 132]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/pirate_boy\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/pirate_boy\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/pirate_boy\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/pirate_boy\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/pirate_boy\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/pirate_boy\/headfront.png"
                                },
                                "avatarid": "custom10",
                                "size": [144, 200],
                                "frontSize": [144, 200]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Pirate Boy",
                            "is_shown": "1"
                        },
                        "11": {
                            "id": "11",
                            "payload": {
                                "ll": 150,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [26, 146]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [50, 144]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/pirate_girl\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/pirate_girl\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/pirate_girl\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/pirate_girl\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/pirate_girl\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/pirate_girl\/headfront.png"
                                },
                                "avatarid": "custom11",
                                "size": [146, 194],
                                "frontSize": [146, 194]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Pirate Girl",
                            "is_shown": "1"
                        },
                        "12": {
                            "id": "12",
                            "payload": {
                                "ll": 115,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [18, 124]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [18, 122]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/zombie_boy\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/zombie_boy\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/zombie_boy\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/zombie_boy\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/zombie_boy\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/zombie_boy\/headfront.png"
                                },
                                "avatarid": "custom12",
                                "size": [116, 194],
                                "frontSize": [116, 194]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Zombie Boy",
                            "is_shown": "1"
                        },
                        "13": {
                            "id": "13",
                            "payload": {
                                "ll": 110,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [35, 100]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [35, 98]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/zombie_girl\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/zombie_girl\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/zombie_girl\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/zombie_girl\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/zombie_girl\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/zombie_girl\/headfront.png"
                                },
                                "avatarid": "custom13",
                                "size": [106, 152],
                                "frontSize": [106, 152]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Zombie Girl",
                            "is_shown": "1"
                        },
                        "14": {
                            "id": "14",
                            "payload": {
                                "ll": 100,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [42, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [42, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/ninja\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/ninja\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/ninja\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/ninja\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/ninja\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/ninja\/headfront.png"
                                },
                                "avatarid": "custom14",
                                "size": [176, 180],
                                "frontSize": [176, 180]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Ninja",
                            "is_shown": "1"
                        },
                        "15": {
                            "id": "15",
                            "payload": {
                                "ll": 130,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/ninjette\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/ninjette\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/ninjette\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/ninjette\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/ninjette\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/ninjette\/headfront.png"
                                },
                                "avatarid": "custom15",
                                "size": [142, 189],
                                "frontSize": [142, 189]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Ninjette",
                            "is_shown": "1"
                        },
                        "16": {
                            "id": "16",
                            "payload": {
                                "ll": 120,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [108, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [108, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/werewolf\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/werewolf\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/werewolf\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/werewolf\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/werewolf\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/werewolf\/headfront.png"
                                },
                                "avatarid": "custom16",
                                "size": [303, 262],
                                "frontSize": [303, 262]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Werewolf",
                            "is_shown": "1"
                        },
                        "17": {
                            "id": "17",
                            "payload": {
                                "ll": 130,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [58, 128]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [56, 128]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/mermaid\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/mermaid\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/mermaid\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/mermaid\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/mermaid\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/mermaid\/headfront.png"
                                },
                                "avatarid": "custom17",
                                "size": [172, 227],
                                "frontSize": [172, 227]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Mermaid",
                            "is_shown": "1"
                        },
                        "18": {
                            "id": "18",
                            "payload": {
                                "ll": 120,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/punk\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/punk\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/punk\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/punk\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/punk\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/punk\/headfront.png"
                                },
                                "avatarid": "custom18",
                                "size": [128, 201],
                                "frontSize": [128, 201]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Punk",
                            "is_shown": "1"
                        },
                        "19": {
                            "id": "19",
                            "payload": {
                                "ll": 115,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/pink_pixie\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/pink_pixie\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/pink_pixie\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/pink_pixie\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/pink_pixie\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/pink_pixie\/headfront.png"
                                },
                                "avatarid": "custom19",
                                "size": [136, 186],
                                "frontSize": [136, 186]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Pink Pixie",
                            "is_shown": "1"
                        },
                        "20": {
                            "id": "20",
                            "payload": {
                                "ll": 160,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [-3, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [-3, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/purple_pixie\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/purple_pixie\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/purple_pixie\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/purple_pixie\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/purple_pixie\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/purple_pixie\/headfront.png"
                                },
                                "avatarid": "custom20",
                                "size": [136, 234],
                                "frontSize": [136, 234]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Purple Pixie",
                            "is_shown": "1"
                        },
                        "21": {
                            "id": "21",
                            "payload": {
                                "ll": 140,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/teal_pixie\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/teal_pixie\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/teal_pixie\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/teal_pixie\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/teal_pixie\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/teal_pixie\/headfront.png"
                                },
                                "avatarid": "custom21",
                                "size": [184, 215],
                                "frontSize": [184, 215]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Teal Pixie",
                            "is_shown": "1"
                        },
                        "22": {
                            "id": "22",
                            "payload": {
                                "ll": 140,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/cowboy\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/cowboy\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/cowboy\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/cowboy\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/cowboy\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/cowboy\/headfront.png"
                                },
                                "avatarid": "custom22",
                                "size": [169, 211],
                                "frontSize": [169, 211]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Cowboy",
                            "is_shown": "1"
                        },
                        "23": {
                            "id": "23",
                            "payload": {
                                "ll": 140,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/bandit\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/bandit\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/bandit\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/bandit\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/bandit\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/bandit\/headfront.png"
                                },
                                "avatarid": "custom23",
                                "size": [172, 218],
                                "frontSize": [172, 218]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Bandit",
                            "is_shown": "1"
                        },
                        "24": {
                            "id": "24",
                            "payload": {
                                "ll": 140,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/cowgirl\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/cowgirl\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/cowgirl\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/cowgirl\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/cowgirl\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/cowgirl\/headfront.png"
                                },
                                "avatarid": "custom24",
                                "size": [172, 218],
                                "frontSize": [172, 218]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Cowgirl",
                            "is_shown": "1"
                        },
                        "25": {
                            "id": "25",
                            "payload": {
                                "ll": 120,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/QBOT\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/QBOT\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/QBOT\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/QBOT\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/QBOT\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/QBOT\/headfront.png"
                                },
                                "avatarid": "custom25",
                                "size": [132, 196],
                                "frontSize": [132, 196]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "QBOT",
                            "is_shown": "1"
                        },
                        "26": {
                            "id": "26",
                            "payload": {
                                "ll": 140,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [10, 130]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [10, 130]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/fairy_boy\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/fairy_boy\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/fairy_boy\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/fairy_boy\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/fairy_boy\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/fairy_boy\/headfront.png"
                                },
                                "avatarid": "custom26",
                                "size": [130, 241],
                                "frontSize": [129, 245]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Fairy Boy",
                            "is_shown": "1"
                        },
                        "27": {
                            "id": "27",
                            "payload": {
                                "ll": 160,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [35, 168]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [35, 170]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/fairy_girl\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/fairy_girl\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/fairy_girl\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/fairy_girl\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/fairy_girl\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/fairy_girl\/headfront.png"
                                },
                                "avatarid": "custom27",
                                "size": [131, 233],
                                "frontSize": [131, 239]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Fairy Girl",
                            "is_shown": "1"
                        },
                        "28": {
                            "id": "28",
                            "payload": {
                                "ll": 155,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [25, 150]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [25, 150]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/goth_boy\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/goth_boy\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/goth_boy\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/goth_boy\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/goth_boy\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/goth_boy\/headfront.png"
                                },
                                "avatarid": "custom28",
                                "size": [116, 250],
                                "frontSize": [116, 253]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Goth Boy",
                            "is_shown": "1"
                        },
                        "29": {
                            "id": "29",
                            "payload": {
                                "ll": 116,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [50, 110]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [50, 110]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/goth_girl\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/goth_girl\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/goth_girl\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/goth_girl\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/goth_girl\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/goth_girl\/headfront.png"
                                },
                                "avatarid": "custom29",
                                "size": [136, 182],
                                "frontSize": [136, 182]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Goth Girl",
                            "is_shown": "1"
                        },
                        "30": {
                            "id": "30",
                            "payload": {
                                "ll": 110,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [-4, 4]
                                    }, {
                                        "name": "hf",
                                        "offset": [-4, 5]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [-3, -5]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/zeus\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/zeus\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/zeus\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/zeus\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/zeus\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/zeus\/headfront.png"
                                },
                                "avatarid": "custom30",
                                "size": [111, 151],
                                "frontSize": [111, 151]
                            },
                            "type": "Avatar",
                            "rank": "1",
                            "name": "Zeus",
                            "is_shown": "1"
                        },
                        "1000": {
                            "id": "1000",
                            "payload": {
                                "ll": 120,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [40, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [88, 4]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [40, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [88, 4]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/reaper\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/reaper\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/reaper\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/reaper\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/reaper\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/reaper\/headfront.png"
                                },
                                "avatarid": "custom1000",
                                "size": [255, 313],
                                "frontSize": [255, 313]
                            },
                            "type": "Avatar",
                            "rank": "3",
                            "name": "Reaper",
                            "is_shown": "1"
                        },
                        "1001": {
                            "id": "1001",
                            "payload": {
                                "ll": 120,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [105, -2]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [105, -2]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/angel\/bodyfront2.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/angel\/bodyfront2.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/angel\/fullfront.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/angel\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/angel\/icon.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/angel\/icon.png"
                                },
                                "avatarid": "custom1001",
                                "size": [285, 267],
                                "frontSize": [285, 267]
                            },
                            "type": "Avatar",
                            "rank": "2",
                            "name": "Angel",
                            "is_shown": "1"
                        },
                        "1002": {
                            "id": "1002",
                            "payload": {
                                "ll": 120,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [113, 13]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [113, 13]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/assassin\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/assassin\/bodyfront.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/assassin\/fullfront.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/assassin\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/assassin\/headfront.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/assassin\/headfront.png"
                                },
                                "avatarid": "custom1002",
                                "size": [285, 267],
                                "frontSize": [285, 267]
                            },
                            "type": "Avatar",
                            "rank": "2",
                            "name": "Assassin",
                            "is_shown": "1"
                        },
                        "1003": {
                            "id": "1003",
                            "payload": {
                                "ll": 120,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [105, -2]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [105, -2]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/darkangel\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/darkangel\/bodyfront.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/darkangel\/fullfront.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/darkangel\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/darkangel\/icon.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/darkangel\/icon.png"
                                },
                                "avatarid": "custom1003",
                                "size": [285, 267],
                                "frontSize": [285, 267]
                            },
                            "type": "Avatar",
                            "rank": "2",
                            "name": "Archangel",
                            "is_shown": "1"
                        },
                        "1004": {
                            "id": "1004",
                            "payload": {
                                "ll": 95,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/rogue\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/rogue\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/rogue\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/rogue\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/rogue\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/rogue\/headfront.png"
                                },
                                "avatarid": "custom1004",
                                "size": [118, 234],
                                "frontSize": [118, 234]
                            },
                            "type": "Avatar",
                            "rank": "2",
                            "name": "Rogue",
                            "is_shown": "1"
                        },
                        "1005": {
                            "id": "1005",
                            "payload": {
                                "ll": 115,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [30, 3]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [30, 4]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/tron_clu\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/tron_clu\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/tron_clu\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/tron_clu\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/tron_clu\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/tron_clu\/headfront.png"
                                },
                                "avatarid": "custom1005",
                                "size": [77, 270],
                                "frontSize": [77, 270]
                            },
                            "type": "Avatar",
                            "rank": "3",
                            "name": "Clu",
                            "is_shown": "1"
                        },
                        "1006": {
                            "id": "1006",
                            "payload": {
                                "ll": 115,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [36, -2]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [36, -2]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/tron_sam_flynn\/bodyfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/tron_sam_flynn\/bodyback.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/tron_sam_flynn\/fullback.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/tron_sam_flynn\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/tron_sam_flynn\/headback.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/tron_sam_flynn\/headfront.png"
                                },
                                "avatarid": "custom1006",
                                "size": [94, 270],
                                "frontSize": [94, 270]
                            },
                            "type": "Avatar",
                            "rank": "3",
                            "name": "Flynn",
                            "is_shown": "1"
                        },
                        "1337": {
                            "id": "1337",
                            "payload": {
                                "ll": 120,
                                "states": {
                                    "front": [{
                                        "name": "bf",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hf",
                                        "offset": [0, 0]
                                    }],
                                    "back": [{
                                        "name": "bb",
                                        "offset": [0, 0]
                                    }, {
                                        "name": "hb",
                                        "offset": [0, 0]
                                    }]
                                },
                                "images": {
                                    "bf": "http:\/\/turntablex.com\/images\/avatars\/invisible\/fullfront.png",
                                    "bb": "http:\/\/turntablex.com\/images\/avatars\/invisible\/fullfront.png",
                                    "fb": "http:\/\/turntablex.com\/images\/avatars\/invisible\/fullfront.png",
                                    "ff": "http:\/\/turntablex.com\/images\/avatars\/invisible\/fullfront.png",
                                    "hb": "http:\/\/turntablex.com\/images\/avatars\/invisible\/fullfront.png",
                                    "hf": "http:\/\/turntablex.com\/images\/avatars\/invisible\/fullfront.png"
                                },
                                "avatarid": "custom1337",
                                "size": [119, 188],
                                "frontSize": [119, 188]
                            },
                            "type": "Avatar",
                            "rank": "2",
                            "name": "Invisible",
                            "is_shown": "1"
                        }
                    }, LAPTOPS = {
                        "101": {
                            "id": "101",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_white.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "Pearl",
                            "is_shown": "1"
                        },
                        "102": {
                            "id": "102",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_ttx.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "X",
                            "is_shown": "1"
                        },
                        "103": {
                            "id": "103",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_nightsky.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "Nightsky",
                            "is_shown": "1"
                        },
                        "104": {
                            "id": "104",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_ttx2.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "X'",
                            "is_shown": "1"
                        },
                        "105": {
                            "id": "105",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_black.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "Obsidian",
                            "is_shown": "1"
                        },
                        "106": {
                            "id": "106",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_red.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "Ruby",
                            "is_shown": "1"
                        },
                        "107": {
                            "id": "107",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_red2.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "Ruby'",
                            "is_shown": "1"
                        },
                        "108": {
                            "id": "108",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_orange.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "Coral",
                            "is_shown": "1"
                        },
                        "109": {
                            "id": "109",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_orange2.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "Coral'",
                            "is_shown": "1"
                        },
                        "110": {
                            "id": "110",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_yellow.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "Topaz",
                            "is_shown": "1"
                        },
                        "111": {
                            "id": "111",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_teal.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "Aquamarine",
                            "is_shown": "1"
                        },
                        "112": {
                            "id": "112",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_green.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "Emerald",
                            "is_shown": "1"
                        },
                        "113": {
                            "id": "113",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_blue.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "Sapphire",
                            "is_shown": "1"
                        },
                        "114": {
                            "id": "114",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_purple.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "Amethyst",
                            "is_shown": "1"
                        },
                        "115": {
                            "id": "115",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_purple2.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "Amethyst'",
                            "is_shown": "1"
                        },
                        "116": {
                            "id": "116",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_pink.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "Rose",
                            "is_shown": "1"
                        },
                        "117": {
                            "id": "117",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_pink2.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "Rose'",
                            "is_shown": "1"
                        },
                        "118": {
                            "id": "118",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_usa.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "USA",
                            "is_shown": "1"
                        },
                        "119": {
                            "id": "119",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_camo.png",
                            "type": "Laptop",
                            "rank": "1",
                            "name": "Camo",
                            "is_shown": "1"
                        },
                        "1338": {
                            "id": "1338",
                            "payload": "http:\/\/turntablex.com\/images\/laptops\/laptop_invisible.png",
                            "type": "Laptop",
                            "rank": "2",
                            "name": "Invisible",
                            "is_shown": "1"
                        }
                    }, laptopImages = {}, imagesLoaded = false,
                    customProfileTemplate = null;

                function makeAvatarsList(avatars) {
                    var avatar_data, result = [];
                    for (avatar_id in avatars) {
                        if (!parseInt(avatars[avatar_id].is_shown)) continue;
                        avatar_data = avatars[avatar_id].payload;
                        result.push(["div#ttx-avatar-" + avatar_id + ".ttx-avatar-item", {
                            data: {
                                'avatar_id': avatar_id
                            },
                            style: {
                                'background': 'url(' + avatar_data.images['ff'] + ') no-repeat 50% 90%'
                            }
                        }]);
                    }
                    return result;
                }

                function makeLaptopsList(laptops) {
                    var laptop_data, result = [];
                    for (laptop_id in laptops) {
                        if (!parseInt(laptops[laptop_id].is_shown)) continue;
                        laptop_data = laptops[laptop_id].payload;
                        result.push(["div#ttx-laptop-" + laptop_id + ".ttx-laptop-item", {
                            data: {
                                'laptop_id': laptop_id
                            },
                            style: {
                                'background': 'url(' + laptop_data + ') no-repeat center',
                                'background-size': '75%'
                            }
                        }]);
                    }
                    return result;
                }

                function makeCustomProfile(custom_avatars_template, custom_laptops_template) {
                    return ["div#ttx-custom-container", [
                        ["h2.ttx-custom-separator", [
                            ["span", {}, "Avatar:  "],
                            ["span#ttx-custom-avatar-picker-selection", {}, "None"]
                        ]],
                        ["div#ttx-custom-avatar-picker", [
                            ["div.ttx-scroll-left"],
                            ["div.ttx-scroller", ["div.ttx-scroll-list", custom_avatars_template]],
                            ["div.ttx-scroll-right"]
                        ]],
                        ["h2.ttx-separator", [
                            ["span", {}, "Laptop:  "],
                            ["span#ttx-custom-laptop-picker-selection", {}, "None"]
                        ]],
                        ["div#ttx-custom-laptop-picker", ["div.ttx-scroll-left"],
                            ["div.ttx-scroller", ["div.ttx-scroll-list", custom_laptops_template]],
                            ["div.ttx-scroll-right"]
                        ],
                        ["h2.ttx-separator", [
                            ["span", {}, "Verification:  "],
                            ["input#ttx-custom-verification", '']
                        ]]
                    ]];
                }

                function LaptopContextProxy(t, img) {
                    this.__context = t;
                    this.scale = function () {
                        return t.scale.apply(t, arguments);
                    };
                    this.save = function () {
                        return t.save.apply(t, arguments);
                    };
                    this.translate = function () {
                        return t.translate.apply(t, arguments);
                    };
                    this.rotate = function () {
                        return t.rotate.apply(t, arguments);
                    };
                    this.restore = function () {
                        return t.restore.apply(t, arguments);
                    };
                    this.drawImage = function () {
                        if (arguments[1] === 0 && arguments[2] === 0)
                            arguments[0] = img;
                        return t.drawImage.apply(t, arguments);
                    }
                };
                LaptopContextProxy.prototype = {
                    get globalCompositeOperation() {
                        return this.__context.globalCompositeOperation;
                    }, set globalCompositeOperation(x) {
                        this.__context.globalCompositeOperation = x;
                    }
                };

                function customLoadImages(callback) {
                    if (imagesLoaded) return callback();
                    for (laptop in LAPTOPS)
                        laptopImages[laptop] = util.createImageWithLoader(LAPTOPS[laptop].payload);
                    imagesLoaded = true;
                    return callback();
                }

                function customPreload() {
                    customLoadImages(customLoad);
                }

                function customLoad() {
                    if (customProfileTemplate === null) {
                        customProfileTemplate = makeCustomProfile(makeAvatarsList(AVATARS), makeLaptopsList(LAPTOPS));
                    }
                    if (!TT.sticker.__drawLaptopCanvas) {
                        TT.sticker.__drawLaptopCanvas = TT.sticker.drawLaptopCanvas;
                        TT.sticker.drawLaptopCanvas = function (e, t, i, n, o) {
                            if (e in settings && settings[e]['lap'] in laptopImages) {
                                var laptopWithLoader = laptopImages[settings[e]['lap']];
                                laptopWithLoader[1].done(function () {
                                    var context = new LaptopContextProxy(t, laptopWithLoader[0]);
                                    TT.sticker.__drawLaptopCanvas(e, context, i, n, o);
                                });
                            } else TT.sticker.__drawLaptopCanvas(e, t, i, n, o);
                        }
                    }
                    if (!TT.Room.__addUserToMap) {
                        TT.Room.__addUserToMap = TT.Room.addUserToMap;
                        TT.Room.addUserToMap = function (e) {
                            e.fanof = -1 !== $.inArray(e.userid, turntable.user.fanOf), e.isBuddy = -1 !== $.inArray(e.userid, turntable.user.buddies), this.userMap[e.userid] = e;
                            if (e.userid in settings) {
                                var avatar_id = settings[e.userid]['ava'];
                                if (avatar_id in AVATARS)
                                    customSkinUser(e, AVATARS[avatar_id].payload, true);
                            }
                        };
                    }


                    if (!TT.RoomView.__addAvatar) {
                        TT.RoomView.__addAvatar = TT.RoomView.addAvatar;
                        TT.RoomView.addAvatar = function () {
                            var user = arguments[0];
                            if (user.userid in settings && settings[user.userid]['ava'] in AVATARS) {
                                user.custom_avatar = AVATARS[settings[user.userid]['ava']].payload;
                            }
                            return this.__addAvatar.apply(this, arguments);
                        };
                    }
                    if (!TT.buddylistpm.prototype.__addBuddy) {
                        TT.buddylistpm.prototype.__addBuddy = TT.buddylistpm.prototype.addBuddy;
                        TT.buddylistpm.prototype.addBuddy = function (e, t) {
                            if (e.userid in settings) {
                                var avatar_id = settings[e.userid]['ava'];
                                if (avatar_id in AVATARS)
                                    customSkinUser(e, AVATARS[avatar_id].payload);
                            }
                            this.__addBuddy(e, t);
                        };
                    }
                    if (!TT.pmwindow.prototype.__addPM) {
                        TT.pmwindow.prototype.__addPM = TT.pmwindow.prototype.addPM;
                        TT.pmwindow.prototype.addPM = function (e, t, i) {
                            var id = this.otherUserId,
                                avatar_id;
                            if (id in settings && settings[id]['ava'] in AVATARS) {
                                avatar_id = settings[id]['ava'];
                                customSkinUser(this.otherUser, AVATARS[avatar_id].payload);
                            }
                            this.__addPM(e, t, i);
                        }
                    }
                    if (!shownLaptops) {
                        for (laptop in LAPTOPS) {
                            if (parseInt(LAPTOPS[laptop].is_shown)) shownLaptops++;
                        }
                    }
                    if (!shownAvatars) {
                        for (avatar in AVATARS) {
                            if (parseInt(AVATARS[avatar].is_shown)) shownAvatars++;
                        }
                    }
                    if (!$('#ttx-custom-profile').length) {
                        $('<li class="option" id="ttx-custom-profile">Profile</li>').prependTo($('#ttx-settings-dropdown')).click(customProfileView);
                    }
                    if (Object.keys(settings).length === 0) {
                        settings = Settings.get('Custom', defaultSettings);
                        customLoadFromServer();
                    }
                    customRefresh();
                    loaded = true;
                    log('TTX.Custom: Loaded');
                }

                function customProfileView() {
                    var node = {};
                    util.buildTree(makeModal('TurntableX Profile', 700), node);
                    var $element = node.modal.$el,
                        userCustoms = settings[TT.ID];
                    var userRank = Server.rank();
                    var num_avatars = shownAvatars,
                        num_laptops = shownLaptops;
                    node.modal.show();
                    if (!userCustoms)
                        userCustoms = {
                            'ava': null,
                            'lap': null,
                            'ver': null
                        };
                    $element.find('.field.settings').replaceWith(util.buildTree(customProfileTemplate));
                    if (userCustoms['ava']) {
                        var avatar_id = userCustoms['ava'],
                            selected = $('#ttx-avatar-' + avatar_id);
                        if (selected.length) {
                            var index = selected.index();
                            selected.addClass('selected');
                            $('#ttx-custom-avatar-picker .ttx-scroll-list').css('left', ((index - (index % 3)) * -190) + 'px');
                        }
                        $('#ttx-custom-avatar-picker-selection').text(AVATARS[avatar_id].name);
                    }
                    $('.ttx-avatar-item').each(function () {
                        var minRank = AVATARS[$(this).data('avatar_id')].rank;
                        if (userRank < minRank) {
                            $(this).addClass('locked');
                            $(this).append('<img class="ttx-locked" src="https://s3.amazonaws.com/assets.turntable.fm/images/avatar/avatar-locked-icon.png">');
                        }
                    });
                    $('.ttx-laptop-item').each(function () {
                        var minRank = LAPTOPS[$(this).data('laptop_id')].rank;
                        if (userRank < minRank) {
                            $(this).addClass('locked');
                            $(this).append('<img class="ttx-locked" src="https://s3.amazonaws.com/assets.turntable.fm/images/avatar/avatar-locked-icon.png">');
                        }
                    });
                    $('#ttx-custom-avatar-picker .ttx-scroll-list').css('width', ((num_avatars + 1) * 190) + 'px');
                    if (userCustoms['lap']) {
                        var laptop_id = userCustoms['lap'],
                            selected = $('#ttx-laptop-' + laptop_id);
                        if (selected.length) {
                            var index = selected.index();
                            selected.addClass('selected');
                            $('#ttx-custom-laptop-picker .ttx-scroll-list').css('left', ((index - (index % 5)) * -114) + 'px');
                        }
                        $('#ttx-custom-laptop-picker-selection').text(LAPTOPS[laptop_id].name);
                    }
                    $('#ttx-custom-laptop-picker .ttx-scroll-list').css('width', ((num_laptops + 1) * 114) + 'px');
                    if (userCustoms['ver']) {
                        $('#ttx-custom-verification').val(userCustoms['ver']);
                    }
                    if (userRank < 1) {
                        $('#ttx-custom-verification').val('premium only').attr('readonly', 'readonly');
                    }
                    var lastScroll = null;
                    $('#ttx-custom-avatar-picker .ttx-scroll-left').click(function () {
                        var self = $(this),
                            scroll_list = $('#ttx-custom-avatar-picker .ttx-scroll-list'),
                            left = parseInt(scroll_list.css('left').replace('px', '')) || 0,
                            now = syncNow();
                        if (left === 0 || (lastScroll && now - lastScroll < 350)) return;
                        else {
                            lastScroll = now;
                            if (left + 570 >= 0)
                                self.addClass('inactive');
                            $('#ttx-custom-avatar-picker .ttx-scroll-right').removeClass('inactive');
                            scroll_list.css({
                                'left': (left + 570) + 'px'
                            });
                        }
                    });
                    $('#ttx-custom-avatar-picker .ttx-scroll-right').click(function () {
                        var self = $(this),
                            scroll_list = $('#ttx-custom-avatar-picker .ttx-scroll-list'),
                            left = parseInt(scroll_list.css('left').replace('px', '')) || 0,
                            now = syncNow();
                        if (num_avatars < 3 || left === (num_avatars - 3) * -190 || (lastScroll && now - lastScroll < 350)) return;
                        else {
                            lastScroll = now;
                            if (left - 570 <= (num_avatars - 3) * -190)
                                self.addClass('inactive');
                            $('#ttx-custom-avatar-picker .ttx-scroll-left').removeClass('inactive');
                            scroll_list.css({
                                'left': (left - 570) + 'px'
                            });
                        }
                    });
                    $('#ttx-custom-laptop-picker .ttx-scroll-left').click(function () {
                        var self = $(this),
                            scroll_list = $('#ttx-custom-laptop-picker .ttx-scroll-list'),
                            left = parseInt(scroll_list.css('left').replace('px', '')) || 0,
                            now = syncNow();
                        if (left === 0 || (lastScroll && now - lastScroll < 350)) return;
                        else {
                            lastScroll = now;
                            if (left + 570 >= 0)
                                self.addClass('inactive');
                            $('#ttx-custom-laptop-picker .ttx-scroll-right').removeClass('inactive');
                            scroll_list.css({
                                'left': (left + 570) + 'px'
                            });
                        }
                    });
                    $('#ttx-custom-laptop-picker .ttx-scroll-right').click(function () {
                        var self = $(this),
                            scroll_list = $('#ttx-custom-laptop-picker .ttx-scroll-list'),
                            left = parseInt(scroll_list.css('left').replace('px', '')) || 0,
                            now = syncNow();
                        if (num_laptops < 5 || left === (num_laptops - 5) * -114 || (lastScroll && now - lastScroll < 350)) return;
                        else {
                            lastScroll = now;
                            if (left - 570 <= (num_laptops - 5) * -114)
                                self.addClass('inactive');
                            $('#ttx-custom-laptop-picker .ttx-scroll-left').removeClass('inactive');
                            scroll_list.css({
                                'left': (left - 570) + 'px'
                            });
                        }
                    });
                    $('#ttx-custom-avatar-picker .ttx-avatar-item').click(function () {
                        if ($(this).hasClass('locked')) return;
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                            $('#ttx-custom-avatar-picker-selection').text('None');
                            return;
                        }
                        $('#ttx-custom-avatar-picker .ttx-avatar-item.selected').removeClass('selected');
                        $(this).addClass('selected');
                        $('#ttx-custom-avatar-picker-selection').text(AVATARS[$(this).data('avatar_id')].name);
                    });
                    $('#ttx-custom-laptop-picker .ttx-laptop-item').click(function () {
                        if ($(this).hasClass('locked')) return;
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                            $('#ttx-custom-laptop-picker-selection').text('None');
                            return;
                        }
                        $('#ttx-custom-laptop-picker .ttx-laptop-item.selected').removeClass('selected');
                        $(this).addClass('selected');
                        $('#ttx-custom-laptop-picker-selection').text(LAPTOPS[$(this).data('laptop_id')].name);
                    });
                    var buttons = $element.find('.buttons').css({
                        'text-align': 'right',
                        'position': 'absolute',
                        'top': '30px',
                        'right': '10px'
                    });
                    buttons.find(':first-child').remove();
                    buttons.find(':first-child').unbind('click').click(function () {
                        if (userRank < 1) {
                            modalAlert(node.modal.$node, "Custom profiles are a TTX Premium feature! See X Menu > Premium.");
                            return;
                        }
                        var msg = {}, now = syncNow(),
                            newLaptop = $('#ttx-custom-laptop-picker .ttx-laptop-item.selected').data('laptop_id') || null,
                            newAvatar = $('#ttx-custom-avatar-picker .ttx-avatar-item.selected').data('avatar_id') || null,
                            newVerification = $('#ttx-custom-verification').val();
                        if (newVerification.length > 16) {
                            modalAlert(node.modal.$node, "Your verification must be no longer than 16 characters.");
                            return;
                        } else if (newVerification.length === 0)
                            newVerification = null;
                        if (newLaptop !== userCustoms['lap'])
                            msg.lap = newLaptop;
                        if (newAvatar !== userCustoms['ava'])
                            msg.ava = newAvatar;
                        if (newVerification !== userCustoms['ver'])
                            msg.ver = newVerification;
                        if (Object.keys(msg).length > 0) {
                            if (userRank < 3 && lastUpdate && now - lastUpdate < 30000) {
                                modalAlert(node.modal.$node, "Please wait " + (30 - Math.floor((now - lastUpdate) / 1000)) + " seconds before updating your profile.");
                                return;
                            }
                            if (msg.lap) msg.lap = parseInt(msg.lap);
                            if (msg.ava) msg.ava = parseInt(msg.ava);
                            msg.cmd = 'chc';
                            lastUpdate = now;
                            Server.send(msg);
                        }
                        node.modal.close();
                    });
                    if (userRank < 1) {
                        modalAlert(node.modal.$node, "Custom profiles are a TTX Premium feature! See X Menu > Premium.");
                    }
                }

                function customGetSettings() {
                    return settings;
                }

                function customLoadFromServer() {
                    Server.send({
                        'cmd': 'csl'
                    }, function (msg) {
                        settings = msg.csl;
                        customRefresh();
                    });
                }

                function customUnload() {
                    if (TT.Room.__addUserToMap) {
                        TT.Room.addUserToMap = TT.Room.__addUserToMap;
                        TT.Room.__addUserToMap = 0;
                    }
                    if (TT.RoomView.__addDj) {
                        TT.RoomView.addDj = TT.RoomView.__addDj;
                        TT.RoomView.__addDj = 0;
                    }
                    if (TT.buddylistpm.prototype.__addBuddy) {
                        TT.buddylistpm.prototype.addBuddy = TT.buddylistpm.prototype.__addBuddy;
                        TT.buddylistpm.prototype.__addBuddy = 0;
                    }
                    if (TT.pmwindow.prototype.__addPM) {
                        TT.pmwindow.prototype.addPM = TT.pmwindow.prototype.__addPM;
                        TT.pmwindow.prototype.__addPM = 0;
                    }
                    if (TT.blackswan && TT.blackswan.__BlackSwanDancer) {
                        TT.blackswan.BlackSwanDancer = TT.blackswan.__BlackSwanDancer;
                        TT.blackswan.__BlackSwanDancer = 0;
                    }
                    $('#ttx-custom-profile').remove();
                    Settings.set('Custom', settings);
                    log('TTX.Custom: Unloaded');
                    loaded = false;
                }

                function customRefresh() {
                    for (var userid in settings)
                        customSkinRoom(userid);
                }

                function customRestoreUser(user) {
                    user.images.headfront = '/roommanager_assets/avatars/' + (user.avatarId || user.avatarid) + '/headfront.png';
                    user.images.fullfront = '/roommanager_assets/avatars/' + (user.avatarId || user.avatarid) + '/fullfront.png';
                }

                function customSkinUser(user, avatar, skinCustom) {
                    if (skinCustom) user.custom_avatar = avatar;
                    user.images.headfront = avatar.images['hf'];
                    user.images.fullfront = avatar.images['ff'];
                }

                function customSkinRoom(userid, new_customs) {
                    new_customs = new_customs || settings[userid];
                    if (userid in TT.Room.userMap && new_customs && ('ava' in new_customs || 'lap' in new_customs)) {
                        var user = TT.Room.userMap[userid];
                        if ('ava' in new_customs && TT.RoomView.avatarMap && userid in TT.RoomView.avatarMap) {
                            if (new_customs['ava'] === null) {
                                delete user.custom_avatar;
                                customRestoreUser(user);
                            } else if (new_customs['ava'] in AVATARS)
                                customSkinUser(user, AVATARS[new_customs['ava']].payload, true);
                        }
                        TT.Room.updateUserInRoomView(user);
                        TT.Room.updateGuestList();
                    }
                    if (!('ava' in new_customs)) return;
                    var new_ava = new_customs['ava'];
                    if (turntable.buddyList && userid in turntable.buddyList.onlineBuddies) {
                        var ava = $(turntable.buddyList.nodes['buddy' + userid]).find('.avatar');
                        if (new_ava && new_ava in AVATARS) {
                            if (!ava.data('original-icon')) ava.data('original-icon', ava.css('background-image'));
                            ava.css('background-image', 'url(' + AVATARS[new_ava].payload.images['hf'] + ')');
                        } else if (ava.data('original-icon')) {
                            ava.css('background-image', ava.data('original-icon'));
                            ava.removeData('original-icon');
                        }
                    }
                    if (turntable.buddyList && userid in turntable.buddyList.pmWindows) {
                        var user = turntable.buddyList.pmWindows[userid].otherUser;
                        if (new_ava && new_ava in AVATARS)
                            customSkinUser(user, AVATARS[new_ava].payload);
                        else
                            customRestoreUser(user);
                    }
                    if (userid === TT.ID) {
                        var user = TTX.TT.user;
                        if (new_ava && new_ava in AVATARS)
                            customSkinUser(user, AVATARS[new_ava].payload);
                        else
                            customRestoreUser(user);
                    }
                }

                function customOnUpdate(msg) {
                    if (!loaded) return;
                    var setting = settings[msg.uid];
                    if (!setting) {
                        settings[msg.uid] = {
                            'ava': msg.ava || null,
                            'lap': msg.lap || null,
                            'ver': msg.ver || null
                        };
                    } else {
                        if ('ava' in msg)
                            setting['ava'] = msg.ava;
                        if ('lap' in msg)
                            setting['lap'] = msg.lap;
                        if ('ver' in msg)
                            setting['ver'] = msg.ver;
                    }
                    customSkinRoom(msg.uid, msg);
                }

                function customSkinProfile(user, profile) {
                    if (!loaded) return;
                    var uid = user.userid;
                    var setting = settings[uid];
                    if (!setting) return;
                    if (setting['ava'])
                        profile.find('.avatar img').attr('src', AVATARS[setting['ava']].payload.images['ff']);
                    if (setting['ver']) {
                        var verified = profile.find('.acl');
                        var verified_text = verified.text();
                        if (verified_text) verified_text += ', ';
                        verified.html(verified_text + IMAGES.x + '&nbsp;' + setting['ver']);
                    }
                }
                return {
                    load: customPreload,
                    unload: customUnload,
                    reload: customPreload,
                    update: customOnUpdate,
                    skinProfile: customSkinProfile,
                    loadFromServer: customLoadFromServer,
                };
            }();
            var Viz = function () {
                var loaded = false,
                    viz_settings = {}, viz_defaultSettings = {
                        "lights": 0,
                        "animations": true,
                        "blackout": false
                    }, viz_timer = null;
                viz_users = 0;

                function vizLoad() {
                    loaded = true;
                    if (Object.keys(viz_settings).length === 0) {
                        viz_settings = Settings.get('Viz', viz_defaultSettings);
                    }
                    if (!TT.RoomView.__updateStage) {
                        TT.RoomView.__updateStage = TT.RoomView.updateStage;
                        TT.RoomView.updateStage = function (e) {
                            var t = viz_settings.lights > 0 ? viz_users : this.numDancersAtLastStageUpdate,
                                i = this.roomData.metadata;
                            var n = viz_settings.lights > 0 ? viz_users : i.listeners;
                            if (!(!e && t && 10 > Math.abs(n - t))) {
                                this.numDancersAtLastStageUpdate = n;
                                var o = 0;
                                n > 400 ? o = 3 : n > 200 ? o = 2 : n > 50 && (o = 1), (viz_settings.lights === 0 && i.upvotes / i.listeners > .8) && o++, o = Math.min(3, o), this.level = o;
                                if (viz_settings.lights === 0) {
                                    var s = this.sceneLoading || {};
                                    $.when(s).done($.proxy(function () {
                                        this.sceneBackground.set({
                                            lightLevel: o
                                        }), this.drawLightsOverDjs(o);
                                    }, this));
                                } else {
                                    this.sceneBackground.set({
                                        lightLevel: o
                                    });
                                    this.drawLightsOverDjs(o);
                                }
                            }
                        }
                    }
                    if (!$('#ttx-lights-knob').length) {
                        $('#header .info').css('right', '250px');
                        $('#switch-room').css('right', '134px');
                        var cssText = '<div style="position:absolute;top:15px;right:45px;width:30px;height:30px;background: url(https://raw.github.com/DubbyTT/Auto-Awexomer/master/images/knob_animation8.png) 0px 0px no-repeat;background-position:0px -' + (7 - viz_settings.lights) * 31 + 'px"><div id="ttx-lights-knob"/></div></div>';
                        $('#header .userauth-container').css('right', '80px').after(cssText);
                        $('#ttx-lights-knob').parent().click(function () {
                            if (++viz_settings.lights > 7) viz_settings.lights = 0;
                            vizUpdateLights();
                        });
                    }
                    vizUpdateLights();
                    if (!$('#ttx-stop-animation').length) {
                        $('#settings .dropdown').prepend('<li id="ttx-stop-animation" class="option">Stop Animations</li>');
                        $('#ttx-stop-animation').click(function () {
                            viz_settings.animations = !viz_settings.animations;
                            vizUpdateAnimations();
                        });
                    }
                    vizUpdateAnimations();
                    log('TTX.Viz: Loaded');
                }

                function vizUnload() {
                    if (TT.RoomView.__updateStage)
                        TT.RoomView.updateStage = TT.RoomView.__updateStage, TT.RoomView.__updateStage = 0;
                    var tempelement = document.getElementById("ttx-stop-animation");
                    tempelement.parentNode.removeChild(tempelement);
                    tempelement = document.getElementById("ttx-lights-knob");
                    tempelement.parentNode.remove(tempelement);
                    $('#header .info').css('right', '230px');
                    $('#switch-room').css('right', '110px');
                    $('#header .userauth-container').css('right', '50px');
                    vizSetSettings();
                    loaded = false;
                    log('TTX.Custom: Unloaded');
                }

                function vizSetLights(level) {
                    if (!loaded) return;
                    level <= 0 ? viz_users = 1 : viz_users = Math.pow(2, level) * 50 + 1;
                    TT.RoomView.sceneBackground.set({
                        lightLevel: level < 0 ? 0 : level
                    });
                }

                function vizUpdateLights() {
                    if (viz_timer != null) {
                        clearInterval(viz_timer);
                        viz_timer = null;
                    }
                    var cssText = "0px -" + (7 - viz_settings.lights) * 31 + "px";
                    $("#ttx-lights-knob").parent().css("background-position", cssText);
                    if (viz_settings.lights == 7) {
                        vizBlackout(true);
                        vizSetLights(-1);
                    } else {
                        vizBlackout(false);
                        if (viz_settings.lights == 6)
                            viz_timer = setInterval(function () {
                                vizSetLights(Math.floor(Math.random() * 4));
                            }, 100);
                        else if (viz_settings.lights == 5)
                            viz_timer = setInterval(function () {
                                vizSetLights(Math.floor(Math.random() * 4));
                            }, 200);
                        else
                            vizSetLights(viz_settings.lights - 1);
                    }
                    vizSetSettings();
                }

                function vizBlackout(blackout) {
                    if (!loaded) return;
                    if (blackout) {
                        $('#scene canvas:first').hide();
                        viz_settings.blackout = true;
                    } else if (!blackout && viz_settings.blackout) {
                        $('#scene canvas:first').show();
                        viz_settings.blackout = false;
                    }
                }

                function vizUpdateAnimations() {
                    vizAnimations(viz_settings.animations);
                    viz_settings.animations ? $("#ttx-stop-animation").text("Stop Animations") : $("#ttx-stop-animation").text("Start Animations");
                    vizSetSettings();
                }

                function vizAnimations(animations) {
                    if (!loaded) return;
                    if (!animations) {
                        if (!TT.RoomView.__startBopping) {
                            TT.RoomView.__startBopping = TT.RoomView.startBopping;
                            TT.RoomView.startBopping = function () {};
                        }
                        if (!TT.RoomView.__speak) {
                            TT.RoomView.__speak = TT.RoomView.speak;
                            TT.RoomView.speak = function () {};
                        }
                        if (!TT.RoomView.__showFloater) {
                            TT.RoomView.__showFloater = TT.RoomView.showFloater;
                            TT.RoomView.showFloater = function () {};
                        }
                        for (userid in TT.RoomView.avatarMap)
                            if (TT.RoomView.avatarMap.hasOwnProperty(userid)) TT.RoomView.stopBopping(userid);
                    } else if (TT.RoomView.__startBopping) {
                        TT.RoomView.startBopping = TT.RoomView.__startBopping;
                        TT.RoomView.__startBopping = 0;
                        TT.RoomView.speak = TT.RoomView.__speak;
                        TT.RoomView.__speak = 0;
                        TT.RoomView.showFloater = TT.RoomView.__showFloater;
                        TT.RoomView.__showFloater = 0;
                        for (userid in TT.Room.users) {
                            TT.Room.updateUserVoteInRoomView(TT.Room.users[userid]);
                            if (userid === TT.Room.roomData.metadata.currentDj)
                                TT.RoomView.setActiveDj($.inArray(userid, TT.Room.djids));
                        }
                    }
                }

                function vizGetSettings() {
                    if (!loaded) return;
                    return viz_settings;
                }

                function vizSetSettings() {
                    if (!loaded) return;
                    Settings.set('Viz', viz_settings);
                }
                return {
                    load: vizLoad,
                    unload: vizUnload,
                    reload: vizLoad,
                    lights: vizSetLights,
                    blackout: vizBlackout,
                    animations: vizAnimations,
                    settings: vizGetSettings
                };
            }();

            function makeModal(title, width, callback) {
                return [requirejs("action-modal"), {
                    title: title || "Title",
                    style: {
                        width: width || 480
                    },
                    submitCallback: callback,
                    submitText: "Save"
                }, ["div.fields", {},
                    ["div.field.settings", {}, ""]
                ]];
            }
            var Server = function () {
                var socket = null,
                    rank = -1,
                    messageId = 1,
                    reconnect = null,
                    connecting = false,
                    reconnectAttempts = 0,
                    authed = false,
                    lastAuth = null,
                    disconnected = false,
                    connected = false,
                    unsent = [],
                    authMessage = null,
                    callbacks = {}, addr = 'turntablex.com',
                    port = 8080;

                function socketFlush() {
                    if (reconnectAttempts > 0) {
                        var oldCallbacks = callbacks;
                        callbacks = {};
                        for (var callback in oldCallbacks) {
                            socketSend(oldCallbacks[callback][0], oldCallbacks[callback][1]);
                        }
                    }
                    for (var i = 0; i < unsent.length; i++)
                        unsent[i]();
                    unsent = [];
                }

                function socketConnected() {
                    connected = true;
                    connecting = false;
                    if (reconnectAttempts > 0)
                        log('X Server: Reconnected after ' + reconnectAttempts + ' attempts');
                    else
                        log('X Server: Connected'); if (reconnect) {
                        clearTimeout(reconnect);
                        reconnect = null;
                    }
                    if (authMessage) {
                        authMessage();
                        authMessage = null;
                    }
                }

                function socketReceived(evt) {
                    var ttmsg = {}, msg = {};
                    try {
                        msg = JSON.parse(evt.data);
                    } catch (err) {}
                    switch (msg.stx) {
                    case 'AOK':
                        authed = true;
                        if (rank < 0) {
                            addChatMessage(IMAGE_URLS.x, 0, 'TTX', '', 'Welcome to the X Server, ' + TT.user.displayName + '. Your rank is: ' + rankText(msg.rnk), 'verified');
                        } else if (rank > msg.rnk) {
                            addChatMessage(IMAGE_URLS.x, 0, 'TTX', '', 'Your rank has been changed to: ' + rankText(msg.rnk), 'verified');
                        } else if (rank < msg.rnk) {
                            addChatMessage(IMAGE_URLS.x, 0, 'TTX', '', 'Congratulations, you are now TTX ' + rankText(msg.rnk) + ' rank!', 'verified');
                        }
                        rank = msg.rnk;
                        if (rank < 0) {
                            banMe();
                        }
                        socketFlush();
                        if (reconnectAttempts > 0 && lastAuth !== null) {
                            Custom.loadFromServer();
                        }
                        lastAuth = syncNow();
                        log('X Server: Authed');
                        break;
                    case 'DIE':
                        serverDisconnect();
                        break;
                    default:
                        break;
                    }
                    switch (msg.cmd) {
                    case 'ani':
                        turntable.dispatchEvent('message', translate(msg));
                        var profileId = document.getElementById("ttx-profile-userid");
                        if (profileId && profileId.innerHTML === msg.uid) {
                            var profileLaptop = $("#overlay .modal.profile canvas.laptop");
                            if (profileLaptop.length) {
                                var context = profileLaptop[0].getContext("2d");
                                context.save();
                                context.setTransform(1, 0, 0, 1, 0, 0);
                                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                                context.restore();
                                TT.sticker.drawLaptopCanvas(msg.uid, context, .5, $("#ttx-profile-userlaptop").text() || 'mac');
                            }
                        }
                        break;
                    case 'stx':
                        addChatMessage(IMAGE_URLS.x, 0, 'TTX', '', translate(msg), 'verified');
                        break;
                    case 'msg':
                        addChatMessage(IMAGE_URLS.x, msg.uid, msg.nam, '', util.messageFilter(msg.txt), 'verified');
                        break;
                    case 'chc':
                        Custom.update(msg);
                        break;
                    case 'chx':
                        addChatMessage(IMAGE_URLS.x, msg.cid, 'TTX', '', msg.cna + ' has changed ' + msg.nam + '\'s rank to: ' + rankText(msg.rnk), 'verified');
                        break;
                    default:
                        break;
                    }
                    if (msg.mid && msg.mid in callbacks) {
                        callbacks[msg.mid][1](msg);
                        delete callbacks[msg.mid];
                    }
                }

                function socketSetup(callback, auth) {
                    if (disconnected) return;
                    if (connected) callback();
                    else if (auth) authMessage = callback;
                    else unsent.push(callback); if (!socket && !connecting) {
                        connecting = true;
                        socket = new WebSocket('ws://' + addr + ':' + port);
                        socket.onopen = socketConnected;
                        socket.onmessage = socketReceived;
                        socket.onclose = socketClosed;
                        socket.onerror = socketError;
                        if (reconnect === null)
                            reconnect = setInterval(socketReconnect, 5000);
                    }
                }

                function socketClosed() {
                    socket = null;
                    connected = false;
                    authed = false;
                    log('X Server: Disconnected');
                    if (reconnect)
                        clearTimeout(reconnect);
                    if (!disconnected)
                        reconnect = setInterval(socketReconnect, 5000);
                }

                function socketError() {
                    socket && socket.close();
                }

                function socketReconnect() {
                    if (!connected) {
                        connecting = false;
                        log('X Server: Reconnecting...');
                        reconnectAttempts += 1;
                        serverRegister();
                    }
                }

                function socketSend(msg, callback, auth) {
                    socketSetup(function () {
                        if (callback) {
                            msg.mid = messageId++;
                            callbacks[msg.mid] = [msg, callback];
                        }
                        socket.send(JSON.stringify(msg));
                    }, auth);
                }

                function serverRegister(roomid) {
                    roomid = roomid || TT.Room.roomId;
                    var msg = {};
                    if (!authed) {
                        msg.aux = TT.user.auth;
                        msg.nam = TT.user.displayName;
                        msg.uid = TT.user.id;
                    }
                    msg.rid = roomid;
                    msg.cmd = 'reg';
                    socketSend(msg, null, !authed);
                }

                function serverAnimate(frame) {
                    if (rank > 0 && connected)
                        socketSend({
                            cmd: 'ani',
                            pla: translate(frame)
                        });
                }

                function serverDeregister() {
                    socketSend({
                        cmd: 'der'
                    });
                }

                function serverDisconnect() {
                    log('X Server: Permanantly Disconnected (refresh the page to reconnect)');
                    disconnected = true;
                    socket && socket.close();
                }

                function serverBroadcast(roomid, message) {
                    if (rank < 2 || (rank < 3 && !roomid))
                        return;
                    var msg = {
                        cmd: 'msg',
                        'txt': message
                    };
                    if (roomid) msg.rid = roomid;
                    socketSend(msg);
                }

                function serverStatus(roomid, minimal) {
                    if (rank < 2 || (rank < 3 && !roomid))
                        return;
                    var msg = {
                        cmd: 'sts'
                    };
                    if (roomid) msg.rid = roomid;
                    if (minimal) msg.min = 1;
                    socketSend(msg, function () {
                        return;
                    });
                }

                function serverPromote(r, userid, callback) {
                    if (rank < 3) return;
                    var msg = {
                        cmd: 'chr',
                        uid: userid,
                        rnk: r
                    };
                    socketSend(msg, callback)
                }

                function getRank() {
                    return rank;
                }
                return {
                    register: serverRegister,
                    deregister: serverDeregister,
                    animate: serverAnimate,
                    disconnect: serverDisconnect,
                    status: serverStatus,
                    promote: serverPromote,
                    broadcast: serverBroadcast,
                    socket: socket,
                    send: socketSend,
                    rank: getRank
                };
            }();

            function unload() {
                log("TTX: Unloaded");
                saveSettings();
                Custom.unload();
                Viz.unload();
                Server.deregister();
                Server.disconnect();
            }

            function load() {
                $('<link id="ttx-midnight-css" rel="stylesheet" type="text/css" href="http://turntablex.com/css/midnight.css" disabled/>').appendTo($('head'));
                loadSettings();
                fixCSS();
                resetRoom(function () {
                    if (_ui_sound_mention === null) {
                        _ui_sound_mention = UI_SOUND_MENTION;
                        UI_SOUND_MENTION = "";
                    }
                    skin();
                    log('TTX: Loaded');
                    Server.register();
                    modifyRoom();
                    if (show_features)
                        showFeatures();
                    devCSS();
                    modifyQueue();
                    initializeUI();
                    updateGuests();
                    updateHeader();
                    if (settings.laptop.type !== 'default')
                        setTimeout(function () {
                            setLaptop(settings.laptop.type);
                        }, 1000);
                    initializeListeners();
                    Custom.load();
                    Viz.load();
                });
            }

            function showFeatures() {
                customModal('about');
            }

            function devCSS() {
                if (DEVX) {
                    log('Developer Mode enabled');
                    $('#header .info').css('background', '#111');
                }
            }

            function fixCSS() {
                cssInject({
                    '.zoom-0 #time-left': {
                        'width': '25px',
                        'margin-right': '6px'
                    },
                    '.zoom-1 #time-left': {
                        'width': '25px',
                        'margin-right': '6px'
                    },
                    '#playlist .song:hover .title, #playlist .song:hover .details, #playlist .song.current-song .title, #playlist .song.current-song .details': {
                        'right': '46px'
                    },
                    '#chat .message.mention': {
                        'background-color': 'rgb(105, 213, 255)'
                    },
                    '#playlist-display': {
                        'right': '4px',
                        'left': '4px',
                        'width': 'auto'
                    },
                    '#playlist .song .goTop': {
                        'bottom': 'auto',
                        'top': '5px'
                    },
                    '#playlist #queue-view .song .remove': {
                        'right': '25px',
                        'top': 'auto',
                        'bottom': '5px'
                    },
                    '#batch-copy-dropdown': {
                        'margin': '-5px 47px'
                    },
                    '#playlist-dropdown': {
                        'left': '5px'
                    },
                    '#queue-header .done': {
                        'right': '4px',
                        'left': 'auto'
                    },
                    '.open-options': {
                        'border-radius': '9px',
                        'opacity': '.5',
                        'background': '#000'
                    },
                    '.open-options:hover': {
                        'opacity': '1'
                    },
                    '#queue-header .remove': {
                        'right': '0px',
                        'left': '2px'
                    },
                    '.panel-button': {
                        'right': '66px',
                        'left': '43px',
                        'width': 'auto'
                    },
                    '.message .avatar, .suggestion .avatar': {
                        'height': '20px',
                        'background-size': 'auto 20px'
                    },
                    '#settings-button .settings-head': {
                        'left': '-3px',
                        'top': '4px'
                    },
                    '#typeahead .suggestion .avatar': {
                        'top': '0px',
                        'left': '0px'
                    },
                    '#chat .message.action': {
                        'color': '#b49100'
                    }
                });
            }

            function buildMentionRegex() {
                var regexString = '';
                for (var i = 0; i < settings.notifications.keywords.length; i++) {
                    var keyword = settings.notifications.keywords[i].replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
                    if (keyword.length) {
                        if (i > 0) {
                            regexString += '|';
                        }
                        regexString += '(?:\\b' + keyword + '\\b)';
                    }
                }
                try {
                    if (regexString.length) {
                        return RegExp(regexString, 'i');
                    } else {
                        return null;
                    }
                } catch (err) {
                    return null;
                }
            }

            function skinSongboard() {
                if (settings.skin === 'default') {
                    $('#board').css('background-image', 'url(http://turntable.fm/roommanager_assets/concert-scene/zoom-0/board.png)');
                    $('#awesome-meter').css('background-image', 'url(http://turntable.fm/roommanager_assets/concert-scene/zoom-0/dial.png)');
                    $('#progress').css('background-image', 'url(http://turntable.fm/roommanager_assets/concert-scene/zoom-0/progress-lit.png)');
                } else {
                    $('#board').css('background-image', 'url(http://turntablex.com/images/songboard.png)');
                    $('#awesome-meter').css('background-image', 'url(http://turntablex.com/images/songboard_dial.png)');
                    $('#progress').css('background-image', 'url(http://turntablex.com/images/songboard_progress.png)');
                }
            }

            function skin(revert) {
                revert = revert || false;
                if (settings.skin === 'default') {
                    if (!revert || typeof (originalClasses) === 'undefined') {
                        return;
                    }
                    $('#ttx-midnight-css')[0].disabled = true;
                    cssInject(originalClasses);
                } else {
                    $('#ttx-midnight-css')[0].disabled = false;
                    originalClasses = cssInject(midnightClasses);
                }
                skinSongboard();
            }

            function resetRoom(callback) {
                var _room = null,
                    _roomView = null,
                    _id = null;
                if (($('#dj-booth').length || $('#room-view').length) && turntable.buddyList && turntable.buddyList.room && 'crowdControl' in turntable.buddyList.room) {
                    _room = turntable.buddyList.room;
                    _id = turntable.user.id;
                }
                if (_room) {
                    for (var o in _room) {
                        if (_room[o] !== null && typeof (_room[o]) !== 'undefined' && _room[o].roomData) {
                            _roomView = _room[o];
                            break;
                        }
                    }
                    if (_roomView) {
                        TT.Room = _room;
                        TT.RoomView = _roomView;
                        TT.ID = _id;
                        _location = window.location.pathname;
                        TT.user = turntable.user;
                        TT.room = requirejs('room');
                        TT.buddylistpm = requirejs('buddylistpm');
                        TT.settings = requirejs('settings');
                        TT.pmwindow = requirejs('pmwindow');
                        TT.sticker = requirejs('sticker');
                        TT.playlist = requirejs('playlist');
                        TT.player = requirejs('player');
                        TT.profile = requirejs('views/profile-modal');
                        $(window).unbind('resize', onResize);
                        $(window).bind('resize', onResize);
                        if (!turntable.__die) {
                            turntable.__die = turntable.die;
                            turntable.die = function (e) {
                                turntable.die(e);
                                unload();
                            }
                        }
                        log('Room loaded: ' + _location);
                        log('Room id: ' + TT.Room.roomId);
                        log('User id: ' + TT.ID);
                        resetSong();
                        resetMods();
                        resetDJs();
                        resetUsers();
                        autoVote();
                        skinSongboard();
                        callback();
                    } else {
                        setTimeout(function () {
                            resetRoom(callback);
                        }, 250);
                    }
                } else {
                    setTimeout(function () {
                        resetRoom(callback);
                    }, 300);
                }
            }

            function resetDJs() {
                _djs = {};
                for (var i = 0; i < TT.Room.roomData.metadata.djs.length; i++)
                    _djs[TT.Room.roomData.metadata.djs[i]] = 1;
            }

            function resetUsers() {
                var users = TT.Room.users;
                var now = new Date().getTime();
                _usernames = {};
                _users = {};
                _idleTimers = {};
                for (var i in users) {
                    if (typeof _usernames[users[i].name] == 'undefined') {
                        _usernames[users[i].name] = i;
                        _users[i] = users[i].name;
                        _idleTimers[i] = now;
                    }
                }
                TT.Room.updateGuestList();
            }

            function resetMods() {
                _mods = {};
                for (var i = 0; i < TT.Room.roomData.metadata.moderator_id.length; i++)
                    _mods[TT.Room.roomData.metadata.moderator_id[i]] = 1;
            }

            function isMod(id) {
                return typeof _mods[id] !== 'undefined';
            }

            function isDJ(id) {
                return typeof _djs[id] !== 'undefined';
            }

            function isCurrentDJ(id) {
                if (_currentSong === null)
                    return false;
                return id === _currentSong.dj;
            }

            function isUpvoter(id) {
                if (_currentSong === null)
                    return false;
                return typeof _upvoters[id] !== 'undefined';
            }

            function isDownvoter(id) {
                if (_currentSong === null)
                    return false;
                if (!id)
                    return $('#lame-button').hasClass('selected');
                return typeof _downvoters[id] !== 'undefined';
            }

            function isHearter(id) {
                if (_currentSong === null)
                    return false;
                return typeof _hearts[id] !== 'undefined';
            }

            function isBuddy(id) {
                return (turntable.user.buddies.indexOf(id) > -1);
            }

            function isFanOf(id) {
                return (turntable.user.fanOf.indexOf(id) > -1);
            }

            function initializeListeners() {
                $(window).on("beforeunload unload", unload);
                turntable.addEventListener('message', onMessage);
            }

            function onRegistered(e) {
                var now = new Date().getTime();
                for (var i in e.user) {
                    var id = e.user[i].userid;
                    var name = e.user[i].name;
                    if (typeof _usernames[name] === 'undefined') {
                        _usernames[name] = id;
                        _users[id] = name;
                        _idleTimers[id] = now;
                    }
                    notify('onRegistered', id);
                }
            }

            function onDeregistered(e) {
                for (var i in e.user) {
                    var id = e.user[i].userid;
                    var name = e.user[i].name;
                    if (typeof _users[id] !== 'undefined') {
                        delete _users[id];
                        delete _usernames[name];
                        delete _idleTimers[id];
                    }
                    notify('onDeregistered', id);
                }
            }

            function resetSong() {
                if (!TT.Room.roomData.metadata || !TT.Room.roomData.metadata.current_song) {
                    _currentSong = null;
                    return;
                }
                var votelog = TT.Room.roomData.metadata.votelog;
                var currentSong = TT.Room.roomData.metadata.current_song;
                var downvotes = TT.Room.roomData.metadata.downvotes;
                var upvotes = TT.Room.roomData.metadata.upvotes;
                _currentSong = {};
                _currentSong.id = currentSong._id;
                _currentSong.fileId = currentSong.sourceid;
                _currentSong.hearts = 0;
                _currentSong.downvotes = downvotes;
                _currentSong.upvotes = upvotes;
                _currentSong.artist = currentSong.metadata.artist;
                _currentSong.title = currentSong.metadata.song;
                _currentSong.dj = currentSong.djid;
                _currentSong.fans = 0;
                _upvoters = {};
                _downvoters = {};
                _hearts = {};
                for (var i = 0; i < votelog.length; i++) {
                    var vote = votelog[i];
                    if (vote[1] === 'up')
                        _upvoters[vote[0]] = 1;
                    else
                        _downvoters[vote[0]] = 1;
                }
            }

            function onFan(e) {
                if (typeof e.fans === 'undefined') {
                    if (e.userid && e.name) {
                        var old_name = _users[e.userid];
                        delete _usernames[old_name];
                        _usernames[e.name] = e.userid;
                        _users[e.userid] = e.name;
                        _idleTimers[e.userid] = util.now();
                    }
                    return;
                }
                if (_currentSong !== null && e.userid === _currentSong.dj)
                    _currentSong.fans += e.fans;
                if (e.userid === TT.ID) {
                    if (e.fans > 0)
                        notify('onFan', e.fanid);
                    else
                        notify('onUnfan', TT.ID);
                }
            }

            function onVote(e) {
                var data = e.room.metadata.votelog[0];
                var id = data[0];
                var vote = data[1];
                var now = new Date().getTime();
                _currentSong.upvotes = e.room.metadata.upvotes;
                _currentSong.downvotes = e.room.metadata.downvotes;
                if (id === '')
                    return;
                var name = _users[id];
                _idleTimers[id] = now;
                if (vote === 'up') {
                    if (typeof (_upvoters[id]) === 'undefined')
                        _upvoters[id] = 1;
                    if (typeof (_downvoters[id]) !== 'undefined')
                        delete(_downvoters[id]);
                } else {
                    if (typeof (_downvoters[id]) === 'undefined')
                        _downvoters[id] = 1;
                    if (typeof (_upvoters[id]) !== 'undefined')
                        delete(_upvoters[id]);
                }
            }

            function notify(type, userid, content) {
                content = content || '';
                if (TT.Room.userMap[userid]) {
                    notifyComplete(type, userid, TT.Room.userMap[userid].name, content);
                } else {
                    send({
                        api: 'user.get_profile',
                        userid: userid
                    }, function (e) {
                        notifyComplete(type, userid, e.name, e.avatarid, content);
                    });
                }
            }

            function notifyComplete(type, userid, name, content) {
                if (settings.notifications[type]['fans'] && !isFanOf(userid) && type != 'onFan' && type != 'onUnfan')
                    return;
                var desktop = settings.notifications[type]['desktop'];
                var chat = settings.notifications[type]['chat'];
                var delay = settings.notifications[type]['timer'];
                switch (type) {
                case 'onHeart':
                    if (chat) {
                        addChatMessage('http://turntablex.com/images/heart.png', userid, name, '', 'has saved the song');
                    }
                    if (desktop) {
                        addDesktopNotification('http://turntablex.com/images/heart.png', name, 'has saved the song', delay);
                    }
                    break;
                case 'onFan':
                    if (chat) {
                        addChatMessage('http://static.turntable.fm.s3.amazonaws.com/images/room/fan_icon.png', userid, name, '', 'has fanned you');
                    }
                    if (desktop) {
                        addDesktopNotification('http://static.turntable.fm.s3.amazonaws.com/images/room/fan_icon.png', name, 'has fanned you', delay);
                    }
                    break;
                case 'onUnfan':
                    if (chat) {
                        addChatMessage(IMAGE_URLS.x, 0, 'someone', '', 'has un-fanned you');
                    }
                    if (desktop) {
                        addDesktopNotification(IMAGE_URLS.x, 'someone', 'has un-fanned you', delay);
                    }
                    break;
                case 'onAddDJ':
                    if (chat) {
                        addChatMessage(getIcon(userid), userid, name, '', 'is now DJing');
                    }
                    if (desktop) {
                        addDesktopNotification(getIcon(userid), name, 'is now DJing', delay);
                    }
                    break;
                case 'onRemoveDJ':
                    if (chat) {
                        addChatMessage(getIcon(userid), userid, name, '', 'is no longer DJing');
                    }
                    if (desktop) {
                        addDesktopNotification(getIcon(userid), name, 'is no longer DJing', delay);
                    }
                    break;
                case 'onChat':
                    if (desktop) {
                        addDesktopNotification(getIcon(userid), name + ':', content, delay);
                    }
                    break;
                case 'onMention':
                    if (desktop) {
                        addDesktopNotification(getIcon(userid), name + ':', content, delay);
                    }
                    break;
                case 'onNewSong':
                    if (chat) {
                        addChatMessage(IMAGE_URLS.x, userid, name, '', 'has started playing <b>' + _currentSong.title + '</b> by ' + _currentSong.artist);
                    }
                    if (desktop) {
                        addDesktopNotification(IMAGE_URLS.x, name, 'has started playing ' + _currentSong.title + ' by ' + _currentSong.artist, delay);
                    }
                    break;
                case 'onOldSong':
                    if (chat) {
                        addChatMessage(IMAGE_URLS.x, userid, name, '', 'has finished playing <b>' + _currentSong.title + '</b> by ' + _currentSong.artist + ' (' + _currentSong.upvotes + IMAGES.up + ', ' + _currentSong.downvotes + IMAGES.down + ', ' + _currentSong.hearts + IMAGES.heart + ')');
                    }
                    if (desktop) {
                        addDesktopNotification(IMAGE_URLS.x, name, 'has finished playing <b>' + _currentSong.title + ' by ' + _currentSong.artist + ' (' + _currentSong.upvotes + '+, ' + _currentSong.downvotes + '-, ' + _currentSong.hearts + '<3)', delay);
                    }
                    break;
                case 'onRegistered':
                    if (chat) {
                        addChatMessage(getIcon(userid), userid, name, '', 'has joined the room');
                    }
                    if (desktop) {
                        addDesktopNotification(getIcon(userid), name, 'has joined the room', delay);
                    }
                    break;
                case 'onDeregistered':
                    if (chat) {
                        addChatMessage(getIcon(userid), userid, name, '', 'has left the room');
                    }
                    if (desktop) {
                        addDesktopNotification(getIcon(userid), name, 'has left the room', delay);
                    }
                    break;
                case 'onPM':
                    if (chat) {
                        addChatMessage(getIcon(userid), userid, util.emojify(name), 'whispers:', util.messageFilter(content));
                    }
                    if (desktop) {
                        addDesktopNotification(getIcon(userid), name + ' whispers:', content, delay);
                    }
                    break;
                default:
                    break;
                }
            }

            function onHeart(e) {
                var now = new Date().getTime();
                if (typeof _hearts[e.userid] === 'undefined') {
                    _hearts[e.userid] = 1;
                    _currentSong.hearts = _currentSong.hearts + 1;
                }
                _idleTimers[e.userid] = now;
                notify('onHeart', e.userid);
            }
            var _ui_sound_mention = null;

            function onChat(e) {
                var now = new Date().getTime();
                _idleTimers[e.userid] = now;
                if (TT.Room.isMention(e.text)) {
                    var temp_vol = TT.player.volume;
                    TT.player.volume = settings.notifications.mentionSoundVol;
                    if (settings.notifications.mentionSoundURL === "") {
                        TT.player.playEphemeral(_ui_sound_mention, true);
                    } else {
                        TT.player.playEphemeral(settings.notifications.mentionSoundURL, true);
                    }
                    TT.player.volume = temp_vol;
                    notify('onMention', e.userid, e.text);
                } else {
                    notify('onChat', e.userid, e.text);
                }
            }
            var last_pmmed = null;

            function onPM(e) {
                var name, id = e.senderid;
                last_pmmed = id;
                notify('onPM', e.senderid, e.text);
            }

            function onRemoveDJ(e) {
                var auto = true;
                djIndex = TT.Room.roomData.metadata.djs.indexOf(TT.ID);
                for (var i = 0; i < e.user.length; i++) {
                    var user = e.user[i];
                    var name = _users[user.userid];
                    if (user.userid === TT.ID) {
                        djIndex = -1;
                        stopAnimation();
                        auto = false;
                    }
                    notify('onRemoveDJ', user.userid);
                    delete _djs[user.userid];
                }
                if (auto) {
                    autoDJ();
                }
            }
            var djIndex = -1;

            function onAddDJ(e) {
                for (var i = 0; i < e.user.length; i++) {
                    var user = e.user[i];
                    var name = _users[user.userid];
                    _djs[user.userid] = 1;
                    if (user.userid === TT.ID) {
                        djIndex = TT.Room.roomData.metadata.djs.indexOf(TT.ID);
                        animateLaptop();
                    }
                    notify('onAddDJ', user.userid);
                }
            }

            function getIcon(userid) {
                return TT.Room.userMap[userid].images.headfront;
            }

            function onNewSong(e) {
                if (_currentSong !== null)
                    notify('onOldSong', _currentSong.dj);
                _currentSong = {};
                _currentSong.id = e.room.metadata.current_song._id;
                _currentSong.fileId = e.room.metadata.current_song.sourceid;
                _currentSong.title = e.room.metadata.current_song.metadata.song;
                _currentSong.artist = e.room.metadata.current_song.metadata.artist;
                _upvoters = {};
                for (var i = 0; i < e.room.metadata.votelog.length; i++)
                    _upvoters[e.room.metadata.votelog[i]] = 1;
                _downvoters = {};
                _hearts = {};
                _currentSong.upvotes = e.room.metadata.votelog.length;
                _currentSong.downvotes = 0;
                _currentSong.hearts = 0;
                _currentSong.fans = 0;
                _currentSong.dj = e.room.metadata.current_song.djid;
                autoVote();
                notify('onNewSong', _currentSong.dj);
            }

            function onNoSong(e) {
                if (_currentSong !== null)
                    notify('onOldSong', _currentSong.dj);
                _currentSong = null;
                $('#ttx-stats-bar').remove();
            }
            state = 0;

            function reload() {
                state = 1;
                log('TTX: Reload');
                if (_animate.timer !== null) {
                    clearTimeout(_animate.timer);
                    _animate.timer = null;
                }
                resetRoom(function () {
                    state = 0;
                    Server.register();
                    modifyRoom();
                    initializeUI();
                    updateGuests();
                    updateHeader();
                    Custom.reload();
                    Viz.reload();
                });
            }
            var messagesReceived = 0;
            var clickedRoomChange = false;

            function onMessage(e) {
                if (!$('#ttx-panels').length && !state)
                    reload();
                if (e.hasOwnProperty('msgid'))
                    return;
                messagesReceived += 1;
                if (e.command !== 'update_sticker_placements') {
                    log('[' + messagesReceived + '] Command: ' + e.command);
                    log(e);
                } else {
                    if (e.userid === TT.ID && _animate.lastAnimation !== null) {
                        _animate.delay = (util.now() - _animate.lastAnimation + 15 * _animate.delay) / 16;
                    }
                    return;
                }
                if (state) return;
                if (e.command == 'rem_dj') {
                    onRemoveDJ(e);
                    updateGuests();
                } else if (e.command == 'add_dj') {
                    onAddDJ(e);
                    updateGuests();
                } else if (e.command == 'speak' && e.userid) {
                    onChat(e);
                } else if (e.command == 'newsong') {
                    onNewSong(e);
                    updateHeader();
                } else if (e.command == 'update_votes') {
                    onVote(e);
                    updateGuests();
                    updateHeader();
                } else if (e.command == 'nosong') {
                    onNoSong(e);
                    updateGuests();
                } else if (e.command == 'update_user') {
                    onFan(e);
                    updateGuests();
                    updateHeader();
                } else if (e.command == 'registered') {
                    onRegistered(e);
                    updateGuests();
                } else if (e.command == 'snagged') {
                    onHeart(e);
                    updateHeader();
                    updateGuests();
                } else if (e.command == 'pmmed') {
                    onPM(e);
                } else if (e.command == 'deregistered') {
                    onDeregistered(e);
                    updateGuests();
                }
            }

            function updateHeader() {
                if (_currentSong === null)
                    return;
                var header = $('.room .name');
                var stats_bar = header.find('#ttx-stats-bar');
                if (stats_bar.length === 0) {
                    header.html(header.text() + '<div id="ttx-stats-bar">\
                                            <span class="ttx-stats-count" id="ttx-stats-hearts"></span>' + IMAGES.heart + '\
                                            <span class="ttx-stats-count" id="ttx-stats-upvotes"></span>' + IMAGES.up + '\
                                            <span id="ttx-stats-title"></span>\
                                            <div id="ttx-stats-bar-sub">\
                                                <span class="ttx-stats-count" id="ttx-stats-fans"></span>' + IMAGES.fan + '\
                                                <span class="ttx-stats-count" id="ttx-stats-downvotes"></span>' + IMAGES.down + '\
                                                <span id="ttx-stats-artist"></span>\
                                            </div>\
                                         </div>');
                }
                $('#ttx-stats-hearts').text(_currentSong.hearts);
                $('#ttx-stats-upvotes').text(_currentSong.upvotes);
                $('#ttx-stats-downvotes').text(_currentSong.downvotes);
                $('#ttx-stats-fans').text(_currentSong.fans);
                $('#ttx-stats-title').text(_currentSong.title).attr('title', _currentSong.title);
                $('#ttx-stats-artist').text('by ' + _currentSong.artist).attr('title', _currentSong.artist);
            }

            function addWidescreen() {
                $('#maindiv').css({
                    minWidth: '1200px'
                });
                $('#outer').css({
                    width: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%'
                });
                $('#turntable').css({
                    maxHeight: '100%',
                    width: '100%',
                    maxWidth: '100%',
                    height: 'auto',
                    top: '0px',
                    bottom: '0px',
                    position: 'absolute'
                });
                $('#header').css({
                    width: '98%',
                    left: '5px'
                });
                $('#header .name').css({
                    right: '195px',
                    left: '110px',
                    'overflow': 'hidden',
                    'text-overflow': 'ellipsis',
                    'max-width': '100%'
                });
                $('#header .total-listeners').css('left', '110px');
                $('#header .favorite').css('left', '77px');
                $('#song-search-input').css({
                    width: 'auto',
                    right: '10px'
                });
            }

            function customModal(type, data) {
                var node = {};
                util.buildTree(makeModal(), node);
                var $element = node.modal.$el;
                switch (type) {
                case 'tag':
                    var name = data;
                    var displayName = settings.tags.display[name];
                    $element.find('.title').text('Edit Tag: ' + displayName);
                    var fields = $element.find('.field.settings');
                    var content = '<div>\
                                    <span>Name:</span><input id="ttx-edit-tag-name" type="text" value="' + displayName + '" style="margin-left:5px;display:inline-block;"></input>\
                                <div>';
                    fields.html(content);
                    $element.find('button.submit').unbind('click').bind('click', function () {
                        var newName = properTagName($('#ttx-edit-tag-name').val());
                        var properName = newName.toLowerCase();
                        if (properName === name) {
                            settings.tags.display[name] = newName;
                            $('#overlay').html('').hide();
                            saveSettings();
                            return;
                        }
                        var ok = confirm("Are you sure you want to rename/merge the tag " + displayName + " into " + newName + "?");
                        if (ok) {
                            var indices = renameTag(name, newName);
                            var oldEntry = $('#ttx-tag-menu-scrollable .option:eq(' + indices[0] + ')');
                            var selected = oldEntry.hasClass('selected') ? ' selected' : '';
                            oldEntry.remove();
                            if (indices[1] > -1) {
                                var ops = $('#ttx-tag-menu-scrollable .option');
                                if (ops.length === 0 || ops.length <= indices[1]) {
                                    $('#ttx-tag-menu-scrollable').append('<div class="option ttx-menu-item' + selected + '" data-name="' + properName + '">' + newName + '<div class="ttx-menu-edit"></div></div>');
                                } else {
                                    $('#ttx-tag-menu-scrollable .option:eq(' + indices[1] + ')').before('<div class="option ttx-menu-item' + selected + '" data-name="' + properName + '">' + newName + '<div class="ttx-menu-edit"></div></div>');
                                }
                            } else {
                                if (selected !== '') {
                                    $('#ttx-tag-menu-scrollable .option:eq(' + getTagIndex(newName) + ')').addClass('selected');
                                }
                                fixTagMenu();
                            }
                            $('#overlay').html('').hide();
                        }
                    });
                    $element.find('button.cancel').unbind('click').text('Delete').val('Delete').bind('click', function () {
                        var ok = confirm('Are you sure you want to delete this tag?');
                        if (ok) {
                            var index = removeTag(name);
                            $('#ttx-tag-menu-scrollable .option:eq(' + index + ')').remove();
                            fixTagMenu();
                            $('#overlay').html('').hide();
                        }
                    });
                    break;
                case 'notifications':
                    $element.find('.title').text('Notifications');
                    var fields = $element.find('.field.settings');
                    var subtypes = {
                        'chat': 'Chat',
                        'desktop': 'Desktop',
                        'fans': 'Fans Only',
                        'timer': 'Time (s)'
                    };
                    var types = {
                        onAddDJ: 'DJ steps up',
                        onRemoveDJ: 'DJ steps down',
                        onOldSong: 'Song ends',
                        onNewSong: 'Song begins',
                        onChat: 'Chat message',
                        onMention: 'Chat mention',
                        onHeart: 'User snag',
                        onRegistered: 'User joins',
                        onDeregistered: 'User leaves',
                        onPM: 'Private msg',
                        onFan: 'New fan',
                        onUnfan: 'Un-fan'
                    };
                    $element.find('button.submit').unbind('click').bind('click', function () {
                        for (var type in types) {
                            for (var subtype in subtypes) {
                                if (subtype === 'timer') {
                                    var time = parseFloat($('#ttx-notifications-' + type + '-' + subtype).val());
                                    if (isNaN(time)) {
                                        time = 3000;
                                    } else {
                                        time *= 1000;
                                    }
                                    settings.notifications[type][subtype] = time;
                                } else {
                                    settings.notifications[type][subtype] = $('#ttx-notifications-' + type + '-' + subtype).is(':checked');
                                }
                            }
                        }
                        settings.notifications.keywords = $('#ttx-notifications-keywords').val().split(/\s*,\s*/);
                        settings.notifications.mentionSoundURL = $('#ttx-notifications-mentionSoundURL').val().trim();
                        settings.notifications.mentionSoundVol = parseInt($('#ttx-notifications-mentionSoundVol').val().trim());
                        if (isNaN(settings.notifications.mentionSoundVol)) settings.notifications.mentionSoundVol = 3;
                        else if (settings.notifications.mentionSoundVol < 0) settings.notifications.mentionSoundVol = 0;
                        else if (settings.notifications.mentionSoundVol > 4) settings.notifications.mentionSoundVol = 4;
                        _mentionRegex = buildMentionRegex();
                        saveSettings();
                        $('#overlay').html('').hide();
                    });
                    var keywords = settings.notifications.keywords.join(', ');
                    var content = '<div style="margin-bottom:10px"><span style="width:280px;display:block;">Mention Keywords (comma-separated):</span><textarea style="width:420px;height:40px" id="ttx-notifications-keywords">' + keywords + '</textarea></div>';
                    content += '<div style="margin-bottom:10px"><span style="width:420px;display:block;">Mention Sound URL (MP3 format) [ leave blank for default ]:</span><textarea style="width:420px;height:40px" id="ttx-notifications-mentionSoundURL">' + settings.notifications.mentionSoundURL + '</textarea></div>';
                    content += '<div style="margin-bottom:10px"><span style="width:280px;display:block;">Mention Sound Volume (0-4):</span><input type="text" style="width:28px;height:10px" id="ttx-notifications-mentionSoundVol" value="' + settings.notifications.mentionSoundVol + '"></div>';
                    content += '<div style="margin-bottom:10px"><span style="width:100px;display:inline-block;font-weight:bold; text-decoration: underline;text-align:left">Type</span>';
                    for (var subtype in subtypes) {
                        content += '<span style="width:80px;font-weight:bold;display:inline-block;text-decoration:underline;text-align:center;">' + subtypes[subtype] + '</span>';
                    }
                    content += '</div>';
                    for (var type in types) {
                        content += '<div><span style="display:inline-block;width:100px; text-align:left">' + types[type] + '</span>';
                        for (var subtype in subtypes) {
                            content += '<span style="display:inline-block;width:80px;text-align:center">';
                            if (subtype === 'timer') {
                                content += '<input type="text" style="width: 28px;height:9px;" id="ttx-notifications-' + type + '-timer" value="' + ((settings.notifications[type][subtype]) / 1000.0) + '">';
                            } else {
                                if (!((types[type].indexOf('Chat') > -1 && subtype === 'chat') || (types[type].indexOf('fan') > -1 && subtype === 'fans'))) {
                                    content += '<input type="checkbox" id="ttx-notifications-' + type + '-' + subtype + '" ' + (settings.notifications[type][subtype] ? ' checked="checked"' : '') + '>';
                                }
                            }
                            content += '</span>';
                        }
                        content += '</div>';
                    }
                    fields.html(content);
                    break;
                case 'about':
                    $element.find('.title').html('TurntableX v' + version_string + '<img width="30" src="http://turntablex.com/images/turntableX.png" style="position:absolute;top:3px">');
                    var fields = $element.find('.field.settings');
                    var changes = '<h2 style="color:#E8C632;text-align:center;width:100%;margin-top:15px;margin-bottom:15px;">Change Log</h2>';
                    for (var v in changelog) {
                        var version_features = changelog[v];
                        changes += '<p style="margin-top:10px;font-weight:bold;font-size:15px;margin-bottom:10px">v' + v + '</p><ul style="margin-left:15px">';
                        for (var i = 0; i < version_features.length; i++) {
                            if (version_features[i]['premium']) {
                                changes += '<li style="margin-bottom:5px;color:#E8C632"><b>(PREMIUM) ' + version_features[i]['header'] + '</b>: ' + version_features[i]['content'] + '</li>';
                            } else {
                                changes += '<li style="margin-bottom:5px"><b>' + version_features[i]['header'] + '</b>: ' + version_features[i]['content'] + '</li>';
                            }
                        }
                        changes += '</ul>';
                    }
                    fields.html(changelog_message + changes);
                    $element.find('.buttons').hide();
                    break;
                case 'settings':
                    $element.find('.title').text('Settings');
                    var fields = $element.find('.field.settings');
                    $element.find('.buttons').append('<button class="submit" id="ttx-settings-import">Import</button><div id="ttx-settings-export-container" style="height:31px;width:80px;position:relative;display:inline-block"><button class="submit" style="width:100%;height:100%;position:relative" id="ttx-settings-export">Export</button></div>');
                    $element.find('button.submit:eq(0)').unbind('click').bind('click', function () {
                        if ($('#ttx-settings-debug').is(':checked')) {
                            settings.debug = true;
                        } else {
                            settings.debug = false;
                        }
                        if ($('#ttx-settings-chatcommands').is(':checked')) {
                            settings.chatCommands = true;
                        } else {
                            settings.chatCommands = false;
                        }
                        settings.chatDelimiter = $('#ttx-settings-chatdelimiter').val();
                        if (typeof settings.chatDelimiter === undefined) {
                            settings.chatDelimiter = defaultSettings.chatDelimiter;
                        }
                        settings.laptop.type = $('#ttx-laptop-select option:selected').val();
                        if (settings.laptop.type !== 'default') {
                            setLaptop(settings.laptop.type);
                        }
                        saveSettings();
                        $('#overlay').html('').hide();
                    });
                    var content = '<div>\
                                    <span style="display:inline-block; width: 120px; font-size:14px;">\
                                        Debug Mode:\
                                    </span>\
                                    <input type="checkbox" id="ttx-settings-debug" ' + (settings.debug === true ? 'checked="checked"' : '') + '/>\
                                </div>\
                                <div>\
                                    <span style="display:inline-block; width: 120px; font-size:14px;">\
                                        Chat Commands:\
                                    </span>\
                                    <input type="checkbox" id="ttx-settings-chatcommands" ' + (settings.chatCommands === true ? 'checked="checked"' : '') + '/>\
                                    &nbsp;<span>command delimiter: </span><input type="text" style="width:30px;line-height:10px;height:10px;" id="ttx-settings-chatdelimiter" value="' + (settings.chatDelimiter) + '"/>\
                                </div>\
                                <div>\
                                    <span style="display:inline-block; width: 120px; font-size:14px;">\
                                        Laptop:\
                                    </span>\
                                    <select id="ttx-laptop-select">\
                                        <option value="default" ' + (settings.laptop.type === 'default' ? 'selected="selected"' : '') + '>default</option>\
                                        <option value="mac" ' + (settings.laptop.type === 'mac' ? 'selected="selected"' : '') + '>mac</option>\
                                        <option value="pc" ' + (settings.laptop.type === 'pc' ? 'selected="selected"' : '') + '>PC</option>\
                                        <option value="linux" ' + (settings.laptop.type === 'linux' ? 'selected="selected"' : '') + '>linux</option>\
                                        <option value="chrome" ' + (settings.laptop.type === 'chrome' ? 'selected="selected"' : '') + '>chrome</option>\
                                        <option value="android" ' + (settings.laptop.type === 'android' ? 'selected="selected"' : '') + '>android</option>\
                                        <option value="iphone" ' + (settings.laptop.type === 'iphone' ? 'selected="selected"' : '') + '>iphone</option>\
                                    </select>\
                                </div>';
                    fields.html(content);
                    break;
                case 'premium':
                    $element.find('.title').text('TurntableX Premium');
                    var fields = $element.find('.field.settings');
                    var content = '';
                    var premium = Server.rank();
                    if (premium > 2) {
                        content += '<h2 style="text-align:right;color:#E8C632;padding-bottom:20px;">Status: ADMIN</h2>';
                    } else if (premium > 1) {
                        content += '<h2 style="text-align:right;color:#E8C632;padding-bottom:20px;">Status: STAFF</h2>';
                    } else if (premium > 0) {
                        content += '<h2 style="text-align:right;color:#E8C632;padding-bottom:20px;">Status: Enabled!</h2>';
                    } else {
                        content += '<h2 style="padding-bottom:20px;color:#222;text-align:right;">Status: Not Enabled</h2>';
                    }
                    content += '<h2 style="text-align:center;margin-bottom:10px;">What is Premium?</h1>';
                    content += '<p>Premium is a feature pack that includes several exclusive features such as Custom Profiles and Laptop Animation. To check out the full list of features, you can view the change log by going to X Menu -> About.</p>';
                    content += '<h2 style="text-align:center;margin-bottom:10px;margin-top:15px">How do I get Premium features?</h1>';
                    content += '<p>You can get Premium by donating 10$ or more to TurntableX here via PayPal:</p><br><div style="text-align:center">' + paypal_premium + '</div><br/><p>. If you have already donated but you did not know about Premium and would like to get it, contact me at admin@turntablex.com. </p>';
                    content += '<h2 style="text-align:center;margin-bottom:10px;margin-top:15px">How does it work?</h1>';
                    content += '<p>As soon as your donation is verified by PayPal, you will receive a confirmation message in Turntable. It happens instantly; you won\'t even need to refresh! You will be able to use Premium features from any computer, as long as you log in with the same Turntable account. If you have any trouble, you can always e-mail me and I will make sure you can get Premium working ASAP.</p>';
                    content += '<h2 style="text-align:center;margin-bottom:10px;margin-top:15px">Why should I get it?</h1>';
                    content += '<p>If you get Premium, you will be able to enjoy some sweet features like laptop animation - share and create visual animations with your friends. You will also be supporting the extension and the development of future features.</p>';
                    $element.find('.buttons').hide();
                    fields.html(content);
                    break;
                default:
                    break;
                }
                node.modal.show();
                if (type === 'notifications') {
                    for (var type in types) {
                        $('#ttx-notifications-' + type + '-desktop').click(requestNotificationPermission);
                    }
                }
                if ($('#ttx-settings-export').length) {
                    var clipboard = new ZeroClipboard.Client();
                    var text = 'XMSG!' + btoa(JSON.stringify(settings));
                    clipboard.setText(text);
                    clipboard.glue('ttx-settings-export', $('#ttx-settings-export-container')[0]);
                    clipboard.addEventListener('mousedown', function () {
                        setTimeout(function () {
                            alert('Settings copied to clipboard!');
                        }, 500);
                    });
                }
                $('#ttx-settings-import').click(function () {
                    if ($('#ttx-settings-import-content').length) {
                        var message = $('#ttx-settings-import-content').val();
                        var decoded = JSON.parse(atob(message.slice(5)));
                        if (typeof decoded !== 'undefined') {
                            settings = decoded;
                            saveSettings();
                            window.location.reload();
                        }
                        return false;
                    }
                    $element.find('.field.settings').html('Paste the import and click Import again (your page will refresh automatically):<br/><br/><textarea id="ttx-settings-import-content" cols=50 rows=25></textarea>');
                    $element.find('.buttons').children().not('#ttx-settings-import').hide();
                });
                $('#ttx_id').val(TT.ID);
            }
            var _lastSongAutod = null;

            function autoDJ(time) {
                time = time || settings.autoDJTimer;
                setTimeout(function () {
                    if (settings.autoDJ && TT.Room.roomData.metadata.max_djs > TT.Room.roomData.metadata.djs.length && _lastSongAutod !== _currentSong.id) {
                        _lastSongAutod = _currentSong.id;
                        TT.RoomView.callback('become_dj');
                    }
                }, time);
            }
            var autoVoteTimer = null;

            function autoVote(time, vote) {
                vote = vote || 'up';
                if (typeof time === 'undefined') {
                    if (settings.autoAwesome === false) {
                        if (autoVoteTimer) {
                            clearTimeout(autoVoteTimer);
                            autoVoteTimer = null;
                        }
                        return;
                    }
                    time = randomDelay(5, 10);
                }
                if (autoVoteTimer) {
                    clearTimeout(autoVoteTimer);
                    autoVoteTimer = null;
                }
                autoVoteTimer = setTimeout(function () {
                    if (_currentSong === null || _currentSong.dj === TT.ID || isDownvoter())
                        return;
                    var f = $.sha1(TT.Room.roomId + vote + _currentSong.id);
                    var d = $.sha1(Math.random() + "");
                    var e = $.sha1(Math.random() + "");
                    send({
                        api: 'room.vote',
                        roomid: TT.Room.roomId,
                        section: TT.Room.section,
                        val: vote,
                        vh: f,
                        th: d,
                        ph: e
                    });
                }, time);
            }

            function modifyRoom() {
                TT.Room.appendMessage = function (d) {
                    var f = this.nodes.chatLog,
                        c = $(f);
                    if (!this.emptyMessageRemoved) {
                        c.find(".default-message").remove();
                        this.emptyMessageRemoved = true;
                    }
                    this.checkChatScroll();
                    d.find('.ttx-import').click(importLaptop);
                    if (d.find('.textContainer').length > 0 && d.find('.ttx-chat-timer').length === 0) {
                        var now = new Date();
                        $('<div class="ttx-chat-timer" style="position: absolute; top: 6px; right: 6px; height:12px; font-size: 11px">' + format_time(now) + '</div>').appendTo(d);
                    }
                    c.append(d);
                    this.updateChatScroll();
                    var e = $(f).find(".message");
                    if (e.length > 500) {
                        e = e.slice(0, 2);
                        var b = e.first().outerHeight(true) + e.last().outerHeight(true);
                        e.remove();
                        if (!this.chatScrollBottom) {
                            f.scrollTop -= b;
                        }
                    }
                };
                TT.Room.appendChatMessage = function (f, e, i, c) {
                    var d, b = false;
                    if (this.lastChatSpeakerid === f) {
                        d = this.$lastChatMessage;
                    } else {
                        d = $(util.buildTree(Room.layouts.chatMessage));
                        var h;
                        if (e == "TURNTABLE") {
                            h = "url(http://static.turntable.fm/roommanager_assets/props/loudspeaker.png)";
                        } else {
                            h = "url(" + this.userMap[f].images.headfront + ")";
                        }
                        d.find(".avatar").css("background-image", h);
                        d.find(".speaker").text(e).data("userid", f);
                        b = true;
                        this.lastChatSpeakerid = f;
                        this.$lastChatMessage = d;
                    }
                    var g = $(util.buildTree(["div.text"]));
                    i = util.stripComboDiacritics(i);
                    g.html(util.messageFilter(i));
                    if (c) {
                        d.addClass(c);
                    }
                    if (b) {
                        d.find(".textContainer").append(g);
                        this.appendMessage(d);
                    } else {
                        this.checkChatScroll();
                        d.find(".textContainer").append(g);
                        this.updateChatScroll();
                    }
                }
                _mentionRegex = buildMentionRegex();
                TT.Room.isMention = function (content) {
                    var name = turntable.user.displayName.toLowerCase();
                    if (name[0] == "@")
                        name = name.slice(1);
                    var status;
                    if (content)
                        status = content.toLowerCase().indexOf('@' + name) >= 0;
                    if (!status && _mentionRegex !== null)
                        status = _mentionRegex.test(content);
                    return status;
                };
                TT.pmwindow.prototype.addPMText = function (e, t, n, r) {
                    var a, l, u = "/me " === e.substr(0, 4),
                        d = !1;
                    if (u) this.lastSpeakerName = null, d = !0, a = $(util.buildTree(TT.pmwindow.layouts.pmStatus({}))), a.find(".text").html(util.messageFilter(e.substr(3))), a.find(".text .ttx-import").click(importLaptop), a.find(".subject").text(t ? turntable.user.displayName : this.otherUserName);
                    else {
                        var c = "",
                            h = this.lastSpeakerName;
                        t ? (this.lastSpeakerName = c = "Me", l = turntable.user.images.headfront) : (this.lastSpeakerName = c = this.otherUserName, l = this.otherUser.images.headfront), null !== h && h === this.lastSpeakerName ? a = this.$lastPMMessage : (a = $(util.buildTree(TT.pmwindow.layouts.pm(c, n))), d = !0, this.$lastPMMessage = a, a.find(".avatar").css("background-image", "url(" + l + ")"));
                        var p = $(util.buildTree(["div.text"])).html(util.messageFilter(e));
                        p.find('.ttx-import').click(importLaptop);
                        a.find(".textContainer").append(p);
                        if (!r && a.find('.ttx-chat-timer').length === 0) {
                            var now = new Date();
                            $('<div class="ttx-chat-timer" style="position: absolute; top: 6px; right: 6px; height:12px; font-size: 11px">' + format_time(now) + '</div>').appendTo(a);
                        }
                    }
                    var f = r ? $(this.nodes.history) : $(this.nodes.content);
                    d && f.append(a), this.redraw(), t || $(this.nodes.container).find("textarea:focus").length || r || ($(this.nodes.header).addClass("newMessage"), this.isOverflow && ($("div#pmOverflowIcon").addClass("newMessage"), $(this.nodes.overflowListItem).addClass("newMessage")), this.playDing(), $(this.nodes.container).one("click", $.proxy(function () {
                        $(this.nodes.header).removeClass("newMessage")
                    }, this)))
                };
                util.messageFilter = function (message) {
                    if (message[0] === 'X' && message.match(/^XMSG!./) !== null) {
                        try {
                            var encoded = message.substring(5);
                            var decoded = atob(encoded);
                            var laptopSettings = JSON.parse(decoded);
                            if (laptopSettings) {
                                for (var p in laptopSettings) {
                                    if (laptopSettings.hasOwnProperty(p)) {
                                        return '<button data-laptop=\'' + JSON.stringify(laptopSettings[p]) + '\' data-name="' + p + '" class="ttx-import">Import: ' + p + '</button>';
                                    }
                                }
                            }
                        } catch (Exception) {
                            return 'TTX: Error decoding message';
                        }
                    }
                    return util.emojify(util.linkify(util.safeText(util.memeify(message))));
                }
                if (!TT.profile.prototype.__onStickerLoad) {
                    TT.profile.prototype.__onStickerLoad = TT.profile.prototype.onStickerLoad;
                    TT.profile.prototype.onStickerLoad = function (e, t, i) {
                        var n = {};
                        n[this.model.userId] = i.placements, $(document).trigger("add_sticker_placements", n);
                        var o = this.nodes.laptop.getContext("2d"),
                            r = this.model.get("laptop");
                        ("iphone" == r || "android" == r) && (r = "mac");
                        try {
                            TT.sticker.drawLaptopCanvas(this.model.userId, o, .5, r);
                        } catch (a) {
                            console.log("DRAW LAPTOP CANVAS ERR:" + a);
                        }
                        addProfileLaptopImport(this.model.attributes, this.nodes.modal.$el.find('.name'), i.placements);
                        Custom.skinProfile(this.model.attributes, this.nodes.modal.$el);
                        this.nodes.modal.$el.find(".web-links .social").prepend('<a target="_blank" style="background:none;margin-right:2px;display:inline-block;" href="http://ttstats.info/user/' + this.model.userId + '"><img style="width:31px;height:31px;cursor:pointer;" src="' + IMAGE_URLS.ttstats + '"></a>');
                    }
                }
            }

            function addAdvancedSettings() {
                var advancedSettings = $('#ttx-settings-menu');
                if (advancedSettings.length === 0) {
                    var advancedSettingsTemplate = '<div class="settings-dropdown" id="ttx-settings-menu">\
                <div id="ttx-settings-button">\
                    <div class="x-head" style="background-image: url(http://turntablex.com/images/turntableX.png);"></div>\
                </div>\
                <ul class="dropdown" id="ttx-settings-dropdown">\
                    <li class="option" id="ttx-advanced">Settings</li>\
                    <li class="option" id="ttx-notifications">Notifications</li>\
                    <li class="option" id="ttx-premium">Premium</li>\
                    <li class="option" id="ttx-about">About</li>\
                </ul>\
            </div>';
                    $('#header').append(advancedSettingsTemplate);
                    $('#ttx-advanced').click(function () {
                        customModal('settings');
                    });
                    $('#ttx-about').click(function () {
                        showFeatures();
                    });
                    $('#ttx-notifications').click(function () {
                        customModal('notifications');
                    });
                    $('#ttx-premium').click(function () {
                        customModal('premium');
                    });
                    $('#ttx-settings-menu').mouseover(function () {
                        if (dockhover) {
                            clearTimeout(dockhover);
                            dockhover = null;
                        }
                        $('#ttx-dock-').removeClass('hover');
                        $('#ttx-autodj-container').removeClass('hover');
                        $(this).addClass('hover');
                    }).mouseout(function () {
                        var self = $(this);
                        dockhover = setTimeout(function () {
                            self.removeClass('hover');
                        }, 600);
                    });
                }
                $('#layout-option').remove();
            }

            function toggleAutoDJ(e) {
                settings.autoDJ = !settings.autoDJ;
                if (settings.autoDJ) {
                    autoDJ(0);
                    $('#ttx-autodj-label').html(msFormat(settings.autoDJTimer));
                    $('#ttx-autodj-container').addClass('hover');
                } else {
                    $('#ttx-autodj-label').html('OFF');
                    $('#ttx-autodj-container').removeClass('hover');
                    if (dockhover) {
                        clearTimeout(dockhover);
                        dockhover = null;
                    }
                }
                saveSettings();
                $(this).toggleClass('active');
                e.preventDefault();
            }

            function toggleAutobop(e) {
                settings.autoAwesome = !settings.autoAwesome;
                if (settings.autoAwesome) {
                    autoVote(0);
                }
                saveSettings();
                $(this).toggleClass('active');
                e.preventDefault();
            }

            function requestNotificationPermission() {
                if (!window.webkitNotifications || (window.webkitNotifications.checkPermission() == 0))
                    return;
                window.webkitNotifications.requestPermission();
            }

            function addDesktopNotification(icon, title, message, delay) {
                if (!window.webkitNotifications || (window.webkitNotifications.checkPermission() !== 0))
                    return;
                var note = window.webkitNotifications.createNotification(icon, title, message);
                note.ondisplay = function () {
                    setTimeout(function () {
                        note.cancel();
                    }, delay);
                };
                note.show();
            }

            function addAutoButtons() {
                if ($('#ttx-auto-buttons').length === 0) {
                    $('#header .info').append('<ul class="header-well-buttons" id="ttx-auto-buttons">\
                                            <li class="dropdown-container ttx-tooltip" original-title="Toggle Auto-Awesome" id="ttx-autobop-container">\
                                                <div class="header-well-button" id="ttx-autobop-button"/>\
                                            </li>\
                                        </ul>');
                    var autoDJcontent = '<li class="dropdown-container ttx-tooltip" original-title="Toggle Auto-DJ" id="ttx-autodj-container">\
                                                <div id="ttx-autodj-label"></div>\
                                                <div class="header-well-button" id="ttx-autodj-button"/>\
                                                <ul class="floating-menu down" id="ttx-autodj-menu">\
                                                    <div id="ttx-autodj-slider">\
                                                        <div id="ttx-autodj-knob" style="top:18px;"></div>\
                                                        <div id="ttx-autodj-fill" style="height:87px;">\
                                                        </div>\
                                                    </div>\
                                                </ul>\
                                            </li>';
                    var autoDJoffset = settings.autoDJTimer / 50;
                    $('#ttx-autobop-container').after(autoDJcontent).tipsy({
                        gravity: 'n',
                        opacity: 1,
                        fade: true
                    });
                    $('#ttx-autodj-container').tipsy({
                        gravity: 'w',
                        fade: true,
                        opacity: 1
                    });
                    $('#ttx-autodj-label').unbind('click');
                    if (settings.autoDJ) {
                        $('#ttx-autodj-button').addClass('active');
                        $('#ttx-autodj-label').html(msFormat(settings.autoDJTimer));
                    } else
                        $('#ttx-autodj-label').html('OFF'); if (settings.autoAwesome)
                        $('#ttx-autobop-button').addClass('active');
                    $('#ttx-autodj-knob').css('top', autoDJoffset + 'px');
                    $('#ttx-autodj-fill').css('height', (105 - autoDJoffset) + 'px');
                    $('#ttx-autodj-container').mouseover(function () {
                        if (!$('#ttx-autodj-button').hasClass('active'))
                            return;
                        if (dockhover) {
                            clearTimeout(dockhover);
                            dockhover = null;
                        }
                        $(this).addClass('hover');
                        $('#ttx-dock-').removeClass('hover');
                        $('#ttx-settings-menu').removeClass('hover');
                    }).mouseout(function () {
                        var self = $(this);
                        dockhover = setTimeout(function () {
                            self.removeClass('hover');
                        }, 600);
                    });
                    $('#ttx-autobop-button').click(toggleAutobop);
                    $('#ttx-autodj-button').click(toggleAutoDJ);
                    $('#ttx-autodj-knob').draggable({
                        containment: $('#ttx-autodj-slider'),
                        axis: 'y',
                        drag: function (ev, ui) {
                            var offset = ui.position.top;
                            var displaySpeed;
                            if (offset < 0) {
                                offset = 0;
                            }
                            settings.autoDJTimer = 50 * Math.round(offset);
                            saveSettings();
                            displaySpeed = msFormat(settings.autoDJTimer);
                            $('#ttx-autodj-label').text(displaySpeed);
                            $('#ttx-autodj-fill').css('height', (105 - ui.position.top) + 'px');
                        }
                    });
                }
            }

            function addLightSwitch() {
                $('#header .info').css('right', '230px');
                $('#switch-room').css('right', '110px');
                $('#header .userauth-container').css('right', '50px').after('<div style="position:absolute;top:15px;right:10px;"><div class="header-well-button" id="ttx-light-switch"/></div>');
                if (settings.skin === 'default')
                    $('#ttx-light-switch').addClass('active');
                $('#ttx-light-switch').click(function () {
                    $(this).toggleClass('active');
                    if ($(this).hasClass('active')) {
                        settings.skin = 'default';
                        skin(true);
                    } else {
                        settings.skin = 'midnight';
                        skin();
                    }
                    saveSettings();
                });
            }
            var updateTimer = null;

            function initializeUI() {
                if (updateTimer)
                    clearTimeout(updateTimer);
                updateTimer = setInterval(function () {
                    updateGuestsIdle();
                }, 500);
                addChatCommands();
                addWidescreen();
                addPanels();
                addAdvancedSettings();
                addLaptopSettings();
                addLightSwitch();
                addAutoButtons();
                onResize();
                setTimeout(function () {
                    onResize();
                }, 100);
            }

            function updateGuestsIdle() {
                var $idles = $('#guest-list .guestIdle');
                if (!$idles.length) {
                    updateGuests();
                    return;
                }
                $idles.each(function () {
                    var id = $(this).data('user');
                    if (!id) {
                        return;
                    }
                    var idleText = formatTimeDelta(_idleTimers[id]);
                    if (idleText) {
                        $(this).html(idleText);
                    }
                });
            }
            var guestsTimer = null;

            function updateGuests() {
                if (guestsTimer !== null) {
                    clearTimeout(guestsTimer);
                    guestsTimer = null;
                }
                guestsTimer = setTimeout(function () {
                    var now = new Date().getTime();
                    var guests = $('.guest-list-container .guest');
                    var hasBuddies = false;
                    var idles = 0;
                    var all_icons = {
                        'heart': 1,
                        'upvote': 1,
                        'downvote': 1
                    };
                    guests.each(function () {
                        var $this = $(this);
                        var $name = $this.find('.guest-name');
                        var username = $name.text();
                        if (typeof _usernames[username] != 'undefined') {
                            var user_id = _usernames[username];
                            var curIcons = {};
                            var extrasClass = ' ';
                            var iconDiv = $this.find('.icons');
                            if (isCurrentDJ(user_id)) {
                                extrasClass = extrasClass + ' isCurrentDJ';
                            }
                            if (isHearter(user_id)) {
                                extrasClass = extrasClass + ' isHearter';
                                curIcons['heart'] = 1;
                            }
                            if (isUpvoter(user_id)) {
                                extrasClass = extrasClass + ' isUpvoter';
                                curIcons['upvote'] = 1;
                            }
                            if (isDownvoter(user_id)) {
                                extrasClass = extrasClass + ' isDownvoter';
                                curIcons['downvote'] = 1;
                            }
                            for (var icon in all_icons) {
                                if (typeof curIcons[icon] === 'undefined')
                                    iconDiv.find('.ttx-icon.' + icon).remove();
                                else
                                if (iconDiv.find('.ttx-icon.' + icon).length === 0)
                                    iconDiv.append(ICONS[icon]);
                            }
                            $this.removeClass('isUpvoter isDownvoter isHearter isIdle isCurrentDJ').addClass(extrasClass);
                            if (now - _idleTimers[user_id] > IDLE_MAX) {
                                extrasClass = extrasClass + ' isIdle';
                                idles += 1;
                            }
                            var idle = $this.find('.guestIdle');
                            var idleText = formatTimeDelta(_idleTimers[user_id]);
                            if (idle.length)
                                idle.html(idleText);
                            else
                                $name.after('<div class="guestIdle" data-user="' + user_id + '" style="position: absolute; bottom: 0px; right: 25px; width: 50px; height: 28px; line-height: 28px; overflow: hidden; text-align: right">' + idleText + '</div>');
                        }
                    });
                    if (idles >= 0) {
                        if ($('#ttx-afk-users').length === 0) {
                            var guestList = $('#guest-list');
                            guestList.find('.title').css({
                                'text-align': 'right',
                                'margin-right': '10px'
                            });
                            $('#totalUsers').after($('<span id="ttx-afk-users"> (' + idles + ' AFK)</span>'));
                        } else {
                            $('#ttx-afk-users').text(' (' + idles + ' AFK)');
                        }
                    }
                }, 100);
            }
            var _panels;

            function onResize() {
                var width = 0;
                $('#ttx-panels .ttx-panel').each(function () {
                    if ($(this).hasClass('full') === false) {
                        width += (parseInt($(this).css('width').replace('px', '')) + PANEL_PADDING);
                    }
                });
                var sceneWidth = $('#ttx-panels').width() - width - PANEL_PADDING - 25;
                if (isNaN(width)) {
                    $('#ttx-panels-scene').css({
                        width: '100%'
                    });
                } else {
                    $('#ttx-panels-scene').css({
                        width: sceneWidth + 'px'
                    });
                }
                $('#ttx-laptop-menu-scrollable ul').css('max-height', $(window).height() - 105);
                if ($('#room-view').length)
                    $('#scene').css({
                        width: '1468px',
                        height: '100%',
                        left: 'auto',
                        right: '50%',
                        top: '0px',
                        marginTop: '0px',
                        marginLeft: '0px',
                        marginRight: '-734px'
                    })
                else
                    $('#scene').css({
                        width: '1468px',
                        height: '100%',
                        left: 'auto',
                        right: '50%',
                        top: '50%',
                        marginTop: '-300px',
                        marginLeft: '0px',
                        marginRight: '-734px'
                    })
            }

            function onPanelDock(e) {
                var panelName, panel = $(this).parents('.ttx-panel');
                if (panel.attr('id') === 'right-panel') {
                    panelName = 'chat';
                } else {
                    panelName = panel.attr('id').replace('ttx-panels-', '');
                }
                if (panel.hasClass('float')) {
                    settings.panels[panelName].type = 'docked';
                    settings.panels[panelName].height = '100%';
                    settings.panels[panelName].left = 0;
                    settings.panels[panelName].right = 0;
                    settings.panels[panelName].top = 0;
                    settings.panels[panelName].bottom = 0;
                    var target = null;
                    $('#ttx-panels .ttx-panel').each(function () {
                        if (target === null && $(this).offset().left < panel.offset().left && panel.offset().left < $(this).offset().left + $(this).width()) {
                            target = $(this);
                        }
                    });
                    if (target === null) {
                        panel.appendTo($('#ttx-panels'));
                    } else {
                        if (panel.offset().left - target.offset().left < target.offset().left + target.width() - (panel.offset().left + panel.width())) {
                            target.before(panel.detach());
                        } else {
                            target.after(panel.detach());
                        }
                    }
                    panel.removeClass('float').draggable('destroy').resizable('destroy').resizable(dockedPanelResizable).resizable('option', 'minWidth', PANEL_WIDTH).resizable('option', 'minHeight', PANEL_WIDTH).css({
                        'height': '100%',
                        'position': 'relative',
                        'top': '0px',
                        'bottom': '0px',
                        'left': '0px',
                        'right': '0px'
                    });
                    delete _panels['float'][panelName];
                } else {
                    settings.panels[panelName].type = 'float';
                    settings.panels[panelName].height = '500px';
                    settings.panels[panelName].right = 0;
                    settings.panels[panelName].left = panel.offset().left;
                    settings.panels[panelName].top = 200;
                    settings.panels[panelName].bottom = 0;
                    panel.addClass('float').resizable('destroy').resizable(floatingPanelResizable).resizable('option', 'minWidth', PANEL_WIDTH).resizable('option', 'minHeight', PANEL_WIDTH).draggable(floatingPanelDraggable).css({
                        'height': '500px',
                        'position': 'absolute',
                        'top': '200px',
                        'bottom': 'auto',
                        'left': settings.panels[panelName].left + 'px',
                        'right': 'auto'
                    }).appendTo($('.roomView'));
                }
                _panels.dock = [];
                $('#ttx-panels .ttx-panel').each(function () {
                    var name;
                    if ($(this).attr('id') === 'right-panel') {
                        name = 'chat';
                    } else {
                        name = $(this).attr('id').replace('ttx-panels-', '');
                    }
                    _panels.dock.push(name);
                });
                $(window).resize();
                saveSettings();
            }

            function onPanelMinimize(e) {
                e.preventDefault();
                e.stopPropagation();
                var panelName, panel = $(this).parents('.ttx-panel');
                if (panel.attr('id') === 'right-panel') {
                    panelName = 'chat';
                } else {
                    panelName = panel.attr('id').replace('ttx-panels-', '');
                }
                $('#ttx-dock-menu').append($('<li class="option">' + panelName + '</li>').click(onPanelMaximize));
                var fixDock = false;
                if (panelName in _panels['float']) {
                    delete _panels['float'][panelName];
                } else {
                    fixDock = true;
                }
                if (panelName === 'chat') {
                    $('#right-panel').addClass('hidden').detach().appendTo($('.roomView'));
                } else {
                    $('#ttx-panels-' + panelName).addClass('hidden').detach().appendTo($('.roomView'));
                }
                $(window).resize();
                settings.panels[panelName].hidden = true;
                _panels.hidden[panelName] = 1;
                var hiddens = numHiddenPanels();
                if (fixDock) {
                    _panels.dock = [];
                    $('#ttx-panels .ttx-panel').each(function () {
                        var name;
                        if ($(this).attr('id') === 'right-panel') {
                            name = 'chat';
                        } else {
                            name = $(this).attr('id').replace('ttx-panels-', '');
                        }
                        _panels.dock.push(name);
                    });
                }
                $('#ttx-dock').removeClass('empty');
                $('#ttx-dock-menu').css('visibility', 'visible');
                $('.ttx-dock-count').text(hiddens);
                saveSettings();
            }
            var floatingPanelDraggable = {
                'containment': '#ttx-panels',
                'handle': '.floating-panel-tab',
                'stop': onFloatingPanelDrag
            };
            var floatingPanelResizable = {
                'handles': 'n, e, w, s, ne, sw, se, nw',
                'stop': onFloatingPanelResize
            };
            var dockedPanelResizable = {
                'stop': onDockedPanelResize,
                'handles': 'e'
            };

            function onFloatingPanelDrag(event, ui) {
                var name, id = $(this).attr('id');
                if (id === 'right-panel') {
                    name = 'chat';
                    scrollChat();
                } else {
                    name = id.replace('ttx-panels-', '');
                }
                if (ui.position.top >= 65) {
                    settings.panels[name].top = ui.position.top;
                } else {
                    settings.panels[name].top = 65;
                    $(this).css('top', '65px');
                }
                settings.panels[name].left = ui.position.left;
                saveSettings();
            }

            function onFloatingPanelResize(event, ui) {
                var name, id = $(this).attr('id');
                if (id === 'right-panel') {
                    name = 'chat';
                    scrollChat();
                } else {
                    name = id.replace('ttx-panels-', '');
                }
                settings.panels[name].width = ui.size.width;
                settings.panels[name].height = ui.size.height + 'px';
                settings.panels[name].top = $(this).offset().top;
                if (settings.panels[name].top < 65) {
                    settings.panels[name].top = 65;
                    $(this).css('top', '65px');
                }
                settings.panels[name].left = $(this).offset().left;
                saveSettings();
            }

            function onDockedPanelResize(event, ui) {
                var name, id = $(this).attr('id');
                if (id === 'right-panel') {
                    name = 'chat';
                } else {
                    name = id.replace('ttx-panels-', '');
                }
                $(this).css({
                    'height': '100%',
                    'bottom': '0px',
                    'top': '0px'
                });
                settings.panels[name].width = ui.size.width;
                saveSettings();
            }

            function onPanelStop(event, ui) {
                if (ui.item.parent().attr('id') !== 'ttx-panels') {
                    if (ui.offset.top <= 0.25 * $('#ttx-panels').height()) {
                        ui.item.css({
                            'height': '100%',
                            'position': 'relative',
                            'top': '0px',
                            'left': '0px'
                        }).prependTo($('#ttx-panels'));
                        _panels.dock = [];
                        $('#ttx-panels .ttx-panel').each(function () {
                            var name;
                            if ($(this).attr('id') === 'right-panel') {
                                name = 'chat';
                            } else {
                                name = $(this).attr('id').replace('ttx-panels-', '');
                            }
                            _panels.dock.push(name);
                            settings.panels[name].index = $(this).index();
                        });
                        saveSettings();
                        return;
                    }
                    ui.item.addClass('float').css({
                        top: ui.placeholder.css('top'),
                        left: ui.placeholder.css('left'),
                        position: 'absolute',
                        width: ui.placeholder.width() + 'px',
                        height: '300px'
                    }).draggable(floatingPanelDraggable).resizable('destroy').resizable(floatingPanelResizable).resizable('option', 'minWidth', PANEL_WIDTH).resizable('option', 'minHeight', PANEL_WIDTH);
                    var id = ui.item.attr('id');
                    var name;
                    if (id === 'right-panel') {
                        name = 'chat';
                    } else {
                        name = id.replace('ttx-panels-', '');
                    }
                    _panels['float'][name] = 1;
                    _panels['dock'] = [];
                    var docked = $('#ttx-panels > *');
                    for (var i = 0; i < docked.length; i++) {
                        var panel_name;
                        if (docked[i].id === 'right-panel') {
                            panel_name = 'chat';
                        } else {
                            panel_name = docked[i].id.replace('ttx-panels-', '');
                        }
                        _panels['dock'].push(panel_name);
                    }
                    settings.panels[name].left = parseInt(ui.item.css('left'));
                    settings.panels[name].top = parseInt(ui.item.css('top'));
                    settings.panels[name].type = 'float';
                    settings.panels[name].height = '300px';
                    settings.panels[name].width = ui.item.width();
                    saveSettings();
                }
                $(window).resize();
            }

            function onPanelMove(event, ui) {
                if (ui.offset.top > 0.25 * $('#ttx-panels').height()) {
                    ui.helper.data('originalHeight', ui.helper.height());
                    ui.helper.css('height', '300px');
                    var placeholder = $(this).find('.placeholder');
                    if (placeholder.length) {
                        placeholder.detach().appendTo('.roomView');
                        placeholder.css({
                            position: 'absolute',
                            left: ui.offset.left,
                            top: ui.offset.top
                        });
                    } else {
                        placeholder = $('.roomView .placeholder');
                        placeholder.css({
                            left: ui.offset.left,
                            top: ui.offset.top
                        });
                    }
                    ui.helper.detach().appendTo('.roomView');
                    $(this).sortable('refresh');
                } else {
                    ui.helper.css('height', '100%').detach().appendTo('#ttx-panels');
                    ui.placeholder.css({
                        left: '0px',
                        top: '0px',
                        position: 'relative'
                    });
                }
                $(window).resize();
            }

            function onPanelReorder(event, ui) {
                var new_dock = [];
                if (ui.item.attr('id') === 'right-panel') {
                    scrollChat();
                }
                $(this).children().each(function () {
                    var name;
                    if ($(this).attr('id') === 'right-panel') {
                        name = 'chat';
                    } else {
                        name = $(this).attr('id').replace('ttx-panels-', '');
                    }
                    settings.panels[name].index = $(this).index();
                    new_dock.push(name);
                });
                _panels.dock = new_dock;
                saveSettings();
            }

            function numHiddenPanels() {
                var hiddens = 0;
                for (var i in _panels.hidden) {
                    if (_panels.hidden.hasOwnProperty(i) && _panels.hidden[i] === 1) {
                        hiddens += 1;
                    }
                }
                return hiddens;
            }

            function onPanelMaximize() {
                var name = $(this).text();
                var type = settings.panels[name].type;
                var container;
                var panel;
                if (name === 'chat') {
                    panel = $('#right-panel');
                } else {
                    panel = $('#ttx-panels-' + name);
                }
                settings.panels[name].hidden = false;
                if (type === 'docked') {
                    container = $('#ttx-panels');
                    var index = settings.panels[name].index;
                    if (index >= _panels.dock.length) {
                        $('#ttx-panels').children().last().after(panel.detach());
                        settings.panels[name].index = _panels.dock.length;
                    } else {
                        container.find('.ttx-panel').each(function () {
                            var panel_name;
                            if ($(this).attr('id') === 'right-panel') {
                                panel_name = 'chat';
                            } else {
                                panel_name = $(this).attr('id').replace('ttx-panels-', '');
                            }
                            var my_index = $(this).index();
                            if (my_index === index) {
                                $(this).before(panel.detach());
                                settings.panels[name].index = my_index;
                                my_index += 1;
                            }
                            settings.panels[panel_name].index = my_index;
                        });
                    }
                    panel.removeClass('hidden').mousedown().mouseup();
                    _panels.dock = [];
                    $('#ttx-panels > *').each(function () {
                        var panel_name;
                        if ($(this).attr('id') === 'right-panel') {
                            panel_name = 'chat';
                        } else {
                            panel_name = $(this).attr('id').replace('ttx-panels-', '');
                        }
                        _panels.dock.push(panel_name);
                    });
                    $(window).resize();
                } else {
                    container = $('.roomView');
                    _panels['float'][name] = 1;
                    panel.removeClass('hidden').appendTo(container).mousedown().mouseup();
                }
                if (name === 'chat') {
                    scrollChat();
                }
                delete _panels.hidden[name];
                var hiddens = numHiddenPanels();
                if (numHiddenPanels() === 0) {
                    $('#ttx-dock').addClass('empty');
                    $('#ttx-dock-menu').css('visibility', 'hidden');
                } else {
                    $('#ttx-dock').removeClass('empty');
                    $('#ttx-dock-menu').css('visibility', 'visible');
                }
                $('.ttx-dock-count').text(hiddens);
                saveSettings();
                $('#ttx-dock-').removeClass('hover');
                $(this).remove();
            }
            var dockhover;
            var PANEL_PADDING = 5;
            var PANEL_WIDTH = 265;

            function addPanels() {
                TT.Room.setPanelLayout('single');
                $('[id="ding-menu"]').css('z-index', 999);
                _panels = {
                    'dock': [],
                    'float': {},
                    'hidden': {},
                    'nodes': {}
                };
                for (var i in settings.panels) {
                    if (!settings.panels.hasOwnProperty(i)) {
                        continue;
                    }
                    if (settings.panels[i].hidden === true) {
                        _panels.hidden[i] = 1;
                    } else if (settings.panels[i].type === 'docked') {
                        _panels.dock.push({
                            index: settings.panels[i].index,
                            name: i
                        });
                    } else {
                        _panels['float'][i] = 1;
                    }
                }
                _panels.dock.sort(function (a, b) {
                    return a.index >= b.index;
                });
                for (var i = 0; i < _panels.dock.length; i++) {
                    _panels.dock[i] = _panels.dock[i].name;
                }
                var hiddens = numHiddenPanels();
                $('#header .info').css('left', '200px');
                $('#header .logo').after('<div id="ttx-dock-">\
        <div class="settings-dropdown" id="ttx-dock-container">\
        <div id="ttx-dock">\
            <span class="ttx-dock-count">' + hiddens + '</span>\
        </div>\
        <ul class="dropdown down" id="ttx-dock-menu">\
        </ul>\
        </div>\
        </div>');
                $('#ttx-dock').mouseover(function () {
                    var $dockCount = $(this).find('.ttx-dock-count').addClass('hover');
                    if ($(this).hasClass('empty')) {
                        $dockCount.text('\u25B2');
                    } else {
                        $dockCount.text('\u25BC');
                    }
                }).mouseout(function () {
                    var $dockCount = $(this).find('.ttx-dock-count').removeClass('hover');
                    $dockCount.text(numHiddenPanels());
                }).css('cursor', 'pointer').click(function () {
                    if ($(this).hasClass('empty')) {
                        $('.ttx-controls-minimize').click();
                    } else {
                        $('#ttx-dock-menu').children().click();
                    }
                    $(this).trigger('mouseover');
                });
                $('#ttx-dock-').mouseover(function () {
                    if (dockhover) {
                        clearTimeout(dockhover);
                        dockhover = null;
                    }
                    $('#ttx-settings-menu').removeClass('hover');
                    $('#ttx-autodj-container').removeClass('hover');
                    $(this).addClass('hover');
                }).mouseout(function () {
                    var self = $(this);
                    dockhover = setTimeout(function () {
                        self.removeClass('hover');
                    }, 600);
                });
                if (hiddens > 0) {
                    for (var i in _panels.hidden) {
                        if (_panels.hidden.hasOwnProperty(i)) {
                            $('<li class="option">' + i + '</li>').click(onPanelMaximize).appendTo('#ttx-dock-menu');
                        }
                    }
                    $('#ttx-dock').removeClass('empty');
                    $('#ttx-dock-menu').css('visibility', 'visible');
                } else {
                    $('#ttx-dock').addClass('empty');
                    $('#ttx-dock-menu').css('visibility', 'hidden');
                }
                $('.ttx-dock-count').text(hiddens);
                var rightPanel = $('#right-panel').css({
                    'right': 'auto',
                    'top': settings.panels.chat.top + 'px',
                    'bottom': '0px',
                    'height': settings.panels.chat.height,
                    'marginLeft': '5px',
                    'width': (settings.panels.chat.width === 'auto' ? PANEL_WIDTH : settings.panels.chat.width) + 'px',
                    'left': settings.panels.chat.left + 'px',
                    'float': 'left',
                    'position': (settings.panels.chat.type === 'docked' ? 'relative' : 'absolute'),
                    'marginRight': '0px'
                }).addClass('ttx-panel');
                $('#chat-input').css({
                    width: 'auto',
                    right: '5px'
                });
                $('.chat-container').addClass('selected').css({
                    width: '100%'
                }).unbind('click').find('.tab-icon').css('background-position', '0px 0px');
                _panels['nodes']['chat'] = rightPanel;
                $('#left-panel').hide();
                if ($('#ttx-panels-scene').length === 0) {
                    rightPanel.before('<div id="ttx-panels-scene" class="ttx-panel full no-header" style="position:relative;margin-left:5px;overflow:hidden;float:left;height:100%;width:100px;"></div>');
                }
                _panels['nodes']['scene'] = $('#ttx-panels-scene');
                $('#scene').css({
                    width: '1468px',
                    height: '100%',
                    left: 'auto',
                    right: '50%',
                    top: '50%',
                    marginTop: '-300px',
                    marginLeft: '0px',
                    marginRight: '-734px'
                }).appendTo($('#ttx-panels-scene'));
                if ($("#ttx-panels-room").length === 0) {
                    rightPanel.before('<div id="ttx-panels-room" class="floating-panel ttx-panel" style="left:' + settings.panels.room.left + 'px;position:' + (settings.panels.room.type === 'docked' ? 'relative' : 'absolute') + ';margin-left:5px;overflow:hidden;float:left;height:' + settings.panels.room.height + ';top:' + settings.panels.room.top + 'px;width:' + (settings.panels.room.width === 'auto' ? PANEL_WIDTH : settings.panels.room.width) + 'px;"><ul id="ttx-panels-room-tabs"></ul></div>');
                }
                _panels['nodes']['room'] = $('#ttx-panels-room');
                $('#room-info-container').css({
                    width: '100%'
                }).addClass('selected').appendTo("#ttx-panels-room-tabs").find('.tab-icon').css('background-position', '0px -31px');
                if ($("#ttx-panels-queue").length === 0) {
                    $('#right-panel').before('<div id="ttx-panels-queue" class="floating-panel ttx-panel" style="left:' + settings.panels.queue.left + 'px;position:' + (settings.panels.queue.type === 'docked' ? 'relative' : 'absolute') + ';margin-left:5px;overflow:hidden;float:left;height:' + settings.panels.queue.height + ';top:' + settings.panels.queue.top + 'px;width:' + (settings.panels.queue.width === 'auto' ? PANEL_WIDTH : settings.panels.queue.width) + 'px;"><ul id="ttx-panels-queue-tabs"></ul></div>');
                }
                _panels['nodes']['queue'] = $('#ttx-panels-queue');
                $('#playlist-container').css({
                    width: '100%'
                }).addClass('selected').appendTo('#ttx-panels-queue-tabs');
                $('#playlist-container').find('.tab-icon').css('background-position', '0px -15px');
                var tabs = $('.floating-panel-tab').removeClass('left-divider').css({
                    'background': '-webkit-linear-gradient(top,#999 0,#777 100%)',
                    'border-top-left-radius': '5px',
                    'border-top-right-radius': '5px',
                    width: '100%'
                });
                tabs.append($('<div class="ttx-controls"><div class="ttx-controls-dock"></div><div class="ttx-controls-minimize"></div></div>'));
                $('.ttx-controls-minimize').click(onPanelMinimize);
                $('.ttx-controls-dock').click(onPanelDock);
                tabs.css({
                    'box-shadow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.25),inset 0 -1px 0 0 #222',
                    'background': '-moz-linear-gradient(top,#999 0,#777 100%)',
                    'cursor': 'pointer',
                    'border-right': 'solid 1px #444'
                }).find('h2').css('color', '#323232');
                if (settings.panels.chat.hidden) {
                    rightPanel.addClass('hidden');
                }
                if (settings.panels.chat.type === 'float') {
                    rightPanel.addClass('float');
                }
                if (settings.panels.room.hidden) {
                    _panels['nodes']['room'].addClass('hidden');
                }
                if (settings.panels.room.type === 'float') {
                    _panels['nodes']['room'].addClass('float');
                }
                if (settings.panels.queue.hidden) {
                    _panels['nodes']['queue'].addClass('hidden');
                }
                if (settings.panels.queue.type === 'float') {
                    _panels['nodes']['queue'].addClass('float');
                }
                if ($('#ttx-panels').length === 0) {
                    var panels = $('<div id="ttx-panels" style="position:absolute;left:0px;right:0px;top:65px;bottom:35px;overflow:hidden;"/>');
                    rightPanel.before(panels);
                    panels = $('#ttx-panels');
                    var floating_panels = $('.roomView');
                    $('.ttx-panel').each(function () {
                        $(this).mousedown(function () {
                            $(this).parent().parent().find('.ttx-panel').removeClass('ttx-panel-focus');
                            if ($(this).attr('id') !== 'ttx-panels-scene')
                                $(this).addClass('ttx-panel-focus');
                        });
                        if ($(this).hasClass('float')) {
                            $(this).appendTo(floating_panels);
                            try {
                                $(this).resizable(floatingPanelResizable).resizable('option', 'minWidth', PANEL_WIDTH).resizable('option', 'minHeight', PANEL_WIDTH).draggable(floatingPanelDraggable);
                            } catch (err) {}
                        }
                    });
                    for (var i = 0; i < _panels.dock.length; i++) {
                        var tgt, name = _panels.dock[i];
                        tgt = _panels['nodes'][name];
                        tgt.appendTo(panels);
                        try {
                            tgt.resizable(dockedPanelResizable).resizable('option', 'minWidth', PANEL_WIDTH).resizable('option', 'handles', 'e');
                        } catch (err) {}
                    }
                    $('#ttx-panels').sortable({
                        update: onPanelStop,
                        sort: onPanelMove,
                        appendTo: document.body,
                        revert: 100,
                        placeholder: 'placeholder',
                        tolerance: 'intersect',
                        scroll: false,
                        handle: '.floating-panel-tab',
                        start: function (event, ui) {
                            var width = ui.helper.width();
                            $(this).find('.placeholder').width(width);
                        },
                        stop: onPanelReorder
                    });
                    $(window).resize();
                }
            }

            function scrollChat() {
                var messages = $('#chat .messages');
                messages.scrollTop(messages.prop('scrollHeight'));
            }

            function getUserID(username, callback) {
                username = username.replace(/^\s+|\s+$/g, '');
                if (username.match('^[0-9a-fA-F]{24}$')) callback(username);
                else {
                    if (username[0] === '@' && username.slice(1) in _usernames) username = username.slice(1);
                    send({
                        api: 'user.get_id',
                        name: username
                    }, function (ev) {
                        if (ev.userid) callback(ev.userid);
                        else callback(null);
                    });
                }
            }

            function handleWhois(id, loud) {
                loud = loud || false;
                var message;
                send({
                    api: 'user.get_profile',
                    userid: id
                }, function (ev) {
                    if (ev.name) {
                        var member_days = Math.floor((util.now() - ev.created * 1000) / (3600 * 1000 * 24));
                        message = ev.name + ' (' + id + '): ' + ev.points + ' points, ' + ev.fans + ' fans, member for ' + member_days + ' days.';
                        if (loud) {
                            send({
                                api: 'room.speak',
                                roomid: TT.Room.roomId,
                                text: message
                            });
                        } else {
                            message += '<br>Type "' + settings.chatDelimiter + 'profile ' + ev.name + '" for more information.';
                            addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Whois ' + ev.name + '?)', message);
                        }
                    } else {
                        message = 'Could not find user with id: ' + id + '!';
                        addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Whois)', message);
                    }
                });
            }
            var chat_commands = {
                'trap': {
                    'usage': 'trap [message]',
                    'help': 'Trapify your message!',
                    'action': function (args) {
                        var trap_translate = {
                            'A': ['\u2206', '\u00e5', '\u039b', '\u0466', '\u1e00'],
                            'B': ['\u0181', '\u0e3f', '\u03b2'],
                            'C': ['\u03fe', '\u20a1', '\u212d', '\u2103', '\u262a'],
                            'D': ['\u0189', '\u1e0e', '\u0110'],
                            'E': ['\u0404', '\u20ac', '\u04de', '\u00c8', '\u2107', '\u03be', '\u2211', '\u0401', '\u1ec4'],
                            'F': ['\u20a3', '\u2131', '\u2109', '\u24bb'],
                            'G': ['\u20b2', '\u1e20', '\u011e', '\u01e4'],
                            'H': ['\u1fcc', '\u210f', '\u0266', '\u04c7', '\u0126', '\u1e25', '\u0125', '\u0267'],
                            'I': ['\u1eca', '\u1fd7', '\u00a1', '\u0021', '\u1e2f', '\u1fd6', '\u00ef', '\u012c', '\u0131', '\u1ec8', '\u1e39', '\u2551', '\u0268', '\u0457', '\u1eca', '\u03af', '\u03aa', '\u00ce', '\u012f', '\u012b'],
                            'L': ['\u2c62', '\u1e38', '\u1e3c', '\u1e3a'],
                            'N': ['\u0418', '\u2135', '\u1e48', '\u1f74', '\u20a6', '\u019d', '\u048a', '\u0419', '\u1f23', '\u0146', '\u0220', '\u019e', '\u20aa'],
                            'O': ['\u00d8', '\u0030', '\u2205', '\u25d1', '\u0ae6', '\u03b8', '\u00d4', '\u0398'],
                            'P': ['\u2c63', '\u01a4', '\u1e54', '\u20b1'],
                            'R': ['\u211c', '\u042f', '\u0158', '\u211f', '\u211b', '\u01a6', '\u1e5c'],
                            'S': ['\u03e8', '\u0024', '\u03df', '\u24e2', '\u24c8', '\u03e9', '\u01a7', '\u00a7'],
                            'T': ['\u271e', '\u253c', '\u22a5', '\u20ae', '\u271d', '\u1e6a', '\u04ac', '\u2020', '\u256a', '\u0166'],
                            'U': ['\u1e72', '\u01b1', '\u22c3', '\u1e74'],
                            'W': ['\u03ce', '\u0428'],
                            'X': ['\u2573', '\u03bb'],
                            'Y': ['\u03ab', '\u00a5', '\u03d2', '\u03a8'],
                            'Z': ['\u1e95', '\u017e'],
                            '<': ['\u2500\u2564\u2566\uFE3B'],
                            '>': ['\uFE3B\u2566\u2564\u2500']
                        };
                        var message = "",
                            i, c;
                        args = args.slice(1).join(' ').toUpperCase();
                        for (i = 0; i < args.length; i++) {
                            c = args[i];
                            message += (c in trap_translate ? trap_translate[c][Math.floor(Math.random() * trap_translate[c].length)] : c);
                        }
                        send({
                            api: 'room.speak',
                            roomid: TT.Room.roomId,
                            text: message
                        });
                    }
                },
                'promote': {
                    'usage': 'promote [rank] [username|@username|userid]',
                    'help': '[Admin Only] Change a user\'s rank.',
                    'action': function (args) {
                        var rank, user;
                        rank = parseInt(args[1]);
                        if (isNaN(rank)) {
                            addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Promote)', 'promote [rank] [username|@username|userid]  (rank: -1 = Banned, 0 = Guest, 1 = Premium, 2 = Staff, 3 = Admin)');
                            return;
                        }
                        user = args.slice(2).join(' ');
                        getUserID(user, function (uid) {
                            if (uid === null) {
                                addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Promote)', 'Could not find user: ' + user);
                            } else {
                                Server.promote(rank, uid, function (msg) {
                                    if (msg.stx === 'ERR')
                                        addChatMessage(IMAGE_URLS.x, 0, 'TTX', '(Promote)', 'Server error: ' + msg.txt, 'verified');
                                    else
                                        addChatMessage(IMAGE_URLS.x, 0, 'TTX', '(Promote)', user + '\'s rank has been set to: ' + rankText(rank), 'verified');
                                });
                            }
                        });
                    }
                },
                'clear': {
                    'usage': 'clear',
                    'help': 'Clear TTX server messages/notifications from chat.',
                    'action': function (args) {
                        $('#chat .ttx-message').remove();
                    }
                },
                'status': {
                    'usage': 'status',
                    'help': 'Display TTX/system information.',
                    'action': function (args) {
                        addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Status)', 'Hello ' + turntable.user.displayName + ', this is Turntable X version ' + version_string + '.');
                    }
                },
                'users.room': {
                    'usage': 'users.room',
                    'help': '[Staff Only] Get a list of all TTX users in the current room, optionally filtered by integer rank.',
                    'action': function (args) {
                        Server.status(TT.Room.roomId);
                    }
                },
                'users.all': {
                    'usage': 'users.all [minimal]',
                    'help': '[Admin Only] Get a list of all TTX users on the site, optionally filtered by integer rank.',
                    'action': function (args) {
                        if (args.length > 1 && args[1] === 'minimal')
                            Server.status(null, 1);
                        else
                            Server.status();
                    }
                },
                'broadcast.all': {
                    'usage': 'broadcast.all [msg]',
                    'help': '[Admin Only] Broadcast a message to all TTX users on the site.',
                    'action': function (args) {
                        args = args.slice(1);
                        Server.broadcast(null, args.join(' '));
                    }
                },
                'broadcast.room': {
                    'usage': 'broadcast.room [msg]',
                    'help': '[Staff Only] Broadcast a message to all TTX users in your room.',
                    'action': function (args) {
                        args = args.slice(1);
                        Server.broadcast(TT.Room.roomId, args.join(' '));
                    }
                },
                'fan': {
                    'usage': 'fan [userid|@username]',
                    'help': 'Fan a user.',
                    'action': function (args) {
                        var message;
                        if (args.length === 1) {
                            TT.RoomView.callback('become_fan', TT.ID);
                            addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Fan)', 'You fanned yourself!');
                        } else {
                            uname = args.slice(1).join(' ');
                            getUserID(uname, function (uid) {
                                if (uid === null) {
                                    var error = 'Could not find user named ' + uname + '!';
                                    addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Fan)', error);
                                } else {
                                    TT.RoomView.callback('become_fan', uid);
                                    addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Fan)', 'You fanned ' + uname + '!');
                                }
                            });
                        }
                    }
                },
                'unfan': {
                    'usage': 'unfan [userid|@username]',
                    'help': 'Fan a user.',
                    'action': function (args) {
                        var message;
                        if (args.length === 1) {
                            TT.RoomView.callback('remove_fan', TT.ID);
                            addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Unfan)', 'You un-fanned yourself!');
                        } else {
                            uname = args.slice(1).join(' ');
                            getUserID(uname, function (uid) {
                                if (uid === null) {
                                    var error = 'Could not find user named ' + uname + '!';
                                    addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Fan)', error);
                                } else {
                                    TT.RoomView.callback('remove_fan', uid);
                                    addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Fan)', 'You un-fanned ' + uname + '!');
                                }
                            });
                        }
                    }
                },
                'tag': {
                    'usage': 'tag [tag1 tag2 ...]',
                    'help': 'Snag the song and tag it at the same time, with 1 or more comma-separated tags.',
                    'action': function (args) {
                        if (_currentSong === null) {
                            addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Tag)', 'There is no song playing!');
                            return;
                        }
                        var id = _currentSong.id;
                        if (!TT.playlist.queue.contains(id)) {
                            TT.RoomView.callback("add_song_to", "queue");
                        }
                        args = args.slice(1);
                        var argsDict = filterTags(args);
                        $('#ttx-close-tags').click();
                        addTags(id, argsDict);
                        var tags = '#' + args.join(', #');
                        addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Tag)', 'You <3ed and tagged <b>' + _currentSong.title + '</b> with <b>' + tags + '</b>');
                        var song = TT.playlist.queue.renderedItems[id];
                        if (typeof song !== 'undefined') {
                            song.$node.addClass('set');
                        }
                    }
                },
                'tag.chat': {
                    'usage': 'tag.chat [tag1 tag2 ...]',
                    'help': 'Snag the song and tag it at the same time, display tags to chat',
                    'action': function (args) {
                        if (_currentSong === null) {
                            addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Tag!)', 'There is no song playing!');
                            return;
                        }
                        var id = _currentSong.id;
                        if (!TT.playlist.queue.contains(id)) {
                            TT.RoomView.callback("add_song_to", "queue");
                        }
                        args = args.slice(1);
                        var argsDict = filterTags(args);
                        send({
                            api: 'room.speak',
                            roomid: TT.Room.roomId,
                            text: '/me <3 this (#' + args.join(', #') + ')'
                        });
                        $('#ttx-close-tags').click();
                        addTags(id, argsDict);
                        var song = TT.playlist.queue.renderedItems[id];
                        if (typeof song !== 'undefined') {
                            song.$node.addClass('set');
                        }
                    }
                },
                'pm': {
                    'usage': 'pm [userid|@username]',
                    'help': 'Open a PM to any user.',
                    'action': function (args) {
                        if (args.length === 1) {
                            TT.RoomView.callback('pm_user', TT.ID);
                        } else {
                            uname = args.slice(1).join(' ').replace(/^\s+|\s+$/g, '');
                            getUserID(uname, function (uid) {
                                if (uid === null) {
                                    var error = 'Could not find user named ' + uname + '!';
                                    addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(PM)', error);
                                } else {
                                    TT.RoomView.callback('pm_user', uid);
                                }
                            });
                        }
                    }
                },
                'awesome': {
                    'usage': 'awesome',
                    'help': 'Upvote the current song.',
                    'action': function (args) {
                        autoVote(0);
                    }
                },
                'lame': {
                    'usage': 'lame',
                    'help': 'Lame the current song.',
                    'action': function (args) {
                        autoVote(0, 'down');
                        $('#lame-button').addClass('selected');
                    }
                },
                'r': {
                    'usage': 'r [message]',
                    'help': 'Reply to your last PM.',
                    'action': function (args) {
                        if (args.length < 2) {
                            handleChatCommand('help r');
                            return;
                        }
                        var message;
                        if (last_pmmed === null) {
                            message = 'Nobody has PMed you!';
                            addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Reply)', message);
                        } else {
                            args = args.slice(1).join(' ');
                            send({
                                api: 'pm.send',
                                receiverid: last_pmmed,
                                text: args
                            });
                            send({
                                api: 'user.get_profile',
                                userid: last_pmmed
                            }, function (ev) {
                                if (ev.name) {
                                    addChatMessage(getIcon(TT.ID), TT.ID, 'You', 'reply to <b>' + util.emojify(ev.name) + '</b>:', args);
                                }
                            });
                        }
                    }
                },
                'help': {
                    'usage': 'help [command]',
                    'help': 'Learn more about a command, or see the full list of commands.',
                    'action': function (args) {
                        var message;
                        if (args.length === 1) {
                            message = 'Command delimiter: ' + settings.chatDelimiter + ', ';
                            message += 'available commands: ';
                            var first = true;
                            for (var command in chat_commands) {
                                if (first) {
                                    first = false;
                                } else {
                                    message += ', ';
                                }
                                message += command;
                            }
                            message += '.<br>Type "' + settings.chatDelimiter + 'help [command]" to learn more about any of those commands.';
                            addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Help)', message);
                        } else {
                            args = args.slice(1).join(' ');
                            if (chat_commands[args]) {
                                message = 'Usage: ' + chat_commands[args]['usage'];
                                message += '<br/>' + chat_commands[args]['help'];
                                addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Help)', message);
                            } else {
                                addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Help)', 'No such command: ' + args);
                            }
                        }
                    }
                },
                'whois': {
                    'usage': 'whois[!] [userid|username]',
                    'help': 'Display information about a user, announce to the chat if called as whois!',
                    'action': function (args, loud) {
                        var message;
                        loud = loud || false;
                        if (args.length === 1)
                            handleWhois(TT.ID, loud);
                        else {
                            uname = args.slice(1).join(' ');
                            getUserID(uname, function (uid) {
                                if (uid === null) {
                                    var error = 'Could not find user named ' + uname + '!';
                                    addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Profile)', error);
                                } else
                                    handleWhois(uid, loud);
                            });
                        }
                    }
                },
                'profile': {
                    'usage': 'profile [userid|username]',
                    'help': 'View a user\'s profile.',
                    'action': function (args) {
                        var uname;
                        if (args.length === 1)
                            TT.RoomView.callback('profile', TT.ID);
                        else {
                            uname = args.slice(1).join(' ');
                            getUserID(uname, function (uid) {
                                if (uid === null) {
                                    var error = 'Could not find user named ' + uname + '!';
                                    addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Profile)', error);
                                } else
                                    TT.RoomView.callback('profile', uid);
                            });
                        }
                    }
                },
                'boot': {
                    'usage': 'boot [userid|@username]',
                    'help': 'Boot a user.',
                    'action': function (args) {
                        if (args.length === 1) {
                            handleChatCommand('help boot');
                        } else {
                            uname = args.slice(1).join(' ');
                            getUserID(uname, function (uid) {
                                if (uid === null) {
                                    var error = 'Could not find user named ' + uname + '!';
                                    addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Boot)', error);
                                } else {
                                    if (isMod(TT.ID)) {
                                        TT.RoomView.callback('boot_user', uid);
                                        addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Boot)', 'You booted ' + uname + '!');
                                    } else {
                                        addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Boot)', 'You are not a room moderator!');
                                    }
                                }
                            });
                        }
                    }
                },
                'up': {
                    'usage': 'up',
                    'help': 'Adds you to the deck if there is an open seat.',
                    'action': function (args) {
                        if (TT.Room.roomData.metadata.max_djs > TT.Room.roomData.metadata.djs.length) {
                            TT.RoomView.callback('become_dj');
                            addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Up)', 'You hopped up!');
                        }
                    }
                },
                'down': {
                    'usage': 'down (or) down [userid|@username]',
                    'help': 'Removes you from the deck or another user if specified.',
                    'action': function (args) {
                        if (args.length === 1) {
                            if (isDJ(TT.ID)) {
                                TT.RoomView.callback('remove_dj');
                                addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Down)', 'You hopped down!');
                            }
                        } else {
                            uname = args.slice(1).join(' ');
                            getUserID(uname, function (uid) {
                                if (uid === null) {
                                    var error = 'Could not find user named ' + uname + '!';
                                    addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Down)', error);
                                } else {
                                    if (isMod(TT.ID)) {
                                        if (isDJ(uid)) {
                                            TT.RoomView.callback('remove_dj', uid);
                                            addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Down)', 'You removed ' + uname + ' from the deck!');
                                        } else {
                                            addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Down)', uname + ' is not currently on deck!');
                                        }
                                    } else {
                                        addChatMessage(IMAGE_URLS.x, 0, 'TurntableX', '(Down)', 'You are not a room moderator!');
                                    }
                                }
                            });
                        }
                    }
                }
            };

            function handleChatCommand(c) {
                var commandSplit = c.trim().split(' ');
                var command = commandSplit[0].toLowerCase();
                if (typeof chat_commands[command] !== 'undefined') {
                    chat_commands[command]['action'](commandSplit);
                } else {
                    handleChatCommand('help');
                }
            }

            function addChatCommands() {
                if (false) {
                    if (!TT.Room.__chatTextListener) {
                        TT.Room.__chatTextListener = TT.Room.chatTextListener;
                        TT.Room.chatTextListener = function (e) {
                            var t = e.target,
                                n = e.charCode || e.keyCode,
                                o = this;
                            if (38 != n && 40 != n && 27 != n && (39 != n || t.selectionEnd != t.value.length) && 13 != n && 9 != n) {
                                $("#typeahead").remove(), this.typeahead = null, this.replaceStartIndex = null, this.suggestion = null;
                                var s = t.value.substring(0, e.target.selectionEnd),
                                    r = !1,
                                    a = this.lastValidAtSymbolIndex(s);
                                if (a >= 0) {
                                    if (r = s.slice(a + 1).toLowerCase(), r === !1) return;
                                    var l = this.filterUsersByName(r, 5);
                                    if (l.length) {
                                        this.typeahead = "name", util.alphabetize(l, "name");
                                        var u = util.buildTree(Room.layouts.nameSuggest(l));
                                        this.suggestion = l[0].name, this.replaceStartIndex = a + 1
                                    }
                                }
                                if (!this.typeahead) {
                                    var d = this.emojiRegex.exec(s);
                                    if (d) {
                                        var c = d[3].toLowerCase(),
                                            h = util.emojiTypeahead(c, 5);
                                        if (h.length) {
                                            this.typeahead = "emoji", util.alphabetize(h), h.sort(function (e, t) {
                                                return e.indexOf(c) - t.indexOf(c)
                                            });
                                            var p = 1 === c.length,
                                                f = !p,
                                                u = util.buildTree(Room.layouts.emojiSuggest(h, f));
                                            f && (this.suggestion = h[0]), this.replaceStartIndex = s.lastIndexOf(d[3])
                                        }
                                    }
                                }
                                if (!this.typeahead) {
                                    var cd = settings.chatDelimiter,
                                        delimiterRegex = new RegExp('^' + cd + '[a-zA-Z-_.!]+$|^' + cd + '$'),
                                        d = s.match(delimiterRegex);
                                    if (d) {
                                        var c = d[0].slice(1).toLowerCase(),
                                            h = chatcmdTypeahead(c, Object.keys(chat_commands).length);
                                        if (h.length) {
                                            this.typeahead = "chatcmd", h.sort();
                                            var u = util.buildTree(chatcmdSuggest(h));
                                            this.suggestion = h[0], this.replaceStartIndex = s.lastIndexOf(c);
                                        }
                                    }
                                }
                                if (this.typeahead) {
                                    $("body").append(u);
                                    var m = $("#chat-input").offset();
                                    $(u).css({
                                        left: m.left + 1 + "px",
                                        top: m.top - 5 - $(u).outerHeight(!0) + "px"
                                    }), $(".suggestion").click(function (e) {
                                        o.chooseSuggestion(!1, $(e.target).text())
                                    }).mouseover(function () {
                                        var e = $(this);
                                        e.hasClass("selected") || (o.suggestion = e.text(), e.addClass("selected").siblings(".selected").removeClass("selected"))
                                    })
                                }
                                return !0
                            }
                        }
                    }
                    chatInput.unbind('keyup').bind('keyup', $.proxy(TT.Room.chatTextListener, TT.Room));
                    if (!Room.layouts.__nameSuggest) {
                        Room.layouts.__nameSuggest = Room.layouts.nameSuggest;
                        Room.layouts.nameSuggest = function (e) {
                            for (var t = ["div#typeahead", {}], i = 0, n = e.length; n > i; i++) {
                                var o = 0 == i ? ".selected" : "",
                                    s = e[i],
                                    r = s.images.headfront;
                                t.push(["div.suggestion" + o, {},
                                    ["div#avatar2", {
                                        style: {
                                            "background-image": "url(" + r + ") ",
                                            "background-size": "auto 14px",
                                            "background-position": "center center",
                                            "background-repeat": "no-repeat",
                                            "position": "absolute",
                                            "top": "3px",
                                            "left": "0",
                                            "width": "40px",
                                            "height": "14px",
                                            "overflow": "hidden"
                                        }
                                    }], e[i].name
                                ])
                            }
                            return t
                        }
                    }

                    function chatcmdTypeahead(e, t) {
                        var i = [],
                            n = 0,
                            o = e.length;
                        var aaa = Object.keys(chat_commands);
                        var bbb = {};
                        for (x in aaa) bbb[aaa[x]] = null
                        for (name in bbb)
                            if (bbb.hasOwnProperty(name) && name.substring(0, o) === e && (i[n] = name, n++, n >= t)) break;
                        if (t > n)
                            for (name in bbb)
                                if (bbb.hasOwnProperty(name) && -1 !== name.indexOf(e) && -1 === i.indexOf(name) && (i[n] = name, n++, n >= t)) break;
                        return i
                    }

                    function chatcmdSuggest(e) {
                        var aaa = Object.keys(chat_commands);
                        var bbb = {};
                        for (x in aaa) bbb[aaa[x]] = null;
                        for (var n = ["div#typeahead", {}], o = 0, bbb = e.length; bbb > o; o++) {
                            var r = 0 == o ? ".selected" : "";
                            n.push(["div.suggestion" + r, {},
                                chatcmdToTree(e[o]), e[o]
                            ]);
                        }
                        return n
                    }

                    function chatcmdToTree(e) {
                        var aaa = Object.keys(chat_commands);
                        var bbb = {};
                        for (x in aaa) bbb[aaa[x]] = null;
                        var delimiterRegex = new RegExp('^' + settings.chatDelimiter);
                        var t = e.replace(delimiterRegex, "").toLowerCase();
                        return t in bbb ? ["" + t, {
                            title: t
                        }] : void 0
                    }
                }
                var chatInput = $('#chat-input');
                chatInput.unbind('keydown').bind('keydown', function (ev) {
                    var key = ev.charCode || ev.keyCode;
                    var chatMessage = $(this).val();
                    if ($('.typeahead').length && (key === 13 || key === 9)) {
                        TT.Room.typeahead.chooseSuggestion();
                        ev.preventDefault();
                    } else if (key === 13 && chatMessage.match('^' + settings.chatDelimiter) && settings.chatCommands) {
                        $(this).trigger('autosize');
                        $(this)[0].value = '';
                        ev.preventDefault();
                        var delimiterRegex = new RegExp('^' + settings.chatDelimiter);
                        handleChatCommand(chatMessage.replace(delimiterRegex, ''));
                        return false;
                    } else {
                        return TT.Room.chatKeyDownListener(ev);
                    }
                });
            }

            function addChatMessage(image, speakerid, speaker, afterSpeaker, content, classes) {
                afterSpeaker = afterSpeaker || '';
                content = content || '';
                classes = classes || 'notification';
                classes += ' ttx-message';
                var chatContainer = $('#chat .messages');
                var avatar = $('<div class="avatar" style="background-image: url(' + image + ');"></div>');
                var speaker = $('<div class="speaker" style="display:inline-block">' + speaker + '</div>');
                var afterSpeaker = $('<div class="afterSpeaker" style="display:inline; margin-left:3px">' + afterSpeaker + '</div>');
                var text = $('<div class="text">' + content + '</div>');
                var textContainer = $('<div class="textContainer"></div>');
                textContainer.append(text);
                var newMessage = $('<div class="message ' + classes + '"></div>');
                newMessage.append(avatar);
                newMessage.append(speaker);
                newMessage.append(afterSpeaker);
                newMessage.append(textContainer);
                TT.Room.checkChatScroll();
                newMessage.appendTo(chatContainer);
                newMessage.find('.ttx-import').click(importLaptop);
                TT.Room.updateChatScroll();
                TT.Room.lastChatSpeakerid = null;
                if (speakerid.length > 0) {
                    newMessage.find('.speaker').data('userid', speakerid);
                }
            }

            function addTags(id, newTags) {
                if (Object.keys(newTags).length === 0) {
                    return;
                }
                var names = settings.tags.names;
                var display = settings.tags.display;
                var resort = false;
                var seen = {};
                for (var tag in newTags) {
                    if (tag === '' || typeof seen[tag] !== 'undefined') {
                        continue;
                    }
                    seen[tag] = 1;
                    if (typeof settings.tags.songs[id] === 'undefined') {
                        settings.tags.songs[id] = {};
                    }
                    settings.tags.songs[id][tag] = 1;
                    if (typeof display[tag] === 'undefined') {
                        settings.tags.names.push(tag);
                        settings.tags.display[tag] = newTags[tag];
                        resort = true;
                    }
                }
                if (resort) {
                    settings.tags.names.sort();
                }
                saveSettings();
                if ($('#ttx-tag-menu').length) {
                    rerenderTagMenu();
                }
            }

            function properTagName(name) {
                return name.replace(/[^A-Za-z0-9]/g, '');
            }

            function removeTag(name) {
                var index = getTagIndex(name);
                settings.tags.names.splice(index, 1);
                delete settings.tags.display[name];
                var to_delete = {};
                for (var song in settings.tags.songs) {
                    var tags = settings.tags.songs[song];
                    if (typeof tags[name] !== 'undefined') {
                        delete tags[name];
                        if (Object.keys(tags).length === 0) {
                            to_delete[song] = 1;
                        }
                    }
                }
                if (Object.keys(to_delete).length) {
                    $('#playlist .songs .song').each(function () {
                        if (typeof to_delete[$(this).data('songData').fileId] !== 'undefined') {
                            $(this).removeClass('set');
                        }
                    });
                    for (var song in to_delete) {
                        delete settings.tags.songs[song];
                    }
                }
                saveSettings();
                return index;
            }

            function renameTag(name, newName) {
                var results = [];
                var index = getTagIndex(name);
                results.push(index);
                settings.tags.names.splice(index, 1);
                delete settings.tags.display[name];
                var newKey = newName.toLowerCase();
                var newIndex = newTagIndex(newKey);
                results.push(newIndex);
                if (newIndex >= 0) {
                    if (newIndex === settings.tags.names.length) {
                        settings.tags.names.push(newKey);
                    } else {
                        settings.tags.names.splice(newIndex, 0, newKey);
                    }
                    settings.tags.display[newKey] = newName;
                }
                for (var song in settings.tags.songs) {
                    var tags = settings.tags.songs[song];
                    if (typeof tags[name] !== 'undefined') {
                        delete tags[name];
                        tags[newKey] = 1;
                    }
                }
                saveSettings();
                return results;
            }

            function getTagIndex(name) {
                name = name.toString();
                for (var i = 0; i < settings.tags.names.length; i++) {
                    var curName = settings.tags.names[i];
                    if (name === curName) {
                        return i;
                    }
                }
                return -1;
            }

            function newTagIndex(name) {
                name = name.toLowerCase();
                for (var i = 0; i < settings.tags.names.length; i++) {
                    var curName = settings.tags.names[i].toLowerCase();
                    if (name === curName) {
                        return -1;
                    }
                    if (name < curName) {
                        return i;
                    }
                }
                return settings.tags.names.length;
            }

            function fixTagMenu() {
                var SONG_HEIGHT = 48;
                var MENU_OPTION_HEIGHT = 31;
                var scrollable = $('#ttx-tag-menu-scrollable');
                var menu = $("#ttx-tag-menu");
                var queueContainer = $('#songs');
                var addTagButton = menu.data('button');
                var songContainer = menu.data('songContainer');
                var menuHeight = menu.outerHeight();
                var songOffset = songContainer.offset();
                var queueOffset = queueContainer.offset();
                var queueHeight = queueContainer.height();
                var scrollableHeight = scrollable.children().length * MENU_OPTION_HEIGHT;
                var overflow, scrollHeight;
                if (menuHeight > queueHeight - 5) {
                    menuHeight = queueHeight;
                    scrollHeight = (queueHeight - SONG_HEIGHT) + 'px';
                    overflow = 'auto';
                } else {
                    scrollHeight = '100%';
                    overflow = 'visible';
                }
                scrollable.css({
                    'max-height': scrollHeight,
                    'overflow-y': overflow
                });
                var offsetTop = Math.round((SONG_HEIGHT - menuHeight) / 2);
                var originalOffsetTop = offsetTop;
                if (offsetTop + songOffset.top < queueOffset.top) {
                    offsetTop = queueOffset.top - songOffset.top;
                } else if (offsetTop + songOffset.top + menuHeight > queueOffset.top + queueHeight) {
                    offsetTop = queueOffset.top + queueHeight - songOffset.top - menuHeight;
                }
                menu.find('#ttx-tag-menu-arrow').css({
                    'margin-top': (-10 + (originalOffsetTop - offsetTop)) + 'px'
                });
                menu.css({
                    'top': offsetTop + 'px',
                    'right': '45px'
                });
            }

            function populateTagMenu() {
                var tag_menu = '<div id="ttx-tag-menu" style="display:none" class="floating-menu"><div id="ttx-tag-menu-arrow"></div><div style="position:relative; height: 25px;" class="option special"><input type="text" id="ttx-new-tag" placeholder="type a tag"></input><div id="ttx-close-tags"></div></div>';
                tag_menu += populateTagMenuScrollable() + '</div>';
                return tag_menu;
            }

            function populateTagMenuScrollable() {
                var content = '<div id="ttx-tag-menu-scrollable"><div>';
                for (var i = 0; i < settings.tags.names.length; i++) {
                    var tag_name = settings.tags.names[i];
                    content += '<div class="option ttx-menu-item" data-name="' + tag_name + '">' + settings.tags.display[tag_name] + '<div class="ttx-menu-edit"></div></div>';
                }
                content += '</div></div>';
                return content;
            }

            function createTagMenu(songContainer) {
                var tag_menu = populateTagMenu();
                songContainer.append(tag_menu);
                var menu = $('#ttx-tag-menu');
                menu.data('song', null);
                menu.data('songContainer', songContainer);
                menu.data('button', songContainer.find('.addTag:eq(0)'));
                var scrollable = $('#ttx-tag-menu-scrollable');
                $('#ttx-close-tags').click(function (ev) {
                    TT.playlist.queue.locked = false;
                    TT.playlist.queue.tagging = false;
                    TT.playlist.queue.$songs.removeClass('tagging');
                    $('#ttx-new-tag input').blur();
                    var button = menu.data('button');
                    if (typeof button !== 'undefined') {
                        button.removeClass('selected');
                    }
                    var song = menu.data('songContainer');
                    if (typeof song !== 'undefined') {
                        song.removeClass('selected');
                    }
                    menu.data('song', null).hide();
                    return false;
                });
                $('#ttx-new-tag').keydown(function (ev) {
                    var key = ev.charCode || ev.keyCode;
                    if (key === 13) {
                        var newTagName = properTagName($(this).val());
                        if (newTagName.length === 0) {
                            return;
                        }
                        var properName = newTagName.toLowerCase();
                        var index = getTagIndex(properName);
                        if (index > -1) {
                            scrollable.find('.option:eq(' + index + ')').click();
                            $(this).val('');
                            return;
                        }
                        var newIndex = newTagIndex(properName);
                        if (newIndex === settings.tags.names.length) {
                            settings.tags.names.push(properName);
                            $('<div class="option ttx-menu-item" data-name="' + properName + '">' + newTagName + '<div class="ttx-menu-edit"></div></div>').appendTo(scrollable.children(':first')).click();
                        } else {
                            settings.tags.names.splice(newIndex, 0, properName);
                            $('<div class="option ttx-menu-item" data-name="' + properName + '">' + newTagName + '<div class="ttx-menu-edit"></div></div>').insertBefore(scrollable.children(':first').find('.option:eq(' + newIndex + ')')).click();
                        }
                        settings.tags.display[properName] = newTagName;
                        $(this).val('');
                        fixTagMenu();
                        saveSettings(false);
                    } else if (key === 9) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        var songC = menu.data('songContainer');
                        var queueContainer = $('#queue');
                        var songs = $('#songs');
                        if (ev.shiftKey) {
                            if (menu.offset().top - 100 >= queueContainer.offset().top) {
                                if (songs.scrollTop() >= 48) {
                                    songs.scrollTop(songs.scrollTop() - 48);
                                }
                            }
                            songC.prev().mouseenter().find('.addTag').click();
                        } else {
                            if (menu.offset().top + menu.height() + 48 <= queueContainer.offset().top + queueContainer.height()) {
                                songs.scrollTop(songs.scrollTop() + 48);
                            }
                            songC.next().mouseenter().find('.addTag').click();
                        }
                        return false;
                    } else if (key === 27) {
                        $('#ttx-close-tags').click();
                        return;
                    }
                });
                menu.find('.special').click(function (e) {
                    e.preventDefault;
                    return false;
                });
                scrollable.on('click', '.ttx-menu-edit', function (ev) {
                    customModal('tag', $(this).closest('.option').data('name'));
                    ev.preventDefault();
                    return false;
                });
                scrollable.on('click', '.option', function (ev) {
                    ev.preventDefault();
                    if ($(this).hasClass('special')) {
                        return false;
                    } else {
                        var songId = menu.data('song');
                        var tagId = $(this).data('name');
                        if (typeof songId === 'undefined' || typeof tagId === 'undefined') {
                            return;
                        }
                        $(this).toggleClass('selected');
                        if ($(this).hasClass('selected')) {
                            if (typeof settings.tags.songs[songId] === 'undefined') {
                                settings.tags.songs[songId] = {};
                            }
                            settings.tags.songs[songId][tagId] = 1;
                            menu.data('songContainer').addClass('set');
                        } else {
                            delete settings.tags.songs[songId][tagId];
                            if (Object.keys(settings.tags.songs[songId]).length === 0) {
                                menu.data('songContainer').removeClass('set');
                                delete settings.tags.songs[songId];
                            }
                        }
                        saveSettings(false);
                    }
                    return false;
                });
                return menu;
            }

            function rerenderTagMenu() {
                var menu = $('#ttx-tag-menu');
                if (!menu.length) {
                    menu = createTagMenu($('#playlist .song:eq(0)'));
                    return;
                }
                var song = menu.data('song');
                var scrollable = $('#ttx-tag-menu-scrollable');
                scrollable.replaceWith(populateTagMenuScrollable());
                scrollable.find('.option').each(function () {
                    var tagId = $(this).data('name');
                    if (typeof settings.tags.songs[song] === 'undefined' || typeof settings.tags.songs[song][tagId] === 'undefined') {
                        $(this).removeClass('selected');
                    } else {
                        $(this).addClass('selected');
                    }
                });
                if (typeof song !== 'undefined' && song !== null) {
                    fixTagMenu();
                }
            }

            function filterTags(args) {
                var dict = {};
                for (var i = 0; i < args.length; i++) {
                    var proper = properTagName(args[i]);
                    dict[proper.toLowerCase()] = proper;
                    args[i] = proper;
                }
                return dict;
            }

            function toggleTagMenu(ev, addTagButton) {
                var displayTime = 150;
                if (ev.which) {
                    displayTime = 350;
                }
                ev.stopPropagation();
                ev.preventDefault();
                var songContainer = addTagButton.closest('.song');
                var songData = songContainer.data('songData');
                if (typeof songData === 'undefined') {
                    return;
                }
                var songId = songData.fileId;
                var menu = $('#ttx-tag-menu');
                var scrollable;
                if (menu.length === 0) {
                    menu = createTagMenu(songContainer);
                }
                scrollable = $('#ttx-tag-menu-scrollable');
                var currentMenuSong = menu.data('song');
                if (typeof currentMenuSong !== 'undefined' && currentMenuSong !== null) {
                    if (currentMenuSong === songId) {
                        $('#ttx-close-tags').click();
                        return;
                    } else {
                        menu.data('songContainer').removeClass('selected');
                        menu.data('button').removeClass('selected');
                        menu.data('song', songId);
                        menu.data('songContainer', songContainer);
                        menu.data('button', addTagButton);
                        songContainer.append(menu);
                    }
                } else {
                    menu.data('song', songId);
                    menu.data('songContainer', songContainer);
                    menu.data('button', addTagButton);
                    songContainer.append(menu);
                }
                TT.playlist.queue.locked = true;
                TT.playlist.queue.tagging = true;
                TT.playlist.queue.$songs.addClass('tagging');
                $('#playlist .song-options').hide();
                songContainer.addClass('selected');
                var scrollable = $('#ttx-tag-menu-scrollable');
                scrollable.find('.option').each(function () {
                    var tagId = $(this).data('name');
                    if (typeof settings.tags.songs[songId] === 'undefined' || typeof settings.tags.songs[songId][tagId] === 'undefined') {
                        $(this).removeClass('selected');
                    } else {
                        $(this).addClass('selected');
                    }
                });
                menu.css({
                    'opacity': 0,
                    'display': 'block'
                });
                fixTagMenu();
                if (displayTime) {
                    menu.fadeTo(displayTime, 1, function () {
                        menu.find('#ttx-new-tag').focus();
                    });
                } else {
                    menu.show().css('opacity', 1).find('#ttx-new-tag').focus();
                }
            }

            function fixTags() {
                settings.tags.names = [];
                for (key in settings.tags.display) {
                    settings.tags.names.push(key);
                }
                settings.tags.names.sort();
                saveSettings();
            }

            function modifyQueue() {
                if (!TT.playlist.queue) return;
                if (settings.tags.names.length === 0 && Object.keys(settings.tags.display).length !== 0) {
                    for (key in settings.tags.display) {
                        settings.tags.names.push(key);
                    }
                    settings.tags.names.sort();
                    saveSettings();
                }
                TT.playlist.layouts.songView = function (f, d, a) {
                    var e = f.metadata,
                        c = [],
                        b = e.artist + "\u2022 " + util.prettyTime(e.length);
                    if (a !== undefined && a % 2 === 0) {
                        c.push(".nth-child-even");
                    }
                    var tagClass = (typeof settings.tags.songs[f.fileId] === 'undefined' || Object.keys(settings.tags.songs[f.fileId]).length === 0) ? '' : '.set';
                    return ["li.song" + tagClass + c.join(""), {
                        data: {
                            songData: f
                        },
                        style: ((d !== undefined) ? {
                            top: d
                        } : {}),
                    }, ["div.progress-bar", ["div.progress"]], ["div.vinyl"], ["div.thumb", {
                        style: {
                            "background-image": (e.coverart ? "url(" + e.coverart + ")" : "")
                        }
                    }], ["div.playSample"], ["div.pauseSample"], ["div.title", {
                            title: e.song
                        },
                        e.song
                    ], ["div.details", {
                            title: b
                        },
                        ["span", e.artist, ["span.divider", " \u2022 "], util.prettyTime(e.length)]
                    ], ["div.playlist-go-top"], ["div.playlist-open-options"], ["div.playlist-checkbox"], ["div.goBottom"], ["div.addTag" + tagClass], ["div.tagMessage"]];
                };
                TT.playlist.queue.options.songConstructor = TT.playlist.layouts.songView;
                $('#playlist .songs').on("click", ".goBottom", function (h) {
                    if (TT.playlist.queue.locked) {
                        return;
                    }
                    var f = $(h.target).closest(".song"),
                        g = f.data("songData").fileId,
                        d = TT.playlist.queue.options.songids.indexOf(g),
                        pos = TT.playlist.queue.options.songids.length - 1;
                    TT.playlist.reorder(d, pos).done($.proxy(function () {
                        this.reorderBySongid(g, pos);
                        if (TT.playlist.isFiltering) {
                            TT.playlist.savedScrollPosition = 0;
                        }
                    }, TT.playlist.queue));
                }).on("click", ".addTag", function (ev) {
                    toggleTagMenu(ev, $(ev.target));
                    ev.preventDefault();
                    return false;
                }).on("click", ".song", function (ev) {
                    if (TT.playlist.queue.tagging) {
                        $(this).find('.addTag').click();
                    }
                });
                TT.playlist.queue.setFilter([]);
                TT.playlist.queue.clearFilter();
                var sortMatch = new RegExp("([+-])(artist|title|length|duration|song|shuffle|random)", "i");
                var metaMatch = new RegExp(/(\balbum|\bartist|\bduration|\btitle|#):?(.*?)(?=\balbum:|\bartist:|\bduration:|\btitle:|#|$)/);
                TT.playlist.parseFilter = function (c) {
                    var a = {}, sortField, sortDirection, sort = sortMatch.exec(c);
                    if (sort !== null) {
                        sortDirection = sort[1] === '+' ? 1 : -1;
                        sortField = sort[2].toLowerCase();
                        if (sortField === 'title') sortField = 'song';
                        if (sortField === 'duration') sortField = 'length';
                        if (sortField === 'shuffle' || sortField === 'random')
                            a['_sort'] = function (x, y) {
                                return Math.random() >= 0.5 ? 1 : -1;
                            };
                        else if (sortField === 'length')
                            a['_sort'] = function (x, y) {
                                return sortDirection * (turntable.playlist.queue.options.backingMap[x].metadata.length - turntable.playlist.queue.options.backingMap[y].metadata.length);
                            };
                        else
                            a['_sort'] = function (x, y) {
                                return sortDirection * (turntable.playlist.queue.options.backingMap[y].metadata[sortField].toLowerCase() < turntable.playlist.queue.options.backingMap[x].metadata[sortField].toLowerCase() ? 1 : -1);
                            };
                        c = c.replace(sort[0], "");
                    }
                    while (true) {
                        var b = metaMatch.exec(c);
                        if (b == null) {
                            break;
                        }
                        if (b[1] == '#') {
                            if (typeof (a['tags']) === 'undefined') {
                                a['tags'] = [];
                            }
                            a['tags'].push(properTagName(b[2]).toLowerCase());
                        } else if (b[1] == "duration") {
                            a[b[1]] = $.trim(b[2]);
                        } else {
                            a[b[1]] = new RegExp($.trim(b[2]).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");
                        }
                        c = c.replace(b[0], "");
                    }
                    if (c != null) {
                        a.all = c;
                    } else {
                        a.all = "";
                    }
                    return a;
                };
                TT.playlist.queue.setFilter = function (e, s) {
                    this.songsToShow = e, this.$el.addClass("filtered"), this.refilter(s);
                };
                TT.playlist.queue.refilter = function (s) {
                    this.filterSongs(s), this.reset()
                };
                TT.playlist.queue.filterSongs = function (sf) {
                    if (!this.songsToShow) return this.filteredSongids = void 0, this.currentlyPlayingSongPassedFilter = !0, void 0;
                    for (var e = this.options.songids, t = [], i = 0, n = 0, o = e.length; o > n; n++) {
                        var s = e[n];
                        this.songsToShow[s] === !0 && (t[i++] = s)
                    }
                    if (sf)
                        t.sort(sf);
                    this.currentlyPlayingSongPassedFilter = this.songsToShow[this.currentlyPlayingSongid], this.filteredSongids = t
                };
                TT.playlist.filterQueue = function (k) {
                    if (k && k.length > 0) {
                        var g = this.parseFilter(k);
                        $('#ttx-close-tags').click();
                        var u = g.all.split(/\s+/g),
                            f = $.map(u, function (i) {
                                return new RegExp(i.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");
                            });
                        var v = {}, q = 0,
                            a = this.queue.options.songids,
                            e = u.length;
                        for (var r = 0, s = a.length; r < s; r++) {
                            var m = a[r],
                                l = this.songsByFid[m].metadata,
                                t = l.song,
                                d = l.artist,
                                n = l.album,
                                c = l.length,
                                tags = settings.tags.songs[m];
                            if (typeof tags === 'undefined') {
                                tags = {};
                            }
                            h = true;
                            for (var p = 0; p < e; p++) {
                                var b = f[p];
                                if (!b.test(t) && !b.test(d) && !b.test(n)) {
                                    h = false;
                                    break;
                                }
                            }
                            if (h && g.hasOwnProperty("artist")) {
                                if (!g.artist.test(d)) {
                                    h = false;
                                }
                            }
                            if (h && g.hasOwnProperty("title")) {
                                if (!g.title.test(t)) {
                                    h = false;
                                }
                            }
                            if (h && g.hasOwnProperty("album")) {
                                if (!g.album.test(n)) {
                                    h = false;
                                }
                            }
                            if (h && g.hasOwnProperty("duration")) {
                                var o = parseInt(g.duration.split(":")[0]);
                                if (!isNaN(o)) {
                                    if (c < o * 60 || c > (o + 1) * 60) {
                                        h = false;
                                    }
                                }
                            }
                            if (h && g.hasOwnProperty("tags")) {
                                var searchTags = g['tags'];
                                for (var i = 0; i < searchTags.length; i++) {
                                    var searchTag = searchTags[i];
                                    var tagLength = Object.keys(tags).length;
                                    if (searchTag === 'untagged') {
                                        if (tagLength > 0) {
                                            h = false;
                                            break;
                                        }
                                    } else if (searchTag === 'tagged') {
                                        if (tagLength === 0) {
                                            h = false;
                                            break;
                                        }
                                    } else {
                                        if (typeof tags[searchTag] === 'undefined') {
                                            h = false;
                                        }
                                    }
                                }
                            }
                            if (h) {
                                v[m] = true;
                                q++;
                            }
                        }
                        this.queue.setFilter(v, g['_sort']);
                        this.queue.$title.find('.text').text(q + ' of ' + a.length + ' songs from your queue');
                        this.queue.showTitle();
                        if (this.currentPreviewid && !v[this.currentPreviewid]) {
                            this.previewStop();
                        }
                        this.notifyGAOfFilter(k, q);
                    } else {
                        this.queue.clearFilter();
                        this.queue.hideTitle();
                        if (this.currentPreviewid && !this.queue.contains(this.currentPreviewid)) {
                            this.previewStop();
                        }
                    }
                };
            }

            function translate(msg) {
                var translation = [];
                if (msg instanceof Array && msg.length) {
                    translation = [];
                    if (msg[0].sticker_id) {
                        for (var i = 0; i < msg.length; i++) {
                            var placement = msg[i];
                            translation.push(STICKER_DICT[msg[i].sticker_id]);
                            translation.push(Math.round(msg[i].top));
                            translation.push(Math.round(msg[i].left));
                            translation.push(Math.round(msg[i].angle));
                        }
                    } else if (msg.length % 4 === 0) {
                        for (var i = 0; i < msg.length; i += 4) {
                            var placement = {};
                            placement.sticker_id = STICKER_LIST[msg[i]];
                            placement.top = msg[i + 1];
                            placement.left = msg[i + 2];
                            placement.angle = msg[i + 3];
                            translation.push(placement);
                        }
                    }
                } else if (msg.cmd) {
                    switch (msg.cmd) {
                    case 'ani':
                        translation = {};
                        translation.command = 'update_sticker_placements';
                        translation.userid = msg.uid;
                        translation.placements = translate(msg.pla);
                        break;
                    case 'stx':
                        var room_count = Object.keys(msg.rooms).length;
                        translation = 'X Server: ' + msg.users + ' users logged on ' + (room_count ? 'in ' + room_count + ' rooms ' : '') + '(' + msg.connections + ' connections total)<br/>';
                        for (room in msg.rooms) {
                            var users = msg.rooms[room].users.sort(function (x, y) {
                                return x.nam.toLowerCase() > y.nam.toLowerCase();
                            });
                            translation += '&nbsp;Room ' + room + ': (' + users.length + ' users)<br/>';
                            for (var i = 0; i < users.length; i++) {
                                translation += '&nbsp&nbsp;&nbsp;' + users[i].nam + ' (' + ('ip' in users[i] ? (users[i].ip + ', ') : '') + rankText(users[i].rnk) + ')<br/>';
                            }
                        }
                        break;
                    default:
                        break;
                    }
                }
                return translation;
            }

            function rankText(rank) {
                switch (rank) {
                case -1:
                    return 'Banned';
                case 1:
                    return 'Premium';
                case 2:
                    return 'Staff';
                case 3:
                    return 'Admin';
                case 4:
                    return 'Admin';
                default:
                    return 'Guest';
                }
            }

            function banMe() {
                Server.disconnect(), TT.Room.muted = false, TT.Room.toggleMute(), turntable.socket.disconnect(), turntable.die('You have been banned from using Turntable X.'), $('#turntable').remove(), $('#pmWindows').remove();
            }

            function format_time(t) {
                var hh = t.getHours();
                var mm = t.getMinutes();
                var ss = t.getSeconds();
                if (hh < 10) {
                    hh = "0" + hh;
                }
                if (mm < 10) {
                    mm = "0" + mm;
                }
                if (ss < 10) {
                    ss = "0" + ss;
                }
                return hh + ":" + mm + ":" + ss;
            }

            function msFormat(ms) {
                var addZero = '';
                var seconds = ms / 1000.0;
                if (ms % 100 === 0) {
                    addZero = '0';
                }
                if (ms % 1000 === 0) {
                    addZero = '.00';
                }
                return seconds + addZero + 's';
            }

            function inlineCSS(css_code) {
                var div = document.createElement("div");
                div.innerHTML = "<style>" + css_code + "</style>";
                document.body.appendChild(div.childNodes[0]);
            }

            function send(data, callback) {
                var msg, defer = $.Deferred();
                var now = util.now();
                if (data.api == "room.now") {
                    defer.resolved();
                    callback();
                    return defer.promise();
                }
                data.msgid = turntable.messageId;
                turntable.messageId += 1;
                data.clientid = turntable.clientId;
                if (turntable.user.id && !data.userid) {
                    data.userid = turntable.user.id;
                    data.userauth = turntable.user.auth;
                }
                msg = JSON.stringify(data);
                turntable.whenSocketConnected(function () {
                    turntable.socket.send(msg);
                    turntable.socketKeepAlive(true);
                    turntable.pendingCalls.push({
                        msgid: data.msgid,
                        handler: callback,
                        deferred: defer,
                        time: util.now()
                    });
                });
                return defer.promise();
            }

            function mod(a, b) {
                return ((a % b) + b) % b;
            }

            function gcd(a, b) {
                var t;
                while (b != 0) {
                    t = b;
                    b = a % b;
                    a = t;
                }
                return a;
            }

            function lcm(a, b) {
                return (a * b / gcd(a, b));
            }

            function random_item(obj) {
                var temp_key, keys = [];
                for (temp_key in obj) {
                    if (obj.hasOwnProperty(temp_key)) {
                        keys.push(temp_key);
                    }
                }
                return obj[keys[Math.floor(Math.random() * keys.length)]];
            }

            function randomDelay(min, max) {
                min = min || 2;
                max = max || 70;
                return (Math.random() * max + min) * 1000;
            }

            function matchCSS(data) {
                var ss = document.styleSheets;
                var results = [];
                for (var i = 0; i < ss.length; i++) {
                    var rules = ss[i].cssRules || ss[i].rules;
                    if (!rules) {
                        continue;
                    }
                    for (var j = 0; j < rules.length; j++) {
                        if (!(rules[j].selectorText)) {
                            continue;
                        }
                        if (rules[j].selectorText.indexOf(data) > -1) {
                            results.push(rules[j].selectorText);
                        }
                    }
                }
                return results;
            }

            function cssInject(data) {
                var ss = document.styleSheets;
                var original = {};
                for (var i = 0; i < ss.length; i++) {
                    try {
                        var rules = ss[i].cssRules || ss[i].rules;
                    } catch (err) {
                        continue;
                    }
                    if (!rules) {
                        continue;
                    }
                    for (var j = 0; j < rules.length; j++) {
                        if (!(rules[j].selectorText))
                            continue;
                        var selector = rules[j].selectorText;
                        var style = rules[j].style;
                        if (data[selector]) {
                            original[selector] = {};
                            for (prop in data[selector]) {
                                var new_value = data[selector][prop];
                                original[selector][prop] = style[prop];
                                style[prop] = new_value;
                            }
                        }
                    }
                }
                return original;
            }

            function formatTimeDelta(date) {
                var curdate = new Date().getTime();
                curdate = Math.round(curdate / 1000);
                if (!date.length) date = date.toString();
                if (date.length == 10) date = parseInt(date);
                else if (date.length == 13) date = parseInt(parseInt(date) / 1000);
                else date = Math.round(Date.parse(date) / 1000);
                var diff = Math.abs(date - curdate);
                if ((diff / 60) >= 1) {
                    var min = Math.floor(diff / 60);
                    var sec = diff - (min * 60);
                } else {
                    var min = '00';
                    var sec = diff;
                }
                min = min.toString();
                sec = sec.toString();
                if (min.length < 2) {
                    min = '0' + min;
                }
                if (sec.length < 2) {
                    sec = '0' + sec;
                }
                return min + ':' + sec;
            }

            function log(message) {
                if (window.console && (!settings || settings.debug)) {
                    window.console.log(message);
                }
            }

            function syncNow() {
                return Math.floor(turntable.serverNow() * 1000);
            }
            var LETTER_WIDTH = 170;
            var STICKER_LIMIT = 20;
            var DEFAULT_COLOR = 'R';
            var COLOR_MAP = {
                'B': '4f86fdede77989117e000003',
                'P': '4f86fe84e77989117e000008',
                'R': '4f86fe33e77989117e000006',
                'O': '4f86fd32e77989117e000001',
                'Y': '4f86fea8e77989117e000009',
                'L': '4f86fd27e77989117e000000',
                'W': '4f86fe15e77989117e000005'
            };
            var LETTER_MAP = {
                'A': [{
                    top: 218,
                    left: -54,
                    angle: 102
                }, {
                    top: 65,
                    left: -22,
                    angle: 102
                }, {
                    top: 65,
                    left: 12,
                    angle: 78
                }, {
                    top: 218,
                    left: 45,
                    angle: 78
                }, {
                    top: 197,
                    left: 0,
                    angle: 0
                }],
                'B': [{
                    top: 214,
                    left: -69,
                    angle: 90
                }, {
                    top: 65,
                    left: -69,
                    angle: 90
                }, {
                    top: 38,
                    left: -3,
                    angle: 30
                }, {
                    top: 112,
                    left: -2,
                    angle: 330
                }, {
                    top: 179,
                    left: -3,
                    angle: 30
                }, {
                    top: 249,
                    left: -2,
                    angle: 330
                }],
                'C': [{
                    top: 141,
                    left: -69,
                    angle: 90
                }, {
                    top: 253,
                    left: -3,
                    angle: 30
                }, {
                    top: 36,
                    left: -3,
                    angle: 330
                }],
                'D': [{
                    top: 214,
                    left: -66,
                    angle: 90
                }, {
                    top: 65,
                    left: -66,
                    angle: 90
                }, {
                    top: 253,
                    left: -3,
                    angle: 330
                }, {
                    top: 36,
                    left: -3,
                    angle: 30
                }, {
                    top: 141,
                    left: 60,
                    angle: 90
                }],
                'E': [{
                    top: 214,
                    left: -66,
                    angle: 90
                }, {
                    top: 65,
                    left: -66,
                    angle: 90
                }, {
                    top: 0,
                    left: 0,
                    angle: 0
                }, {
                    top: 144,
                    left: 0,
                    angle: 0
                }, {
                    top: 280,
                    left: 0,
                    angle: 0
                }],
                'F': [{
                    top: 214,
                    left: -66,
                    angle: 90
                }, {
                    top: 65,
                    left: -66,
                    angle: 90
                }, {
                    top: 0,
                    left: 0,
                    angle: 0
                }, {
                    top: 144,
                    left: 0,
                    angle: 0
                }],
                'G': [{
                    top: 141,
                    left: -69,
                    angle: 90
                }, {
                    top: 253,
                    left: -3,
                    angle: 30
                }, {
                    top: 36,
                    left: -3,
                    angle: 330
                }, {
                    top: 255,
                    left: 60,
                    angle: 90
                }, {
                    top: 184,
                    left: 54,
                    angle: 0
                }],
                'H': [{
                    top: 214,
                    left: -66,
                    angle: 90
                }, {
                    top: 65,
                    left: -66,
                    angle: 90
                }, {
                    top: 144,
                    left: 0,
                    angle: 0
                }, {
                    top: 214,
                    left: 60,
                    angle: 90
                }, {
                    top: 65,
                    left: 60,
                    angle: 90
                }],
                'I': [{
                    top: 214,
                    left: -3,
                    angle: 90
                }, {
                    top: 65,
                    left: -3,
                    angle: 90
                }],
                'J': [{
                    top: 0,
                    left: 0,
                    angle: 0
                }, {
                    top: 93,
                    left: 15,
                    angle: 90
                }, {
                    top: 230,
                    left: -20,
                    angle: -50
                }],
                'K': [{
                    top: 214,
                    left: -66,
                    angle: 90
                }, {
                    top: 65,
                    left: -66,
                    angle: 90
                }, {
                    top: 51,
                    left: 22,
                    angle: 315
                }, {
                    top: 234,
                    left: 19,
                    angle: 45
                }],
                'L': [{
                    top: 214,
                    left: -66,
                    angle: 90
                }, {
                    top: 65,
                    left: -66,
                    angle: 90
                }, {
                    top: 280,
                    left: 0,
                    angle: 0
                }],
                'M': [{
                    top: 214,
                    left: -66,
                    angle: 90
                }, {
                    top: 65,
                    left: -66,
                    angle: 90
                }, {
                    top: 65,
                    left: 60,
                    angle: 90
                }, {
                    top: 214,
                    left: 60,
                    angle: 90
                }, {
                    top: 60,
                    left: -37,
                    angle: 60
                }, {
                    top: 60,
                    left: 37,
                    angle: -60
                }],
                'N': [{
                    top: 214,
                    left: -66,
                    angle: 90
                }, {
                    top: 65,
                    left: -66,
                    angle: 90
                }, {
                    top: 65,
                    left: 60,
                    angle: 90
                }, {
                    top: 214,
                    left: 60,
                    angle: 90
                }, {
                    top: 72,
                    left: -37,
                    angle: 65
                }, {
                    top: 217,
                    left: 29,
                    angle: 65
                }],
                'O': [{
                    top: 67,
                    left: 30,
                    angle: 65
                }, {
                    top: 215,
                    left: -39,
                    angle: 65
                }, {
                    top: 67,
                    left: -39,
                    angle: 115
                }, {
                    top: 215,
                    left: 30,
                    angle: 115
                }],
                'P': [{
                    top: 214,
                    left: -69,
                    angle: 90
                }, {
                    top: 65,
                    left: -69,
                    angle: 90
                }, {
                    top: 38,
                    left: -3,
                    angle: 30
                }, {
                    top: 112,
                    left: -2,
                    angle: 330
                }],
                'Q': [{
                    top: 67,
                    left: 30,
                    angle: 65
                }, {
                    top: 215,
                    left: -39,
                    angle: 65
                }, {
                    top: 67,
                    left: -39,
                    angle: 115
                }, {
                    top: 215,
                    left: 30,
                    angle: 115
                }, {
                    top: 215,
                    left: 30,
                    angle: 65
                }],
                'R': [{
                    top: 214,
                    left: -69,
                    angle: 90
                }, {
                    top: 65,
                    left: -69,
                    angle: 90
                }, {
                    top: 38,
                    left: -3,
                    angle: 30
                }, {
                    top: 112,
                    left: -2,
                    angle: 330
                }, {
                    top: 236,
                    left: 8,
                    angle: 45
                }],
                'S': [{
                    top: 36,
                    left: -6,
                    angle: 330
                }, {
                    top: 137,
                    left: -9,
                    angle: 46
                }, {
                    top: 242,
                    left: -6,
                    angle: 330
                }],
                'T': [{
                    top: 214,
                    left: -3,
                    angle: 90
                }, {
                    top: 65,
                    left: -3,
                    angle: 90
                }, {
                    top: 0,
                    left: 0,
                    angle: 0
                }],
                'U': [{
                    top: 214,
                    left: -66,
                    angle: 90
                }, {
                    top: 65,
                    left: -66,
                    angle: 90
                }, {
                    top: 280,
                    left: 0,
                    angle: 0
                }, {
                    top: 214,
                    left: 60,
                    angle: 90
                }, {
                    top: 65,
                    left: 60,
                    angle: 90
                }],
                'V': [{
                    top: 218,
                    left: 12,
                    angle: 102
                }, {
                    top: 65,
                    left: 45,
                    angle: 102
                }, {
                    top: 65,
                    left: -54,
                    angle: 78
                }, {
                    top: 218,
                    left: -22,
                    angle: 78
                }],
                'W': [{
                    top: 214,
                    left: -66,
                    angle: 90
                }, {
                    top: 65,
                    left: -66,
                    angle: 90
                }, {
                    top: 65,
                    left: 60,
                    angle: 90
                }, {
                    top: 214,
                    left: 60,
                    angle: 90
                }, {
                    top: 225,
                    left: 31,
                    angle: 60
                }, {
                    top: 225,
                    left: -26,
                    angle: -60
                }],
                'X': [{
                    top: 67,
                    left: -38,
                    angle: 65
                }, {
                    top: 215,
                    left: 29,
                    angle: 65
                }, {
                    top: 67,
                    left: 29,
                    angle: 115
                }, {
                    top: 215,
                    left: -38,
                    angle: 115
                }],
                'Y': [{
                    top: 67,
                    left: -38,
                    angle: 65
                }, {
                    top: 67,
                    left: 30,
                    angle: 115
                }, {
                    top: 214,
                    left: -3,
                    angle: 90
                }],
                'Z': [{
                    top: 0,
                    left: 0,
                    angle: 0
                }, {
                    top: 280,
                    left: 0,
                    angle: 0
                }, {
                    top: 67,
                    left: 30,
                    angle: 115
                }, {
                    top: 215,
                    left: -39,
                    angle: 115
                }],
                '0': [{
                    top: 214,
                    left: -66,
                    angle: 90
                }, {
                    top: 65,
                    left: -66,
                    angle: 90
                }, {
                    top: 214,
                    left: 60,
                    angle: 90
                }, {
                    top: 65,
                    left: 60,
                    angle: 90
                }, {
                    top: 0,
                    left: 0,
                    angle: 0
                }, {
                    top: 280,
                    left: 0,
                    angle: 0
                }],
                '1': [{
                    top: 214,
                    left: -3,
                    angle: 90
                }, {
                    top: 65,
                    left: -3,
                    angle: 90
                }, {
                    top: 32,
                    left: -21,
                    angle: 299
                }],
                '2': [{
                    top: 214,
                    left: -66,
                    angle: 90
                }, {
                    top: 65,
                    left: 60,
                    angle: 90
                }, {
                    top: 0,
                    left: 0,
                    angle: 0
                }, {
                    top: 144,
                    left: 0,
                    angle: 0
                }, {
                    top: 280,
                    left: 0,
                    angle: 0
                }],
                '3': [{
                    top: 214,
                    left: 60,
                    angle: 90
                }, {
                    top: 65,
                    left: 60,
                    angle: 90
                }, {
                    top: 0,
                    left: 0,
                    angle: 0
                }, {
                    top: 144,
                    left: 0,
                    angle: 0
                }, {
                    top: 280,
                    left: 0,
                    angle: 0
                }],
                '4': [{
                    top: 65,
                    left: -66,
                    angle: 90
                }, {
                    top: 144,
                    left: 0,
                    angle: 0
                }, {
                    top: 214,
                    left: 60,
                    angle: 90
                }, {
                    top: 65,
                    left: 60,
                    angle: 90
                }],
                '5': [{
                    top: 214,
                    left: 60,
                    angle: 90
                }, {
                    top: 65,
                    left: -66,
                    angle: 90
                }, {
                    top: 0,
                    left: 0,
                    angle: 0
                }, {
                    top: 144,
                    left: 0,
                    angle: 0
                }, {
                    top: 280,
                    left: 0,
                    angle: 0
                }],
                '6': [{
                    top: 214,
                    left: -66,
                    angle: 90
                }, {
                    top: 214,
                    left: 60,
                    angle: 90
                }, {
                    top: 65,
                    left: -66,
                    angle: 90
                }, {
                    top: 0,
                    left: 0,
                    angle: 0
                }, {
                    top: 144,
                    left: 0,
                    angle: 0
                }, {
                    top: 280,
                    left: 0,
                    angle: 0
                }],
                '7': [{
                    top: 0,
                    left: 0,
                    angle: 0
                }, {
                    top: 214,
                    left: 60,
                    angle: 90
                }, {
                    top: 65,
                    left: 60,
                    angle: 90
                }],
                '8': [{
                    top: 65,
                    left: 60,
                    angle: 90
                }, {
                    top: 214,
                    left: -66,
                    angle: 90
                }, {
                    top: 214,
                    left: 60,
                    angle: 90
                }, {
                    top: 65,
                    left: -66,
                    angle: 90
                }, {
                    top: 0,
                    left: 0,
                    angle: 0
                }, {
                    top: 144,
                    left: 0,
                    angle: 0
                }, {
                    top: 280,
                    left: 0,
                    angle: 0
                }],
                '9': [{
                    top: 65,
                    left: 60,
                    angle: 90
                }, {
                    top: 214,
                    left: 60,
                    angle: 90
                }, {
                    top: 65,
                    left: -66,
                    angle: 90
                }, {
                    top: 0,
                    left: 0,
                    angle: 0
                }, {
                    top: 144,
                    left: 0,
                    angle: 0
                }, {
                    top: 280,
                    left: 0,
                    angle: 0
                }],
                ' ': [],
                '/': [{
                    top: 67,
                    left: 30,
                    angle: 115
                }, {
                    top: 215,
                    left: -39,
                    angle: 115
                }],
                '\\': [{
                    top: 67,
                    left: -38,
                    angle: 65
                }, {
                    top: 215,
                    left: 29,
                    angle: 65
                }],
                ',': [{
                    top: 315,
                    left: -3,
                    angle: 110
                }],
                '.': [{
                    top: 344,
                    left: -3,
                    angle: 90
                }],
                '!': [{
                    top: 344,
                    left: -3,
                    angle: 90
                }, {
                    top: 160,
                    left: -3,
                    angle: 90
                }, {
                    top: 10,
                    left: -3,
                    angle: 90
                }],
                '_': [{
                    top: 280,
                    left: 0,
                    angle: 0
                }],
                '+': [{
                    top: 144,
                    left: 0,
                    angle: 0
                }, {
                    top: 144,
                    left: 0,
                    angle: 90
                }],
                '-': [{
                    top: 144,
                    left: 0,
                    angle: 0
                }],
                '=': [{
                    top: 110,
                    left: 0,
                    angle: 0
                }, {
                    top: 180,
                    left: 0,
                    angle: 0
                }],
                '^': [{
                    top: 67,
                    left: -39,
                    angle: 115
                }, {
                    top: 67,
                    left: 29,
                    angle: 65
                }],
                '<': [{
                    top: 177,
                    left: 5,
                    angle: 30
                }, {
                    top: 109,
                    left: 5,
                    angle: 330
                }],
                '>': [{
                    top: 109,
                    left: 5,
                    angle: 30
                }, {
                    top: 177,
                    left: 5,
                    angle: 330
                }],
                "'": [{
                    top: -30,
                    left: -3,
                    angle: 100
                }],
                '"': [{
                    top: -30,
                    left: -33,
                    angle: 100
                }, {
                    top: -30,
                    left: 27,
                    angle: 100
                }],
                '*': [{
                    top: 144,
                    left: 0,
                    angle: 0
                }, {
                    top: 144,
                    left: 0,
                    angle: 90
                }, {
                    top: 144,
                    left: 0,
                    angle: 45
                }, {
                    top: 144,
                    left: 0,
                    angle: 135
                }],
                '$': [{
                    top: 36,
                    left: -6,
                    angle: 330
                }, {
                    top: 137,
                    left: -9,
                    angle: 46
                }, {
                    top: 242,
                    left: -6,
                    angle: 330
                }, {
                    top: 214,
                    left: -3,
                    angle: 90
                }, {
                    top: 65,
                    left: -3,
                    angle: 90
                }],
                '#': [{
                    top: 115,
                    left: 0,
                    angle: 0
                }, {
                    top: 175,
                    left: 0,
                    angle: 0
                }, {
                    top: 145,
                    left: -30,
                    angle: 90
                }, {
                    top: 145,
                    left: 30,
                    angle: 90
                }],
                '|': [{
                    top: 214,
                    left: -3,
                    angle: 90
                }, {
                    top: 65,
                    left: -3,
                    angle: 90
                }]
            };
            var STICKER_LIST = ['4f873b32af173a2903816e52', '4f86febfe77989117e00000a', "4f86fd27e77989117e000000", "4f86fd3ee77989117e000002", "4f86fe5de77989117e000007", "4f86fd32e77989117e000001", "4f86fe06e77989117e000004", "4f86fe33e77989117e000006", "4f86fea8e77989117e000009", "4f86fe84e77989117e000008", "4f86fe15e77989117e000005", "4f86fdede77989117e000003"];
            var STICKER_DICT = {};
            for (var i = 0; i < STICKER_LIST.length; i++) STICKER_DICT[STICKER_LIST[i]] = i;
            var STICKER_MAP = {
                '4f873b32af173a2903816e52': {
                    url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/reddit.png",
                    height: 125,
                    width: 90,
                    name: 'reddit'
                },
                '4f86febfe77989117e00000a': {
                    url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/twitter.png",
                    height: 76,
                    width: 90,
                    name: 'twitter'
                },
                "4f86fd27e77989117e000000": {
                    url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/codecademy.png",
                    height: 46,
                    width: 186,
                    name: 'codecademy'
                },
                "4f86fd3ee77989117e000002": {
                    url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/facebook.png",
                    height: 65,
                    width: 67,
                    name: 'facebook'
                },
                "4f86fe5de77989117e000007": {
                    url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/stackoverflow.png",
                    height: 66,
                    width: 226,
                    name: 'stackoverflow'
                },
                "4f86fd32e77989117e000001": {
                    url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/etsy.png",
                    height: 65,
                    width: 110,
                    name: 'etsy'
                },
                "4f86fe06e77989117e000004": {
                    url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/github.png",
                    height: 122,
                    width: 135,
                    name: 'github'
                },
                "4f86fe33e77989117e000006": {
                    url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/pinterest.png",
                    height: 49,
                    width: 165,
                    name: 'pinterest'
                },
                "4f86fea8e77989117e000009": {
                    url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/turntable.png",
                    height: 89,
                    width: 139,
                    name: 'turntable'
                },
                "4f86fe84e77989117e000008": {
                    url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/stickybits.png",
                    height: 53,
                    width: 167,
                    name: 'stickybits'
                },
                "4f86fe15e77989117e000005": {
                    url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/meetup.png",
                    height: 75,
                    width: 104,
                    name: 'meetup'
                },
                "4f86fdede77989117e000003": {
                    url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/foursquare.png",
                    height: 56,
                    width: 176,
                    name: 'foursquare'
                }
            };
            var _animate = {
                offset: 0,
                timer: null,
                speed: 1000,
                reverse: false,
                lastAnimation: null,
                lastAnimationTT: null,
                delayedUpdateTT: null,
                sync: false,
                delay: 0,
                cache: null,
            };
            var laptopMenuHover = null;

            function addLaptopSettings() {
                if ($('#ttx-laptop-menu-container').length === 0) {
                    updateLaptops();
                    $('#ttx-laptop-menu-button').parent().mouseover(function () {
                        if (laptopMenuHover !== null) {
                            clearTimeout(laptopMenuHover);
                            laptopMenuHover = null;
                        }
                        $(this).addClass('hover');
                        $('#ttx-laptop-speed-button').parent().removeClass('hover');
                    }).mouseout(function () {
                        var self = $(this);
                        laptopMenuHover = setTimeout(function () {
                            self.removeClass('hover');
                        }, 600);
                    });
                    $('.header-well-buttons').not('#ttx-laptop-menu-container').mouseover(function () {
                        if (laptopMenuHover !== null) {
                            clearTimeout(laptopMenuHover);
                            laptopMenuHover = null;
                        }
                        $('#ttx-laptop-menu-button').parent().removeClass('hover');
                        $('#ttx-laptop-speed-button').parent().removeClass('hover');
                    });
                } else {
                    updateLaptops();
                }
            }

            function toggleSync() {
                _animate.sync = !_animate.sync;
                $(this).toggleClass('active');
            }

            function stopAnimation() {
                if (_animate.timer !== null) {
                    clearTimeout(_animate.timer);
                    _animate.timer = null;
                }
                _animate.lastAnimation = null;
                hideLaptopSpeedDial();
                $('#ttx-laptop-menu-container').removeClass('active');
            }

            function reverseAnimation() {
                _animate.reverse = !_animate.reverse;
                if (_animate.reverse) {
                    $('#ttx-laptop-speed-button').addClass('reverse');
                } else {
                    $('#ttx-laptop-speed-button').removeClass('reverse');
                }
            }

            function animateLaptop() {
                var selection = settings.laptop.stickers.selected;
                var selectedAnimation = settings.laptop.stickers.animations[selection];
                _animate.offset = 0;
                if (selectedAnimation) {
                    if (isDJ(TT.ID)) {
                        if (_animate.timer !== null) {
                            clearTimeout(_animate.timer);
                            _animate.timer = null;
                        }
                        addLaptopSpeedDial();
                        $('#ttx-laptop-menu-container').addClass('active');
                        animateLaptopLoop(100);
                    } else if (selectedAnimation['type'] === 'custom' && selectedAnimation.frames.length) {
                        updateLaptopStickers(selectedAnimation.frames[0]);
                    }
                }
            }

            function animateLaptopLoop(speed) {
                var delay, now, frameDelay, effectiveFrame, effectiveLength, animation, adjustFrame;
                speed = speed || _animate.speed;
                if (speed === 0) {
                    _animate.timer = setTimeout(function () {
                        animateLaptopLoop();
                    }, 100);
                } else {
                    animation = settings.laptop.stickers.animations[settings.laptop.stickers.selected];
                    reversed = _animate.reverse ? -1 : 1;
                    if (_animate.sync) {
                        now = syncNow();
                        delay = _animate.speed - (now % _animate.speed);
                        frameDelay = delay;
                        delay -= _animate.delay;
                        while (delay < 0) {
                            delay += _animate.speed;
                            frameDelay += _animate.speed;
                        }
                        if (animation.type === 'text') {
                            var doubleLen = 2 * animation.text.display.length;
                            var tick = animation.text.tick;
                            adjustFrame = reversed * Math.round((djIndex * (6 / tick)));
                            effectiveLength = lcm(doubleLen, tick) / gcd(doubleLen, tick);
                        } else {
                            adjustFrame = 0;
                            effectiveLength = animation.frames.length;
                        }
                        effectiveFrame = ((now + frameDelay) % (_animate.speed * effectiveLength)) / _animate.speed;
                        effectiveFrame = mod(effectiveFrame + adjustFrame, effectiveLength);
                        if (_animate.reverse) {
                            effectiveFrame = (effectiveLength - effectiveFrame - 1);
                        }
                        _animate.offset = effectiveFrame;
                    } else
                        delay = speed;
                    _animate.timer = setTimeout(function () {
                        var animationLength;
                        if (animation.type === 'text') {
                            var textIndex, colorIndex;
                            var doubleLen = 2 * animation.text.display.length;
                            var tick = animation.text.tick;
                            animationLength = lcm(doubleLen, tick) / gcd(doubleLen, tick);
                            textIndex = (_animate.offset * animation.text.tick) % (2 * animation.text.display.length);
                            if (animation.text.colorEachLetter || typeof (adjustFrame) === 'undefined') {
                                colorIndex = _animate.offset % animation.text.colors.length;
                            } else {
                                colorIndex = mod(_animate.offset - adjustFrame, effectiveLength) % animation.text.colors.length;
                            }
                            renderStickerText('live', animation, textIndex, colorIndex);
                        } else {
                            updateLaptopStickers(animation.frames[_animate.offset]);
                            animationLength = animation.frames.length;
                        }
                        if (!_animate.sync)
                            _animate.offset = mod(_animate.offset + reversed, animationLength);
                        animateLaptopLoop();
                    }, delay);
                }
            }

            function updateLaptopStickers(new_placements) {
                var force = false;
                if (typeof new_placements === 'undefined') {
                    new_placements = _animate.cache;
                    if (_animate.delayedUpdateTT) {
                        clearTimeout(_animate.delayedUpdateTT);
                    }
                    _animate.delayedUpdateTT = null;
                    if (_animate.cache === null) return;
                    force = true;
                } else {
                    var cached = true;
                    if (_animate.cache !== null) {
                        if (_animate.cache.length === new_placements.length) {
                            for (var i = 0; i < _animate.cache.length; i++) {
                                if (!(_animate.cache[i].sticker_id === new_placements[i].sticker_id && _animate.cache[i].angle === new_placements[i].angle && _animate.cache[i].top === new_placements[i].top && _animate.cache[i].left === new_placements[i].left)) {
                                    cached = false;
                                    break;
                                }
                            }
                        } else
                            cached = false;
                    } else
                        cached = false; if (cached)
                        return;
                }
                var now = util.now();
                if (force || _animate.lastAnimationTT === null || now - _animate.lastAnimationTT > 15 * 1000) {
                    send({
                        api: 'sticker.place',
                        placements: new_placements,
                        is_dj: true,
                        roomid: TT.Room.roomId
                    });
                    _animate.lastAnimationTT = now;
                } else {
                    if (_animate.delayedUpdateTT === null)
                        _animate.delayedUpdateTT = setTimeout(function () {
                            updateLaptopStickers();
                        }, 15 * 1000 - (now - _animate.lastAnimationTT));
                }
                _animate.lastAnimation = now;
                Server.animate(new_placements);
                _animate.cache = $.extend(true, [], new_placements);
            }

            function addLaptopSpeedDial() {
                if ($('#ttx-laptop-menu').length === 0)
                    updateLaptops();
                if ($('#ttx-laptop-speed-dropdown').length) {
                    $('#ttx-laptop-sync-dropdown').insertBefore($('#ttx-laptop-menu').parent()).show();
                    $('#ttx-laptop-speed-dropdown').insertBefore($('#ttx-laptop-menu').parent()).show();
                } else {
                    var speedSlider = '<li class="dropdown-container" id="ttx-laptop-speed-dropdown">\
                                <div id="ttx-laptop-speed-label">1.00s</div>\
                                <div class="header-well-button" title="Animation Speed" id="ttx-laptop-speed-button"/>\
                                <ul class="floating-menu down" id="ttx-laptop-speed-menu">\
                                    <div id="ttx-laptop-speed-slider">\
                                        <div id="ttx-laptop-speed-knob" style="top:18px;"></div>\
                                        <div id="ttx-laptop-speed-fill" style="height:87px;">\
                                        </div>\
                                    </div>\
                                </ul>\
                            </li>';
                    var syncButton = '<li class="dropdown-container" id="ttx-laptop-sync-dropdown">\
                                <div class="header-well-button" title="Animation Sync" id="ttx-laptop-sync-button"/>\
                            </li>';
                    $('#ttx-laptop-menu').parent().before(syncButton).before(speedSlider);
                    $('#ttx-laptop-sync-button').click(toggleSync);
                    $('#ttx-laptop-speed-button').parent().mouseover(function () {
                        if (laptopMenuHover) {
                            clearTimeout(laptopMenuHover);
                            laptopMenuHover = null;
                        }
                        $(this).addClass('hover');
                        $('#ttx-laptop-menu-button').parent().removeClass('hover');
                        $('.header-well-buttons').not('#ttx-laptop-menu-container').find('.dropdown-container').removeClass('hover').find('.header-well-dropdown').hide();
                    }).mouseout(function () {
                        var self = $(this);
                        laptopMenuHover = setTimeout(function () {
                            self.removeClass('hover');
                        }, 600);
                    });
                    $('#ttx-laptop-speed-button').click(reverseAnimation);
                    $('#ttx-laptop-speed-knob').draggable({
                        containment: $('#ttx-laptop-speed-slider'),
                        axis: 'y',
                        drag: function (ev, ui) {
                            var offset = ui.position.top;
                            var displaySpeed;
                            if (offset === 100) {
                                _animate.speed = 0;
                                displaySpeed = '0.00s';
                            } else {
                                if (offset < 0) {
                                    offset = 0;
                                }
                                offset = Math.round(offset);
                                _animate.speed = 10 * (10 + offset * 5);
                                displaySpeed = msFormat(_animate.speed);
                            }
                            $('#ttx-laptop-speed-label').text(displaySpeed);
                            $('#ttx-laptop-speed-fill').css('height', (105 - ui.position.top) + 'px');
                        }
                    });
                }
            }

            function hideLaptopSpeedDial() {
                $('#ttx-laptop-speed-dropdown').hide().appendTo($('body'));
                $('#ttx-laptop-sync-dropdown').hide().appendTo($('body'));
            }

            function updateLaptops() {
                var laptops = settings.laptop.stickers.animations,
                    sorted_laptops = Object.keys(laptops).sort(function (a, b) {
                        return a.toLowerCase().localeCompare(b.toLowerCase());
                    });
                var selected = settings.laptop.stickers.selected;
                var now = util.now();
                var laptopDivs = '';
                var count = 0;
                var toDelete = [];
                for (var i = 0; i < sorted_laptops.length; i++) {
                    if (typeof laptops[sorted_laptops[i]].frames === 'undefined') {
                        if (selected === sorted_laptops[i]) {
                            settings.laptop.stickers.selected = '';
                        }
                        continue;
                    }
                    count++;
                    laptopDivs += '<li id="ttx-menu-item' + count + '-' + now + '" class="option ttx-menu-item' + (sorted_laptops[i] === selected ? ' selected' : '') + '"><span class="ttx-menu-name">' + sorted_laptops[i] + '</span><div class="ttx-menu-edit"></div></li>';
                }
                var content = '<li class="ttx-menu-item option special add" style="margin-bottom: 2px;text-align:center;">New Laptop</li><li id="ttx-laptop-menu-scrollable"><ul>' + laptopDivs + '</ul></li>';
                if ($('#ttx-laptop-menu-container').length === 0) {
                    $('#volume-control').before('<ul class="header-well-buttons" id="ttx-laptop-menu-container">\
                                            <li class="dropdown-container">\
                                                <div class="header-well-button" id="ttx-laptop-menu-button"/>\
                                                <ul class="floating-menu down" id="ttx-laptop-menu">' + content + '</ul>\
                                            </li>\
                                        </ul>');
                } else {
                    $('#ttx-laptop-menu').html(content);
                }
                $('#ttx-laptop-menu-scrollable ul').css('max-height', $(window).height() - 105);
                $('#ttx-laptop-menu .ttx-menu-edit').click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var animation = $(this).parent().find('.ttx-menu-name').text();
                    if (settings.laptop.stickers.animations[animation]) {
                        settings.laptop.stickers.animations[animation].name = animation;
                        customStickerEditor(animation);
                    }
                });
                $('#ttx-laptop-menu .ttx-menu-item').click(function (e) {
                    if ($(this).hasClass('add')) {
                        customStickerEditor();
                        return;
                    }
                    var name = $(this).find('.ttx-menu-name').text();
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                        settings.laptop.stickers.selected = '';
                        saveSettings();
                        stopAnimation();
                        updateLaptopStickers([]);
                    } else {
                        $(this).parent().children().removeClass('selected');
                        $(this).addClass('selected');
                        if (settings.laptop.stickers.animations[name]) {
                            settings.laptop.stickers.selected = name;
                            saveSettings();
                            animateLaptop();
                        }
                    }
                });
            }

            function importLaptop(e) {
                if (typeof $(this).data('laptop') !== 'undefined') {
                    var laptopData = $(this).data('laptop');
                    var laptopName = $(this).data('name');
                    if (settings.laptop.stickers.animations[laptopName]) {
                        var ok = confirm('You already have a laptop called ' + laptopName + ', do you want to save another copy?');
                        if (!ok)
                            return;
                    }
                    while (settings.laptop.stickers.animations[laptopName])
                        laptopName = laptopName + '_';
                    settings.laptop.stickers.animations[laptopName] = $.extend(true, {}, laptopData);
                    saveSettings();
                    updateLaptops();
                    $(this).text('Saved as: ' + laptopName).addClass('imported');
                }
            }

            function addProfileLaptopImport(userData, name, placements) {
                var laptop = userData.laptop;
                laptop in {
                    iphone: 1,
                    android: 1
                } && (laptop = "mac");
                name.after('<div style="display:none;" id="ttx-profile-userid">' + userData.userid + '</div>');
                name.after('<div style="display:none;" id="ttx-profile-userlaptop">' + laptop + '</div>');
                if (!placements) return;
                name.parent().css({
                    'position': 'relative'
                });
                var laptopName = userData.name + "s Laptop";
                var new_frames = [];
                if (typeof placements === 'undefined')
                    new_frames.push([]);
                else
                    new_frames.push(placements);
                var new_laptop = {
                    name: laptopName,
                    type: 'custom',
                    selected: 1,
                    speed: 500,
                    text: {
                        display: '',
                        colors: '',
                        colorEachLetter: true,
                        tick: 1
                    },
                    frames: new_frames
                };
                $('<div style="position:absolute;right:-11px;top:-19px;" data-laptop=\'' + JSON.stringify(new_laptop) + '\' data-name="' + laptopName + '" class="ttx-import">Import</div>').insertAfter(name).click(importLaptop);
            }

            function previewStickers(laptopView, newLaptopAnimation) {
                var laptopView = laptopView || $('#laptopView');
                if (newLaptopAnimation.type === 'custom') {
                    if (newLaptopAnimation.selected === newLaptopAnimation.frames.length) {
                        _editor.timer = setTimeout(function () {
                            $('#ttx-laptop-start').click();
                            previewStickers(laptopView, newLaptopAnimation);
                        }, 250);
                    } else {
                        _editor.timer = setTimeout(function () {
                            $('#ttx-laptop-scroll-right').click();
                            previewStickers(laptopView, newLaptopAnimation);
                        }, 250);
                    }
                } else {
                    var preview_color_index = 0;
                    var preview_text_index = 0;
                    ticks = newLaptopAnimation.text.tick;
                    text_len = 2 * newLaptopAnimation.text.display.length;
                    color_len = newLaptopAnimation.text.colors.length;
                    _editor.timer = setInterval(function () {
                        renderStickerText(laptopView, newLaptopAnimation, preview_text_index, preview_color_index);
                        preview_text_index = ((preview_text_index + ticks) % text_len);
                        if (newLaptopAnimation.text.colorEachLetter) {
                            odd = (preview_text_index % 2) === 1;
                            preview_color_index = ((preview_color_index + Math.floor((ticks + (odd ? 1 : 0)) / 2)) % color_len);
                        } else {
                            preview_color_index = ((preview_color_index + 1) % color_len);
                        }
                    }, 250);
                }
            }

            function pasteStickers(laptop, frame) {
                renderStickers(laptop, frame);
            }

            function copyStickers(laptop) {
                var result = [];
                var count = 0;
                laptop.children().each(function () {
                    if (count === 20) {
                        return;
                    }
                    var stickerDiv = $(this);
                    var sticker_id = $(this).data('sticker_id');
                    var angle = $(this).data('angle');
                    var left = parseInt($(this).css('left').replace(/px/, ''));
                    var top = parseInt($(this).css('top').replace(/px/, ''));
                    result.push({
                        sticker_id: sticker_id,
                        angle: angle,
                        left: left,
                        top: top
                    });
                    count += 1;
                });
                return result;
            }

            function saveStickers(laptop, animation, selected) {
                animation.frames[selected] = copyStickers(laptop);
            }

            function clearStickers(laptop) {
                laptop.children().each(function () {
                    if (typeof $(this).attr('id') !== 'undefined') {
                        $(this).remove();
                    } else {
                        $(this).mouseover();
                        $('#boundingBoxX').mouseup();
                    }
                });
                setTimeout(function () {
                    $('#laptopScreen .boundingBox').hide()
                }, 100);
            }

            function renderStickers(laptop, placements) {
                if (laptop === 'live') {
                    updateLaptopStickers(placements);
                    return;
                }
                clearStickers(laptop);
                for (var i = 0; i < placements.length; i++) {
                    var sticker = placements[i];
                    var stickerID = sticker.sticker_id;
                    var stickerData = STICKER_MAP[stickerID];
                    var stickerDiv = '<div id="ttxSticker' + i + '" class="sticker" style="background-image:url(' + stickerData.url + '); height: ' + stickerData.height + 'px; width: ' + stickerData.width + 'px; top: ' + sticker.top + 'px; left: ' + sticker.left + 'px; -webkit-transform: rotate(' + sticker.angle + 'deg); background-position: initial initial; background-repeat: initial initial;"></div>';
                    laptop.append(stickerDiv);
                    $('#ttxSticker' + i).data('angle', sticker.angle);
                    $('#ttxSticker' + i).data('sticker_id', stickerID);
                }
            }

            function renderStickerText(laptop, animation, start_index, color_index) {
                start_index = (typeof start_index !== 'undefined') ? start_index : 0;
                color_index = (typeof color_index !== 'undefined') ? color_index : 0;
                var full_color_text = animation.text.colors.toUpperCase();
                var full_text = animation.text.display.toUpperCase();
                var text = full_text.substring(Math.floor(start_index / 2));
                var color_text = full_color_text.substring(color_index);
                var offset = 0;
                if (start_index % 2 === 1) {
                    offset = -1 * (LETTER_WIDTH / 2)
                }
                var letter_limit = (offset === 0 ? 3 : 4);
                var text_len = text.length;
                var full_len = full_text.length;
                if (full_len === 0) {
                    renderStickers(laptop, []);
                    return;
                }
                var c = 0;
                while (text_len < 4) {
                    text = text + full_text.charAt(c)
                    text_len = text.length
                    c = ((c + 1) % full_len);
                }
                var color_text_len = color_text.length;
                var full_color_text_len = full_color_text.length;
                if (full_color_text_len === 0) {
                    full_color_text = DEFAULT_COLOR;
                }
                c = 0;
                if (animation.text.colorEachLetter) {
                    while (color_text_len < 4) {
                        color_text = color_text + full_color_text.charAt(c);
                        color_text_len = color_text.length;
                        c = ((c + 1) % full_color_text_len);
                    }
                }
                var stickers_placed = 0;
                var letters_placed = 0;
                var new_placements = [];
                for (var i = 0; i < text_len; i++) {
                    var color = (animation.text.colorEachLetter ? color_text[i] : color_text[0]);
                    if (typeof COLOR_MAP[color] !== 'undefined')
                        color = COLOR_MAP[color];
                    else
                        color = random_item(COLOR_MAP);
                    var c = text.charAt(i);
                    var map_placements = LETTER_MAP[c];
                    var placements = [];
                    if (typeof map_placements !== 'undefined') {
                        if (i == 0 && offset !== 0) {
                            for (var m = 0; m < map_placements.length; m += 1) {
                                mp = map_placements[m];
                                if (mp.left + (LETTER_WIDTH / 2) * (1 + Math.cos(mp.angle * Math.PI / 180)) > (LETTER_WIDTH / 2) - 7)
                                    placements.push({
                                        left: mp.left,
                                        top: mp.top,
                                        angle: mp.angle
                                    });
                            }
                        } else if (i == 3) {
                            for (var m = 0; m < map_placements.length; m += 1) {
                                mp = map_placements[m];
                                if (mp.left + (LETTER_WIDTH / 2) * (1 - Math.cos(mp.angle * Math.PI / 180)) < (LETTER_WIDTH / 2) + 7)
                                    placements.push({
                                        left: mp.left,
                                        top: mp.top,
                                        angle: mp.angle
                                    });
                            }
                        } else {
                            placements = map_placements;
                        }
                        if (stickers_placed + placements.length > STICKER_LIMIT || letters_placed > letter_limit) {
                            break;
                        }
                        for (var p = 0; p < placements.length; p += 1) {
                            var place = placements[p];
                            var new_place = {};
                            $.extend(new_place, place, {
                                sticker_id: color
                            });
                            new_place.left = new_place.left + offset + (LETTER_WIDTH * letters_placed);
                            new_placements.push(new_place);
                        }
                        stickers_placed += placements.length;
                        letters_placed += 1;
                    }
                }
                renderStickers(laptop, new_placements);
            }
            var stickerWaitTimer = null;

            function customStickerEditor(animation) {
                if (stickerWaitTimer === null) {
                    TT.sticker.showEditor({
                        shouldRoute: !0
                    });
                    stickerWaitTimer = setTimeout(customStickerEditorComplete(animation), 250);
                } else {
                    setTimeout(function () {
                        if (stickerWaitTimer === null) {
                            clearTimeout(stickerWaitTimer);
                            stickerWaitTimer = null;
                        }
                    }, 10000);
                }
            }
            var _editor = {
                copy: null,
                timer: null
            };

            function modalAlert(modal, message) {
                var alrt = $(util.buildTree(["div.alert.", ["div", message]]));
                alrt.css({
                    display: "block",
                    visibility: "hidden"
                }), modal.find(".content").prepend(alrt);
                var o = alrt.outerHeight(!0);
                alrt.css({
                    top: -o,
                    visibility: "visible",
                    opacity: 0
                }), alrt.addClass("transitioning"), window.setTimeout(function () {
                    alrt.css({
                        top: "0",
                        opacity: 1
                    })
                }), setTimeout(function () {
                    alrt.remove();
                }, 3e3)
            }

            function customStickerEditorComplete(animation) {
                if ($('#stickerModal').is(':visible')) {
                    var modal = $('#stickerModal');
                    modal.find('.content').css('padding-top', '50px');
                    var originalAnimation, newAnimation, laptop, frameCounter, picker, laptopView, boundingBox;
                    animation = animation || null;
                    if (animation === null) {
                        newAnimation = {
                            name: '',
                            type: 'custom',
                            speed: 500,
                            text: {
                                display: '',
                                colors: '',
                                colorEachLetter: true,
                                tick: 1
                            },
                            frames: [
                                []
                            ]
                        };
                        modal.find('.title').text('Create a New Laptop');
                    } else {
                        originalAnimation = settings.laptop.stickers.animations[animation];
                        newAnimation = $.extend(true, {}, originalAnimation);
                        modal.find('.title').text('Edit Your Laptop');
                    }
                    laptop = modal.find('#laptop');
                    frameCounter = modal.find('h3:contains("Your Stickers")');
                    picker = modal.find('#picker');
                    laptopView = modal.find('#laptopView');
                    boundingBox = laptop.find('.boundingBox');
                    modal.find('#remainingCount').hide();
                    frameCounter.prependTo(laptop).css({
                        'width': '708px',
                        'text-align': 'center',
                        'z-index': 110,
                        'position': 'absolute',
                        'top': '5px',
                        'left': '0px'
                    });
                    newAnimation.selected = 1;
                    if (animation !== null) {
                        if (newAnimation.type === 'text') {
                            renderStickerText(laptopView, newAnimation);
                        } else {
                            renderStickers(laptopView, newAnimation.frames[newAnimation.selected - 1]);
                        }
                    } else {
                        clearStickers(laptopView);
                    }
                    laptop.before('<div id="ttx-laptop-settings" style="width:100%; padding-bottom:40px">\
                    <div><div style="display:inline-block; margin: 8px; width:80px">Name:</div><input style="width: 300px; height:10px; position:relative;" id="ttx-laptop-name" type="text" value="' + newAnimation.name + '"/></div>\
                    <div><div style="display:inline-block; margin: 8px; width:80px">Animation:</div><input name="ttx-laptop-animation" style="margin-right:5px" type="radio" value="text" ' + (newAnimation.type === 'text' ? 'checked' : '') + '/>text<input name="ttx-laptop-animation" type="radio" style="margin-left:12px; margin-right:5px" value="custom" ' + (newAnimation.type === 'custom' ? 'checked' : '') + '/>custom</div>\
                    </div>');
                    $('<div id="ttx-laptop-scroll-left" title="Previous Frame" class="ttx-laptop-editor-button inactive"></div>').appendTo(laptop);
                    $('<div id="ttx-laptop-scroll-right" title="Next Frame" class="ttx-laptop-editor-button inactive"></div>').appendTo(laptop);
                    $('<div id="ttx-laptop-cut" title="Cut Frame" class="ttx-laptop-editor-button inactive"></div>').appendTo(laptop);
                    $('<div id="ttx-laptop-copy" title="Copy Frame" class="ttx-laptop-editor-button"></div>').appendTo(laptop);
                    $('<div id="ttx-laptop-paste" title="Paste Frame" class="ttx-laptop-editor-button inactive"></div>').appendTo(laptop);
                    $('<div id="ttx-laptop-insert" title="Insert Frame" class="ttx-laptop-editor-button"></div>').appendTo(laptop);
                    $('<div id="ttx-laptop-start" title="First Frame" class="ttx-laptop-editor-button inactive"></div>').appendTo(laptop);
                    $('<div id="ttx-laptop-end" title="Last Frame" class="ttx-laptop-editor-button inactive"></div>').appendTo(laptop);
                    if (_editor.copy !== null) {
                        $('#ttx-laptop-paste').removeClass('inactive');
                    }
                    if (newAnimation.frames.length > 1) {
                        $('#ttx-laptop-scroll-right,#ttx-laptop-end,#ttx-laptop-cut').removeClass('inactive');
                    }
                    var save_button = '<div id="ttx-laptop-save" class="ttx-laptop-editor-button" title="Save"><div style="width:100%;height:100%;" id="ttx-laptop-clip"></div></div>';
                    var preview_button = '<div class="ttx-laptop-editor-button" title="Preview" id="ttx-laptop-preview"></div>';
                    var delete_button = '<div class="ttx-laptop-editor-button" title="Delete" id="ttx-laptop-delete"></div>';
                    var top_buttons = modal.find('.buttons').css({
                        position: 'absolute',
                        top: '35px',
                        right: '15px'
                    });
                    if (originalAnimation === null) {
                        top_buttons.html(preview_button + save_button);
                    } else {
                        top_buttons.html(preview_button + save_button + delete_button);
                    }
                    picker.before('<div id="ttx-laptop-text-settings" style="display:none; margin-bottom:10px; width:100%; padding-top:10px;">\
                    <div><div style="display:inline-block; margin: 8px; width:80px">Text:</div><input style="width: 300px; height:10px; position:relative; margin-right:10px" id="ttx-laptop-text" type="text" value="' + newAnimation.text.display + '"/>tick number: <input type="text" id="ttx-laptop-tick" style="width:30px;height:10px;" value="' + newAnimation.text.tick + '"/></div>\
                    <div><div style="display:inline-block; margin: 8px; width:80px">Colors:</div><input style="width: 300px; height:10px; position:relative; margin-right:10px" id="ttx-laptop-colors" type="text" value="' + newAnimation.text.colors + '"/>each letter: <input type="checkbox" id="ttx-laptop-color-each" ' + (newAnimation.text.colorEachLetter ? 'checked="checked"' : '') + '</div>\
                    </div>');
                    if (newAnimation.type === 'text') {
                        $('#ttx-laptop-text-settings').show();
                    }
                    $('#ttx-laptop-delete').bind('click', function () {
                        var answer = confirm('Are you sure you want to delete laptop ' + animation + '?');
                        if (answer === true) {
                            $('#overlay').html('').hide();
                            delete settings.laptop.stickers.animations[animation];
                            updateLaptops();
                            saveSettings();
                        }
                    });
                    $('#ttx-laptop-preview').click(function () {
                        if (_editor.timer === null) {
                            if (newAnimation.type === 'custom') {
                                saveStickers(laptopView, newAnimation, newAnimation.selected - 1);
                                $('#ttx-laptop-start').click();
                                previewStickers(laptopView, newAnimation);
                            } else {
                                newAnimation.text.colors = $('#ttx-laptop-colors').val();
                                newAnimation.text.display = $('#ttx-laptop-text').val();
                                newAnimation.text.tick = parseInt($('#ttx-laptop-tick').val());
                                if (isNaN(newAnimation.text.tick)) {
                                    newAnimation.text.tick = 3;
                                }
                                newAnimation.text.colorEachLetter = $('#ttx-laptop-color-each').is(':checked');
                                previewStickers(laptopView, newAnimation);
                            }
                            $(this).addClass('stop');
                        } else {
                            clearTimeout(_editor.timer);
                            _editor.timer = null;
                            $(this).removeClass('stop');
                        }
                    });
                    if (_editor.timer !== null) {
                        $('#ttx-laptop-preview').addClass('stop');
                    }
                    var clipboard = new ZeroClipboard.Client();
                    clipboard.setCSSEffects(true);
                    clipboard.glue('ttx-laptop-clip', 'ttx-laptop-save');
                    clipboard.addEventListener('mouseDown', function () {
                        var name = $('#ttx-laptop-name').val();
                        if (name === '') {
                            alert('Please pick a name for your new laptop!');
                            return;
                        }
                        if (animation !== null && name != animation && name !== '') {
                            var answer = confirm('You were editing laptop ' + animation + ', do you want to change the name to ' + name + '?');
                            if (!answer) {
                                return;
                            }
                            if (settings.laptop.stickers.animations[name]) {
                                alert('You already have a laptop called ' + name + '! Delete it first');
                                return;
                            }
                            delete settings.laptop.stickers.animations[animation];
                        }
                        saveStickers(laptopView, newAnimation, newAnimation.selected - 1);
                        newAnimation.text.colors = $('#ttx-laptop-colors').val();
                        newAnimation.text.display = $('#ttx-laptop-text').val();
                        newAnimation.text.tick = parseInt($('#ttx-laptop-tick').val());
                        if (isNaN(newAnimation.text.tick)) {
                            newAnimation.text.tick = 3;
                        }
                        newAnimation.text.colorEachLetter = $('#ttx-laptop-color-each').is(':checked');
                        newAnimation.name = name;
                        settings.laptop.stickers.animations[name] = newAnimation;
                        var clipObject = {};
                        clipObject[name] = newAnimation;
                        var clipText = 'XMSG!' + btoa(JSON.stringify(clipObject));
                        clipboard.setText(clipText);
                        modalAlert(modal, 'Laptop saved and copied to clipboard.');
                        updateLaptops();
                        saveSettings();
                    });
                    $('#remainingCount').hide();
                    if (newAnimation.type === 'text') {
                        $('#picker').hide();
                        $('.ttx-laptop-editor-button').not('#ttx-laptop-preview,#ttx-laptop-save,#ttx-laptop-delete').hide();
                        frameCounter.hide();
                    } else {
                        $('#ttx-laptop-text-settings').hide();
                    }
                    $('input[name="ttx-laptop-animation"]', $('#ttx-laptop-settings')).change(function (e) {
                        var new_type = $(this).val();
                        newAnimation.type = new_type;
                        if (new_type === 'text') {
                            $('#picker').hide();
                            $('.ttx-laptop-editor-button').not('#ttx-laptop-preview,#ttx-laptop-save,#ttx-laptop-delete').hide();
                            frameCounter.hide();
                            $('#ttx-laptop-text-settings').show();
                            newAnimation.text.colors = $('#ttx-laptop-colors').val();
                            newAnimation.text.display = $('#ttx-laptop-text').val();
                            newAnimation.text.tick = parseInt($('#ttx-laptop-tick').val());
                            if (isNaN(newAnimation.text.tick)) {
                                newAnimation.text.tick = 3;
                            }
                            newAnimation.text.colorEachLetter = $('#ttx-laptop-color-each').is(':checked');
                            renderStickerText(laptopView, newAnimation);
                        } else {
                            $('#picker').show();
                            $('.ttx-laptop-editor-button').show();
                            frameCounter.show();
                            $('#ttx-laptop-text-settings').hide();
                            renderStickers(laptopView, newAnimation.frames[newAnimation.selected - 1]);
                        }
                    });
                    $('#ttx-laptop-copy').click(function (e) {
                        _editor.copy = copyStickers(laptopView);
                        $('#ttx-laptop-paste').removeClass('inactive');
                    });
                    $('#ttx-laptop-paste').click(function (e) {
                        if ($(this).hasClass('inactive')) {
                            return;
                        }
                        if (_editor.copy !== null) {
                            pasteStickers(laptopView, _editor.copy);
                        }
                    });
                    $('#ttx-laptop-insert').click(function (e) {
                        saveStickers(laptopView, newAnimation, newAnimation.selected - 1);
                        if (newAnimation.selected === newAnimation.frames.length) {
                            newAnimation.frames.push([]);
                        } else {
                            var framesAfter = newAnimation.frames.slice(newAnimation.selected);
                            var framesBefore = newAnimation.frames.slice(0, newAnimation.selected);
                            framesBefore.push([]);
                            newAnimation.frames = framesBefore.concat(framesAfter);
                        }
                        newAnimation.selected += 1;
                        clearStickers(laptopView);
                        frameCounter.text('Frame ' + newAnimation.selected + ' of ' + newAnimation.frames.length);
                        $('#ttx-laptop-cut,#ttx-laptop-start,#ttx-laptop-scroll-left').removeClass('inactive');
                    });
                    $('#ttx-laptop-cut').click(function (e) {
                        $('#ttx-laptop-copy').click();
                        var numFrames = newAnimation.frames.length;
                        var selected = newAnimation.selected;
                        if (numFrames === 1) {
                            return;
                        }
                        if (numFrames === 2) {
                            $(this).addClass('inactive');
                            $('#ttx-laptop-start,#ttx-laptop-end,#ttx-laptop-scroll-left,#ttx-laptop-scroll-right').addClass('inactive');
                        }
                        if (selected === numFrames) {
                            newAnimation.selected -= 1;
                            newAnimation.frames.pop();
                        } else {
                            newAnimation.frames = newAnimation.frames.slice(0, newAnimation.selected - 1).concat(newAnimation.frames.slice(newAnimation.selected));
                        }
                        renderStickers(laptopView, newAnimation.frames[newAnimation.selected - 1]);
                        frameCounter.text('Frame ' + newAnimation.selected + ' of ' + newAnimation.frames.length);
                    });
                    $('#ttx-laptop-scroll-right').click(function (e) {
                        if ($(this).hasClass('inactive')) {
                            return;
                        }
                        saveStickers(laptopView, newAnimation, newAnimation.selected - 1);
                        newAnimation.selected += 1;
                        renderStickers(laptopView, newAnimation.frames[newAnimation.selected - 1]);
                        if (newAnimation.selected === newAnimation.frames.length) {
                            $(this).addClass('inactive');
                            $('#ttx-laptop-end').addClass('inactive');
                        }
                        frameCounter.text('Frame ' + newAnimation.selected + ' of ' + newAnimation.frames.length);
                        $('#ttx-laptop-scroll-left,#ttx-laptop-start').removeClass('inactive');
                    }).mouseover(function () {
                        boundingBox.hide();
                    });
                    $('#ttx-laptop-scroll-left').click(function (e) {
                        if ($(this).hasClass('inactive')) {
                            return;
                        }
                        saveStickers(laptopView, newAnimation, newAnimation.selected - 1);
                        newAnimation.selected -= 1;
                        renderStickers(laptopView, newAnimation.frames[newAnimation.selected - 1]);
                        if (newAnimation.selected === 1) {
                            $(this).addClass('inactive');
                            $('#ttx-laptop-start').addClass('inactive');
                        }
                        frameCounter.text('Frame ' + newAnimation.selected + ' of ' + newAnimation.frames.length);
                        $('#ttx-laptop-scroll-right,#ttx-laptop-end').removeClass('inactive');
                    }).mouseover(function () {
                        boundingBox.hide();
                    });
                    $('#ttx-laptop-start').click(function (e) {
                        saveStickers(laptopView, newAnimation, newAnimation.selected - 1);
                        $(this).addClass('inactive');
                        $('#ttx-laptop-scroll-left').addClass('inactive');
                        if (newAnimation.frames.length > 1) {
                            $('#ttx-laptop-end').removeClass('inactive');
                            $('#ttx-laptop-scroll-right').removeClass('inactive');
                        }
                        newAnimation.selected = 1;
                        renderStickers(laptopView, newAnimation.frames[newAnimation.selected - 1]);
                        frameCounter.text('Frame ' + newAnimation.selected + ' of ' + newAnimation.frames.length);
                    });
                    $('#ttx-laptop-end').click(function (e) {
                        saveStickers(laptopView, newAnimation, newAnimation.selected - 1);
                        $(this).addClass('inactive');
                        $('#ttx-laptop-scroll-right').addClass('inactive');
                        if (newAnimation.frames.length > 1) {
                            $('#ttx-laptop-start').removeClass('inactive');
                            $('#ttx-laptop-scroll-left').removeClass('inactive');
                        }
                        newAnimation.selected = newAnimation.frames.length;
                        renderStickers(laptopView, newAnimation.frames[newAnimation.selected - 1]);
                        frameCounter.text('Frame ' + newAnimation.selected + ' of ' + newAnimation.frames.length);
                    });
                    frameCounter.text('Frame ' + newAnimation.selected + ' of ' + newAnimation.frames.length);
                    stickerWaitTimer = null;
                } else {
                    setTimeout(function () {
                        customStickerEditorComplete(animation)
                    }, 50);
                }
            }

            function setLaptop(laptop) {
                send({
                    api: 'user.modify',
                    laptop: laptop
                });
            }
            return {
                'send': send,
                'TT': TT,
                'Server': Server,
                'Settings': Settings,
                'load': load,
                'unload': unload,
                'reload': reload,
                'Custom': Custom,
                'Viz': Viz
            }
        }
    })();
    TTX = new TurntableX();
    TTX.load();
});
