tippy('.project__tooltip', {
    trigger: 'click',
    hideOnClick: 'toggle',
  });

  const tooltipBtn = document.querySelectorAll('.project__tooltip');
  tooltipBtn.forEach(function(tooltip){
    tooltip.addEventListener('click', function () { 
      tooltip.classList.toggle('project__tooltip--active')
    });
  });



