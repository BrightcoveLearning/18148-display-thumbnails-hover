videojs.registerPlugin('thumbnailsHover', function() {
    var myPlayer = this,
        ePlayer,
        options = {},
        thumbs = [],
        myModal,
        showOverlay,
        hideOverlay,
        newElement = document.createElement('div');

    newElement.setAttribute("id","row");

    videojs('myPlayerID').ready(function(){
      myPlayer = this;
      ePlayer = myPlayer.el();

      myPlayer.on('loadstart',function(){
        // a JSON array of thumbnail URLs is stored in the videos long description field
        var arr = JSON.parse(myPlayer.mediainfo.longDescription);
        buildModal(arr);

        showOverlay = function(){
          // show the overlay
          if (myModal) {
            myModal.open();
          }
        }

        // show the thumbnail images when a user hovers over the player
        ePlayer.addEventListener("mouseover",showOverlay);

        hideOverlay = function(){
          // hide the overlay
          if (myModal) {
            myModal.close();
          }
        }
        // hide the thumbnail images when a user moves their cursor away from the player
        ePlayer.addEventListener("mouseout", hideOverlay);

        // when the thumbnail modal is clicked, remove the event listeners, close and dispose of the modal and start video playback
        myModal.on("click", function(){
          ePlayer.removeEventListener('mouseover',showOverlay);
          ePlayer.removeEventListener('mouseout',hideOverlay);
          myModal.close();
          myModal.dispose();
          myPlayer.play();
        });
      })
    });

    /**
    * create the modal dialog
    */
    function buildModal(array) {
      // get the thumbnail URLs from the video Long Description field and add to modal dialog content
      newElement.innerHTML = '<div id="item"><img src="' + array.thumbs[0].image + '"></div><div id="item"><img src="' + array.thumbs[1].image + '"></div><div id="item"><img src="'+ array.thumbs[2].image + '"></div><div id="item"><img src="' + array.thumbs[3].image + '"></div>';
      options.content = newElement;
      // add a label text
      options.label = 'thumbnail images';
      // configure modal dialog settings
      options.temporary = false;
      options.uncloseable = true;

      // create the modal dialog and add it to the player
      var ModalDialog = videojs.getComponent('ModalDialog');
      myModal = new ModalDialog(myPlayer, options);
      myModal.addClass('vjs-my-custom-modal');
      myPlayer.addChild(myModal);
     }

});
