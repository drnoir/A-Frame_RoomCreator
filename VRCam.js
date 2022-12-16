AFRAME.registerComponent('playermovement', {
    schema: {
        default: '',
    },
    init: function () {
        this.el.addEventListener('click', function (evt) {
            let newPos =  this.getAttribute('position');
            const playercam = document.getElementById('playercam');
            playercam.setAttribute('position', newPos);
            playercam.object3D.position.y = 1.5;
        });
    }
});
