
   /// functions for the tour 
   document.addEventListener('DOMContentLoaded', function() {


   function moveCursorToPosition(x, y, callback) {
    const cursor = document.querySelector('.cursor');
    cursor.style.left = x -13+ 'px';
    cursor.style.top = y -5+ 'px';

    setTimeout(() => {
      if (typeof callback === "function") {
        callback();
      }
    }, 1000); // Adjust the delay as needed
  }


  // Function to simulate a click
  function simulateClick(elementId) {
    const element = ebID(elementId);
    if (element) {
      var clickEvent = new MouseEvent("click", {
        "view": window,
        "bubbles": true,
        "cancelable": false
      });
      element.dispatchEvent(clickEvent);

    }

  }

  function moveCursorToElement(elementId, callback) {
    const cursor = document.querySelector('.cursor');
    const element = ebID(elementId);

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const cursorX = elementRect.left + elementRect.width / 2;
      const cursorY = elementRect.top + elementRect.height / 2;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      setTimeout(() => {
        callback();
      }, 1000); // Adjust the timeout to match the duration of the CSS transition
    }
  }
  
  
  const svg = document.querySelector('svg'); // Adjust selector as needed
  const svgRect = svg.getBoundingClientRect();

  function getCircleCenterPosition(circleId) {
    const circle = ebID(circleId);
    const cx = parseInt(circle.getAttribute('cx'));
    const cy = parseInt(circle.getAttribute('cy'));

    // Adjust by the SVG container's position
    const x = svgRect.left + cx + window.scrollX;
    const y = svgRect.top + cy + window.scrollY;

    return { x, y };
  }



  // Function to simulate a click at specific pixel coordinates
  function simulateClickAt(x, y, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      var clickEvent = new MouseEvent('click', {
        clientX: x,
        clientY: y,
        bubbles: true,
        cancelable: true
      });
      element.dispatchEvent(clickEvent);
    }
  }

  // Function to get pixel coordinates for a given index
  function getPixelCoordinatesForIndex(index) {
    // Assuming xData and yData are globally accessible
    const xValue = xData[index];
    const yValue = yData[index];

    // Convert these values to pixel coordinates on the canvas
    // This depends on how your chart scales and canvas are set up
    // Example calculation (you may need to adjust this):
    // Use Chart.js's internal methods to convert data values to pixel values
    const xPixel = chart.scales.x.getPixelForValue(xValue);
    const yPixel = chart.scales.y.getPixelForValue(yValue);

    return { x: xPixel, y: yPixel };
  }


  /// adding step for speed slider 

  var tourSliderMin;
  var tourSliderMax;

  function calculateSliderClickPosition(sliderId, value) {
    const slider = ebID(sliderId);
    const sliderRange = [tourSliderMin, tourSliderMax]; // Min and max values of the slider
    const sliderWidth = 200; // Width of the slider in pixels

    // Calculate the proportional position of the value
    const valueRatio = (value - sliderRange[0]) / (sliderRange[1] - sliderRange[0]);
    // Adjusting positionX to start from the left edge of the slider
    const positionX = (valueRatio * sliderWidth); // Subtract 100 because the viewbox starts at -100

    return positionX;
  }



  function simulateClickOnSlider(sliderId, value, callback) {
    const positionX = calculateSliderClickPosition(sliderId, value);
    const slider = ebID(sliderId);

    if (slider) {
      const sliderRect = slider.getBoundingClientRect();
      const cursor = document.querySelector('.cursor');

      // Calculate the exact position for the cursor
      const clickPositionX = sliderRect.left + positionX + window.scrollX;
      const clickPositionY = sliderRect.top + sliderRect.height / 2 + window.scrollY;

      // Move the cursor to the calculated position
      cursor.style.left = clickPositionX + 'px';
      cursor.style.top = clickPositionY + 'px';

      // Simulate the click after a short delay to allow for cursor movement
      setTimeout(() => {
        var clickEvent = new MouseEvent("click", {
          clientX: clickPositionX,
          clientY: clickPositionY,
          bubbles: true,
          cancelable: true
        });
        slider.dispatchEvent(clickEvent);

        // Execute the callback function after the click
        if (typeof callback === "function") {
          setTimeout(callback, 1000); // Adjust timeout as needed
        }
      }, 1000); // Adjust the timeout for cursor movement
    }
  }



  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  ///     starting the tour 
  window.tour = new Shepherd.Tour(
    {
  
    
    defaultStepOptions: {
      cancelIcon: {
        enabled: true
      },
      classes: 'shepherd-theme-arrows',
      scrollTo: true
    }
  });


  

  tour.addStep({
    title: 'Increase Twists',
    text: `This button increases the number of half twists of the optimal band.`,
    attachTo: {
      element: '#buttNumOfTetPlus',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('buttNumOfTetPlus', () => {
         
          setTimeout(() => tour.next(), 2000); // Proceed to next step after the action
        });
        simulateClick('buttNumOfTetPlus');
      }
    }
  });

  // Similar setup for 'buttNumOfTetMinus'

  tour.addStep({
    title: 'decrease Twists',
    text: `This button decreases the number of half twists of the optimal band.`,
    attachTo: {
      element: '#buttNumOfTetMinus',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('buttNumOfTetMinus', () => {
         
          setTimeout(() => tour.next(), 2000); // Proceed to next step after the action
        });
        simulateClick('buttNumOfTetMinus');
      }
    }
  });


  // Play eversion

  tour.addStep({
    title: 'play',
    text: `This button plays the everting motion. Drag the clock right to modify the everting states.`,
    attachTo: {
      element: '#playPausePoly',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('playPausePoly', () => {
          
          setTimeout(() => tour.next(), 2500); // Proceed to next step after the action
        });
        simulateClick('playPausePoly');
      }
    }
  });



  var tourSpeed;
  tourSliderMin = 4;
  tourSliderMax = 100;
  tour.addStep({
    title: 'Adjust Speed',
    text: 'Click on this slider to change the speed of eversion.',
    attachTo: {
      element: '#speedSlider',
      on: 'bottom'
    },
    when: {
      show: function () {
        simulateClickOnSlider('speedSlider', 20, () => {
          tour.next();
        });

      }
    }
  });
  tour.addStep({
    title: 'Adjust Speed',
    text: 'Click on this slider to change the speed of eversion.',
    attachTo: {
      element: '#speedSlider',
      on: 'bottom'
    },
    when: {
      show: function () {
        simulateClickOnSlider('speedSlider', 40, () => {
          tour.next();
        });

        tourSpeed = new Event('tourSpeed');
 
        ebID('speedSlider').dispatchEvent(tourSpeed);
      }
    }
  });

  // width 
  var tourWidth;
  var tourWidthBack;
  tourSliderMin = 0;
  tourSliderMax = 100;

  tour.addStep({
    title: 'Adjust band width',
    text: 'Click on this slider to change the width of the band.',
    attachTo: {
      element: '#hingeLengthSlider',
      on: 'bottom'
    },
    when: {
      show: function () {
        simulateClickOnSlider('hingeLengthSlider', 40, () => {
          tour.next();
        });
        tourWidth = new Event('tourWidth');
  
        ebID('hingeLengthSlider').dispatchEvent(tourWidth);
      }
    }
  });
  tour.addStep({
    title: 'Adjust band width',
    text: 'Click on this slider to change the width of the band.',
    attachTo: {
      element: '#hingeLengthSlider',
      on: 'bottom'
    },
    when: {
      show: function () {
        simulateClickOnSlider('hingeLengthSlider', 20, () => {
          tour.next();
        });
         tourWidthBack = new Event('tourWidthBack');
        ebID('hingeLengthSlider').dispatchEvent(tourWidthBack);
      }
    }
  });


  // view angle 

  tour.addStep({
    title: 'view axis',
    text: `view along the axis of symmetry.`,
    attachTo: {
      element: '#buttAlignAxis',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('buttAlignAxis', () => {
          simulateClick('buttAlignAxis');
          setTimeout(() => tour.next(), 2000); // Proceed to next step after the action
        });
       }
    }
  });
  tour.addStep({
    title: 'view axis',
    text: `view along the plane of symmetry.`,
    attachTo: {
      element: '#buttAlignPlane',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('buttAlignPlane', () => {
          simulateClick('buttAlignPlane');
          setTimeout(() => tour.next(), 2000); // Proceed to next step after the action
        });
       }
    }
  });

  // change the camera angle to default
  alpha = 6.185710546084945;
  beta = 1.0989063024750556;
  var tourCamera;
  tour.addStep({
    title: 'view angle',
    text: `hold the left click and move the mouse to rotate the band.`,
    attachTo: {
      element: '#renderCanvas',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('renderCanvas', () => {

          setTimeout(() => tour.next(), 3000); // Proceed to next step after the action
        });
        tourCamera= new CustomEvent('tourCamera', { detail: { alpha: alpha, beta: beta } });
        ebID('renderCanvas').dispatchEvent(tourCamera);
      }
    }
  });

  // eversion path 
  tour.addStep({
    title: 'view eversion path',
    text: `path of eversion of a point on the midline.`,
    attachTo: {
      element: '#buttShowMid',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('buttShowMid', () => {
          simulateClick('buttShowMid');
          setTimeout(() => tour.next(), 2000); // Proceed to next step after the action
        });
      }
    }
  });
  tour.addStep({
    title: 'view unit',
    text: `1/n th of the band with n half twists.`,
    attachTo: {
      element: '#buttShowUnit',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('buttShowUnit', () => {
          simulateClick('buttShowUnit');
          setTimeout(() => tour.next(), 2000); // Proceed to next step after the action
        });
      }
    }
  });
  tour.addStep({
    title: 'view unit',
    text: `1/n th of the band with n half twists.`,
    attachTo: {
      element: '#buttShowUnit',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('buttShowUnit', () => {
          simulateClick('buttShowUnit');
          setTimeout(() => tour.next(), 2000); // Proceed to next step after the action
        });
      }
    }
  });


  tour.addStep({
    title: 'view energy plot',
    text: `plot of the bending energy of stable bands versus the torsion of the midline of the band.`,
    attachTo: {
      element: '#buttShowEnergy',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('buttShowEnergy', () => {
          simulateClick('buttShowEnergy');
          setTimeout(() => tour.next(), 2000); // Proceed to next step after the action
        });
      }
    }
  });


  tour.addStep({
    title: 'view curvature',
    text: `curvature of the midline during eversion.`,
    attachTo: {
      element: '#buttShowKappa',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('buttShowKappa', () => {
          simulateClick('buttShowKappa');
          setTimeout(() => tour.next(), 2000); // Proceed to next step after the action
        });
      }
    }
  });


  // eversion path 
  tour.addStep({
//    title: 'view eversion path',
  //  text: `path of eversion of a point on the midline.`,
    attachTo: {
      element: '#buttShowMid',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('buttShowMid', () => {
          simulateClick('buttShowMid');
          setTimeout(() => tour.next(), 2000); // Proceed to next step after the action
        });
      }
    }
  });


  tour.addStep({
    title: 'modify band',
    text: 'clicking on the plot shows a band corresponding to the dimensionless torsion of the midline on the x axis.',
    attachTo: {
      element: '#renderCanvasE',
      on: 'bottom'
    },
    when: {
      show: function () {
        const index = 40; // Example index
        nu_i = index;
        const coordinates = getPixelCoordinatesForIndex(index);

        // Adjust the coordinates to account for canvas position
        var canvasRect = document.getElementById('renderCanvasE').getBoundingClientRect();
        const adjustedX = canvasRect.left + coordinates.x;
        const adjustedY = canvasRect.top + coordinates.y;

        moveCursorToPosition(adjustedX, adjustedY, () => {
          nui_to_n(index);
          simulateClickAt( adjustedX, adjustedY,'renderCanvasE'); 
              setTimeout(() => tour.next(), 2000); // Proceed to next step after the action
        });

      }
    }
  });
 


  // going back to the optimal bands 

  tour.addStep({
    text: 'clicking here will show the optimal bands',
    //text: `This button decreases the number of half twists of the optimal band.`,
    attachTo: {
      element: '#buttNumOfTetMinus',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('buttNumOfTetMinus', () => {
          simulateClick('buttNumOfTetMinus');
          setTimeout(() => tour.next(), 2000); // Proceed to next step after the action
        });
      }
    }
  });

  tour.addStep({
    text: 'clicking here will give the optimal bands',
    // text: `This button decreases the number of half twists of the optimal band.`,
    attachTo: {
      element: '#buttNumOfTetMinus',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('buttNumOfTetMinus', () => {
          simulateClick('buttNumOfTetMinus');
          setTimeout(() => tour.next(), 2000); // Proceed to next step after the action
        });
      }
    }
  });



  // colors 
  tour.addStep({
    title: 'view colors',
    text: `change color of the band.`,
    attachTo: {
      element: '#buttColor2',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('buttColor2', () => {
          setTimeout(() => tour.next(), 2000); // Proceed to next step after the action
        });
        simulateClick('buttColor2');
      }
    }
  });
  // colors 
  tour.addStep({
    title: 'view colors',
    text: `change color of the band.`,
    attachTo: {
      element: '#buttColor1',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('buttColor1', () => {
          setTimeout(() => tour.next(), 2000); // Proceed to next step after the action
        });
        simulateClick('buttColor1');
      }
    }
  });



  // Shepherd tour step
  tour.addStep({
    title: 'View Colors',
    text: 'Change the background color using the picker on the top-left.',
    attachTo: {
      element: '#backgroundButton',
      on: 'bottom'
    },
    when: {
      show: function () {
        moveCursorToElement('backgroundButton', () => {
          simulateClick('backgroundButton');
          setTimeout(() => tour.next(), 2000); // Proceed to next step after the action
        });
      }
    }
  });



  tour.on('complete', function () {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      cursor.style.display = 'none'; // Hide the cursor
    }
  });

  // for continuing hovering

  const leftBar = document.querySelector('.leftbar');
  const rightBar = document.querySelector('.rightbar');

  tour.on('start', function () {
    leftBar.classList.add('simulated-hover');
    rightBar.classList.add('simulated-hover');
  });

  tour.on('complete', function () {
    leftBar.classList.remove('simulated-hover');
    rightBar.classList.remove('simulated-hover');
  });

  tour.on('cancel', function () {
    leftBar.classList.remove('simulated-hover');
    rightBar.classList.remove('simulated-hover');
  });
   });