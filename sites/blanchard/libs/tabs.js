document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.accordion__list-link').forEach(function(artistName) {
        artistName.addEventListener('click', function(event) {
            const path = event.currentTarget.dataset.path
            
            document.querySelectorAll('.tab__content').forEach(function(workContent) {
                workContent.classList.remove('tab__content--active')
            })
            document.querySelector(`[data-target=${path}]`).classList.add('tab__content--active')
        })
    })
})

var panels = document.getElementsByClassName("accordion__list-link");
var actives = document.getElementsByClassName('accordion__list-link--active');
for (i = 0; panels.length > i; i++) {
  panels[i].onclick = function() {
    var currentActive = actives[0];
    if (currentActive)
      currentActive.classList.remove("accordion__list-link--active");

    if (currentActive !== this)
      this.classList.add("accordion__list-link--active");
  };
}