!function(){function e(e){return l+"-"+e}function n(e){return document.getElementById(e)}function t(e,n,t){var a=document.createElement(e);for(var i in t)a[i]=t[i];return n.appendChild(a),a}function a(e,n){var t={type:e};return void 0!==n&&(t.data=n),t}function i(){var e=p[c];if(e.prepare(),!e.isStart()){u.disable();var n=setInterval(function(){e.isStart()&&(u.enable(),clearInterval(n))},500)}u.player=e}function r(){var n=t("article",document.body,{id:l}),i=t("button",n,{id:e("toggle"),innerHTML:'<span class="fa fa-heart"></span>'});i.onclick=function(){n.classList.toggle("active")};var r=t("input",n,{id:e("local"),type:"text",placeholder:"Peer ID",readOnly:!0});r.onfocus=function(){return this.select(),!1};var o=t("input",n,{id:e("remote"),type:"text",placeholder:"Remote peer ID"}),s=t("button",n,{id:e("connect"),innerHTML:'<span class="fa fa-plug"></span>'});s.onclick=function(){return u.connect(o.value),!1};var c=t("button",n,{id:e("disconnect"),hidden:!0,innerHTML:'<span class="fa fa-close"></span>'});c.onclick=function(){return u.disconnect(),!1};var p=t("button",n,{id:e("play"),innerHTML:'<span class="fa fa-play"></span>',title:"Play"});p.onclick=function(){return u.player.play(),u.remote.send(a("PLAY")),!1};var y=t("button",n,{id:e("pause"),innerHTML:'<span class="fa fa-pause"></span>',title:"Pause"});y.onclick=function(){return u.player.pause(),u.remote.send(a("PAUSE")),!1};var f=t("button",n,{id:e("sync"),innerHTML:'<span class="fa fa-refresh"></span>',title:"Sync with me"});f.onclick=function(){var e=u.player.getTime();return u.player.seek(e),u.remote.send(a("SEEK",e)),!1};var d=t("button",n,{id:e("restart"),innerHTML:'<span class="fa fa-step-backward"></span>',title:"Restart"});d.onclick=function(){return u.player.restart?u.player.restart():u.player.seek(0),u.remote.send(a("SEEK",0)),!1},u.ui={main:n,local:r,remote:o,connect:s,disconnect:c,toggle:i,play:p,pause:y,sync:f,restart:d}}function o(){if(!window.Peer)throw"Cannot initialize peer.";var e=new Peer({key:"kl2e8piw363qsemi",config:{iceServers:[{url:"stun:stun.turnservers.com:3478"},{url:"stun:stun01.sipphone.com"},{url:"stun:stun.ekiga.net"},{url:"stun:stun.fwdnet.net"},{url:"stun:stun.ideasip.com"},{url:"stun:stun.iptel.org"},{url:"stun:stun.rixtelecom.se"},{url:"stun:stun.schlund.de"},{url:"stun:stun.l.google.com:19302"},{url:"stun:stun1.l.google.com:19302"},{url:"stun:stun2.l.google.com:19302"},{url:"stun:stun3.l.google.com:19302"},{url:"stun:stun4.l.google.com:19302"},{url:"stun:stunserver.org"},{url:"stun:stun.softjoys.com"},{url:"stun:stun.voiparound.com"},{url:"stun:stun.voipbuster.com"},{url:"stun:stun.voipstunt.com"},{url:"stun:stun.voxgratia.org"},{url:"stun:stun.xten.com"},{url:"turn:numb.viagenie.ca",credential:"muazkh",username:"webrtc@live.com"},{url:"turn:192.158.29.39:3478?transport=udp",credential:"JZEOEt2V3Qb0y27GRntt2u2PAYA=",username:"28224511:1379330808"},{url:"turn:192.158.29.39:3478?transport=tcp",credential:"JZEOEt2V3Qb0y27GRntt2u2PAYA=",username:"28224511:1379330808"}]}});e.on("open",function(e){u.ui.local.value=e}),e.on("connection",s),u.peer=e}function s(e){function n(){o=Date.now(),e.send(a("REQ"))}function t(){e.send(a("CHECK"))}function i(){return location.host+location.pathname}u.connection=e;var r=u.ui;r.remote.value=e.peer,r.remote.disabled=!0,r.connect.hidden=!0,r.disconnect.hidden=!1;var o=0,s=0,l=0,c=0;e.on("data",function(t){var r=u.player;switch(console.log(t),t.type){case"REQ":e.send(a("ACK"));break;case"ACK":l=Date.now()-o,c++,s+=l,console.log(l+"ms"),setTimeout(function(){n(e)},1e3);break;case"CHECK":e.send(a("PATH",i()));break;case"PATH":t.data!==i()&&(console.log("Not on the same page."),e.close());break;case"MSG":console.log("Remote: "+t.data);break;case"SEEK":r.seek(parseInt(t.data,10));break;case"PAUSE":r.pause();break;case"PLAY":r.play()}}),n(),t(),e.on("close",function(){r.remote.value="",r.remote.disabled=!1,r.connect.hidden=!1,r.disconnect.hidden=!0,u.connection=null})}var u={},l="coplay";if(!n(l)){var c=location.host.match(/(youku|sohu|tudou|qq|iqiyi|youtube|bilibili).com/);if(c){c=c[1];var p={};p.youku={prepare:function(){},play:function(){PlayerPause(!1)},pause:function(){PlayerPause(!0)},seek:function(e){PlayerSeek(e)},isStart:function(){return playerStart},getTime:function(){return PlayerInfo().time}},p.tudou={prepare:function(){this.player=n("tudouHomePlayer")},play:function(){this.player.notify("play")},pause:function(){this.player.notify("pause")},seek:function(e){this.player.notify("seek",[-86400]),this.player.notify("seek",[e])},restart:function(){this.player.notify("replay")},isStart:function(){return!0},getTime:function(){return this.player.notify("getPlaytime")}},p.qq={prepare:function(){this.player=PLAYER},play:function(){this.player.play()},pause:function(){this.player.pause()},seek:function(e){this.player.seekTo(e)},isStart:function(){return-1!==this.player.getPlayerState},getTime:function(){return this.player.getCurrentTime()}},p.iqiyi={prepare:function(){this.player=n("flash")},play:function(){this.player.resumeQiyiVideo()},pause:function(){this.player.pauseQiyiVideo()},seek:function(e){this.player.seekQiyiVideo(e)},isStart:function(){return!0},getTime:function(){return JSON.parse(this.player.getQiyiPlayerInfo()).currentTime/1e3}},p.sohu={prepare:function(){this.player=n("player")||n("player_ob")},play:function(){this.player.playVideo()},pause:function(){this.player.pauseVideo()},seek:function(e){this.player.seekTo(e)},isStart:function(){return!0},getTime:function(){return this.player.playedTime()}},p.youtube={prepare:function(){this.player=n("movie_player")},play:function(){this.player.playVideo()},pause:function(){this.player.pauseVideo()},seek:function(e){this.player.seekTo(e,!0)},isStart:function(){return!0},getTime:function(){return this.player.getCurrentTime()}},p.bilibili={prepare:function(){this.player=n("player_placeholder")},play:function(){this.isStart()||this.player.jwPlay()},pause:function(){this.isStart()&&this.player.jwPause()},seek:function(e){this.player.jwSeek(e)},isStart:function(){return"PLAYING"===this.player.jwGetState()},getTime:function(){return this.player.jwGetPosition()}},u.remote={send:function(){var e=u.connection;e&&e.send.apply(e,arguments)}},u.init=function(){var e=n(l);e||(r(),i(),o())},u.setDisabled=function(e){var n=u.ui;n.play.disabled=e,n.pause.disabled=e,n.sync.disabled=e,n.restart.disabled=e},u.enable=function(){u.setDisabled(!1)},u.disable=function(){u.setDisabled(!0)},u.connect=function(e){var n=u.peer.connect(e,{label:"coplay",serialization:"json",reliable:!1});n.on("open",function(){s(n)})},u.disconnect=function(){var e=u.connection;e&&e.close()},window.coplay=u,u.init()}}}();