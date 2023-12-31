// Create a new tour
const tour = new Shepherd.Tour({
    defaultStepOptions: {
      cancelIcon: {
        enabled: true
      },
      classes: 'shepherd-theme-arrows',
      scrollTo: true
    }
  });
  
  // Add steps to the tour
  tour.addStep({
    title: 'Decrease Twists',
    text: `This button decreases the number of half twists of the optimal band.`,
    attachTo: {
      element: '#buttNumOfTetMinus',
      on: 'bottom'
    }
  });
  
  tour.addStep({
    title: 'Increase Twists',
    text: `This button increases the number of half twists of the optimal band.`,
    attachTo: {
      element: '#buttNumOfTetPlus',
      on: 'bottom'
    }
  });
  
  // ...add more steps for other buttons...
  
  // Start the tour
  tour.start();
  window.startTour = function() {
    tour.start();
}